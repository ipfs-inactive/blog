---
date: 2019-05-22
url: 89-js-ipfs-0-36
title: js-ipfs 0.36.0 released
author: Alan Shaw
---

> URL safe CIDs, refs commands, DOM File support and more!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">A wild and excitable JS <a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> 0.36 just darted across the street and into the npm module store 🏇💨. It&#39;s got 🧬 Base32 encoded v1 CIDs, 👉 refs and refs local commands, 🗄 support for adding DOM File objects and loads more! <a href="https://t.co/zIFEfQX325">https://t.co/zIFEfQX325</a></p>&mdash; Alan Shaw (@_alanshaw) <a href="https://twitter.com/_alanshaw/status/1131145571408986112?ref_src=twsrc%5Etfw">May 22, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

## 🧬 Base32 encoding for v1 CIDs

As a stepping stone towards switching to CIDv1 by default for all CIDs, we're shipping a small change to v1 CIDs that means their string form is `base32` encoded instead of `base58btc`. So, instead of:

```console
$ jsipfs add --cid-version 1 guardian.jpg
added zb2rhk6GMPQF3hfzwXTaNYFLKomMeC6UXdUt6jZKPpeVirLtV guardian.jpg
```

You'll now get back a `base32` encoded CID:

```console
$ jsipfs add --cid-version 1 guardian.jpg
added bafkreibu6pkzh33dfwfa3bg3twih7uiohu6d6cr34txljekdn3cvwoujiu guardian.jpg
```

You can [read more about this change here](https://github.com/ipfs/js-ipfs/issues/1995).

PR: https://github.com/ipfs/js-ipfs/pull/2050

## 👉 Added refs and refs local commands

We've added the `refs` and `refs local` commands to the core, CLI and HTTP API. These commands allow you to list out all the CIDs referenced by a given DAG node or all the CIDs in your local repo. You can even choose the display format.

PR: https://github.com/ipfs/js-ipfs/pull/2004

## 🗄 Support for adding DOM File objects

Finally! You can just add a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) to IPFS without having to jump through hoops converting it to a `Buffer` first. Sensational!

A `File`, by the way, is what you'll get back from a `<input type="file">` or the drag and drop API, so being able to easily take that file and add it to IPFS makes onboarding new frontend devs way easier (as well as way more convenient for all you old frontend devs 😜).

PR: https://github.com/ipfs/js-ipfs/pull/2013

## 🔬 MDNS discovery compatibility

The libp2p discovery module for finding IPFS nodes over MDNS has been updated so that your JS IPFS node is now able to find Go IPFS nodes on the local network too. It's a backwards compatible change so older nodes will still be able to find your node and you'll still be able to find them.

PR: https://github.com/libp2p/js-libp2p-mdns/pull/80

## 🚤 28% faster stream multiplexing

We switched the multiplexing implementation to one that's simpler, smaller and faster. We're estimating it to be [around 28% faster than the old implementation](https://github.com/libp2p/pull-mplex/pull/8#issue-254730751).

PR: https://github.com/ipfs/js-ipfs/pull/1884

## ⛩ Gateway improvements

The IPFS HTTP gateway that JS IPFS exposes when run as a daemon in Node.js has been upgraded to support a number of HTTP features like conditional requests, byte range requests as well as getting some bug fixes, mini features and other improvements. There's too much to list here but check out the PR for and in depth description of what's changed.

PR: https://github.com/ipfs/js-ipfs/pull/1989

## 🔏 Pubsub message signing

Messages sent over Pubsub will now be automatically signed by the initial publisher, and included as a signature property on each Pubsub message. IPFS and Libp2p will be verifying the signatures of Pubsub messages by default in future releases, which will enable us to verify the authenticity of all messages sent over the network before they are processed. Verification is not yet required by default, but it will be in future releases, and all unsigned messages will not be processed or forwarded.

PR: https://github.com/libp2p/js-libp2p/pull/362

# 🏗 API Changes

1. **BREAKING**: The default string encoding for version 1 CIDs has changed to `base32`
1. **BREAKING**: IPLD formats have been updated to the latest versions. IPLD nodes returned by `ipfs.dag` and `ipfs.object` commands have significant breaking changes. If you are using these commands in your application you are likely to encounter the following changes to `dag-pb` nodes (the default node type that IPFS creates):
    * `DAGNode` properties have been renamed as follows:
        * `data` => `Data`
        * `links` => `Links`
        * `size` => `size` (Note: no change)
    * Additionally, the `Links` property of a `DAGNode` now returns plain JS objects with `Hash`, `Name` and `Tsize` properties, **NOT** `DAGLink` instances
    * `DAGLink` properties have been renamed as follows:
        * `cid` => `Hash`
        * `name` => `Name`
        * `size` => `Tsize`
    * See CHANGELOGs for each IPLD format for it's respective changes, you can read more about the [`dag-pb` changes in the CHANGELOG](https://github.com/ipld/js-ipld-dag-pb/blob/master/CHANGELOG.md#0160-2019-05-08)
1. Commands `refs` and `refs local` have been added to core, the CLI and the HTTP API
    * [Core API docs](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/REFS.md)
    * [HTTP API docs](https://docs.ipfs.io/reference/api/http/#api-v0-refs)
    * [CLI API docs](https://docs.ipfs.io/reference/api/cli/#ipfs-refs)
1. Support for DOM [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects has been added to [`ipfs.add`](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add)

# ❤️ Huge thank you to everyone that made this release possible

In alphabetical order, here are all the humans that contributed to the release:

* [Adam Uhlíř](https://github.com/AuHau) (1 PR, 3 issues, 1 review, 1 comment)
* [Agent of User](https://github.com/agentofuser) (5 comments)
* [Alan Shaw](https://github.com/alanshaw) (21 PRs, 5 issues, 59 reviews, 126 comments)
* [Alex Potsides](https://github.com/achingbrain) (16 PRs, 7 issues, 14 reviews, 14 comments)
* [André Cruz](https://github.com/satazor) (1 comment)
* [André Medeiros](https://github.com/andremedeiros) (1 comment)
* [Arie Trouw](https://github.com/arietrouw) (1 issue)
* [Beeno Tung](https://github.com/beenotung) (2 comments)
* [bleonard252](https://github.com/bleonard252) (1 comment)
* [bruinxs](https://github.com/bruinxs) (1 issue, 1 comment)
* [David Dias](https://github.com/daviddias) (5 comments)
* [Davit Barbakadze](https://github.com/jayarjo) (5 comments)
* [Despoinis](https://github.com/Despoinis) (2 issues, 3 comments)
* [Dietrich Ayala](https://github.com/autonome) (1 PR, 2 issues, 2 comments)
* [Diogo Silva](https://github.com/fsdiogo) (1 PR)
* [dirkmc](https://github.com/dirkmc) (5 PRs, 3 issues, 46 reviews, 60 comments)
* [edoo](https://github.com/ookangzheng) (1 comment)
* [Francis Gulotta](https://github.com/reconbot) (1 comment)
* [Friedel Ziegelmayer](https://github.com/dignifiedquire) (1 review)
* [Gopalakrishna Palem](https://github.com/KrishnaPG) (3 PRs, 1 issue, 3 reviews, 5 comments)
* [Guilherme Gervasio](https://github.com/gil-air-may) (1 comment)
* [Guo Liu](https://github.com/guoliu) (1 issue, 1 comment)
* [Guy Sviry](https://github.com/guysv) (2 PRs, 2 issues, 15 comments)
* [Henrique Dias](https://github.com/hacdias) (1 PR)
* [Hugo Dias](https://github.com/hugomrdias) (5 PRs, 4 issues, 6 reviews, 17 comments)
* [Irakli Gozalishvili](https://github.com/Gozala) (1 PR, 3 reviews, 3 comments)
* [Ishan Joshi](https://github.com/ishanjoshi02) (1 issue)
* [Jacob Heun](https://github.com/jacobheun) (12 PRs, 3 issues, 55 reviews, 66 comments)
* [Jake Hemmerle](https://github.com/jakehemmerle) (3 comments)
* [Jared Wright](https://github.com/jawerty) (1 issue)
* [Jonybang](https://github.com/Jonybang) (1 PR, 3 issues, 8 comments)
* [jzstern](https://github.com/jzstern) (1 comment)
* [Kavanaugh Latiolais](https://github.com/kav) (3 comments)
* [Keith Smith](https://github.com/KeithSSmith) (2 issues)
* [kumavis](https://github.com/kumavis) (9 PRs, 16 issues, 8 reviews, 53 comments)
* [Lorenzo Setale ](https://github.com/koalalorenzo) (2 comments)
* [Łukasz Magiera](https://github.com/magik6k) (1 review, 1 comment)
* [Maciej Krüger](https://github.com/mkg20001) (1 review, 11 comments)
* [Marcin Rataj](https://github.com/lidel) (2 PRs, 4 issues, 11 reviews, 13 comments)
* [Mark Robert Henderson](https://github.com/aphelionz) (2 issues)
* [Mars Robertson](https://github.com/marsrobertson) (1 issue)
* [Matt Ober](https://github.com/obo20) (1 issue, 2 comments)
* [Michael Bradley](https://github.com/michaelsbradleyjr) (1 PR, 1 issue, 5 comments)
* [Michael Muré](https://github.com/MichaelMure) (2 comments)
* [Mikeal Rogers](https://github.com/mikeal) (1 issue, 8 reviews, 1 comment)
* [Mikerah](https://github.com/Mikerah) (1 comment)
* [Mitra Ardron](https://github.com/mitra42) (2 issues, 2 comments)
* [MonarthS](https://github.com/MonarthS) (1 issue)
* [Nate Foss](https://github.com/npfoss) (1 issue, 1 comment)
* [nijynot](https://github.com/nijynot) (1 PR)
* [Nikhil-Bathula](https://github.com/Nikhil-Bathula) (1 issue, 3 comments)
* [Oli Evans](https://github.com/olizilla) (1 review, 15 comments)
* [Pedro Teixeira](https://github.com/pgte) (2 reviews)
* [pinanklakhani](https://github.com/pinanklakhani) (1 issue)
* [pldespaigne](https://github.com/pldespaigne) (1 issue, 1 comment)
* [Portia Burton](https://github.com/pkafei) (1 review)
* [pruflyos](https://github.com/pruflyos) (1 issue)
* [reasv](https://github.com/reasv) (2 issues, 2 comments)
* [Rod Vagg](https://github.com/rvagg) (76 reviews, 8 comments)
* [sachaaaaa](https://github.com/sachaaaaa) (1 PR)
* [ShareTheWorld](https://github.com/ShareTheWorld) (1 issue, 2 comments)
* [Shivam Rawat](https://github.com/ShivamRawat0l) (1 PR)
* [Steven Allen](https://github.com/Stebalien) (1 PR, 1 review, 4 comments)
* [Vasco Santos](https://github.com/vasco-santos) (16 PRs, 5 issues, 24 reviews, 26 comments)
* [Volker Mische](https://github.com/vmx) (17 PRs, 3 issues, 23 reviews, 49 comments)
* [William LeGate](https://github.com/wlegate) (3 comments)
* [X5 Engine](https://github.com/x5engine) (2 comments)
* [李小明](https://github.com/alx696) (1 issue, 4 comments)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-ipfs repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/team-mgmt/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
