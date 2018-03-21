---
date: 2018-03-21
url: 34-go-ipfs-0.4.14
title: go-ipfs 0.4.14 released
author: Victor Bjelkholm
---

[go-ipfs 0.4.14](https://dist.ipfs.io/#go-ipfs) has been released today. Not
only have we improved memory and CPU usage but we also managed to fix a lot of
bugs, ship a major improvement to IPNS performance and lots of refactoring! \o/

- [Refactoring](#refactoring)
- [IPNS Improvements](#ipns-improvements)
- [Resource Usage Improvements](#resource-usage-improvements)
- [IPFS Core API](#ipfs-core-api)
- [Note Regarding Insecure Hash Functions](#note-regarding-insecure-hash-functions)

# Refactoring

The release took longer than expected due to our refactoring and extracting of
our [commands library](https://github.com/ipfs/go-ipfs-cmds). This refactor had
two stages. The first round of the refactor disentangled the commands code from
core go-ipfs code, allowing us to move it out into a separate repository. The
code was previously very entangled with the go-ipfs codebase and not usable for
other projects. The second round of the refactor had the goal of fixing several
major issues around streaming outputs, progress bars, and error handling. It
also paved the way for us to more easily provide an API over other transports,
such as websockets and unix domain sockets.  It took a while to flush out all
the kinks on such a massive change. We're pretty sure we've got most of them,
but if you notice anything weird,
[please let us know](https://github.com/ipfs/go-ipfs/issues/new).

# IPNS Improvements

Beyond that, we've added a new experimental way to use IPNS. With the new
pubsub IPNS resolver and publisher, you can subscribe to updates of an IPNS
entry, and the owner can publish out changes in real time. With this, IPNS can
become nearly instantaneous. To make use of this, simply start your go-ipfs
daemon with the `--enable-namesys-pubsub` option, and all IPNS resolution and
publishing will use pubsub. Note that resolving an IPNS name via pubsub without
someone publishing it via pubsub will result in a fallback to using the DHT.
Please give this a try and let us know how it goes!

# Resource Usage Improvements

Memory and CPU usage should see a noticeable improvement in this release. We
have spent considerable time fixing excess memory usage throughout the codebase
and down into go-libp2p. Fixes in peer tracking, bitswap allocation, pinning,
and many other places have brought down both peak and average memory usage. An
upgraded hashing library, base58 encoding library, and improved allocation
patterns all contribute to overall lower CPU usage across the board.

# IPFS Core API

This release also brings the beginning of the go-ipfs 'Core API'. Once
finished, the Core API will be the primary way to interact with go-ipfs using
go. Both embedded nodes and nodes accessed over the HTTP API will have the same
interface.  Stay tuned for future updates and documentation.

# Note Regarding Insecure Hash Functions

This release of go-ipfs disallows the usage of insecure hash functions and
lengths.  go-ipfs does not create these insecure objects for any purpose, but
it did allow manually creating them and fetching them from other peers. If you
currently have objects using insecure hashes in your local go-ipfs repo, please
remove them before updating.

# Full Changelog

As always, you can find the full changelog over at ipfs/go-ipfs's Github
repository:
https://github.com/ipfs/go-ipfs/blob/master/CHANGELOG.md#0414-2018-03-02
