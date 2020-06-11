---
date: 2020-06-11
url: /2020-06-11-identity-ipfs-ion/
tags: [ipfs, identity]
header_image: blog-header-ion.png
title: Decentralized Identity, IPFS and ION
author: Dietrich Ayala
---

Identity is key part of how we all interact with each other on the internet every day - sometimes every moment of every day. And sometimes each raging moment as we do the "forgot your password?" dance yet again. Regardless, forging a path forward for user-controlled online identity is a table-stakes requirement for the dweb to succeed.

But identity is hard. There are no easy solutions for interoperable decentralized digital assertions of self. Privacy, security, validity, access control, surveillance, GDPR, KYC, anonymity. It's like Inception but each nested dream level is the same minefield, and those minefields are littered with projects that've tilted at the identity windmill, leaving naught behind but vinyl stickers slowly being covered up on our laptops.

But hope has not forsaken this land. The [Decentralized Identity Foundation](https://identity.foundation/) has been plugging away at this challenge for many years, as have events like [Rebooting the Web of Trust](https://www.weboftrust.info/). And there've also been efforts to build decentralized identity systems on top IPFS, such as [IPID](https://github.com/johnnycrunch/ipid), the [Nomios.io](https://nomios.io/) and [the IPFS IDM](https://github.com/ipfs-shipyard/pm-idm), and most recently the [Ceramic Network](https://www.ceramic.network/).

But today we're celebrating the launch of a decentralized identity protocol and service from an unlikely place: Microsoft.

Microsoft has been increasingly present in open source tools and services in the past few years, and has now [launched a standards-based decentralized identity service called Ion](https://techcommunity.microsoft.com/t5/identity-standards-blog/ion-booting-up-the-network/ba-p/1441552).

![ION Logo](../img/099-identity-ipfs-ion/ion-logo.png)

Ion has been under development for over a year, and is an instance implementation of [Sidetree (a blockchain-agnostic distributed PKI protocol)](https://github.com/decentralized-identity/sidetree) that runs on the Bitcoin blockchain.

And it stores transaction data on IPFS.

![Ion architecture diagram](../img/099-identity-ipfs-ion/ion-architecture.png)

Like HTTP, IPFS does not have user identity built into the protocol. However IPFS provides resiliency, validation and future-proofing features that HTTP cannot:

* The content addressability of IPFS means that ION nodes who are pulling the CIDs off a blockchain or other underlying public network don't need to care *where* the transaction data resides - this means they can switch servers or datacenters or new storage nodes can come online without requiring any code or infrastructure changes and without the addresses needing to change.
* ION nodes also don't need to worry about the data being manipulated or tampered with, because hash-based addressing means the cryptographic verification of the data is built into the network request itself.

## IPFS in ION

The ION implementation is in JavaScript (TypeScript) so it made sense for them to use js-ipfs as a node.js service. ION rolls up batches of identity transactions, publishes it through their IPFS node and then writes the address (CID) of that batch to the Bitcoin blockchain.

In order to meet Microsoft's needs for using js-ipfs as a long-running process we added cancelable requests to all APIs, ensuring that as requests were being made and handled, the underlying objects, memory, file handles and other resources created up and down the stack are cleaned up properly. Huge thanks goes to [Alex Potsides (@achingbrain)](https://github.com/achingbrain) for implementing this long-needed feature, which shipped in [js-ipfs 0.44.0](https://blog.ipfs.io/2020-05-21-js-ipfs-0-44/).

What this looks like for developers is the ability to set timeouts on requests:

```javascript
const cid = new CID('QmWillNeverResolve')

try {
  await ipfs.get(cid, {
    timeout: 1000 // abort after 1000ms
  })
} catch (err) {
  console.err(err) // err is a TimeoutError
}
```

## Try ION Now!

This is the public beta of ION, and it is now running live on the Bitcoin blockchain.

In the launch post, Microsoft's lead on the ION project Daniel Buchner explains [how to run a node and use decentralized identities in your apps and services today](https://techcommunity.microsoft.com/t5/identity-standards-blog/ion-booting-up-the-network/ba-p/1441552).

The project is open source, built on open standards, and you can run your own node - so try it out or contribute to the project today!
