---
date: 2017-07-13
url: 29-js-ipfs-pubsub
title: Decentralized pubsub on the browser using js-ipfs
author: Pedro Teixeira
---

Recently, js-IPFS introduced experimental support for pub-sub.

While not striclty a necessary competence of IPFS (since IPFS is more concerned with transport and protocols for managing content-addressing and all the resulting datastructures (like a Merkle DAG, blockchain, and others)), fortunately, the pub-sub protocol ended up being incorporated into its stack.

By exposing a pubsub network, an IPFS node can show interest in a subject (a string representing a pubsub channel), and is able to listen and send messages on that subject in a way that is decentralized, since it does not rely on any mediating server or special node.

This can work today in a modern browser by using js-IPFS. By instantiating an IPFS node in JavaScript and activating the pubsub feature, you can send and receive messages between nodes.

```js
const IPFS = require('IPFS')

// create IPFS node

const ipfs = new IPFS({
  EXPERIMENTAL: {
    pubsub: true // required, enables pubsub
   }
})
```

Here we included the js-IPFS library (which you need to have previously installed) and created an IPFS that has the experimental pubsub feature enabled.

Now we're ready to receive messages on a topic:

```js
// listen for messages

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
// send a message

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

Here is a 10-minute demo of how to use it:

[![https://www.youtube.com/watch?v=Nv_Teb--1zg](https://user-images.githubusercontent.com/1211152/28114238-e540840e-66f7-11e7-952c-1ebbc211ac30.png)](https://www.youtube.com/watch?v=Nv_Teb--1zg)
