---
date: 2018-11-01
url: 51-js-ipfs-0-33
title: js-ipfs 0.33.0 released
author: Alan Shaw
---

All new Web UI - Check on your node stats, explore the IPLD powered Merkle forest, see peers around the world and manage your files, without needing to touch the CLI.

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Set phasers to kill-er release ⚡️💥 JS <a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> 0.33 just marched out the door with a swagger so big you wouldn&#39;t believe. Brand new WebUI 🙀 + a heap of features &amp;fixes make it the best release since, well, the last one. Serious tho, it well good, install it <a href="https://t.co/XooZ86znuQ">https://t.co/XooZ86znuQ</a> <a href="https://t.co/oNH3xy4blp">pic.twitter.com/oNH3xy4blp</a></p>&mdash; Alan Shaw (@_alanshaw) <a href="https://twitter.com/_alanshaw/status/1058020797766397952?ref_src=twsrc%5Etfw">November 1, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

## 🕹 Web UI 2.0

The IPFS Web UI has been given a HUGE revamp and is now 10x, no, 100x better than before! 😄

* **Check the status** of your node, it's Peer ID and connection info, the network traffic and the number of connected peers
* Easily **manage files** in your IPFS repo. You can drag and drop to add files, move and rename them, delete, share or download them
* You can **explore IPLD data** that underpins how IPFS works
* See all of your **connected peers**, geolocated by their IP address
* **Review the settings** for your IPFS node, and update them to better suit your needs

![Screenshot of the status page](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-status.png)

| Files | Explore | Peers | Settings |
|-------|---------|-------|----------|
| ![Screenshot of the file browser page](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-files.png) | ![Screenshot of the IPLD explorer page](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-explore.png) | ![Screenshot of the swarm peers map](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-peers.png) | ![Screenshot of the settings page](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-settings.png) |

## 🛠 CID tool

A command line tool for converting, formatting and discovering properties of CIDs.

In the near future IPFS will be switching it's [**default** CID version for added content to version 1 and will use base 32 encoding for serialized CIDs](https://github.com/ipfs/go-ipfs/issues/4143). This tool gives you the power to inspect and learn about CIDs as well as convert any CIDs you've been using from whatever base they're encoded in to a different base!

* [Documentation](https://github.com/ipfs-shipyard/js-cid-tool)
* [Demo video](https://youtu.be/SMhy99yUVGk?t=299)

# 🏗 API Changes

* Added CLI command `ipfs cid [sub-command]`
    * View the help with `ipfs cid --help` or view the [documentation online](https://github.com/ipfs-shipyard/js-cid-tool)
* `ipfs.types.dagCBOR` and `ipfs.types.dagPB` have been removed
    * See [#1626](https://github.com/ipfs/js-ipfs/pull/1626) and [#374](https://github.com/ipfs/interface-ipfs-core/pull/374#pullrequestreview-164611060) for more information
* `dag-cbor` nodes retrieved from `ipfs.dag.get` now represent links as [CID](https://github.com/ipld/js-cid) instances not `{"/": "base-encoded-cid"}` objects
    * See [#1668](https://github.com/ipfs/js-ipfs/pull/1668) for more information

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/pm/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.
