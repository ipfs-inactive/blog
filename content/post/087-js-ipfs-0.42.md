---
date: 2020-04-14
url: 2020-04-14-js-ipfs-0-42
title: js-ipfs 0.42.0 released
author: Alex Potsides
---

# 🔦 Highlights

> Smaller, faster, more reliable

`js-IPFS@0.42.0` has been released, bringing a host of bug fixes and other small stability improvements.

It reduces the size of the minified bundle by 7.5% for faster downloads and more responsive web apps!

## 🤖 Automated publishing of RCs

Release Candidate builds of [`js-ipfs`](https://www.npmjs.com/package/ipfs) and [`js-ipfs-http-client`](https://www.npmjs.com/package/ipfs-http-client) are now being published to npm with every build of master, so you can try out the very bleeding edge with:

```console
$ npm install -g ipfs@next
or
$ npm install ipfs-http-client@next
```

This will download and install a version of `js-ipfs` and/or `ipfs-http-client` created from the last successful [build](https://travis-ci.com/github/ipfs/js-ipfs/branches) of master with no GitHub URLs in the production dependency tree.

## 🛳️ Updated Docker containers

Publishing to Docker Hub has been restored so you can get a container running the latest and greatest `js-ipfs` with:

```console
$ docker pull ipfs/js-ipfs
```

You can also pull pre-releases at any time with:

```console
$ docker pull ipfs/js-ipfs:next
```

Check out all the releases at: https://hub.docker.com/r/ipfs/js-ipfs

## ✨New features

The [MFS][] CLI now supports nanosecond mtimes, use it with the following commands:

```console
$ jsipfs mkdir /directory --mtime 1000 --mtime-nsecs 5
```

`--mode` and `--mtime` are now also supported when piping files to `jsipfs add`:

```console
$ cat ./file.txt | jsipfs add --mode 0500
```

## 🔨 Breaking changes

- [HAMT](https://en.wikipedia.org/wiki/Hash_array_mapped_trie) sharded directories are now reported as having a type of `'directory'` from `ipfs.files.stat` in line with `go-ipfs`
- When specifying metadata and `--raw-leaves` to `ipfs.add`, if the file is small enough to fit into one block, `--raw-leaves` is ignored and a [UnixFS][] entry is created (previously the returned [CID][] would have a codec of `raw`)

## 🦟 Bugs fixed

- WebRTC configuration is now passed to the libp2p WebRTC transport correctly
- Unknown CLI commands now cause the process to exit with a non-zero exit code
- Running Prometheus metrics in Docker containers no longer prevent the container from starting

## 💍 One PR to rule them all

A common observation made about IPFS development is that there are so many repos to gain knowledge of, it’s hard to know how everything fits together and where a problem might originate, all of which makes it hard to start contributing.

Contributors will sometimes spend precious time crafting one PR, only to be told they need to make additional PRs to repos they didn't even know existed in order to land their initial change. This often ends up being too much of a barrier for developers who have external time pressures we aren’t aware of.

Features must be staged across multiple releases from multiple repos, any of which have the possibility of blocking other work streams if human error bugs are introduced, or perhaps a piece of work was not as fully specified as it needed to be.

To start to address this we’ve consolidated `js-ipfs`, `js-ipfs-http-client` and `interface-js-ipfs-core` into [one repository](https://github.com/ipfs/js-ipfs). This made sense because a given IPFS feature is typically implemented in `js-ipfs`, exposed over http by the http client and tests are added to the interface suite to ensure everything works together - now you will be able to make that sort of change in **one PR instead of three!**

It’s our hope that this will go some way towards simplifying IPFS development and will encourage new contributors to pitch in and help us build a platform to power the distributed web.

## 🗺️ What's next?

To get a better view on what’s coming up in `js-ipfs` releases, we’ve put a [Project Roadmap](https://github.com/orgs/ipfs/projects/6) together that contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

* [@achingbrain](https://github.com/achingbrain) (149 commits, 44 PRs, 6 issues, 166 comments)
* [@agustinmessina](https://github.com/agustinmessina) (3 comments)
* [@alanshaw](https://github.com/alanshaw) (8 commits, 6 PRs, 1 issue, 12 comments)
* [@alexjc](https://github.com/alexjc) (1 issue, 1 comment)
* [@andrew](https://github.com/andrew) (7 commits, 14 PRs, 1 comment)
* [@aphelionz](https://github.com/aphelionz) (1 PR, 1 issue, 3 comments)
* [@aquiladev](https://github.com/aquiladev) (1 issue)
* [@betamos](https://github.com/betamos) (1 issue)
* [@bluelovers](https://github.com/bluelovers) (2 commits, 8 PRs, 14 issues, 26 comments)
* [@calikevuche](https://github.com/calikevuche) (2 issues, 1 comment)
* [@carsonfarmer](https://github.com/carsonfarmer) (3 comments)
* [@chafey](https://github.com/chafey) (2 commits, 4 PRs, 4 issues, 9 comments)
* [@ChainSafeSystems](https://github.com/ChainSafeSystems) (1 comment)
* [@christopheSeeka](https://github.com/christopheSeeka) (2 issues, 7 comments)
* [@CLAassistant](https://github.com/CLAassistant) (1 comment)
* [@codecov-io](https://github.com/codecov-io) (4 comments)
* [@daviddias](https://github.com/daviddias) (2 commits, 3 PRs, 1 issue, 7 comments)
* [@dirkmc](https://github.com/dirkmc) (1 PR, 5 comments)
* [@Elvenisboy](https://github.com/Elvenisboy) (1 comment)
* [@emclab](https://github.com/emclab) (3 comments)
* [@Gudahtt](https://github.com/Gudahtt) (1 issue)
* [@hacdias](https://github.com/hacdias) (2 commits)
* [@happy-zhangbo](https://github.com/happy-zhangbo) (2 issues, 2 comments)
* [@hazae41](https://github.com/hazae41) (2 issues)
* [@hsanjuan](https://github.com/hsanjuan) (3 comments)
* [@hugomrdias](https://github.com/hugomrdias) (39 commits, 27 PRs, 6 issues, 35 comments)
* [@icidasset](https://github.com/icidasset) (2 issues, 3 comments)
* [@iRyanBell](https://github.com/iRyanBell) (1 PR)
* [@jacobheun](https://github.com/jacobheun) (45 commits, 3 PRs, 3 issues, 36 comments)
* [@Jonybang](https://github.com/Jonybang) (1 issue)
* [@josselinchevalay](https://github.com/josselinchevalay) (1 issue, 4 comments)
* [@jsonsivar](https://github.com/jsonsivar) (2 issues)
* [@kalmi](https://github.com/kalmi) (1 issue, 1 comment)
* [@kanej](https://github.com/kanej) (1 commit, 1 PR, 2 comments)
* [@kawmaiparis](https://github.com/kawmaiparis) (1 issue, 1 comment)
* [@koivunej](https://github.com/koivunej) (1 issue)
* [@kumavis](https://github.com/kumavis) (1 commit, 1 PR, 2 comments)
* [@latenssi](https://github.com/latenssi) (1 issue, 2 comments)
* [@lidel](https://github.com/lidel) (1 PR, 2 issues, 4 comments)
* [@MaduraRaj](https://github.com/MaduraRaj) (1 issue)
* [@MaxGraey](https://github.com/MaxGraey) (1 comment)
* [@mcclure](https://github.com/mcclure) (1 issue)
* [@mell-old](https://github.com/mell-old) (1 issue)
* [@mfsoftworks](https://github.com/mfsoftworks) (1 comment)
* [@mikeal](https://github.com/mikeal) (1 issue, 12 comments)
* [@mkg20001](https://github.com/mkg20001) (4 commits, 1 issue, 4 comments)
* [@mmm8955405](https://github.com/mmm8955405) (1 issue, 6 comments)
* [@MonarthS](https://github.com/MonarthS) (1 comment)
* [@mpetrunic](https://github.com/mpetrunic) (1 PR)
* [@nijynot](https://github.com/nijynot) (1 commit)
* [@notsag-dev](https://github.com/notsag-dev) (1 PR)
* [@npfoss](https://github.com/npfoss) (1 commit)
* [@obo20](https://github.com/obo20) (1 issue, 3 comments)
* [@olizilla](https://github.com/olizilla) (1 commit, 1 PR, 2 comments)
* [@ottodevs](https://github.com/ottodevs) (5 comments)
* [@pcowgill](https://github.com/pcowgill) (2 PRs, 8 issues, 43 comments)
* [@ribasushi](https://github.com/ribasushi) (1 issue, 1 comment)
* [@rigwild](https://github.com/rigwild) (1 comment)
* [@robertkiel](https://github.com/robertkiel) (6 commits, 6 PRs, 1 comment)
* [@rvagg](https://github.com/rvagg) (1 PR, 7 comments)
* [@SahidMiller](https://github.com/SahidMiller) (1 comment)
* [@sbhamad](https://github.com/sbhamad) (1 issue)
* [@Schwartz10](https://github.com/Schwartz10) (1 comment)
* [@sebastiendan](https://github.com/sebastiendan) (2 issues, 9 comments)
* [@SignpostMarv](https://github.com/SignpostMarv) (2 issues, 2 comments)
* [@siman](https://github.com/siman) (2 comments)
* [@sinkuu](https://github.com/sinkuu) (1 comment)
* [@stale](undefined) (1 comment)
* [@Stebalien](https://github.com/Stebalien) (2 commits, 2 PRs, 1 issue, 9 comments)
* [@svdo](https://github.com/svdo) (1 PR, 1 comment)
* [@tabcat](https://github.com/tabcat) (2 commits, 2 PRs, 1 issue)
* [@tniessen](https://github.com/tniessen) (1 issue)
* [@tuyennhv](https://github.com/tuyennhv) (1 PR, 1 comment)
* [@uchetron](https://github.com/uchetron) (1 issue)
* [@ulvus](https://github.com/ulvus) (1 comment)
* [@vasco-santos](https://github.com/vasco-santos) (72 commits, 17 PRs, 17 issues, 78 comments)
* [@vaultec81](https://github.com/vaultec81) (2 issues, 10 comments)
* [@vmx](https://github.com/vmx) (12 commits, 9 PRs, 11 comments)
* [@warpfork](https://github.com/warpfork) (1 comment)
* [@wemeetagain](https://github.com/wemeetagain) (1 commit, 1 comment)
* [@whyrusleeping](https://github.com/whyrusleeping) (1 comment)
* [@wolfgang](https://github.com/wolfgang) (1 comment)
* [@woss](https://github.com/woss) (1 comment)
* [@x5engine](https://github.com/x5engine) (1 comment)
* [@Xmader](https://github.com/Xmader) (1 commit, 1 PR)
* [@xmaysonnave](https://github.com/xmaysonnave) (1 issue, 1 comment)
* [@zebateira](https://github.com/zebateira) (1 PR)
* [@zot](https://github.com/zot) (1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don’t know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-ipfs repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute: https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at https://discuss.ipfs.io/ and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works, and what you can do with it is at [discuss.ipfs.io](https://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.

[UnixFS]: https://docs.ipfs.io/guides/concepts/unixfs/
[CID]: https://docs.ipfs.io/guides/concepts/cid/
[MFS]: https://docs.ipfs.io/guides/concepts/mfs/
