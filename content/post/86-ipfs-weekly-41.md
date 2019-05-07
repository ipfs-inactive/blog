---
date: 2019-05-07
url: 86-ipfs-weekly-41
tags: weekly
title: IPFS Weekly 41
author: Jenn Turner
---

## Welcome to the IPFS Weekly. 👋

The [InterPlanetary File System (IPFS)](https://ipfs.io/) is a new hypermedia distribution protocol, addressed by content and identity. IPFS enables the creation of completely distributed applications. It aims to make the web faster, safer, and more open. Since that’s a pretty large scope, we track development across the ecosystem in this weekly dispatch.

Looking to get involved? Click on some of the links below, see what we’re up to on [GitHub](https://github.com/ipfs), or join us on [IRC](https://riot.im/app/#/room/#ipfs:matrix.org).

Want this update in your inbox? [Subscribe to our weekly newsletter!](https://tinyletter.com/ipfsnewsletter)

Here are some of the highlights since the last IPFS Weekly.

## Meet the Community: Netflix Developer Edgar Lee

With the first-ever IPFS Camp right around the corner, we’re interviewing some of the community members who are making this highly anticipated event a reality.

Haven’t applied yet? Don’t worry! Registration for the 3-day hacker retreat designed for the builders of the Distributed Web is still open! Visit [camp.ipfs.io](https://camp.ipfs.io/) to learn more about IPFS Camp, scholarships, and what’s included in your conference pass. 

### Tell us a bit about yourself and your background. How did you get involved with IPFS?

I work on developer tooling and infrastructure at Netflix and previously worked at Docker on the registry. The Docker Registry stores images as a merkle DAG much like IPFS, but was only granular at the layer level as opposed to file chunks. When I came across Akihiro Suda’s Filegrain proposal to use IPFS as a storage mechanism for container images, I discovered its ecosystem and started experimenting with the technology.

### Why should people be excited about IPFS?

IPFS is exciting because it builds an ecosystem of tools over the concept of content addressable storage. By decoupling what the name of some content represents, and how to get said content, we get powerful properties typically desired in distributed systems.

### What projects are really exciting you in the IPFS Ecosystem at the moment and why?

System package managers, library dependency management, container image registries all have similar requirements. Over time, some of them have individually reinvented content addressable storage and structured their data as a merkle DAG. IPFS’s 2019 roadmap to address package management is the most exciting to me right now, as it presents an opportunity to greatly improve the software landscape for both the decentralization movement, as well as private infrastructure.

### Open Source communities are full of unsung heroes. Is there someone in IPFS community who you admire for their work?

Recently, magik6k and others worked hard on refactoring the IPFS Core API and created a clean HTTP client for IPFS. I use the results of this work extensively for the experiments I’m running so I’m grateful for their work. There’s also a lot of other exciting work like hsanjuan’s IPFS driver for Docker Registry, Stebalien’s work on IPFS itself, among many others.

### What are you most looking forward to at IPFS Camp?

I’m most looking forward to meeting the team behind IPFS, and mind sharing with the community. It’ll also be my first time in Barcelona, so I’m excited to visit the beautiful city.


## IPFS in the wild
*Do you follow [IPFS on Twitter](https://twitter.com/IPFSbot)? For the latest mentions of IPFS in the news, check our Twitter feed or see the [latest articles on Awesome IPFS](https://awesome.ipfs.io/categories/articles/).* 

+ [Building the Firebase for CRDTs](https://medium.com/textileio/building-the-firebase-for-crdts-7dd8dea8953a), Textile, 3 May 2019
+ [Filling in the GraphQL pipeline: Ready-to-use code generation](https://www.onegraph.com/blog/2019/05/03_Filling_in_the_GraphQL_Pipeline_Ready_to_use_code_generation.html), OneGraph, 3 May 2019
+ [Notes on OrbitDB and Textile](https://medium.com/open-work-labs/notes-on-orbitdb-and-textile-55f07db7fb03), Open Work Labs, 2 May 2019
+ [Understanding distributed storage systems on blockchain](https://yourstory.com/2019/04/distributed-data-storage-systems-blockchain), Prashant Shah, 1 May 2019
+ [There’s an ongoing discussion about IPFS-based npm dependencies over on pacote](https://github.com/zkat/pacote/pull/173), 30 Apr 2019
+ [Local-first software, You own your data, in spite of the cloud](https://www.inkandswitch.com/local-first.html), Ink & Switch, April 2019


## Updates and new releases
*See the latest releases of IPFS tools and projects across the ecosystem.*

+ [OpenBazaar, but Fast: New Release Dramatically Improves Speed](https://openbazaar.org/blog/openbazaar-but-fast-new-release-dramatically-improves-speed/). This is a minor release, but delivers substantial improvements to the user experience, such as rapid loading of listings from search.
+ [OrbitDB 0.20.0 released!](https://github.com/orbitdb/orbit-db) It’s the biggest release since OrbitDB was created.
+ [ipfs_cluster_api v0.0.2 (unofficial)](https://github.com/cluster-labs/ipfs-cluster-api) – A JavaScript client library for the IPFS Cluster HTTP API.


## Tools and projects we <3
*[Awesome IPFS](https://awesome.ipfs.io/) is a community maintained and updated list of projects, tools, or pretty much any things related to IPFS that are totally awesome. To see more, or add yours to the list, visit [Awesome IPFS on GitHub](https://github.com/ipfs/awesome-ipfs).* 

+ [Stars Network](https://github.com/PACTCare/Stars-Network), a first draft of research on how to deal with metadata on the web3/dweb on GitHub.
+ [ipfs-deploy npm package](https://discuss.ipfs.io/t/ann-ipfs-deploy-npm-package-helps-deploy-static-websites-to-free-ipfs-pinning-services/5318) helps deploy static websites to free IPFS pinning services.

 
## Coming up in the Community
*Did you know IPFS has a community forum at [discuss.ipfs.io](https://discuss.ipfs.io/)? Sign up to participate in discussions about coding, tutorials, see announcements and learn about upcoming community events.*


+ **9 May 2019:** [Blockchain, Cryptocurrencies & IPFS: revisiting IPFS and Bottle the IPFS Browser](https://www.meetup.com/Blockchain-Cryptocurrencies-Interplanetary-File-System/events/vldkqqyzhbgc/), San Diego, California.
+ **11 May 2019:** [IPFS Shenzhen Meetup & Introducing ProtoSchool Shenzhen Chapter](https://www.meetup.com/Hong-Kong-IPFS-Meetup/events/260780205/), hosted by Hong Kong IPFS, Shenzhen, China.
+ **17-18 May 2019:** [Data Terra Nemo](https://dtn.is/) is a technical conference about decentralized protocols and the software built on top of them, Berlin, Germany.
+ **23 May 2019:** [May p2p // dweb meetup](https://www.meetup.com/p2p-and-dweb-toronto/events/258520223/), hosted by Peer-to-peer and Decentralized Web Toronto and held at Mozilla.
+ **22 June 2019:** [Commit Porto '19](https://commitporto.com/) is a tech conference that brings together professionals who tackle challenges in software development with the latest technologies, Porto, Portugal.
+ **27-30 June 2019:** [IPFS Camp](https://camp.ipfs.io/) is a 3 day hacker retreat designed for the builders of the Distributed Web! Barcelona, Spain.
+ **2-5 August 2019:** [Offline Camp](http://offlinefirst.org/camp/) is a 4-day retreat to explore Offline First development and design in Grants Pass, Oregon. [Learn more about the event here.](https://medium.com/offline-camp/announcing-offline-camp-v5-eb9111fdcc94)


## Thanks for reading ☺️

That’s it for this week’s news on all things IPFS. If we missed something, [reply to this email](mailto:newsletter@ipfs.io) and let us know! That way we can feature you in next week’s edition. 
