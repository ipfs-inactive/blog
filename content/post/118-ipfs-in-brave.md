---
date: 2021-01-19
url: /2021-01-19-ipfs-in-brave/
title: IPFS in Brave - Native Access to the Distributed Web
author: Dietrich Ayala
tags: browsers
header_image: ipfs-in-brave.png
snippet: Announcing the integration of IPFS in the Brave browser, completing the vision of a native distributed web experience in a modern web browser.
---

![IPFS in Brave - Native Access to the Distributed Web](https://blog.ipfs.io/img/ipfs-in-brave.png)

We are excited to announce that IPFS is now natively supported in the Brave web browser. With [over 20 million users](https://brave.com/20m-mau/), Brave has made the distributed web easily available for the people who need it most. This is the first time a major browser has implemented native support for IPFS, and is a major step towards a more resilient, user-first internet.

While the IPFS protocol is still in development, making it more easily available is important for users who have real problems in their daily online lives - internet outages and shutdowns, censorship of critical information such as COVID-19 news, high cost of internet access, and the ability to share and collaborate in offline or disconnected environments. These aren’t problems everyone has, and people who don’t have these problems at all may not understand why IPFS is so important. But for those who desperately need a resilient internet that puts them in control of their online experiences, IPFS is now just one-click to install in the Brave browser.

<p style="text-align: center;">
<h2><a href="https://brave.com/download">Download Brave browser now</a></h2>
</p>

## IPFS Features in Brave
Brave has integrated IPFS into its desktop web browser for Windows, macOS, and Linux. When Brave detects an address which is an HTTP gateway URL to IPFS content, or a native IPFS address such as <code>ipfs://</code> or <code>ipns://</code> it will prompt the user to install and enable the native IPFS node, or to use an HTTP gateway. The default gateway used is dweb.link, which is run by Protocol Labs. Users can also specify a gateway of their choice in the browser settings. You can access the IPFS administrative UI at <code>brave://ipfs,</code>, or enable IPFS Companion and select “My Node” button in the main menu.

<p style="text-align: center;">
  <img src="../img/brave-enable-ipfs.gif" alt="Screencast gif showing how an IPFS address triggers the infobar in Brave for enabling a full IPFS node.">
</p>

## Why Web Browsers?
The modern web browser enables experimentation, innovation, and new models of collaboration and exchange of value on the internet. The ubiquity of the web runtime and the low barrier to content creation make it ideal for easing access to content and applications by both creators and consumers.

However, the underlying protocol of the web today is HTTP, which dictates where power exists in those applications. HTTP puts publishers in complete control of service availability and data access, making end users passive receivers instead of having agency in the relationship. IPFS changes this dynamic by enabling direct communication and sharing between users over a cooperative public network.

The web today doesn’t allow this type of architecture, and it’s very slow to change. Brave’s inclusion of IPFS is a huge step forward in redefining the power dynamics of today’s internet architecture, and putting individuals in control instead of publishers.

## A Long Road
Changing the web is hard, and takes a long time. The goal of making IPFS easily available as a native web protocol is ambitious, but we’ve been making progress. This launch by Brave is the culmination of years of effort to understand how IPFS might work in browsers, what the security model needs to be, experiments with different approaches for embedding, and working with browser vendors to make it possible.

Early work to understand use-cases and challenges started in the [AreWeDistributedYet](https://arewedistributedyet.com/) project, where a number of distributed and decentralized web projects contribute and track browser support for these alternative protocols. The [IPFS In Web Browsers](https://github.com/ipfs/in-web-browsers) repo is where we track our efforts for IPFS. In 2019, we [summed up the momentum building](https://blog.ipfs.io/2019-10-08-ipfs-browsers-update/) as Brave added IPFS Companion support, Opera announced plans for IPFS support, and shared other experiments and interested browsers.

In March of 2020, [Opera released IPFS native addressing in their Android browser](https://blog.ipfs.io/2020-03-30-ipfs-in-opera-for-android/), a first for the protocol. It was a big step, but still used HTTP to connect to the IPFS network, so it didn’t provide all the benefits IPFS can bring when used natively.

In 2020, [we started working with Igalia](https://blog.ipfs.io/2021-01-15-ipfs-and-igalia-collaborate-on-dweb-in-browsers/) to fix problems in the browsers themselves - identifying the compatibility issues, interoperability gaps, security model ambiguities, and missing APIs that prevented progress on a distributed web. Their expertise enabled a huge number of fixes to Chromium, Webkit, and Gecko open source projects which not only help IPFS and dweb projects, but make the web better for all developers. Read about this initiative and see all browser fixes landed [in this post by Frédéric Wang of Igalia on our blog](https://blog.ipfs.io/2021-01-15-ipfs-and-igalia-collaborate-on-dweb-in-browsers/).

## What’s Next
This initial release of native support for IPFS in Brave provides basic node functionality. There’s still a lot to do - here’s a list of some planned work for this year, and areas we’d like to experiment in, as well:
* Improve performance and stability - reduce memory, CPU, and bandwidth use
* Ease both publishing and sharing of IPFS content in browser UI
* Add features for revisitation, co-hosting, and offline/local collaboration
* Define the application model for IPFS web apps
* Experiment with integrating the features and economic models of Basic Attention Token and Filecoin
* Develop the security and privacy user interface and visual language for IPFS in the browser address bar
* Add IPFS support to Brave’s Android browser

[Install Brave now!](https://brave.com/) Try the IPFS features and let us know how it went. You can report issues in [Brave’s GitHub repo](https://github.com/brave/brave-browser), in the [IPFS In Web Browsers](https://github.com/ipfs/in-web-browsers) repo, or join us in discussion on the [IPFS forums](https://discuss.ipfs.io/).
