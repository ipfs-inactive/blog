---
date: 2019-12-02
url: 2019-12-02-js-ipfs-0-40
title: js-ipfs 0.40.0 released
author: Alan Shaw
---

# 🔦 Highlights

> Migrations are not just for ducks. We're paving the way for the dweb in the browser by laying foundations to switch to a hash format that can be used in URL origins 🛣

## 🦆 New repo migrations tool

Ever worked on an application where you've had to write a database migration? Yeah, us too. Up until now js-ipfs hasn't been able to migrate repo's to a new format. Well, that's not strictly true, you could have used the go-ipfs repo migration tool on a repo created when running js-ipfs in Node.js (yes, we have repo compatibility!), but in the browser you were stuck.

..and I mean really stuck, if we'd updated the format of a repo that ships with js-ipfs then your applications would just have to catch an error that the repo version was not compatible. You couldn't use it, and you couldn't upgrade. Bad news bears 🐻.

We had a cunning strategy to avoid this situation - do not change the repo 😂, but this is rapidly becoming unsustainable since we actually want to add a migration to achieve our dream of [base32 encoded v1 (by default) CIDs](https://github.com/ipfs/js-ipfs/issues/1440).

Good news friends! The new version of js-ipfs now ships with a repo migration tool that'll automatically migrate repo's in the browser. So now all our ducks are in a line, stay tuned for a migration and a switch to v1 CIDs ✨!

## 🎻 base32 encoded CIDs in IPNS paths

My violin strings gently weep for being able to use Peer IDs in a domain, and let me tell you why.

Peer IDs currently cannot be used in a domain name because their string format is `base58` - a case _SENSITIVE_ encoding. In domain names the following are equivalent:

```
QmNib2c1qCVSbp9QPT81RmDSg3n8kFgPsMCdj4gpveJESE
qmnib2c1qcvsbp9qpt81rmdsg3n8kfgpsmcdj4gpvejese
QMNIB2C1QCVSBP9QPT81RMDSG3N8KFGPSMCDJ4GPVEJESE
```

So, bad times.

...but wait, Peer IDs _ARE_ CIDs! I know, weird, but also rad because in theory we should be able to re-encode them as `base32`. Right now though, everything expects a `base58` encoded string (a v0 CID) because they're actually just a multihash.

In this js-ipfs release we've made a small change to allow you to take your Peer ID (a v0 CID), convert it to a base32 encoded v1 CID and use it in an IPNS path like `/ipns/bafybeidta3hkxk3ihxfsk765oswgsjhmvcnkeestyuov6r2t5tyts4xuoe`. Here's how you might do the conversion:

```sh
jsipfs id | json id | jsipfs cid base32
bafybeidta3hkxk3ihxfsk765oswgsjhmvcnkeestyuov6r2t5tyts4xuoe
```

This is really, seriously cool, because now Peer IDs can be used in domain names and so an IPFS gateway operating at `bafybeidta3hkxk3ihxfsk765oswgsjhmvcnkeestyuov6r2t5tyts4xuoe.ipns.dweb.link` for example, will have origin isolation (hooray for security 🔒) _AND_ IPNS enabled mutable data 🚀⚡️

In the future, new Peer IDs will be v1 CIDs with a [`libp2p-key` codec](https://github.com/libp2p/specs/blob/master/peer-ids/peer-ids.md#libp2p-key-cid) that is `base32` encoded by default...but that's a change for another day.

## 🌲 Implemented `dag put` and `dag resolve` CLI commands

These have been available in core for a while now and we finally got round to surfacing them in the CLI. e.g.

```console
$ jsipfs dag put '""IPLD RULEZ""'
bafyreia5coklfzblgd3reqwaieafmpasdceqmcnjrowre3623mtb4nxlhm

$ jsipfs dag put '{"to": {"/": "bafyreia5coklfzblgd3reqwaieafmpasdceqmcnjrowre3623mtb4nxlhm"}}'
bafyreiequnkfflujkwhxk6wud5w64hmijdqdmx7p55fgrbiizw32kdrb7e

$ jsipfs dag put '{"path": {"/": "bafyreiequnkfflujkwhxk6wud5w64hmijdqdmx7p55fgrbiizw32kdrb7e"}}'
bafyreidgfdsoupe747qnjzkjk2yirgv76wr4drev3i7kv6dht4dkypusze

$ jsipfs dag resolve bafyreidgfdsoupe747qnjzkjk2yirgv76wr4drev3i7kv6dht4dkypusze/path/to
bafyreia5coklfzblgd3reqwaieafmpasdceqmcnjrowre3623mtb4nxlhm

$ jsipfs dag get bafyreia5coklfzblgd3reqwaieafmpasdceqmcnjrowre3623mtb4nxlhm
IPLD RULEZ
```

# 🏗 API Changes

* `dag.put` got a `pin` option to save you from calling the pin API separately (and potentially losing your node if GC runs inbetween!)

# ❤️ Huge thank you to everyone that made this release possible

<Generated contributor list>

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-ipfs repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at https://discuss.ipfs.io/ and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](https://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
