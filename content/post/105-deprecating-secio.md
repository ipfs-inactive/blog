---
date: 2020-08-05
url: /2020-08-05-deprecating-secio/
title: We're removing support for the SECIO security transport
author: Jacob Heun
tags: ipfs, libp2p, secio
---

## A brief history

SECIO is a TLS-like security transport that was developed for IPFS and libp2p in 2014 to alleviate a gap with TLS1.2 requiring Certificate Authorities. SECIO has been the primary security transport for all libp2p implementations as its underlying algorithms are widely supported. In May 2019, go-ipfs 0.4.21 added support for TLS1.3, and in go-ipfs 0.5 in April 2020 it became the default security transport. However, TLS1.3 is still gaining support across libp2p implementations and isn't accessible in browser contexts, so not all libp2p implementations can make it the default security transport. While web browsers have introduced support for TLS1.3, we have no way of attaching the necessary identity information for libp2p.

So, how can we successfully deprecate SECIO and move on to more modern and widely-used security transports if we can't support TLS1.3 everywhere? The answer is the [Noise security transport](noise_spec), which was created leveraging the [Noise Protocol Framework](noise). Noise provides a set of patterns for composing widely supported cryptographic primitives, which allows us to more easily add support across the various libp2p implementations. Support was added for Noise in go-ipfs 0.6 and js-ipfs 0.47, including rollouts to IPFS infrastructure that Protocol Labs runs.

SECIO was never meant to be a permanent security transport. Now that we have Noise for broard support and TLS1.3 for implementations that can support it, it's time for SECIO to be deprecated.

## When is it happening?

SECIO will be removed from go-ipfs in the release of 0.7, which you can track in the [Github issue](ipfs07). The release is tentatively planned for **August 25th**. We will also be coordinating a release of js-ipfs around the same time to remove SECIO there as well.

## How does this impact me?

### Go IPFS

|Version|Impact|
|:------|:-----|
|0.5+ | Nominal |
|0.4.21 - 0.4.23| Slower Connection Upgrading |
|<0.4.21 | Connection Failures |

**Older nodes on the network that only support SECIO will no longer be able to communicate with IPFS nodes after 0.7.** If you are running a go-ipfs version older than 0.5, we strongly recommend that you upgrade ASAP. While go-ipfs nodes 0.4.21 and newer have TLS1.3 support, you will experience a latency hit in your connections if you are not on at least IPFS 0.5. This is due to protocol negotiation defaulting to SECIO (which will fail to connect to recent nodes) and needing to be redone with TLS1.3.

If you are running IPFS older than 0.4.21, you are going to start failing to connect to newer nodes at all, which will include the DHT Bootstrap nodes and other critical pieces of IPFS Public Network infrastructure.

### JS IPFS

|Version|Impact|
|:------|:-----|
|0.47+ | Nominal |
|<0.47 | Connection Failures* |

<sup>*</sup>We are looking at backporting Noise to ipfs 0.46.x.

Noise was added to js-ipfs 0.47, however it is compatible with js-ipfs 0.41.0+ (the async/await refactor) but it needs to be manually configured.

If you are running js-ipfs older than 0.41, you won't be able to connect to nodes who don't support SECIO. You will still be able to leverage the websocket-star server for the time being.


[noise]: https://noiseprotocol.org/noise.html
[noise_spec]: https://github.com/libp2p/specs/tree/master/noise
[ipfs07]: https://github.com/ipfs/go-ipfs/issues/7560
