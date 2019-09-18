---
date: 2019-09-19
url: 2019-09-19-ipfs-desktop-0-9
title: IPFS Desktop 0.9 released
author: Henrique Dias
---

IPFS Desktop has come a long way to reach its current form. We are here to celebrate and announce the [release of 0.9.0](https://github.com/ipfs-shipyard/ipfs-desktop/releases) and share the story of this application and, of course, all the exciting new features.

## Once upon a time...

Back in May 2015, Juan Benet pushed the first so-called "Initial Commit" to start a project at the time named "ipfs-electron". The purpose of the app was quite simple and that hasn't changed much with time: providing a long running daemon, alongside with a GUI for managing it.

![Evolution of IPFS Desktop](/058-ipfs-desktop-0-9/evolution.jpg)

Regarding the application's name, it went from "ipfs-electron" to "IPFS Native Application", then to ["IPFS Station"](https://github.com/ipfs-shipyard/ipfs-desktop/commit/5a123c2c9ed0fe3ec86aad336417ddbefdea9243), it being a much fancier name. However, we [changed it again](https://github.com/ipfs-shipyard/ipfs-desktop/pull/574) to "IPFS Desktop" and that's where we are right now! It's a result of an uniformization between our applications names and the most self-explanatory option we had.

## Where we are today: IPFS Desktop 0.9.0

The newest version of IPFS Desktop, 0.9.2 - yes, we already released two patch versions! - brings more stability and some new experimental features. Although it is not a completely revamped application, such as what happened with 0.7.0, I believe this version deserves an overview of the current (and new) features and plans for the future.

### Browse the wild...

With the [recent update to the Web UI](https://github.com/ipfs-shipyard/ipfs-webui/releases/tag/v2.5.0), we are now capable of navigating through the whole IPFS system. Previously, you could only access your 'Files' (the contents of the [Mutable File System](https://proto.school/#/mutable-file-system)). Now, you can navigate not only to any `/ipfs/` or `/ipns/` path, but also any content [pinned](https://docs.ipfs.io/guides/concepts/pinning/) to your IPFS node!

![Browsing /ipns/ipns.io](/058-ipfs-desktop-0-9/browse-wild.jpg)

### Use npm on ipfs

In addition, we are introducing a new experiments section on the 'Settings' page which will allow you to enable new experimental features as they come in. To celebrate this new section, we are adding [npm on ipfs](https://github.com/ipfs-shipyard/npm-on-ipfs) to it! This is a project that allows you to use the `ipfs-npm` and `npm-ipfs` commands to install your Node.js modules through the IPFS network!

![Experiments section](/058-ipfs-desktop-0-9/npm-ipfs.jpg)

**Please note** that this feature is intended for those who have [Node.js](https://nodejs.org) installed on their system. Moreover, the activation will only work if your setup does not require additional permissions for executing `npm install -g`.

### Add `ipfs` command line tools to your system

Adding `ipfs` command line tools to your system was actually introduced in 0.8.0, but it's always worth noting that you are just a click away of having the `ipfs` command available from your command line! This way, you don't have to worry about configuring your `PATH` variable or doing other confusing stuff to start using all IPFS capabilities. Just go to Settings and enable "IPFS command line tools"!

![IPFS command line tools](/058-ipfs-desktop-0-9/ipfs-cmd.jpg)

### And more...

Other notable features from previous releases include:

- **Handle `ipfs://`, `ipns://` and `dweb:` links**. If you have IPFS Desktop installed and you click on [ipns://ipfs.io](ipns://ipfs.io) in your browser or any other application, that request will go through be redirected to your own gateway via the app, or to the public gateway if yours is not online.
- **Easily add files to IPFS**. Just drag and drop them to the application icon, either on the menubar for macOS users, or the shortcut icon for Windows users.
- **Add screenshots to IPFS**. You can click on 'Take Screenshot' on the app's menu or enable the global shortcut on "Settings". After taking a screenshot, a shareable link will be copied to your clipboard!
- **Download any CID content**. If you would like to download the contents of some CID or IPFS/IPNS path, you can copy it, go to the dropdown menu and select 'Download Hash'. Then, just pick wherever you want to write those files to! This is also available through a global shortcut.

You can also take a look at this video:

<iframe width="2000" height="600" src="https://www.youtube-nocookie.com/embed/-7jAIVeg2vQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Let's talk about future...

We are now working on the [specification](https://github.com/ipfs-shipyard/cohosting/pull/2) of a new feature called [cohosting](https://github.com/ipfs-shipyard/cohosting), i.e., having a local copy of some website on your machine. You can do that just because you would like to keep a website available to others or because you want to read it offline later. Then, IPFS Companion or IPFS Desktop would re-check every few hours to make sure the website is up to date. It would be interesting to hear your thoughts!

For the future of IPFS Desktop, we are now focusing much more on maintenance, bug fixing and improving the test suite to catch bugs before they go into production. Since this an Electron app, it is a bit harder to test than some other types of apps. If you're interested in knowing more or help us build tests, please read the issue [#1121](https://github.com/ipfs-shipyard/ipfs-desktop/issues/1121).

Is there any feature you would like to see on IPFS Desktop? If so, please [create a feature request](https://github.com/ipfs-shipyard/ipfs-desktop/issues/new)! We will certainly appreciate it.

# Don't forget...

Don't forget to [install IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop/releases) today and be part of the decentralized Internet! We also recommend you to install our browser extension, [IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion/#install), which gives your browser superpowers. Both of these applications work well together. While IPFS Desktop makes your OS InterPlanetary, IPFS Companion connects to your node on your browser, enabling further integration on your Internet interactions to the IPFS world.
