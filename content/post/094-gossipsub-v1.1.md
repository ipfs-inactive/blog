---
date: 2020-05-20
url: 2020-05-20-gossipsub-v1.1
title: Gossipsub v1.1 brings hardening extensions to PubSub 
author: David Dias
header_image: 094-gossipsub-v1.1-headerimage.jpeg
tags: ipfs, libp2p, pubsub, gossipsub
---

<p style="max-width:780px;margin-left:auto;margin-right:auto;">
  <img src="/header_images/094-gossipsub-v1.1-headerimage+grid.jpeg">
</p>

The gossip you’ve heard on the streets is correct, Gossipsub v1.1 is here and it packs several security hardening extensions along with new testing, documentation, and an updated specification.

The Gossipsub Task Force has been hard at work exploring and analyzing various attack vectors on public and permissionless messaging networks. With that knowledge, we’ve crafted and iterated on mitigating strategies to make our beloved libp2p PubSub Router work in adversarial environments. The result is Gossipsub v1.1 🚀

If you are new to [libp2p PubSub](https://libp2p.io/) and especially Gossipsub, we recommend checking out the [**Gossipsub v1.1 talk at the Matrix Virtual Meetup**](https://research.protocol.ai/blog/2020/gossipsub-v1.1-at-open-tech-will-save-us-virtual-event). It will give you the complete motivation and background of libp2p PubSub and introduce you to Gossipsub v1.1.

## 🔍 What is Gossipsub v1.1

The main focus for Gossipsub v1.1 is **security**. In addition, to the speedy message propagation guarantees from v1.0, this new version features several hardening extensions that make Gossipsub more resilient to a wide range of attacks. Some highlights include:

**1) [Peer scoring](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md#peer-scoring)**: Peers now monitor their directly-connected neighbours using a score function that reflects the peer’s usefulness. Well-behaving peers are kept in the mesh, while badly-behaving ones are dropped in order to protect the network from malicious actors.

**2) [Adaptive gossip dissemination](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md#adaptive-gossip-dissemination)**: In this new version, you can adjust the `gossip factor` to control the number of peers your node gossips with. This enables you to increase/decrease the amount of gossip, while keeping a baseline.

**3) [Opportunistic Grafting](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md#opportunistic-grafting)**: A new mechanism used to cherry pick well-behaving peers that are currently not part of a node’s mesh. Those well-behaving peers are then opportunistically inserted into the mesh to improve the median score of participating peers. 

**4) [Prune Peer eXchange](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md#prune-backoff-and-peer-exchange)**: Prune Peer exchange gives a node a set of recommended peers to connect when it gets dropped from another peer’s mesh, helping reduce the dependency on ambient peer discovery mechanisms.

**5) [Extended Message Validators](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md#extended-validators)**: You can now add your custom message validator so that you can instrument Gossipsub to recognize (accept/reject) which messages are valid/invalid within the context of your application.

**6) [Outbound Mesh Quotas](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md#outbound-mesh-quotas)**: In v1.0 mesh peers are randomly selected, without any weight given to the direction of the connection. In contrast,  v1.1 implements outbound connection quotas, so that a peer tries to always maintain a number of outbound connections in the mesh.

The blend of these security measures, together with the properties of the “gossiping mesh” check the two most important boxes for message propagation protocols in permissionless networks, namely: i) fast message propagation, ii) security against attacks that attempt to degrade the quality of the service provided by the network.

All of these upgrades can be consulted in the [Gossipsub v1.1 specification](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/README.md), which if you ask us, it is a joy to read!

Additionally, with the new release, the [reference implementation of Gossipsub](https://github.com/libp2p/go-libp2p-pubsub) got additional documentation and test coverage.
 
## 🏎 Give Gossipsub v1.1 a test ride

### Chat application example

We’ve prepared a brand new example for you to give the latest Gossipsub a try. In this example, you get to experiment with a chat application powered by libp2p. It will enable you to join different channels by subscribing to PubSub topics and see other peers joining the room as they subscribe to the topic.

<p style="max-width:780px;margin-left:auto;margin-right:auto;">
  <img src="https://raw.githubusercontent.com/libp2p/go-libp2p-examples/master/pubsub/chat/chat-example.gif">
</p>

You can find the code for this example at https://github.com/libp2p/go-libp2p-examples/tree/master/pubsub/chat

### Test Gossipsub’s performance with Testground

We are also releasing a brand new libp2p Test Plan that uses [Testground](https://github.com/testground/testground) to benchmark Gossipsub v1.1.

<p style="max-width:780px;margin-left:auto;margin-right:auto;">
  <img src="/img/gossipsubv1.1-jupyter.gif">
</p>

With this Test Plan, you can run an emulation (yes, it will run real Gossipsub nodes!) of a Gossipsub Network in which you can adjust:

- The number of nodes
- The latency of each link and the jitter %
- The length of the run
- The bandwidth available to each link

To play with this Test Plan, check the instructions at https://github.com/libp2p/test-plans/tree/master/pubsub. 

## 🎁 We are preparing something more for you

We’ve worked with networking, P2P, and security researchers to create this iteration of Gossipsub v1.1 and we’ve been cooking a comprehensive analysis report to share with you on our approach and how we evaluated our mitigation strategies. We are shooting to share this report in June, stay tuned!

That’s it for now. Hope you enjoy the release and happy gossiping!

**The Gossipsub Task Force** - David Dias, Dmitris Vyzovitis, Yiannis Psaras, Yusef Napora, Dirk McCormick
