---
date: 2021-01-19
url: /2021-01-19-js-ipfs-0-50/
title: js-IPFS 0.53.0 arrives with experimental gRPC server and libp2p-0.30.x
header_image: js-ipfs-placeholder.png
author: Alex Potsides
---

# 🔦 Highlights

> full-duplex streaming browser APIs and the latest libp2p

`js-IPFS@0.53.0` has launched into the stratosphere with an experimental [gRPC][]-over-websockets server that means the http client has true full-duplex streaming for the `ipfs.add` API

## ↔️ gRPC over websockets

In the beginning, `go-IPFS` shipped with an [HTTP API](https://docs.ipfs.io/reference/http/api/), which `js-IPFS` [also implemented](https://www.npmjs.com/package/ipfs-http-server) with the aim of being cross-compatible.

This HTTP API allows you to orchestrate a locally running node from a language or environment that may not be able to run a fully-fledged IPFS node, or it may be preferable to have a single system-wide node shared between multiple applications.

The `go-IPFS` HTTP API supports streaming responses, and returns the message from any error that occurs during a streaming response as an [HTTP trailer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Trailer).

When the request is made from the browser or from node via the [node-fetch](https://www.npmjs.com/package/node-fetch) module, HTTP trailers are [not available](https://github.com/whatwg/fetch/issues/34). Bugs are open against [FireFox](https://bugzilla.mozilla.org/show_bug.cgi?id=1339096) and [Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=691599) to address this but they are unlikely to be fixed in any reasonable time frame, partially due to a [security concern](https://github.com/whatwg/fetch/issues/34#issuecomment-118927355) around allowing trailers to change the status of a response after that response has been sent.

The effect of all this is that if you are reading a streaming response from the server, and an error occurs on the server, from the client’s point of view the stream [just stops](https://github.com/ipfs/js-ipfs/issues/2519) with no error message, which is less than ideal.

That’s the response end, from the request end, we’d like to be able to send requests of arbitrary length and start processing the response before the request has finished sending (think pubsub, or giving the user server-driven progress notifications when adding large or multiple files).

The Fetch API allows for sending request bodies as [WhatWG ReadableStreams](https://streams.spec.whatwg.org/) but [no browser currently supports this](https://developer.mozilla.org/en-US/docs/Web/API/Request#browser_compatibility) (Chrome recently announced an [intent to ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/mNVaRrvBZG0/m/lOezCQV_CwAJ) this feature which is great news, but FireFox so far has made [little progress](https://bugzilla.mozilla.org/show_bug.cgi?id=1387483) so we’re not there yet).

If ever implemented widely, this will allow us to stream uploads and downloads, but there’s no guarantee it’ll be [full-duplex](https://github.com/whatwg/fetch/issues/229) (e.g., both ends streaming at the same time).

HTTP/2 supports full-duplex streaming, but [currently](https://caniuse.com/http2) it requires [ALPN](https://en.wikipedia.org/wiki/Application-Layer_Protocol_Negotiation), which requires [TLS][], which requires certificates, which is overkill if you’re only communicating over the loopback interface.

Where does this leave us?

We want full-duplex streaming over the API; we want the safety of typed inputs and outputs.

[gRPC][] gives us the typing, (yay!) and there is [gRPC-web][] which is designed to work over HTTP, but it does not support bi-directional streaming, and while there are [plans afoot](https://github.com/grpc/grpc-web/blob/master/doc/streaming-roadmap.md#full-duplex-streaming-over-http), there is nothing we can use today.

There is a way we can do bi-directional, full-duplex streaming today: [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

The [gRPC-web][] team have [no plans](https://github.com/grpc/grpc-web/blob/master/doc/streaming-roadmap.md#issues-with-websockets) to publish even an experimental spec for gRPC-web-over-websockets due to concerns about compatibility with existing HTTP infrastructure - proxies and the like, all of which are not relevant to our use-case.

The engineering team at [improbable.io](https://improbable.io/) have published a golang implementation of [gRPC-web][] that wraps a [gRPC][] server but also provides a [websocket transport](https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy#enabling-websocket-transport) with HTTP fallback.

`js-IPFS@0.53.0` ships with a [JavaScript port](https://www.npmjs.com/package/ipfs-grpc-server) of this [gRPC-web][]-over-websockets server. Phew!

To use it we’ve shipped a new client called [ipfs-client](https://www.npmjs.com/package/ipfs-client) (hat tip to [@brosenan](https://github.com/brosenan) for very kindly donating the module name) - a fully [Core API](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api) compatible client. It combines the [ipfs-http-client](https://www.npmjs.com/package/ipfs-http-client) and the new [ipfs-grpc-client](https://www.npmjs.com/package/ipfs-grpc-client), using [gRPC][] for implemented methods and falling back to HTTP for methods that have not been ported to [gRPC][] yet.

```js
const createClient = require('ipfs-client')

const client = createClient({
  grpc: '/ipv4/127.0.0.1/tcp/5003/ws',
  http: '/ipv4/127.0.0.1/tcp/5002/http'
})

const id = await client.id()
```

A few caveats:

1. This only works against `js-IPFS` for now
2. It only works over the loopback address (not `localhost`) as loopback is considered a [secure context](https://w3c.github.io/webappsec-secure-contexts/), otherwise it would require [TLS][]
3. Only the `ipfs.add` API has full-duplex streaming enabled for this release - expect a lot more in future!

There’s a new example called [ipfs-client-add-files](https://github.com/ipfs/js-ipfs/tree/master/examples/ipfs-client-add-files) that you can use as a sandbox to experiment with this new client.

If you fire it up, you’ll see progress and file import events appearing before the upload request has completed, something that’s not been possible with the `ipfs-http-client` until now.

What’s next? We’re going to extend the [gRPC][] implementation to all streaming methods and get a server into `go-IPFS` so you can use the same client with that implementation too.

The full-duplex streaming capability opens up all sorts of interesting possibilities, for example, opening up the full libp2p API over HTTP instead of the limited subset that we currently support.

Speaking of libp2p:

## ☎️ libp2p@0.30.x

The `0.53.0` release of `js-IPFS` ships with `libp2p@0.30.x` which gives us TypeScript type definitions, Auto Relay support, and
improved Peer advertising and dialer mechanics.

Expect a blog post here soon with a deep dive, but in the mean time see the [libp2p@0.30.x release notes](https://github.com/libp2p/js-libp2p/releases/tag/v0.30.0) for more details.

# ✨New features

* add grpc server and client ([#3403](https://github.com/ipfs/js-ipfs/issues/3403)) ([a9027e0](https://github.com/ipfs/js-ipfs/commit/a9027e0ec0cea9a4f34b4f2f52e09abb35237384)), closes [#2519](https://github.com/ipfs/js-ipfs/issues/2519) [#2838](https://github.com/ipfs/js-ipfs/issues/2838) [#2943](https://github.com/ipfs/js-ipfs/issues/2943) [#2854](https://github.com/ipfs/js-ipfs/issues/2854) [#2864](https://github.com/ipfs/js-ipfs/issues/2864)
* allow passing a http.Agent to ipfs-http-client in node ([#3474](https://github.com/ipfs/js-ipfs/issues/3474)) ([fe93ba0](https://github.com/ipfs/js-ipfs/commit/fe93ba01a0c62cead7cc4e0023de2d2a00adbc02)), closes [/tools.ietf.org/html/rfc2616#section-8](https://github.com//tools.ietf.org/html/rfc2616/issues/section-8) [#3464](https://github.com/ipfs/js-ipfs/issues/3464)
* allow passing a http.Agent to the grpc client ([#3477](https://github.com/ipfs/js-ipfs/issues/3477)) ([c5f0bc5](https://github.com/ipfs/js-ipfs/commit/c5f0bc5eeee15369b7d02901035b04184a8608d2)), closes [#3474](https://github.com/ipfs/js-ipfs/issues/3474)
* update libp2p to 0.30 ([#3427](https://github.com/ipfs/js-ipfs/issues/3427)) ([a39e6fb](https://github.com/ipfs/js-ipfs/commit/a39e6fb372bf9e7782462b6a4b7530a3f8c9b3f1))

## 🔨 Breaking changes

* The websocket transport will only dial DNS+WSS addresses - see https://github.com/libp2p/js-libp2p-websockets/releases/tag/v0.15.0

## 🕷️ Bug fixes

* files ls should return string ([#3352](https://github.com/ipfs/js-ipfs/pull/3352)) ([16ecc74](https://github.com/ipfs/js-ipfs/commit/16ecc7485dfbb1f0c827c5f804974bb804f3dafd))
* fixes "interface-ipfs-core" link ([#3334](https://github.com/ipfs/js-ipfs/pull/3334)) ([3e7e222](https://github.com/ipfs/js-ipfs/commit/3e7e22239e334705acd665408e77c84e65da2b32))
* packages/ipfs-core/src/index.js attempts to export undefined Buffer ([#3312](https://github.com/ipfs/js-ipfs/issues/3312)) ([5cc6dfe](https://github.com/ipfs/js-ipfs/commit/5cc6dfebf96ad9509e7ded175291789e32402eec))
* HTTP client factory: Invalid URL in React Navtive ([#3331](https://github.com/ipfs/js-ipfs/issues/3331)) ([4eb196c](https://github.com/ipfs/js-ipfs/commit/4eb196c07129d0ee90a7ad55feca69b6b349d8b7))
* Invalid version error triggered in cli pin add/rm ([#3306](https://github.com/ipfs/js-ipfs/pull/3306)) ([69757f3](https://github.com/ipfs/js-ipfs/commit/69757f3c321c5d135ebde7a262c169427e4f1105))
* Loading ipfs-js bundle in worker fails with ReferenceError: window is not defined ([#2349](https://github.com/ipfs/js-ipfs/issues/2349)) ([3f72e50](https://github.com/ipfs/aegir/commit/3f72e5074145a8f2ec03143db4230514af664f95))

# 🗺️ What’s next?

Check out the js-IPFS [Project Roadmap](https://github.com/orgs/ipfs/projects/6) which contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

* [@a1300](https://github.com/a1300) (3 commits, 3 PRs, 10 issues, 11 comments)
* [@achingbrain](https://github.com/achingbrain) (51 commits, 34 PRs, 5 issues, 87 comments)
* [@acolytec3](https://github.com/acolytec3) (3 commits, 3 PRs, 2 issues, 7 comments)
* [@acostalima](https://github.com/acostalima) (1 issue, 9 comments)
* [@adamprocter](https://github.com/adamprocter) (1 comment)
* [@ampcpmgp](https://github.com/ampcpmgp) (1 issue, 1 comment)
* [@andykitt](https://github.com/andykitt) (1 comment)
* [@aphelionz](https://github.com/aphelionz) (1 PR, 1 comment)
* [@aschmahmann](https://github.com/aschmahmann) (1 comment)
* [@AuHau](https://github.com/AuHau) (1 PR, 2 issues, 5 comments)
* [@carsonfarmer](https://github.com/carsonfarmer) (1 issue, 3 comments)
* [@codecov-io](https://github.com/codecov-io) (3 comments)
* [@dapplion](https://github.com/dapplion) (3 issues, 6 comments)
* [@daviddias](https://github.com/daviddias) (1 commit, 1 PR, 2 issues, 3 comments)
* [@DeedleFake](https://github.com/DeedleFake) (1 comment)
* [@deefactorial](https://github.com/deefactorial) (1 issue)
* [@dependabot[bot]](https://github.com/dependabot%5Bbot%5D) (2 commits)
* [@elchenberg](https://github.com/elchenberg) (1 comment)
* [@EmanHerawy](https://github.com/EmanHerawy) (1 issue)
* [@gbaranski](https://github.com/gbaranski) (5 comments)
* [@Gozala](https://github.com/Gozala) (14 commits, 14 PRs, 12 issues, 80 comments)
* [@hacdias](https://github.com/hacdias) (20 commits, 7 PRs, 1 issue, 10 comments)
* [@HexaField](https://github.com/HexaField) (3 commits, 9 PRs, 5 issues, 10 comments)
* [@hugomrdias](https://github.com/hugomrdias) (17 commits, 16 PRs, 25 comments)
* [@hunterInt](https://github.com/hunterInt) (1 issue, 8 comments)
* [@icidasset](https://github.com/icidasset) (1 commit, 2 PRs, 1 issue, 14 comments)
* [@ikreymer](https://github.com/ikreymer) (1 commit, 1 PR, 1 issue)
* [@jacobfriedman](https://github.com/jacobfriedman) (1 commit, 1 PR, 6 comments)
* [@jacobheun](https://github.com/jacobheun) (6 commits, 1 issue, 26 comments)
* [@james2mid](https://github.com/james2mid) (1 issue, 1 comment)
* [@JonasKruckenberg](https://github.com/JonasKruckenberg) (1 comment)
* [@JonathanLorimer](https://github.com/JonathanLorimer) (1 comment)
* [@julianmrodri](https://github.com/julianmrodri) (2 comments)
* [@lidel](https://github.com/lidel) (2 commits, 2 PRs, 5 comments)
* [@lovemyliwu](https://github.com/lovemyliwu) (3 commits, 3 PRs, 6 comments)
* [@lucasvuotto](https://github.com/lucasvuotto) (3 comments)
* [@markg85](https://github.com/markg85) (1 comment)
* [@mburns](https://github.com/mburns) (2 commits, 1 PR, 1 comment)
* [@mdtanrikulu](https://github.com/mdtanrikulu) (1 comment)
* [@mgoelzer](https://github.com/mgoelzer) (1 issue)
* [@mikeal](https://github.com/mikeal) (1 commit, 1 PR, 1 comment)
* [@mtiger2k](https://github.com/mtiger2k) (2 issues, 1 comment)
* [@mvdan](https://github.com/mvdan) (1 comment)
* [@oed](https://github.com/oed) (2 comments)
* [@on-meetsys](https://github.com/on-meetsys) (1 comment)
* [@OR13](https://github.com/OR13) (5 comments)
* [@peterjanbrone](https://github.com/peterjanbrone) (1 commit, 1 PR, 1 comment)
* [@raphael10-collab](https://github.com/raphael10-collab) (1 issue)
* [@robertkiel](https://github.com/robertkiel) (1 PR, 2 comments)
* [@rvagg](https://github.com/rvagg) (5 comments)
* [@ryanio](https://github.com/ryanio) (2 comments)
* [@samlior](https://github.com/samlior) (1 commit, 1 PR)
* [@scenaristeur](https://github.com/scenaristeur) (1 issue)
* [@snickell](https://github.com/snickell) (1 comment)
* [@stbrody](https://github.com/stbrody) (1 issue, 3 comments)
* [@tabcat](https://github.com/tabcat) (1 issue, 2 comments)
* [@technicallyty](https://github.com/technicallyty) (1 comment)
* [@TheoXD](https://github.com/TheoXD) (1 comment)
* [@thotheolh](https://github.com/thotheolh) (1 comment)
* [@ukstv](https://github.com/ukstv) (1 issue, 2 comments)
* [@valmack](https://github.com/valmack) (6 issues, 7 comments)
* [@vasco-santos](https://github.com/vasco-santos) (119 commits, 50 PRs, 11 issues, 123 comments)
* [@vaultec81](https://github.com/vaultec81) (1 comment)
* [@VexyCats](https://github.com/VexyCats) (1 issue)
* [@vmx](https://github.com/vmx) (15 commits, 2 PRs, 16 comments)
* [@vogdb](https://github.com/vogdb) (1 issue, 5 comments)
* [@warpfork](https://github.com/warpfork) (2 comments)
* [@welcome](undefined) (15 comments)
* [@wemeetagain](https://github.com/wemeetagain) (3 commits, 1 PR, 1 issue, 1 comment)
* [@workingtim](https://github.com/workingtim) (2 issues, 2 comments)
* [@woss](https://github.com/woss) (1 issue, 4 comments)
* [@wqsz7xn](https://github.com/wqsz7xn) (1 commit, 1 PR, 1 comment)
* [@Xmader](https://github.com/Xmader) (1 PR, 10 comments)
* [@xmaysonnave](https://github.com/xmaysonnave) (1 issue, 3 comments)

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
