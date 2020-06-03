---
date: 2017-07-12
url: /28-js-ipfs-0-25/
title: js-ipfs 0.25.0 released
author: David Dias
header_image: js-ipfs-placeholder.png
---

Today, we've released js-ipfs 0.25.0. This release is mostly maintenance, bug fixing and bringing some of the internal components up to their latest versions.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Good morning world 🌞<br><br>A fresh new js-ipfs is waiting for you:<br>+ ipfs@0.25.0<br>[08:52:21] Published to npm.<br><br>I bid you all a good day!</p>&mdash; David Dias (@daviddias) <a href="https://twitter.com/daviddias/status/885044398328819712">July 12, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

### 🏮 ipfs-repo is now 🐲 free

The IPFS Repo Class went through [some careful refactoring](https://github.com/ipfs/js-ipfs-repo/pull/140). Now it is easier to understand its internals and to support different backend storage adapters.

To create a js-ipfs node with your own custom repo, you can now:

```JavaScript
const node = new IPFS({repo: <your own Repo instance with your backend storage adapters>})
```

If you are curious, you can learn about what are the default storage adapters in the IPFS Repo itself, namely:

- Node.js - https://github.com/ipfs/js-ipfs-repo/blob/master/src/default-options.js
- Browser - https://github.com/ipfs/js-ipfs-repo/blob/master/src/default-options-browser.js

### ⬢ libp2p is now used directly and the bundles live inside the js-ipfs repo

The JavaScript implementation of libp2p received a lot of love recently, including the addition of Tutorials. You can consult all the details on the Log entry of libp2p's Captain.log - https://github.com/libp2p/js-libp2p/issues/6#issuecomment-313970615

### 🏎 SPDY is out of the mix and there goes browserify-zlib special shimming.

SPDY has been removed from the default browser bundle in favor of supporting `libp2p-multiplex` only. SPDY was the Stream Muxer of js-ipfs since almost the beginning, but since go-ipfs never got a complete implementation of SPDY, we ended up switching to `libp2p-multiplex` to guarantee interop between implementations. What this means is that you will continue to see the interop, but now your browser bundle will be significantly lighter. 

### 📞 wrtc, the WebRTC module for Node.js is now optional

`wrtc`, a module that enables js-ipfs Node.js nodes to speak WebRTC, has been excluded from the default list of modules so that Linux users can have a better time when using js-ipfs natively. You can still bring it back and now not only use `wrtc` but you can also use `electron-webrtc`, the other WebRTC module for Node.js See how to achieve that in the project's README - https://github.com/ipfs/js-ipfs#advanced-options-when-creating-an-ipfs-node.

Note, this doesn't change the behavior in the browser. Browser nodes will still continue to use WebRTC by default.


If you run into any hurdles, please open an issue on [ipfs/js-ipfs/issues](https://github.com/ipfs/js-ipfs).

Thank you for your attention, I bid you a good day!
