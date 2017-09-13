---
date: 2017-09-13
url: 30-js-ipfs-0-26
title: js-ipfs 0.26.0 released
author: David Dias
---

Today, we've released js-ipfs 0.26.0. This release brings bug fixes, performance improvements, git support, http gateway and more!

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Aaaand it is released! 🚀<br><br>[09:28:00] Publishing to npm...<br>+ ipfs@0.26.0<a href="https://t.co/rDqOgQIe3u">https://t.co/rDqOgQIe3u</a><a href="https://t.co/WJJK3NbLo8">https://t.co/WJJK3NbLo8</a><a href="https://twitter.com/hashtag/IPFS?src=hash">#IPFS</a> <a href="https://twitter.com/hashtag/JavaScript?src=hash">#JavaScript</a></p>&mdash; David Dias (@daviddias) <a href="https://twitter.com/daviddias/status/907885855884414977">September 13, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

Here are some of the highlights for this new js-ipfs release. There were plenty more bug fixes, tiny performance improvements, doc improvements and others all across the js-ipfs module ecosystem. A really BIG THANK YOU to everyone that has been contributing with code, tests, examples and also bug reports! They help us identify situations that we miss without tests.

### New InterPlanetary Infrastructure

You might have noticed some hiccups a couple of weeks ago. That was due to a revamp and improvement in our infrastructure that separated Bootstraper nodes from Gateway nodes. We've now fixed that by ensuring that a js-ipfs node connects to all of them. More nodes on https://github.com/ipfs/js-ipfs/issues/973 and https://github.com/ipfs/js-ipfs/pull/975. Thanks @lgierth for improving IPFS infra and for setting up all of those DNS websockets endpoints for js-ipfs to connect to :)

### Now js-ipfs packs the IPFS Gateway as well

You read it right! Now, js-ipfs packs the IPFS Gateway and launches it when you boot a daemon (`jsipfs daemon`). With this, you can use js-ipfs to access content in the browser just like you use to do in go-ipfs or use js-ipfs as a complete solution to add content in the network and preview it without leaving JS land. It is great for tooling. This was an [awesome contribution from @ya7ya and @harshjv](https://github.com/ipfs/js-ipfs/pull/968) who spent a lot of time adjusting and iterating on the implementation to make sure it would fit with the structure of js-ipfs, 👏🏽👏🏽👏🏽👏🏽.

### Huge performance and memory improvement

With reports such as https://github.com/ipfs/js-ipfs/issues/952, we started investigating what were the actual culprits for such memory waste that would lead the browser to crash. It turns out that there were two and we got one fixed. The two were:

- browserify-aes - @dignifiedquire identified that there were a lot of Buffers being allocated in browserify-aes, the AES shim we use in the browser (this was only a issue in the browser) and promptly came with a fix https://github.com/crypto-browserify/browserify-aes/pull/48 👏🏽👏🏽👏🏽👏🏽
- WebRTC - WebRTC is really cpu+mem hungry and our combination of opening multiple connections without limits + the constant switch between transport and routing at the main thread, leads to some undesirable situations where the browser simply crashes for so much thrashing. We are actively working on this with [Connection Closing](https://github.com/ipfs/js-ipfs/issues/962).

That said, situations such as https://github.com/ipfs/js-ipfs/issues/952 are now fixed. Happy file browser sharing! :)

### Now `git` is also one of the IPLD supported formats by js-ipfs

Now js-ipfs supports [ipld-git](https://github.com/ipld/js-ipld-git)! This is huge, it means that you can traverse through git objects using the same DAG API that you use for Ethereum, dag-pb and dag-cbor. This feature came in with an [example, go check out how to traverse a git repo](https://github.com/ipfs/js-ipfs/tree/master/examples/traverse-ipld-graphs). 👏🏽👏🏽 to @magik6k for shipping this in record time.

### The libp2p-webrtc-star multiaddrs have been fixed

@diasdavid (me) and @lgierth had a [good convo and reviewed a bunch of stuff over Coffee ☕️, it was great!](https://github.com/ipfs/pm/blob/master/meeting-notes/2017-08-30--coffee-lars-david.md). During that chat, we figured that `libp2p-webrtc-star` multiaddrs have been implemented incorrectly and figured out the migration path to the correct version. 

You can learn more what this endeavour involved here https://github.com/ipfs/js-ipfs/issues/981. Essentially, there are no more `/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss`, instead we use `/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star` which signals the proper encapsulation you expect from a multiaddr.

### New example showing how to stream video using hls.js

@moshisushi developed a video streamer on top of js-ipfs and shared an example with us. You can now find that example as part of the examples set in this repo. Check https://github.com/ipfs/js-ipfs/tree/master/examples/browser-video-streaming, it is super cool 👏🏽👏🏽👏🏽👏🏽.

> HLS (Apple's HTTP Live Streaming) is one of the several protocols currently available for adaptive bitrate streaming.

### webcrypto-ossl was removed from the dependency tree

We've purged webcrypto-ossl from the dependency tree. It was only used to generate RSA keys faster (significantly faster) but at the same time, it caused a lot of hurdles to being a native dependency. 

There is an [open issue on the Node.js project to expose the RSA key generation primitive](https://github.com/nodejs/node/issues/15116), if you have a use case for it please do share it in that thread. This would enable js-ipfs to use the native crypto module, have the same (or better) perf of webcrypto-ossl and not have to deal with an external native dependency.

### PubSub tutorial published

@pgte published an amazing tutorial on how to use PubSub with js-ipfs and in the browser! Read it on the [IPFS Blog https://blog.ipfs.io/29-js-ipfs-pubsub](https://ipfs.io/blog29-js-ipfs-pubsub/).

# 🌱 Future

We have so much stuff in the pipeline. Some of it almost got into this release but we eventually decided to defer it to a next release and make sure everyone would have access to the goodies in the _highlights_ section. That said, expect the following and more to come in a future release.

### Circuit Relay

Circuit Relay is almost here. @dryajov showed us a demo of it working on the last IPFS All Hands and you can watch it on the uploaded recording in YouTube https://youtu.be/chAXj_vsR2s?t=25m01s. Since then, @dryajov @stebalian and @vyzo have been working on making sure interop is fully tested.

Follow the development on the _Awesome Endeavour PR_ - https://github.com/ipfs/js-ipfs/pull/830

### Delegated Routing

One of the results from the [Coffee Chat ☕️](https://github.com/ipfs/pm/blob/master/meeting-notes/2017-08-30--coffee-lars-david.md) was the decision to move forward with Delegated Routing. This was a long one coming and one that will enable js-ipfs nodes to leverage the already established presence of bootstrapers and gateway to find the Peers that have the content on the network, saving time and resources. Track the dev here https://github.com/libp2p/js-libp2p/issues/120

### Expanded top level API for Streaming Calls

We will expose a pull-streams interface to js-ipfs in the next minor version (0.27). pull-streams are light and more performance than Node.js streams giving users a considerable perf boost (example: https://github.com/ipfs/js-ipfs/pull/988).

We will keep the Node.js Streams (Readable Stream) interface as well. Track dev here:
https://github.com/ipfs/interface-ipfs-core/issues/126#issuecomment-326991583

### New AEgir (v12)

@dignifiedquire got the chance to spend some time giving love to [AEgir](https://github.com/ipfs/aegir), our custom build assets and release tool we use for all the JS projects in the IPFS ecosystem.

The new version of AEgir adds a lot of the features and needed refactor that has been requested for a while, however, we are still polishing it and will start using in js-ipfs [once we get the integration complete](https://github.com/ipfs/js-ipfs/pull/961).

Today you can see AEgir 12 already being used in some IPFS modules, including [ipfs-api](https://github.com/ipfs/js-ipfs-api/pull/585)!

### New libp2p Transport, libp2p-websocket-star

@mkg20001 created a new libp2p Transport! [libp2p-websocket-star](https://github.com/libp2p/js-libp2p-websocket-star). This new transport will work similarly to [libp2p-webrtc-star](https://github.com/libp2p/js-libp2p-webrtc-star), but using WebSockets (less cpu+mem hungry) than WebRTC. Track the development here: https://github.com/libp2p/js-libp2p/pull/122

If you run into any hurdles, please open an issue on [ipfs/js-ipfs/issues](https://github.com/ipfs/js-ipfs/issues).

# 🎉 How can I contribute?

I'm glad you asked!

![](https://camo.githubusercontent.com/2820cc493393fa993bef64b044c6d3ce1d4b56a4/68747470733a2f2f63646e2e7261776769742e636f6d2f6a62656e65742f636f6e747269627574652d697066732d6769662f6d61737465722f696d672f636f6e747269627574652e676966)

We keep curating and updating our [Waffle Board](https://waffle.io/ipfs/js-ipfs) to ensure it signals what is actively being worked on and what is next. We also review issues and tag them with difficulty and a [`help wanted`](https://waffle.io/ipfs/js-ipfs?search=help%20wanted) label, so that it is easy to find place where you can contribute to the project.

If you are looking to contribute to a larger endeavour, we do have some areas of focus where we would love some more help.

### Performance profiling

We know that there are some low and medium hanging fruits to be grabbed and give js-ipfs huge performance boosts. We need as a project to create a more sistematic way of finding where these issues are and ensuring that tests will prevent us from causing regressions. @pgte went ahead and created a testing harness to benchmark js-ipfs and go-ipfs against each other and in different runtimes which is an excellent starting point. Find it [here](https://github.com/ipfs/ipfs-performance-profiling).

### Documentation

Although our best efforts, there is still a lot to get proper documentation. Documentation can be in the form of examples, function signatures and description, tutorials, videos, tests and so on.

Right now we are looking into expanding [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core) to every single call that IPFS support, adding the function signature and an example per call. We welcome everyone to help us on this task.

### Runtime support

js-ipfs runs today in Node.js, Chrome, Firefox and Electron's renderer process. We want to expand that to:

- [Electron Main Process](https://github.com/ipfs/js-ipfs/issues/843)
- [Cordova](https://github.com/ipfs/js-ipfs/issues/834)
- [Safari](https://github.com/ipfs/js-ipfs/issues/995)
- [Windows](https://github.com/ipfs/js-ipfs/issues/861)
- [Ionic](https://github.com/ipfs/js-ipfs/issues/802)

If you have experience using one of these runtimes and would love to see js-ipfs, consider contributing to these threads, either with knowledge or code, we appreciate both.


That is all for this post. Thank you for your attention, I bid you a good day!
