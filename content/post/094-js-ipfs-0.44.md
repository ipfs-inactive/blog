---
date: 2020-05-18
url: 2020-05-18-js-ipfs-0-44
title: js-ipfs 0.44.0 released
header_image: js-ipfs-placeholder.png
author: Alex Potsides
---

# 🔦 Highlights

> Cancellable requests and a new browser datastore

`js-IPFS@0.44.0` is out of the door with support for cancelling requests and a leaner, meaner datastore for the browser!

## 🤖 Cancellable requests

A user should be able to cancel long-lived asynchronous API operations. For example, if you are fetching the content for a [CID][] from the network, and that CID is not resolveable, you should be able to set a timeout value for the request, after which the content would no longer be sought and control would be returned to your code with an error message describing what happened.

This is not as straightforward as it seems in JavaScript because a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is returned from the API call to resolve a piece of content and the [Promises spec](https://promisesaplus.com/) includes nothing about cancelling a Promise.

However, the browser [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) has a notion of an [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) which can be used to abort web requests. They are interacted with via an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController):

```javascript
const controller = new AbortController()

setTimeout(() => {
  controller.abort()
}, 1000)

try {
  await result = fetch('http://example.com', {
    signal: controller.signal
  })
} catch (err) {
  console.err(err) // prints: user aborted the request
}
```

We’ve taken this approach and integrated it into every API call, so you can now use AbortControllers to cancel requests! We’ve also used this mechanism to add a `timeout` option to every API call which internally uses an AbortSignal to stop the request after the specified amount of time:

```javascript
const cid = new CID('QmWillNeverResolve')

try {
  await ipfs.get(cid, {
    timeout: 1000 // abort after 1000ms
  })
} catch (err) {
  console.err(err)
}
```

You could also roll this yourself:

```javascript
const cid = new CID('QmWillNeverResolve')
const controller = new AbortController()

setTimeout(() => {
  controller.abort()
}, 1000)

try {
  await ipfs.get(cid, {
    signal: controller.signal
  })
} catch (err) {
  console.err(err)
}
```

The AbortSignal is passed all the way down the call stack to the libp2p and ipld components that underpin IPFS. In this initial release, timeouts are supported by the IPFS layer and in future releases libp2p and ipld will use the AbortSignal to also free up resources and perform any other necessary cleanup that would have been done if the request had completed successfully.

## New browser datastore

`js-IPFS@0.44.0` brings a new datastore to the browser. In the browser, all blocks and other repo data is currently stored in [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), given that it is the only way available to persist and query large amounts of user data at the time of writing.

In node and go-ipfs, [LevelDB](https://en.wikipedia.org/wiki/LevelDB) has been the datastore of choice for application data (though blocks have been stored on the filesystem) and go-IPFS is moving to [Badger](https://dgraph.io/blog/post/badger/)).

Out of this grew [interface-datastore](https://github.com/ipfs/interface-datastore)—a spec for storing key/value pairs implemented by the datastores used by IPFS. In the browser this was [datastore-level](https://github.com/ipfs/js-datastore-level) which was backed by [level-js](https://www.npmjs.com/package/level-js), which was backed by IndexedDB.

Phew.

To remove a few layers here, we’ve created the [datastore-idb](https://github.com/ipfs/js-datastore-idb) which implemenets the interface-datastore spec, backed by IndexedDB without going via level.

What does this mean?

The new datastore is smaller and faster and the upgrade is seamless since it’s still IndexedDB under the hood:

```
datastore-idb up to 44% faster and 69% smaller

batch idb x 5.26 ops/sec ±4.57% (29 runs sampled)
batch level x 2.92 ops/sec ±3.76% (19 runs sampled)
Fastest is batch idb

size 37.32KB to 11.41KB
```

## ✨New features

* Cancellable API calls ([#2993](https://github.com/ipfs/js-ipfs/issues/2993)) ([2b24f59](https://github.com/ipfs/js-ipfs/commit/2b24f590041a0df9da87b75ae2344232fe22fe3a)), closes [#3015](https://github.com/ipfs/js-ipfs/issues/3015)
* `ipfs.block.put` now accepts the `pin` argument in line with go-ipfs [#3015](https://github.com/ipfs/js-ipfs/issues/3015)

## 🦟 Bugs fixed

* Fixes browser script tag example ([#3034](https://github.com/ipfs/js-ipfs/issues/3034)) ([ee8b769](https://github.com/ipfs/js-ipfs/commit/ee8b769b96f7e3c8414bbf85853ab4e21e8fd11c)), closes [#3027](https://github.com/ipfs/js-ipfs/issues/3027)
* No longer produces browser bundle with all IPLD formats in the browser ([#3025](https://github.com/ipfs/js-ipfs/issues/3025)) ([e6079c1](https://github.com/ipfs/js-ipfs/commit/e6079c17d5656e92dd5191f0581000c6a782c7ed))
* Remove node globals ([#2932](https://github.com/ipfs/js-ipfs/issues/2932)) ([d0d2f74](https://github.com/ipfs/js-ipfs/commit/d0d2f74cef4e439c6d2baadba1f1f9f52534fcba))
* `typeof` bug when passing timeout to dag.get ([#3035](https://github.com/ipfs/js-ipfs/issues/3035)) ([026a542](https://github.com/ipfs/js-ipfs/commit/026a5423e00992968840c9236afe47bdab9ee834))
* Removes use of node globals and built ins to prepare us for when browser bundlers stop automatically including them [#2932](https://github.com/ipfs/js-ipfs/pull/2932)
* Source maps are no longer included with production builds [ipfs/aegir#549](https://github.com/ipfs/aegir/pull/549)

## 🗺️ What’s next?

Check out the js-ipfs [Project Roadmap](https://github.com/orgs/ipfs/projects/6) which contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

* [@5310](https://github.com/5310) (2 comments)
* [@achingbrain](https://github.com/achingbrain) (55 commits, 17 PRs, 3 issues, 33 comments)
* [@alanshaw](https://github.com/alanshaw) (1 issue, 3 comments)
* [@aphelionz](https://github.com/aphelionz) (2 comments)
* [@AuHau](https://github.com/AuHau) (1 comment)
* [@autonome](https://github.com/autonome) (1 comment)
* [@bertrandfalguiere](https://github.com/bertrandfalguiere) (1 comment)
* [@betamos](https://github.com/betamos) (1 PR, 1 issue, 7 comments)
* [@bluelovers](https://github.com/bluelovers) (1 PR, 1 comment)
* [@carsonfarmer](https://github.com/carsonfarmer) (1 commit)
* [@codecov-io](https://github.com/codecov-io) (1 comment)
* [@corporatepiyush](https://github.com/corporatepiyush) (1 issue)
* [@dapplion](https://github.com/dapplion) (2 comments)
* [@dirkmc](https://github.com/dirkmc) (2 commits)
* [@Gozala](https://github.com/Gozala) (5 issues, 15 comments)
* [@hugomrdias](https://github.com/hugomrdias) (11 commits, 4 PRs, 1 issue, 17 comments)
* [@jacobheun](https://github.com/jacobheun) (8 commits, 2 PRs, 1 issue, 8 comments)
* [@jakehemmerle](https://github.com/jakehemmerle) (3 comments)
* [@koivunej](https://github.com/koivunej) (1 comment)
* [@lidel](https://github.com/lidel) (1 commit, 2 comments)
* [@mdtanrikulu](https://github.com/mdtanrikulu) (1 issue, 1 comment)
* [@mistakia](https://github.com/mistakia) (1 PR)
* [@npfoss](https://github.com/npfoss) (1 commit, 1 PR, 1 issue)
* [@obo20](https://github.com/obo20) (1 commit, 1 PR, 1 comment)
* [@oed](https://github.com/oed) (1 comment)
* [@RobertFischer](https://github.com/RobertFischer) (1 comment)
* [@robertkiel](https://github.com/robertkiel) (1 comment)
* [@rvagg](https://github.com/rvagg) (1 PR, 1 comment)
* [@spasimir21](https://github.com/spasimir21) (1 issue, 3 comments)
* [@stensonb](https://github.com/stensonb) (1 commit, 13 PRs)
* [@thattommyhall](https://github.com/thattommyhall) (1 PR, 3 comments)
* [@typhu-xyz](https://github.com/typhu-xyz) (1 comment)
* [@vasco-santos](https://github.com/vasco-santos) (14 commits, 15 PRs, 2 issues, 16 comments)
* [@vmx](https://github.com/vmx) (5 commits, 1 PR, 2 comments)
* [@welcome](undefined) (19 comments)
* [@wemeetagain](https://github.com/wemeetagain) (2 commits, 1 PR, 3 comments)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don’t know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-ipfs repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
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
