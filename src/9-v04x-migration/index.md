---
date: 2016-02-05
id: 9-v04x-migration
template: tmpl/layouts/post.html
baseurl: ..
breadcrumbs:
  - {name: "9-v04x-migration", link: "./" }
tags: gateway, bootstrap, infrastructure
title: Migrating ipfs.io from go-ipfs 0.3.x to 0.4.0
author: Lars Gierth
collection: posts
---

We are about to release go-ipfs 0.4.0,
which contains lots of great changes and enhancements.

There are breaking changes
which prevent 0.4.x nodes from communicating with 0.3.x nodes.
This means that there will be, and already are, two separate networks.
We'll call these networks v03x and v04x.
IPFS nodes built from the master branch are already part of v04x.

ipfs.io provides two essential services to the IPFS community,
which are affected by this.


## The public gateways at ipfs.io

For the time being, https://ipfs.io uses both v03x and v04x to service requests.
Which ever responds successfully (2xx or 3xx status code) first,
gets to serve. The other response is discarded.
That also means that if the first response is not successful (4xx/5xx),
it is discarded and the second response is served, regardless of its status code.

If you wanted to target a specific network, use v03x.ipfs.io or v04x.ipfs.io.
These domain names will stay around as long as the respective network is
supported by the public gateway.

Expect the v03x gateway to be **supported until end of April 2016.**
After that day, ipfs.io will be served by v04x exclusively,
and v03x.ipfs.io will no longer work.


## The default bootstrappers

These are the 8 bootstrap nodes in go-ipfs's default config.
Their PeerIDs start with `QmSoL` (for Solarnet).
All of them use `/tcp/4001` and `/udp/4002/utp`.
In order to balance them over v03x and v04x,
a few of them bind v04x to these ports, and a few bind v03x.
The respective other network is bound to `/tcp/14001` and `/udp/14002/utp`.
The means that all 8 nodes are still part of both networks,
but are available at default bootstrappers only to one.

We'll gradually shift the v03x/v04x ratio to v04x.
Expect the v03x bootstrappers to be **supported until end of April 2016.**
