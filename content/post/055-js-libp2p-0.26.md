---
date: 2019-08-07
url: 2019-08-07-js-libp2p-0-26
title: js-libp2p 0.26.0 released
author: Jacob Heun
---

> Gossipsub support and Promisify API

# 🔦 Highlights

## 🗣 Gossipsub
Thanks to the awesome work of the [ChainSafe](https://github.com/ChainSafe) team, [Gossipsub](https://github.com/ChainSafe/gossipsub-js) is here! Gossipsub is a much more efficient pubsub router than Floodsub. Intead of broadcasting to all of its peers, it broadcasts to a controlled subset of peers. To learn more about how Gossipsub works and where it differs from Floodsub, check out the [Spec](https://github.com/libp2p/specs/tree/master/pubsub/gossipsub).

If you are using Pubsub you can now switch to using Gossipsub instead of Floodsub. Have old peers you need to flood stuff to? Don't worry, Gossipsub will automatically fallback to Floodsub for peers that don't support it. See the API Changes section below for how to migrate your config over to using Gossipsub.

## 🚉 Promisify
As we migrate to [async/await](https://github.com/ipfs/js-ipfs/issues/1670) we are promisifying the Libp2p public methods. Several lower level libraries are currently leveraging libp2p for testing. Their transition to full async/await will be greatly helped by promisifying the libp2p API. Once the async/await changes are propagated up, we will remove Promisify in a future update, along with callback support, as libp2p will have full async/await support at that time. See the API Changes below to check out the Breaking Changes.

# 🏗 API Changes

## BREAKING CHANGES

### Configuration

#### Switch Options

Configuration for `libp2p-switch` has changed. `blacklistTTL` and `blackListAttempts` have been changed to `denyTTL` and `denyAttempts` respectively. You can set these as follows:
```js
const libp2p = new Libp2p({
  switch: {
    denyTTL: 120e3,
    denyAttempts: 5,
  }
  ...
})
```

#### Pubsub

**Subscribe**: To comply with the [pubsub interface](https://github.com/ipfs/interface-js-ipfs-core/blob/v0.109.1/SPEC/PUBSUB.md), the order of params for `libp2p.pubsub.subscribe` have been reordered. They were previously `topic, options, handler, callback`, and are now `topic, handler, options, callback`. If your implementation does not use `options` you should be able to ignore this change.

**Config**: Pubsub was previously enabled via the `EXPERIMENTAL` config. You must now specify your pubsub implementation (Gossipsub or Floodsub), and enable/disable it via it's own configuration. Setting pubsub will automatically enable it. You can disable it by explicitly setting enabled to false in the configuration .

```js
const libp2p = new Libp2p({
  modules: {
    pubsub: require('libp2p-gossipsub'),
    ...
  },
  config: {
    pubsub: {
      enabled: true
    },
    ...
  }
  ...
})
```

## Promisify

All libp2p public methods have been promisified, so callbacks can be omitted in favor of promise based usage, including async/await. For example, `start` can be used as:

```js
libp2p.start(onStart)
// or
await libp2p.start()
```

## Gossipsub

Gossipsub is integrated into the existing [`libp2p.pubsub` API](https://github.com/ipfs/interface-js-ipfs-core/blob/v0.109.1/SPEC/PUBSUB.md). Once Gossipsub has been supplied as your pubsub implementation, you will be able to use it just as Floodsub was previously used. See the section above for pubsub configuration changes.

# ❤️ Huge thank you to everyone that made this release possible

In alphabetical order, here are the 38 humans that made 429 contributions to this release:

* [Abraham Elmahrek](https://github.com/generalpiston) (1 PR, 1 issue, 2 comments)
* [Alan Shaw](https://github.com/alanshaw) (1 PR, 6 reviews, 5 comments)
* [Alex Potsides](https://github.com/achingbrain) (1 PR, 1 review)
* [Cayman](https://github.com/wemeetagain) (4 PRs, 2 issues, 26 reviews, 10 comments)
* [Cody Eilar](https://github.com/AcidLeroy) (2 issues, 4 comments)
* [David Dias](https://github.com/daviddias) (6 issues, 8 comments)
* [dirkmc](https://github.com/dirkmc) (4 reviews, 1 comment)
* [Filip Š](https://github.com/filips123) (1 PR, 1 comment)
* [Gregory Markou](https://github.com/GregTheGreek) (4 PRs, 18 reviews, 17 comments)
* [hapsody](https://github.com/hapsody) (1 comment)
* [Henrique Dias](https://github.com/hacdias) (1 issue, 1 comment)
* [Hugo Dias](https://github.com/hugomrdias) (1 review)
* [Isaac Jacobs](https://github.com/didlie) (1 issue, 7 comments)
* [Jacob Heun](https://github.com/jacobheun) (14 PRs, 3 issues, 31 reviews, 37 comments)
* [Jakub](https://github.com/jakubgs) (1 PR)
* [John_Suu](https://github.com/suutaku) (2 comments)
* [Jorropo](https://github.com/Jorropo) (2 PRs)
* [Justin Maier](https://github.com/JustMaier) (1 comment)
* [kumavis](https://github.com/kumavis) (1 review)
* [laubsauger](https://github.com/laubsauger) (1 issue)
* [Maciej Krüger](https://github.com/mkg20001) (2 PRs, 1 issue, 2 reviews, 20 comments)
* [Marcin Rataj](https://github.com/lidel) (1 review)
* [Marin Petrunić](https://github.com/mpetrunic) (1 issue, 5 reviews, 1 comment)
* [Michael FIG](https://github.com/michaelfig) (1 PR)
* [Michiel De Backker](https://github.com/backkem) (1 comment)
* [Mikeal Rogers](https://github.com/mikeal) (1 comment)
* [Mikerah](https://github.com/Mikerah) (2 PRs, 7 reviews, 18 comments)
* [Nate Foss](https://github.com/npfoss) (1 PR, 1 issue, 2 comments)
* [ohager](https://github.com/ohager) (2 comments)
* [Pat White](https://github.com/patwhite) (1 comment)
* [Qmstream](https://github.com/Qmstream) (2 PRs, 2 comments)
* [Raúl Kripalani](https://github.com/raulk) (1 comment)
* [Richard Schneider](https://github.com/richardschneider) (1 comment)
* [Saquib ul hassan](https://github.com/IamSaquib) (1 issue, 1 comment)
* [Steven Allen](https://github.com/Stebalien) (1 PR)
* [Tapasweni Pathak](https://github.com/tapaswenipathak) (1 PR, 1 comment)
* [Vasco Santos](https://github.com/vasco-santos) (17 PRs, 4 issues, 59 reviews, 36 comments)
* [zthomas](https://github.com/zthomas) (1 issue)

# 🙌🏽 Want to contribute?

Would you like to contribute to the libp2p project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [libp2p repo](https://github.com/libp2p/js-libp2p/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.libp2p.io/ and help users finding their answers.
- Join the [⚡️Libp2p Team Sync 🙌🏽 ](https://github.com/libp2p/team-mgmt/issues/16) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about libp2p, how it works and what you can do with it is at [discuss.libp2p.io](https://discuss.libp2p.io). We are also available at the #libp2p channel on Freenode.
