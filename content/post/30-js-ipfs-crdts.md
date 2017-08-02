---
date: 2017-08-01
url: 30-js-ipfs-crdts
title: Decentralized Real-Time Collaborative Documents - Conflict-free editing in the browser using js-ipfs and CRDTs
author: Pedro Teixeira
---

With the introduction of [IPFS PubSub](https://ipfs.io/blog/25-pubsub/), IPFS gained the ability to broadcast updates in real-time to other nodes in the network that have subscribed to a shared topic. This powerful construct has some shortcomings such as delivery guarantees or message order. However, it is possible to create a higher level data structure that solves these problems for us. Enter [CRDT, Conflict-Free Replicated Data Types](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type).

## Enter CRDTs, Conflict-Free Replicated Data Types

CRDT are one of the hot interesting topics in distributed systems. They provide a conflic-free manner of replicating data across multiple nodes without ever having to elect a leader or use another type of centralized authority to reach consensus. In fact, they don't even require the nodes to be connected at the same time to reach the same state.

[CRDTs were first introduced in 2011](https://link.springer.com/chapter/10.1007%2F978-3-642-24550-3_29) by Carlos Baquero, Nuno Preguiça, Marek Zawirski and Marc Shapiro. You can learn more about CRDTs in the [IPFS research collaborative notebook on CRDTs](https://github.com/ipfs/research-CRDT).

By forming ad-hoc sets of nodes and using CRDTs, nodes can come in and out of a cluster, and participate in a higher level protocol.

## Use case: Collaborative Text Editor

One set of these use cases are when nodes need to collaborate in writing on a shared data structure. Moving away from centralized services into truly distributed peer-to-peer systems that are not controlled by a single entity is a necessity. Relying on a few private entities to control the the content and delivery of the web is not safe nor scalable.

In [this 10-minute video](https://www.youtube.com/watch?v=-kdx8rJd8rQ) I show you how we can use the IPFS library and conflict-free replicated data types (CRDTs) to build a simple text editor that allows several peers to collaborate in real-time in a way that is conflict-free, supports offline use, allows nodes to come in and out of the network, but still is able to converge to a single state in all the peers.

[![https://www.youtube.com/watch?v=-kdx8rJd8rQ](https://user-images.githubusercontent.com/1211152/28122513-4cbdaabc-6716-11e7-8626-ad8154687fe1.png)](https://www.youtube.com/watch?v=-kdx8rJd8rQ)

## Final remarks

Real-time collaborative applications as a whole are in their infancy, but I believe that in the future they will be the norm. This in itself will be a huge challenge since, in reality, the majority of the devices are poorly connected, relying on (often mobile) networks that offer little to no reliability.

Even if the underlying network is not reliable, any node should be able to perform changes in a shared data structure and, somehow, the system should be able to converge these changes into all participating nodes. Nodes should be able to enter and leave the network (either by their own will or because of network conditions), but the system should make sure that this does not lead to losing data or threatening convergence.

What protocols and data structures will allow participating users and their nodes to form ad-hoc networks for spontaneous or planned real-time collaboration without any centralized coordination?

Peer-to-peer networks can rely on special replicated data types that are distributed and conflict-free, and were built specially for these scenarios.

If you're interested in this subject and / or would like to learn more, I invite you [to join the conversation in the research-CRDT repository](https://github.com/ipfs/research-CRDT), poke around in the available articles and lectures and contribute.
