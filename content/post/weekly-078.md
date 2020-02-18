---
date: 2020-02-18
url: weekly-78
translationKey: ipfs-weekly-78
tags: weekly
title: IPFS Weekly 78
author: Jenn Turner
---

# Welcome to the IPFS Weekly

Here’s what’s happening lately in the [InterPlanetary File System](https://ipfs.io/) galaxy and beyond! 🚀

## Improvements to IPFS Bitswap, or how Netflix is experimenting with IPFS
After IPFS Camp 2019, [Netflix and IPFS began collaborating](https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/) on ways to incorporate peer-to-peer services into Netflix’s developer tooling. Together, we figured out a way to leverage IPFS to speed up cloud builds, designing and testing solutions for faster Continuous Integration (CI) pipelines powered by efficient p2p container image distribution. Read more on the [IPFS blog](https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/).


## js-ipfs 0.41.0 released
We’ve completed a HUGE refactor to [js-ipfs internals 🥳](https://blog.ipfs.io/2020-02-13-js-ipfs-0-41/), switching to using Promises and async/await over Callbacks and using async iterables instead of Node.js Streams and Pull Streams. BUT, this release brings big breaking changes to the core API so please consult **the full release notes**!


## Top 5 recent highlights
* Berty released [gomobile-ipfs!!](https://berty.tech/blog/go-mobile-ipfs) This repo aims to provide packages for Android, iOS and React-Native that allow one to run and use an IPFS node on mobile devices.
* [IPFS Web UI E2E tests](https://github.com/ipfs-shipyard/ipfs-webui#e2e-tests) are now run as a part of go-ipfs and js-ipfs regression test suites. 
* [Introducing Terminal V2](https://blog.terminal.co/introducing-terminal-v2/): The easiest way to build, deploy, and host websites & apps on IPFS.
* Catch up on the [latest IPFS Weekly Call](https://www.youtube.com/watch?v=octr87XSCeY&feature=emb_logo), featuring a look at how IPFS and libp2p are used in Robonomics. 🤖
* Unstoppable Domains](https://medium.com/unstoppabledomains/unstoppable-website-templates-e5ed343a7c7a) will be giving *$100*per template to the first 10 pull requests that they approve. And speaking of bounties...


## Introducing IPFS Bounties & DevGrants

Our new IPFS Grant platform connects funding organizations with builders and researchers in the IPFS community—that means you! We offer several types of grants, including bounties. To learn more about IPFS DevGrants, [check out the repo](https://github.com/ipfs/devgrants).
Here are some of our open bounties:

* [Fix script responsible for preparing IPFS mirror](https://github.com/ipfs/distributed-wikipedia-mirror/issues/64)
* [Write a brief but interesting history of the IPFS Project](https://github.com/ipfs/website/issues/352)

See the recently claimed bounties or check for new open ones when they get posted on [The Bounty Board 📌](https://github.com/ipfs/devgrants/projects/1).

## The IPFS Community at ETHDenver 

Last week, the IPFS Community gathered at one of the largest Ethereum conferences and hackathons in the US: [ETHDenver](https://www.ethdenver.com/). Here are some other key takeaways:
* Out of the 52 projects submitted to ETHDenver, **24 were built with IPFS!**
* IPFS Hackathon Standouts: [Medici](https://alchemy-xdai.daostack.io/dao/0xe248a76a4a84667c859eb51b9af6dea29e52f139/crx/proposal/0xc2584683cbf5f10af39fb2b79b62ff967608a9e179241e0fce9c8f6dbd6a579a/competition/submission/0x7cbe3ffec0b06ad42fd6d603ae01b5e3907c72101d6f66d37f1d081af192d5de), [TexIOT](https://github.com/RTradeLtd/ethdenver2020/tree/submission/hackathon/texiot), MuckRaker, [IPFS iOS Backup](https://github.com/codynhat/ipfs-ios-backup)
* [The Distributed Network Summit](http://dnsummit.cryptorado.org/), hosted by the [Cryptorado Community](https://cryptorado.org/#/), **an entire day** dedicated to IPFS, featured presentations and workshops on how people are continuing to build on IPFS, as well as some pretty amazing new use cases. 
* This three-part series from Textile on [how to publish dynamic IPFS buckets](https://blog.textile.io/ethden-come-learn-how-to-publish-dynamic-ipfs-buckets-on-textile/) on Textile, how to [pin projects to IPFS](https://blog.textile.io/ethden-2-pin-projects-to-ipfs-right-from-github/) right from GitHub, and [how to use CI to publish your webpage](https://blog.textile.io/ethden-using-ci-to-publish-your-webpage-using-ipfs-and-textile-buckets/) using IPFS and Textile Buckets
* [Bounties using IPFS](https://medium.com/3box/3box-x-ethdenver-bounties-bfca17b98187) were all over the place (and XP missions too!)
* Presenters talking all things IPFS, like [Carson Farmer, from Textile](https://twitter.com/textileio/status/1228739364869505027?s=20)!

Thank you, everyone who joined us there, IPFS will be back for ETHDenver 2021! 🎉


## Check out our mentions

* [Decentralized storage and zkSNARKS - Golem joins the Filecoin trusted setup ceremony](https://blog.golemproject.net/decentralized-storage-and-zksnarks-golem-joins-the-filecoin-trusted-setup-ceremony/), 14 Feb 2020
* [ARK desktop blockchain wallet upgrade adds multisig and multipayments](https://www.cryptoninjas.net/2020/02/12/ark-desktop-blockchain-wallet-upgrade-adds-multisig-and-multipayments/), 14 Feb 2020
* [Fission Drive Preview](https://blog.fission.codes/fission-drive-preview/), 13 Feb 2020
* [Temporal and ENS now make launching a decentralized website easier than ever](https://cryptoslate.com/temporal-and-ens-now-make-launching-a-decentralized-website-easier-than-ever/), 10 Feb 2020
* Textile shipped a Filecoin tools progress update: [10 February](https://blog.textile.io/filecoin-tools-progress-update-10-february/), 10 Feb 2020
* [Taking Back The Internet with Naomi Brockwell and Brad Kam](https://medium.com/unstoppabledomains/taking-back-the-internet-with-naomi-brockwell-and-brad-kam-65f475ef88b9), 07 Feb 2020
* [Blockchain Key To A Better Internet](http://www.cryptomorrow.com/2020/02/06/blockchain-key-to-a-better-internet/), 06 Feb 2020
* [What’s IPFS and how it can change Internet](https://medium.com/natix-io/whats-ipfs-and-how-it-can-change-internet-161239bc69ec), 04 Feb 2020


## Quote of the week

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Loving the repo-&gt;build-&gt;deploy systems! <br><br>For any <a href="https://twitter.com/Netlify?ref_src=twsrc%5Etfw">@Netlify</a> users this is the same but for InterPlanetary File System! <br><br>Deploy censorship resistant websites in seconds! Who says <a href="https://twitter.com/hashtag/blockchain?src=hash&amp;ref_src=twsrc%5Etfw">#blockchain</a> has no use cases?!?<a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://twitter.com/hashtag/webdev?src=hash&amp;ref_src=twsrc%5Etfw">#webdev</a> <a href="https://twitter.com/hashtag/privacy?src=hash&amp;ref_src=twsrc%5Etfw">#privacy</a><a href="https://t.co/bKoIblBaxg">https://t.co/bKoIblBaxg</a> <a href="https://t.co/gvunHkpi46">pic.twitter.com/gvunHkpi46</a></p>&mdash; Jason 🌟 (@0xBanana) <a href="https://twitter.com/0xBanana/status/1227760079266598913?ref_src=twsrc%5Etfw">February 13, 2020</a></blockquote>

## Open positions working on IPFS

* [Backend Software Engineeer](https://qri.io/jobs/job-backend-software-engineer), Qri
* [Frontend Software Engineer](https://qri.io/jobs/job-frontend-software-engineer), Qri
* [Research Engineers and Scientists](https://jobs.lever.co/protocol/f39f7fe0-1805-40d2-9453-90fd25c72bc3), ResNetLab
* [IPFS Community Lead](https://jobs.lever.co/protocol/71c4a9b9-af90-4ce9-9dba-8b72507997bf), Protocol Labs
* [Project Operator, IPFS](https://jobs.lever.co/protocol/135cecff-ecc4-49ca-b516-61b63fd4d9ef), Protocol Labs
* [Specifications Engineer, libp2p](https://jobs.lever.co/protocol/0ee37e17-5fb3-4b0f-8559-e5fca363e268), Protocol Labs
* [Senior Software Engineer, IPFS or libp2p](https://jobs.lever.co/protocol/82793e56-124f-484c-bf13-357ef0b45bc6), Protocol Labs
* [Engineering Manager, IPFS](https://jobs.lever.co/protocol/3f0787e8-58b3-4122-a1ea-424561d2658f), Protocol Labs


## Join the community at these upcoming events

* [Stanford Blockchain Conference 2020](https://cbr.stanford.edu/sbc20/), 19-20 Feb 2020, Stanford (CA), US
* [Ethereum Community Conference 3](https://ethcc.io/), 03-05 Mar 2020, Paris, France
* [Open Data Day 2020](https://opendataday.org/), 07 Mar 2020, 35 events registered so far!
* [Cryptoeconomic Systems Conference '20](https://cryptoeconomicsystems.pubpub.org/ces20), 07-08 Mar 2020, Cambridge (MA), US
* [The Web Conference 2020](https://www2020.thewebconf.org/), 20-24 Apr 2020, Taipei, Taiwan
* [Consensus 2020](https://www.coindesk.com/events/consensus-2020), 11-13 May 2020, New York (NY), US
* [csv,conf,v5](https://csvconf.com/), 13-14 May 2020, Washington, D.C., US


Get involved with IPFS by checking us out on [GitHub](https://github.com/ipfs), joining discussions on [our community forum](https://discuss.ipfs.io/), or hitting us up [in chat](https://riot.im/app/#/room/#ipfs:matrix.org). Have a suggestion? [Email us.](mailto:newsletter@ipfs.io)

[Get the IPFS Weekly in your inbox](https://ipfs.us4.list-manage.com/subscribe?u=25473244c7d18b897f5a1ff6b&id=cad54b2230) each Tuesday.
