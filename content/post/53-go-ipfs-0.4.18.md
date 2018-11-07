---
date: 2018-11-07
url: 53-go-ipfs-0.4.18
title: go-ipfs 0.4.18 released
author: Steven Allen and Erik Ingenito
---

[go-ipfs 0.4.18](https://dist.ipfs.io/#go-ipfs) has been released! This is one of largest go-ipfs releases to date; 3 months in the making. *Thanks to all our contributors for your awesome work!*

## ✨ Highlights
The headline features this release are:

* **[Experimental QUIC support](#quic)** - for faster and more efficient peer connections, better handling of lossy
  networks and improved NAT traversal.

* **[Gossipsub pubsub routing algorithm](#pubsub)** - dramatically more efficient pubsub on IPFS, along with signed
  messages

* **[Updated WebUI](#webui)** - a big update to the IPFS WebUI with expanded features and information across the board

* **[Enhanced `p2p`, `cid` and `add`](#commands-changes)** - refactors and new features to a number of IPFS
  commands.

* **[Performance](#performance)** - numerous performance and efficiency improvements in a number of IPFS subsystems.
  IPFS is faster, smaller and more reliable.

* **[And a lot more!](#refactors-and-endeavors)**


## 🏃 QUIC
First up, on the networking front, this release introduced experimental
support for the QUIC protocol. QUIC is a new UDP-based network transport that
solves many of the long standing issues with TCP.

For us, this means (eventually):

* **Fewer local resources** - TCP requires a file-descriptor per connection while
  QUIC (and most UDP based transports) can share a single file descriptor
  between all connections. This should allow us to dial faster and keep more
  connections open.
* **Faster connection establishment** - When client authentication is included, QUIC
  has a three-way handshake like TCP. However, unlike TCP, this handshake brings
  us all the way from 0 to a fully encrypted, authenticated, and
  multiplexed connection. In theory (not yet in practice), this should
  significantly reduce the latency of DHT queries which will improve a number of IPFS operations like adding and
  getting large volumes of data.
* **Behaves better on lossy networks** - When multiplexing multiple requests over a
  single TCP connection, a single dropped packet will bring the entire
  connection to a halt while the packet is re-transmitted. However, because QUIC
  handles multiplexing internally, dropping a single packets affects only the
  related stream.
* **Better NAT traversal** - NAT hole-punching is significantly easier and, in
  many cases, more reliable with UDP than with TCP.

However, we still have a long way to go. While we encourage users to test this,
the IETF QUIC protocol is still being actively developed and *will* change. You can find instructions for enabling it [here](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#QUIC).

## 📨 Pubsub

go-ipfs now supports the [gossipsub](https://github.com/libp2p/specs/tree/master/pubsub/gossipsub) routing algorithm and message signing.

The gossipsub routing algorithm is *significantly* more efficient than the
current floodsub routing algorithm. Even better, it's fully backwards compatible
so you can enable it and still talk to nodes using the floodsub algorithm. You
can find instructions to enable gossipsub in go-ipfs
[here](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#gossipsub).

Messages are now **signed by their authors**. While signing is now
enabled by default, strict signature verification has not been and will not be
for at least one release (probably multiple) to avoid breaking existing
applications. You can read about how to configure this feature
[here](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#message-signing).

## 🎛 Commands Changes

In terms of new toys, this release introduces 1) the`ipfs cid` subcommand for
working with CIDs, 2) a completely refactored `ipfs p2p` command, 3) streaming name
resolution, and 4) inline block support.

#### 1. `ipfs cid`
The new `ipfs cid` command allows users to both inspect CIDs and convert them
between various formats and versions. Here are some examples:

```sh
# Print out the CID metadata (prefix)
> ipfs cid format -f %P QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
cidv0-protobuf-sha2-256-32

# Get the hex sha256 hash from the CID.
> ipfs cid format -b base16 -f '0x%D' QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
0x46d44814b9c5af141c3aaab7c05dc5e844ead5f91f12858b021eba45768b4c0e

# Convert a base58 v0 CID to a base32 v1 CID.
> ipfs cid base32 QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
bafybeicg2rebjoofv4kbyovkw7af3rpiitvnl6i7ckcywaq6xjcxnc2mby
```

#### 2. `ipfs p2p`
The refactored `ipfs p2p` command allows forwarding TCP streams through two IPFS
nodes from one host to another. It's `ssh -L` but for IPFS.
__It's still experimental__ but we don't expect too many breaking changes after this
point (it will very likely be stabilized in the next release).

Here's a quick summary of the breaking changes in this release:

* We don't stop listening for local (forwarded) connections after accepting a
  single connection.
* `ipfs p2p stream ls` output now returns more useful output, first address is
  always the initiator address.
* `ipfs p2p listener ls` is renamed to `ipfs p2p ls`
* `ipfs p2p listener close` is renamed to `ipfs p2p close`
* Protocol names have to be prefixed with `/x/` and are now just passed to
  libp2p as handler name. Previous version did this 'under the hood' and with
  `/p2p/` prefix. There is a `--allow-custom-protocol` flag which allows you
  to use any libp2p handler name.
* `ipfs p2p listener open` was renamed to `ipfs p2p listen`
* `ipfs p2p stream dial` got renamed to `ipfs p2p forward`


You can find documentation [here](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#ipfs-p2p),
but here's a quick example of connecting the WebUI of a remote IPFS node:

```sh
# On the 'remote' IPFS host
> ipfs id -f "<id>\n"
QmSiXjrYwLmDhRvAb3vK2TUP8W2pTDd34MhgCwpanVjdNT

# Configure the p2p listener on the remote IPFS instance:
> ipfs p2p listen /x/kickass/1.0 /ip4/127.0.0.1/tcp/5001

# On the 'local' IPFS host
# Configure the p2p forwarder on the local host:
> ipfs p2p forward /x/kickass/1.0 /ip4/127.0.0.1/tcp/5551 /ipfs/QmSiXjrYwLmDhRvAb3vK2TUP8W2pTDd34MhgCwpanVjdNT

# Voila - point your browser at http://localhost:5551/webui to inspect your remote
```

#### 3. `ipfs name resolve` streaming response

There is now a new flag for `ipfs name resolve` - `--stream`. When the command
is invoked with the flag set, it will start returning results as soon as they
are discovered in the DHT and other routing mechanisms. This enables certain
applications to start prefetching/displaying data while the discovery is still
running. Note that this command will likely return many outdated records
before it finding and returning the latest. However, it will always return
*valid* records (even if a bit stale).

#### 4. `ipfs add` block inlining

In the previous release, we added support for extracting blocks inlined
into CIDs. In this release, we've added support for creating these CIDs. You can
now run `ipfs add` with the `--inline` flag to inline blocks less than or equal
to 32 bytes in length into a CID, instead of writing an actual block. This
should significantly reduce the size of filesystem trees with many empty
directories and tiny files.

## 🌐 WebUI

This release includes the latest, very shiny [updated webui](https://github.com/ipfs-shipyard/ipfs-webui). You can view it by
installing go-ipfs and visiting http://localhost:5001/webui. It deserves its own release note - oh look, it [got
one](./51-js-ipfs-0-33/#web-ui-2-0)! Here's a peek:

![Screenshot of the status page](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-status.png)

| Files | Explore | Peers | Settings |
|-------|---------|-------|----------|
| ![Screenshot of the file browser page](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-files.png) | ![Screenshot of the IPLD explorer page](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-explore.png) | ![Screenshot of the swarm peers map](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-peers.png) | ![Screenshot of the settings page](https://raw.githubusercontent.com/ipfs-shipyard/ipfs-webui/master/docs/screenshots/ipfs-webui-settings.png) |


Kudos and thanks to the webui team! 👏

## ⚡️ Performance

This release includes some significant performance improvements, both in terms of resource utilization and speed particularly when transferring lots of small files (or blocks). This section will go into some technical details so feel free to skip it if you're just looking for shiny new features.

### Resource Utilization

In this release, we've (a) fixed a slow memory leak in libp2p and (b)
significantly reduced the allocation load. Together, these should improve both
memory and CPU usage. How much you ask? Glad you asked.

![gc-latency](/52-go-ipfs-0.4.18/img/gc-latency.png)

Above is a graph of time our IPFS gateway nodes spend in GC. See the awesome looking light blue line at the bottom? That's the node running 0.4.18. IKR?

![cpu-load](/52-go-ipfs-0.4.18/img/cpu-load.png)

This graph of time spent in execution has greater variability but the improvement is still pretty clear. You want the
light blue one.


#### Datastructures

We've changed two of our most frequently used datastructures, CIDs and
Multiaddrs, to reduce allocation load.

First, we now store CIDs *encoded* as strings, instead of decoded in structs
(behind pointers). In addition to being more compact, our `Cid` type is now a
valid `map` key so we no longer have to encode CIDs every time we want to use
them in a map/set. Allocations when inserting CIDs into maps/sets was showing up
as a significant source of allocations under heavy load so this change should
improve memory usage.

Second, we've changed many of our multiaddr parsing/processing/formatting
functions to allocate less. Much of our DHT related-work includes processing
multiaddrs so this should reduce CPU utilization when heavily using the DHT.

#### Streams and Yamux

Streams have always plagued us in terms of memory utilization. This was
partially solved by introducing the connection manager, keeping our maximum
connection count to a reasonable number but they're still a major memory sink.

This release sees two improvements on this front:

1. A memory [leak in identify](https://github.com/libp2p/go-libp2p/issues/419)
   has been fixed. This was slowly causing us to leak connections (locking up
   the memory used by the connections' streams).
2. Yamux streams now use a buffer-pool backed, auto shrinking read buffer.
   Before, this read buffer would grow to its maximum size (a few megabytes) and
never shrink, but **now** these buffers shrink as they're emptied and **free up space efficiently**.


### Bitswap Performance

Bitswap will now pack *multiple* small blocks into a single message thanks to
[ipfs/go-bitswap#5](https://github.com/ipfs/go-bitswap/pull/5). While this won't
help when transferring large files (with large blocks), this should help when
transferring many tiny files.

## 🛠 Refactors and Endeavors

This release saw yet another commands-library refactor, work towards the
CoreAPI, and the first step towards reliable base32 CID support.

### Commands Lib

We've completely refactored our commands library (again). While it still needs
quite a bit of work, it now requires significantly less boilerplate and should
be significantly more robust. The refactor immediately found two broken tests
and probably fixed quite a few bugs around properly returning and handling
errors.

### CoreAPI

CoreAPI is a new way to interact with IPFS from Go. While it's still not
final, most things you can do via the CLI or HTTP interfaces can now be done
through the new API.

Currently only the Go implementation exists, but there are plans to expose the new API via HTTP soon.
We are also looking into creating an RPC interface to this API which could help performance in some use cases.

You can track progress in https://github.com/ipfs/go-ipfs/issues/4498

### CIDv1/Base32 Migration

We're continuing work to upgrade our default CID format to Base32 while preserving compatibility with existing CIDs. We
need this change to improve the security of IPFS content in browsers.  Currently, IPFS is usually used in browsers by browsing to `https://SOME_GATEWAY/ipfs/CID/...`. There are two significant drawbacks to this approach:

1. From a browser security standpoint, all IPFS "sites" will live under the same
   origin (SOME_GATEWAY).
2. From a UX standpoint, this doesn't feel very "native" (even if the gateway is
   a local IPFS node).

To fix the security issue, we intend to switch IPFS gateway links
`https://ipfs.io/ipfs/CID` to `https://CID.ipfs.dweb.link`. This way, the CID
will be a part of the
["origin"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) so
each IPFS website will get a separate security origin.

To fix the UX issue, we've been working on adding support for `ipfs://CID/...`
to web browsers through our
[ipfs-companion](https://github.com/ipfs/ipfs-companion/) add-on and some new,
experimental extension APIs from Mozilla. This has the same effect of putting
the CID in the URL origin but has the added benefit of looking "native".

Unfortunately, origins must be *case insensitive*. Currently, the most common CIDs
are *CIDv0* CIDs (those starting with `Qm`) which are *always* base58
encoded and are therefore case-sensitive.

Fortunately, CIDv1 (the latest CID format) supports arbitrary bases using the
[multibase](https://github.com/multiformats/multibase/) standard. Unfortunately,
IPFS has always treated equivalent CIDv0 and CIDv1 CIDs as distinct. This means
that files added with CIDv0 CIDs (the default) can't be looked up using the
equivalent CIDv1.

This release makes some significant progress towards solving this issue by
introducing two features:

(1) The previous mentioned `ipfs cid base32` command for converting a CID to a
case insensitive encoding required by domain names. This command converts an existing base58 CIDv0 to
a CIDv1 encoded using base32.

(2) A hack to allow locally looking up blocks associated with a CIDv0 CID using
the equivalent CIDv1 CID (or the reverse). This hack will eventually
be replaced with a multihash indexed blockstore, which is agnostic to both the
CID version and multicodec content type.

## 📋 Full Changelog

As always, you can find the full (massive) changelog over at ipfs/go-ipfs's Github
repository:
https://github.com/ipfs/go-ipfs/blob/master/CHANGELOG.md#go-ipfs-changelog-1

## 🙌 Contributing

Would you like to help contribute to the go-ipfs project?

- Join us on Github at https://github.com/ipfs/go-ipfs where you can find out more about the project.
- Check the issues with the help wanted label at the Ready column in our waffle board - https://waffle.io/ipfs/go-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute or any cool demos of what you've built - https://github.com/ipfs/pm/#all-hands-call
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [Go Core Dev Team Weekly Sync](https://github.com/ipfs/pm/issues/674) 🙌🏽 and be part of the Sprint action!

## ⁉️  Do you have questions?
The best place to ask your questions about IPFS, how it works and what you can do with it, is at [discuss.ipfs.io](https://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.

Thanks!
