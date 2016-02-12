---
date: 2016-02-12
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

Good news everyone! We are about to release go-ipfs 0.4.0,
which contains lots of great changes and enhancements.

There are breaking changes
which prevent 0.4.x nodes from communicating with 0.3.x nodes.
This means that there will be, and already are, two separate networks.
We'll call these networks v03x and v04x.
IPFS nodes built from the master branch are already part of v04x.
The Docker image `ipfs/go-ipfs` is built from master and thus also part of v04x.

ipfs.io provides two essential services to the community,
which are affected by this: the gateway and the default bootstrappers.
We'll continue to support them for the v03x network until the **end of April 2016**.

Please note that we won't support 0.3.x with patches or new features.
All development effort is directed towards 0.4.0, and you should update as soon as possible.

- [How do I update go-ipfs to 0.4.0?](#how-do-i-update-go-ipfs-to-0-4-0-)
- [The public gateways at ipfs.io](#the-public-gateways-at-ipfs-io)
- [The default bootstrappers](#the-default-bootstrappers)
- [How does this affect me?](#how-does-this-affect-me-)


## How do I update go-ipfs to 0.4.0?

You can use the [ipfs-update tool][ipfs-update] to update go-ipfs.

[ipfs-update]: http://dist.ipfs.io/#ipfs-update


## The public gateways at ipfs.io

For the time being, https://ipfs.io uses both v03x and v04x to service requests.
Whichever responds successfully first (2xx or 3xx status code),
gets to serve its content. The other response is discarded.
If the first response is not successful (4xx/5xx, connection errors),
it is discarded and the second response is served, regardless of its status code.

We're using the [multireq proxy][multireq] to accomplish this multiplexing behaviour.

If you want to target a specific network, use v03x.ipfs.io or v04x.ipfs.io.
These domain names will stay around as long as the respective network is
supported by the public gateway.

All of the above also applies to the `/api` endpoint (the readonly API),
which is part of the gateway.

Expect the **v03x gateway** to be **supported until the end of April 2016.**
After that day, ipfs.io will be served by v04x exclusively,
and v03x.ipfs.io will no longer work.

[multireq]: https://github.com/whyrusleeping/multireq


## The default bootstrappers

We call the 8 bootstrap nodes in go-ipfs's default config the default bootstrappers.
Their PeerIDs start with `QmSoL` (for Solarnet),
and all of them use `/tcp/4001` and/or `/udp/4002/utp`.
Use `ipfs bootstrap` to see or modify the bootstrappers currently used by your IPFS node.

In order to balance the default bootstrappers over v03x and v04x,
a few of them bind v04x to these ports, and a few bind v03x.
The respective other network is bound to `/tcp/14001` and `/udp/14002/utp`.
This means that all 8 hosts run bootstrappers for both networks,
but are available as default bootstrappers only to one.

We'll gradually shift the v03x/v04x ratio to v04x.
Expect at least **two v03x bootstrappers** to be **supported until the end of April 2016.**


## How does this affect me?

Check which version of go-ipfs you are running: `ipfs version`

If you're running an 0.3.x node, it won't be able to communicate
with any node which has updated to 0.4.x, let alone exchange data.
You can access data added by 0.4.0 nodes using the public gateway.
Likewise, data added by your 0.3.x node is still available on the public gateway.
