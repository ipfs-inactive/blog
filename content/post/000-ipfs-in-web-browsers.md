---
date: 2019-10-07
url: 2019-10-07-ipfs-browsers-update
title: IPFS Browser Update
author: Dietrich Ayala
---
Decentralization can feel slow in providing user-centric approaches to the internet's biggest problems. Right now, true user agency is often too technical, too fragile, and too time-consuming to be the default choice.

But we're making headway. Today, we'd like to share some collaborations the IPFS project has had in the works for a while, which bring us a few steps closer to making unmediated access to information *just work*... by solving that "last mile" problem and *integrating IPFS directly into web browsers*!

## Stages

The path to a truly decentralized web is a long one. For over 30 years the browser has been a [*client*](https://en.wikipedia.org/wiki/Client_(computing)) - but a foundational concept in P2P systems is that a participant is both a client *and a server*. Web browser vendors and web standards bodies have not designed for this architectural shift, so we're breaking it down into steps.

Initially, we're aiming to ease access to the IPFS HTTP gateways - creating a bridge between the billions of people on the centralized web and content on the distributed web. We expect some experimentation in the next phase - adjusting node behavior based on browser APIs, device capabilities, bandwidth availability and power consumption - while we grow adoption with our browser partners as we learn and build common understanding at standards bodies. Ultimately, we aim to have multiple browsers implement fully native (and interoperable!) IPFS support.

(INSERT STAGES DIAGRAM)

## Firefox

> Perhaps it makes sense to mention Firefox as a full recap-like section here, afaik we did not blog about libdweb at all yet. 
> Idea: start with mentioning we've been working with Mozilla on initial APIs since 2018, mention [experimental protocol handler](https://github.com/ipfs-shipyard/ipfs-companion/pull/533) and [local discovery + TCP transport](https://github.com/ipfs-shipyard/ipfs-companion/pull/553) and include video demos from 2018: user-facing handler https://www.youtube.com/watch?v=fS8pLOQdOoM + optionally https://www.youtube.com/watch?v=FRzyWUXIyeo then end this section with hopes to see those APIs start landing in Nightly as a soft pressure by shining some light on this. 
> Thoughts? [name=lidel]

## Brave

Brave has tended to live up to its name since the beginning - riling up the browser, publisher and crypto worlds. [Since 2018](https://github.com/brave/brave-browser/issues/819) we've been working with Brave on IPFS support in some form, and the results of that work are now emerging.

Today you can open [brave://settings/extensions](brave://settings/extensions) in Brave and see a toggle for enabling IPFS Companion.

![Enabling IPFS Companion in Brave](https://file.globalupload.io/ZVxjmPZ48E.gif)

Removing this install step *really matters* for adoption. While technical users are familiar with browser extensions, it's less comfortable for non-technical users.

In the future, when you [load a URL beginning with "ipfs://"](https://github.com/brave/brave-browser/issues/3045), Brave will prompt you to enable the extension, providing a smooth discovery and onboarding experience.

But that isn't all. One of the biggest barriers to even just experimenting with true p2p networks in browsers is the lack of APIs available to extensions and web pages. The primitives of most p2p systems are filesystem access, raw TCP sockets, UDP sockets for broadcast and receive, and in browsers you need a way to navigate using a custom protocol. We've figured out one piece of that puzzle while working with Brave: Chromium OS sockets!

[Chromium OS](https://en.wikipedia.org/wiki/Chromium_OS) has a raw sockets API, but it's disabled in the regular browser. Brave has modified their build to whitelist those APIs for IPFS Companion to use. 

These powerful APIs enable the js-ipfs node embedded in the browser to provide a *true* P2P experience without the need for an external daemon:

* Embedded HTTP Gateway removes reliance on public gateways
* TCP transport improves connectivity (enables direct interop with go-ipfs)
* UDP sockets enable DNS-based service discovery of go-ipfs in LAN, and we are working on browser to browser discovery methods that work in offline environments


By default, our browser extension still expects [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop#ipfs-desktop) to be installed, however you can select the experimental option shown below.

![IPFS configuration option for embedded node using Chrome sockets API in Brave](https://file.globalupload.io/g3217mupyf.png)

## Opera

Opera is another [early leader](https://blogs.opera.com/mobile/2018/12/ofa-49-with-crypto/) in the space. They've developed *native* crypto wallets in their browsers, which began shipping in 2018 in Android and are now released in their iOS and desktop browsers as well.

Earlier this year [Opera announced they were working on support for IPFS](https://twitter.com/ensdomains/status/1102884419017297921)! We've been talking ever since, and are looking forward to launch IPFS support in their Android browser by the end of this year.

![Opera announcing ENS and IPFS at EthCC March 2019](https://file.globalupload.io/fE5aG9KKAr.png)

## The Work is Just Beginning

Integrated IPFS gateway support is one big step forward, but as the name implies, it isn't truly decentralized. Only when a browser can be a full participant in the network - both a client *and* a server - will we have a truly distributed web. 

These early-adopters light the way, proving out what works and doesn't, and easing development for dapp developers in the near term.

But there's a lot of work to be done. IPFS  itself is still in flux, with major work ongoing in performance and robustness, and new features around privacy and content filtering.

We're working on detailed use-cases to share with standards bodies, and a threat model that browser vendors can build and design against. Both are prerequisites for a future where all major browsers have interoperable implementations, which is what would make IPFS truly be part of the web.

Web browsers have been solely a client for over 30 years - putting all power in the hands of the server. This year marks a paradigmatic shift in the belief of what a browser can be. Change is now happening at the level from which that power is derived: the network.

## This is a Preview!

Consider this a sneak peek. There's more on the way:

* In Brave, the gateway is, well... a gateway to even more: We're working on local discovery (mDNS) of IPFS nodes, and also Brave-to-Brave connectivity for embedded nodes.
* We're continuing our experiments with [libdweb](https://github.com/mozilla/libdweb) in Firefox, both on desktop and Android. 
* Puma browser, the first mobile browser with support for [Coil's micropayments for publishers](https://www.grantfortheweb.org/), is interested in IPFS support. If you're a mobile developer interested in this work, [contact me](mailto:dietrich@protocol.ai)!
* We're exploring what a native Chromium implementation might look like. If you're an experienced Chromium developer, [contact me](mailto:dietrich@protocol.ai)!
