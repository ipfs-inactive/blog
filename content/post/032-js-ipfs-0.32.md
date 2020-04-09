---
date: 2018-09-11
url: 43-js-ipfs-0-32
title: js-ipfs 0.32.0 released
author: Alan Shaw
header_image: js-ipfs-placeholder.png
---

A pinch of IPNS, some chunking of files and you'll have a delicious IPFS stew for supper.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Better head over to your nearest modules&#39;R&#39;us store because <a href="https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw">#JS</a> <a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> 0.32 has hit the shelves. We got <a href="https://twitter.com/hashtag/IPNS?src=hash&amp;ref_src=twsrc%5Etfw">#IPNS</a>, custom chunking &amp; loads more goodies. Enjoy 🍦! P.S. more info here: <a href="https://t.co/sU0GorC0l7">https://t.co/sU0GorC0l7</a> … <a href="https://twitter.com/hashtag/libp2p?src=hash&amp;ref_src=twsrc%5Etfw">#libp2p</a> <a href="https://twitter.com/hashtag/fingerprinting?src=hash&amp;ref_src=twsrc%5Etfw">#fingerprinting</a> <a href="https://twitter.com/hashtag/rabin?src=hash&amp;ref_src=twsrc%5Etfw">#rabin</a> <a href="https://t.co/PcPXS8fVMl">pic.twitter.com/PcPXS8fVMl</a></p>&mdash; Alan Shaw (@_alanshaw) <a href="https://twitter.com/_alanshaw/status/1039552739221614594?ref_src=twsrc%5Etfw">September 11, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

## 📛 IPNS locally

IPNS has it's foot in the door, and it's coming in! In this release IPNS works for your local node. It means you can now [publish](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/NAME.md#namepublish) records to your local repo and [read](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/NAME.md#nameresolve) them back. There's still some way to go but you know the saying right, "from small beginnings comes great IPNS"?

## 🕵️‍♀️ Partial `ipfs.resolve`

In preparation for IPNS landing, we've rolled out a partial implementation of the [`resolve`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/MISCELLANEOUS.md#resolve) command. The idea of the resolve command is to figure out the underlying hash of the content referred to by an IPNS name or an IPFS path.

The new resolve command can resolve paths like `/ipfs/QmRootHash/path/to/file` to `/ipfs/QmFileHash` and will soon be able to deal with IPNS names in an upcoming release.

## 📦 libp2p bundle function

We made it even easier to create your libp2p bundle! If you're looking to create a completely custom libp2p bundle then you can now pass a [function in place of your libp2p config](https://github.com/ipfs/js-ipfs#optionslibp2p) which should return your libp2p bundle. It's passed useful information like the IPFS node peer ID so you should be able to build your bundle exactly the way you want! You're welcome 😁

## 🥒 Support for chunking algorithm

Slice and dice your DAG nodes the way _you_ want™️. When adding data to your IPFS node you can now specify the size of the chunks it creates from your data or even use [`rabin` fingerprinting](https://en.wikipedia.org/wiki/Rabin_fingerprint) to create some fancy variable length chunks for better deduping.

[Rabin](https://www.npmjs.com/package/rabin) is a native module and must be compiled on your system when you run `npm install ipfs`. Native modules depend on specific [languages and tools](https://github.com/nodejs/node-gyp#installation) to be pre-installed on your computer and because of this has been made an [optional dependency](https://docs.npmjs.com/files/package.json#optionaldependencies). That means that it's 👌 if it fails to install, it just won't be available to use in IPFS. If you're thinking of using rabin chunking then be sure to check that it installed properly in your install logs.

Check out the docs for the [`files.add` `chunker` option](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesadd) for more.

# 🏗 API Changes

* Added `ipfs.name.publish` and `ipfs.name.resolve`. This only works on your local node for the moment until the DHT lands. [API docs can be found here](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/NAME.md).
* Added `ipfs.resolve` API. Note that this is a partial implementation allowing you to resolve IPFS paths like `/ipfs/QmRootHash/path/to/file` to `/ipfs/QmFileHash`. It does not support IPNS yet.
* `ipfs.files.add*` now supports a `chunker` option, see [the API docs](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesadd) for details

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/pm/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.
