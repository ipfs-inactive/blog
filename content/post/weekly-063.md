---
date: 2019-10-15
url: weekly-63
translationKey: ipfs-weekly-63
tags: weekly
title: Recapping IPFS in Q3 2019 🎉
author: Jenn Turner
---

Every day brings us closer to the end of 2019! To celebrate, we put together a very special issue looking back on all that the [InterPlanetary File System (IPFS)](https://ipfs.io/) community has accomplished so far in 2019. From milestones like remixing our working group and shipping new releases, to the many awesome (and new!) contributors who have joined us, and what’s to come for the rest of this year, we hope you enjoy this quarterly recap.

Thanks for being part of our community, we truly couldn’t make IPFS what it is without you. ❤️

# Milestones

## Shipped IPFS Project Q3 Priorities & Working Groups

Back in July, [we remixed the project working groups](https://blog.ipfs.io/2019-07-31-operation-task-force/) to include Team Bifrost, Package Managers, and more!

## Project releases galore! 

### js-ipfs 0.37.0 and 0.38.0 released 💛

[Version 0.37.0 featured](https://blog.ipfs.io/2019-08-06-js-ipfs-0-37/) a new constructor, better DNSLink support and delegated routing, with [version 0.38.0 adding support](https://blog.ipfs.io/070-js-ipfs-0-38/) for garbage collection, Gossipsub, and IPNS support for `ipfs resolve`!

### js-libp2p 0.26.0 released 🧩

https://blog.ipfs.io/2019-08-07-js-libp2p-0-26/
In early August, [js-libp2p also got Gossipsub support](https://blog.ipfs.io/2019-08-07-js-libp2p-0-26/), and Promisify-ied the libp2p API.

### go-ipfs 0.4.22 released 💠

go-ipfs versions 0.4.19, 0.4.20, and go-ipfs 0.4.21 shipped an unusual number of critical regressions which were fixed with [this most recent patch release](https://blog.ipfs.io/054-go-ipfs-0.4.22).

## go-ipfs improves the IPFS Release Process

The aforementioned regressions necessitated a new approach to the release process, [as detailed this past August](https://blog.ipfs.io/2019-08-14-ipfs-release-process/). The new approach added three specific changes to the 5-stage process.

## You can now pubsub with the JS IPFS HTTP API client in the browser!

Due to boring technical reasons, pubsub over the HTTP API in the browser was not supported. But once the fetch API supported cancelation, [pubsub support with js-ipfs had arrived](https://blog.ipfs.io/2019-08-29-pubsub-in-the-browser/)!

## IPFS Desktop 0.9 released 🖥

In early September, [the newest version of IPFS Desktop, 0.9.2 shipped](https://blog.ipfs.io/2019-09-19-ipfs-desktop-0-9/)! You can now browse, use npm on IPFS, add IPFS command line tools to your system, and more!


## IPFS Browser Update 

We aim to have multiple browsers implement fully native (and interoperable!) IPFS support. As part of this progression, we’ve had ongoing collaborations with Firefox, Brave, Opera, and other browsers. [Read on to hear the latest status](https://blog.ipfs.io/2019-10-08-ipfs-browsers-update/) and learn about our progress so far.

## IPFS + ENS Everywhere: Introducing EthDNS (technically in Q4 but we had to share)

Earlier this month, [EthDNS was announced](https://medium.com/the-ethereum-name-service/ethdns-9d56298fa38a), bridging the traditional web world to the new universe of ENS-named, IPFS-backed decentralized sites and dapps through the ancient, yet indispensable, 🧙‍♂️ Domain Name System 🧙‍♂️.

# IPFS Camp

True, IPFS Camp took place in Q2, but so much of the amazing content that came out of the event wasn’t ready for consumption until Q3. Check out these batches of awesome IPFS Camp video and blog content!

+ [⚡️ Lightning Talks and 📃Poster Projects](https://blog.ipfs.io/2019-07-22-ipfs-camp-content-first-batch/)
+ [The story of the Deep Dive sessions at IPFS Camp 2019 as told from the perspective of a DWeb historical researcher in the far future](https://blog.ipfs.io/2019-08-12-great-calamity-circumvention-assembly-at-ipfs-camp/)
+ [IPFS Camp Core Course Videos 🍿](https://blog.ipfs.io/2019-09-18-ipfs-camp-course-videos/)
+ [IPFS Camp Sci-Fi Fair Videos 🧬](https://blog.ipfs.io/2019-10-03-ipfs-camp-sci-fi-fair-videos/)

# Have you seen these IPFS Tutorials?

+ [Hosting Slate Documentation On IPFS](https://medium.com/temporal-cloud/tutorial-hosting-slate-documentation-on-ipfs-9bc54272ca18), Temporal 
+ [How To Get Started With IPFS and Node](https://medium.com/better-programming/how-to-get-started-with-ipfs-and-node-fa04baec6b3a), BetterProgramming
+ [Decentralizing my website with IPFS](https://dev.to/hacdias/decentralizing-my-website-with-ipfs-2073), Henrique Dias
+ [Build a Zero Dependency Notes App on IPFS](https://medium.com/simpleid-dev-tools/tutorial-build-an-encrypted-notes-app-on-ipfs-part-i-39fb06fa95ce), SimpleID
+ [Getting Started with IPFS in Ethereum Grid](https://medium.com/ethereum-grid/getting-started-with-ipfs-in-ethereum-grid-80875cd70e6), Ethereum Grid
+ [Build a Versioning System With IPFS and Blockstack](https://hackernoon.com/tutorial-build-a-versioning-system-on-ipfs-77lvx2geh), Hackernoon
+ [Host a website using IPFS, IPNS, and DNSLink](https://simpleaswater.com/ipfs/tutorials/hosting_website_on_ipfs_ipns_dnslink), SimpleAsWater


# Q3 by the names and numbers

All told **121 contributors** produced approximately **2,202 commits** across **109 repositories** in the IPFS project this past quarter. Thank you to the following folks for making it happen: 

@0zAND1z
@aanupam23
@achingbrain
@adria0
@aeddi
@aknuds1
@alanshaw
@alexander255
@AliabbasMerchant
@amitizkpa
@andrew
@andrewxhill
@aphelionz
@arku
@aschmahmann
@AuHau
@autonome
@bigs
@blackforestboi
@bob-42
@campoy
@carsonfarmer
@cesarosum
@codynhat
@cwaring
@daviddias
@dbachko
@dbw9580
@dignifiedquire
@dirkmc
@djdv
@doctorrobinson 
@drbh
@DTV96Calibre
@eingenito
@ericronne
@ernest-bruce
@fbielejec
@frrist
@fsdiogo
@gjeanmart
@gmas
@godkong
@gpestana
@hacdias
@hannahhoward
@hapsody
@herronjo
@hikerpig
@hsanjuan
@hugomrdias
@ianopolous
@icidasset
@jacobheun
@jamiew
@jbenet
@jehunter5811
@Jeroen52
@jessicaschilling
@jimpick
@jkarni
@jonnycrunch
@Jonybang
@kanej
@Kcchouette
@khinsen
@khursheb
@kishansagathiya
@koalalorenzo
@konoromiHimaries
@Kubuxu
@lanzafame
@lidel
@magik6k
@Mairkur
@maparent
@mburns
@mcdee
@meiqimichelle
@mib-kd743naq
@michealavila
@MichaelMure
@mikeal
@momack2
@moyid
@nick
@npfoss
@NukeManDan
@obo20
@olizilla
@parkan
@PedroMiguelSS
@phillmac
@pkafei
@postables
@Prabhakar-Poudel
@Prtfw
@raulk
@realabbas
@renrutnnej
@romanic-juniet
@satazor
@scout
@smwa
@soapdog
@solangegueiros
@stebalien
@steven004
@swedneck
@tapaswenipathak
@terichadbourne
@timowli
@tobowers
@vasa-develop
@vasco-santos
@vijaysv
@vmx
@whyrusleeping
@xavivives
@xhipster
@ZenGround0
@Zimmi48


## Please help us in welcoming these 49 new contributors 👏

@0zAND1z
@aanupam23
@adria0
@AliabbasMerchant
@amitizkpa
@andrewxhill
@bob-42
@cesarosum
@codynhat
@dbachko
@dbw9580
@dignifiedquire
@doctorrobinson 
@drbh
@DTV96Calibre
@ernest-bruce
@fbielejec
@gmas
@godkong
@gpestana
@hapsody
@herronjo
@hikerpig
@icidasset
@jehunter5811
@Jeroen52
@jonnycrunch
@kanej
@khinsen
@khursheb
@Mairkur
@mcdee
@mib-kd743naq
@moyid
@nick
@npfoss
@phillmac
@Prtfw
@realabbas
@soapdog
@solangegueiros
@steven004
@swedneck
@tapaswenipathak
@timowli
@tobowers
@vijaysv
@xavivives
@xhipster
@Zimmi48

Once again, thanks for all of your hard work and contributions in Q3. Keep up the great job!

# Coming up next in 2019
As the year winds down, the different project working groups across all of IPFS are busy trying to meet their Q4 and 2019 goals. You can see these goals in the [viewable 2019 Q4 IPFS OKRs spreadsheet](https://docs.google.com/spreadsheets/d/1VeyiLvBdX_PrP394kU_lwkQZxfNwqMVX1f7K4ursSPM/edit#gid=1439867466). Lend your expertise by [joining us on GitHub](https://github.com/ipfs)!


# Thanks for reading ☺️
That’s it for this special edition of the IPFS Weekly. If we missed something, [reply to this email](mailto:newsletter@ipfs.io) and let us know! Next week we’ll return with all the news that’s happened across the ecosystem since the last weekly.

If this is your first time reading the IPFS Weekly, you can learn more or get involved by checking out [the project on GitHub](https://github.com/ipfs), or joining us [on IRC](https://riot.im/app/#/room/#ipfs:matrix.org).

See you next week! 👋
