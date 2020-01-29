---
date: 2020-01-29
url: 2020-01-29-js-libp2p-0-27
title: js-libp2p 0.27 released
author: Jacob Heun
---

> The Async / Await Refactor and a whole lot more!

# 🔦 Highlights

## 📜 Improved docs

We've done an overhaul of our docs to make libp2p easier to use. Among other docs in the new [doc][docs] folder, you can find a full list of exposed methods in the [API.md][api], and a guide on how to configure libp2p in [CONFIGURATION.md][config]. We've also created a [Getting Started guide][getting_started] for anyone starting out with libp2p.

## ⌚️ Async/Await instead of Callbacks

All callback APIs have been changed to be async / await compliant. See the [API.md][api] readme for detailed usage. When migrating, you can leverage the [migration guide][migration] to see samples on some of the common migrations you may need to make.

## 🚰 Streaming Iterables instead of Pull Streams

Now that readable streams are async iterable, we can leverage [Streaming Iterables][streaming_iterables] instead of Pull Streams to greatly simplify the internal stream logic of libp2p. Among other things, this makes debugging streams much easier. You can check out the [it-awesome repo](https://github.com/alanshaw/it-awesome) for a list of an increasing number of modules built for the streaming iterables ecosystem. This also includes modules to convert to and from pull streams if you need to refactor your applications over time. If you're having trouble migrating, please feel free to reach out on the [discuss forums][discuss]!

## 📞 Clearer Connections

We've created a whole new [Connection Interface][connection]! Creating multiple streams off of a single connection is now much clearer, and every stream created is tracked in the Connection. This makes it much easier to keep track of every open stream, which greatly empowers resource management in js-libp2p.

```js
// Was
libp2p.dialProtocol(remotePeerInfo, protocol, (error, stream) => { })

// Now
const connection = await libp2p.dial(remotePeerInfo)
const { stream, protocol } = await connection.newStream(protocols)
const allStreams = connections.streams
```

## ⏹ Abortable Dials

We've reconstructed transports and connections from the ground up. This gives us the ability to pass an [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) when dialing, so we can now properly terminate connections early. This also means we'll be able to add proper support for parallel dials to reduce connection times without running the risk of lingering dials.

```js
const controller = new AbortController()
libp2p.dial(remotePeerInfo, { signal: controller.signal })
// after a short delay...
controller.abort()
```

## 🆔 The Identify Push Protocol

[Identify Push](https://github.com/libp2p/specs/tree/master/identify#identifypush) is now available in js-libp2p. As a libp2p node changes its Multiaddrs (changes in networks) or protocols, it will broadcast those changes to all connected peers. Once support for AutoNAT and AutoRelay is added to js-libp2p, we will be able to broadcast those changes maximizing the effectiveness of those protocols.

## 🔍 Plaintext 2 for testing

We've upgraded from [Plaintext 1 to 2](https://github.com/libp2p/specs/tree/master/plaintext#protocol-id-and-version-history). If you need to test things locally without encryption to see what's going on over the wire, Plaintext 2 makes this more viable. Public Keys are now exchanged, which is required by many protocols. This should NEVER be used in production, happy testing!

## 🙏 More polite connections

Currently when two nodes connect, they will actively ask each other what protocols they support. This ends up being multiple checks in parallel, rather than getting the information from a single Identify check. js-libp2p will now only use Identify. This greatly reduces network chatter. The `peerStore`, formerly `peerBook` to better match common libp2p terminology, will now emit change events for protocols. Applications that need to check for protocol support can now politely listen for updates, instead of actively checking every peer that connects.

```js
libp2p.peerStore.on('change:protocols', ({ peerInfo, protocols }) => { ... })
```

## 📊 Metrics (formerly Stats) can now be enabled/disabled

We're making `stats` disabled by default and they are now available at `libp2p.metrics` instead of `libp2p.stats`. You can enable metrics if you need them, but for performance reasons we have disabled them by default. Good news, if you need to run them they're more performant as we've moved away from event emitting in metrics. This greatly reduces the amount of processing that happens until you explicitly request something! You can read more about Metrics at [METRICS.md][metrics].

# 🏗 API Changes

See the [API.md][api] readme for detailed usage on the new API. Significant breaking changes are detailed below.

* Callbacks are no longer supported, async / await is now used for all asynchronous methods. See [API.md][api] for a full list of methods.
* Pull streams have been replaced by [Streaming Iterables][streaming_iterables]
* `libp2p.peerBook` is now `libp2p.peerStore` to match common libp2p terminology.
* `libp2p.stats` is now `libp2p.metrics`.
* `libp2p.pubsub.ls` is now `libp2p.pubsub.getTopics`.
* `libp2p.pubsub.peers` is now `libp2p.pubsub.getSubscribers`.
* `libp2p.ping` now simply returns the latency of the ping. See the [migration guide][migration] for more details.

# ❤️ Huge thank you to everyone that made this release possible

In alphabetical order, here are the 60 humans that made 1241 contributions to this release:

* [AgentJ-WR](https://github.com/AgentJ-WR) (1 PR, 1 issue)
* [Akulich Paul](https://github.com/pashoo2) (2 PRs, 1 issue, 2 reviews, 5 comments)
* [Alan Shaw](https://github.com/alanshaw) (16 PRs, 1 issue, 31 reviews, 14 comments)
* [Alex Potsides](https://github.com/achingbrain) (10 PRs, 6 issues, 7 reviews, 5 comments)
* [Anton Nashatyrev](https://github.com/Nashatyrev) (1 issue, 1 comment)
* [Arve Knudsen](https://github.com/aknuds1) (1 comment)
* [Blake Byrnes](https://github.com/blakebyrnes) (1 issue, 1 comment)
* [bruinxs](https://github.com/bruinxs) (1 PR, 1 issue, 1 comment)
* [Carson Farmer](https://github.com/carsonfarmer) (3 PRs, 1 issue, 3 reviews, 17 comments)
* [Cayman](https://github.com/wemeetagain) (2 PRs, 1 issue, 17 reviews, 7 comments)
* [Chadwick Dahlquist](https://github.com/bugeats) (1 comment)
* [Christian M](https://github.com/chriamue) (1 PR)
* [Christian Paul](https://github.com/jaller94) (1 PR)
* [David Dias](https://github.com/daviddias) (2 PRs, 4 issues, 21 reviews, 21 comments)
* [Didrik Nordström](https://github.com/betamos) (1 PR, 1 comment)
* [Dietrich Ayala](https://github.com/autonome) (1 comment)
* [Dima](https://github.com/DieMyst) (1 issue)
* [dirkmc](https://github.com/dirkmc) (5 PRs, 1 issue, 7 reviews, 2 comments)
* [emclab](https://github.com/emclab) (1 issue, 1 comment)
* [Eric Tu](https://github.com/ec2) (1 review)
* [folex](https://github.com/folex) (1 comment)
* [Friedel Ziegelmayer](https://github.com/dignifiedquire) (1 review, 1 comment)
* [George Farcasiu](https://github.com/georgeaf99) (1 comment)
* [Gopalakrishna Palem](https://github.com/KrishnaPG) (2 issues)
* [Gregory Markou](https://github.com/GregTheGreek) (4 reviews, 3 comments)
* [Guo Liu](https://github.com/guoliu) (1 issue, 1 comment)
* [Henrique Dias](https://github.com/hacdias) (1 review, 2 comments)
* [Hugo Dias](https://github.com/hugomrdias) (2 reviews)
* [Jacob Heun](https://github.com/jacobheun) (59 PRs, 6 issues, 240 reviews, 80 comments)
* [Jorropo](https://github.com/Jorropo) (1 PR)
* [kumavis](https://github.com/kumavis) (1 PR, 1 issue, 1 review, 6 comments)
* [Maciej Krüger](https://github.com/mkg20001) (2 PRs, 2 issues, 17 reviews, 30 comments)
* [Marcin Rataj](https://github.com/lidel) (2 PRs, 13 reviews, 1 comment)
* [Marcus Bernales](https://github.com/mboperator) (1 PR)
* [Marin Petrunić](https://github.com/mpetrunic) (1 PR, 1 issue, 5 reviews, 3 comments)
* [Maying(Matt) Shi](https://github.com/chinesebug) (1 issue)
* [mcclure](https://github.com/mcclure) (2 issues, 3 comments)
* [Mikeal Rogers](https://github.com/mikeal) (1 review)
* [Nate Foss](https://github.com/npfoss) (2 PRs)
* [Oli Evans](https://github.com/olizilla) (2 comments)
* [phillmac](https://github.com/phillmac) (1 PR, 1 comment)
* [Raúl Kripalani](https://github.com/raulk) (1 comment)
* [ridenaio](https://github.com/ridenaio) (1 issue)
* [Roman Proskuryakov](https://github.com/kpp) (1 comment)
* [Rui Fortes](https://github.com/ruifortes) (2 issues)
* [Ryan Bell](https://github.com/iRyanBell) (1 PR)
* [shresthagrawal](https://github.com/shresthagrawal) (1 PR, 1 issue)
* [Stavros Charitakis](https://github.com/sce9sc) (1 issue)
* [swedneck](https://github.com/swedneck) (1 PR)
* [Teri Chadbourne](https://github.com/terichadbourne) (1 comment)
* [Tony Jin](https://github.com/nijynot) (1 PR, 1 issue, 2 comments)
* [Topper Bowers](https://github.com/tobowers) (3 PRs, 2 issues, 13 comments)
* [tuyennhv](https://github.com/tuyennhv) (1 review, 1 comment)
* [Vasco Santos](https://github.com/vasco-santos) (91 PRs, 7 issues, 254 reviews, 79 comments)
* [Yusef Napora](https://github.com/yusefnapora) (1 review)
* [Ziwei_Wei](https://github.com/Ziwei-Wei) (1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the libp2p project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [libp2p repo](https://github.com/libp2p/js-libp2p/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.libp2p.io/ and help users finding their answers.
- Join the [⚡️libp2p Weekly Sync 🙌🏽](https://github.com/libp2p/team-mgmt/issues/16) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about libp2p, how it works and what you can do with it is at [discuss.libp2p.io](https://discuss.libp2p.io). We are also available at the #libp2p channel on Freenode.

[api]: https://github.com/libp2p/js-libp2p/blob/master/doc/API.md
[config]: https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md
[docs]: https://github.com/libp2p/js-libp2p/blob/master/doc/
[getting_started]: https://github.com/libp2p/js-libp2p/blob/master/doc/GETTING_STARTED.md
[metrics]: https://github.com/libp2p/js-libp2p/blob/master/doc/METRICS.md
[migration]: https://github.com/libp2p/js-libp2p/blob/master/doc/migrations/v0.26-v0.27.md
[streaming_iterables]: https://github.com/libp2p/js-libp2p/blob/master/doc/STREAMING_ITERABLES.md
[discuss]: https://discuss.libp2p.io
[connection]: https://github.com/libp2p/js-interfaces/tree/master/src/connection#interface-connection
