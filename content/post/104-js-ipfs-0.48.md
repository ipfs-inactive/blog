---
date: 2020-07-20
url: /2020-07-20-js-ipfs-0-48/
title: js-IPFS 0.48.0 released with connectivity improvements and smaller blockstore
header_image: js-ipfs-placeholder.png
author: Alex Potsides
---

# 🔦 Highlights

> delegates turned on by default, smaller, faster blockstore and a more intuitive API

`js-IPFS@0.48.0` is hot off the press with much better default connectivity, a smaller blockstore and a more intuitive API

## 🧭 Delegate nodes on by default

JS IPFS has traditionally primarily targeted the browser, and the browser is a bad place to be if you want to be on the [DHT][]. You typically aren't on a page long enough to make or respond to [DHT][] queries, nor are you diallable, so even if you were able to advertise yourself as a provider for a given block, the chances are no-one can connect to you to retrieve that block which results in a degraded service for everyone. Worse, the way you find more peers and content is via the [DHT][] so you're kind of stuck.

There are several ways to give in-browser IPFS nodes a better experience on the network, one of those is [Delegate Nodes](https://blog.ipfs.io/2019-08-06-js-ipfs-0-37/#delegated-peer-and-content-routing). A Delegate Node is a network peer that performs certain actions on behalf of other nodes on the network. In this case it will make [DHT][] queries on our behalf so we can find more peers and more content than ever before.

`js-IPFS@0.48.0` enables delegate nodes in the configuration by default, which means you should see far more peers than you have previously and be able to find content faster and more reliably.

By default it uses [public delegate nodes](https://github.com/ipfs/js-ipfs/blob/master/packages/ipfs/docs/DELEGATE_ROUTERS.md) to give you the best out-of-the-box experience. These nodes are a shared commons but have no availability guarantees and are potentially a source of resource contention. If you are deploying JS IPFS in a production environment you should host your own delegate nodes and [configure JS IPFS](https://github.com/ipfs/js-ipfs/blob/master/docs/CONFIG.md#delegates) accordingly.

## 🏓 DHT configuration

The full [DHT][] implementation for JS IPFS with all the [changes made in Go IPFS 0.5](https://blog.ipfs.io/2020-05-19-road-to-dht/) will not arrive until later this year, but for the time being you can run the experimental [DHT][] implementation. This implementation is incomplete so some features may not work as intended but you should be able to use it to resolve content and find peers though there may be some performance degredation on your node over time.

You can enable the [DHT][] for JS IPFS daemons via the command line. To put your node into client mode run:

```console
$ jsipfs config Routing.Type dhtclient
```

Then restart your daemon process and you'll be running the [DHT][].

To do the same thing in your application, use the `libp2p` config option:

```javascript
const IPFS = require('ipfs')

const node = await IPFS.create({
  libp2p: {
    config: {
      dht: {
        enabled: true,
        clientMode: true
      }
    }
  }
})
```

DHT peers operate in either [client mode or server mode](https://github.com/ipfs/go-ipfs/blob/0acfb38763208999d0608a28f534867baad615f3/docs/config.md#routingtype). DHT clients can make queries to find content and other peers but will not advertise themselves as providers of content or answer any queries. You might be in client mode for any number of reasons but the primary one is that most DHT peers are behind a [NAT](https://en.wikipedia.org/wiki/Network_address_translation) firewall which means peers on other networks cannot dial them via [ipfs.swarm.connect](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/SWARM.md#ipfsswarmconnectaddr-options). Unless you know your node will have a public address, you should run it in client mode.

Go IPFS nodes use the [libp2p-autonat](https://github.com/libp2p/go-libp2p-autonat) package to determine if they are diallable by peers on external networks or not - if they are, they upgrade themselves from DHT clients to DHT servers. Autonat support [is on the way for JS IPFS](https://github.com/libp2p/js-libp2p/issues/104) but until it lands it will only operate in client mode, which is a stepping stone on the way to full DHT support.

## 🧱 Smaller, faster blockstore

In the early days of IPFS, all [CID][]s were v0. That meant they were a bare [multihash][] - a byte array prefixed with some prefixed bytes that told you what sort of hash the rest of the bytes represented (`sha2-256`, `blake2s-128` etc) and how many of those bytes were present. The [multihash][] was created by hashing the data in a [block](https://docs.ipfs.io/how-to/work-with-blocks/) which was then stored in the block store contained within the [IPFS repo](https://github.com/ipfs/js-ipfs-repo).

Later v1 [CID][]s arrived and they added a version number and a codec to the byte array, but the [CID][] still contained the [multihash][] - a block can correspond to multiple [CID][]s, as long as they contain the same [multihash][].

The blockstore was turning [CID][]s into byte arrays and using these to generate the key for a block, which meant the same block might get stored against a v0 [CID][] and a v1 [CID][]. Since the block data is the same, the repo was also doing a double-lookup on each passed [CID][] - once as a v0 [CID][] and if the block was not found, again as a v1 [CID][].

With the release of `js-IPFS@0.48.0`, all blocks are now stored against the base32 encoded [multihash][] extracted from the [CID][]. This means no more duplication and no more double-lookups, but it's come at the cost of needing to do a repo migration from v7 to v8 to ensure that all your blocks are stored under the correct key.

You may notice this when starting up your node:

```console
$ jsipfs daemon
Initializing IPFS daemon...
js-ipfs version: 0.48.0
System version: x64/darwin
Node.js version: 12.16.1
Incompatible repo version. Migration needed. Pass --migrate for automatic migration
```

Just pass `--migrate` and your blockstore will be converted:

```console
$ jsipfs daemon --migrate
Initializing IPFS daemon...
js-ipfs version: 0.48.0
System version: x64/darwin
Node.js version: 12.16.1
Swarm listening on /ip4/127.0.0.1/tcp/4002/p2p/QmSRS11FZeMHvqe5wZamurpgj2Jmm9SYX76t7ZtJ7Tt74d
Swarm listening on /ip4/192.168.1.109/tcp/4002/p2p/QmSRS11FZeMHvqe5wZamurpgj2Jmm9SYX76t7ZtJ7Tt74d
Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/p2p/QmSRS11FZeMHvqe5wZamurpgj2Jmm9SYX76t7ZtJ7Tt74d
API listening on /ip4/127.0.0.1/tcp/5002/http
Gateway (read only) listening on /ip4/127.0.0.1/tcp/9090/http
Web UI available at http://127.0.0.1:5002/webui
Daemon is ready
```

When used as a [module](https://github.com/ipfs/js-ipfs/blob/1760b8928dac14b3abcfa4a889042f0d7a956386/packages/ipfs/docs/MODULE.md) in the browser, or an application, [options.repoAutoMigrate](https://github.com/ipfs/js-ipfs/blob/1760b8928dac14b3abcfa4a889042f0d7a956386/packages/ipfs/docs/MODULE.md#optionsrepoautomigrate) is enabled by default so the upgrade will happen invisibly in the background; all you will notice is a one-off slightly longer startup time.

## 🗺️ A more intuitive API

As the IPFS ecosystem grows more and more developers become interested in the project and start using our APIs. A lot of them have grown organically over time and not all of them have had equal amounts of time invested in them.

The following changes only affect the [core](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs) API and [ipfs-http-client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client). The actual [HTTP API](https://docs.ipfs.io/reference/http/api/) and [CLI](https://docs.ipfs.io/reference/cli/) remain unchanged.

### ipfs.add()

Over time we've tried to remove the requirement to understand other frameworks and weird facets of the JavaScript language to start using IPFS. We removed [pull-streams](https://github.com/pull-stream/pull-stream) to let developers focus on the natural primitives of the environment they were developing for - e.g. [streams](https://nodejs.org/api/stream.html) in node and [Files](https://developer.mozilla.org/en-US/docs/Web/API/File)/[Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob) in the browser.  We removed the requirement to convert [Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) to [Buffers](https://nodejs.org/api/buffer.html) to let people simply add stringified JSON as a file to IPFS.

We refactored the whole API from [callbacks](https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-callbacks/) to [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), then from returning [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) to [AsyncIterators](https://jakearchibald.com/2017/async-iterators-and-generators/) to allow streaming of enormous amounts of data without using external libraries.

In that last piece we lost a little bit of usability, as the humble `ipfs.add` API takes all manner of arguments and always returns an AsyncIterator:

```javascript
for await (const file of ipfs.add('My file content')) {
  // Wait, what?  I only added one file, why am I in a loop?
}
```

With `js-IPFS@0.48.0`, `ipfs.add` now returns a single item. This seemingly innocuous change brings a raft of usability improvements as a very common question is 'I added a file, and got back `[object AsyncGenerator]`, what is that?' and then you have to get the whiteboard and the pens out and before you know it you've gone down a long explanation cul de sac when all they wanted to do was get a [CID][] back.

```javascript
const file = await ipfs.add('My file content')
// Ahh, much better
```

But you can still add whole directories of files if you want to, just call `ipfs.addAll`:

```javascript
const files = [{
  path: '/foo/file1.txt',
  content: 'file 1'
}, {
  path: '/foo/file2.txt',
  content: 'file 2'
}]

for await (const file of ipfs.addAll(files)) {
  // All the files!
}
```

### APIs with optional arguments

Recently we [released a change](https://blog.ipfs.io/2020-05-21-js-ipfs-0-44/#cancellable-requests) that allowed passing [AbortSignal][]s to all API methods. This necessitated adding an `options` object to every API call that didn't have one already. This left us in the weird situation where some arguments were optional, but were not in the options argument. Worse, the actions of some API calls changed dramatically depending on whether you passed an option or not. For example `ipfs.bootstrap.rm([multiaddr])` would completely empty the bootstrap list if you didn't pass a [Multiaddr][].

All this leads to weird behaviour and subtle bugs when you pass things like `undefined` in for an optional arg position and don't pass an options argument, as well as knotty, error-prone internal code that tries to guess what you passed based on type or properties of the objects where their types are the same.

With `js-IPFS@0.48.0`, all optional parameters to API methods now go in the options object. All APIs that have dramatic changes in behaviour have been split into more intuitive commands.

For example:

```javascript
// before
ipfs.bootstrap.add('/ip4/...') // adds a multiaddr to the bootstrap list
ipfs.bootstrap.add({ default: true }) // restores default bootstrappers

// after
ipfs.bootstrap.add('/ip4/...') // adds a multiaddr to the bootstrap list
ipfs.bootstrap.reset() // restores default bootstrappers
```

```javascript
// before
ipfs.bootstrap.rm('/ip4/...') // removes a multiaddr from the bootstrap list
ipfs.bootstrap.rm({ all: true }) // empties bootstrapper list

// after
ipfs.bootstrap.rm('/ip4/...') // removes a multiaddr from the bootstrap list
ipfs.bootstrap.clear() // empties bootstrapper list
```

See the API Changes section below for the full rundown.

# ✨New features

* add interface and http client versions to version output ([#3125](https://github.com/ipfs/js-ipfs/issues/3125)) ([65f8b23](https://github.com/ipfs/js-ipfs/commit/65f8b23f550f939e94aaf6939894a513519e6d68)), closes [#2878](https://github.com/ipfs/js-ipfs/issues/2878)
* add size-only flag to cli repo stat command ([#3143](https://github.com/ipfs/js-ipfs/issues/3143)) ([b4d3bf8](https://github.com/ipfs/js-ipfs/commit/b4d3bf80e7cd5820e2561fc957a9f0f17235df05))
* enable DHT by Routing.Type config key ([#3153](https://github.com/ipfs/js-ipfs/issues/3153)) ([dfe15d7](https://github.com/ipfs/js-ipfs/commit/dfe15d7422579afce8860f6321575454826d1844))
* store blocks by multihash instead of CID ([#3124](https://github.com/ipfs/js-ipfs/issues/3124)) ([03b17f5](https://github.com/ipfs/js-ipfs/commit/03b17f5e2d290e84aa0cb541079b79e468e7d1bd))
* turn on delegate nodes by default ([#3148](https://github.com/ipfs/js-ipfs/issues/3148)) ([3fd2ca8](https://github.com/ipfs/js-ipfs/commit/3fd2ca8c7bb3a907cc74d48516481fae01d47327))
* optional arguments go in the options object ([#3118](https://github.com/ipfs/js-ipfs/issues/3118)) ([8cb8c73](https://github.com/ipfs/js-ipfs/commit/8cb8c73037e44894d756b70f344b3282463206f9))
* add config.getAll ([#3071](https://github.com/ipfs/js-ipfs/issues/3071)) ([16587f1](https://github.com/ipfs/js-ipfs/commit/16587f16e1b3ae525c099b1975748510638aceee))
* libp2p noise as fallback for secio ([#3074](https://github.com/ipfs/js-ipfs/issues/3074)) ([660d3db](https://github.com/ipfs/js-ipfs/commit/660d3db9a47bff652057762b52a25529ab37117f))
* persist peerstore ([#3072](https://github.com/ipfs/js-ipfs/issues/3072)) ([b404974](https://github.com/ipfs/js-ipfs/commit/b40497427b7d33f52803c8fa14cc73be7f872d65))
* webui v2.9.0 ([#3054](https://github.com/ipfs/js-ipfs/issues/3054)) ([5d9d331](https://github.com/ipfs/js-ipfs/commit/5d9d331ed42f3ac9efc243878011db871b742a4e))
* support loading arbitrary ipld formats in the http client ([#3073](https://github.com/ipfs/js-ipfs/issues/3073)) ([bd12773](https://github.com/ipfs/js-ipfs/commit/bd127730039ab79dd7ad22b31245939ee01a6514))
* use libp2p 0.28.0 ([#3019](https://github.com/ipfs/js-ipfs/pull/3019))


# 🦟 Bugs fixed

* do not list raw nodes in a dag as directories ([#3155](https://github.com/ipfs/js-ipfs/issues/3155)) ([585a142](https://github.com/ipfs/js-ipfs/commit/585a142d3c2317e80f37d6195ce24ed3146112e5))
* error when no command specified ([#3145](https://github.com/ipfs/js-ipfs/issues/3145)) ([4309e10](https://github.com/ipfs/js-ipfs/commit/4309e1004bb77ee276b57228c35a921fb780a227))
* peer ids are returned as strings so don't call toB58String on them ([#3162](https://github.com/ipfs/js-ipfs/issues/3162)) ([281bfe6](https://github.com/ipfs/js-ipfs/commit/281bfe60f079011d0ada783a82d1f030d08a89f2))
* still load dag-pb, dag-cbor and raw when specifying custom formats ([#3132](https://github.com/ipfs/js-ipfs/issues/3132)) ([a96e3bc](https://github.com/ipfs/js-ipfs/commit/a96e3bc9e3763004beafc24b98efa85ffa665622)), closes [#3129](https://github.com/ipfs/js-ipfs/issues/3129)
* unhandledpromiserejection in electron tests ([#3146](https://github.com/ipfs/js-ipfs/issues/3146)) ([4c0c67f](https://github.com/ipfs/js-ipfs/commit/4c0c67f023c75bbcb56b0520b31f1334480a5130))
* use post for preloading ([#3149](https://github.com/ipfs/js-ipfs/issues/3149)) ([c9700f7](https://github.com/ipfs/js-ipfs/commit/c9700f78cefc523f6140361a90099c4991b427a7))
* optional arguments go in the options object ([#3118](https://github.com/ipfs/js-ipfs/issues/3118)) ([8cb8c73](https://github.com/ipfs/js-ipfs/commit/8cb8c73037e44894d756b70f344b3282463206f9))
* still load dag-pb, dag-cbor and raw when specifying custom formats ([#3132](https://github.com/ipfs/js-ipfs/issues/3132)) ([a96e3bc](https://github.com/ipfs/js-ipfs/commit/a96e3bc9e3763004beafc24b98efa85ffa665622)), closes [#3129](https://github.com/ipfs/js-ipfs/issues/3129)
* libp2p now requires encryption module ([#3085](https://github.com/ipfs/js-ipfs/issues/3085)) ([c567282](https://github.com/ipfs/js-ipfs/commit/c56728209f0eea63d00c68163c74cfdd350de69c))

# 🏗 API Changes

## Core API & HTTP API Client

* `ipfs.add` only works on single items - a Uint8Array, a String, an AsyncIterable<Uint8Array> etc
* `ipfs.addAll` works on multiple items
* `ipfs.bitswap.wantlist([peer], [options])` is split into:
  * `ipfs.bitswap.wantlist([options])`
  * `ipfs.bitswap.wantlistForPeer(peer, [options])`
* `ipfs.bootstrap.add([addr], [options])` is split into:
  * `ipfs.bootstrap.add(addr, [options])` - add a bootstrap node
  * `ipfs.bootstrap.reset()` - restore the default list of bootstrap nodes
* `ipfs.bootstrap.rm([addr], [options])` is split into:
  * `ipfs.bootstrap.rm(addr, [options])` - remove a bootstrap node
  * `ipfs.bootstrap.clear([options])` - empty the bootstrap list
* `ipfs.config.get([key])` is split into:
  * `ipfs.config.get(key)` - return a value for a config key
  * `ipfs.config.getAll()` - return the whole config
* `ipfs.dag.resolve` returns `Promise<{ cid, remainderPath }` instead of `AsyncIterator<{ value, remainderPath }>`
  * Previously the core api returned an async iterator and the http client returned a simple promise
* `ipfs.dag.get(cid, [path], [options])` becomes `ipfs.dag.get(cid, [options])`
  * `path` is moved into the `options` object
* `ipfs.dag.tree(cid, [path], [options])` becomes `ipfs.dag.tree(cid, [options])`
  * `path` is moved into the `options` object
* `ipfs.dag.resolve(cid, [path], [options])` becomes `ipfs.dag.resolve(cid, [options])`
  * `path` is moved into the `options` object
* `ipfs.files.flush([path], [options])` becomes `ipfs.files.flush(path, [options])`
* `ipfs.files.ls([path], [options])` becomes `ipfs.files.ls(path, [options])`
* `ipfs.object.new([template], [options])` becomes `ipfs.object.new([options])`
  * `template` is moved into the `options` object
* `ipfs.pin.ls([paths], [options])` becomes `ipfs.pin.ls([options])`
   * `paths` is moved into the `options` object
* `ipfs.refs.local` now returns a v1 CID with the raw codec for every block and not the original CID by which it was added to the blockstore - nb for the ipfs-http-client this is only true when running against js-ipfs

For further reading, see the [Core API Docs](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api).

# 🗺️ What’s next?

Check out the js-IPFS [Project Roadmap](https://github.com/orgs/ipfs/projects/6) which contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

* [@3xtr4t3rr3str14l](https://github.com/3xtr4t3rr3str14l) (2 commits, 1 PR)
* [@achingbrain](https://github.com/achingbrain) (112 commits, 59 PRs, 2 issues, 109 comments)
* [@adamprocter](https://github.com/adamprocter) (1 issue, 7 comments)
* [@andrew](https://github.com/andrew) (1 issue, 1 comment)
* [@anywhichway](https://github.com/anywhichway) (1 issue, 1 comment)
* [@aphelionz](https://github.com/aphelionz) (2 comments)
* [@aquiladev](https://github.com/aquiladev) (1 comment)
* [@AravDalwani](https://github.com/AravDalwani) (1 comment)
* [@aschmahmann](https://github.com/aschmahmann) (3 comments)
* [@AuHau](https://github.com/AuHau) (2 commits)
* [@autonome](https://github.com/autonome) (4 comments)
* [@bluelovers](https://github.com/bluelovers) (5 PRs, 3 issues, 3 comments)
* [@BubuAnabelas](https://github.com/BubuAnabelas) (1 PR)
* [@carsonfarmer](https://github.com/carsonfarmer) (1 comment)
* [@codecov-commenter](https://github.com/codecov-commenter) (19 comments)
* [@d10r](https://github.com/d10r) (1 comment)
* [@dapplion](https://github.com/dapplion) (1 issue)
* [@dongshu2013](https://github.com/dongshu2013) (1 comment)
* [@DougAnderson444](https://github.com/DougAnderson444) (1 commit, 2 PRs, 1 comment)
* [@draeder](https://github.com/draeder) (1 issue, 1 comment)
* [@drewstaylor](https://github.com/drewstaylor) (2 comments)
* [@dsemenovsky](https://github.com/dsemenovsky) (1 issue, 1 comment)
* [@dthorpe](https://github.com/dthorpe) (1 PR, 2 issues)
* [@enochzhao](https://github.com/enochzhao) (1 issue)
* [@fabianhjr](https://github.com/fabianhjr) (1 comment)
* [@geolffreym](https://github.com/geolffreym) (4 PRs, 5 issues, 25 comments)
* [@gfpacheco](https://github.com/gfpacheco) (1 commit, 1 PR, 1 issue, 1 comment)
* [@Gozala](https://github.com/Gozala) (14 commits, 9 PRs, 14 issues, 86 comments)
* [@GregTheGreek](https://github.com/GregTheGreek) (2 comments)
* [@hacdias](https://github.com/hacdias) (5 commits, 1 comment)
* [@HexaField](https://github.com/HexaField) (1 issue)
* [@HLK65](https://github.com/HLK65) (1 issue)
* [@hugomrdias](https://github.com/hugomrdias) (28 commits, 7 PRs, 10 comments)
* [@icidasset](https://github.com/icidasset) (1 comment)
* [@jacobheun](https://github.com/jacobheun) (40 commits, 15 PRs, 7 issues, 81 comments)
* [@jjperezaguinaga](https://github.com/jjperezaguinaga) (2 issues, 3 comments)
* [@koivunej](https://github.com/koivunej) (3 commits, 2 PRs, 1 issue, 5 comments)
* [@kumavis](https://github.com/kumavis) (1 commit)
* [@lazyweirdo](https://github.com/lazyweirdo) (1 comment)
* [@leonardge](https://github.com/leonardge) (1 issue)
* [@lidel](https://github.com/lidel) (3 commits, 2 PRs, 3 comments)
* [@marcoippolito](https://github.com/marcoippolito) (2 issues, 4 comments)
* [@matrushka](https://github.com/matrushka) (1 commit)
* [@mdtanrikulu](https://github.com/mdtanrikulu) (1 comment)
* [@mikeal](https://github.com/mikeal) (4 commits, 19 comments)
* [@mitra42](https://github.com/mitra42) (1 comment)
* [@mpetrunic](https://github.com/mpetrunic) (1 comment)
* [@Neurone](https://github.com/Neurone) (2 PRs, 2 comments)
* [@oed](https://github.com/oed) (1 commit, 2 PRs, 4 issues, 18 comments)
* [@olivier-nerot](https://github.com/olivier-nerot) (4 issues, 3 comments)
* [@OR13](https://github.com/OR13) (1 issue)
* [@pcowgill](https://github.com/pcowgill) (1 comment)
* [@peterblockman](https://github.com/peterblockman) (1 issue, 1 comment)
* [@phillmac](https://github.com/phillmac) (2 issues, 2 comments)
* [@qalqi](https://github.com/qalqi) (1 comment)
* [@R9295](https://github.com/R9295) (2 issues, 1 comment)
* [@reconbot](https://github.com/reconbot) (1 commit, 1 PR)
* [@ribasushi](https://github.com/ribasushi) (1 comment)
* [@rllola](https://github.com/rllola) (1 issue)
* [@RobertFischer](https://github.com/RobertFischer) (1 comment)
* [@rvagg](https://github.com/rvagg) (1 commit, 1 PR, 5 comments)
* [@satoshi999](https://github.com/satoshi999) (1 issue)
* [@SignpostMarv](https://github.com/SignpostMarv) (1 comment)
* [@simonovic86](https://github.com/simonovic86) (1 PR)
* [@skysbird](https://github.com/skysbird) (1 issue, 1 comment)
* [@Slender1808](https://github.com/Slender1808) (1 issue, 1 comment)
* [@Stebalien](https://github.com/Stebalien) (1 issue, 6 comments)
* [@Strernd](https://github.com/Strernd) (1 commit, 2 PRs, 1 comment)
* [@tarunbatra](https://github.com/tarunbatra) (1 PR, 2 comments)
* [@terichadbourne](https://github.com/terichadbourne) (1 PR, 2 comments)
* [@tfoutrein](https://github.com/tfoutrein) (1 issue)
* [@thienpow](https://github.com/thienpow) (1 issue, 5 comments)
* [@VandeurenGlenn](https://github.com/VandeurenGlenn) (2 issues, 4 comments)
* [@vasco-santos](https://github.com/vasco-santos) (71 commits, 38 PRs, 5 issues, 100 comments)
* [@viethoanganh79](https://github.com/viethoanganh79) (1 issue, 1 comment)
* [@viventra](https://github.com/viventra) (1 issue, 1 comment)
* [@vmx](https://github.com/vmx) (20 commits, 3 PRs, 25 comments)
* [@welcome](undefined) (37 comments)
* [@wemeetagain](https://github.com/wemeetagain) (6 commits, 24 PRs, 11 issues, 15 comments)
* [@x5engine](https://github.com/x5engine) (3 comments)
* [@zebateira](https://github.com/zebateira) (1 commit, 1 PR)
* [@ZTECH10](https://github.com/ZTECH10) (1 issue, 2 comments)

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
