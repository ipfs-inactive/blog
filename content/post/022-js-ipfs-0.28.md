---
date: 2018-03-16
url: 33-js-ipfs-0-28
title: js-ipfs 0.28.0 released
author: David Dias
header_image: js-ipfs-placeholder.png
---

Excited to share with you all today that js-ipfs v0.28.0 has been released! This release brings a panoply of bug fixes, perf improvements, testing improvements and new features. Upgrading to this version should be smooth.


<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> <a href="https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw">#JS</a> v0.28.0 🚀<br><br>✔ Test<br>✔ Build dist version<br>✔ Update Contributors list<br>✔ Bump Version: v0.27.7 -&gt; v0.28.0<br>✔ Gen Changelog<br>✔ Gen GitHub Release<br>✔ Publish to npm 🌟<br><br>Highlights at: <a href="https://t.co/sfUC0oIs3s">https://t.co/sfUC0oIs3s</a><br><br>I bid you all a good day :)</p>&mdash; David Dias (@daviddias) <a href="https://twitter.com/daviddias/status/969226132586450944?ref_src=twsrc%5Etfw">March 1, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

### Spawn IPFS daemons, JS or Go, easier than ever with brand new IPFS Factory (ipfsd-ctl)

The ipfsd-ctl module got a big upgrade and now is capable of spawning JS and Go IPFS Daemons using only JavaScript! The documentation was also updated. We use it for all our tests on js-ipfs, js-ipfs-api and ipfs/interop.

Learn how to use it at https://github.com/ipfs/js-ipfsd-ctl.

Thanks to @dryajov, @richardschneider for helping make this happen and everyone else that participated in the review of the new API.

### 📣 PubSub is now a 1st class API of libp2p as well

Now both IPFS and libp2p nodes expose the same PubSub API. This enables other applications that want to use the networking stack of IPFS only, including PubSub.

Check the updated example in the js-libp2p repo at https://github.com/libp2p/js-libp2p/tree/master/examples/pubsub.

### 💻 Multiple jsipfs CLI updates

The jsipfs has been receiving a lot of love lately, updates include:

  - `jsipfs ls -r`List directories recursively
  - `jsipfs version` supports all flags now
  - Other bug fixes

To test it out, [install it globally in your machine with npm: `npm install ipfs --global`](https://github.com/ipfs/js-ipfs#through-command-line-tool).

Thanks @JonKrone and @vmx for shipping this! 

### 📖 New example - Add multiple files as a directory in the Browser

You asked and @achingbrain shipped it! A new example to show how virtual directories can be added to IPFS from the Browser. Check it out at: https://github.com/ipfs/js-ipfs/tree/master/examples/browser-add-readable-stream

### 🔌 jsipfs shutdown -- stop your daemon remotely

You now can call `jsipfs shutdown` to turn off your js-ipfs daemon. This comes in handy when you want to stop a remote node and do not have access to the terminal and/or you are running in Windows and interrupt signals don't work in the same way as in Linux.

### 💱 IPLD support for Bitcoin and Zcash

The DAG Api now can resolve through Bitcoin and Zcash blocks in the same way that it can resolve through Ethereum blocks thanks to https://github.com/ipld/js-ipld-bitcoin and https://github.com/ipld/js-ipld-zcash. Thanks to @vmx for adding support.

### ⏩ Testing is now faster with Jenkins, lot faster

@VictorBjelkholm put a bunch of work and now we have super fast test set up for js-ipfs and its modules (remaining modules still being updated). Now when you submit a PR, you will see "Jenkins". The Jenkins service is running on a beefy machine and has no wait queues! No more waiting for Travis for 6 hours!

### 🕶 libp2p-mplex is official and has a spec!

Our interoperable Stream Multiplexer has graduated, it has a spec -- https://github.com/libp2p/mplex -- and an updated module -- https://github.com/libp2p/js-libp2p-mplex.

### ⒿⓈ⚡️ js-ipfs Dev Team Weekly Sync 🙌🏽 

The js-ipfs Dev Team has brought back the Weekly Sync ups! These are designed to be short meetings, focused in the work at hand identify what are the top priorities and everyone's focus for the week. Everyone is welcome to join, either as a contributor or just as a listener. Read more about it at https://github.com/ipfs/js-ipfs/issues/1179.

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- **NEW** Join the [ⒿⓈ⚡️ js-ipfs Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/js-ipfs/issues/1179) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.

That is all for this post. Thank you for being part of the community. I bid you a good day!
