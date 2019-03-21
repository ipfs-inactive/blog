---
date: 2019-01-28
url: 67-crdt-research-meetup
tags: crdt research meetup videos ipfs
title: 2018 CRDT Research Meetup - Lisbon
author: Pedro Teixeira
---

We hosted the first Lisbon CRDT Research Meetup on April 2018. It was a brilliant event with the presence of many of the authors of the CRDT research literature and representatives from the Labs it originated, namely: [HASLab](https://haslab.uminho.pt/), [NOVA-LINCS](http://nova-lincs.di.fct.unl.pt/), [FCT](https://www.fct.unl.pt/), [UMinho](https://uminho.pt/), [UNL](https://www.unl.pt/).

[CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) stand for Conflict-free Replicated Data Types and are a mathematical framework and building block that allows different replicas to cooperate without requiring coordination, making them very useful for creating eventually consistent data layers over intermittent and unreliable networks. For instance, CRDTs make sure that, no matter the order of the messages exchanged, all the peers eventually converge to the same state.

([You can read more about CRDTs here](https://github.com/ipfs/research-CRDT))

So, taking the opportunity of having some of The IPFS team in Lisbon, we had the pleasure of hosting some researchers in this field for one day of presentations and discussions. Here are some videos of some of the sessions that happened during this meetup. Enjoy!

## Vitor Enes - Borrowing an Identity for a Distributed Counter

[![Watch video](img/video1.png)](https://www.youtube.com/watch?v=rGfbcu7UkGk)

In this presentation, Vitor Enes, a PhD student from HasLab, presented a design he co-authored for avoiding the identity explosion in state-based CRDTs.

After a quick introduction to the need for CRDTs (replication, availability and latency), Vitor dives down in the implementation of a distributed counter, while explaining the need for keeping track of the replica identity inside the CRDT state.

Having an entry per replica in the system does not scale, because the state will forever be poisoned with the replica identity. Unless we do something about it…

## Nuno Preguiça - AntidoteDB and more

[![Play video](img/video2.png)](https://www.youtube.com/watch?v=-v_1aJJujdg)

When using geo-replicated databases, there is a first wave of databases that are eventually consistent (like Cassandra and Riak) that offer high availability but little automation to deal with concurrency. Lately, second-generation DBMSs like Spanner and CosmosDB offer strong consistency guarantees, but at the necessary expense of availability in the face of network partitions.

AntidoteDB aims to be highly available while still provide strong consistency semantics. For operations that span into multiple data operations, AntidoteDB implements highly available transactions by using snapshot reads and atomic updates, guaranteeing that clients always see consistent states. Also, AntidoteDB can provide causal consistency without requiting coordination between replicas.

What about numeric invariants? How can you guarantee, for instance, that, in a given bank account, the global balance can never be less than 0? Typically, in eventually consistent databases this would not be possible, as it would require coordination between replicas. A solution for this that AntidoteDB implements is to implement a bounded counter where coordination can happen outside of the transaction execution path and without requiring global coordination.

## Ali Shoker - As Secure as Possible Eventual Consistency

[![play video](img/video3.png)](https://www.youtube.com/watch?v=ip2XhudTEGE)

CRDTs and Strong Eventual Consistency gives us the guarantee that all replicas will eventually converge, but this may only be true depending on your fault model. If, for instance, a replica fails to apply an operation (due to a bug, a hardware failure or malicious code, for instance), the system is not guaranteed to converge.

By providing a Byzantine Fault Tolerant (BFT) Cluster to which you push the CRDT operations from the multiple replicas, this cluster can be used to reach consensus on the state and produce a certificate of that state to the client, without compromising availability or the strong eventually consistency guarantees.

Clients can then opt into using the more secure BFT certificate (with the compromises on availability) or simply just continue using the eventually consistent model that has better availability guarantees (but compromises on security).

## Evan Miyazono - Protocol Labs RFP Program

[![play video](img/video4.png)](https://www.youtube.com/watch?v=PkjfwmFe75s)

Evan Miyazono, captain of the research team at Protocol Labs (PL), provides an overview of the PL approach to external research, and describes the PL Request For Proposals (RFP) and grant program.
