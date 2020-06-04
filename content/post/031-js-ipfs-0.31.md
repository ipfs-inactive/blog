---
date: 2018-07-29
url: /42-js-ipfs-0-31/
title: js-ipfs 0.31.0 released
author: Alan Shaw
header_image: js-ipfs-placeholder.png
---

Restoring IPFS magic one alakazam at a time...no we're not talking pokemon.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">They grow up so fast 😿 <a href="https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw">#JS</a> <a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> 0.31 has been released into the wild with added connectivity magic dust 🧚 and support for raw leaves 🌿 in your DAGs. Just in time for the Decentralized Web Summit 2018! More info in the release issue <a href="https://t.co/QfVL7TrSte">https://t.co/QfVL7TrSte</a> <a href="https://twitter.com/IPFSbot?ref_src=twsrc%5Etfw">@IPFSbot</a> <a href="https://twitter.com/hashtag/DWebSummit?src=hash&amp;ref_src=twsrc%5Etfw">#DWebSummit</a> <a href="https://t.co/Mv4RPvayA4">pic.twitter.com/Mv4RPvayA4</a></p>&mdash; Alan Shaw (@_alanshaw) <a href="https://twitter.com/_alanshaw/status/1023505986747883521?ref_src=twsrc%5Etfw">July 29, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

## 🧚 Connectivity Magic

Recent infrastructure changes to the nodes IPFS runs as gateways meant that they couldn't be used as bootstrapper nodes. This was bad news bears for `js-ipfs` since it doesn't yet have a DHT to discover content. So not being able to connect to the nodes that have a lot of the content meant the chances of `js-ipfs` finding content on the network took a turn for the worse.

Good news though! Brand new dedicated nodes have been provisioned that are connected to the gateway nodes and can be used by `js-ipfs` to bootstrap itself as well as, get this, preload content you add to IPFS! That's right, when you add stuff to your IPFS, the preload nodes are prompted to slerp it up automatically so that it can be shared instantly with other IPFS nodes on the network.

## 🌿 Raw Leaves

Raw leaves are much healthier for you because they don't lose their vitamins during the cooking process. Seriously though. They're great if you want to stream raw data (like video) out of your IPFS without the overhead of unpacking protobufs. They're also useful when you need to put your data in a data store that only deals with raw data, like a URL.

We have these now! Just pass `--raw-leaves=true` when adding content to IPFS and leaves of the DAG(s) you create will contain just the raw data.

# 🏗 API Changes

* A new configuration property `preload` has been added to the options provided to the IPFS constructor. Content added to IPFS using the following APIs will be automatically preloaded on a set of IPFS nodes. To lean more about how to configure this feature, check the [IPFS constructor docs](https://github.com/ipfs/js-ipfs#ipfs-constructor).
    * `dag.put`
    * `block.put`
    * `object.new`
    * `object.put`
    * `object.patch.*`
    * `files.add*`
    * `files.write`
    * `files.mv`
    * `files.cp`
* The `--raw-leaves` option has been enabled for `files.add`

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/pm/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.
