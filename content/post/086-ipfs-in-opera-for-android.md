# IPFS in Opera for Android

![IPFS built-in to Opera for Android](https://user-images.githubusercontent.com/22168118/77353095-a3b36900-6d40-11ea-9675-102e0e245adf.png)

As we hinted at in our post last fall about [IPFS in web browsers](https://blog.ipfs.io/2019-10-08-ipfs-browsers-update/), IPFS support in the Opera web browser has been in development for some time.

Today, Opera for Android 57 is live in the Google Play Store with IPFS integration. [Install Opera Android with IPFS now](https://play.google.com/store/apps/details?id=com.opera.browser).

[![Screenshot of Opera for Android in the Google Play Store, linked to the URL of that page](https://i.imgur.com/MJJg0fo.png)](https://play.google.com/store/apps/details?id=com.opera.browser)


This release is a huge leap forward for the IPFS project, with a couple of important milestones:

* This is the first time IPFS is *enabled by default*, right out of the box, in a production release of a web browser.
* This is the first time IPFS is able to be directly addressed as a *addressable protocol* in a production release of a web browser. You can type ipfs:// in the address bar, and Opera for Android will load the provided content address.
* This is the first *mobile* web browser that is shipping IPFS support in a production release, easing access to decentralized content on the devices used by most internet users around the world.

This is not just a win for IPFS, but for the distributed web, peer-to-peer and the idea of content addressability:

*For the first time, a major web browser does not ask the user to specify which server the content should be fetched from.*

This is a paradigmatic change in the network architecture of the web. While the IPFS protocol itself is still not complete, this type of bold experimentation by companies like Opera accelerates our goal of truly putting users in control of their experience on the internet.

## Using IPFS in Opera for Android

The IPFS features are enabled by default, so as a user you don't need to do anything to turn them on.

![Screenshots of entering an ipfs:// address in Opera for Android, and loading it.](https://i.imgur.com/xcCQtrT.png)

You can load an IPFS content address such as:

>[ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/](ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/)

If you click the link above in Opera for Android you'll see Wikipedia, served from IPFS!

Here's what that same address looks like from an HTTP gateway, which will work in all browsers:

> https://ipfs.io/ipfs/bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/

As you can see, raw IPFS addresses can quite long and provide little human-readable elements. While many people do not understand what HTTP URLs actually mean, the human readable parts of them have meaning and build trust for users (We're publishing [some research](https://github.com/ipfs/browser-design-guidelines) about this soon!).

There's a lot more work to do in maturing [naming in IPFS and distributed web efforts generally](https://github.com/ipfs/notes/blob/master/OPEN_PROBLEMS/HUMAN_READABLE_NAMING.md), but some services have already launched efforts to bridge this gap.

You can register *decentralized domain names* that map to IPFS addresses using services like [Unstoppable Domains](unstoppabledomains.com/) or the [Ethereum Name System (ENS)](https://medium.com/the-ethereum-name-service/ethdns-9d56298fa38a?source=rss----63df5ce4636f---4).

## Implementation

The implementation in Opera for Android is a native protocol handler that uses an IPFS HTTP gateway to fulfill the request. This approach provides a balance - it is respectful of mobile device resources like battery and bandwidth, while easing access to IPFS for early web3 developers. As IPFS continues to mature, we're evaluating what a more full featured node on mobile devices might be, and look forward to experimenting with collaborators like Opera to see that vision of a fully decentralized web become real.

IPFS features in this implementation:

* Implements the [IPFS Web Browser Addressing specification](https://github.com/ipfs/in-web-browsers/blob/master/ADDRESSING.md), both "ipfs://" and "ipns://"
* Configurable HTTP gateway, with Infura as the default
* Supports [subdomain gateways](https://docs-beta.ipfs.io/how-to/address-ipfs-on-web/#subdomain-gateway) for secure web apps
* Supports mixed protocol use, such as loading images over IPFS in an HTTP web page

Read on to learn more about these features below.

## Native Protocol Addressing

Opera has implemented the protocol handler using the IPFS Web Browser Addressing specification. This specification defines how IPFS addresses should be constructed and handled in web browsers.

Implementation of this specification means that browser allows navigation to address that have schemes such as `ipfs://` or `ipns://`.
In addition to navigating to content with these schemes in the address bar, mixed content scenarios are also possible. Examples are XMLHTTPRequest or Fetch requests, external style sheets, or images:

> &lt;img src="ipfs://..."&gt;

You can easily check compatibility and level of implementation using the [IPFS protocol handler smoketest page](https://ipfs.github.io/in-web-browsers/ipfs-protocol-handler-support-tests.html).

Here's what it looks like in a browser that doesn't support IPFS addresses. In Opera for Android, the image loads the same in both cases.

![Screenshot of a failed image test in the IPFS protocol handler smoketests.](https://i.imgur.com/sI0uvrK.png)

## HTTP Gateways

The core of the IPFS support in Opera for Android is the transfer of native IPFS addresses navigations to an IPFS HTTP gateway - a server which connects directly to the IPFS network on your behalf.

The default gateway in Opera for Android is dweb.link, a gateway run by Protocol Labs. This may change in the future, as other gateway services upgrade to IPFS 0.5 next month, which contains a number of important performance, stability and security improvements.

You can configure the gateway in the Crypto Wallet settings, as shown here:

![](https://i.imgur.com/SzEPRYJ.gif)

The setting has several choices of gateway built in, and also allows you to set a *custom* gateway. Perhaps you run your own gateway, or are running an IPFS node on your device and it has a local gateway.

Here's a list of [public gateways provided by the community](https://ipfs.github.io/public-gateway-checker/).

## Get Involved

If you're interested in IPFS in web browsers, join our channel on IRC on Freenode [#ipfs-in-web-browsers](ircs://irc.freenode.net/#ipfs-in-web-browsers), which is also [bridged on Matrix](https://matrix.to/#/!LiCFQLjSxdKuUVxokg:matrix.org?via=matrix.org&via=tomesh.net).

You can file issues and follow along with our browser integration work at [ipfs/in-web-browsers](https://github.com/ipfs/in-web-browsers).

We welcome your help in bringing the distributed web to browsers! Have an idea for an IPFS+browsers project you want to build? Maybe we want to fund it! Take a look at the [IPFS DevGrants program](https://github.com/ipfs/devgrants), where we fund work that contributes materially to the success of IPFS.

Now go install [Opera for Android](https://play.google.com/store/apps/details?id=com.opera.browser) and try your your favorite web3 apps and pages on your phone!
