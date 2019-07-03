---
date: 2017-03-24
url: 23-js-ipfs-0-23
title: js-ipfs 0.23.0 released
author: David Dias & Victor Bjelkholm
---

Today we're happy to announce that we have released js-ipfs version 0.23.0.

## Highlights

* DAG API (IPLD Support)
* Interoperability with go-ipfs
* Bootstrap nodes
* Easier initialization
* Datastore
* New tutorials
* `jsipfs add --wrap-with-directory` feature
* Support for unixfs sharding

## Installation

```bash
npm install --save ipfs@0.23.0
```

## Full Details

### ✨ A new way API is born, welcome to `.dag`

The new DAG API (available through `ipfs.dag`) offers a new way to create and operate over any MerkleGraph, today it has support for the IPFS MerkleDAG (referenced as dag-cbor), the new dag-cbor (which lets you drop json into IPFS seamlessly) and a preview of Ethereum.

You can learn how to use it through:
- [docs](https://github.com/ipfs/interface-ipfs-core/tree/master/API/dag#dag-api)
- [examples](https://github.com/ipfs/js-ipfs/tree/master/examples/dag#create-and-resolve-through-graphs-with-the-dag-api)
- [video running through the demos](https://www.youtube.com/watch?v=drULwJ_ZDRQ)

If you are new to the Merkle Forest, make sure to watch @jbenet's talk ["Enter the Merkle Forest"](https://www.youtube.com/watch?v=Bqs_LzBjQyk)

### 🙌🏽 Interoperability with go-ipfs is here!

This took us more time than what we had initially expected, however, now it is a thing of the past, you can dial to a go-ipfs node and exchange files without going through complicated set ups, it just works™

If you would like to know more about the issue we faced, you can find more info here: ["Stream Muxing issues between go-ipfs and js-ipfs are a thing of the past"](https://github.com/ipfs/js-ipfs/issues/721)

**Note:** Interop is only fully available with go-ipfs 0.4.7 and onwards, if you haven't updated yet, please do so by visiting http://dist.ipfs.io/.

### 🌍 js-ipfs will now also bootstrap with bootstrap nodes as well

Same way that go-ipfs does, now your jsipfs daemon will bootstrap itself with the bootstraper nodes. This was easy once we had the Stream Muxing figured out.

```sh
> jsipfs swarm peers
/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
/ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z
/ip4/104.236.179.241/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM
/ip4/162.243.248.213/tcp/4001/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm
/ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu
/ip4/104.236.76.40/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64
/ip4/178.62.158.247/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd
/ip4/178.62.61.185/tcp/4001/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3
/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx
```

### ⚡️ Starting an IPFS instance is easier than ever

We've heard you, starting an ipfs instance was cumbersome 3 step process, but not anymore!

Now, all you need to do to start an instance is:

```javascript
const IPFS = require('ipfs')
const node = new IPFS()

node.on('start', () => {
  // Your node is now ready to use \o/
})
```

That's it! See more [Usage examples in the README](https://github.com/ipfs/js-ipfs#ipfs-core-use-ipfs-as-a-module)

### 💾 Datastore is here!

We've migrated away from [pull-blob-store](https://github.com/ipfs/interface-pull-blob-store)/[blob-store](https://github.com/maxogden/abstract-blob-store) to [`datastore`](https://github.com/ipfs/interface-datastore), the storage interface that is used in go-ipfs. This was a requirement towards implementing the DHT on js-ipfs.

### 👩🏽‍🏫 New tutorial! Transfer files between browser and desktop nodes

We've build a new Tutorial in how to use js-ipfs that explain how to interact with other nodes, from connecting, discovering and exchanging files. The tutorial is the most bare bones possible (i.e no frameworks) so that it focus on IPFS.

Find this tutorial at our [examples folder](https://github.com/ipfs/js-ipfs/tree/master/examples/transfer-files)

### 👏🏽 jsipfs add --wrap-with-directory is now a feature!

Thanks to @harshjv, now you can add files wrapped in a directory just like go-ipfs. Example:

```sh
> jsipfs add <filename> --wrap-with-directory
> jsipfs add <filename -w # alias
```

# Exciting future (soon™)

Here is a quick list of things that we will be heads down after this release

- Circuit Relay - We are building Circuit Relay in order to let browser nodes to connect to any node in the network (e.g when two nodes do not have a common transport). Track the development and spec here -- https://github.com/libp2p/specs/tree/master/relay, https://github.com/libp2p/js-libp2p-circuit/pull/1.
- DHT - The DHT is the second last piece that needs to be built (the first being relay) in order to give browser nodes the ability to discover the location of content by themselves. Track dev at the repo https://github.com/libp2p/js-libp2p-dht
- Parity to IPFS - We want IPFS to access the Ethereum blockchain on demand (i.e: Without having to constantly transferring the blocks over), for that, the EthereumJS team had a brilliant idea of building a storage backend for js-ipfs that uses Parity, so that we can 'read' blocks from the blockchain. Track at: https://github.com/ipfs/js-ipfs/issues/763
- Torrent support - We started working in getting Torrent files supported in js-ipfs (same way we do for Ethereum). This will give the ability to fetch data from the BitTorrent network through js-ipfs as well. Track progress here: https://github.com/ipfs/js-ipfs/issues/779
