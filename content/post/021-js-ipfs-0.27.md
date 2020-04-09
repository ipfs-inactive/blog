---
date: 2017-12-02
url: 32-js-ipfs-0-27
title: js-ipfs 0.27.0 released
author: David Dias
header_image: js-ipfs-placeholder.png
---

I'm happy to announce that js-ipfs v0.27.0 has been released!  This release brings a new transport to the libp2p family, perf improvements and stability (add files with 10x the size!), Windows support, bug fixes and more!

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">And it&#39;s out! <a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> <a href="https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw">#JS</a> v0.27.0 🚀<br><br> ✔ Test<br> ✔ Build<br> ✔ Update Contributors<br> ✔ Bump Version: v0.26.0 -&gt; v0.27.0<br> ✔ Gen Changelog<br> ✔ Gen GitHub Release<br> ✔ Publish to npm 🌟<a href="https://t.co/pDZK9tQDLR">https://t.co/pDZK9tQDLR</a><br><br>Just in time to join you for your favorite morning beverage! Mine is ☕️</p>&mdash; David Dias (@daviddias) <a href="https://twitter.com/daviddias/status/937565486912606208?ref_src=twsrc%5Etfw">December 4, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

### 🗂 The Files API has been upgraded with a new Streaming + Buffered interface

Now you can add and fetch Files from IPFS using your favorite streams library, Readable Streams (aka Node.js Streams) or Pull Stream, you pick! Also, if you don't need to handle large files or if you are ok with buffering the whole thing, you can also use the Callback or Promises API for simplicity.

See function signatures, descriptions and examples at: https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md

Ref:
- https://github.com/ipfs/interface-ipfs-core/pull/162
- https://github.com/ipfs/js-ipfs/issues/557

### 🌟 New transport! websocket-star 

js-ipfs has a new WebSockets relayed transport, a similar transport to webrtc-star but more stable (less memory hungry). With this addition, we disable webrtc by default and added instructions on how to enabled it to our FAQ so that you can pick the best transport (webrtc-star vs websocket-star) for your needs.

Big thank you to @mkg20001 for creating websocket-star in the first place! :)

### 📦 You are now able to add any directory size and depth to IPFS with the new multipart stream builder

`js-ipfs-api` got a big update with https://github.com/ipfs/js-ipfs-api/pull/629, upgrading the way we constructed multipart streams to send large amounts of Files to an IPFS daemon. Thanks to this, now js-ipfs CLI can any any directory size to IPFS. 

Thanks to @pgte for shipping it in a flash!

### 🏡 Windows Support

Yeeaaas! js-ipfs now supports Windows -- https://github.com/ipfs/js-ipfs/issues/1017#issuecomment-343568369 --!! Please send a huge hi5 to @richardschneider for slaying all the dragons on this one.

### 🦁 Safari Support (both Mobile and Desktop)

This is not necessarily a 0.27 update, but it is something you can do now! What this means is that now there are two mobile browsers that can run your Distributed Applications! (Chrome on Android and Safari on iOS)

### 🚥 More interop tests, including PubSub

Out set of interoperability tests is growing to make sure that JS and Go IPFS stay compatible at all times. The biggest new addition were PubSub tests, see these and more at https://github.com/ipfs/js-ipfs/tree/master/test/interop

### 👢 Bootstraper tests

Quick bootstraper tests were added -- https://github.com/ipfs/js-ipfs/pull/899 -- so that our Infrastructure team can always check that js-ipfs is able to contact the Bootstraper and Gateways after a configuration change. This should mitigate downtime issues we observer in the past.

### ✨ `ipfs.ls` is now implemented!

This was a long time coming. Thank you to @pgte for shipping this one.

### 💫 `ipfs file ls` is now implemented too!

You know when they say that an implementation of S3 is bug by bug compatible? Well, in our case, js-ipfs is getting command by command compatible with go-ipfs so that any app uses go-ipfs as a daemon can use js-ipfs too. This one was shipped by @richardschneider, thank you!

### 📶 Progress bar!

You can now get progress reports while adding a file to IPFS, both through the CLI (progress bar) or through the API, see how here: https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add

Thank you @dryajov for shipping this! 

### 🎢 Performance and Memory Improvements with pull-block

@beanow improved the performance of pull-block, one of the js-ipfs-unixfs-engine dependencies, reducing vastly its memory fingerprint. What this translates too is to a faster and less memory hungry ipfs.add. I've successfully managed to added multiple files of 750Mb to a browser application using js-ipfs, this is more than a 10x improvement over previous reports!!

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.

That is all for this post. Thank you for being part of the community. I bid you a good day!
