---
date: 2017-07-19
url: 29-js-ipfs-pubsub
title: Distributed PubSub primitives for js-ipfs in the Browser
author: Pedro Teixeira
---

IPFS PubSub was first introduced in September 2016 behind an experimental flag. This initial implementation lead to move [orbit](https://orbit.chat/), a chat application built on top of IPFS, to become fully distributed. This work was presented at [DEVCON2](https://www.youtube.com/watch?v=vQrbxyDPSXg). Later, [PubSub was announced as feature](https://ipfs.io/blog/25-pubsub) to the whole community.

In this blog post I'll show you how to use PubSub with the [JavaScript implementation of IPFS](https://github.com/ipfs/js-ipfs).

<iframe width="560" height="315" src="https://www.youtube.com/embed/Nv_Teb--1zg" frameborder="0" allowfullscreen></iframe>

---

IPFS stands for the InterPlanetary FileSystem but it's much more than just a FileSystem, it's a complete stack for decentralized applications. While not stricty a necessary competence of IPFS (since IPFS is more concerned with transport and protocols for managing content-addressing and all the resulting datastructures (like a Merkle DAG, blockchain, and others)), fortunately, the pub-sub protocol ended up being incorporated into its stack.

## Using PubSub on js-ipfs

With PubSub, an IPFS node can show interest in a subject (a string representing a PubSub channel), and is able to listen and send messages on that subject in a way that is decentralized, since it does not rely on any mediating server or special node.

This can work today in a modern browser by using [js-ipfs](https://github.com/ipfs/js-ipfs). By instantiating an IPFS node in JavaScript and activating the pubsub feature, you can send and receive messages between nodes.

```js
const IPFS = require('IPFS')

// create IPFS node

const ipfs = new IPFS({
  EXPERIMENTAL: {
    pubsub: true // required, enables pubsub
   }
})
```

Here we included the [js-ipfs](https://github.com/ipfs/js-ipfs) library (which you need to have previously installed) and created an IPFS that has the experimental pubsub feature enabled.

Now we're ready to receive messages on a topic:

```js
ipfs.pubsub.subscribe('topic-name-here', (message) => {
  console.log('got message from ' + message.from)

  // data is a buffer
  // here we're converting it into a string

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

Even though [the js-IPFS pubsub API](https://github.com/ipfs/interface-ipfs-core/tree/master/API/pubsub#pubsub-api) is very simple to use, if you want to be able to deal with strings, send private messages to a specific peer and be notified of subscription changes (nodes that are interested in the topic), you can use [the ipfs-pubsub-room package](https://github.com/ipfs-labs/ipfs-pubsub-room#readme) on top of IPFS.

(here is a 10-minute demo of how to use it:)

[![https://www.youtube.com/watch?v=Nv_Teb--1zg](https://user-images.githubusercontent.com/1211152/28114238-e540840e-66f7-11e7-952c-1ebbc211ac30.png)](https://www.youtube.com/watch?v=Nv_Teb--1zg)

Happy decentrelized messaging! 🎉
