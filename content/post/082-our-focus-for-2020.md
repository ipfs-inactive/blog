---
date: 2020-02-10
url: 2020-02-10-our-focus-for-2020
title: IPFS Project Focus for 2020
author: Molly Mackinlay
---

_"The mission of IPFS is to create a resilient, upgradeable, open network to preserve and grow humanity’s knowledge."_

It’s a new year, and with it time to update the [IPFS Project Roadmap](https://github.com/ipfs/roadmap) with our focus for 2020. As part of that, we also want to reflect on our successes, challenges, and learnings from 2019 to help us stay on track to achieve our mission, and maximize the value and utility we create in the world. 

> Looking for the TL;DR? Hop right over to the [2020 section of our IPFS Roadmap](https://github.com/ipfs/roadmap#2020-priority) to see our focus and epics for the next year.

## Looking Back at 2019
2019 was a super exciting year for the IPFS Project:

* The IPFS Public Network grew by **30x in 2019**! 🚀
* **💯s of thousands of nodes** are participating in the IPFS Network daily
* **Millions of users** access the IPFS HTTP Gateway every week 🎉
* There are **hundreds of dapps, tools, & projects** in the wider IPFS Ecosystem including newcomers like [Anytype](https://anytype.io/), [Microsoft ION](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/toward-scalable-decentralized-identifier-systems/ba-p/560168), [Haven](https://gethaven.app/) by OB1, [Brave](https://brave.com/), [3box](https://3box.io/), [EthDNS](https://medium.com/the-ethereum-name-service/ethdns-9d56298fa38a) and more!! 🙌

![IPFS Ecosystem Diagram](https://user-images.githubusercontent.com/618519/74208137-0fc98a00-4c37-11ea-800b-ebd61485d332.png)
See our [Ecosystem Update from IPFS Camp](https://www.youtube.com/watch?v=jpQnQbfhuBc&feature=youtu.be) to learn more about 2019 adoption!

This growth caused us to shift some of our attention midyear to support new usage and demand - re-focusing some of our working groups on improving documentation, gateway performance, and testing tools to validate large-scale network upgrades (see our [Operation Task-Force blog post](https://blog.ipfs.io/2019-07-31-operation-task-force/) for details). We still made progress on our Package Managers goal, but less than we hoped given **also** investing heavily in other critical areas to support the ecosystem. 🤞

### 5 Notable Wins

1. We held the first [IPFS Camp](https://www.youtube.com/watch?v=cQJXnJDbXv4&feature=youtu.be), a gathering for developers and builders in the wider InterPlanetary community to [learn](https://blog.ipfs.io/2019-09-18-ipfs-camp-course-videos/), [share](https://www.youtube.com/playlist?list=PLuhRWgmPaHtQVNQcBaCKg5kKhfOBv45Jb), and [demo](https://blog.ipfs.io/2019-10-03-ipfs-camp-sci-fi-fair-videos/) their work (see [this recap](https://blog.ipfs.io/2019-07-08-ipfs-camp-recap/) for more)! 🏕
2. We made significant progress on our Package Managers goal (read on for awesome new features like [collaborative clusters](https://blog.ipfs.io/2020-01-09-collaborative-clusters/)!) 🎯
3. We developed and launched [TestGround v0.1](https://github.com/ipfs/testground/releases/tag/v0.1.0) in collaboration with the libp2p team, a platform for testing distributed systems and networks at various scales ⚖️
4. We launched [ProtoSchool](https://proto.school/#/), a new portal for interactive tutorials to learn about decentralized web concepts, protocols, and tools, with 23 chapters across 4 continents! 🌏
5. We built a [new IPFS docs site](https://blog.ipfs.io/2020-01-07-ipfs-docs-beta/) with improved search, information architecture, and explainers on InterPlanetary concepts 📖

## Our 2019 Roadmap

To chart our path for the year, we did a large 2019 Roadmapping effort to write down our [mission](https://github.com/ipfs/roadmap#ipfs-mission-statement), define some of the many [long-term goals for the IPFS Project](https://github.com/ipfs/roadmap#future-goals), and [prioritize](https://github.com/ipfs/roadmap#sorting-function) where to focus our energy first. We had a lot of “planning” debt, so going from 0 to 1 on a project roadmap was a large endeavor. Our process involved each working group generating a roadmap around a shared goal, and then merging important work streams into “epics” for the whole project that highlighted our major objectives. You can see how we did against these objectives in our [2019 Project Roadmap](https://github.com/ipfs/roadmap/blob/master/2019-IPFS-Project-Roadmap.md), or dive more into how we chose those goals in our [2019 Roadmap blog post](https://blog.ipfs.io/78-ipfs-2019-roadmap).

### Our Focus on Package Managers

Our main goal for last year was to improve IPFS performance and scalability by analyzing the needs and pain points for using IPFS in **Package Managers**. This goal was less about _package management_ in particular, and more about defining a representative use case we could research, test, and drive improvements around that would **also** benefit all downstream IPFS users with similar performance and scalability needs for adding, updating, and fetching large datasets. 

Focusing on a representative use case like package managers brought focus and structure to our prioritization of improvements to IPFS. We built a number of proofs-of-concept (POCs) like [apt-on-ipfs](https://github.com/ipfs-shipyard/apt-on-ipfs), [npm-on-ipfs](https://github.com/ipfs-shipyard/npm-on-ipfs), [clojars-on-ipfs](https://github.com/ipfs-shipyard/clojars-mirror-test) and [homebrew-on-ipfs](https://github.com/ipfs/package-managers/issues/12) to analyze how well IPFS performed against user expectations for adding, updating, and fetching large package repositories—allowing us to identify and fix major pain points. For example, our POCs identified a huge bottleneck in adding GBs of data to IPFS. Further testing resulted in _doubling_ the speed of adding on Linux & OSX devices by switching to async-by-default datastores.🎉 While IPFS had previously taken **24mins** to add an Arch Linux repo, after [these fixes](https://github.com/ipfs/go-ipfs/issues/6523#issuecomment-546822191) it only took **11mins** (comparable to the time to copy/paste)! _Note: improvement seen on the badger datastore, already 3x faster than flatfs!_ 

Our Package Managers goal also helped focus our user research, quarterly objectives, and collaborations. In Q1&2, our Package Managers team surveyed the space and identified core needs documented in our [Package Managers repo](https://github.com/ipfs/package-managers). These insights informed our [quarterly OKR planning](https://github.com/ipfs/team-mgmt/blob/master/OKR/PACKAGE-MANAGERS.md), driving features to make it easier to mirror file system package managers on IPFS. One particular addition was adding metadata on “last updated” time to our unixfs data model to support smarter/faster package updates (humbly named “unixfsv1.5” and already implemented in js-ipfs; coming soon to go). A number of these package-manager-focused improvements are all slated to roll out in our next feature release, go-ipfs 0.5.0 - [feel free to follow along here](https://github.com/ipfs/go-ipfs/issues/6776) or grab the latest master to try them out!

We also formed collaborations with IPFS users to partner on improving IPFS for package management use cases. One of our main collaborations was with [Netflix](https://netflix.com) to optimize the speed of fetching large container images with [Bitswap](https://github.com/ipfs/go-bitswap), our peer-to-peer data transfer algorithm. You can read more about that specific collaboration—and the resulting improvements in Bitswap performance!—in our upcoming blog post! For now, check out [these slides](https://docs.google.com/presentation/d/1mbFFGIIKNvboHyLn-k26egOSWkt9nXjlNbxpmCEQfqQ), this [presentation at the IPFS Weekly Call](https://www.youtube.com/watch?v=G_Q7iTpwYQU), and [this recent performance comparison](https://github.com/ipfs/go-ipfs/issues/6782#issuecomment-579973116).

<p align="center">
<img width="400" alt="5ms-1024MB" src="https://user-images.githubusercontent.com/169124/73398685-ef531480-42b3-11ea-8054-d572abf7eea1.png"><img width="400" alt="5ms-40MB" src="https://user-images.githubusercontent.com/169124/73398687-ef531480-42b3-11ea-930f-d63afee8e465.png">
</p>

IPFS Cluster also released _[collaborative clusters](https://blog.ipfs.io/2020-01-09-collaborative-clusters/)_, a new feature to enable package manager maintainers and mirrors to add and replicate repositories across a community of IPFS nodes. With collaborative clusters, any maintainer can push new updates to the pinset of data to mirror, which is then sharded and sync’d across all mirroring nodes. We’ve already seen package managers like Pac-Man added to collaborative clusters along with many “data package managers” like Wikipedia and Project Gutenberg, [follow these instructions to add your own!](https://collab.ipfscluster.io/)

### How We Did Against Our Package Managers Goal

We made huge strides this year on the performance at scale needed by many package manager communities, but it’s clear there’s still lots of work left to be done to achieve widespread adoption and meet the needs of more types of package managers. While focusing on a specific use case _did_ help us identify and drive important fixes, it didn’t give us feedback across the entire IPFS ecosystem as to what pain points were top priority blockers to growth or value-add. We also found that a number of paths to increasing IPFS usage in package managers were actually divergent from the core goal we wanted to achieve: making IPFS itself better. This tension required constant vigilance to ensure features and improvements would be felt by many downstream use cases—not just specialized package manager tooling. 

In the end, we succeeded at staying focused, not building another new package manager, and landing a ton of features and improvements to make IPFS better for everyone; where we didn’t succeed was shipping and integrating those improvements directly into existing package managers to drive adoption and visibility of IPFS with an awesome community of aligned and talented developers. With the [features and improvements landing in go-ipfs 0.5.0](https://github.com/ipfs/go-ipfs/issues/6776), that future adoption work is significantly unblocked, however we also learned through our research that many package manager communities aren’t fast adopters of new tooling around package distribution due to the semi-pro-bono nature of maintainership. To support a slower, more ad-hoc adoption cadence, we plan to use channels like [DevGrants](https://github.com/ipfs/devgrants) and Collaborations to support package manager adopters acting within their own communities. This allows us to continue focusing our core working groups on improving and augmenting the core protocol and reference implementation, while supporting many community applications and refinements of these tools. 

Excited to use these new improvements to IPFS in your package management use case? [Make an issue in the package managers repo](https://github.com/ipfs/package-managers/issues) for the latest recommendations!

## 2020 Roadmapping Process

We did a slightly different roadmapping process this year, after learning from the wins and challenges we encountered with our massive roadmapping endeavor in 2019. Rather than starting with project goals to inspire a distributed working group roadmapping process (which was difficult to merge and hard to make open), we decided to flip the order of things and start with a [broad call for themes and suggestions](https://github.com/ipfs/roadmap/blob/master/2020-IPFS-Project-Planning.md) from the community for where the IPFS Project should focus in 2020. 

We got [**11** awesome proposals](https://github.com/ipfs/roadmap/issues), with great ideas and discussion across a wide variety of tracks. Notable mentions include [IPFS in Rust](https://github.com/ipfs/roadmap/issues/54), [IPFS for Mobile](https://github.com/ipfs/roadmap/issues/45), [IPFS-Wikipedia](https://github.com/ipfs/roadmap/issues/46), and [IPFS-powered GitHub](https://github.com/ipfs/roadmap/issues/43). Huge thank you for the community members who took the time to write these proposals, and call out the core needs and gaps, which fed directly into our next stage!

<p align="center">
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Blown away by all the great <a href="https://twitter.com/IPFSbot?ref_src=twsrc%5Etfw">@IPFSbot</a> 2020 Theme suggestions! I love this community so much 🥰 - extra inspired today looking at all the amazing paths ahead of us to make humanity’s knowledge &amp; tools more accessible, resilient, and empowering! 🤩 🚀<a href="https://t.co/MbNS0q8mlC">https://t.co/MbNS0q8mlC</a> <a href="https://t.co/WTg03R5iPa">pic.twitter.com/WTg03R5iPa</a></p>&mdash; Molly (@momack28) <a href="https://twitter.com/momack28/status/1193400070625824768?ref_src=twsrc%5Etfw">November 10, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</p>

During our IPFS Planning “Spike”, we took stock of our wider ecosystem and project health. We synthesized feedback from [top IPFS users](https://user-images.githubusercontent.com/618519/69945610-c58d9500-149e-11ea-9be8-7429c4d9a201.png), sourcing many ideas and needs from the ‘core needs & gaps’ section of each 2020 Theme Proposal. We also reflected on the biggest pain points and risks to the IPFS Project’s long term goals and mission to refocus on our north star. Looking at the skills and capacity of our core working groups, we created a set of [decision-making criteria](https://github.com/ipfs/roadmap#2020-h1-priority-selection-criteria) to identify where to allocate this subset of IPFS contributors for maximum impact, expanded on a set of top candidates (sourced both from the 2020 theme proposals and the exploration of wider project pain points), and ultimately made a decision. 

### 2020 Focus: Improving Content Routing

> Based on our decision-making criteria, we chose **improving the performance and reliability of Content Routing in the IPFS network** as our main priority for the next 6 months (through mid-year 2020).

‘Content routing’ is the process of finding a node hosting the content you’re looking for, such that you can fetch the desired data and quickly load your website, dapp, video, or data. As the IPFS public network scaled this past year (over 30x!), it ran into new problems in our distributed routing algorithms: struggling to find content spread across many unreliable nodes. This was especially painful for [IPNS](https://docs.ipfs.io/guides/concepts/ipns/), which relied on _multiple_ of these slow/unreliable queries to find the latest version of a file. These performance gaps caused IPFS to lag and stall while searching for the needed content, hurting the end user experience and making IPFS feel broken. Searching the network to find desired content (a.k.a., using IPFS as a decentralized CDN) is one of the most common actions for new IPFS users and is required by most ipfs-powered dapp use cases—therefore, it’s the **number 1 pain point** we need to mitigate in order to unlock increased adoption and scalability of the network! Our goal for midyear: **95th percentile content routing speed is less than 5 seconds.**

To achieve this goal, we’ve formed a Content Routing team (and spun down our Package Managers working group) to focus our main engineering effort on this problem for the next 6 months. Improving content routing performance requires making improvements and bugfixes to the go-libp2p DHT *at scale*, and changing how we form, query, and resolve content in the IPFS network to be faster and more resilient. This involves a combination of research, design, implementation, and testing. Making changes to the *configuration of the entire network* is non-trivial, which is why we’ve been investing in the [InterPlanetary Testground](https://github.com/ipfs/testground/), a new set of tools for testing next generation P2P applications, to help us diagnose issues and evaluate improvements prior to rolling out upgrades to the entire public network. You can follow along with the team's work in the [Content Routing ZenHub Roadmap](https://app.zenhub.com/workspaces/content-routing-2020-5e29be25ab9d8da0b032cfcc/roadmap):

<p align="center">
<a href="https://app.zenhub.com/workspaces/content-routing-2020-5e29be25ab9d8da0b032cfcc/roadmap">
<img width="600" alt="Screen Shot 2020-02-10 at 8 08 00 PM" src="https://user-images.githubusercontent.com/618519/74210567-0fce8780-4c41-11ea-892c-a49657adc76d.png">
</a>
</p>

We considered a number of other potential goals—especially all the great [2020 Theme Proposals](https://github.com/ipfs/roadmap/issues/)—before selecting this priority. However, we decided it was more important to focus core working group development time on the main blockers and pain points to enable the entire ecosystem to grow and succeed. Many of our theme proposals are actually very well suited for community ownership via [DevGrants](https://github.com/ipfs/devgrants) and collaborations. Some of them, like [“IPFS in Rust”](https://github.com/ipfs/roadmap/issues/54) and [“Examples and Tutorials”](https://github.com/ipfs/roadmap/issues/50), already have grants or bounties associated with them, and community teams actively pushing forward! 🙌

### Increasing Contributor Velocity & Supporting Adoption

Part of allowing our core go-ipfs developers to focus deeply on content routing is to systematize and improve our maintainership for the many IPFS users and contributors merging changes into the core repos. As we’ve grown as a project, we’ve not done the necessary work of intentionally distributing and decentralizing this stewardship, in order to make community contribution scalable too. We want to create more pathways for folks throughout the community to step up to help with this, and build better avenues for experimentation with fast feedback loops.

We also want to grow and support the many amazing contributors to IPFS, and exciting new explorations to build tools or address new use cases. There were a ton of amazing suggestions for features and focus areas in our 2020 theme collection that would be immensely valuable for the project, but our core working groups can’t push forward this quarter. To help with that, we’re launching a [community DevGrants program](https://github.com/ipfs/devgrants) where Protocol Labs and other groups can offer bounties, RFPs, and accept open suggestions for improvements, new features, and even new implementations. 

To kick this off, we’ve added a number of [bounties](https://github.com/ipfs/devgrants/projects/1) suggested by our 2020 Theme proposal process, and already have 7+ [targeted](https://github.com/ipfs/devgrants/tree/master/targeted-grants) or [open grant](https://github.com/ipfs/devgrants/tree/master/open-grants) proposals for larger-scale improvements to help benefit the whole community. If you are a user or contributor to IPFS, this is a great opportunity to both sponsor and apply for [grants](https://github.com/ipfs/devgrants/tree/master/rfps#how-to-create-rfp) or [bounties](https://github.com/ipfs/devgrants/blob/master/BOUNTIES.md#how-to-propose) to help make IPFS better for everyone! 

To help coordinate this work, we’re creating a new “Ecosystem” working group made up of 3 Special Interest Groups (SIGs) focused on developer experience, collabs and community, and browsers/connectivity. Our Ecosystem working group’s objective is to ensure community health & growth through collaborations, developer experience and platform availability. The 3 SIGs each focus on:

* **Browsers & Connectivity**: Maximize availability & connectivity of IPFS on the web
* **Collabs & Community**: Support IPFS users and grow new opportunities through research, collaborations and community engagement
* **Developer Experience & Maintainership**: Support the IPFS technical community through documentation, contributor experience, API ergonomics and tooling

Curious about the work they’re taking on? Check out the [Project Roadmap Epics](https://github.com/ipfs/roadmap#2020-epics) for more tangible goals, and be on the lookout for more suggestions on how you can help enable other contributors throughout the IPFS ecosystem!

### Everything Else

Naturally, even with narrowing our focus, there are some really important pieces of our work that need continued energy, like the IPFS Gateway. While we’ve seen huge leaps in performance on the IPFS Community HTTP Gateway we run (now able to support large 10x usage spikes, and reduced 95th percentile response time by 30-50%), this still needs continued enhancement, automation, and scaling work to support expected 2020 growth and new use cases. Our Bifrost team will continue leading the charge here, while ensuring our bootstrappers, preload nodes, and other useful infra is operating smoothly.

While we definitely will have other maintainership work on various projects in the wider IPFS ecosystem, in order to achieve the goals above we are going to need to **focus** and say “not right now” to a lot of things we want to do. The more focus we apply to content routing, the faster we can improve the network for everyone! That means there will be more opportunities for community contributors to step up as lead maintainers of modules unrelated to content routing, push forward new experiments with React Native or mobile, or add shiny new features to unblock new uses. 

If you’d like to get involved, check out our [contribution guidelines](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md) and come to [IPFS Office Hours](https://github.com/ipfs/community/issues?utf8=%E2%9C%93&q=label%3A%22%F0%9F%99%8C%F0%9F%8F%BD+IPFS+Weekly+Call%22+) to get pointers on where to start!

## Onwards!

We have an exciting 6 months ahead of us, and we’re already well on our way. Thank you so much for your support, IPFS would be nowhere without this passionate and dedicated community helping make the web InterPlanetary! We’re excited to continue working with you in 2020 to build a resilient, upgradeable, open network to preserve and grow humanity’s knowledge. 
Onwards! 🚀
