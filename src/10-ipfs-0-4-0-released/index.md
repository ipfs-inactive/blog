---
date: 2016-01-10
id: 10-ipfs-0-4-0-released
template: tmpl/layouts/post.html
baseurl: ..
breadcrumbs:
  - {name: "10-ipfs-0-4-0-released", link: "./" }
tags: modules
title: IPFS 0.4.0 has been released
author: Kyle Drake
collection: posts
---

[IPFS 0.4.0](https://github.com/ipfs/go-ipfs/releases/tag/v0.4.0) has been released! Among the many changes are a revamped implementation of the IPFS communication protocols, increased performance, improvements to IPNS, many bugfixes, and a couple new features to make IPFS even more powerful.

### On Breaking Changes

This is a **breaking change** release, with a major refactor and upgrade to the IPFS networking protocol. Because of the refactor, **all IPFS daemons earlier than 0.4.0 will not be able to communicate with the newest version**. It is strongly recommended that everyone running an IPFS node upgrades to the latest version as soon as possible, as these nodes will, after a certain time, no longer be able to communicate with the majority of the network until they are upgraded.

Refactoring the protocol is not something to be done lightly. But at this early stage, this is necessary to ensure we have the right design for IPFS in place for the future. It's better to improve the protocol now during this alpha stage of the project than when there are a lot more people running nodes across a lot of different implementations.

One of the important changes that's been made to the protocol means that *there should never be a breaking change like this again*. This is due to a change to allow nodes to announce the version of the protocol they are using when connecting to other IPFS nodes. The goal is to roll any future protocol changes into the implementations gradually, so that we can still support legacy protocols for a period of time, making it easier to deprecate old versions over time.

## Why we're changing the protocol

The most important change was to allow IPFS implementations to use pluggable stream multiplexers, such as [yamux](https://github.com/hashicorp/yamux), [spdystream](https://github.com/docker/spdystream), or [muxado](https://github.com/inconshreveable/muxado). Instead of locking IPFS permanently into a single multiplexer that won't work for every language or situation, this change allows the implementations to implement the multiplexers of their choosing.

This modularity with stream muxing makes it easier for certain languages to improve performance. For example, the Go programming language may have muxado and yamux implementations that are really good, but many languages lack good (or any) implementations of them. For example, Node.js works well with spdystream in testing, and it would be nice to take advantage of that. And then there are options like 'multiplex', which may not have the same performance, but are much easier to implement.

So by supporting as many muxers as we can, we get to choose the best multiplexers for the job. It also makes it much easier to implement the IPFS protocols in a new language. And of course, if a better multiplexers standard comes along, it will be easier to upgrade IPFS to support it in the future.

In addition to the multiplexers changes, the protocol revamp has also improved efficiency and performance in a few important ways, including the elimination of a double wrapping of the length prefixer, and the removal of some unneccessary round trips between nodes.

The way object pinning (`ipfs pin add`) works has also been upgraded to be much more efficient, which will improve the overall speed of adding and downloading IPFS data.

## Other improvements, fixes

In addition to a major protocol improvement and upgrade, this release adds a lot of new functionality, performance speedups, and stability fixes that make this the best version of IPFS to date.

This release also includes improvements to IPNS, the IPFS way to do mutable data. IPNS uses keypair encryption to allow users to point a pubkeyhash to an ipfs object in a way that is crytographically verifiable. By allowing users to change what the pubkeyhash points to, this provides users with a single hash they can give to users to get the latest version of their data. This creates a seamless way to use IPFS to verify content, and to distribute content via trustless nodes in a smart, safe way. This brings IPFS closer to the goal of being a global filesystem of data, that can allow everyone in the world to help serve the world's data in a way that enriches and empowers everyone.

So please upgrade your IPFS nodes as soon as you can, so you can take advantage of the improvements!
