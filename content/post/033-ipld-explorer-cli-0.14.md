---
date: 2018-09-12
url: /44-ipld-explorer-cli-0-14/
title: ipld-explorer-cli 0.14 released
author: Alan Shaw
---

There's a new version of the [ipld-explorer-cli](http://npm.im/ipld-explorer-cli) tool for exploring [IPLD](https://ipld.io/) data! Let's break down those acronyms and explain why I'm so excited about this.

[IPLD (Inter Planetary Linked Data)](https://ipld.io/) is the underlying data structure used by IPFS that allows it to store, retrieve and traverse through any type of content-addressed data. Recently, our team created the awesome new [IPLD Explorer](https://explore.ipld.io) so you can visually explore IPLD objects. If you haven't already checked it out, hop over and explore everything from [git repos](https://explore.ipld.io/#/explore/z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE) to [ethereum blocks](https://explore.ipld.io/#/explore/z43AaGEvwdfzjrCZ3Sq7DKxdDHrwoaPQDtqF4jfdkNEVTiqGVFW) to [historic photo archives of the lunar landings](https://explore.ipld.io/#/explore/QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D) to your own IPLD data. 

The IPLD Explorer also comes with a command-line interface ([ipld-explorer-cli](https://www.npmjs.com/package/ipld-explorer-cli)) so you can explore with your keyboard. I was inspired to give it an upgrade so that it could resolve IPLD formats other than `dag-pb` and `dag-cbor`, like `git-raw` and `ethereum-block`. It also now works with a `js-ipfs` daemon if you have one running (you’ll need to update the API address using the "config" command).

Here's a quick demo video:

<p class="yt-container">
<iframe src="https://www.youtube-nocookie.com/embed/O0PbC2ElRPI?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</p>

### Installing and using the new CLI

Ensure you have at least:
* [Node.js](https://nodejs.org/en/download/)

Install the module globally:

```
$ npm i -g ipld-explorer-cli
```

Then, launch the interactive shell:

```
$ ipld-explorer
```

You'll see instructions to explore sample datasets and begin traversing the Merkle forest 🌲🌲🌲. You can also start a [js-ipfs daemon](https://github.com/ipfs/js-ipfs#ipfs-daemon) to explore your own data. Enjoy!

# 💬 Feedback or bugs?

Do you have feedback for us, or bugs to report? Please open an issue: https://github.com/tableflip/ipld-explorer-cli/issues

# 🙌🏽 Want to contribute to this CLI tool?

Check out the issues marked `good first issue` and let us know where you would like to begin! https://github.com/tableflip/ipld-explorer-cli/issues

# 🙌🏽 Want to contribute to IPFS?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/pm/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.
