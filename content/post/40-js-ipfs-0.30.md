---
date: 2018-07-09
url: 40-js-ipfs-0-30
title: js-ipfs 0.30.0 released
author: Alan Shaw
---

Feature parity with go-ipfs just got a whole lot closer!

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">js-ipfs 0.30 has been released live at the <a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> Dev Meeting. Thank you everyone for all the love ❤️ <a href="https://t.co/YB9NfGM7WC">https://t.co/YB9NfGM7WC</a> and big hi5 to <a href="https://twitter.com/_alanshaw?ref_src=twsrc%5Etfw">@_alanshaw</a> for driving the whole release forward and being an awesome Lead Maintainer for <a href="https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw">#JS</a> <a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> 🚀 <a href="https://t.co/6arftXUxBe">pic.twitter.com/6arftXUxBe</a></p>&mdash; David Dias (@daviddias) <a href="https://twitter.com/daviddias/status/1016364733107228673?ref_src=twsrc%5Etfw">July 9, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

## 🔀 Mutable File System (MFS)

MFS, the mutable file system is finally here in js-ipfs. The [MFS API](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#mutable-file-system) allows you to use IPFS like a regular Unix file system. Add, edit, move, copy, rename and delete your files while keeping all that content addressable, Merkle DAGgy goodness.

## 📌 Pin API implemented

Ever wanted to keep the things you add to IPFS? Well now you can! Pinning a hash in IPFS land tells your node to keep the data around in your local repo until you decide to unpin it. No amount of garbage collection will take it! Next stop, implement garbage collection 😝

## 🤝 libp2p connection manager added

The new libp2p connection manager gives you the power to disconnect peers when you have too many or when certain bandwidth restrictions are reached. Really useful for preserving resources on resource constrained devices such as mobile phones or IoT.

See the options at: https://github.com/libp2p/js-libp2p-connection-manager#create-a-connectionmanager

## 📇 bitswap improvements

Swapping your bits has never been so easy to keep track of. You can now inspect the "wantlist" (the list of hashes currently wanted by various peers) on a per peer basis, and you can manually "unwant" hashes in your own list.

## ☯️ Content hashes interop

If you add a file to go-ipfs and also add it to js-ipfs then you might get a different hash. It doesn't mean the hash is wrong, just that the layout of the DAG nodes that were created for your file was different. Good news folks, we fixed that. You should now get the same hash whether you add your file to go-ipfs or js-ipfs. Hooray \o/.

## 🙅 Node.js 10 support

Now you can run your js-ipfs node on the latest and greatest Node.js yet.

# 🏗 API Changes

* libp2p configuration property names for custom modules has changed
    * old: `libp2p.modules.discovery`
    * new: `libp2p.modules.peerDiscovery`
* Custom libp2p modules you provide now _replace_ default modules
* Pin API added ([spec](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/PIN.md))
* `bitswap.wantlist` peer ID parameter added ([spec](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/BITSWAP.md#bitswapwantlist))
* `bitswap.unwant` implemented ([spec](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/BITSWAP.md#bitswapunwant))
* MFS API added ([spec](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#mutable-file-system))

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/pm/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.

That is all for this post. Thank you for being part of the community. I bid you a good day!
