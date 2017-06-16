---
date: 2017-05-17
url: 25-pubsub
title: Take a look at pubsub on IPFS
author: Jeromy Johnson
---

We recently merged a simple, experimental pubsub implementation into IPFS. This
implementation is just a beginning. It is far from the performance and security goals
we will achieve in our long-term target. However, even this early implementation opens
the doors to several useful and interesting new applications.

In this post, I will point out some applications of this technology, show how to
get started started using `ipfs pubsub`, and discuss upcoming improvements.

## Why pubsub?
[Publish-Subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern),
called 'pubsub' for short, is a pattern often used to handle events in
large-scale networks. 'Publishers' send messages classified by topic or content and
'subscribers' receive only the messages they are interested in, all without direct
connections between publishers and subscribers. This approach offers much greater
network scalability and flexibility.

Some applications include collaborative document editing, "dynamic" website
content, chat applications, multiplayer games, continuously evolving datasets,
and webservice workers passing around messages. It gives us ways to make IPFS fast
for large-scale networks such as datacenters, local area networks, and large p2p
applications. In the near future, IPNS records will be pushed over pubsub, allowing
lightning fast updates of peers' IPNS entries. Peers could use pubsub to track the
head of a [merkle-linked global log](https://en.wikipedia.org/wiki/Blockchain).

## Getting started with pubsub for go-ipfs
*Note: There is also a js-ipfs implementation of pubsub. Documentation will come soon.*

First, you'll need to enable the pubsub code. Make sure you're running go-ipfs 0.4.5 or
above. Once you have that version of ipfs installed, start the daemon with:

```sh
> ipfs daemon --enable-pubsub-experiment
```

This will tell ipfs to create and enable the pubsub service. It also implies
that you will only be able to use pubsub with other peers who choose to enable
it.

To subscribe to the topic `foo`, run:
```sh
> ipfs pubsub sub foo
```

Now, any messages for the topic `foo` will print to your console.

To publish a message to the topic `foo`, open up another terminal and run:
```sh
> ipfs pubsub pub foo "hello world"
```

You should see "hello world" printed out in the first terminal.  You can also
run the `pub` command on any other connected ipfs node and your node will
receive the message.  Messages are routed through connected, subscribed peers.
This means that if peers A, B, and C are all subscribed to `foo`, A is connected
to B, and B is connected to C, but A is not directly connected to C, A will
still receive messages that C published to `foo` through B. This can be very
useful for routing messages in networks with poor NAT traversal or otherwise
suboptimal connectivity.

To see all peers with pubsub enabled, check the output of:
```sh
> ipfs pubsub peers
```

To see all the topics you are currently subscribed to, run:
```sh
> ipfs pubsub ls
```

## Pubsub in the wild
As an example, we have integrated pubsub into [Orbit](https://github.com/orbitdb/orbit).
This allows Orbit to provide a fully distributed, peer-to-peer chat without *any*
server anywhere. We are also actively working to put Conflict-Free Replicated Data
Types (CRDTs) on IPFS pubsub using libraries like Y.js and swarm.js.

Together, pubsub and CRDTs open new doors for collaborative editing of distributed
content. We are working with [@edsilv](https://github.com/edsilv) and
[@aeschylus](https://github.com/aeschylus) to prepare a demo of IPFS in two
[IIIF](http://iiif.io/about/) image viewers
[#240](https://github.com/ipfs/notes/issues/240). This will showcase how to
collaboratively annotate images from repositories dispersed around the world.
The demo will take place at the [IIIF 2017 Conference](https://2017iiifconferencethevatican.sched.com/event/AChW/presentation-interoperable-peer-to-peer-research-with-iiif-and-ipfs-room-5.0) in The Vatican.
We will publish a video of the demo, along with all of the code.

## What's next?
The next two areas of focus for IPFS pubsub are authentication and message routing.

Currently, any peer can publish to any pubsub topic. We plan to implement an
authenticated mode for pubsub topics, where only authorized peers — those given a
cryptographic key or capability — can publish messages. We are still working out
the sharing and capability granting model.

After that, we plan to improve message routing. The current routing algorithm
floods messages to every subscriber, resulting in some peers receiving the same
message multiple times. We affectionately call this approach "floodsub". We plan
to replace it with a more efficient routing algorithm, which will go a long way
towards reducing overhead and improving scalability.

Please note that this is a simple first-blush implementation of the technology.
It has known limitations that we will address in future iterations. As it is
today, the pubsub implementation can be quite bandwidth intensive. It works well
for apps with few peers in the group, but does not scale. We have designed a more
robust underlying algorithm that will scale to much larger use cases but we wanted
to ship this simple implementation so you can begin using it for your applications.

## Enjoy!
All that said, we hope you give `ipfs pubsub` a try. You can head over to the
[Discussion Forum](https://discuss.ipfs.io/categories) to ask questions, get help,
or simply let us know how it goes.
