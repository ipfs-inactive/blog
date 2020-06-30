---
date: 2020-06-29
url: /2020-06-29-rust-ipfs-unixfs/
header_image: rust-ipfs-crab.png
title: Rust IPFS UnixFS Support Lands
author: Joonas Koivunen and Mark Robert Henderson
tags: Rust, IPFS, UnixFS
---

UnixFS reading, or _exporting_, has landed in [Rust IPFS]! Funded by a
Protocol Labs [devgrant], the main deliverables were the [`ipfs-unixfs`] crate,
and the HTTP APIs `/get`, and `/cat`.

[devgrant]: https://github.com/ipfs/devgrants/tree/master/open-grants/ipfs-rust/phase-2
[Rust IPFS Append-only log #4]: https://medium.com/equilibriumco/rustipfs/home
[Rust IPFS]: https://github.com/rs-ipfs/rust-ipfs
[`ipfs-unixfs`]: https://crates.io/crates/ipfs-unixfs

## The [ipfs-unixfs] crate

You can review what UnixFS _is_ in our [previous post], but for now
it's enough to know that a proper UnixFS implementation is basically
about two things:

1. Providing an interface to the data contained in the blocks. This is
fairly straightforward.
2. An ability to "walk" across multiple blocks via the MerkleDAG. This is
much more difficult and, as such, most of the work went into finding
a suitable abstraction.

[previous post]: https://medium.com/equilibriumco/the-road-to-unixfs-f3cf5222b2ef
[ipfs-unixfs]: https://crates.io/crates/ipfs-unixfs

> To recap: [MerkleDAG is the outer protocol buffers description] for
documents (or blocks) which can contain arbitrary inner bytes. Together
with UnixFS blocks, these bytes correspond to [UnixFS messages].

The operation needed when walking across multiple blocks is "loading the next
block" or something along the lines of:

```rust
async fn get_block(..., cid: Cid) -> Result<impl AsRef<[u8]>, _>
```

However, we wanted to find a way to keep the IO of blocks separate from the
implementation itself. This should have multiple benefits: any store integration - be it async or blocking - should be possible, and one should be able to
compose the higher level operations out of the lower level pieces.

So, instead of having an `ipfs_unixfs::GetBlock` or `ipfs_unixfs::BlockStore`
trait, the `ipfs_unixfs::walk::Walker` currently has an API like this:

```rust
impl Walker {
  fn new(start: Cid, root_name: &str) -> Walker;

  fn pending_links(&self) -> (&Cid, impl Iterator<Item = &Cid> + '_) { ... }

  fn continue_walk(self, next_block: &[u8]) -> Result<ContinuedWalk, _> { ... }
}
```

The creation of `ipfs_unixfs::walk::Walker` is possible only with a root or
start `Cid` and an optional path name to the root document. `Walker` tracks
the path inside the graph for any entries.

While `Walker::pending_links` may have a gnarly-looking signature, at
the same time it communicates an important invariant of the API: whenever there
exists a `Walker` value, there must be some pending links to load. This also means
that the calling code does not have to deal with unwrapping an `Option<Cid>`
from an `Iterator::next`, but can just get the next `Cid` as follows:

```rust
let (next, prefetchable_links) = walker.pending_links();
```

The iterator (`prefetchable_links`) in the tuple can be used to start
pre-fetching the `Cid`s from the network. When walking a directory,
`prefetchable_links` will contain unvisited links to entries under the
directory. However, following an opening of a multi-block file,
`prefetchable_links` would now contain the next, most important, links for the
file. Since files can expand on every block before hitting the leaf level, it
can be a long time before any of the previously seen "prefetchable" blocks are
ready to be processed.

Continuing the walk returns a `ContinuedWalk` on success, which is an enum of
three possibilities:

1. file (new or continuation)
2. directory (new or continuation)
3. symlink

For files and symlinks, there is an additional [`FileSegment`] or a slice of bytes
provided. This represents a segment of the file, which could possibly be empty.
For symlinks the slice is the linked path of the `Symlink`.

From a `ContinuedWalk` value the walk can be continued by first accessing the
inner `Item` value either by pattern matching or by using
`ContinuedWalk::into_inner`. The [`Item::into_inner`] will return an `Option`
of the next `Walker`. One will exist if there are still links to walk.

[MerkleDAG is the outer protocol buffers description]: https://github.com/ipfs/go-merkledag/blob/master/pb/merkledag.proto
[UnixFS messages]: https://github.com/ipfs/specs/blob/master/UNIXFS.md
[`FileSegment`]: https://docs.rs/ipfs-unixfs/0.0.1/ipfs_unixfs/walk/struct.FileSegment.html
[issue #200]: https://github.com/rs-ipfs/rust-ipfs/issues/200
[`Item::into_inner`]: https://docs.rs/ipfs-unixfs/0.0.1/ipfs_unixfs/walk/struct.Item.html#method.into_inner

## `/cat` and `/get`

In short, these two operations **retrieve** data from MerkleDAGs and, in the
process, fetch the required blocks from the network. [`/cat`] can only process
UnixFS blocks of type `File` or `Raw`, while [`/get`] can start from a
block of type `Directory`, `File` or `Symlink`.

Depending on the type of the block, the walk will only consist of a single
`File` or `Symlink` block, a single `File` tree, or some combination,
including sub-directories in a directory hierarchy. The `/cat` HTTP API returns
the raw file whereas `/get` ([HTTP impl](https://github.com/rs-ipfs/rust-ipfs/blob/a1614011a330d32842352bf1095219e6b068b92a/http/src/v0/root_files.rs#L86-L195))
returns a tar file of the tree.

Exposing the `/cat` operation ([HTTP impl](https://github.com/rs-ipfs/rust-ipfs/blob/a1614011a330d32842352bf1095219e6b068b92a/http/src/v0/root_files.rs#L38-L69))
as a Rust API was the easier part, as it is a pretty good fit for a
`futures::stream::Stream<Item = Result<Vec<u8>, _>>` or
`futures::stream::TryStream<Ok = Vec<u8>, Error = _>`. As we had already used
`async_stream` over at `ipfs-http` for the initial `refs` implementation, it
again seemed like the easiest way to get this implemented.

The implementation ended up using `Vec<u8>` for bytes instead of `bytes::Bytes`
simply because we currently didn't depend on `bytes` even indirectly in `ipfs`.
It might be that the type in the signature should be changed to
`impl AsRef<[u8]>` to allow later migration to `Bytes`.

[`/cat`]: https://docs.ipfs.io/reference/http/api/#api-v0-cat
[`/get`]: https://docs.ipfs.io/reference/http/api/#api-v0-get

File metadata could potentially be handled by first returning a
value which would contain the eventual stream of bytes. This would be a welcome
addition to the `ipfs::Ipfs::cat_unixfs` API, which currently returns an
`Future` of the `Stream` of bytes -- instead it should return a `Future` of a
`File` description, which would in turn contain the stream of bytes.

## How you can get involved

- Try out [Rust IPFS] and provide feedback via GitHub issues
- Check out the [good first issue] and [help wanted] labels in the Rust IPFS repo
- Sponsor our work on [OpenCollective]
- Learn what the Equilibrium team has [next in store for Rust IPFS]

[Rust IPFS]: https://github.com/rs-ipfs/rust-ipfs
[help wanted]: https://github.com/rs-ipfs/rust-ipfs/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22
[good first issue]: https://github.com/rs-ipfs/rust-ipfs/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22u
[OpenCollective]: https://opencollective.com/rs-ipfs
[next in store for Rust IPFS]: https://medium.com/equilibriumco/unixfs-exporting-has-landed-what-comes-next-4775cc568838
