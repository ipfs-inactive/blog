---
date: 2017-08-01
url: 30-js-ipfs-crdts.md
title: Decentralized Real-Time Collaborative Documents - Conflict-free editing in the browser using js-ipfs and CRDTs
author: Pedro Teixeira
---

With the introduction of [IPFS PubSub](https://ipfs.io/blog/25-pubsub/), it became possible for IPFS nodes to declare shared _pubsub_ topics, broadcasting updates in real-time to other nodes in the network that have subscribed to the topic. The pubsub pattern is a powerful construct but it does not guarantee delivery of messages and does not guarantee message order. Enter [CRDTs, Conflict-Free Replicated Data Types](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type), a higher level data structure that allows us to overcome these shortcomings.

## Enter CRDTs, Conflict-Free Replicated Data Types

CRDTs are one of the hot interesting topics in distributed systems. They provide a conflict-free manner of replicating data across multiple nodes without ever having to elect a leader or use another type of centralized authority to reach consensus. They even allow nodes to reach the same state without being connected to the network at the same time.

[CRDTs were first introduced in 2011](https://link.springer.com/chapter/10.1007%2F978-3-642-24550-3_29) by Carlos Baquero, Nuno Preguiça, Marek Zawirski and Marc Shapiro. You can learn more about CRDTs in the [IPFS research collaborative notebook on CRDTs](https://github.com/ipfs/research-CRDT).

By forming ad-hoc sets of nodes (ie. using pubsub) and using CRDTs, nodes can come in and out of a cluster and participate in a higher level protocol.

## Use case: Collaborative Text Editor

One set of use cases for CRDTs is when nodes need to collaboratively write to a shared data structure. In the past, this has been achieved by relying on a centralized service to coordinate updates. This centralized approach encourages the wordlwide web to grow in a way that relies on a few private entities to control the the content and delivery of the web. This is neither safe nor scalable. We must move away from centralized services, instead relying on truly distributed peer-to-peer systems that are not controlled by a single entity.

In [this 10-minute video](https://www.youtube.com/watch?v=-kdx8rJd8rQ) I show you how we can use the [js-ipfs](https://github.com/ipfs/js-ipfs) library and conflict-free replicated data types (CRDTs) to build a simple text editor that allows several peers to collaborate in real-time. The resulting interactions between the nodes are conflict-free, support offline use, and allow nodes to come in and out of the network while continuously converging data to a single state in all the nodes.

[![https://www.youtube.com/watch?v=-kdx8rJd8rQ](https://user-images.githubusercontent.com/1211152/28122513-4cbdaabc-6716-11e7-8626-ad8154687fe1.png)](https://www.youtube.com/watch?v=-kdx8rJd8rQ)

## Final remarks

Real-time collaborative applications are in their infancy but in the future they will be the norm. Achieving this will be a huge challenge since, in reality, the majority of the devices on the internet are poorly connected, relying on (often mobile) networks that offer little to no reliability.

Any node should be able to perform changes in a shared data structure even if the underlying network is not reliable. The system should be able to converge these changes into all participating nodes. Nodes should be able to enter and leave the network (either by their own will or because of network conditions) while the system ensures that this does not lead to losing data or threatening convergence.

What protocols and data structures will allow participating users and their nodes to form ad-hoc networks for spontaneous or planned real-time collaboration without any centralized coordination?

Peer-to-peer networks can rely on special replicated data types that are distributed and conflict-free, and were built specially for these scenarios.

If you're interested in this subject and / or would like to learn more, I invite you [to join the conversation in the research-CRDT repository](https://github.com/ipfs/research-CRDT), poke around in the available articles and lectures and contribute.
