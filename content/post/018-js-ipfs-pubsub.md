---
date: 2017-07-29
url: /29-js-ipfs-pubsub/
title: Distributed pubsub primitives for js-ipfs in the Browser
author: Pedro Teixeira
---

IPFS pubsub was first introduced in September 2016 behind an experimental flag. This initial implementation allowed [orbit](https://orbit.chat/), a chat application built on top of IPFS, to become fully distributed. [@haadcode](https://github.com/haadcode) presented that work at [DEVCON2](https://www.youtube.com/watch?v=vQrbxyDPSXg). Later, [the IPFS team announced that pubsub ](https://ipfs.io/blog/25-pubsub) was ready for the whole community to use.

In this post I'll show you how to use pubsub with the [JavaScript implementation of IPFS](https://github.com/ipfs/js-ipfs). I start by using the pubsub primitives available in `js-ipfs` and end with a new module [plus video tutorial](https://youtu.be/Nv_Teb--1zg) of how to use it. Make sure to read to the end!

## Using pubsub on js-ipfs

IPFS is not just a filesystem. It's a complete stack for decentralized applications. With pubsub, an IPFS node can show interest in a topic (a string representing a pubsub channel) and is able to listen and send messages on that topic in a way that is decentralized -- it does not rely on any mediating server or special node.

With [js-ipfs](https://github.com/ipfs/js-ipfs), this code works today in any modern browser. By instantiating an IPFS node in JavaScript and activating the pubsub feature, you can send and receive messages between nodes.

Here we include the [js-ipfs](https://github.com/ipfs/js-ipfs) library (which you need to have previously installed) and created an IPFS that has the experimental pubsub feature enabled:

```js
const IPFS = require('ipfs')

// create IPFS node
const ipfs = new IPFS({
  EXPERIMENTAL: {
    pubsub: true // required, enables pubsub
  }
})

ipfs.once('ready', () => {
  // node is ready
})
```

Now we're ready to receive messages on a topic:

```js
ipfs.pubsub.subscribe('topic-name-here', (message) => {
  console.log('got message from ' + message.from)

  // data is a buffer. Here we're converting it into a string

  const data = message.data.toString()
  console.log('containing data: ' + data)
})
```

And we can also send messages:

```js
// data should be a buffer
const data = Buffer.from('some message content here')

ipfs.pubsub.publish('topic-name-here', data, (err) => {
  if (err) {
    console.error('error publishing: ', err)
  } else {
    console.log('successfully published message')
  }
})
```

Even though [the js-IPFS pubsub API](https://github.com/ipfs/interface-ipfs-core/tree/master/API/pubsub#pubsub-api) is very simple to use, you will need some additional functionality for most uses. If you want to be able to deal with strings, send private messages to a specific peer and be notified of subscription changes (nodes that are interested in the topic), take a look at the `ipfs-pubsub-room` package.

# Enter `ipfs-pubsub-room`

[`ipfs-pubsub-room`](https://github.com/ipfs-shipyard/ipfs-pubsub-room) is a room-oriented take on the pubsub API for IPFS. It's being built in the [`ipfs-shipyard`](https://github.com/ipfs-shipyard). See the full tutorial below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Nv_Teb--1zg" frameborder="0" allowfullscreen></iframe>

Happy decentralized messaging! 🎉
