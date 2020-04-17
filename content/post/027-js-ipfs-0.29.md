---
date: 2018-05-29
url: 38-js-ipfs-0-29
title: js-ipfs 0.29.0 released
author: David Dias
header_image: js-ipfs-placeholder.png
---

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">I love the smell of a new release in the morning 😁<a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> <a href="https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw">#JS</a> v0.29.0 🚀<br><br>✔ Test <br>✔ Build dist version <br>✔ Update Contributors list <br>✔ Bump Version: v0.28.2 -&gt; v0.29.0 <br>✔ Gen Changelog <br>✔ Publish to npm 🌟<br><br>Find the latest on your favorite module store!</p>&mdash; David Dias (@daviddias) <a href="https://twitter.com/daviddias/status/1001432008302694400?ref_src=twsrc%5Etfw">May 29, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

### 🏎 Bitswap is 30% faster

Bitswap is now 30%, thanks to fixing a bug on [js-ipfs-bitswap](https://github.com/ipfs/js-ipfs-bitswap/pull/175#issuecomment-390957244) that was causing every message to be sent individually.

### 👓 js-ipfs now works with uglify-es just fine

The duck typing throughout js-ipfs has been improved and that means that now you can use uglify-es again to minify your js-ipfs code. The result is that the js-ipfs bundled version is now back to its minified size as well. 

### ☎️ Circuit Relay was merged in

Circuit Relay enables connectivity between any two nodes through a third relay node. This ensures connectivity in almost every scenario, that is, as long as peers can connect to some public IP node. Learn how to use it [here](https://github.com/ipfs/js-ipfs/tree/master/examples/circuit-relaying). This was one of the two features that js-ipfs was missing to get full connectivity.

### 🗑 S3 backend for IPFS

Ever wished you could use an external storage backend to store all your IPFS blocks? Now you do and we got a tutorial for you! See how to configure a repo at https://github.com/ipfs/js-ipfs/tree/master/examples/custom-ipfs-repo and if you want to learn how to use S3 as your external backend, then consult https://github.com/ipfs/js-datastore-s3/tree/master/examples/full-s3-repo.

### 📜 README Overhaul 

The js-ipfs README keeps improving, now with 40% more information about the multiple arguments you can pass to IPFS. Read all the options at https://github.com/ipfs/js-ipfs#api

### 🎷 Project Tracking

If you haven't already, I welcome you to check how the js-ipfs team tracks their work at https://github.com/ipfs/js-ipfs/blob/master/MGMT.md. It is fun to see the issues fly through the [waffle board](https://waffle.io/ipfs/js-waffle).

### ✅ Config validation and config reuse fix

In addition to better documentation on how to configure your node, you now get some config validation in case you mistype something. Also as a bonus, you can now spin multiple nodes in the same process without them getting confused and using the same config.

### 📖 interface-ipfs-core keeps getting more API calls documented and tested

Make yourself familiar with the IPFS Core API at https://github.com/ipfs/interface-ipfs-core/tree/master/SPEC. New additions include files.add --wrapWithDirectory, --onlyHash and others.

### 📊 Bandwidth stats now available

Bandwidth statistics for your IPFS node from the `libp2p` layer are now exposed and available to query for the whole node, per peer or per protocol. You can also use Node streams or pull streams to get a continuous feed of that tasty statistical juice.

### 📡 Fully Async PubSub API

The PubSub API has been updated to expose Async calls (with Callbacks and Promises). This was necessary as some nodes exist behind an HTTP API and using a fake sync API would create race conditions. Make sure to update your use of PubSub, you can see the API changes below. 

### 🛎 Ping API implemented

JS IPFS now has API calls for pinging other peers. Fun fact, this was actually the first thing a js-ipfs node did, but it got lost in a massive refactor and now it is back and not only in js-ipfs core, it is also available through the CLI and HTTP API

### ⚛️ Electron Main Process support with Electron 2.0

As a good surprise, Electron 2.0 has better support for Native Modules and with that, js-ipfs can run on the Main process mode. This concludes the [full support for IPFS in electron](https://github.com/ipfs/notes/issues/256).

# 🏗 API Changes

1. Argument order for `pubsub.subscribe` has changed:
    * Old: `pubsub.subscribe(topic, [options], handler, [callback]): Promise`
    * New: `pubsub.subscribe(topic, handler, [options], [callback]): Promise`
2. The `pubsub.unsubscribe` method has become async meaning that it now takes a callback or returns a promise:
    * Old: `pubsub.unsubscribe(topic, handler): undefined`
    * New: `pubsub.unsubscribe(topic, handler, [callback]): Promise`
3. Property names on response objects for `ping` are now lowered:
    * Old: `{ Success, Time, Text }`
    * New: `{ success, time, text }`
4. In the CLI, `jsipfs object data` no longer returns a newline after the end of the returned data

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [ⒿⓈ⚡️ js-ipfs Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/js-ipfs/issues/1179) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.

That is all for this post. Thank you for being part of the community. I bid you a good day!
