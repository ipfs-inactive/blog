---
date: 2018-11-16
url: 55-js-libp2p-0-24
title: js-libp2p 0.24.0 released
author: Jacob Heun
---

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">js-libp2p v0.24.0 is here <a href="https://twitter.com/hashtag/libp2p?src=hash&amp;ref_src=twsrc%5Etfw">#libp2p</a> <a href="https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw">#JS</a>! We’ve added support for custom routers, turned relay on by default and threw in some extra goodies and improvements. Highlights are here: <a href="https://t.co/4UHH80rOfp">https://t.co/4UHH80rOfp</a></p>&mdash; Jacob Heun (@jacobheun) <a href="https://twitter.com/jacobheun/status/1063430636189437954?ref_src=twsrc%5Etfw">November 16, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights
## 🚦 Custom Content/Peer Routing Support
Libp2p will now support custom content and peer routers, which will enable users to better customize their DHT experience. The new release allows for using the new [Delegated Peer Routing](https://github.com/libp2p/js-libp2p-delegated-peer-routing) and [Delegated Content Routing](https://github.com/libp2p/js-libp2p-delegated-content-routing) modules to leverage an external node's DHT instead of or in conjunction with their own. This enables nodes in more resource restricted environments to use an external DHT instead of running their own, which can be very resource intensive.

## 🔌 Relay enabled by default
In an effort to improve default connectivity, circuit relay is now enabled by default. Hop is still disabled by default to prevent relaying traffic for other nodes out of the box, as this is expensive for the node. By enabling circuit relay by default, nodes will now be able to accept and dial to other circuit relay nodes. This improves a nodes default ability to communicate in isolated environments.

## 🤖 State Machine
Libp2p is now a state machine. When starting and stopping the node you can now listen for the `stop` and `start` events. Libp2p also exposes a new method, `dialFSM`, which calls back with a [Connection State Machine](https://github.com/libp2p/js-libp2p-switch#connection-state-machine). This gives users the ability to listen to more events on individual connections. You can find out more about these events in [libp2p-switch readme](https://github.com/libp2p/js-libp2p-switch#connection-state-machine).

# 🏗 API Changes
- Added method `dialFSM(peer, protocol, callback)` which allows users to hook into more connection level activity. You can read more about it in the [readme](https://github.com/libp2p/js-libp2p#libp2pdialfsmpeer-protocol-callback).
- Libp2p now emits `start` and `stop` events on node start and stop respectively.
  - Callbacks for `.start()` and `.stop()` are now optional. You can instead listen to the `error`, `start`, and `stop` events.

# 🙌🏽 Want to contribute?

Would you like to contribute to the libp2p project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/libp2p/js-libp2p?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽 ](https://github.com/ipfs/team-mgmt/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about libp2p, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #libp2p channel on Freenode.

That's all for now!
