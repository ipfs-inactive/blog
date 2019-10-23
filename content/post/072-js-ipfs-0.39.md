---
date: 2019-10-23
url: 071-js-ipfs-0-39
title: js-ipfs 0.39.0 released
author: Alex Potsides
---

> Configure your node with preset profiles! Limit outgoing browser requests! Start your node from fresh with one command!

```console
$ npm install -g ipfs
```

# 🔦 Highlights

> Config profiles, no more request floods in the browser, init and start the daemon in one command, remove blocks over the HTTP API

## 📋 Config profiles

IPFS now supports the `jsipfs config profile` subcommand which you can use to update your configuration with certain presets suited for different use cases:

```console
$ jsipfs config profile ls
server:
 Recommended for nodes with public IPv4 address (servers, VPSes, etc.), disables host and content discovery in local networks.
local-discovery:
 Sets default values to fields affected by `server` profile, enables discovery in local networks.
test:
 Reduces external interference, useful for running ipfs in test environments. Note that with these settings node won't be able to talk to the rest of the network without manual bootstrap.
default-networking:
 Restores default network settings. Inverse profile of the `test` profile.
lowpower:
 Reduces daemon overhead on the system. May affect node functionality, performance of content discovery and data fetching may be degraded. Recommended for low power systems.
default-power:
 Inverse of "lowpower" profile.
 ```

 Apply them with `jsipfs config profile apply`:

 ```console
$ jsipfs config profile apply lowpower
... output shows the difference between the old config and the new
 ```

You may need to restart your daemon for changes to take effect.

Profiles can also be applied on init:

```console
$ jsipfs init --profile server
```

Or when starting the daemon (more on that in the 'Init and start' section below):

```console
$ jsipfs daemon --init-profile server
```

## 🌐 Concurrent HTTP requests limited in the browser

Interacting with IPFS can cause a lot of preloading and other background requests to be made - most browsers can only hae so many requests in flight at once so this can cause actual API calls to take time as their generated request wait their turn to be processed.

As of `ipfs@0.39.0`, the concurrency of background requests are limited to always ensure there are connections available to speedily process the API requests made by users.

## 🌅 Init and start your daemon in one command

When a new user first starts up the IPFS daemon they've been greeted by an unfriendly message telling them to `init` it first.

No longer!  Now on first startup, the daemon will auto-init it's repo removing a tiny bit of friction from getting on to the distributed web.

## 🚯 `block rm` now supported over the HTTP API

Previously this command only worked with the daemon turned off, now you can use the semi-internal `jsipfs block rm` command with the daemon running.

N.b. it's rare that you would need to use this command, a more common approach would be to call `jsipfs gc` instead which removes all non-pinned blocks from your IPFS repo.

# 🏗 API Changes

* [`ipfs.config.profiles.list([options])`](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/CONFIG.md#configprofileslist) has been added
* [`ipfs.config.profiles.apply(name, [options])`](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/CONFIG.md#configprofilesapply) has been added
* [`ipfs.block.rm(cid, [options])`](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/BLOCK.md#blockrm) now works over the HTTP API

# ❤️ Huge thank you to everyone that made this release possible

By alphabetical order, here are all the humans that contributed to the release:

* [@achingbrain](https://github.com/achingbrain) (73 commits, 23 PRs, 4 issues, 64 comments)
* [@alanshaw](https://github.com/alanshaw) (2 PRs, 1 issue, 14 comments)
* [@alx696](https://github.com/alx696) (1 issue, 1 comment)
* [@aschmahmann](https://github.com/aschmahmann) (1 issue)
* [@AuHau](https://github.com/AuHau) (6 commits, 6 PRs, 1 issue, 10 comments)
* [@autonome](https://github.com/autonome) (2 comments)
* [@betamos](https://github.com/betamos) (1 commit, 1 PR, 1 comment)
* [@csuwildcat](https://github.com/csuwildcat) (1 commit, 1 PR)
* [@cwaring](https://github.com/cwaring) (2 comments)
* [@daviddias](https://github.com/daviddias) (2 commits, 1 PR, 3 issues, 50 comments)
* [@dirkmc](https://github.com/dirkmc) (1 commit)
* [@guoliu](https://github.com/guoliu) (1 issue, 1 comment)
* [@hacdias](https://github.com/hacdias) (2 commits, 1 PR, 1 comment)
* [@hazae41](https://github.com/hazae41) (1 comment)
* [@hugomrdias](https://github.com/hugomrdias) (8 commits, 10 PRs, 1 issue, 16 comments)
* [@iiska](https://github.com/iiska) (1 commit, 1 PR)
* [@its-VSP](https://github.com/its-VSP) (1 comment)
* [@jacobheun](https://github.com/jacobheun) (2 commits, 4 PRs, 2 issues, 14 comments)
* [@javaadpatel](https://github.com/javaadpatel) (1 issue)
* [@kpp](https://github.com/kpp) (2 issues, 3 comments)
* [@lidel](https://github.com/lidel) (1 commit)
* [@mikeal](https://github.com/mikeal) (9 comments)
* [@mkg20001](https://github.com/mkg20001) (2 comments)
* [@momack2](https://github.com/momack2) (1 comment)
* [@npfoss](https://github.com/npfoss) (2 issues, 5 comments)
* [@oed](https://github.com/oed) (2 issues, 3 comments)
* [@orpheus](https://github.com/orpheus) (2 comments)
* [@pashoo2](https://github.com/pashoo2) (2 issues, 1 comment)
* [@PedroMiguelSS](https://github.com/PedroMiguelSS) (1 commit, 3 PRs)
* [@prayaglehana](https://github.com/prayaglehana) (2 comments)
* [@ptoner](https://github.com/ptoner) (3 comments)
* [@reasv](https://github.com/reasv) (1 issue, 5 comments)
* [@rumkin](https://github.com/rumkin) (1 issue)
* [@tapaswenipathak](https://github.com/tapaswenipathak) (3 comments)
* [@vasco-santos](https://github.com/vasco-santos) (9 commits, 1 PR, 9 comments)
* [@vaultec81](https://github.com/vaultec81) (1 issue, 2 comments)
* [@vincepmartin](https://github.com/vincepmartin) (1 commit, 1 PR, 1 issue, 4 comments)
* [@vmx](https://github.com/vmx) (5 comments)
* [@yehia67](https://github.com/yehia67) (1 comment)
* [@Ziwei-Wei](https://github.com/Ziwei-Wei) (1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-ipfs repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
