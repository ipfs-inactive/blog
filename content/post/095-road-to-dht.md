---
date: 2020-05-21
url: 2020-05-21-road-to-dht
title: The Road to the new DHT
author: Molly Mackinlay
header_image: 095-road-to-dht.png
tags: go-ipfs, 0.5 release
---

![The Road to the new DHT](/header_images/095-road-to-dht.png)

At the end of April, we released our largest update to go-ipfs to date: [IPFS 0.5.0](https://blog.ipfs.io/2020-04-28-go-ipfs-0-5-0/).  This upgrade brings major performance and reliability improvements to IPFS — especially on the content discovery and routing front. These gains are brought to you largely by our rework of the Distributed Hash Table (DHT) which powers most peer and content discovery in the IPFS Public Network.

We’d like to take you through our journey to _re-write_ the DHT - from identifying the underlying issues, to how we approached designing a solution, to ensuring it would **work** in practice. Our work led to major performance gains, as well as a new development process and [Testground](https://github.com/testground/testground), a whole new tool for large-scale network testing [(read more)](https://blog.ipfs.io/2020-05-06-launching-testground/). 

**If you want to make use of these new improvements, please [upgrade to the latest IPFS now](https://docs-beta.ipfs.io/recent-releases/go-ipfs-0-5/update-procedure/#use-ipfs-update)!**
<br />

![Brendan quote](/095-road-to-dht/Brendan-quote.png)

## First a refresher:  What’s the DHT?

The [DHT or distributed hash table](https://docs.ipfs.io/guides/concepts/dht/) acts like both a catalog and navigation system for IPFS, helping the network keep track of and find data. A regular hash table is a key-value store where the keys are hashes and stored in one place. In the case of IPFS, the keys are the Content Identifiers (CIDs) of a block of data, and the values are the set of peers who have each block.

The IPFS DHT distributes and stores these pairs of keys and values in small tables across many nodes or peers throughout the network. Peers, in turn, store information about where to physically locate specific content. Kademlia, our DHT implementation, helps keep track of which nodes are _providing_ what data to others in the network.

In theory, the DHT should make finding, providing and fetching data among nodes a well-orchestrated and very efficient affair. However, throw in real world conditions and a rapidly scaling network, and things can go awry.

## Let’s Rewind

The IPFS Public Network experienced substantial growth last year, quickly scaling 30x, with **hundreds of thousands of nodes** now participating in the Network! Major software deployments and new decentralized apps came on board with expectations for a production-ready network with the reliability and performance to match. Many were using IPFS as a decentralized CDN (Content Delivery Network) to share and find content across the network. Unfortunately, due to a proliferation of new nodes unable to route peers to the desired content, the network was letting some of these users down.

{{< youtube jpQnQbfhuBc >}}

In early 2019, we started to hear rumblings around content routing issues, which were exacerbated as more and more nodes joined the network over Q1 and Q2 - many of them behind home firewalls or NATs.  We were constantly bootstrapping and patching the network to remedy performance and reliability issues.  But, we couldn’t really test the efficacy (or truly diagnose any regressions) of these patches until they were _in production_, making it hard to iterate and try out larger fixes to network configuration.

We clearly had a problem, and we were hearing about it from the community. Our first step was to investigate thoroughly to determine what fixes we should prioritize first, and identify the tooling we needed to land our changes successfully.  

## Narrowing In

After some investigation, it was clear that our DHT implementation, combined with the recent growth of undialable nodes, was the culprit behind the slow, unreliable content routing. We had a chance to investigate this more deeply while we were together at IPFS Camp, and discovered a few problem areas:

* **Peer Availability:** As new peers joined the network we treated them equally, but most couldn’t actually be reached because they are behind firewalls or NATs. DHT query time was wasted trying to dial these peers that never got requests.
* **Query Termination:** Once a DHT query came upon the data it needed, it didn’t stop! It continued searching until it found all the closest peers.
* **Routing Table Maintenance:** Routing tables were clogged with many undialable peers, resulting in searches that were linear in the number of peers they queried instead of the expected log-scale efficiency.

## Focus and Go

After this investigation, we took a hard look at our roadmap and the needs we were hearing from our core users and community to decide where to focus. Based on our research, it was clear we needed to hone in on content routing for the long-term success of IPFS.  

This meant some hard calls on prioritization - focusing our working groups on a targeted set of improvements to the DHT and routing logic to ensure we resolved these underlying performance and reliability concerns. In turn, we adjusted our product roadmap and stood up new core working groups, including one focused strictly on content routing and another on a new test infrastructure: [Testground](https://docs.testground.ai/)

![Testground](/header_images/092-launching-testground.png)

<br />
## Test, Test, Test

We’d learned from our early patches that a network of our size **needs** to be able to test changes in a close to real-world setting to be able to make improvements quickly and reliably. We had the means to do unit tests and small simulations that could prove out basic tweaks, but no way to replicate thousands of nodes or typical network configurations in order to benchmark major changes. This left us without real data on the true impact of changes until they had gone live. 

We had to change this quickly to be successful in righting the DHT. We formed a working group to remedy this gap,[Testground](https://blog.ipfs.io/2020-05-06-launching-testground/) was born. Testground is a platform for testing, benchmarking, and simulating distributed and peer-to-peer systems at scale, allowing us to validate the needed fixes and pressure test the broad DHT changes before IPFS 0.5.0 went live.

[Testground](https://blog.ipfs.io/2020-05-06-launching-testground/) gave us the tools to do _data-driven development_ in our DHT rewrite. It also helped us in other parts of the IPFS 0.5.0 release: like prototyping new potential solutions, comparing potential fixes against each other, and stress-testing the edge cases and upgrade process. The repeatability and introspection Testground gave us was _critical_ to accelerating our development velocity to reliably improve IPFS.

We're excited to share this tool with others as well, to benchmark and evaluate their p2p networks. [Start using Testground today!](https://docs.testground.ai/)

## Now for the “fix”

With Testground, we were able to benchmark and quantify our DHT issues around peer availability, query termination and routing table maintenance.  We started with simulations of the existing network - showing how our previous query logic interacted with evolving network parameters, like many nodes being undialable. 

![DHT](/095-road-to-dht/research.png)

Testground allowed us to tweak these parameters to measure which changes would have the most impact on network performance. As we gathered for a Research Summit in January to compare potential mitigations to the ongoing network challenges, we were now empowered with a **quantitative** understanding of the network structure - and the tools to immediately prototype and test out the resulting hypotheses from our discussions.

What followed was a whirlwind of test-plan writing to measure each change to the DHT logic in a real-world network setting. We tested our new systems for diagnosing undialable peers and removing them from our routing tables, measured success rates for ending our queries earlier, and even re-benchmarked our [improvements to Bitswap](https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/) to find additional improvements. Throughout these refactors, we were able to continually validate the performance of these changes with our Testground simulations, as well as a few well-placed canary nodes to run benchmarks against the full public network. 

With these tools in hand, we sprinted from the summit to our release to make it all happen. Up next, in Part 2 of this DHT Deep Dive, Adin Schmahmann will walk you through exactly what’s new with the DHT and go even deeper on the improvements we saw. In the meantime, if you haven’t upgraded yet, **[please do]](https://docs-beta.ipfs.io/recent-releases/go-ipfs-0-5/update-procedure/#use-ipfs-update)**. We’ll all reap the benefits of a more performant DHT as more and more nodes update.

{{< youtube S8a1xzdWjN0 >}}

### Learn More

* IPFS 0.5.0 Announcement: https://blog.ipfs.io/2020-04-28-go-ipfs-0-5-0/
* Release Highlights:  https://www.youtube.com/watch?v=G8FvB_0HlCE
* TestGround: https://blog.ipfs.io/2020-05-06-launching-testground/
