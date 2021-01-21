---
date: 2021-01-21
url: /2021-01-21-how-we-put-ipfs-in-brave/
title: "Origin Stories: IPFS in Brave"
author: Mitch Wagner
tags: browsers
header_image: how-we-built-this.png
snippet: This integration marks a major milestone for IPFS, and lays the groundwork for further experiments into improving the experience of interacting with the network via web browsers.
---

<p style="text-align: center;">
  <img src="/img/how-we-built-this.png" alt="Integrating IPFS and Brave – How We Built This">
</p>

You may have heard the news: as of [release 1.19.86](https://github.com/brave/brave-browser/releases/tag/v1.19.86), the Brave browser has officially added [InterPlanetary File System (IPFS)](https://blog.ipfs.io/2021-01-19-ipfs-in-brave/) support! This work is the result of a multi-year effort to bring the two projects together. In this post, we discuss the process in bringing this collaboration to fruition, and take a look under the hood to see how we accomplished this integration!

## Collaboration
Both Brave and IPFS have a long history of successful partnerships with other projects and vendors. Brave now ships with built-in wallets for cryptocurrencies, private windows that leverage Tor, and a highly integrated VPN option. IPFS, meanwhile, has collaborated with such names as Microsoft (developing a [decentralized identity stack](https://blog.ipfs.io/2020-06-11-identity-ipfs-ion/)), Netflix (experimenting [fetching Docker images via IPFS](https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/)), and NixOS (decentralizing [source code and build products](https://blog.ipfs.io/2020-09-08-nix-ipfs-milestone-1/)).

![](119-brave-how-we-built-this/ipfs-early.png)
*Early experiment showcasing IPFS URI resolution in Brave*

This integration between IPFS and Brave is itself the product of a long-running experimental collaboration that began in [2017](https://github.com/brave/browser-laptop/issues/9556#issuecomment-352453877), back in the days when the Brave UI was still powered by Muon (a fork of Electron). In fact, this initiative got as far as a [proof of concept implementation](https://github.com/brave/browser-laptop/issues/9556#issuecomment-369757871) that provided for the resolution of the IPFS URIs in Brave’s address bar!

![](119-brave-how-we-built-this/ipfs-streaming.jpg)
*An initial attempt at streaming IPFS files in Brave via IPFS Companion*

Shortly after this initial success, however, Brave switched to Chromium for its engine. While this was a set-back for IPFS integration in the short-term, this early work laid the foundation for recent efforts at combining the two projects. The switch also gave Brave full compatibility with Chromium browser extensions to Brave, allowing users to take full advantage of the [IPFS Companion extension](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch?hl=en) while we developed a native solution.

Over the next two years, the teams behind Brave and IPFS would continue to come together to work toward full IPFS compatibility within the browser. [New plans](https://github.com/brave/brave-browser/issues/819#issuecomment-415792868) were made, and contributors from both teams and [the broader community](https://github.com/brave/brave-core-crx-packager/pull/21) began to chart the path toward this vision. In the interim, control over the browser source code allowed the teams to more tightly integrate the IPFS Companion extension into Brave: the Chrome sockets API (not normally exposed to Chrome Apps) made it possible to [embed a js-ipfs node with true TCP transport](https://github.com/brave/brave-browser/issues/819#issuecomment-456039555) within the extension, and Brave updated their settings menu to include a [one-click install](https://github.com/brave/brave-browser/issues/819#issuecomment-552444341) of the Companion.

![](119-brave-how-we-built-this/ipfs-install.png)
*One-click install of the IPFS Companion in the Brave settings menu*

Eventually, a confluence of factors, including the [deprecation of the Chrome sockets API](https://9to5google.com/2020/01/15/google-killing-chrome-apps/), generated [a push](https://github.com/brave/brave-browser/issues/10220) to get a full IPFS node running, fully managed, within Brave. After six months of work, we have finally realized this long-term goal!

## Architecture
A key goal of this integration was to make the use of IPFS as seamless as possible for users, while also respecting and preserving their control over the browser. When users enter an <code>ipfs://</code> or <code>ipns://</code> URI into their address bar for the first time, Brave will issue a prompt, asking whether or not they would prefer to resolve the link using a [public IPFS gateway](https://docs.ipfs.io/concepts/ipfs-gateway/) (by default, Brave uses [https://dweb.link](), though users can configure this) or via their own local IPFS node, managed by Brave. Initiating a Brave-managed local node is also possible through the interface of the IPFS Companion extension.

By supporting multiple configurations and requiring user consent before the deployment of a local node, Brave ensures it is acting in accordance with the original philosophy and vision of browsers as *user* agents, existing to serve the user, rather than vice versa. The choices of who to trust and whether to run peer-to-peer software on their computer remain entirely in user hands. Run your own node, or delegate integrity validation to a gateway you trust.

### Local Node Implementation
If a user wants Brave to run a local node on their behalf, all they need to do is click a single button. Once Brave has permission, it will download the latest release of [go-ipfs](https://github.com/ipfs/go-ipfs) (currently the most mature IPFS implementation) for the user’s platform. It will then handle all management involved, running the go-ipfs daemon in the background.

Brave and go-ipfs fit together perfectly: go-ipfs provides HTTP interoperability for IPFS, while Brave itself is an HTTP portal. This creates a natural interface between the two, bridging the gap between their feature sets and greatly simplifying integration. Both projects are available for the major desktop environments (Windows, macOS, Linux) as well, so having Brave act as a wrapper for go-ipfs is a solution that works well regardless of platform.

Behind the scenes, Brave stores all IPFS data, including the file repository, inside of a user’s Brave profile. It will fetch updates to go-ipfs when they become available, and will migrate the underlying IPFS repository when necessary. Clearing the browser cache also initiates IPFS garbage collection, clearing any resource not [pinned](https://docs.ipfs.io/how-to/pin-files/#three-kinds-of-pins) or kept in [MFS](https://docs.ipfs.io/concepts/file-systems/#mutable-file-system-mfs).

Taken together, this means that there is little to no compromise in running a node inside of Brave instead of running a node manually: users get the best implementation of IPFS currently available, along with automatic updates. Nevertheless, the steps taken to isolate Brave-run nodes ensure that users that also wish to run nodes manually will be able to do so without any collision.

## Future Work
This integration marks a major milestone for IPFS, and lays the groundwork for further experiments into improving the experience of interacting with the network via web browsers.

In particular, having native URI resolution in the browser’s address bar opens up a number of different research questions. How should new concepts, like the integrity guarantees IPFS affords, be communicated to users? How do we explain the principles of peer-to-peer networking to a large user base? And perhaps most importantly, how do we bring awareness of non-traditional URIs to users, and help them acclimate to a world where links are preceded by letters other than “http”?

Indeed, such research is [already underway](https://github.com/ipfs/browser-design-guidelines), particularly in the [mobile space](https://blog.ipfs.io/2020-04-24-ipfs-mobile-design-research-findings/), thanks to the introduction of IPFS in the [Opera for Android browser](https://blog.ipfs.io/2020-03-30-ipfs-in-opera-for-android/) last year.  Nevertheless, there remains a tremendous amount of work to do. By integrating with Brave, the IPFS network extends its reach to millions of potential participants - people from every background imaginable. New interfaces and metaphors are needed to make interaction simple, intuitive, and accessible for all of these users.

IPFS’s collaboration with Brave also provides further momentum for changes taking place with browser ecosystems. This includes increasing the URIs and network protocols browsers are capable of recognizing - the IANA standards body recently approved a number of URI schemes, including [ipfs and ipns](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml) - as well as pushing to introduce native handling of these protocols in the browser itself, rather than delegating that functionality to separate applications or third-party gateways.

In short, this integration opens a whole new chapter for IPFS, and represents a significant step toward mainstream embrace of a [content-addressed](https://docs.ipfs.io/concepts/content-addressing/) web. Through collaborations and research, IPFS is becoming increasingly accessible and easy to use, extending the reach of the distributed web further than ever before.
