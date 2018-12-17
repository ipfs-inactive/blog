---
date: 2018-12-17
url: 61-js-ipfs-0-34
title: js-ipfs 0.34.0 released
author: Alan Shaw
---

Speed and flexibility, just in time for the holidays!

# 🔦 Highlights

## ⚾️ CID handling improvements

Smoosh your CIDs into whatever version you like - you can now add data under a version 0 CID and get it back using a version 1 CID and vice versa. Now that you have this freedom you can encode them with whatever multibase encoding you like. Version 0 CIDs are all base58btc but if you convert to a version 1 CID you can encode it with base2, base32, base64url or whatever:

```console
# base2
010111000000010010001000000100011011010100010010000001010010111001110001011010111100010100000111000011101010101010101101111100000001011101110001011110100001000100111010101101010111111001000111110001001010000101100010110000001000011110101110100100010101110110100010110100110000001110
# base32
bafybeicg2rebjoofv4kbyovkw7af3rpiitvnl6i7ckcywaq6xjcxnc2mby
# base58btc
QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
# base64url
uAXASIEbUSBS5xa8UHDqqt8BdxehE6tX5HxKFiwIeukV2i0wO
```

This is all work to smooth out the eventual transition to base32 CIDv1 by default - a move to allow CIDs to be used as valid URL origins. Have a read of this for more.

To help you craft your artisanal CIDs we've introduced a --cid-base option to a bunch of CLI commands (and ?cid-base option to a bunch of HTTP API endpoints). Check it out:

```sh
jsipfs add file.txt --cid-base=base32
added bafybeibns4lrebrxaymvyshgmki5biwh6cd53idxfpen6ysomzrywtsm44 file.txt
```

## 🏎 Protobuf DAG read speed improvements

Reading Protobuf DAG nodes just got a serious speed boost as well as a memory reduction. Previously Protobuf DAG nodes (dag-pb nodes for short) carried a multihash property (a CIDv0) with them. This used up loads of CPU time calculating the hash for a given node as it was retrieved from storage and with the advent of CIDv1 there was no guarantee the hashing algorithm and length were correct.

So, we removed it! 🦖

Ok so that had the unfortunate consequence of making the object API a whole lot less useful when writing data - the DAG nodes you got back were basically the data you put in. Hence the object API was refactored to return CIDs instead of DAG nodes for write operations...and we all lived happily ever after.

## 🎄 HAMT support in MFS

We're putting the whole of npm on IPFS! These days npm is like 55.3 terabytes of data and it's all going in MFS. This is super rad, but we needed a good sharding strategy because 5TB is a lorra lorra files.

## 📣 IPNS over pubsub and DHT

Get informed of IPNS record updates and read and publish your IPNS records to the DHT. It's all there and it's all awesome. For those of you new to IPNS, let me give you the lowdown - IPNS puts the mutable in immutable 🤣 It's an age old problem, content addressing is rad and all that, but if I change something the hash changes - 👎 boo...but wait, IPNS solves this, you get a permenant address for changeable content - hooray \o/.

IPNS over pubsub gets the word out quicker to peers that are interested when an IPNS record changes. IPNS over DHT allows peers to find and resolve your IPNS address to some content in the first place! In the next JS IPFS release the DHT will be enabled by default and it's going to be epic.

## 💪 Deps upgrades!

We got you covered with WebUI 2.2 (quic support, responsive navbar, and a language selector), libp2p 0.24 and many other upgrades giving you a faster and smaller JS IPFS.

# 🏗 API Changes

* Object API methods that write DAG nodes now return a [CID](https://www.npmjs.com/package/cids) instead of a DAG node. Affected methods:
    * `ipfs.object.new`
    * `ipfs.object.patch.addLink`
    * `ipfs.object.patch.appendData`
    * `ipfs.object.patch.rmLink`
    * `ipfs.object.patch.setData`
    * `ipfs.object.put`
    * [More info](https://github.com/ipfs/js-ipfs-api/pull/896)
* `DAGNode` instances, which are part of the IPLD dag-pb format have been refactored. These instances no longer have `multihash`, `cid` or `serialized` properties. This effects the following API methods that return these types of objects:
    * `ipfs.object.get`
    * `ipfs.dag.get`
    * [More info](https://github.com/ipld/js-ipld-dag-pb/pull/99)
* Files API methods `add*`, `cat*`, `get*` have moved from `files` to the root namespace. Specifically, the following changes have been made:
    * `ipfs.files.add` => `ipfs.add`
    * `ipfs.files.addPullStream` => `ipfs.addPullStream`
    * `ipfs.files.addReadableStream` => `ipfs.addReadableStream`
    * `ipfs.files.cat` => `ipfs.cat`
    * `ipfs.files.catPullStream` => `ipfs.catPullStream`
    * `ipfs.files.catReadableStream` => `ipfs.catReadableStream`
    * `ipfs.files.get` => `ipfs.get`
    * `ipfs.files.getPullStream` => `ipfs.getPullStream`
    * `ipfs.files.getReadableStream` => `ipfs.getReadableStream`
* New core files API methods added:
    * [`ipfs.addFromStream`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addfromstream)
    * [`ipfs.addFromUrl`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addfromurl)
    * [`ipfs.addFromFs`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addfromfs)
* DHT API methods renamed and return types changed
    * `ipfs.dht.findprovs` renamed to `ipfs.dht.findProvs` and returns an array of [PeerInfo](https://github.com/libp2p/js-peer-info)
    * `ipfs.dht.findpeer` renamed to `ipfs.dht.findPeer` and returns a [PeerInfo](https://github.com/libp2p/js-peer-info)
    * `ipfs.dht.query` now returns an array of [PeerInfo](https://github.com/libp2p/js-peer-info)
    * [More info](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/DHT.md)
* A new option is available in the CLI, HTTP API and core that will allow the multibase encoding to be specified for any CIDs that are returned as strings.
    * A `--cid-base` option has been added to the following **CLI commands**:
        * `jsipfs bitswap stat`
        * `jsipfs bitswap unwant`
        * `jsipfs bitswap wantlist`
        * `jsipfs block put`
        * `jsipfs block stat`
        * `jsipfs add`
        * `jsipfs ls`
        * `jsipfs object get`
        * `jsipfs object links`
        * `jsipfs object new`
        * `jsipfs object patch add-link`
        * `jsipfs object patch append-data`
        * `jsipfs object patch rm-link`
        * `jsipfs object patch set-data`
        * `jsipfs object put`
        * `jsipfs object stat`
        * `jsipfs pin add`
        * `jsipfs pin ls`
        * `jsipfs pin rm`
        * `jsipfs resolve`
        * Note: these two MFS commands _already_ implement the `--cid-base` option:
        * `jsipfs files ls`
        * `jsipfs files stat`
    * A `?cid-base=` query option has been added to the following **HTTP endpoints**:
        * `/api/v0/bitswap/wantlist`
        * `/api/v0/bitswap/stat`
        * `/api/v0/bitswap/unwant`
        * `/api/v0/block/put`
        * `/api/v0/block/stat`
        * `/api/v0/add`
        * `/api/v0/ls`
        * `/api/v0/object/new`
        * `/api/v0/object/get`
        * `/api/v0/object/put`
        * `/api/v0/object/stat`
        * `/api/v0/object/links`
        * `/api/v0/object/patch/append-data`
        * `/api/v0/object/patch/set-data`
        * `/api/v0/object/patch/add-link`
        * `/api/v0/object/patch/rm-link`
        * `/api/v0/pin/ls`
        * `/api/v0/pin/add`
        * `/api/v0/pin/rm`
        * `/api/v0/resolve`
    * A `cidBase` option has been added to the following **core functions**:
        * `resolve`
    * **NOTE** Using the CID base option in `bitswap`, `dag` and `object` APIs **WILL NOT** auto upgrade your CID to v1 if it is a v0 CID and **WILL NOT** apply the encoding you specified. This is because these APIs return IPLD objects with links and changing the version of the links would result in a different hash for the node if you were to re-add it. Also, the CID you used to retrieve the node wouldn't actually refer to the node you got back any longer. [Read this](https://github.com/ipfs/go-ipfs/issues/5349#issuecomment-445104823) for further context.

# ❤️ Huge thank you to everyone that made this release possible

By alphabetical order, here are all the humans that contributed to the release:

- ...

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/team-mgmt/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.
