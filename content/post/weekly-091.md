---
date: 2020-05-27
url: weekly-91
translationKey: ipfs-weekly-91
tags: weekly
header_image: weekly-newsletter.png
title: IPFS Weekly 91
author: Jenn Turner
---

# Welcome to the IPFS Weekly

Here’s what’s happening lately in the [InterPlanetary File System](https://ipfs.io/) galaxy and beyond! 🚀

## The Road to the New DHT
At the end of April, we released our largest update yet: go-ipfs 0.5.0. This upgrade brought major performance and reliability improvements to IPFS — especially on the content discovery and routing front. We’d like to take you through our journey to re-write the DHT. [Read the full story on the blog](https://blog.ipfs.io/2020-05-19-road-to-dht/). 

## js-ipfs 0.44.0 released 🎉
Last week, we shipped the latest release for js-ipfs, version 0.44.0! Meaning, you can now use AbortControllers to cancel requests in js-ipfs! No more waiting around to see if your request ever completes. Read the changelog post for [full details on the release](https://blog.ipfs.io/2020-05-21-js-ipfs-0-44/).

## It’s true; Gossipsub v1.1 is here
The Gossipsub Task Force has been hard at work exploring and analyzing various attack vectors on public and permissionless messaging networks. With that knowledge, we’ve crafted and iterated on mitigating strategies to make our beloved libp2p PubSub Router work in adversarial environments. [The result is Gossipsub v1.1](https://blog.ipfs.io/2020-05-20-gossipsub-v1.1).

## Top highlights this week
* [Orbit-db 0.24](https://github.com/orbitdb/orbit-db/issues/772#issuecomment-632357888) is out with support for both go-ipfs 0.5 and js-ipfs 0.44
* [go-libp2p v0.9.0](https://github.com/libp2p/go-libp2p/releases/tag/v0.9.0) was released with some long-awaited features: connection gating to accept/deny connections at different stages, decaying peer scoring tags, signed peer records for enhanced security, and more.
* [The second rust-ipfs grant](https://medium.com/equilibriumco/the-road-to-unixfs-f3cf5222b2ef) has been approved, and work has begun on the UnixFS! 
* [ipfs-desktop 0.11.4](https://github.com/ipfs-shipyard/ipfs-desktop/releases/tag/v0.11.4) is now here!
* Under the hood: [AvionDB P2P Syncing](https://simpleaswater.com/aviondb-p2p-sync/)
* Learn all about [Offline Knowledge Hotspots](https://www.youtube.com/watch?time_continue=1&v=K2MF4fvcl70&feature=emb_logo) in the Local Offline Collaboration Monthly meeting 

## Quote of the week
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">My portfolio now also runs on IPFS! <br><br>Thanks to the awesome people <a href="https://twitter.com/FleekHQ?ref_src=twsrc%5Etfw">@FleekHQ</a> my portfolio now has a version available that&#39;s <a href="https://twitter.com/hashtag/Decentralized?src=hash&amp;ref_src=twsrc%5Etfw">#Decentralized</a> at <a href="https://t.co/cA2pof8kjP">https://t.co/cA2pof8kjP</a><a href="https://twitter.com/hashtag/web?src=hash&amp;ref_src=twsrc%5Etfw">#web</a> <a href="https://twitter.com/hashtag/webdevelopment?src=hash&amp;ref_src=twsrc%5Etfw">#webdevelopment</a> <a href="https://twitter.com/hashtag/ipfs?src=hash&amp;ref_src=twsrc%5Etfw">#ipfs</a> <a href="https://twitter.com/hashtag/ipns?src=hash&amp;ref_src=twsrc%5Etfw">#ipns</a> <a href="https://twitter.com/hashtag/blockchain?src=hash&amp;ref_src=twsrc%5Etfw">#blockchain</a> <a href="https://twitter.com/hashtag/dweb?src=hash&amp;ref_src=twsrc%5Etfw">#dweb</a> <a href="https://twitter.com/hashtag/dapp?src=hash&amp;ref_src=twsrc%5Etfw">#dapp</a> <a href="https://twitter.com/hashtag/angular?src=hash&amp;ref_src=twsrc%5Etfw">#angular</a> <a href="https://twitter.com/hashtag/js?src=hash&amp;ref_src=twsrc%5Etfw">#js</a> <a href="https://twitter.com/hashtag/blog?src=hash&amp;ref_src=twsrc%5Etfw">#blog</a> <a href="https://twitter.com/hashtag/portfolio?src=hash&amp;ref_src=twsrc%5Etfw">#portfolio</a> <a href="https://twitter.com/hashtag/forhire?src=hash&amp;ref_src=twsrc%5Etfw">#forhire</a></p>&mdash; M Fletcher🧔🏽| MF Codeworks 🛰️💻 (@mfcodeworks) <a href="https://twitter.com/mfcodeworks/status/1264612556833910784?ref_src=twsrc%5Etfw">May 24, 2020</a></blockquote> 

## People are building the coolest stuff with IPFS
* [Zippie](https://talk.fission.codes/t/how-zippie-uses-dynamic-ipfs-loading-for-a-seamless-mobile-web-experience-carsten-munk-cto-of-zippie/611) uses dynamic IPFS loading for a seamless mobile web experience.
* Over [125,000 IPFS CIDs](https://cyber.page/brain/knowledge) added to [Cybers network](https://cyber.page/search/ipfs) as part of its incentivized tournament, [Game of Links](https://cyber.page/gol), in which users add IPFS CIDs to build a decentralized knowledge graph, which is used by the search engine  
* [Fury](https://github.com/propensive/fury) is an experimental dependency manager and build tool for Scala 
* [Textile](https://github.com/textileio/github-action-buckets/runs/697220495?check_suite_focus=true) updated their GitHub Actions, so the Textile Hub is back on the Github Marketplace!
* [An Introduction to Dwebsites](http://blog.almonit.eth.link/2020-05-21/Introduction_to_Dwebsitse.html) built on IPFS
* [Sapien Wallet](https://medium.com/@sapien.wallet/bash-script-light-wallet-case-624aa04cb216), built on Textile and IPFS 
* [Fleek](https://blog.fleek.co/posts/fleek-storage-sdk-guide) releases their new Storage SDK Cookbook 

## Join us at Distributed Camp 2020
This Friday through Sunday, members of the IPFS, Dat, I2P, WebTorrent communities and more, will gather to talk all things distributed for a special hands-on event: **Distributed Camp 2020**. Enjoy two days of immersive, hands-on workshops where you get to try out some of the latest web technologies for yourself and a Sunday Unconference where you get to learn of other projects in this space as well as show off what you made! [Registration is free](https://distributed.camp/). 

## Are you using (or plan to use) js-ipfs in browser?
Then we want to hear from you! Your input would really help to shape the plan for changes that we hope will improve your and your users' experience. Check out the discussion on [reducing js-ipfs overhead by sharing node across browser tabs](https://discuss.ipfs.io/t/reducing-js-ipfs-overhead-by-sharing-node-across-browser-tabs/8024) now!

## Missed the 0.5 Meetup? Watch the videos now
[Check out the full playlist](https://www.youtube.com/watch?list=PLuhRWgmPaHtQ26F2MIuogvo0so9QUgH1r&v=RxJSUBeqOKU&feature=emb_logo) of presentations from the event, from insights on content routing changes and improvements to the intricacies of Bitswap and subdomain gateways! And don’t forget to watch the lightning talks. Enjoy!

Take care of yourselves and each other. ❤️

Get involved with IPFS by checking us out on [GitHub](https://github.com/ipfs), joining discussions on [our community forum](https://discuss.ipfs.io/), or hitting us up [in chat](https://riot.im/app/#/room/#ipfs:matrix.org). Have a suggestion? [Email us.](mailto:newsletter@ipfs.io)

Get the [IPFS Weekly in your inbox](https://ipfs.us4.list-manage.com/subscribe?u=25473244c7d18b897f5a1ff6b&id=cad54b2230), each Tuesday.
