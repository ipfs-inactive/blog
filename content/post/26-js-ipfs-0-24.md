---
date: 2017-05-25
url: 26-js-ipfs-0-24
title: js-ipfs 0.24.0 released
author: David Dias
---

I am pleased to announce to everyone in our community that js-ipfs 0.24.0 has been successfully launched! This new minor release brings new features, bug fixes and new examples so that you can jump in and start hacking your IPFS enabled apps right away!

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/IPFSbot">@IPFSbot</a> Woot! As promissed, new version of js-ipfs released!<br><br>🚀 `ipfs@0.24.0 [18:39] Published to npm.` 🚀<br><br>Release log here: <a href="https://t.co/20O2L2Scq5">https://t.co/20O2L2Scq5</a></p>&mdash; David Dias (@daviddias) <a href="https://twitter.com/daviddias/status/867512323732365312">May 24, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

# Highlights

### 👢 WebSockets DNS Bootstrappers by default on the browser

With this release, you won’t need to connect to Bootstrapper nodes manually, they will dialed from the start through their WebSockets endpoints. This also means that we’ve successfully deployed DNS support for multiaddrs, so that you can host your js-ipfs enabled app behind an HTTPS domain and dial to the Bootstrappers through WSS.

### 🎈WebRTC is now a default transport

We now include WebRTC multiaddr by default on new js-ipfs init calls. This means that both your Node.js and Browser nodes will be able to dial each other using WebRTC and discover other nodes in the network through signalling Peer Discovery.

Caveat for Linux/Windows users: Due to limited support of Node.js wrtc module, you will have to set an environment variable or an Experimental flag. Instructions are in the [README](https://github.com/ipfs/js-ipfs#advanced-options-when-creating-an-ipfs-node) to learn how to do so.

### 🗺 1st Phase of DHT Implementation Complete

We now have a working DHT implementation, which means that js-libp2p and js-ipfs are now capable of Peer Routing and Content Routing. This feature should be treated as experimental for the time being, and is behind a [feature flag](https://github.com/ipfs/js-ipfs#advanced-options-when-creating-an-ipfs-node) until a few remaining interoperability issues are cleared out.

### 🕸 WebWorker and ServiceWorker Support

Now you can run js-ipfs in a WebWorker or a ServiceWorker without encountering any stoppers. We also added a rule to our tests to be run inside a WebWorker to ensure that this feature stays intact.

We've recorded a live demo of a Service Worker with js-ipfs running during IPFS All Hands on May 22. You can see this recording and many others on the IPFS Youtube video channel. You can find the code for this demo at [ipfs-service-worker](https://github.com/ipfs/ipfs-service-worker).

<iframe width="560" height="315" src="https://www.youtube.com/embed/xnX0Mz4mPQI" frameborder="0" allowfullscreen></iframe>


### 📶 Better reconnect handling with WebRTC Transport

You can now switch off your wifi or close your laptop and your js-ipfs node will be able to recover any lost connections graciously.

### 💅🏽 Refreshed libp2p API

As a byproduct of shipping new features in js-ipfs, js-libp2p got a refreshed API, documentation and examples. Please do check them out and try libp2p at [js-libp2p](https://github.com/libp2p/js-libp2p)

### 📦 Updated Packages table

Always wondered of how many pieces IPFS is built with? Check the updated Packages table at -- https://github.com/ipfs/js-ipfs#packages.

A **big thank you** goes for everyone who helped make this release possible! We really appreciate all the code contributions, reviews and testing we get from you ❤️.

# Want to get started using js-ipfs today?

We've been building a [series of examples](https://github.com/ipfs/js-ipfs/tree/master/examples) to help everyone get started using js-ipfs. With this release, these examples got even simpler, requiring less configuration. Go to [js-ipfs github repo and check the examples folder](https://github.com/ipfs/js-ipfs/tree/master/examples), containing:

- [How to start a node and add a file to IPFS](https://github.com/ipfs/js-ipfs/tree/master/examples/basics)
- [Learn how to transfer files between nodes over multiple transports](https://github.com/ipfs/js-ipfs/tree/master/examples/transfer-files)
- [Learn how to manipulate IPLD Graphs with the DAG API](https://github.com/ipfs/js-ipfs/tree/master/examples/dag)
- [Wanna try resolving Eth blocks on IPFS?](https://github.com/ipfs/js-ipfs/tree/master/examples/explore-ethereum)

If you run into any hurdles, please open an issue on [ipfs/js-ipfs/issues](https://github.com/ipfs/js-ipfs/issues).

Thank you for your attention, I bid you a good day!
