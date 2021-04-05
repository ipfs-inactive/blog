---
date: 2021-04-05
url: /2021-04-05-storing-nfts-on-ipfs
title: Storing NFTs on IPFS
author: Yusef Napora & Mitch Wagner
tags: NFTs
header_image: 128-nft-header.png
snippet: Learn best practices for addressing and storing data for NFTs using IPFS, for NFTs that stand the test of time.
---

<p style="text-align: center;">
  <img src="/header_images/128-nft-header.png" alt="The IPFS cube logo with a nyancat-style rainbow trailing it">
</p>

Permanence and immutability are part of the core value proposition of a non-fungible token (NFT). Unfortunately, many NFTs being targeted at consumers today offer neither of these properties due to fundamental design flaws. It is common to hear claims that NFTs “live on a blockchain forever”, but frequently, due to the cost and space limitations of storing data on a blockchain, only the ownership _record_ is actually stored, with metadata linking to the actual content of the NFT.

All too often, [these links are fragile](https://www.vice.com/en/article/pkdj79/peoples-expensive-nfts-keep-vanishing-this-is-why), and direct the user to a specific _location_ using the HTTP protocol, rather than a specific asset. This means that the content pointed to by the link could change or go offline at any point in the future, leaving the original asset lost forever (and the record of ownership worthless).

The InterPlanetary Filesystem (IPFS) can help address these concerns, and NFTs that leverage IPFS gain several advantages. However, adhering to established conventions is critical to ensure the permanence and accessibility of data stored on the network. With non-fungible tokens (NFTs) surging in popularity, it’s a good time to revisit best practices for linking and storing NFT data on IPFS. In this post, we’ll address two areas of recent concern in particular: content addressing and content integrity. You can find more details on the IPFS documentation site, in our new article [Best Practices for Storing NFT Data using IPFS](https://docs.ipfs.io/how-to/best-practices-for-nft-data/).

## Content Addressing

IPFS [content identifiers](https://docs.ipfs.io/guides/concepts/cid/) (CIDs) are an extremely robust and flexible way to uniquely identify any content, no matter where or how it is stored. To take maximum advantage of these strengths, developers should adhere to the following recommendations and conventions for linking to IPFS data.

### Linking Overview
This blog post is not intended to be a comprehensive explanation of CIDs (for that, see other [fantastic resources](https://docs.ipfs.io/how-to/address-ipfs-on-web/#dweb-addressing-in-brief)). However, readers should be aware of the following distinctions:

#### Raw CID

Self-describing, unique identifier for a piece of content.

Example: `bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

A CID is the most compact form of IPFS link, which makes it well-suited to storing inside a smart contract. When returning links to IPFS data from a smart contract, the CID should be converted to an IPFS URI.

#### IPFS URI

 A [Uniform Resource Identifier](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier), or URI, is used to specify a particular piece of content in a given context. The context is determined by the URI scheme (appended to the URI as a prefix, followed by `://`). The URI scheme for IPFS is simply `ipfs`. The URI can optionally include a path appended to the end.

Examples:

- `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`
- `ipfs://bafybeigvafaks2bvivtv46n2z7uxszpvl25jhvzc6dbhnjjgjkbeia5jta/nft.mp4`

IPFS URIs are the canonical representation for an IPFS link pointing at a file or a directory. When linking from a smart contract to IPFS data, use IPFS URIs to clearly indicate that the data should be retrieved using IPFS.

IPFS URIs should also be used inside the structured metadata for NFTs when linking to images and other media assets stored on IPFS.

#### HTTP Gateway URL

[HTTP gateways](https://docs.ipfs.io/how-to/address-ipfs-on-web/#http-gateways) provide interoperability for legacy browsers that cannot resolve IPFS URIs natively. Such links should only be used in an application’s presentation layer, and should not be stored on a blockchain or inside NFT metadata.

Example: `https://dweb.link/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

Note that gateways _recentralize the distribution of content_, presenting both a man-in-the-middle vector and single point of failure — if the gateway operator goes offline or is unreachable, the link will break. However, browsers with built-in support for IPFS (either via the [IPFS Companion](https://docs.ipfs.io/install/ipfs-companion/) browser extension, or via native support, such as [provided by Brave](https://brave.com/ipfs-support/)) are immune to these problems, as they can automatically extract the CID from such links, and load the data from IPFS according to user preferences.

### Addressing in Various Contexts

Developers should format links differently, depending on context.

#### On-Chain

An IPFS CID is a compact, self-describing link to IPFS content, and CIDs can be stored on-chain without the `ipfs://` URI prefix to save space.

Although it’s possible to encode CIDs into a [compact binary form](https://github.com/multiformats/cid#how-does-it-work), most NFT smart contract interfaces expect links to external data to be in the form of a URI string. Storing CIDs as strings makes it easy to produce IPFS URIs inside a smart contract without needing to re-encode the binary data.

#### Metadata

In token metadata, IPFS URIs should be used as the most unambiguous and future-proof method of linking to IPFS resources in plain text. Developers may optionally wish to include links to public [HTTP gateways](https://docs.ipfs.io/how-to/address-ipfs-on-web/#http-gateways) for legacy interoperability.

Other alternatives for linking to the content (e.g., non-gateway HTTP URLs) should ideally be avoided. As the content served over HTTP from a particular location is subject to change, such a link cannot be relied upon as anything other than a temporary content mirror. On a blockchain, where data is permanently and immutably stored, referencing content via HTTP is thus profoundly wasteful.

In contrast, IPFS CIDs are valid forever, and as such, may safely be considered the canonical source for their data. 

By using an IPFS URI as the “source of truth” for links, an application can easily support multiple gateways or switch to [different gateways](https://ipfs.github.io/public-gateway-checker/) over time, simply by generating new gateway links. This is more flexible than “hard-coding” a specific gateway into a permanent blockchain record.

#### Application

In user-facing applications, developers should link to IPFS content via both:

1. An IPFS URI
1. An HTTP gateway URL

until such a time as more browsers support native resolution of the IPFS URI scheme. Note that both kinds of link can easily be generated from a raw CID or IPFS URI as needed.

## Integrity

A major concern for NFTs is the integrity of the asset - this includes both the asset itself and any data associated with it. While IPFS can help address these concerns, developers should adhere to the following recommendations to gain the most benefit.

### Linking Metadata to its Asset

A token’s metadata should be considered integral to the value of an NFT. Thus, to preserve the asset’s value, metadata should be stored on IPFS with the asset, to ensure that both remain accessible.

The preferred method for achieving this is as follows:

1. Create two new directories (one for the asset, and one for the metadata)
1. Add the asset to its directory
1. Add the asset’s directory to IPFS, noting its CID
1. Create the metadata in its own directory, referencing the asset using the CID from (3) inside an IPFS URI
1. Add the metadata’s directory to IPFS, noting its CID
1. Store the CID from (5) on-chain to form the record of ownership

This process both preserves the ability of developers to include filenames in their links (valuable for user interaction), while ensuring that the metadata and asset can be referenced independent of each other.

- The metadata will be accessible at: `ipfs://{metadata-directory-CID}/metadata-filename`
- The asset will be accessible at: `ipfs://{asset-directory-CID}/asset-filename`

### High Availability

One of the primary reasons for using a decentralized network like IPFS to serve content is to forestall [link rot](https://en.wikipedia.org/wiki/Link_rot). This is achieved by allowing other nodes in the network to mirror data via cohosting. However, developers wishing to ensure the availability of content should not rely on the altruism of other nodes. To ensure that linked content remains available, developers should host it themselves by [pinning](https://docs.ipfs.io/concepts/persistence/) the CIDs of the content on IPFS nodes they manage, preserving and distributing the content alongside any others who wish to help. Should they prefer, developers can also delegate this responsibility via [pinning services](https://docs.ipfs.io/how-to/work-with-pinning-services/).