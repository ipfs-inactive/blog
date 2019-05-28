---
date: 2019-04-23
url: 84-ipfs-weekly-39
tags: weekly
title: IPFS Weekly 39
author: Jenn Turner
---

## Welcome to the IPFS Weekly. 👋

The [InterPlanetary File System (IPFS)](https://ipfs.io/) is a new hypermedia distribution protocol, addressed by content and identity. IPFS enables the creation of completely distributed applications. It aims to make the web faster, safer, and more open. Since that’s a pretty large scope, we track development across the ecosystem in this weekly dispatch.

Looking to get involved? Click on some of the links below, see what we’re up to on [GitHub](https://github.com/ipfs), or join us on [IRC](https://riot.im/app/#/room/#ipfs:matrix.org).

Want this update in your inbox? [Subscribe to our weekly newsletter!](https://tinyletter.com/ipfsnewsletter)

Here are some of the highlights since the last IPFS Weekly.


## The latest

### go-ipfs 0.4.20 released
Highlights from the latest release of the Go implementation, go-ipfs, include support for Docker commands, a major WebUI release, some improved *and* new commands, plus perf and reliability improvements. Read the full release notes on [the IPFS blog](https://blog.ipfs.io/83-go-ipfs-0-4-20/).


### Introducing IPFS-lite: embeddable, lightweight IPFS-network peer for IPLD applications
Last week, Hector Sanjuan shared [IPFS-lite](https://github.com/hsanjuan/ipfs-lite), an embeddable, lightweight IPFS-network peer for IPLD applications. It allows to ipfs-ify any libp2p application but also to run lightweight embedded peers that can read and write files to IPFS but not do all the other things. [Read more about IPFS-lite](
https://discuss.ipfs.io/t/ipfs-lite-embeddable-lightweight-ipfs-network-peer-for-ipld-applications/5237).


### go-ds-crdt: A distributed key-value store implementation for IPFS
[go-ds-crdt](https://discuss.ipfs.io/t/go-ds-crdt-a-distributed-key-value-store-implementation-for-ipfs/5239) is the new datastore backend for the IPFS Cluster shared state. go-ds-crdt provides a distributed key-value store using CRDTs and implements the Datastore interface. The idea is that any datastore can now be replaced by a replicated datastore. [Read more about go-ds-crdt](https://github.com/ipfs/go-ds-crdt).


### Storage Driver: Add an IPFS driver
Earlier this week, Docker received [a pull request](https://github.com/docker/distribution/pull/2906) to add an IPFS storage driver to the Docker registry. The pr would allow for a swarm of Docker registries to share an underlying, content-addressed storage layer out of the box. Pretty exciting stuff!


## Meet Pedro Santos, developer of Discussify

Next week, [the IPFS Weekly call](https://github.com/ipfs/team-mgmt#-ipfs-weekly-call--formerly-known-as-ipfs-all-hands-call) welcomes [Pedro Santos](https://github.com/pedromiguelss), a front-end developer holding Advanced Studies (3rd cycle) in Informatics Engineering (having already completed his first year in the Doctoral Program in Informatics Engineering). Pedro graduated in Computer Engineering from the Integrated Masters in Informatics and Computing Engineering, at the Faculdade de Engenharia da Universidade do Porto (FEUP). Pedro is joining the weekly call to present a walkthrough on [IPFS and Discussify’s browser extension app](https://github.com/ipfs-shipyard/discussify-browser-extension). Don’t miss it!

## IPFS in the wild
*Do you follow [IPFS on Twitter](https://twitter.com/IPFSbot)? For the latest mentions of IPFS in the news, check our Twitter feed or see the [latest articles on Awesome IPFS](https://awesome.ipfs.io/categories/articles/).*

+ [IPSE: A Safe Search Engine Based On IPFS and Blockchain](https://medium.com/@ipse_io/ipse-a-safe-search-engine-based-on-ipfs-and-blockchain-91b7b4644a3c), 19 Apr 2019
+ [Make A Discord Bot That Can Upload, Pin, and Search IPFS](https://medium.com/@rtradetech/make-a-discord-bot-that-can-upload-pin-and-search-ipfs-7ec59c070cda), 17 Apr 2019
+ [Aragon Network IPFS Pinning](https://forum.aragon.org/t/aragon-network-ipfs-pinning/824/14), 15 Apr 2019
+ SLIDES: [libp2p](https://slides.com/ryotakogaenzawa/deck-a513a966-bccb-4dc0-a44a-aad0a9353d7b#/), Ryota Kogaenzawa, 15 Apr 2019
+ [What do you think about this idea of a self contained docker image for blogging on IPFS?](https://twitter.com/Smashnet/status/1115627495964008449) Nicolas Inden, 9 Apr 2019


## Updates and new releases
*See the latest releases of IPFS tools and projects across the ecosystem.*

+ qri (“query”) is versioned, scriptable, exportable, collaborative datasets and [version 0.7.1](https://github.com/qri-io/frontend/releases/tag/v0.7.1) is out now.
+ The [Textile team](https://www.textile.photos/) recently shipped the latest [Textile Update | March 2019](https://medium.com/textileio/textile-update-march-2019-5da0c1581d3e).


![](https://ipfs.io/ipfs/Qmd11gtyigpCjo4MfzXuj9MKuMF3Dj1EZEvbNRZeQE1jd4)

## Join us at the first ever IPFS Camp

[IPFS Camp](https://blog.ipfs.io/72-ann-ipfs-camp/) is taking place June 27th-30th in beautiful Barcelona. Meet the core developers and contributors to the IPFS project, community leaders, and builders on of the Distributed Web, but only if you register to attend. [Registration is open now!](https://camp.ipfs.io/)


## Coming up in the Community
*Did you know IPFS has a community forum at [discuss.ipfs.io](https://discuss.ipfs.io/)? Sign up to participate in discussions about coding, tutorials, see announcements and learn about upcoming community events.*


+ **24 Apr 2019:** Introducing [Hackboat](https://hackboat.org/), an afternoon cruise along the beautiful Willamette river while enjoying awesome infosec presentations, Portland, Oregon.
+ **25 Apr 2019:** [Diving into the Decentralized Web: ProtoSchool Learns IPFS!](https://www.meetup.com/ProtoSchool-Seattle-Learn-to-Make-the-Decentralized-Web/events/259938521) What is the decentralized web? What is it good for, and how does it work? Let’s find out together! Seattle, Washington.
+ **2 May 2019:** [Munich IPFS User Group](https://www.meetup.com/de-DE/Munich-IPFS-User-Group/events/259762490/): [Pierre Krieger](https://twitter.com/tomaka17) from [parity](https://www.parity.io/) talks about Rust libp2p.
+ **2-3 May 2019:** [Uphill Conf](https://uphillconf.com/) – The inspiring frontend conference on top of beautiful mount Gurten, Bern Switzerland.
+ **17-18 May 2019:** [Data Terra Nemo](https://dtn.is/) is a technical conference about decentralized protocols and the software built on top of them, Berlin, Germany.
+ **22 June 2019:** [Commit Porto '19](https://commitporto.com/) is a tech conference that brings together professionals who tackle challenges in software development with the latest technologies, Porto, Portugal.

## Thanks for reading ☺️

That’s it for this week’s news on all things IPFS. If we missed something, [reply to this email](mailto:newsletter@ipfs.io) and let us know! That way we can feature you in next week’s edition.
