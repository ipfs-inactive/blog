---
date: 2016-01-29
id: 6-distributions
template: tmpl/layouts/post.html
baseurl: ..
breadcrumbs:
  - {name: "6-distributions", link: "./" }
tags: dist, distributions
title: IPFS distributions
author: Richard Littauer
collection: posts
---

[![](!img/screenshot.png)](http://dist.ipfs.io/)

[dist.ipfs.io](http://dist.ipfs.io/) is the new distributions page for IPFS. This is the new one-stop-shop for finding and downloading all official binaries that IPFS produces.

## Project details

Every distribution has a section, which includes:

- The distribution name and a short description;
- The current version number and release date;
- A download button that detects your platform and automatically suggests the appropriate distribution for you;
- A grid with download links for all supported platforms (operating system and architectures);
- A `Changelog`, a link to a summary of all version changes;
- An `All Versions`, a link to view and download previous versions.

The `All Versions` link on each distribution shows directory listings for all the available versions, and a `versions` file ([example](http://dist.ipfs.io/go-ipfs/versions)). This file can be used by tools, such as [ipfs-update](http://dist.ipfs.io/#ipfs-update), to find all the available versions and download the latest.

The directory listing of each version ([example](http://dist.ipfs.io/go-ipfs/v0.3.11)) has all the platform archives (`.zip` or `.tar.gz`), a `README.md` and a `dist.json` which describe the release for humans and machines. It is meant to be easily consumed and used by tools.

The site is also used directly by [`ipfs-update`](https://github.com/ipfs/ipfs-update) to update IPFS.

## Project Prerequisites

In order to be added to the distributions page, a product must:

- Originate from the IFPS community;
- Have high-quality UX and documentation;
- Be well maintained and active.

If you think that a product should be there that isn't, get in touch.

## Future Plans

In the future, we hope to:

- Enable code signing, for progress on this subject you can check this [PR]( https://github.com/ipfs/distributions/pull/51).
- Enable closer integration with package managers.
- Add more products, like [`ipget`](https://github.com/noffle/ipget) (already in the works).
- Host more screenshots of the tools directly in the Distributions page.
- Import binaries more intelligently in order to enhance change of deduplication.
- Add the software license (usually MIT) to each distribution.

## Contribute

We welcome any and all sorts of contributions! File issues or send us patches at [ipfs/distributions](https://github.com/ipfs/distributions).

Last but not least, a huge thank you to [Friedel](https://github.com/dignifiedquire) for his amazing work with the Dist page. None of this would be possible without him.
