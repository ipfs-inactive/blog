---
date: 2018-08-30
url: 44-ipld-explorer-cli-0-14
title: ipld-explorer-cli 0.14 released
author: Alan Shaw
---

There’s a new version of the CLI tool for exploring your DAGs!

<p class="yt-container">
<iframe src="https://www.youtube-nocookie.com/embed/O0PbC2ElRPI?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</p>

The [IPLD (Inter Planetary Linked Data) project](https://ipld.io/) is used by IPFS to allow it to store, retrieve and traverse through any type of data. So you can add Git, Ethereum, Bitcoin, Zcash (and more) data to your IPFS and use the IPLD explorer CLI tool to take a look around and make sense of it.

I was inspired by the awesome new IPLD Explorer at https://explore.ipld.io (which you should totally check out if you haven’t already!) so I gave it an upgrade so that it could resolve IPLD formats other than `dag-pb` and `dag-cbor`, like `git-raw` and `ethereum-block`. It also now works with a `js-ipfs` daemon if you have one running (you’ll need to update the API address using the "config" command).

It’s published to npm here: http://npm.im/ipld-explorer-cli

Install Node.js and then install the module globally like:

```
npm i -g ipld-explorer-cli
```

Start your IPFS daemon and then type `ipld-explorer` at command line to be launched into a REPL.

Feedback and bugs go here: https://github.com/tableflip/ipld-explorer-cli/issues

Enjoy!
