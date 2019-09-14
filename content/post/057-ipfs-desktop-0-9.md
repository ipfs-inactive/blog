---
date: 2019-09-13
url: 057-ipfs-desktop-0-9
title: IPFS Desktop 0.9 released
author: Henrique Dias
---

IPFS Desktop has come a long way to reach its current form. We are here to celebrate and announce the [release of 0.9.0](https://github.com/ipfs-shipyard/ipfs-desktop/releases) and share the story of this application and, of course, all the exciting new features.

## Once upon a time...

Back in May 2015, Juan Benet pushed the first so-called "Initial Commit" to start a project at the time named "ipfs-electron". The purpose of the app was quite simple and that hasn't changed much with time: providing a long running daemon, alongside with a GUI for managing it.

> TODO: add timeline

Regarding the application's name, it went from "ipfs-electron" to "IPFS Native Application", then to "IPFS Station", it being a much more fancier name. However, we changed it again to "IPFS Desktop" and that's where we are right now!

> TODO: screenshots of older versions

## IPFS Desktop 0.9.0

The newest version of IPFS Desktop, 0.9.2 - yes, we already released two patch versions! - brings more stability and some new experimental features. Although it is not a completely revamped application, such as what happened with 0.7.0, I believe this version deserves an overview of the current (new) features and plans for the future.

### Browse the wild...

With the recent update to the Web UI, we are now capable of navigating through the whole IPFS system. Previously, you could only access your 'Files' (the contents of the [Mutable File System](https://docs.ipfs.io/guides/concepts/mfs/) for those who enjoy technical terms). Now, you can navigate not only to any `/ipfs/` or `/ipns/` path, but also any content [pinned](https://docs.ipfs.io/guides/concepts/pinning/) to your IPFS node!

![Browing /ipns/ipns.io](/057-ipfs-desktop-0-9/browse-wild.png)

### Use npm on ipfs

In addition, we are introducing a new experiments section on the 'Settings' page which will allow you to enable new experimental features as they come in. To celebrate this new section, we are adding [npm on ipfs](https://github.com/ipfs-shipyard/npm-on-ipfs) to it! This is a project that allows you to use the `ipfs-npm` command to install your Node.js modules through the IPFS network!

![Experiments section](/057-ipfs-desktop-0-9/npm-ipfs.png)

**Please note** that this feature is intended for those who have Node.js installed on their system. Moreover, the activation will only work if your setup does not require additional permissions for executing `npm install -g`.

### Add `ipfs` command line tools to your system

Adding `ipfs` command line tools to your system was actually introduced in 0.8.0, but it's always worth noting that you are just a click away of having the `ipfs` command available from your command line! Just go to Settings and enable "IPFS command line tools"!

![IPFS command line tools](/057-ipfs-desktop-0-9/ipfs-cmd.png)

### And more...

Other notable features from previous releases include:

- **Handle `ipfs://`, `ipns://` and `dweb:` links**. If you have IPFS Desktop installed and you click on [ipns://ipfs.io](ipns://ipfs.io), that request will go through be redirected to your own gateway via the app, or to the public gateway if yours is not online.
- **Easily add files to IPFS**. Just drag and drop them to the application icon, either on the menubar for macOS users, of the shortcut icon for Windows users.
- **Add screenshots to IPFS**. You can click on 'Take Screenshot' on the app's menu or enable the global shortcut on "Settings". After taking a screenshot, a shareable link will be copied to your clipboard!
- **Download any CID content**. If you would like to download the contents of some CID or IPFS/IPNS path, you can copy it, go to the dropdown menu and select 'Download Hash'. Then, just pick wherever you want to write those files to! This is also available through a global shortcut.

You can also take a look at this video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-7jAIVeg2vQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Let's talk about future...

For the future of IPFS Desktop, we are now focusing much more on maintenance, bug fixing and improving the test suite to catch bugs before they go into production. Since this an Electron app, it is a bit harder to test than some other types of apps. If you're interesting in knowing more, please read the issue [#1121](https://github.com/ipfs-shipyard/ipfs-desktop/issues/1121).

We are now working on a concept of cohosting ... TODO: EXPLAIN

# Don't forget...

Don't forget to [install IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop/releases) today and be part of the decentralized Internet! We also recommend you to install our browser extension, [IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion/#install), which gives your browser superpowers.
