---
date: 2019-08-06
url: 2019-08-06-js-ipfs-0-37
title: js-ipfs 0.37.0 released
author: Alan Shaw
---

> New constructor, better DNSLink support and delegated routing!

# 🔦 Highlights

## 👷‍♂️ Brand new constructor

We're in the middle of [converting IPFS, libp2p and IPLD modules to using async/await and async iterators](https://github.com/ipfs/js-ipfs/issues/1670) instead of callbacks. This will eventually bubble up to the JS IPFS programmatic API where there will likely be some changes that will effect your application. To ease the transition when that happens we're encouraging new and existing developers away from using our callback based APIs, towards Promise based APIs. You'll see the change reflected in our API docs soon. For now, there's no breaking changes, all existing APIs continue to work as usual with callbacks.

In this release there's a new way to construct an IPFS node using promises:

```js
const IPFS = require('ipfs')
const node = await IPFS.create()
// Done, ready to use!
```

All the usual options you'd normally pass to the constructor can be passed to `create`. Did we mention that it's completely backwards compatible? Well yeah, it is. No breaking changes here 😜 - you can still use `new IPFS()` and wait for the `ready` event as you used to. Or, alternatively, you can still use the constructor and `await` on the new "ready" promise like so:

```js
const IPFS = require('ipfs')
const node = new IPFS()
await node.ready
// Done, ready to use!
```

More details in the [IPFS constructor docs](https://github.com/ipfs/js-ipfs#ipfs-constructor).

## 🌎 Support for DNSLink IPNS name resolution

JS IPFS can finally resolve a [DNSLink](http://dnslink.io/) IPNS path. It means that `jsipfs name resolve /ipns/ipfs.io` will now query DNS for a `dnslink` TXT record and return `/ipfs/QmRq5rhjnfFHYFYbYXoqPpcJQHKu3SUuHADzSzX9ECN5eM` (for example).

It also works recursively, so your DNSLink TXT record could return another IPNS path to resolve and it would keep going. Turtles all the way down 🐢. Cowabunga!

Bonus 🎁 this also works on the gateway so `http://127.0.0.1:8080/ipns/ipfs.io` will resolve and display the ipfs.io website. Hooray 😁!

## 🧭 Delegated peer and content routing

JS IPFS now supports delegating peer and content routing to another node on the network.

What does that mean though? Well, when you delegate, you get someone else to do something. In delegated peer and content routing we get a different IPFS node to find a piece of content or another peer on the network.

Delegation allows JS IPFS to make use of the routing abilities of other nodes. Typically we delegate to IPFS nodes that have unrestricted access to a DHT. This is useful for IPFS nodes running on Node.js, in the browser, or even for nodes running in resource constrained environments.

We've setup 2 delegate nodes you can use for development and testing, check the docs for [configuring delegate routers](https://github.com/ipfs/js-ipfs#configuring-delegate-routers) in JS IPFS.

## ✨ Web UI with revamped Files & Peers

The new Web UI 2.5 version got a whole new life. We have introduced a new help system designed for new users, with explanations on each section.

The Peers page now allows you to connect to a specific peer via 'Add Connection'. We also have a revamped peers table with sorting, identicons for each peer, a simplified location, a new protocol & transport column and latency!

On the Files side, you can now look at any files in the wild. But what does that mean? You can now see your pins, remove pins, add new pins, navigate to any `/ipfs/QmHash` or `/ipns/domain.com` path and explore the IPFS world like you never did before.

# 🏗 API Changes

- New constructor. The recommended way of creating an IPFS node programmatically is now `await IPFS.create()`. This change is backwards compatible 😅
    - See [constructor documentation](https://github.com/ipfs/js-ipfs#ipfs-constructor)
- (BREAKING) Gateway now implicitly responds with the contents of `/index.html` when accessing a directory `/` instead of redirecting to `/index.html`
- Support added for `/ipns/` paths on HTTP Gateway
    - e.g. http://127.0.0.1:9090/ipns/tr.wikipedia-on-ipfs.org/wiki/Anasayfa.html
- Support added for `ipfs name resolve /ipns/<fqdn>`
- (BREAKING) `ipfs name resolve` is now recursive by default, set the `recursive` option to `false` to disable

# ❤️ Huge thank you to everyone that made this release possible

In alphabetical order, here are the 126 humans that made 2091 contributions to this release:

* [Abraham Elmahrek](https://github.com/generalpiston) (1 PR, 1 issue, 2 comments)
* [Adam Uhlíř](https://github.com/AuHau) (4 PRs, 1 issue, 5 reviews, 5 comments)
* [AkshitV](https://github.com/AkshitV) (1 issue, 1 comment)
* [Alan Shaw](https://github.com/alanshaw) (77 PRs, 18 issues, 125 reviews, 219 comments)
* [Alessandro Ricottone](https://github.com/ricott1) (2 PRs, 1 issue, 2 comments)
* [Alex Potsides](https://github.com/achingbrain) (18 PRs, 6 issues, 59 reviews, 43 comments)
* [Anarkrypto](https://github.com/anarkrypto) (3 issues)
* [André Cruz](https://github.com/satazor) (1 PR, 3 issues, 10 comments)
* [AndrewH](https://github.com/andrewheadricke) (1 issue, 1 comment)
* [Andy Hin](https://github.com/whydna) (1 issue, 1 comment)
* [antemortem](https://github.com/suzakinishi) (1 issue)
* [area](https://github.com/area) (1 comment)
* [arminsal1](https://github.com/arminsal1) (4 comments)
* [Arve Knudsen](https://github.com/aknuds1) (5 PRs, 1 issue, 3 reviews, 17 comments)
* [Asutosh](https://github.com/asutosh05) (1 comment)
* [b-rohit](https://github.com/b-rohit) (2 comments)
* [Barnyard](https://github.com/BarneyChambers) (2 issues, 1 comment)
* [Bora M. Alper](https://github.com/boramalper) (1 PR)
* [Carson Farmer](https://github.com/carsonfarmer) (1 issue, 3 comments)
* [Carsten Munk](https://github.com/stskeeps) (1 comment)
* [Chirag Shinde](https://github.com/chirag-shinde) (2 PRs, 5 comments)
* [Christopher Joel](https://github.com/cdata) (1 PR, 1 comment)
* [Clemens Brunner](https://github.com/cle1000) (1 PR, 3 comments)
* [Codecov](https://github.com/codecov-io) (1 comment)
* [Cody Eilar](https://github.com/AcidLeroy) (2 issues, 4 comments)
* [Dan Shields](https://github.com/NukeManDan) (2 PRs)
* [Daniel Constantin](https://github.com/0x6431346e) (1 comment)
* [David Dias](https://github.com/daviddias) (1 PR, 12 issues, 14 reviews, 42 comments)
* [dependabot-preview](undefined) (59 PRs, 38 comments)
* [Dietrich Ayala](https://github.com/autonome) (1 issue, 3 comments)
* [Diogo Silva](https://github.com/fsdiogo) (1 PR, 2 reviews)
* [dirkmc](https://github.com/dirkmc) (16 PRs, 7 issues, 117 reviews, 73 comments)
* [Dominic Della Valle](https://github.com/djdv) (1 PR)
* [Dzmitry Afanasenka](https://github.com/dzmitryafanasenka) (1 issue)
* [Dzmitry Bachko](https://github.com/dbachko) (1 PR)
* [Filip Š](https://github.com/filips123) (2 PRs, 1 issue, 4 comments)
* [Florian](https://github.com/sinnlosername) (1 issue)
* [Frederik Batuna](https://github.com/freddi301) (1 issue)
* [Friedel Ziegelmayer](https://github.com/dignifiedquire) (1 PR, 2 comments)
* [ghbjklhv](https://github.com/ghbjklhv) (1 issue)
* [Glenn Vandeuren](https://github.com/VandeurenGlenn) (1 issue)
* [Gopalakrishna Palem](https://github.com/KrishnaPG) (2 issues, 7 comments)
* [Gorka Ludlow](https://github.com/AquiGorka) (1 comment)
* [Gregg Altschul](https://github.com/threejeez) (1 comment)
* [Guilherme Cunha](https://github.com/guicunha) (1 issue)
* [hapsody](https://github.com/hapsody) (1 PR, 2 issues, 5 comments)
* [Harris Levine](https://github.com/pynchmeister) (4 comments)
* [Henrique Dias](https://github.com/hacdias) (3 PRs, 1 issue, 1 comment)
* [hhfeng](https://github.com/hhfeng) (2 issues, 3 comments)
* [Hugo Dias](https://github.com/hugomrdias) (17 PRs, 3 issues, 47 reviews, 45 comments)
* [Irakli Gozalishvili](https://github.com/Gozala) (10 comments)
* [Isaac Jacobs](https://github.com/didlie) (1 issue, 3 comments)
* [Jacob Heun](https://github.com/jacobheun) (23 PRs, 6 issues, 59 reviews, 141 comments)
* [Jakub](https://github.com/jakubgs) (1 PR)
* [Jesho Carmel](https://github.com/jeshocarmel) (1 comment)
* [Jim Pick](https://github.com/jimpick) (1 comment)
* [João Antunes](https://github.com/JGAntunes) (1 comment)
* [John Hiesey](https://github.com/jhiesey) (4 comments)
* [John Wehr](https://github.com/wehriam) (1 issue, 8 comments)
* [John_Suu](https://github.com/suutaku) (5 comments)
* [Jonybang](https://github.com/Jonybang) (1 PR, 1 issue, 4 comments)
* [Jordan Last](https://github.com/lastmjs) (2 comments)
* [Jorropo](https://github.com/Jorropo) (3 PRs, 3 comments)
* [Joseph Krug](https://github.com/joeykrug) (1 comment)
* [Juan Benet](https://github.com/jbenet) (1 comment)
* [Justin Maier](https://github.com/JustMaier) (1 PR, 1 issue, 8 comments)
* [Kia](https://github.com/mistakia) (1 issue, 3 comments)
* [ksvirsky](https://github.com/ksvirsky) (1 issue, 1 comment)
* [KuhnChris](https://github.com/kuhnchris) (1 PR, 2 issues, 4 comments)
* [kumavis](https://github.com/kumavis) (3 PRs, 11 reviews, 16 comments)
* [Lennart Grahl](https://github.com/lgrahl) (2 comments)
* [Leo](https://github.com/leoherzog) (1 issue, 1 comment)
* [LeonFangCN](https://github.com/LeonFangCN) (1 issue, 1 comment)
* [lin onetwo](https://github.com/linonetwo) (2 comments)
* [Lukasz Juraszek](https://github.com/elluck91) (1 comment)
* [Maciej Krüger](https://github.com/mkg20001) (2 PRs, 3 issues, 2 reviews, 23 comments)
* [Mahipatsinh Jadav](https://github.com/mhjadav-plivo) (1 comment)
* [Mapiac](https://github.com/Mapiac) (1 comment)
* [Marcin Rataj](https://github.com/lidel) (12 PRs, 7 issues, 25 reviews, 32 comments)
* [Marnee Dearman (KG7SIO)](https://github.com/MarneeDear) (1 issue)
* [Mars Robertson](https://github.com/marsrobertson) (1 comment)
* [Matt Ober](https://github.com/obo20) (2 PRs, 1 review, 11 comments)
* [Matteo Collina](https://github.com/mcollina) (3 comments)
* [Max Graey](https://github.com/MaxGraey) (6 comments)
* [Michael Avila](https://github.com/michaelavila) (1 review, 3 comments)
* [Michael Bradley](https://github.com/michaelsbradleyjr) (1 comment)
* [Michael Burns](https://github.com/mburns) (3 comments)
* [Michael FIG](https://github.com/michaelfig) (1 PR)
* [Michiel De Backker](https://github.com/backkem) (1 comment)
* [Mikeal Rogers](https://github.com/mikeal) (1 PR, 3 issues, 15 comments)
* [Mikerah](https://github.com/Mikerah) (1 comment)
* [Mikhail Ivantsov](https://github.com/darkrain) (1 issue, 2 comments)
* [Mitra Ardron](https://github.com/mitra42) (3 issues)
* [MollyM](https://github.com/momack2) (1 comment)
* [Nate Foss](https://github.com/npfoss) (1 PR, 5 issues, 5 comments)
* [Nick Popeka](https://github.com/npopeka) (1 comment)
* [Nick Poulden](https://github.com/nick) (1 PR, 2 comments)
* [ohager](https://github.com/ohager) (2 comments)
* [Oli Evans](https://github.com/olizilla) (1 PR, 3 issues, 1 review, 6 comments)
* [Pat White](https://github.com/patwhite) (1 comment)
* [Pedro Teixeira](https://github.com/pgte) (2 comments)
* [Péter Huba](https://github.com/peterhuba) (1 comment)
* [Peter Occil](https://github.com/peteroupc) (1 comment)
* [pldespaigne](https://github.com/pldespaigne) (2 comments)
* [Prabhakar Poudel](https://github.com/Prabhakar-Poudel) (9 PRs, 4 reviews, 22 comments)
* [Qmstream](https://github.com/Qmstream) (3 PRs, 1 issue, 2 comments)
* [Raul](https://github.com/rdig) (1 comment)
* [rayj00](https://github.com/rayj00) (2 issues)
* [Richard Schneider](https://github.com/richardschneider) (1 comment)
* [Robert Kiel](https://github.com/robertkiel) (1 comment)
* [Robert Misiorowski](https://github.com/rmisio) (1 issue, 1 comment)
* [Rod Vagg](https://github.com/rvagg) (9 reviews, 1 comment)
* [Saquib ul hassan](https://github.com/IamSaquib) (1 issue, 1 comment)
* [shamb0t](https://github.com/shamb0t) (1 issue, 1 comment)
* [sigmatics](https://github.com/sigma67) (1 comment)
* [Steven Allen](https://github.com/Stebalien) (1 PR, 1 issue, 1 review, 5 comments)
* [Tapasweni Pathak](https://github.com/tapaswenipathak) (2 PRs, 7 comments)
* [Teri Chadbourne](https://github.com/terichadbourne) (5 PRs, 4 comments)
* [thanusreemohan](https://github.com/thanusreemohan) (1 issue, 3 comments)
* [Topper Bowers](https://github.com/tobowers) (1 issue)
* [Vasco Santos](https://github.com/vasco-santos) (20 PRs, 4 issues, 75 reviews, 45 comments)
* [Volker Mische](https://github.com/vmx) (22 PRs, 2 issues, 9 reviews, 40 comments)
* [warlockD](https://github.com/warlockdn) (1 issue)
* [Whymarrh Whitby](https://github.com/whymarrh) (1 comment)
* [yuwiggin](https://github.com/yuwiggin) (1 comment)
* [zthomas](https://github.com/zthomas) (1 issue)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-ipfs repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
