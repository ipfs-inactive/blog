---
date: 2021-02-03
url: /2021-02-03-js-ipfs-0-54/
title: js-IPFS 0.54.0 brings UPnP NAT Hole Punching to your js-IPFS node
header_image: js-ipfs-placeholder.png
author: Alex Potsides
---

# 🔦 Highlights

> NAT UPnP Hole Punching

`js-IPFS@0.54.0` enables NAT traversal with UPnP enabled routers for improved connectivity, but also requires a repo upgrade in the browser

## ↔️ NAT UPnP Hole Punching

When you run an IPFS node on your home network you are commonly behind a [NAT](https://en.wikipedia.org/wiki/Network_address_translation) firewall. These types of firewalls are commonly used on home networks to work around the [shortage of IPv4 addresses](https://en.wikipedia.org/wiki/IPv4_address_exhaustion) in the world.

Normally, it’s not possible for computers external to your network to make connections to your node when this sort of infrastructure is between you and the remote computer. It’s essential for external computers to be able to connect to your computer when using IPFS, otherwise there is no way for remote nodes to fetch content stored on your node.

This problem is not unique to IPFS, it also extends to any P2P network and a lot of online games. Thankfully there is a solution: if your router supported [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play) and you have it enabled, a process on your computer can communicate with the router and ask it to open an external port and forward all traffic sent to that port to your machine. Once the port has been opened, we are then free to inform our connected peers that they can open connections on this external port as and when required via the [libp2p identify protocol](https://github.com/libp2p/specs/tree/master/identify).

js-IPFS@0.54.0 enables UPnP NAT hole punching by default, but it will only work if UPnP is enabled on your router; instructions for enabling this will vary by manufacturer so please see your router’s documentation for more information on how to enable.

If everything works as expected, you should start to see externally addressable multiaddrs in the output of `jsipfs id` a short time after daemon startup without any extra configuration:

```console
$ jsipfs id
{
  "id": "QmT2aN...",
  "publicKey": "CAASpgIwggEiMA0...",
  "addresses": [
    "/ip4/127.0.0.1/tcp/4002/p2p/QmT2aN...",
    "/ip4/127.0.0.1/tcp/4003/ws/p2p/QmT2aN...",
    "/ip4/192.168.2.50/tcp/4002/p2p/QmT2aN...",
    "/ip4/81.132.237.123/tcp/55170/p2p/QmT2aN..."  // <-- externally addressable!
  ],
  // ...other fields here
}
```

If you do not wish to enable hole punching, you can set the [Swarm.DisableNatPortMap](https://github.com/ipfs/js-ipfs/blob/master/docs/CONFIG.md#disablenatportmap) config key to `true`:

```console
$ jsipfs config --json Swarm.DisableNatPortMap true
```

## level-js upgrade

`js-IPFS@0.54.0` uses the latest version of level-js in the browser. `level-js@4.x.x` and below support storing keys as either `string`s or `Uint8Array`s, but `level-js@5.x.x` only supports Uint8Arrays in line with `leveldown` on Node.js.

This means a database migration will be necessary for those running js-IPFS in the browser (Node.js is unaffected).

This migration should take place automatically the first time you load `js-IPFS@0.54.0` on a web page that has previously used `js-IPFS@0.53.0` and below.

You can disable this feature by passing [`repoAutoMigrate: false`](https://github.com/ipfs/js-ipfs/blob/master/docs/MODULE.md#optionsrepoautomigrate) to the IPFS constructor:

```js
const node = await IPFS.create({
  repoAutoMigrate: false
})
```

Though if you do this, you should give your users some way of upgrading because `level-js@5.x.x` cannot see any database keys that are not `Uint8Array`s.

# ✨New features

* enable upnp nat hole punching ([#3426](https://github.com/ipfs/js-ipfs/pull/3426))
* support remote pinning services in ipfs-http-client ([#3293](https://github.com/ipfs/js-ipfs/issues/3293)) ([ba240fd](https://github.com/ipfs/js-ipfs/commit/ba240fdf93edc88028315483240d7822a7ca88ed))

## 🔨 Breaking changes

* ipfs-repo upgrade requires repo migration to v10 in the browser

## 🕷️ Bug fixes

* updates webpack example to use v5 ([#3512](https://github.com/ipfs/js-ipfs/issues/3512)) ([c7110db](https://github.com/ipfs/js-ipfs/commit/c7110db71b5c0f0f9f415f31f91b5b228341e13e)), closes [#3511](https://github.com/ipfs/js-ipfs/issues/3511)
* issue with isolateModules flag ([#3495](https://github.com/ipfs/js-ipfs/pull/3495))
* use https agent for https requests ([#3490](https://github.com/ipfs/js-ipfs/pull/3490))
* update deps ([#3514](https://github.com/ipfs/js-ipfs/issues/3514)) ([061d77c](https://github.com/ipfs/js-ipfs/commit/061d77cc03f40af5a3bc3590481e1e5836e7f0d8))
* document the ipfs http client constructor arguments ([#3478](https://github.com/ipfs/js-ipfs/pull/3478))

# 🗺️ What’s next?

Check out the js-IPFS [Project Roadmap](https://github.com/orgs/ipfs/projects/6) which contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

* [@achingbrain](https://github.com/achingbrain) (60 commits, 24 PRs, 1 issue, 44 comments)
* [@acolytec3](https://github.com/acolytec3) (1 comment)
* [@acostalima](https://github.com/acostalima) (2 PRs, 5 comments)
* [@andrew](https://github.com/andrew) (1 PR)
* [@aphelionz](https://github.com/aphelionz) (1 comment)
* [@cndolo](https://github.com/cndolo) (1 comment)
* [@codecov-io](https://github.com/codecov-io) (1 comment)
* [@CSDUMMI](https://github.com/CSDUMMI) (1 issue)
* [@david0178418](https://github.com/david0178418) (1 comment)
* [@ericspt](https://github.com/ericspt) (1 issue)
* [@FledgeXu](https://github.com/FledgeXu) (1 issue)
* [@geolffreym](https://github.com/geolffreym) (1 issue, 1 comment)
* [@Gozala](https://github.com/Gozala) (2 commits, 1 PR, 1 issue, 9 comments)
* [@HexaField](https://github.com/HexaField) (1 comment)
* [@hueimin426](https://github.com/hueimin426) (1 comment)
* [@hugomrdias](https://github.com/hugomrdias) (11 commits, 5 PRs, 1 issue, 16 comments)
* [@icidasset](https://github.com/icidasset) (1 PR, 7 comments)
* [@ikreymer](https://github.com/ikreymer) (2 comments)
* [@jacobheun](https://github.com/jacobheun) (2 commits, 7 comments)
* [@julien51](https://github.com/julien51) (1 comment)
* [@lacker](https://github.com/lacker) (1 commit, 1 PR, 1 issue, 3 comments)
* [@lidel](https://github.com/lidel) (1 commit, 1 PR, 4 comments)
* [@mburns](https://github.com/mburns) (1 commit)
* [@mtiger2k](https://github.com/mtiger2k) (2 comments)
* [@pestopancake](https://github.com/pestopancake) (1 issue)
* [@raphael10-collab](https://github.com/raphael10-collab) (7 issues, 12 comments)
* [@rob-deutsch](https://github.com/rob-deutsch) (1 PR)
* [@robertkiel](https://github.com/robertkiel) (1 issue)
* [@samlior](https://github.com/samlior) (1 commit, 1 PR, 2 comments)
* [@stale](undefined) (2 comments)
* [@tymmesyde](https://github.com/tymmesyde) (1 PR, 2 issues)
* [@valmack](https://github.com/valmack) (1 issue, 2 comments)
* [@vasco-santos](https://github.com/vasco-santos) (50 commits, 13 PRs, 2 issues, 36 comments)
* [@vmx](https://github.com/vmx) (3 comments)
* [@vogdb](https://github.com/vogdb) (1 PR, 1 issue, 4 comments)
* [@wemeetagain](https://github.com/wemeetagain) (1 issue)
* [@whydna](https://github.com/whydna) (1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don’t know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-IPFS repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join the discussion at https://discuss.ipfs.io/ and help users find their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works, and what you can do with it is at [discuss.ipfs.io](https://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.

[UnixFS]: https://docs.ipfs.io/guides/concepts/unixfs/
[CID]: https://docs.ipfs.io/guides/concepts/cid/
[MFS]: https://docs.ipfs.io/guides/concepts/mfs/
[libp2p]: https://github.com/libp2p/js-libp2p
[ipld]: https://github.com/ipld/js-ipld
[AbortSignal]: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
[Multihash]: https://multiformats.io/multihash
[DHT]: https://docs.ipfs.io/concepts/dht/
[Multiaddr]: https://multiformats.io/multiaddr/
[DAG]: https://docs.ipfs.io/concepts/merkle-dag/
[Core-API]: https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
[gRPC]: https://en.wikipedia.org/wiki/GRPC
[gRPC-web]: https://github.com/grpc/grpc-web
[TLS]: https://en.wikipedia.org/wiki/Transport_Layer_Security
