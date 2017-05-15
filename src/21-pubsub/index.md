---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: 25-pubsub

breadcrumbs:
  - {name: "Take a look at pubsub on IPFS", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2017-05-16

# this is the Title
title: Take a look at pubsub on IPFS

# this is the name of the main author(s)
author: Jeromy Johnson

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

To make IPFS fast for datacenters, local area networks, and large p2p
applications, we need a fast publish-subscribe system. [Publish-Subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern),
called 'pubsub' for short, is a pattern often used to handle events in
large-scale networks. 'Publishers' send messages classified by topic or content and
'subscribers' receive only the messages they are interested in, all without direct
connections between publishers and subscribers. This approach offers much greater
network scalability and flexibility.

We have recently merged a simple, experimental pubsub implementation into go-ipfs.
The implementation is very far from the performance and security levels we expect
from our long-term target. But already, this feature allows for some very useful and interesting new applications.

In this post, I will explain how to get started using `ipfs pubsub` and share some
current and future examples of applications.

## Getting started with ipfs pubsub
First, you'll need to enable the pubsub code. Make sure you're running a recent version
of go-ipfs, or try out the pre-built floodsub binaries up on the [distributions
page](https://dist.ipfs.io/go-ipfs/floodsub-2). Once you have that version of
ipfs installed, start the daemon with:

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

Now, any messages for the topic `foo` will be printed to your console.

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

To see all the your peers with pubsub enabled, check the output of:
```sh
> ipfs pubsub peers
```

To see all the topics you are currently subscribed to, run:
```sh
> ipfs pubsub ls
```

## Applications
With pubsub, the possibilities for distributed apps on ipfs really start to open
up. The first thing we did was to integrate it into [Orbit](https://github.com/haadcode/orbit).
This allows Orbit to provide a fully distributed, peer-to-peer chat without *any* server anywhere. 

In the near future, IPNS records will be pushed over pubsub, allowing lightning fast
updates of peers' IPNS entries. Peers could use pubsub to track the head of a
[merkle-linked global log](https://en.wikipedia.org/wiki/Blockchain_(database)).
Pubsub could also be used to broadcast notifications to people in a social network, or
send updates in multiplayer games.

## What's next?
The next two areas of focus for ipfs pubsub are authentication and message routing.

Currently, any peer can publish to any pubsub topic. We plan to implement an authenticated mode for
pubsub topics, where only authorized peers -- those given a cryptographic key or capability -- can
publish messages. We are still working out the sharing and capability granting model.

After that, we plan to improve the message routing algorithms.
The current routing algorithm floods messages to every subscriber, resulting in
some peers receiving the same message multiple times. Finding a better routing
algorithm would go a long way towards reducing that overhead.

Please note this can be quite bandwidth intensive, and it is intended as a 
first pass approach. It works well for apps with few peers in the group, but
does not scale. We obviously will improve the underlying algorithms for larger
use cases, but we wanted to ship this now so you can get started using it for
your applications, just like we are using it for Orbit.

## Enjoy!
All that said, we hope you give `ipfs pubsub` a try. You can head over to the [Discussion Forum](https://discuss.ipfs.io/categories) to ask questions, get help, or simply let us know how it goes.
