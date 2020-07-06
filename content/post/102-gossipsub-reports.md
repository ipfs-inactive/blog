---
date: 2020-07-06
url: /gossipsubv1.1-eval-report-and-security-audit/
title: A comprehensive Evaluation of GossipSub-v1.1 (and a new Logo!)
header_image: 102-header-image-gossipsub-reports.png
author: David Dias
tags: go-libp2p, gossipsub
---

<p align="center">
  <img src="https://gateway.ipfs.io/ipfs/QmVSk8VvxWExnYCjqg7TNW2aBnN8Wr7SzkawLUyocWq96p/Gossipsub_fullcolor.png" alt="Gossipsub logo" width="400" />
</p>

We are back with a direct follow up on the [Gossipsub v1.1 release from May](https://blog.ipfs.io/2020-05-20-gossipsub-v1.1) with the much awaited Evaluation Report and three other presents we have for you.

## ✨ The Logo

The first cat was out of the bag as soon as you opened this post – the new logo! We now have a dedicated logo for this libp2p PubSub router implementation which represents the double network nature of Gossipsub. We hope you enjoy it!

You can find all the [logo assets here](https://ipfs.io/ipfs/QmVSk8VvxWExnYCjqg7TNW2aBnN8Wr7SzkawLUyocWq96p)

## 📊 Evaluation Report

<p align="center">
  <a href="https://gateway.ipfs.io/ipfs/QmWR376YyuyLewZDzaTHXGZr7quL5LB13HRFnNdSJ3CyXu/Gossipsub%20Evaluation%20Report.pdf"><img src="https://gateway.ipfs.io/ipfs/QmWR376YyuyLewZDzaTHXGZr7quL5LB13HRFnNdSJ3CyXu/report-eval.png" width="600" /></a>
</p>

We are sharing with you a comprehensive, 61-page evaluation report, in which you can learn how we approached the testing of Gossipsub v1.1, the setting in which tests were run, and detailed descriptions of the conclusions we were able to take from such evaluation. With this evaluation, we demonstrate that GossipSub is resilient against all of the attacks studied, capable of recovering the mesh and meeting the message delivery deadline requirements of the Filecoin and the ETH2.0 blockchains.

In addition to this report, which you can [find here](https://gateway.ipfs.io/ipfs/QmWR376YyuyLewZDzaTHXGZr7quL5LB13HRFnNdSJ3CyXu/Gossipsub%20Evaluation%20Report.pdf), we are also excited to share with you:

- The code that runs the malicious actor, acronymed “bad boy”, is simpler, more lightweight, and faster than the actual GossipSub protocol code. This is because attackers don’t need to follow all protocol logic and benefit from running only the essential functions with the goal of degrading the quality of service of the network. Find the [code here](https://github.com/libp2p/gossipsub-hardening/blob/master/test/badboy.go).

- All of the Testground test plans used to test GossipSub. We are now making available all 12 configuration scripts and test plans to allow for 100% reproducibility of the tests for the wide range of attacks that we have carried out. Please explore and try them out and let us know if you find any new interesting combinations! Find the [code here](https://github.com/libp2p/gossipsub-hardening).

We went from the regular Sybil and Eclipse Attacks to tests that stretch the protocol in unconventional ways to challenge it under extreme conditions. Such attacks include:
- The “Covert Flash Attack”, where attacker nodes are behaving correctly in order to build up reputation according to GossipSub’s scoring function, occupy most connections in the mesh by pretending to be honest nodes, and then carry out a co-ordinated Eclipse attack.
- The “Cold Boot Attack”, where the network is attacked at launch time and Sybils join the network together with honest nodes. Given their majority, Sybils dominate the mesh from the get-go, potentially preventing the network from launching.

These are all very challenging attacks, which we wanted to test GossipSub against. You will be surprised to see the elegant way in which GossipSub resists all of these attacks.

## 🔏 Security Audit by Least Authority

<p align="center">
  <a href=""><img src="https://gateway.ipfs.io/ipfs/QmWR376YyuyLewZDzaTHXGZr7quL5LB13HRFnNdSJ3CyXu/report-la.png" width="600" /></a>
</p>

Additionally, we are delighted to release Least Authority’s audit report for GossipSub. Least Authority has carried out an extensive audit on GossipSub v1.1 hardening extensions, both in theory and in implementation.

It was a great experience to work with Least Authority throughout multiple fruitful discussions, LA identified multiple findings which then got mitigated by the Gossipsub team and reviewed again by LA.

Least Authority produced a report detailing all of the tests they have carried out. You can consult the [final report here](https://gateway.ipfs.io/ipfs/QmWR376YyuyLewZDzaTHXGZr7quL5LB13HRFnNdSJ3CyXu/Least%20Authority%20-%20Gossipsub%20v1.1%20Final%20Audit%20Report%20%28v2%29.pdf)

## 📜 Gossipsub Paper

<p align="center">
  <a href="LINK TO PREPRINT"><img src="https://gateway.ipfs.io/ipfs/QmWR376YyuyLewZDzaTHXGZr7quL5LB13HRFnNdSJ3CyXu/paper.png" width="600" /></a>
</p>

Finally, we are proud to share with you a preprint of a 16-page paper that puts everything together, justifies our design choices, and outlines the most important results we have gathered throughout. With this paper we want to put everything in one place, from the spec, to the details of the test setup, and the insights we have gathered from the most challenging of attacks, in a concise manner. The paper benchmarks performance of GossipSub with Bitcoin’s broadcast/flooding protocol, ETH1.0’s pubsub protocol and the vanilla version of GossipSup (the one without mitigation strategies and the scoring function integrated). The performance improvements brought by GossipSub v1.1 are really impressive and certainly rewarding of the effort that has gone into the design and testing of the protocol.

You can find the [paper here](LINK TO PREPRINT)

One last thing, as Gossipsub v1.1 adds mitigations to many attack scenarios, we found it wise to create a CVE for Gossipsub v1.0 so that users can get automatically notified through their build systems and package managers (assuming that the CVE database is being used). You can consult it at [CVE-2020-12821](LINK TO CVE)

That’s all for now. Hope you enjoy the Evaluation Report and let us know if you have questions by posting them at https://discuss.libp2p.io

**The Gossipsub Task Force** - David Dias, Dmitris Vyzovitis, Yiannis Psaras, Yusef Napora, Dirk McCormick
