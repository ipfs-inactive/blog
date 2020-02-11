---
date: 2020-02-14
url: 2020-02-14-js-ipfs-0-41
title: js-ipfs 0.41.0 released
author: Alan Shaw
---

# 🔦 Highlights

> One giant leap forward

## 🦁 Async Await and Async Iterables

🎶 In the jungle, the mighty jungle the lion sleeps tonight!
🎶 async await, async await, async await, async await...

We've completed a [**HUGE** refactor](https://github.com/ipfs/js-ipfs/issues/1670) to js-ipfs internals 🥳, switching to using Promises and `async`/`await` over Callbacks and using async [iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) instead of [Node.js Streams](https://nodejs.org/dist/latest/docs/api/stream.html) and [Pull Streams](https://pull-stream.github.io/). Ok, I tell a lie, it's actually not just js-ipfs internals, it's the whole stack, including libp2p, IPLD and multiformats, you might call it a ground up re-write, but, you know, we don't like to brag.

🚨 Oh, wait, serious note - this release brings **big breaking changes** to the core API so please consult the "[API Changes](#api-changes)" section below for all the information.

It's been a long and emotional voyage but this refactor brings a plethora of incredible immediate and future benefits to consumers, contributors and core developers that make all the work and effort worthwhile. To summarise, we've:

* Switched to streaming APIs by default to reduce memory pressure
* Reduced API surface area by removing buffering, Node.js and Pull Stream APIs
* Reduced the amount of code in the code base and number of dependencies we depend on (for smaller browser bundles and faster install times)
* Switched to using async iterables to stream data to help make streaming more approachable
* Switched to using `async`/`await` so we’ll get better error stack traces and improved readability and maintainability

Using `async`/`await` in JavaScript is gaining a _lot_ of traction in the ecosystem and is rapidly becoming the de facto way of writing idiomatic JS. We want js-ipfs to **move with the times and continue to be attractive to contributors** by using modern JS features, techniques and practices. The big idea with these changes is for the code to be easier to contribute to, easier to understand, easier to maintain, and be faster and smaller than ever.

This change is so big, and so significant, we wrote a whole [blog post](https://blog.ipfs.io/2020-02-01-async-await-refactor/) about it to explain the motivations behind the changes...in ~~excruciating~~ delightful depth 🤣!

We've also compiled some stats on this refactor for your viewing pleasure:

* 27 direct dependencies were removed from our `package.json`
* 214 fewer modules end up in our browser bundle
* 155 kB lighter browser bundle ([unpkg.com/ipfs@0.40.0](https://unpkg.com/ipfs@0.40.0/dist/index.min.js) vs [unpkg.com/ipfs@0.41.0-rc.0](https://unpkg.com/ipfs@0.41.0-rc.0/dist/index.min.js)) - that's **18% smaller**!
* 124 kB lighter `ipfs-http-client` browser bundle ([unpkg.com/ipfs-http-client@41.0.1](https://unpkg.com/ipfs-http-client@41.0.1/dist/index.min.js) vs [unpkg.com/ipfs-http-client@42.0.0](https://unpkg.com/ipfs-http-client@42.0.0/dist/index.min.js)) - that's **60% smaller**!
* ~2,600 lines of code removed (net)
* ~360 lines of code removed from `ipfs-http-client` (net)
* ~10 minutes shorter CI run times

...and a lot of those stats are just for js-ipfs and js-ipfs-http-client - the tip of the iceberg! We saw changes similar to this for [between 60-70 dependencies](https://github.com/ipfs/js-ipfs/issues/1670) across IPFS, libp2p, IPLD and multiformats.

## 🌗 UnixFS v1.5

Turns out, it's really important for package managers to retain file metadata, particularly last modified time (`mtime`). File `mtime` allows them to selectively sync only data that has changed. Up until now if you wanted to host a large data set on IPFS, like a package manager's repository, it would be difficult to update.

"What about the permanent web?" I hear you cry. Well, this absolutely **doesn't** prevent a particular snapshot of a package manager's repository from being permanently available. Metadata just enables diffs to be imported, instead of the whole thing. So, when I say "difficult to update", like I did up there, I mean slow and/or impossible. When you have Terabytes (or more) of package data and someone publishes a new package, it's _kinda_ inconvenient to import _everything_ again, when only a little part changed. File `mtime` is a really good indicator of which things have changed, so you can use it in IPFS now! 🥳

For example, there's two new options to `jsipfs add` that allow `mode` and `mtime` to be preserved as the file is added to IPFS:

```console
$ jsipfs add -r --preserve-mtime --preserve-mode ~/Desktop/gif
added QmT6WX9McZyx5ZoisRgpsjYKDBWnYpMnBLpfAgjW5kavBA gif/yesthisisdog.jpg
added QmXMrFfZ9zHLZKN7xP2dX76YFFhvBJsQkd4fLnTDkyR31Q gif
```

Ok, no big changes there aside from the new options, buuut, now when you list directory contents you get `Mode` and `Mtime` info:

```console
$ jsipfs ls QmXMrFfZ9zHLZKN7xP2dX76YFFhvBJsQkd4fLnTDkyR31Q -v
Mode       Mtime                           Hash                                           Size  Name
-rw-r--r-- Apr 16, 2018, 12:20:33 PM GMT+1 QmT6WX9McZyx5ZoisRgpsjYKDBWnYpMnBLpfAgjW5kavBA 87779 yesthisisdog.jpg
```

The coolest thing is that it's completely backwards compatible. The CID for a given file/directory only changes if you opt in to metadata, otherwise the CIDs remain the same. Hooray!

There's a bunch of changes that add metadata capability to the CLI, HTTP and core API both for inputs and outputs. There's also a couple of new MFS commands `touch` and `chmod` which allow you to change the metadata whenever you like! Magic 🧙‍♂️.

See the API Changes sections below for details of all the new UnixFS v1.5 stuffs.

# 🏗 API Changes

## Core API

There are significant and breaking core API changes in this release. Please see the [migration guide](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26).

* IPFS is not a class that can be instantiated - use `IPFS.create`. An IPFS node instance is not an event emitter.
* The `init` option passed to `IPFS.create` will now _not_ take any initialization steps if it is set to `false`. Previously, the repo would be initialized if it already existed. This is no longer the case. If you wish to initialize a node but only if the repo exists, pass `init: { allowNew: false }` to the constructor.
* Instance `.ready` property has been removed. Please use `IPFS.create` instead.
* `IPFS.createNode` has been removed, please use `IPFS.create` instead.
* Callbacks are no longer supported on any API methods. Please use a utility such as [`callbackify`](https://www.npmjs.com/package/callbackify) on API methods that return Promises to emulate previous behaviour. See the [migration guide](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26#migrating-from-callbacks) for more info.
* Delegated peer and content routing modules are no longer included as part of core (but are still available if starting a js-ipfs daemon from the command line). If you wish to use delegated routing and are creating your node _programmatically_ in Node.js or the browser you must `npm install libp2p-delegated-content-routing` and/or `npm install libp2p-delegated-peer-routing` and provide configured instances of them in [`options.libp2p`](https://github.com/ipfs/js-ipfs#optionslibp2p). See the module repos for further instructions:
    - https://github.com/libp2p/js-libp2p-delegated-content-routing
    - https://github.com/libp2p/js-libp2p-delegated-peer-routing
* `add` now returns an async iterable.
* `add` now accepts `mode` and `mtime` options on inputs to allow setting mode and mtime metadata for added files. See the [core interface docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add) for more info.
* `add` results now contain a `cid` property (a [CID instance](https://github.com/multiformats/js-cid)) instead of a string `hash` property.
* 🆕 `add` results now include `mode` and `mtime` properties if they were set.
* `addReadableStream`, `addPullStream` have been removed. Please see the [migration guide](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26#migrating-to-async-iterables) for more info.
* `addFromStream` has been removed. Use `add` instead.
* `addFromFs` has been removed. Please use the exported `globSource` utility and pass the result to `add`. See the [glob source documentation](https://github.com/ipfs/js-ipfs#glob-source) for more details and an example.
* `addFromURL` has been removed. Please use the exported `urlSource` utility and pass the result to `add`. See the [URL source documentation](https://github.com/ipfs/js-ipfs#url-source) for more details and an example.
* `bitswap.stat` result has changed - `wantlist` and values are now an array of [CID](https://github.com/multiformats/js-cid) instances and `peers` is now a `string[]` of peer IDs.
* `bitswap.wantlist` now returns an array of [CID](https://github.com/multiformats/js-cid) instances.
* `block.rm` now returns an async iterable.
* `block.rm` now yields objects of `{ cid: CID, error: Error }`.
* `block.stat` result now contains a `cid` property (whose value is a [CID instance](https://github.com/multiformats/js-cid)) instead of a `key` property.
* `dht.findProvs`, `dht.provide`, `dht.put` and `dht.query` now all return an async iterable.
* `dht.findPeer`, `dht.findProvs`, `dht.provide`, `dht.put` and `dht.query` now yield/return an object `{ id: string, addrs: Multiaddr[] }` instead of a `PeerInfo` instance(s).
* 🆕 `files.chmod` has been added. See the [core interface docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#fileschmod) for info.
*  🆕 `files.flush` now returns the root CID for the path that was flushed (`/` by default)
* `files.lsPullStream` and `files.lsReadableStream` have been removed. Please see the [migration guide](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26#migrating-to-async-iterables) for more info.
* `files.ls` now returns an async iterable.
* `files.ls` results now contain a `cid` property (whose value is a [CID instance](https://github.com/multiformats/js-cid)) instead of a `hash` property.
* 🆕 `files.ls` results now include `mode` and `mtime` properties if they were set. See the [core interface docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#ls) for more info.
* `files.ls` no longer takes a `long` option (in core) - you will receive all data by default.
* 🆕 `files.mkdir` now accepts `mode` and `mtime` options to allow setting mode and mtime metadata. See the [core interface docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#filesmkdir) for more info.
* `files.readPullStream` and `files.readReadableStream` have been removed. Please see the [migration guide](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26#migrating-to-async-iterables) for more info.
* `files.read` now returns an async iterable.
* `files.stat` result now contains a `cid` property (whose value is a [CID instance](https://github.com/multiformats/js-cid)) instead of a `hash` property.
* 🆕 `files.stat` result now includes `mode` and `mtime` properties if they were set. See the [core interface docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#filesstat) for more info.
* 🆕 `files.touch` has been added. See the [core interface docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#filestouch) for info.
* 🆕 `files.write` now accepts `mode` and `mtime` options to allow setting mode and mtime metadata. See the [core interface docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#fileswrite) for more info.
* `get` now returns an async iterable. The `content` property value for objects yielded from the iterator is now an async iterable that yields [`BufferList`](https://github.com/rvagg/bl) objects.
* `id` result has changed, the `addresses` property is now a `Multiaddr[]`
* `name.resolve` now returns an async iterable. It yields increasingly more accurate resolved values as they are discovered until the best value is selected from the quorum of 16. The "best" resolved value is the last item yielded from the iterator. If you are interested only in this best value you could use `it-last` to extract it like so:

    ```js
    const last = require('it-last')
    await last(ipfs.name.resolve('/ipns/QmHash'))
    ```
* 🆕 `object.get` now accepts a `timeout` option. It will cause the method to throw with a `TimeoutError` if no data is received within the timeout window. It can be passed as a `number` or a `string`. If a `number` is passed it is interpreted as milliseconds, if a string is passed it is interpreted as a [human readable duration](https://www.npmjs.com/package/parse-duration).
* `ls` now returns an async iterable.
* `ls` results now contain a `cid` property (whose value is a [CID instance](https://github.com/multiformats/js-cid)) instead of a `hash` property.
* 🆕 `ls` results now include `mode` and `mtime` properties if they were set. See the [core interface docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#ls) for more info.
* `pin.add` results now contain a `cid` property (a [CID instance](https://github.com/multiformats/js-cid)) instead of a string `hash` property.
* 🆕 `pin.add` now accepts a `timeout` option. It will cause the method to throw with a `TimeoutError` if no data is received within the timeout window. It can be passed as a `number` or a `string`. If a `number` is passed it is interpreted as milliseconds, if a string is passed it is interpreted as a [human readable duration](https://www.npmjs.com/package/parse-duration).
* `pin.ls` now returns an async iterable.
* `pin.ls` results now contain a `cid` property (a [CID instance](https://github.com/multiformats/js-cid)) instead of a string `hash` property.
* `pin.rm` results now contain a `cid` property (a [CID instance](https://github.com/multiformats/js-cid)) instead of a string `hash` property.
* `ping` now returns an async iterable.
* `refs` and `refs.local` now return an async iterable.
* 🆕 `refs` now accepts a `timeout` option. It will cause the method to throw with a `TimeoutError` if no data is received within the timeout window. It can be passed as a `number` or a `string`. If a `number` is passed it is interpreted as milliseconds, if a string is passed it is interpreted as a [human readable duration](https://www.npmjs.com/package/parse-duration).
* `repo.gc` now returns an async iterable.
* `stats.bw` now returns an async iterable.
* `swarm.peers` now returns an array of objects with a `peer` property that is a `string`, instead of a `PeerId` instance.
* `swarm.addrs` now returns an array of objects `{ id: string, addrs: Multiaddr[] }` instead of `PeerInfo` instances.

## HTTP API

* 🆕 `/api/v0/add` now supports the following additional multipart headers to allow `mode` and `mtime` metadata to be set on individual files:
    * `mode` file mode to apply to created UnixFS entries `[string]`
    * `mtime` modification time in seconds before or since the Unix Epoch to apply to created UnixFS entries `[number]`
    * `mtime-nsecs` modification time fraction in nanoseconds `[number]`
* 🆕 `/api/v0/add` now returns file `Mode`, `Mtime` and `MtimeNsecs` if set.
* `/api/v0/file/ls` has been removed, please use `/api/v0/ls` instead.
* 🆕 `/api/v0/files/chmod` has been added and supports the following query string args:
  * `arg` path of file to apply mode to `[string]`
  * `mode` file mode to apply `[string]`
* 🆕 `/api/v0/files/ls` now returns file `Mode`, `Mtime` and `MtimeNsecs` if set.
* 🆕 `/api/v0/files/mkdir` now supports supports the following additional query string args:
    * `mode` file mode to apply `[string]`
    * `mtime` modification time in seconds before or since the Unix Epoch to apply `[number]`
* 🆕 `/api/v0/files/stat` now returns file `Mode`, `Mtime` and `MtimeNsecs` if set.
* 🆕 `/api/v0/files/touch` has been added and supports the following query string args:
  * `arg` path of file to apply mode to `[string]`
  * `mtime` modification time in seconds before or since the Unix Epoch to apply `[number]`
* 🆕 `/api/v0/files/write` now supports the following additional multipart headers:
    * `mode` file mode to apply to created UnixFS entries `[string]`
    * `mtime` modification time in seconds before or since the Unix Epoch to apply to created UnixFS entries `[number]`
* 🆕 `/api/v0/ls` now returns file `Mode`, `Mtime` and `MtimeNsecs` if set.

## CLI

* 🆕 `jsipfs add [file...]` now supports the following flags to respect and apply `mode` and `mtime` metadata of files added from the file system or explicitly set them:
    * `--preserve-mode` automatically apply permissions to created UnixFS entries from the file system `[boolean] [default: false]`
    * `--preserve-mtime` automatically apply modification time to created UnixFS entries from the file system `[boolean] [default: false]`
    * `--mode` file mode to apply to created UnixFS entries `[string]`
    * `--mtime` modification time in seconds before or since the Unix Epoch to apply to created UnixFS entries `[number]`
    * `--mtime-nsecs` modification time fraction in nanoseconds `[number]`
* `jsipfs file ls` has been removed, please use `jsipfs ls` instead.
* 🆕 `jsipfs files chmod [mode] [path]` has been added.
* 🆕 `jsipfs files ls` now prints file `mode` and `mtime`.
* 🆕 `jsipfs files mkdir` now supports the following flags:
    * `--mode` file mode to apply to created UnixFS entries `[string]`
    * `--mtime` modification time in seconds before or since the Unix Epoch to apply to created UnixFS entries `[number]`
* 🆕 `jsipfs files stat` now prints file `mode` and `mtime`.
* 🆕 `jsipfs files touch [path]` has been added and supports the following flags:
    * `--mtime` modification time in seconds before or since the Unix Epoch to apply to created UnixFS entries `[number]`
* 🆕 `jsipfs files write` now supports the following flags:
    * `--mode` file mode to apply to created UnixFS entries `[string]`
    * `--mtime` modification time in seconds before or since the Unix Epoch to apply to created UnixFS entries `[number]`
* 🆕 `jsipfs ls` now prints file `mode` and `mtime`.

## Other changes

* libp2p has been upgraded to 0.27, which also includes breaking changes to it's core API. Please see the release announcement post for more info:
    * https://blog.ipfs.io/2020-02-07-js-libp2p-0-27/
* The protocol _name_ for peer IDs in multiaddrs has changed from 'ipfs' to 'p2p'. There's no changes to data on the wire but this change is seen when multiaddrs are converted to strings.

# ❤️ Huge thank you to everyone that made this release possible

* [@achingbrain](https://github.com/achingbrain) (159 commits, 69 PRs, 10 issues, 121 comments)
* [@adamsoffer](https://github.com/adamsoffer) (2 comments)
* [@AdityaNambiar](https://github.com/AdityaNambiar) (1 issue, 1 comment)
* [@AgentJ-WR](https://github.com/AgentJ-WR) (1 PR, 1 issue)
* [@agowa338](https://github.com/agowa338) (1 issue)
* [@alanhoff](https://github.com/alanhoff) (1 comment)
* [@alanshaw](https://github.com/alanshaw) (85 commits, 88 PRs, 12 issues, 177 comments)
* [@AliMirlou](https://github.com/AliMirlou) (1 comment)
* [@andylim0221](https://github.com/andylim0221) (1 comment)
* [@AuHau](https://github.com/AuHau) (1 issue, 3 comments)
* [@autonome](https://github.com/autonome) (4 comments)
* [@blakebyrnes](https://github.com/blakebyrnes) (1 issue, 1 comment)
* [@bonedaddy](https://github.com/bonedaddy) (1 comment)
* [@bugeats](https://github.com/bugeats) (1 comment)
* [@calikevuche](https://github.com/calikevuche) (1 issue, 1 comment)
* [@carsonfarmer](https://github.com/carsonfarmer) (14 commits, 9 PRs, 4 issues, 27 comments)
* [@chriamue](https://github.com/chriamue) (1 PR)
* [@claassistantio](https://github.com/claassistantio) (3 comments)
* [@codecov-io](https://github.com/codecov-io) (9 comments)
* [@coryschwartz](https://github.com/coryschwartz) (1 PR, 1 comment)
* [@DallasC](https://github.com/DallasC) (1 issue)
* [@DaniellMesquita](https://github.com/DaniellMesquita) (3 comments)
* [@dannyid](https://github.com/dannyid) (1 comment)
* [@daviddias](https://github.com/daviddias) (6 commits, 3 PRs, 2 issues, 21 comments)
* [@DieMyst](https://github.com/DieMyst) (1 issue)
* [@dignifiedquire](https://github.com/dignifiedquire) (2 comments)
* [@dirkmc](https://github.com/dirkmc) (11 commits, 5 PRs, 9 comments)
* [@dostu](https://github.com/dostu) (1 comment)
* [@ekkis](https://github.com/ekkis) (1 issue, 6 comments)
* [@elmariachi111](https://github.com/elmariachi111) (1 comment)
* [@emclab](https://github.com/emclab) (4 issues, 7 comments)
* [@eordano](https://github.com/eordano) (1 PR)
* [@folex](https://github.com/folex) (1 comment)
* [@ggarri](https://github.com/ggarri) (1 commit, 1 PR, 3 issues, 5 comments)
* [@hacdias](https://github.com/hacdias) (9 commits, 4 PRs, 1 issue, 15 comments)
* [@hiddentao](https://github.com/hiddentao) (1 comment)
* [@hugomrdias](https://github.com/hugomrdias) (48 commits, 10 PRs, 3 issues, 41 comments)
* [@iameddieyayaya](https://github.com/iameddieyayaya) (1 comment)
* [@ilirhushi](https://github.com/ilirhushi) (2 PRs, 2 comments)
* [@inspiraluna](https://github.com/inspiraluna) (2 comments)
* [@jacobheun](https://github.com/jacobheun) (123 commits, 28 PRs, 3 issues, 55 comments)
* [@jimpick](https://github.com/jimpick) (1 commit, 1 PR)
* [@joequant](https://github.com/joequant) (1 issue)
* [@john-osullivan](https://github.com/john-osullivan) (1 issue, 4 comments)
* [@Jorropo](https://github.com/Jorropo) (1 PR)
* [@kawmaiparis](https://github.com/kawmaiparis) (1 issue)
* [@khartig](https://github.com/khartig) (1 issue)
* [@kottackalsulvin](https://github.com/kottackalsulvin) (2 issues)
* [@kuabhish](https://github.com/kuabhish) (4 comments)
* [@kumavis](https://github.com/kumavis) (1 PR, 1 issue, 6 comments)
* [@leandroyalet](https://github.com/leandroyalet) (2 comments)
* [@lidel](https://github.com/lidel) (6 commits, 3 PRs, 12 comments)
* [@Maj0rT](https://github.com/Maj0rT) (2 issues, 1 comment)
* [@mariotaku](https://github.com/mariotaku) (1 issue, 2 comments)
* [@mburns](https://github.com/mburns) (5 PRs, 1 comment)
* [@mcclure](https://github.com/mcclure) (1 issue, 2 comments)
* [@michaelsbradleyjr](https://github.com/michaelsbradleyjr) (1 comment)
* [@mikeal](https://github.com/mikeal) (5 commits, 3 PRs, 3 issues, 18 comments)
* [@mohe2015](https://github.com/mohe2015) (1 comment)
* [@momack2](https://github.com/momack2) (1 comment)
* [@mpetrunic](https://github.com/mpetrunic) (1 issue, 1 comment)
* [@mqklin](https://github.com/mqklin) (1 issue, 1 comment)
* [@My9Bot](https://github.com/My9Bot) (1 comment)
* [@nhynes](https://github.com/nhynes) (2 comments)
* [@npfoss](https://github.com/npfoss) (1 comment)
* [@oed](https://github.com/oed) (1 comment)
* [@olizilla](https://github.com/olizilla) (2 commits, 1 PR, 11 comments)
* [@parkan](https://github.com/parkan) (1 comment)
* [@pcowgill](https://github.com/pcowgill) (1 commit, 2 PRs, 7 issues, 41 comments)
* [@PedroMiguelSS](https://github.com/PedroMiguelSS) (6 commits, 6 PRs, 3 comments)
* [@peter-donovan](https://github.com/peter-donovan) (1 comment)
* [@posix4e](https://github.com/posix4e) (1 issue)
* [@Prabhakar-Poudel](https://github.com/Prabhakar-Poudel) (2 comments)
* [@pvsmounish](https://github.com/pvsmounish) (1 comment)
* [@qu37zal](https://github.com/qu37zal) (1 issue)
* [@raulk](https://github.com/raulk) (1 comment)
* [@raullaprida](https://github.com/raullaprida) (1 issue, 1 comment)
* [@ribasushi](https://github.com/ribasushi) (1 issue, 2 comments)
* [@ridenaio](https://github.com/ridenaio) (2 issues)
* [@Rkrushanovskij](https://github.com/Rkrushanovskij) (1 issue, 1 comment)
* [@robertkiel](https://github.com/robertkiel) (3 issues, 2 comments)
* [@ruifortes](https://github.com/ruifortes) (3 issues)
* [@rvagg](https://github.com/rvagg) (3 commits, 4 PRs, 5 comments)
* [@SahidMiller](https://github.com/SahidMiller) (1 comment)
* [@Schwartz10](https://github.com/Schwartz10) (1 issue)
* [@shamb0t](https://github.com/shamb0t) (1 issue, 1 comment)
* [@shresthagrawal](https://github.com/shresthagrawal) (1 commit, 1 PR, 1 issue, 7 comments)
* [@Stebalien](https://github.com/Stebalien) (4 commits, 3 PRs, 1 issue, 10 comments)
* [@SvenMeyer](https://github.com/SvenMeyer) (1 issue, 4 comments)
* [@tapaswenipathak](https://github.com/tapaswenipathak) (1 commit)
* [@terichadbourne](https://github.com/terichadbourne) (3 comments)
* [@travisperson](https://github.com/travisperson) (1 comment)
* [@tuyennhv](https://github.com/tuyennhv) (1 comment)
* [@uchetron](https://github.com/uchetron) (1 PR)
* [@uluhonolulu](https://github.com/uluhonolulu) (1 comment)
* [@vasco-santos](https://github.com/vasco-santos) (92 commits, 42 PRs, 5 issues, 56 comments)
* [@Velenir](https://github.com/Velenir) (1 issue)
* [@vmx](https://github.com/vmx) (22 commits, 1 PR, 1 issue, 25 comments)
* [@vweevers](https://github.com/vweevers) (1 comment)
* [@wehriam](https://github.com/wehriam) (1 comment)
* [@wemeetagain](https://github.com/wemeetagain) (16 commits, 4 PRs, 5 comments)
* [@xmaysonnave](https://github.com/xmaysonnave) (1 issue, 1 comment)
* [@zhoreeq](https://github.com/zhoreeq) (1 comment)
* [@zicmama](https://github.com/zicmama) (1 comment)
* [@zot](https://github.com/zot) (2 comments)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-ipfs repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at https://discuss.ipfs.io/ and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](https://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
