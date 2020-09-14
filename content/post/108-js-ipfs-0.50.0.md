---
date: 2020-09-14
url: /2020-09-14-js-ipfs-0-50/
title: js-IPFS 0.50.0 runs in shared webworkers and has greatly improved pinning performance
header_image: js-ipfs-placeholder.png
author: Alex Potsides
---

# 🔦 Highlights

> share an IPFS node between multiple tabs and pin files more quickly

`js-IPFS@0.50.0` has landed with the ability to share a node between multiple browser tabs and greatly improved pinning performance.

We're also phasing out use of Node.js Buffers as data types in favour of standard JavaScript Uint8Arrays.

Read on for the full details!

## 🤝 Share a node between browser tabs

An IPFS node makes lots of connections to other nodes on the network, and more so since [delegate nodes were turned on by default](https://blog.ipfs.io/2020-07-20-js-ipfs-0-48/). This is to ensure you have the greatest chance of finding content on the network, and so other people have the greatest chance of finding your content on the network.

This does not come without a price though, maintaining multiple connections can be resource-intensive and in some cases the browser will limit the number of concurrent connections you can have have.

This can be a problem in web browsers if the user opens your app in two tabs, suddenly you have two nodes running with twice the number of open connections.  Worse, they are sharing a datastore and the same peer ID.

Help is at hand in the shape of the [ipfs-message-port-client](https://www.npmjs.com/package/ipfs-message-port-client) and [ipfs-message-port-server](https://www.npmjs.com/package/ipfs-message-port-server) which allow you to run one IPFS node in a [SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) and share it between multiple tabs within your application.

There will be a more in depth post here on this subject soon but in the meantime check out the [browser-sharing-node-across-tabs](https://github.com/ipfs/js-ipfs/tree/master/examples/browser-sharing-node-across-tabs) example to see how to use it!

## 📌 Pinning performance

When you add a piece of content to your local IPFS node, it's pinned in place to prevent the blocks that make up your files being deleted during garbage collection.  The pin is placed in a collection of pins we call a pinset.

The datastructure behind this pinset is a [DAG], much like the structures that represent the files and folders you'd added to IPFS. The root [CID] of the [DAG] is stored in the datastore and all the blocks that make up the [DAG] are stored in the blockstore.

The pinset consists of a number of buckets in a tree structure, with each bucket containing a max of 8,192 items and each layer containing max 256 buckets.  After the first bucket is full, pins are distributed between buckets.

When garbage collection runs, all nodes in the [DAG] are traversed and the blocks that correspond to their [CID]s are exempted from deletion.

As you add and remove pins, this DAG grows and shrinks. [CID]s of intermediate nodes within the [DAG] are recalculated as the structure changes. As the [DAG] gets larger this can become expensive and it hurts application performance for very large pinsets.

`js-ipfs@0.50.0` has changed the default storage of pins to use the datastore instead of a [DAG] and has seen a corresponding speedup as the number of pinned blocks in your repo increases:

<p style="max-width:1000px;margin-left:auto;margin-right:auto;">
  <img src="/108-js-ipfs-0.50.0/pinning-performance">
</p>

In the diagram above you can see that as the number of pinned items increases, so does the time it takes to add the next pin.  There's a steep increase at 8,192 pins, which is when the first bucket is considered full and multiple buckets are created which then involves more operations to add the next pin.

The performance of the approach taken by js-ipfs@0.50.0 compares very favourably to that of previous versions and is essentially only limited by the peformance of the underlying datastore since it has switched to simple puts and gets without the overhead of creating a data structure.

## 🍫 Uint8Arrays

In the beginning there were Arrays.  Simple arrays that could hold all sorts of mixed types, could not be optimised very well and were an abstraction over blocks of memory.

Then Node.js came along and introduced the [Buffer](https://nodejs.org/api/buffer.html) - suddenly JavaScript developers could access memory (sort of) directly! These things held numbers with an integer value range of 0-255 and were blazingly fast.  JavaScript was starting to look like a proper language that you could do resource intensive work in.

The authors of the [ECMAScript](https://tc39.es) standard took note and introduced [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)s, of which there are many variations but the one we are most interested in is the [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).

These types of arrays hold numbers with an integer value range of 0-255 and support an API very similar to that of Node.js Buffers, which should come as no surprise as since v3.0.0 of Node.js, Buffers have been a subclass of Uint8Arrays.

These are exciting times so going forwards as JavaScript becomes more capable and the browser support arrives we are reducing our dependence on core Node.js libraries and utilities. Part of that is removing all use of Node.js Buffers in our codebase.

With js-ipfs@0.50.0 you should stop relying on Node.js Buffers to be returned from any part of the [Core-API], instead you should code against the Uint8Array interface.

Some modules that we depend on will still return Buffers, which we pass on to avoid any conversion cost but we hope to remove or refactor these over time.  In order to remain forwards-compatible you should not use Node.js Buffer methods on any of these returned values.

For example in the code below we create a Buffer from the string 'Hello', add it to IPFS then immediately cat it and call `toString()` on the chunks. This takes advantage of the fact that the Buffer we've added is `utf8` encoded.  Buffer.toString() takes an encoding argument which is `utf8` by default, so the below code works but it's only by coincidence:

```javascript
const { cid } = await ipfs.add(Buffer.from('Hello'))

for await (const chunk of ipfs.cat(cid)) {
  console.info(chunk.toString()) // prints 'Hello'
}
```

Instead we would use the [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) and [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) classes. These are explicit in the encoding/decoding they use (also `utf8` by default) so are safer to use:

```javascript
const encoder = new TextEncoder()
const decoder = new TextDecoder()

const { cid } = await ipfs.add(encoder.encode('Hello'))

for await (const chunk of ipfs.cat(cid)) {
  console.info(decoder.decode(chunk)) // prints 'Hello'
}
```

# ✨New features

* Store pins in datastore instead of a DAG ([#2771](https://github.com/ipfs/js-ipfs/issues/2771)) ([64b7fe4](https://github.com/ipfs/js-ipfs/commit/64b7fe41738cbe96d5a9075f0c01156c6f889c40))
* Add protocol list to ipfs id output ([#3250](https://github.com/ipfs/js-ipfs/issues/3250)) ([1b6cf60](https://github.com/ipfs/js-ipfs/commit/1b6cf600a6b1348199457ca1fe6f314b6eff8c46))
* IPNS publish in browser example ([#3207](https://github.com/ipfs/js-ipfs/issues/3207)) ([91faec6](https://github.com/ipfs/js-ipfs/commit/91faec6e3d89b0d9883b8d7815c276d44048e739))
* Update hapi to v20 ([#3245](https://github.com/ipfs/js-ipfs/issues/3245)) ([1aeef89](https://github.com/ipfs/js-ipfs/commit/1aeef89c73f42a2f6cceb7f0598400141ce40e23))
* Update to libp2p@0.29.0 ([63d4d35](https://github.com/ipfs/js-ipfs/commit/63d4d353c606e4fd487811d8a0014bb2173f11be))

## 🔨 Breaking changes

* Node Buffers have been replaced with Uint8Arrays ([#3220](https://github.com/ipfs/js-ipfs/issues/3220))

# 🏗 API Changes

## Core API & HTTP API Client

* The return value from `ipfs.id` now includes a list of protocols the node understands
* 💥 **Breaking Change** 💥 Where Node.js `Buffer` objects were returned previously, now `Uint8Arrays` are in their place. This affects:
  * `ipfs.block.*` The `.data` property of block objects is now a `Uint8Array`
  * `ipfs.dag.get` Depending on the type of node returned:
    * `ipld-raw` nodes are now returned as `Uint8Array`s
    * The `.data` property of returned `ipld-dag-pb` nodes is now a `Uint8Array`
  * `ipfs.dht.get` Returns a `Uint8Array`
  * `ipfs.cat` File data is now returned as `Uint8Array`s
  * `ipfs.files.read` File data is now returned as `Uint8Array`s
  * `ipfs.object.data` Object data is now returned as a `Uint8Array`
  * `ipfs.pubsub.subscript` Data published to a topic is now received as a `Uint8Array`

For further reading, see the [Core API Docs](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api).

# 🗺️ What’s next?

Check out the js-IPFS [Project Roadmap](https://github.com/orgs/ipfs/projects/6) which contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

* [@abbasogaji](https://github.com/abbasogaji) (1 issue, 1 comment)
* [@achingbrain](https://github.com/achingbrain) (77 commits, 33 PRs, 1 issue, 57 comments)
* [@alanshaw](https://github.com/alanshaw) (3 commits)
* [@aphelionz](https://github.com/aphelionz) (1 issue, 3 comments)
* [@aschmahmann](https://github.com/aschmahmann) (1 comment)
* [@AuHau](https://github.com/AuHau) (1 commit, 1 PR, 2 issues, 5 comments)
* [@bluelovers](https://github.com/bluelovers) (1 PR, 2 issues, 4 comments)
* [@bmann](https://github.com/bmann) (1 issue, 1 comment)
* [@christopheSeeka](https://github.com/christopheSeeka) (1 comment)
* [@codecov-commenter](https://github.com/codecov-commenter) (15 comments)
* [@crypt0maniak](https://github.com/crypt0maniak) (1 PR, 2 comments)
* [@dave-dm](https://github.com/dave-dm) (1 issue)
* [@dependabot[bot]](https://github.com/dependabot%5Bbot%5D) (2 commits)
* [@duxiaofeng-github](https://github.com/duxiaofeng-github) (1 issue)
* [@er123rin](https://github.com/er123rin) (1 PR)
* [@ffa500](https://github.com/ffa500) (1 comment)
* [@Gozala](https://github.com/Gozala) (1 commit, 1 PR, 1 issue, 21 comments)
* [@hugomrdias](https://github.com/hugomrdias) (2 commits, 1 comment)
* [@hunterInt](https://github.com/hunterInt) (1 issue)
* [@icidasset](https://github.com/icidasset) (1 comment)
* [@jacekv](https://github.com/jacekv) (1 issue, 1 comment)
* [@jacobheun](https://github.com/jacobheun) (23 commits, 6 PRs, 1 issue, 28 comments)
* [@josselinchevalay](https://github.com/josselinchevalay) (1 issue, 2 comments)
* [@koivunej](https://github.com/koivunej) (2 issues, 1 comment)
* [@lidel](https://github.com/lidel) (2 comments)
* [@lukaw3d](https://github.com/lukaw3d) (1 issue, 1 comment)
* [@mikeal](https://github.com/mikeal) (1 commit)
* [@mitjat](https://github.com/mitjat) (1 comment)
* [@moodysalem](https://github.com/moodysalem) (1 issue, 5 comments)
* [@mrh42](https://github.com/mrh42) (1 issue)
* [@negamaxi](https://github.com/negamaxi) (1 issue, 1 comment)
* [@olivier-nerot](https://github.com/olivier-nerot) (1 issue, 1 comment)
* [@olizilla](https://github.com/olizilla) (2 commits, 1 PR, 1 comment)
* [@onichandame](https://github.com/onichandame) (1 comment)
* [@OR13](https://github.com/OR13) (2 issues)
* [@rvagg](https://github.com/rvagg) (5 comments)
* [@shazow](https://github.com/shazow) (1 commit, 1 PR)
* [@StationedInTheField](https://github.com/StationedInTheField) (1 issue, 4 comments)
* [@tabcat](https://github.com/tabcat) (1 PR, 2 issues, 4 comments)
* [@Tcll](https://github.com/Tcll) (2 issues, 4 comments)
* [@tk26](https://github.com/tk26) (1 commit, 1 PR, 3 comments)
* [@vasco-santos](https://github.com/vasco-santos) (66 commits, 20 PRs, 3 issues, 24 comments)
* [@vmx](https://github.com/vmx) (2 commits, 1 PR, 3 comments)
* [@vojtechsimetka](https://github.com/vojtechsimetka) (1 commit, 1 PR)
* [@welcome](undefined) (11 comments)
* [@wemeetagain](https://github.com/wemeetagain) (35 commits, 6 PRs, 2 issues, 5 comments)
* [@Xmader](https://github.com/Xmader) (3 commits, 3 PRs, 2 comments)
* [@xmaysonnave](https://github.com/xmaysonnave) (1 issue, 1 comment)

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
[Multihash]: https://multiformats.io/multihash
[DHT]: https://docs.ipfs.io/concepts/dht/
[Multiaddr]: https://multiformats.io/multiaddr/
[DAG]: https://docs.ipfs.io/concepts/merkle-dag/
[Core-API]: https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
