---
date: 2019-03-10
url: 73-tunneling-http-in-ipfs
tags: libp2p, go-ipfs
title: Securely tunneling HTTP through IPFS with libp2p
author: Hector Sanjuan
---

The upcoming [go-ipfs](https://github.com/ipfs/go-ipfs) release (0.4.19) will
include
[a new experimental feature](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#p2p-http-proxy)
which allows any peer to serve an HTTP endpoint through the IPFS daemon's
[libp2p host](https://libp2p.io) and any other peer to expose it under the
`/p2p/<peer-id>/<web-url>` path in the gateway endpoint. It was a contribution
by [Peergos]( https://peergos.org/) and it means that the web pages and web
resources accessed this way will be addressed by the peer ID of the server
(instead of the IP/domain) and securely transmitted using the encrypted
channel provided by libp2p.

Under the hood of this feature is
[go-libp2p-http](https://github.com/hsanjuan/go-libp2p-http), small library
that I wrote a while ago and that allows to serve HTTP endpoints and make HTTP
requests through libp2p. It does this by implementing an `http.Rountripper` to
replace the default one and which uses libp2p streams instead of TCP
connections. If the HTTP request is handled by a Go application, the
server-side can use the standard Go HTTP Server stack and it only needs to use
a custom `net.Listener` as provided by another small library,
[go-libp2p-gostream](https://github.com/hsanjuan/go-libp2p-gostream/) which
offers an alternative implementation for `net.Listener` and `net.Dialer`,
using libp2p.

`go-ipfs` will not be the first application tunneling HTTP traffic through
libp2p though: [IPFS Cluster](https://cluster.ipfs.io) has long been doing it
to provide secure HTTP access to its REST API. The `ipfs-cluster-ctl` (which
uses Cluster's
[REST API client library](https://godoc.org/github.com/ipfs/ipfs-cluster/api/rest/client))
supports all HTTP, HTTPs and HTTP-under-libp2p indistinctly. The latter,
however, requires zero configuration and gives you an encrypted connection to
the API endpoint without having to set up certificates. As `ipfs-cluster-ctl`
is a simple command-line interface, the client-side libp2p host to do this is
very short-lived and produced randomly on every run.

Any protocol can potentially be tunneled through libp2p and take advantange of
all the features of the libp2p stack: DHT for peer discovery and routing, NAT
traversal, stream multiplexing over a single connection, multiple network
transports and channel encryption. Libraries like
[go-libp2p-raft](https://github.com/libp2p/go-libp2p-raft),
[go-libp2p-grpc](https://github.com/paralin/go-libp2p-grpc) or
[go-libp2p-gorpc](https://github.com/paralin/go-libp2p-grpc) are some of the
examples in the ecosystem which are also using libp2p to tunnel connections
which otherwise would use TCP/IP directly. The
[ipfs p2p](https://docs.ipfs.io/reference/api/cli/#ipfs-p2p) command suite in
`go-ipfs` provides the necessary tools to tunnel any TCP connection with
libp2p by setting up a listener on a local port. Thus, any machine running the
IPFS daemon can use it to securely proxy anything without any extra
configuration, VPN or firewall rules. And thanks to the IPFS DHT, the only
thing to remember is the peer ID of the IPFS daemon: it does not matter if the
machine gets different IPs during its lifetime and, in many cases, NAT hole
punching might also save the need for any firewall setup.

We hope that this post contributes to shedding some light on one of the most
special features of the IPFS daemon and the wonderful possiblities of the
libp2p stack (also for non-IPFS-related applications). Let us know what you
think!
