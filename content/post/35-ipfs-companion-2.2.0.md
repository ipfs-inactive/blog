---
date: 2018-04-10
url: 35-ipfs-companion-2-2-0
title: IPFS Companion 2.2.0 brings window.ipfs to your Browser
author: lidel
---

I am pleased to announce to everyone in our community that a new version of our
browser extension has been released!

![demo of v2.2.0](https://ipfs.io/ipfs/QmdJTmCxwcpoGbEVfT6b9j4RZJWNcF2GQG1Ajf9XB6XtVP)

Why is it worth a blog post you ask? See the overview of key features below.

# 🔦 Highlights

### Your node is exposed as `window.ipfs` on every webpage

Websites can now detect if the property exists in window context and opt-in to
use it instead of creating their own js-ipfs node.  It saves system resources
and battery (on mobile), avoids the overhead of peer discovery/connection,
enables shared repository access and more!

<p class="yt-container">
<iframe src="https://www.youtube-nocookie.com/embed/t1ldUp_mjDk?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</p>

Make sure to read our [notes on exposing IPFS API as window.ipfs](https://github.com/ipfs-shipyard/ipfs-companion/blob/master/docs/window.ipfs.md),
where we explain it in-depth and provide examples on how to use it your own dapp.

### Embedded js-ipfs Node

The Browser Action menu provides a toggle for switching  between external IPFS
node accessed over HTTP API and embedded, in-memory instance of js-ipfs.

The embedded node is great for quickly sharing files with someone, or for
testing a dapp that uses `window.ipfs` without having to install and start up
your own IPFS daemon.
Power users can provide own config (eg. to enable experimental pubsub) via _Preferences_.

**Note:** The embedded node _does not run_ when external node is selected.
Every time you switch back to the embedded node, a new instance is created
on-demand. It can take [a few seconds](https://user-images.githubusercontent.com/157609/38493690-4a77bd9e-3bf3-11e8-85da-ba06fd94cdbf.gif)
for a brand-new node to find peers.

### …and more!

For a longer walkthrough of new features see [Release Notes for v2.2.0](https://github.com/ipfs-shipyard/ipfs-companion/releases/tag/v2.2.0).

# Install it today!


| Firefox                                                                                                                                    | Chrome / Chromium                                                                                                                                                            |
|--------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [![Get the add-on](https://ipfs.io/ipfs/QmSX44XockQifmxE8Wdevkaa6vaqTXtGdH9t9aHWXZkuJq)](https://addons.mozilla.org/addon/ipfs-companion/) | [![Install](https://ipfs.io/ipfs/QmPinSJKFYCMuTDh484dLk5Av4HpZRzBRR1KPv7TM7CBVF)](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch) |


# Want to contribute?

Would you like to contribute to the IPFS browser extension and don't know how? Well, there are a few places you can get started:

- Opt-in for builds from [beta channel](https://github.com/ipfs-shipyard/ipfs-companion#beta-channel) and [create a new Issue](https://github.com/ipfs/ipfs-companion/issues/new) if you notice a bug or room for improvement
- Check [the issues with the `help wanted` label](https://github.com/ipfs-shipyard/ipfs-companion/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) and see if you can grab something
- See if there are any _Open Questions_ at the end of latest [Release Notes](https://github.com/ipfs-shipyard/ipfs-companion/releases/latest)
- Improve accessibility by working on [translations](https://github.com/ipfs-shipyard/ipfs-companion/blob/master/docs/localization-notes.md)
- Hack with IPFS and [show us what you made](https://github.com/ipfs/awesome-ipfs), especially with newly added `window.ipfs`!

# Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can
do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also
available at the `#ipfs` channel on Freenode.

That is all for this post. Thank you for being part of the community. Have a great day!
