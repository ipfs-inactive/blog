---
date: 2019-08-30
url: 70-js-ipfs-0-38
title: js-ipfs 0.38.0 released
author: Alex Potsides
---

> Garbage collection, gossipsub, IPNS support for ipfs resolve, oh my!

```console
$ npm install -g ipfs
```

# 🔦 Highlights

## 🗑️ Garbage collection

Support for garbage collection has shipped with `0.38.0`! This means that blocks in your IPFS Repo will be removed when gc is run unless they are pinned.

This is essential for keeping your repo to a manageable size, but must be run manually for the time being.

Use it with the following command:

```console
$ jsipfs repo gc
removed Qmfoo
removed Qmbar
```

To prevent blocks being collected, pin them:

```console
$ jsipfs pin add Qmbaz
pinned Qmbaz recursively
```

## 💬 Gossipsub enabled by default

Pubsub is now enabled by default with Gossipsub as the default implentation.

More efficient than [Floodsub](https://github.com/libp2p/js-libp2p-floodsub), [Gossipsub](https://github.com/ChainSafe/gossipsub-js) creates an overlay on top of the network of nodes which propagates messages to subscribers instead of broadcasting messages to everyone.

Read more about the design at [`libp2p/specs/pubsub/gossipsub`](https://github.com/libp2p/specs/tree/master/pubsub/gossipsub)

## 📛 IPNS support for `ipfs resolve`

You can now resolve [IPNS](https://docs.ipfs.io/guides/concepts/ipns/) names via `ipfs resolve`, what's more the recursive option is now on by default.

```console
$ jsipfs resolve /ipns/Qmqux
/ipfs/Qmgarply
```

# 🏗 API Changes

* [`ipfs.repo.gc([options])`](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/REPO.md#repogc) has been added
* [`ipfs.resolve(name, [options])`](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/MISCELLANEOUS.md#resolve) `options.resolve` now defaults to `true`

# ❤️ Huge thank you to everyone that made this release possible

By alphabetical order, here are all the humans that contributed to the release:

* [@achingbrain](https://github.com/achingbrain) (33 commits, 21 PRs, 7 issues, 46 comments)
* [@AcidLeroy](https://github.com/AcidLeroy) (1 comment)
* [@alanshaw](https://github.com/alanshaw) (50 commits, 25 PRs, 3 issues, 77 comments)
* [@andrycodestuffs](https://github.com/andrycodestuffs) (1 PR, 2 comments)
* [@AuHau](https://github.com/AuHau) (1 PR, 1 issue, 7 comments)
* [@bruinxs](https://github.com/bruinxs) (1 commit, 1 PR, 1 issue, 1 comment)
* [@daviddias](https://github.com/daviddias) (4 commits, 3 PRs, 1 issue, 18 comments)
* [@dirkmc](https://github.com/dirkmc) (2 commits, 1 comment)
* [@geastwood](https://github.com/geastwood) (1 commit, 1 PR)
* [@georgeaf99](https://github.com/georgeaf99) (1 comment)
* [@hacdias](https://github.com/hacdias) (4 commits, 3 PRs)
* [@hhfeng](https://github.com/hhfeng) (1 comment)
* [@hugomrdias](https://github.com/hugomrdias) (53 commits, 14 PRs, 1 issue, 23 comments)
* [@huyanyawei](https://github.com/huyanyawei) (1 comment)
* [@jacobheun](https://github.com/jacobheun) (4 commits, 2 PRs, 1 issue, 10 comments)
* [@jacogr](https://github.com/jacogr) (1 issue)
* [@jgeary](https://github.com/jgeary) (1 issue)
* [@jian-en](https://github.com/jian-en) (1 comment)
* [@jimpick](https://github.com/jimpick) (1 commit, 1 PR, 3 comments)
* [@JustMaier](https://github.com/JustMaier) (1 commit, 1 PR)
* [@lidel](https://github.com/lidel) (4 commits, 4 PRs, 2 issues, 18 comments)
* [@listenaddress](https://github.com/listenaddress) (2 issues)
* [@mikeal](https://github.com/mikeal) (1 PR, 7 comments)
* [@mitra42](https://github.com/mitra42) (1 issue, 6 comments)
* [@mkg20001](https://github.com/mkg20001) (1 commit, 1 PR, 1 issue, 2 comments)
* [@Nashatyrev](https://github.com/Nashatyrev) (1 issue)
* [@olizilla](https://github.com/olizilla) (10 comments)
* [@pruflyos](https://github.com/pruflyos) (1 comment)
* [@rabrux](https://github.com/rabrux) (1 comment)
* [@robertkiel](https://github.com/robertkiel) (1 PR)
* [@rvagg](https://github.com/rvagg) (1 comment)
* [@samparsky](https://github.com/samparsky) (18 PRs)
* [@Stebalien](https://github.com/Stebalien) (5 comments)
* [@tapaswenipathak](https://github.com/tapaswenipathak) (1 PR, 1 comment)
* [@teddycode](https://github.com/teddycode) (1 issue)
* [@terichadbourne](https://github.com/terichadbourne) (1 issue)
* [@vasa-develop](https://github.com/vasa-develop) (1 comment)
* [@vasco-santos](https://github.com/vasco-santos) (18 commits, 11 PRs, 18 comments)
* [@vmx](https://github.com/vmx) (2 commits, 3 PRs, 1 comment)
* [@x5engine](https://github.com/x5engine) (1 comment)
* [@yehia67](https://github.com/yehia67) (2 comments)
* [@yuwiggin](https://github.com/yuwiggin) (1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/team-mgmt/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
