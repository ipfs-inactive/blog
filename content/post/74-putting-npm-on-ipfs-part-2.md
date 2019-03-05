---
date: 2019-03-04
title: Putting npm on IPFS Part 2 - The Client
author: Alex Potsides
---

In [Putting npm on IPFS Part 1 - The Registry]((/post/70-putting-npm-on-ipfs-part-1)) we looked at [registry.js.ipfs.io](https://registry.js.ipfs.io) - a mirror of the npm registry that adds [CID](https://docs.ipfs.io/guides/concepts/cid)s to package metadata and uses IPFS to fetch tarballs using IPFS.

Using the registry in this way works, but it still depends on HTTP and DNS to resolve your dependencies. So far so centralised.

What if there was a way to skip that bit and have it be distributed-web-turtles all the way down?

You would be able to speedily fetch dependencies from local peers, save hard drive space with a de-duplicated local data store, save on bandwidth costs and increase your resilience by not relying on central services!

** drumroll **

## 🙌 Introducing ipfs-npm

![npm on IPFS](https://github.com/ipfs-shipyard/npm-on-ipfs/raw/master/img/npm-on-ipfs.jpg)

[`ipfs-npm`](https://www.npmjs.com/package/ipfs-npm) is a command line tool that spins up an IPFS node and uses that to resolve the tarballs that make up your project's dependencies ([other configurations are available](https://www.npmjs.com/package/ipfs-npm#cli)). It works with npm and Yarn, and will add your dependencies to the [IPFS Repository](https://github.com/ipfs/specs/tree/master/repo) of your node so you can resolve them offline later on.

### 🚚 Installation

You can install it with:

```console
$ npm install -g ipfs-npm
```

### 🔧 Usage

`ipfs-npm` proxies for the npm cli, passing all arguments on, so use it as you would npm, just with a different command name:

```console
$ cd my-project
$ ipfs-npm install
👿 Spawning an in-process IPFS node using repo at /Users/alex/.jsipfs
Swarm listening on /ip4/127.0.0.1/tcp/57029/ipfs/QmZ7vEvXRdTVipb9o2p2Cmt3s1S8rqbo2ohscTjvTLgnpP
🗂️ Loading registry index from https://registry.js.ipfs.io
☎️ Dialling registry mirror /ip4/35.178.192.119/tcp/10015/ipfs/QmWBaYSnmgZi6F6D69JuZGhyL8rm6pt8GX5r7Atc6Gd7vR,/dns4/registry.js.ipfs.io/tcp/10015/ipfs/QmWBaYSnmgZi6F6D69JuZGhyL8rm6pt8GX5r7Atc6Gd7vR
📱️ Connected to registry
👩‍🚀 Starting local proxy
🚀 Server running on port 37847
🎁 Installing dependencies with /Users/alex/.nvm/versions/node/v10.15.1/bin/npm
...
```

If you prefer Yarn and have it installed globally, use the `ipfs-yarn` command (installed alongside `ipfs-npm`):

```console
$ cd my-project
$ ipfs-yarn
👿 Spawning an in-process IPFS node using repo at /Users/alex/.jsipfs
Swarm listening on /ip4/127.0.0.1/tcp/49905/ipfs/QmZ7vEvXRdTVipb9o2p2Cmt3s1S8rqbo2ohscTjvTLgnpP
🗂️  Loading registry index from https://registry.js.ipfs.io
☎️  Dialling registry mirror /ip4/35.178.192.119/tcp/10040/ipfs/QmfKqxieE71QoAchNk5e2MKmvWKjGdUnSifHqq1xZLEzyn,/dns4/registry.js.ipfs.io/tcp/10040/ipfs/QmfKqxieE71QoAchNk5e2MKmvWKjGdUnSifHqq1xZLEzyn
📱️ Connected to registry
👩‍🚀 Starting local proxy
🚀 Server running on port 49935
🎁 Installing dependencies with /Users/alex/.nvm/versions/node/v10.15.1/bin/yarn
yarn install v1.13.0
...
```

## 🙋 How does it work?

Behind the scenes `ipfs-npm` first starts a local http server and configures npm/Yarn to use it as the registry.  When a module's [packument](https://github.com/zkat/pacote/tree/33c53cf10b080e78182bccc56ec1d5126f8b627e#packument) is requested, it uses the same package metadata as [registry.js.ipfs.io](https://registry.js.ipfs.io) to satisfy the request, also checking with the central registry for any updated versions and including them if available.

`npm`/`yarn` uses the package metadata to select a tarball to request that satisfies the [semver](https://semver.org/) range in the developer's `package.json` for the dependency. Once the tarball request is recieved, it uses the requested URL to look up the relevant CID in the module's metadata - if a CID is present, it uses IPFS to request the content, otherwise it downloads it from the public npm registry, adds it to IPFS and stores the CID for the next time it's requested.

You can use `ipfs-npm` with an existing IPFS node running on your computer or remotely, or fall back to the default configuration which is to run an IPFS node for the duration of the install.

![Request sequence](/74-putting-npm-on-ipfs-part-2/ipfs-npm-sequence.png)

If this sounds familiar it may be because you've just read [part 1](/post/73-putting-npm-on-ipfs-part-1) - indeed it's the exact same code fulfilling the exact same function, just locally on your computer instead of on a server somewhere.

The http server is necessary because at the time of writing neither npm or Yarn support IPFS as a transport - hopefully one day this won't be necessary but as it stands no http traffic leaves your machine, unless you request modules that don't have CIDs in their metadata.

It also dials the ipfs-npm-registry-mirror directly to improve the speed of content resolution - this is partly because we know that the mirror will have the content we are after but also because there is no [DHT](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/Distributed_hash_table.html) in js-IPFS (yet - it's coming!) so discovery would have to occur via the gateway nodes.

## 🎁 What's next?

So many things!

* We'd love (love!) to get IPFS into npm and Yarn as a first-class transport option
* Once the DHT is enabled in js-ipfs v0.35.0 we'll not need to contact the npm mirror so a point of failure will be removed and startup will be faster
* How about a service you can run on on your local network to further speed up package resolution with no need to get onto the Internet?

Publishing? Identity? The posibilities are endless - if you'd like to help out please visit [ipfs-shipyard/npm-on-ipfs](https://github.com/ipfs-shipyard/npm-on-ipfs).
