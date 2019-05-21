---
date: 2019-05-21
url: 88-js-ipfs-0-36
title: js-ipfs 0.36.0 released
author: Alan Shaw
---

> URL safe CIDs, refs commands, DOM File support and more!

# 🔦 Highlights

## 🧬 Base32 encoding for v1 CIDs

As a stepping stone towards switching to CIDv1 by default for all CIDs, we're shipping a small change to v1 CIDs that means their string form is `base32` encoded instead of `base58btc`. So, instead of:

```console
$ jsipfs add --cid-version 1 guardian.jpg
added zb2rhk6GMPQF3hfzwXTaNYFLKomMeC6UXdUt6jZKPpeVirLtV guardian.jpg
```

You'll now get back a `base32` encoded CID:

```console
$ jsipfs add --cid-version 1 guardian.jpg
added bafkreibu6pkzh33dfwfa3bg3twih7uiohu6d6cr34txljekdn3cvwoujiu guardian.jpg
```

You can [read more about this change here](https://github.com/ipfs/js-ipfs/issues/1995).

PR: https://github.com/ipfs/js-ipfs/pull/2050

## 👉 Added refs and refs local commands

We've added the `refs` and `refs local` commands to the core, CLI and HTTP API. These commands allow you to list out all the CIDs referenced by a given DAG node or all the CIDs in your local repo. You can even choose the display format.

PR: https://github.com/ipfs/js-ipfs/pull/2004

## 🗄 Support for adding DOM File objects

Finally! You can just add a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) to IPFS without having to jump through hoops converting it to a `Buffer` first. Sensational!

A `File`, by the way, is what you'll get back from a `<input type="file">` or the drag and drop API, so being able to easily take that file and add it to IPFS makes onboarding new frontend devs way easier (as well as way more convenient for all you old frontend devs 😜).

PR: https://github.com/ipfs/js-ipfs/pull/2013

## 🔬 MDNS discovery compatibility

The libp2p discovery module for finding IPFS nodes over MDNS has been updated so that your JS IPFS node is now able to find Go IPFS nodes on the local network too. It's a backwards compatible change so older nodes will still be able to find your node and you'll still be able to find them.

PR: https://github.com/libp2p/js-libp2p-mdns/pull/80

## 🚤 28% faster stream multiplexing

We switched the multiplexing implementation to one that's simpler, smaller and faster. We're estimating it to be [around 28% faster than the old implementation](https://github.com/libp2p/pull-mplex/pull/8#issue-254730751).

PR: https://github.com/ipfs/js-ipfs/pull/1884

## ⛩ Gateway improvements

The IPFS HTTP gateway that JS IPFS exposes when run as a daemon in Node.js has been upgraded to support a number of HTTP features like conditional requests, byte range requests as well as getting some bug fixes, mini features and other improvements. There's too much to list here but check out the PR for and in depth description of what's changed.

PR: https://github.com/ipfs/js-ipfs/pull/1989

# 🏗 API Changes

1. **BREAKING**: The default string encoding for version 1 CIDs has changed to `base32`
1. **BREAKING**: IPLD formats have been updated to the latest versions. IPLD nodes returned by `ipfs.dag` and `ipfs.object` commands have significant breaking changes. If you are using these commands in your application you are likely to encounter the following changes to `dag-pb` nodes (the default node type that IPFS creates):
    * `DAGNode` properties have been renamed as follows:
        * `data` => `Data`
        * `links` => `Links`
        * `size` => `size` (Note: no change)
    * Additionally, the `Links` property of a `DAGNode` now returns plain JS objects with `Hash`, `Name` and `Tsize` properties, **NOT** `DAGLink` instances
    * `DAGLink` properties have been renamed as follows:
        * `cid` => `Hash`
        * `name` => `Name`
        * `size` => `Tsize`
    * See CHANGELOGs for each IPLD format for it's respective changes, you can read more about the [`dag-pb` changes in the CHANGELOG](https://github.com/ipld/js-ipld-dag-pb/blob/master/CHANGELOG.md#0160-2019-05-08)
1. Commands `refs` and `refs local` have been added to core, the CLI and the HTTP API
    * [Core API docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/REFS.md)
    * [HTTP API docs](https://docs.ipfs.io/reference/api/http/#api-v0-refs)
    * [CLI API docs](https://docs.ipfs.io/reference/api/cli/#ipfs-refs)
1. Support for DOM [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects has been added to [`ipfs.add`](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add)

# ❤️ Huge thank you to everyone that made this release possible

In alphabetical order, here are all the humans that contributed to the release:

- ...

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-ipfs repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/team-mgmt/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
