---
date: 2018-07-27
url: 41-js-libp2p-0-23
title: js-libp2p 0.23.0 released
author: David Dias
---

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">js-libp2p just got its first _official_ release <a href="https://twitter.com/hashtag/libp2p?src=hash&amp;ref_src=twsrc%5Etfw">#libp2p</a> <a href="https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw">#JS</a> v0.23.0 🚀 <br><br>✔ Test <br>✔ Build dist version <br>✔ Update Contributors list <br>✔ v0.22.0 -&gt; v0.23.0 <br>✔ Gen Changelog <br>✔ Publish to npm 🌟<br><br>This is a info release, check all the highlights here:<a href="https://t.co/op334v3VNX">https://t.co/op334v3VNX</a></p>&mdash; David Dias (@daviddias) <a href="https://twitter.com/daviddias/status/1022824309537026048?ref_src=twsrc%5Etfw">July 27, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

> This is an informative release that js-libp2p is here, it does a lot of amazing things and everyone should check it out today. The list of Highlights contain some of latest achievements and new ones coming out with this release. It sets the tone for future releases of js-libp2p.

### 🔐 Private Networks

This is one of the latest features of libp2p. With Private Networks and Network Protectors, you can create entirely disjoint networks from the main net and be sure that only the peers that have access to a secret can join.

### 🌐 Use it on the Browser!

The number 1 design goal, have a network stack that can overcome the resource and runtime constraints imposed by the browser and enable P2P protocols to work 100% in their browser implementations. This is possible with libp2p, learn how in [Browser example](https://github.com/libp2p/js-libp2p/tree/master/examples/libp2p-in-the-browser).

### 🚚 Support for multiple Transports - TCP, WebSockets, WebRTC and more

Use one of the already supported Transports or build your own! libp2p is the perfect platform for innovation. Learn more at [Transports](https://github.com/libp2p/js-libp2p/tree/master/examples/transports).

### ⚡️ Protocol & Stream Multiplexing

One of the specialties of libp2p is solving the bane of protocol discovery and handshake between machines. With libp2p you don't need to assign ports before hand and you don't even need to think about ports at all since all the protocol handshaking happens in the wire! [Learn how](https://github.com/libp2p/js-libp2p/tree/master/examples/protocol-and-stream-muxing).

### 🔒 End-to-End Encryption

Connections in libp2p are E2E encrypted and authenticated. This should be a default setting for every interaction happening in Public Networks. [Learn More](https://github.com/libp2p/js-libp2p/tree/master/examples/encrypted-communications).

### 💬 PubSub

libp2p nodes can create network topologies based on topics of interest to broadcast events in Realtime. [Check out the PubSub Tutorial](https://github.com/libp2p/js-libp2p/tree/master/examples/pubsub).

### 🛣 Peer & Content Routing

Peer & Content Routing (aka DHTs) is part of the stack too! Find other peers in the network or who is storing a specific piece of content through these primitives. [Learn how in the full example](https://github.com/libp2p/js-libp2p/tree/master/examples/peer-and-content-routing).

### 📖 API Documentation

Check the full API documentation on the [README of the js-libp2p repo](https://github.com/libp2p/js-libp2p).

### 📦 All the libp2p modules in one place

Check out the [Packages Table](https://github.com/libp2p/js-libp2p#packages) to learn about all the js-libp2p pieces and their status.

# 🏗 API Changes

This is an informative release, no new API changes have been introduced

# 🙌🏽Want to contribute?

Would you like to contribute to the libp2p project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/libp2p/js-libp2p?label=help%20wanted
- Join an IPFS/libp2p All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- Hack with libp2p and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽 ](https://github.com/ipfs/pm/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about libp2p, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #libp2p channel on Freenode.


That is all for this post. Thank you for being part of the community.

I bid you a good day!
