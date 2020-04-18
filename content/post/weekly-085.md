---
date: 2020-04-14
url: weekly-85
translationKey: ipfs-weekly-85
tags: weekly
header_image: weekly-newsletter.png
title: IPFS Weekly 85
author: Jenn Turner
---

# Welcome to the IPFS Weekly

Here’s what’s happening lately in the [InterPlanetary File System](https://ipfs.io/) galaxy and beyond! 🚀

## ProtoSchool explores the Async Iterables returned by js-ipfs 0.41
The recent release of js-ipfs 0.41 introduced a huge async/await refactor, and the breaking changes were no joke! The affected ProtoSchool tutorials have been updated to reflect the recent changes, highlighting which js-ipfs methods now return Async Iterables and how you can use /for await…of/ loops or alternative helper modules to work with them.

Check out the updated content in our [Mutable File System (MFS)](https://school.us4.list-manage.com/track/click?u=41e9e493c56c3865870435d91&id=d160d74ae0&e=28ddac0f86) and [Regular Files API tutorials](https://school.us4.list-manage.com/track/click?u=41e9e493c56c3865870435d91&id=b1b4d385be&e=28ddac0f86), then check out the updated event submission process for local leaders to list virtual workshops on ProtoSchool’s [events page](https://proto.school/#/events)!

## Latest launches 🚀
* [Multiple versions of aegir](https://github.com/ipfs/aegir/compare/v21.4.5...v21.8.1) shipped with some nice developer experience improvements like testing helpers (echo server, for example), get free port and more. Also hooks can now forward environment vars to the test runners.
* Shipped [ipfsd-ctl](https://github.com/ipfs/js-ipfsd-ctl/compare/v3.0.0...v3.1.0) with better docs, less node globals and other minors improvements 
* The [pubsub discovery module](https://github.com/libp2p/js-libp2p-pubsub-peer-discovery) was released 
* NodeFactory released [libp2p-noise](https://github.com/NodeFactoryIo/js-libp2p-noise) last week. Yay, handshakes all around! 🤝
* Lastly, the [IPFS Distributions website](https://dist.ipfs.io/) got a fun IPFS rebrand! Enjoy!

## Using IPFS to fight COVID-19
Here is a followup to our bounty for creating a CORD-19 dataset:

We now have a **CORD-19 collaborative cluster dataset**, but it won’t be useful if the people that should use it don’t know that they can access this content from the IPFS network! 

Please share it freely: https://ipfs.io/ipfs/Qme2F949GSfupReGPMKJ4EQTGi9hzzUcsJvRS1Mr8YVNzQ


## Meet Fleek
Not only did our friends at Terminal do an entire platform rebrand to become **[Fleek](https://fleek.co/)**, but they’ve been busy churning out new features at the same time! [Check out their latest announcement](https://blog.fleek.co/posts/Fleek-Release-Update-UI-Rebrand) detailing their user interface rebrand, an introduction to the Teams feature, and new fan favorite: Framework Auto Detection.


## Top highlights this week
* [Brave Launches Origin-Powered Store](https://brave.com/brave-launches-new-swag-store-powered-by-origin/)
* [Pinata](https://pinata.cloud/) asks, [“Who Is Responsible for NFT Data?”](https://medium.com/pinata/who-is-responsible-for-nft-data-99fb4e8147e4) 🤔
* Since there wasn’t one, @mborho wrote [a Terraform provider for IPFS](https://github.com/mborho/terraform-provider-ipfs)!
* Have you watched this video on [Decentralized React states - using IPFS to sync, store, and recover state](https://codetalks.tv/talk/decentralized-react-states-using-ipfs-to-sync-store-and-recover-state-andrew-hill-wnnkaqparmq) from Andrew Hill [of Textile](https://textile.io/)? Because you should. 
* Check out the video from the [Open Tech Will Save Us](https://matrix.org/open-tech-meetup/) meetup, featuring talks on IPFS, Matrix, and Jitsi


## People are building the coolest stuff with IPFS
* [Crust](https://medium.com/@crustnetwork/crust-decentralized-cloud-d61afbcdbfb6) implements the incentive layer protocol for decentralized storage with adapting to multiple storage layer protocols including IPFS, and provides support for the application layer.
* [Energy Web Chain’s DID Library](https://medium.com/energy-web-insights/ewfs-did-library-is-open-source-1f355c95503e) is now open-source. 
* [Fetch.ai Agent Framework v0.3](https://medium.com/fetch-ai/fetch-ai-agent-framework-v0-3-the-collaborative-communications-and-smart-contract-release-745d0129fe68): The collaborative, communications and smart contract release, built with IPFS
* The latest from [Fission](https://fission.codes/): [Fear and Loathing and IPFS file metadata tricks](https://talk.fission.codes/t/fear-and-loathing-and-ipfs-file-metadata-tricks/577)
* Use Infura as the bridge between the Ethereum network and your application to build your own API to [invoke Compound protocol smart contracts](https://medium.com/compound-finance/compound-ethereum-api-with-infura-1f5c555fd4a2) using conventional HTTP requests.
* [The KyberWidget is now hosted on IPFS](https://twitter.com/KyberNetwork/status/1243198158932340736), meaning it can be used by anyone, anywhere in the world!
* [Qri CLI v0.9.7](https://github.com/qri-io/qri/releases/tag/v0.9.7) is huge. This release adds SQL support, turning Qri into an ever-growing database of open datasets. If that wasn’t enough, we’ve added tab completion, nicer automatic commit messages, unified our command descriptions, and fixed a whole slew of bugs!
* [Raw.chat](https://github.com/rodkeys/Rawchat): A censorship-resistant chat app using IPFS and libp2p/gossipsub.
* [Textile](https://textile.io/) gave us a [Threads progress report for 2020 April 7](https://blog.textile.io/textile-threads-progress-report-for-7-april/) 🎉
* [Temporal](https://www.temporal.cloud/) decided to [kick things up a notch with their nodes](https://medium.com/temporal-cloud/nodes-w-built-in-replication-high-performance-security-consensus-free-6657ac9e44ea) to ensure support and performance for big data IPFS work loads.
* [Totem](https://totem.network/): Manage your files, crypto assets, 3Box profile and more! It is build on Ethereum and IPFS. The public beta launches soon! 


## Calls for contributors
Come hack on [the OpenTelemetry Tracing for OrbitDB](https://github.com/orbitdb/opentelemetry-plugin-orbitdb). This, combined with the HTTP tracing in #IPFS could lead to some awesome metrics + tracing +observability on the distributed web.

Calling all rustaceans, rustafarians, ferrosities, and rustlers! Community participation in [making Rust-IPFS a reality](https://blog.ipfs.io/2020-03-18-announcing-rust-ipfs/) is encouraged and welcomed! If you want to pitch in, [here are a few ways](https://github.com/ipfs-rust/ipfs-rust-conformance/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)!


## Attend one of these exciting events from the comfort of your own home
* [3rd ZK Proof Workshop](https://zkproof.org/events/workshop3/invite/): April-May 2020, Bringing together top researchers, developers and business practitioners to showcase the latest academic achievements and practical applications for ZKP privacy schemes.
* [ETHGlobal](https://medium.com/ethglobal/hackmoney-ethglobals-first-online-defi-hackathon-aa6e97815db0): 30 day virtual hackathon beginning 2020 Apr 24! Designed for hackers around the world to build DeFi applications. Apply now to participate!
* [Ethereal Virtual Summit](https://www.etherealsummit.com/): 2020 May 7-8, Join the first-ever virtual conference and experience a stellar collaboration of technologists, artists, startups, entrepreneurs, and investors engaging directly with the latest developments in Ethereum, blockchain, and decentralization.
* [Consensus Distributed](https://www.coindesk.com/events/consensus-2020?gclid=Cj0KCQiAyKrxBRDHARIsAKCzn8xTLzNy3u0cGN4s-gH5dpLxpeCQn8ufhFBlyZ3F4sXtd9ZF_azLQeYaApliEALw_wcB): 2020 May 11-15, Tune in for dozens of sessions across multiple tracks and days to better understand what the future might look like, especially in a post-COVID-19 era. It’s the same great content you’ve come to expect from Consensus, but virtual.


## Job hunting? Work on IPFS!
* [Community Engineer, libp2p](https://jobs.lever.co/protocol/0afd449f-b292-42b4-abfd-af26415b796b): Help introduce new open source projects to libp2p and clear hurdles for them to adopt the libp2p stack for the networking layer of their system. Protocol Labs, Remote
* [Engineering Manager, IPFS](https://jobs.lever.co/protocol/3f0787e8-58b3-4122-a1ea-424561d2658f): Engineering managers have the challenging and exciting task of supporting and empowering engineering teams to deliver complex internet-scale systems in an environment defined by curiosity, passion, and a love for open source. Protocol Labs, Remote
* [IPFS Community Lead](https://jobs.lever.co/protocol/71c4a9b9-af90-4ce9-9dba-8b72507997bf): Provide tactical support for the IPFS community, creating a global community strategy, and executing this strategy on the ground! Protocol Labs, Remote
* [Software Engineer, the Underlay Project](https://notes.knowledgefutures.org/pub/si1okbw9): Strong full-stack web developer with an interest in semantic web and decentralized web technologies. The Knowledge Futures Group, Remote
* [Technical Product Manager, 3Box](https://jobs.lever.co/3box/6c68f7ec-a4b4-48ab-9d77-6500e36351e7): Own the delivery of new technical products and features across the 3Box suite of developer APIs, SDKs, and plugins, and manage the onboarding, engagement and partnership activities to ensure a thriving community and network. 3Box, NYC, Berlin, or Remote

**Take care of yourselves and each other.** ❤️

Get involved with IPFS by checking us out on [GitHub](https://github.com/ipfs), joining discussions on [our community forum](https://discuss.ipfs.io/), or hitting us up [in chat](https://riot.im/app/#/room/#ipfs:matrix.org). Have a suggestion? [Email us.](mailto:newsletter@ipfs.io)

[Get the IPFS Weekly in your inbox](https://ipfs.us4.list-manage.com/subscribe?u=25473244c7d18b897f5a1ff6b&id=cad54b2230), each Tuesday.
