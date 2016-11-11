---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: 21-pubsub

breadcrumbs:
  - {name: "Take a look at pubsub on ipfs!", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2016-11-09

# this is the Title
title: Take a look at pubsub on ipfs!

# this is the name of the main author(s)
author: Jeromy Johnson

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

We are very excited to announce that we have recently merged a simple,
experimental pubsub implementation.  While the implementation is experimental,
and is by no means as performant or secure as our imagined 'final'
implementation, this new feature does allow for some very fun new applications
to be developed. In this post I will explain how to get started using `ipfs
pubsub` and give some example applications that can and have been built using
it.

First off, to enable the pubsub code, make sure you're running a recent version
of go-ipfs, or try out the pre-built floodsub binaries up on [the distributions
page](https://dist.ipfs.io/go-ipfs/floodsub-2). Once you have that version of ipfs installed, start the daemon with:

```sh
> ipfs daemon --enable-pubsub-experiment
```

This will tell ipfs to create and enable the pubsub service. It also implies that you will not be able to use pubsub with other peers who are not running with pubsub enabled.

To subscribe to the topic "foo", run:
```sh
> ipfs pubsub sub foo
```

Now, any messages for the topic "foo" will be printed to your console.

To publish a message to the topic "foo", open up another terminal and run:
```sh
> ipfs pubsub pub foo "hello world"
```

You should see "hello world" printed out in the first terminal.  You can also
run the `pub` command on any other connected ipfs node and your node will
receive the message.  Messages are routed through connected, subscribed peers.
This means that if peers A,B, and C are all subscribed to foo, A is connected
to B, and B is connected to C, but A is not directly connected to C, A will
still receive messages that C published to "foo" through B. This can be very
useful to route messages in networks with poor NAT traversal or otherwise
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
Using this, the possibilties for distributed apps on ipfs really start to open
up. The first thing we did once we got this working was shove it into
[Orbit](https://github.com/haadcode/orbit). Allowing Orbit to provide fully
distributed, peer to peer chat without *any* server anywhere. This also means
that you can chat with orbit on local area networks without a backbone internet
connection, or in networks with spotty connectivity to the global internet.

Aside from chat, there are many interesting possibilities. In the near future,
IPNS records could be pushed over pubsub, allowing lightning fast updates of
peers IPNS entries.  Peers could use pubsub to keep track of the head of some
[merklelinked global log](https://en.wikipedia.org/wiki/Blockchain_(database)).
Pubsub could even be used to (inneficiently) route IP packets between peers,
Any existing web protocol could be tunneled over pubsub with relative ease.


## Whats next?
The next steps for pubsub have to do with authentication. Currently, any peer
can publish to any pubsub topic. In the near future, we are going to implement
a mode of pubsub that allows the selection of peers who are authorized to
publish messages to a topic. This would allow certain usecases to have a bit
more security around their applications.

After that, we are going to take a look at better message routing algorithms.
The current routing algorithm floods messages to every subscriber, resulting in
some peers receiving the same message multiple times. Finding a better routing
algorithm would go a long ways towards reducing that overhead.

## Enjoy!
All that said, We hope you give `ipfs pubsub` a try and let us know how it goes!

