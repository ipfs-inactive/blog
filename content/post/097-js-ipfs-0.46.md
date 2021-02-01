---
date: 2020-06-08
url: /2020-06-08-js-ipfs-0-46/
title: js-IPFS 0.46.0 released with new faster bitswap and go-IPFS 0.5 compat
header_image: js-ipfs-placeholder.png
author: Alex Potsides
---

# 🔦 Highlights

> Bitswap 1.2.0, transfer speed improvements & go-IPFS 0.5.x compatibility

Blink and you’ll miss it, ~~`js-IPFS@0.45.0`~~ `js-IPFS@0.46.0` has been released; goodies include Bitswap 1.2.0, much faster file transfers, and go-IPFS 0.5.x compatibility!

## ↔️ Bitswap 1.2.0

Version 1.2.0 of the Bitswap protocol has landed in `js-IPFS` and brings a host of performance improvements around coordinating the supply of blocks to peers across the network. For example, peers can now respond to [WANT](https://github.com/ipfs/specs/blob/master/BITSWAP.md#bitswap-message)s with messages saying they have the block but not sending it, in order to later send multiple blocks in one message instead of many small messages resulting in less chatty network operations and faster overall transfer times.

See [ipfs/js-ipfs-bitswap#204](https://github.com/ipfs/js-ipfs-bitswap/pull/204) for more!

## 💨 Faster file transfers

The Bitswap module has had a bit of an overhaul and is now much faster at pulling blocks from other nodes across the network.  Before, we waited a little while before sending our wantlist to newly connected peers—we’ve reduced that window and seen a massive speedup (smaller bars are better):

![Graphs showing Bitswap speedups](/097-js-ipfs-0.46/bitswap-speedup.png)

As you can see, the new js-IPFS is about 3x faster at pulling large files from other nodes on the network than the previous release, and that increases to about 5x as the files get smaller.

We’re not stopping there though, there are plenty more performance improvements on the way!

See [ipfs/js-ipfs-bitswap#224](https://github.com/ipfs/js-ipfs-bitswap/pull/224) for all the details.

## 🤝 go-IPFS v0.5.x compatibility

The new version of go-IPFS brought a whole slew of changes with it—check out our [blog post](https://blog.ipfs.io/2020-04-28-go-ipfs-0-5-0/) for more details.

The good news is js-IPFS has taken on a whole heap of these features and the `ipfs-http-client` is now 100% compatible with `go-ipfs@0.5.x`. Your `js-IPFS` nodes will now happily chat away to `go-IPFS` nodes over the network via Bitswap and [gossipsub](https://blog.ipfs.io/2020-05-20-gossipsub-v1.1/) too.

See [ipfs/js-ipfs#3013](https://github.com/ipfs/js-ipfs/pull/3013) for the full rundown.

# ✨New features

* Using an [AbortSignal][] to cancel a request to get a block (via `ipfs.dag.get` or `ipfs.cat` for example) will now cause those blocks to be removed from your wantlist ([ipfs/js-ipfs-bitswap#214](https://github.com/ipfs/js-ipfs-bitswap/pull/214))
* `ipfs.dht.get(key, [options])` accepts a string or a buffer as `key` ([#3013](https://github.com/ipfs/js-ipfs/issues/3013)) ([0900bb9](https://github.com/ipfs/js-ipfs/commit/0900bb9b8123edb689a137a006c5507d8503f693))

# 🦟 Bugs fixed

* Decrease wantlist sending debounce time ([ipfs/js-ipfs-bitswap#224](https://github.com/ipfs/js-ipfs-bitswap/pull/224))
* Fix bitswap race conditions when requesting the same block twice ([ipfs/js-ipfs-bitswap#214](https://github.com/ipfs/js-ipfs-bitswap/pull/214))
* libp2p pubsub now creates two unidirectional streams to topic peers making message delivery more reliable ([ipfs/go-ipfs-pubsub#331](https://github.com/libp2p/go-libp2p-pubsub/issues/331))
* `ipfs.config.get([key,] [options])` - `key` is optional again  ([#3069](https://github.com/ipfs/js-ipfs/issues/3069)) ([d043138](https://github.com/ipfs/js-ipfs/commit/d043138be2c0c7fd458131d56e235edec1504ca3))
* extra mode bits passed to unixfs constructor are now ignored ([ipfs/js-ipfs-unixfs#53](https://github.com/ipfs/js-ipfs-unixfs/pull/53)) ([65a040d](https://github.com/ipfs/js-ipfs-unixfs/pull/53/commits/65a040dadd68ca5cb6697c8fd15922f505833a19))

# 🏗 API Changes

## Core API

* `ipfs.ls` no longer supports a `sort` option ([#3013](https://github.com/ipfs/js-ipfs/issues/3013)) ([0900bb9](https://github.com/ipfs/js-ipfs/commit/0900bb9b8123edb689a137a006c5507d8503f693))
* `ipfs.key.gen` defaults to 2048 bit RSA keys ([#3013](https://github.com/ipfs/js-ipfs/issues/3013)) ([0900bb9](https://github.com/ipfs/js-ipfs/commit/0900bb9b8123edb689a137a006c5507d8503f693))

## CLI

* `ipfs files ls` no longer supports the `-U` (unsorted) flag ([#3013](https://github.com/ipfs/js-ipfs/issues/3013)) ([0900bb9](https://github.com/ipfs/js-ipfs/commit/0900bb9b8123edb689a137a006c5507d8503f693))

## HTTP API

* `POST /api/v0/pin/list` no longer supports non-streaming responses ([#3013](https://github.com/ipfs/js-ipfs/issues/3013)) ([0900bb9](https://github.com/ipfs/js-ipfs/commit/0900bb9b8123edb689a137a006c5507d8503f693))

## HTTP API Client

* `ipfs.dht.get` resolves to a Buffer in line with the core API ([#3013](https://github.com/ipfs/js-ipfs/issues/3013)) ([0900bb9](https://github.com/ipfs/js-ipfs/commit/0900bb9b8123edb689a137a006c5507d8503f693))

# 🗺️ What’s next?

Check out the js-IPFS [Project Roadmap](https://github.com/orgs/ipfs/projects/6) which contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

* [@0xflotus](https://github.com/0xflotus) (1 commit, 1 PR)
* [@5310](https://github.com/5310) (1 comment)
* [@achingbrain](https://github.com/achingbrain) (30 commits, 12 PRs, 1 issue, 55 comments)
* [@aphelionz](https://github.com/aphelionz) (1 PR, 1 comment)
* [@AquiGorka](https://github.com/AquiGorka) (1 comment)
* [@Artod](https://github.com/Artod) (1 comment)
* [@autonome](https://github.com/autonome) (11 comments)
* [@bluelovers](https://github.com/bluelovers) (1 commit)
* [@bmann](https://github.com/bmann) (1 comment)
* [@carsonfarmer](https://github.com/carsonfarmer) (1 issue, 4 comments)
* [@chelneru](https://github.com/chelneru) (1 comment)
* [@codecov-commenter](https://github.com/codecov-commenter) (9 comments)
* [@danielrempe-ut](https://github.com/danielrempe-ut) (1 issue, 1 comment)
* [@dapplion](https://github.com/dapplion) (2 comments)
* [@daviddahl](https://github.com/daviddahl) (1 issue, 5 comments)
* [@dirkmc](https://github.com/dirkmc) (1 comment)
* [@domwoe](https://github.com/domwoe) (1 comment)
* [@DougAnderson444](https://github.com/DougAnderson444) (4 comments)
* [@Gozala](https://github.com/Gozala) (2 PRs, 7 issues, 25 comments)
* [@hacdias](https://github.com/hacdias) (2 comments)
* [@hugomrdias](https://github.com/hugomrdias) (4 commits, 5 PRs, 1 issue, 26 comments)
* [@jacobheun](https://github.com/jacobheun) (4 commits, 3 PRs, 2 issues, 18 comments)
* [@jakehemmerle](https://github.com/jakehemmerle) (2 comments)
* [@johnnymatthews](https://github.com/johnnymatthews) (1 commit, 1 PR)
* [@justinmchase](https://github.com/justinmchase) (1 comment)
* [@kumavis](https://github.com/kumavis) (2 comments)
* [@lazyweirdo](https://github.com/lazyweirdo) (2 comments)
* [@lidel](https://github.com/lidel) (1 PR, 2 comments)
* [@matrushka](https://github.com/matrushka) (1 PR)
* [@mburns](https://github.com/mburns) (1 comment)
* [@mdtanrikulu](https://github.com/mdtanrikulu) (1 issue)
* [@mikeal](https://github.com/mikeal) (1 comment)
* [@mitra42](https://github.com/mitra42) (1 comment)
* [@momack2](https://github.com/momack2) (1 commit, 1 comment)
* [@mpetrunic](https://github.com/mpetrunic) (1 comment)
* [@obo20](https://github.com/obo20) (1 comment)
* [@oed](https://github.com/oed) (10 comments)
* [@RenatoPerotti](https://github.com/RenatoPerotti) (1 issue)
* [@revolunet](https://github.com/revolunet) (1 commit, 1 PR)
* [@ribasushi](https://github.com/ribasushi) (1 comment)
* [@robert-cronin](https://github.com/robert-cronin) (1 issue, 1 comment)
* [@rohail411](https://github.com/rohail411) (2 issues, 2 comments)
* [@rumkin](https://github.com/rumkin) (1 issue)
* [@rvagg](https://github.com/rvagg) (4 comments)
* [@SignpostMarv](https://github.com/SignpostMarv) (1 comment)
* [@stasbar](https://github.com/stasbar) (1 issue, 1 comment)
* [@Stebalien](https://github.com/Stebalien) (7 comments)
* [@stensonb](https://github.com/stensonb) (11 commits)
* [@tabcat](https://github.com/tabcat) (1 issue)
* [@tarunbatra](https://github.com/tarunbatra) (1 PR, 3 comments)
* [@thattommyhall](https://github.com/thattommyhall) (1 commit)
* [@tymmesyde](https://github.com/tymmesyde) (1 comment)
* [@typhu-xyz](https://github.com/typhu-xyz) (2 comments)
* [@vasco-santos](https://github.com/vasco-santos) (56 commits, 13 PRs, 8 issues, 66 comments)
* [@vmx](https://github.com/vmx) (2 commits, 5 comments)
* [@wemeetagain](https://github.com/wemeetagain) (38 commits, 9 PRs, 3 issues, 8 comments)
* [@witten](https://github.com/witten) (1 comment)
* [@xinfushe-dev](https://github.com/xinfushe-dev) (1 comment)
* [@xmaysonnave](https://github.com/xmaysonnave) (1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don’t know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-IPFS repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute: https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at https://discuss.ipfs.io/ and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works, and what you can do with it is at [discuss.ipfs.io](https://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.

[UnixFS]: https://docs.ipfs.io/guides/concepts/unixfs/
[CID]: https://docs.ipfs.io/guides/concepts/cid/
[MFS]: https://docs.ipfs.io/guides/concepts/mfs/
[libp2p]: https://github.com/libp2p/js-libp2p
[ipld]: https://github.com/ipld/js-ipld
[AbortSignal]: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
