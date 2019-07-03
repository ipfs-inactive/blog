---
date: 2019-04-12
url: 81-js-libp2p-0-25
title: js-libp2p 0.25.0 released
author: Jacob Heun
---

> Save the routers, save the world.

# 🔦 Highlights

Libp2p 0.25 is already in the new [js-ipfs 0.35 release](https://github.com/ipfs/js-ipfs/issues/1826). If you're using js-ipfs, you'll get these changes immediately if you upgrade there!

## ☎️ Auto Dial
Libp2p will now auto dial to discovered peers by default. This can be disabled in configuration if you need to do any specialized dialing. Discovered peers will only be dialed if we are under our min peers threshold, which is configured for the Connection Manager. You can read more about [Peer Discovery and Auto Dial here](https://github.com/libp2p/js-libp2p/blob/v0.25.0/PEER_DISCOVERY.md).

## ✂️ Better Connection Management
We fixed an issue with Libp2p Switch that resulted in the Connection Manager thinking there were far fewer connections than there actually were. The Connection Manager is back to keeping your router safe and your connection count within its [configured range](https://github.com/libp2p/js-libp2p-connection-manager/tree/v0.1.0#create-a-connectionmanager).

## 📔 Blacklisting Undialable Nodes
Libp2p will now blacklist nodes that aren't dialable. The blacklisting includes an exponential backoff with a random jitter. This along with auto dial, helps to ensure libp2p is spending its connection resources wisely. You can read more about the configuration options in the [libp2p-switch readme](https://github.com/libp2p/js-libp2p-switch/tree/v0.42.9#create-a-libp2p-switch). 

## 🔢 Dial Queues
Libp2p Switch now has better queuing for dials! Previously, the only limiting of dials was done per peer. Now, all dials will enter a global queue so that we can better manage connection attempts. The current default limit is 100 parallel dials, but you can configure this to your needs. If a peer is already connected, any calls to `.dial()` or `.dialProtocol()` skip the line and will be executed immediately. Any dials done as a result of Auto Dial will take a back seat.

## ⚖️ Smaller than ever
Since the 0.24 release, libp2p has dropped some weight. The bundle size is now **~42%** smaller!

# 🏗 API Changes

- Auto Dial is enabled by default. Applications that previously dialed on peer discovery should either stop doing so, or turn off Auto Dial. We recommend using Auto Dial if you're not customizing your dialing logic when peers are discovered.
- The DHT no longer lives under EXPERIMENTAL in the config. It is enabled directly in it's own config options. Check out the [Peer and Content Routing example](https://github.com/libp2p/js-libp2p/tree/v0.25.0/examples/peer-and-content-routing) to see how to configure a basic Libp2p node with the DHT on.
- Pubsub now supports unsubscribe all. Check out [interface-js-ipfs-core docs](https://github.com/ipfs/interface-js-ipfs-core/blob/v0.99.2/SPEC/PUBSUB.md#pubsubunsubscribe) if you want to be able to unsubscribe all listeners for a topic.

# ❤️ Huge thank you to everyone that made this release possible

In alphabetical order, here are all the humans that contributed to the release:

* [a1300](https://github.com/a1300) (1 comment)
* [Adam Gall](https://github.com/adamgall) (1 comment)
* [Aditya Bose](https://github.com/adbose) (1 PR)
* [Alan Shaw](https://github.com/alanshaw) (10 PRs, 4 issues, 13 reviews, 12 comments)
* [Alberto Elias](https://github.com/AlbertoElias) (3 PRs, 2 issues, 1 review, 12 comments)
* [Alex Potsides](https://github.com/achingbrain) (1 issue)
* [André Cruz](https://github.com/satazor) (1 issue, 4 comments)
* [Andrej Novikov](https://github.com/shroomist) (1 comment)
* [Andrew Nesbitt](https://github.com/andrew) (2 PRs)
* [Beeno Tung](https://github.com/beenotung) (1 PR, 3 comments)
* [Blake Byrnes](https://github.com/blakebyrnes) (1 PR, 3 reviews, 4 comments)
* [Chris Anderson](https://github.com/jchris) (1 PR)
* [Chris Aslanoglou](https://github.com/chris-asl) (1 issue)
* [Daniel Krech](https://github.com/eikeon) (1 PR)
* [David Dias](https://github.com/daviddias) (10 reviews, 7 comments)
* [Davit Barbakadze](https://github.com/jayarjo) (1 issue, 3 comments)
* [dirkmc](https://github.com/dirkmc) (12 PRs, 8 reviews, 10 comments)
* [Dmitriy Ryajov](https://github.com/dryajov) (4 comments)
* [Donald Tsang](https://github.com/DonaldTsang) (1 issue)
* [Elad](https://github.com/justelad) (1 comment)
* [Franck Royer](https://github.com/D4nte) (1 comment)
* [Friedel Ziegelmayer](https://github.com/dignifiedquire) (2 reviews, 9 comments)
* [Georgios Rassias](https://github.com/grassias) (1 comment)
* [Gregory Markou](https://github.com/GregTheGreek) (1 comment)
* [Henrique Dias](https://github.com/hacdias) (2 comments)
* [Huberto Kaiser Filho](https://github.com/hubertokf) (2 issues, 4 comments)
* [Hugo Dias](https://github.com/hugomrdias) (6 PRs, 14 reviews, 15 comments)
* [Hunter Trujillo](https://github.com/cryptoquick) (1 comment)
* [Irakli Gozalishvili](https://github.com/Gozala) (5 issues)
* [isan_rivkin](https://github.com/Isan-Rivkin) (1 PR, 1 comment)
* [IwraStudios](https://github.com/IwraStudios) (1 issue)
* [Jaco Greeff](https://github.com/jacogr) (1 comment)
* [Jacob Heun](https://github.com/jacobheun) (23 PRs, 6 issues, 66 reviews, 79 comments)
* [João Antunes](https://github.com/JGAntunes) (1 PR, 1 issue, 1 comment)
* [John Hiesey](https://github.com/jhiesey) (1 comment)
* [Lorenzo Setale ](https://github.com/koalalorenzo) (3 comments)
* [Maciej Krüger](https://github.com/mkg20001) (3 PRs, 2 issues, 2 reviews, 32 comments)
* [Marcin Rataj](https://github.com/lidel) (1 PR, 1 comment)
* [Mark Robert Henderson](https://github.com/aphelionz) (1 issue, 3 comments)
* [Martín Acosta](https://github.com/tinchoz49) (1 issue)
* [Martin Heidegger](https://github.com/martinheidegger) (1 issue)
* [Matt Joiner](https://github.com/anacrolix) (1 issue, 1 comment)
* [Matteo Collina](https://github.com/mcollina) (1 issue, 1 review)
* [Mikeal Rogers](https://github.com/mikeal) (1 PR, 4 issues, 5 comments)
* [Mikerah](https://github.com/Mikerah) (1 PR, 2 issues, 2 comments)
* [nikor](https://github.com/nikor) (3 PRs, 3 comments)
* [noot](https://github.com/noot) (1 review, 3 comments)
* [Oli Evans](https://github.com/olizilla) (3 PRs)
* [Patrick Bay](https://github.com/monicanagent) (1 issue)
* [Pedro Teixeira](https://github.com/pgte) (1 review, 5 comments)
* [Perry Kundert](https://github.com/pjkundert) (2 PRs)
* [raduiliescu83](https://github.com/raduiliescu83) (1 issue)
* [Rafael Matias](https://github.com/skylenet) (1 PR)
* [Raúl Kripalani](https://github.com/raulk) (2 issues, 9 comments)
* [Richard Schneider](https://github.com/richardschneider) (1 comment)
* [Robert Kiel](https://github.com/robertkiel) (1 PR, 1 comment)
* [Robert Misiorowski](https://github.com/rmisio) (1 issue)
* [Rod Vagg](https://github.com/rvagg) (1 PR, 1 review)
* [ron litzenberger](https://github.com/litzenberger) (3 comments)
* [Sam Strauch](https://github.com/SamTS) (1 issue)
* [Taaliman](https://github.com/taaliman) (1 issue, 1 comment)
* [Theo Gravity](https://github.com/theogravity) (1 comment)
* [Thomas Eizinger](https://github.com/thomaseizinger) (3 PRs, 1 issue, 8 comments)
* [Vasco Santos](https://github.com/vasco-santos) (22 PRs, 6 issues, 59 reviews, 35 comments)
* [Victor Bjelkholm](https://github.com/victorb) (1 review, 1 comment)
* [Volker Mische](https://github.com/vmx) (1 PR, 5 reviews, 4 comments)
* [Yusef Napora](https://github.com/yusefnapora) (2 PRs, 1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the libp2p project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [libp2p repo](https://github.com/libp2p/js-libp2p/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt#all-hands-call
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽 ](https://github.com/ipfs/team-mgmt/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about libp2p, how it works and what you can do with it is at [discuss.libp2p.io](https://discuss.libp2p.io). We are also available at the #libp2p channel on Freenode.
