---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: 21-pubsub

breadcrumbs:
  - {name: "Take a look at pubsub on IPFS!", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2016-11-09

# this is the Title
title: Take a look at pubsub on IPFS!

# this is the name of the main author(s)
author: Jeromy Johnson

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

To make IPFS fast for datacenters, local area networks, and large p2p
applications, we need a fast publish subscribe system. [Publish
Subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern),
called 'pubsub' for short, is a mechanism for 'publishers' to distribute
messages quickly and directly to 'subscribers' that are interested in them.
This is valuable because it decouples the publishers from the subscribers,
so that data can still flow if a publisher goes down, or if there are no
immediate users. This allows for network resiliency, and better scalability
than the traditional server model. A pubsub system also opens the door for,
among other use cases, applications that can want to harness dynamic data on
top of IPFS.

Before going down the road of implementing a new pubsub system, we did a fairly
extensive review of as much pubsub literature and research as we could find. We
are planning on doing a writeup on this process soon, but we've been pretty
busy implementing the system itself up to now.

We have recently merged a simple, experimental pubsub implementation into go-ipfs.  While
the implementation is experimental, and is by no means as performant or secure
as our imagined 'final' implementation, this new feature does allow for some
very fun new applications to be developed. In this post I will explain how to
get started using `ipfs pubsub` and give some example applications that can and
have been built using it.

First off, to enable the pubsub code, make sure you're running a recent version
of go-ipfs, or try out the pre-built floodsub binaries up on [the distributions
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
This means that if peers A,B, and C are all subscribed to `foo`, A is connected
to B, and B is connected to C, but A is not directly connected to C, A will
still receive messages that C published to `foo` through B. This can be very
useful for routing messages in networks with poor NAT traversal or otherwise
suboptimal connectivity.

To see all the peers you're connected to with pubsub enabled, check the output of:
```sh
> ipfs pubsub peers
```

And to see all the topics you are currently subscribed to, run:
```sh
> ipfs pubsub ls
```

## Apps
Using this, the possibilities for distributed apps on ipfs really start to open
up. The first thing we did once we got this working was integrating it into
[Orbit](https://github.com/haadcode/orbit). This means Orbit can provide fully
distributed, peer-to-peer chat without *any* server anywhere. This also means
that you can chat with Orbit on local area networks without a backbone internet
connection, or in networks with spotty connectivity to the global internet.

Aside from chat, there are many interesting possibilities. In the near future,
IPNS records will be pushed over pubsub, allowing lightning fast updates of
peers' IPNS entries.  Peers could use pubsub to keep track of the head of some
[merkle-linked global log](https://en.wikipedia.org/wiki/Blockchain_(database)).
Pubsub could even be used to [(inefficiently) route IP packets](https://ipfs.io/ipfs/QmUVtpaAUK7rNimRstqhk98PTMEu6PjBfmHBanz3LxRU5p/main.go) between peers.
Any existing web protocol could be tunneled over pubsub with relative ease.


## What's next?
The next steps for pubsub have to do with authentication. Currently, any peer
can publish to any pubsub topic. In the near future, we are going to implement
an authenticated mode of pubsub that allows the selection of peers who are
authorized to publish messages to a topic. This would allow certain use-cases to
have a bit more security around their applications.

After that, we are going to take a look at better message routing algorithms.
The current routing algorithm floods messages to every subscriber, resulting in
some peers receiving the same message multiple times. Finding a better routing
algorithm would go a long ways towards reducing that overhead.

Please note this can be quite bandwidth intensive, and it is intended as a very
first pass approach. It works well for apps with few peers in the group, but
does not scale. We obviously will improve the underlying algorithms for larger
use cases, but we wanted to ship this now so you can get started using it for
your applications, just like we're using it for Orbit.

## Enjoy!
All that said, We hope you give `ipfs pubsub` a try and let us know how it goes!

