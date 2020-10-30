---
date: 2020-10-30
url: /2020-10-30-dht-hardening/
title: Hardening the IPFS public DHT against eclipse attacks
author: Jacob Heun
tags: ipfs, libp2p, dht, security
header_image: 112-dht-hardening.jpg
---

![Hardening the IPFS public DHT](/header_images/112-dht-hardening.jpg)

A major focus of IPFS for 2020 has been improving Content Routing as the network has continued to scale. While we've made [significant improvements](https://blog.ipfs.io/2020-07-20-dht-deep-dive/) to the speed of requests on the DHT, another crucial focus for us has been on the security of the network. During our work leading up to the release of go-ipfs 0.5 we were contacted by we were contacted by Bernd Prünster and Alexander Marsalek at [A-SIT](https://www.a-sit.at) and the [Graz University of Technology](https://tugraz.at), to advise us of an attack they had discovered during their research targeting go-ipfs 0.4.23 that would allow an attacker with minimal resources to eclipse any node on the public DHT. Over the past 3 minor releases of go-ipfs (0.5, 0.6 and 0.7) we've been collaborating closely with Bernd and Alexander, which has enabled us to release incremental improvements that have mitigated their original attack and increased the cost and difficulty of such attacks by several orders of magnitude. Today we'll dive into the attack and the various mitigations we've released. If you would like to read the full paper, "Total Eclipse of the Heart – Disrupting the InterPlanetary File System", you can find it at the [TU Graz Research Portal](https://graz.pure.elsevier.com/en/publications/total-eclipse-of-the-heart-disrupting-the-interplanetary-file-sys).

## Mitigating the attack

An eclipse attack refers to the ability of an attacker to isolate a peer from the rest of the network so that the targeted peer only communicates with peers controlled by the attacker. The goal of this attack is to pollute the target peers DHT routing table so that only the peers the attacker controls are present. In the attack discovered by Bernd and Alexander, they created a Sybil attack using libp2p and a massive pregenerated list of Peer IDs, totalling 29TB of data, to game the reputation system in libp2p in order to take over the routing table.

If you are not familiar with Sybil attacks, the idea is that you can use a single peer with a large number of pseudonymous IDs to subvert reputation systems in order to increase influence on the network. In the context of this attack, the false IDs end up taking the place of honest peers in the routing table of the affected peer.

In order for this attack to be successful a few vulnerabilities in libp2p were exposed, which ultimately resulted in this attack being very effective in go-ipfs 0.4.23. One of the major problems libp2p had at the time this attack was discovered is that the DHT did not favor long lived peers, and it didn't protect peers in its lower buckets (peers on the other half of the network). This issue allowed an attacker to quickly evict honest peers from the routing table of the target in favor of its dishonest peers. As part of the work to overhaul the DHT in go-ipfs 0.5, we changed how entries in the routing table are managed. One of the major changes that affects this is that we will not evict a peer from the routing table that is still available. This coupled with the rest of the improvements we made to the DHT in go-ipfs 0.5 made the attack several orders of magnitude more difficult to execute. You can read about the detailed changes to the DHT in the [IPFS 0.5 Content Routing Deep Dive](https://blog.ipfs.io/2020-07-20-dht-deep-dive/).

In addition to the changes in go-ipfs 0.5 we also fixed a couple of issues that further increased the difficulty and cost of this attack. Part of the attack's success was due to the ability of a Sybil to game the reputation system of valued connections by abusing a flaw in how scoring was done for peers acting as relays. The flaw could allow a Sybil to act as a relay to subsequent Sybil peers, which would continue to boost the score of the relay. This could be done for a single peer using nested Sybils to quickly gain a lot of unwarranted reputation. To resolve this we applied a constant score to relays which allows us to still value them, but avoids them being able to inflate their reputation. By improving the integrity of internal reputation systems, we've reduced the efficacy of Sybil attacks.

The other significant change we made to increase the cost of this type of attack is introducing IP diversity requirements into the routing table. The original attack on go-ipfs 0.4.23 was able to run on a single machine with a relatively low expense because it was possible for a routing table to contain only peers from a single host. The IP diversity requirement now caps the number of peers that can come from any given host, which makes it infeasible to perform an eclipse attack from a single machine, further increasing the cost of the attack by over two orders of magnitude from go-ipfs 0.5.

## Verifying the mitigations

As part of this collaboration with Bernd and Alexander, we wanted to ensure that we were able to properly test and verify our fixes, which we took two approaches to:

**Live testing**. With our permission, they performed a controlled attack on one of our hosted bootstrap nodes on the public network. This enabled us to gather live metrics and logs to observe the effectiveness of the attack from both our visibility and their external observations. The controlled attack was performed on each version of IPFS prior to its release starting with go-ipfs 0.5, which enabled us to validate our fixes in a production environment..

**Replication on Testground**. Thanks to the development and [release of Testground](https://blog.ipfs.io/2020-05-06-launching-testground/), and Bernd and Alexander sharing their attack code, we were able to create test plans to replicate various parts of the attack. This enabled us to do large scale testing of the changes in a controlled test environment to both verify the attack was possible, and to verify our mitigations. The benefit of having these test plans is that we can continue to run them on releases of IPFS and libp2p to ensure we don't introduce regressions. Additionally this ensures we can run the attacks for longer periods of time in a controlled environment to do further analysis on the efficacy and cost of the attacks.

## Where we are today

Over the course of this year we have made significant improvements to both the performance and security of IPFS and libp2p, and collaboration has been a huge part of making this work successful. The research Bernd and Alexander have done, and their willingness to collaborate with us so closely has been invaluable in helping us improve the stability of the network, we're grateful for having had the opportunity to work together. With the release of go-ipfs 0.7 in September we have increased the difficulty and cost of executing eclipse and Sybil attacks on IPFS and libp2p by several orders of magnitude from its 0.4.23 predecessor.

If you haven't already updated to go-ipfs 0.7 we recommend updating as soon as possible to take advantage of the full scope of these improvements. Check out the [go-ipfs 0.7 update guide](https://docs.ipfs.io/recent-releases/go-ipfs-0-7/update-procedure/#use-ipfs-update) for details on how to update!
