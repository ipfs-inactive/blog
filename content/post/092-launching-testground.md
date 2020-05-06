---
date: 2020-05-06
url: 2020-05-06-launching-testground
title: Launching Testground v0.5
author: Raul Kripalani
header_image: 092-launching-testground.png
tags: testground, release
---
![Launching Testground](/header_images/092-launching-testground.png)


Testing peer-to-peer (p2p) systems is hard. Doing so reliably and reproducibly is even harder. Today, **we’re releasing Testground v0.5 to the world**. This is a huge milestone for us, and for the wider p2p ecosystem. In this post, we’ll walk you through what Testground is, how to get started, what’s coming next, and the backstory behind Testground itself.

If you followed the [IPFS v0.5.0 release announcements](https://blog.ipfs.io/2020-04-28-go-ipfs-0-5-0/), you will have heard about **Testground**. It was a vital piece of our engineering endeavour and unlocked major improvements in quality, velocity, and reliability. Without [Testground](https://docs.testground.ai/), we would’ve been unable to measure, iterate on, and validate the massive DHT and Bitswap improvements in v0.5.0 at scale.

Testground was also indispensable in evaluating our latest [libp2p gossipsub 1.1 security extensions](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md). It allowed us to simulate a range of attacks, over 10k instance clusters, packed with sybils and honest nodes, hammering the network with pubsub messages, recording every single event for later analysis and comparison (expect a report soon). 

**The ambitious mission of building bulletproof, unstoppable networks and systems requires rock-solid testing platforms.**

As Testground graduates from the cozy incubation nest of the IPFS Project, we’ve done an enormous amount of legwork to package Testground so that it’s dead simple for the distributed systems and p2p communities to *hit the ground running*. We hope it brings about a quantum leap in the way we—as a community—engineer p2p and distributed systems for the decentralized future. 

## What is Testground?

Testground is a platform for testing, benchmarking, and simulating distributed and p2p systems at scale. It's designed to be multilingual and runtime-agnostic, scaling gracefully from 2 to 10k instances as needed.

<script src="https://asciinema.org/a/wOeDmrj9HwA4ZYb9fIR6f4dxN.js" id="asciicast-wOeDmrj9HwA4ZYb9fIR6f4dxN" async></script>

Testground aims to support **a variety of testing workflows** such as experimental/iterative development, A/B testing, backwards/forward-compatibility testing, interoperability testing, and CI workflows. 

Prior to Testground, distributed testing used to imply deploying fleets of daemons. You’d expose every single internal component, method and configuration parameter over an API, and command-and-control them via an external script acting like a puppeteer. But in Testground, **you write test plans just as you’d write unit tests.**

We hear that the Testground approach feels strikingly natural to developers. Why? Because **test plans call your internal APIs directly,** and they leverage **a distributed synchronisation API to coordinate** with other instances participating in the test run. Thus, test cases turn into distributed state machines that follow a precise choreography.

At present, [**you can write test plans in Go**](https://github.com/testground/sdk-go). But implementing a Testground SDK for another language/runtime is dead simple! In fact, the community is hacking away at a TypeScript SDK for node and the browser.

Because real decentralised systems are at the mercy of network conditions, **Testground can shape network traffic** by flipping connectedness, changing IP addresses at runtime, or setting latency, jitter, bandwidth, etc.

And since not all test scenarios require thousands of instances, you can **run test plans locally as executables or Docker containers,** saving the overhead, time and cost of resorting to cluster deployments for when you need to scale beyond ~300 instances, or so. For those larger cases, **Testground supports Kubernetes out-of-the-box.** 

To illustrate the above, consider a 200-instance test run. With Kubernetes, it could take 1-2 minutes to ship a Docker image to a remote registry, schedule a Kubernetes job, and wait for the workload to start. With the local Docker runner, that overhead is zero, and the run is immediate. It doesn’t sound like much, but developers know the death by a thousand cuts (or context switches) such delays do to one’s productivity and workflow.

The cherry on the top of all this is the **observation pipeline (experimental)**. Test plans can record raw data points or aggregate metrics (histograms, [EWMA](https://en.wikipedia.org/wiki/EWMA_chart), counters, etc.) about the system under test, as well as emit arbitrary output assets. **The Testground platform will harvest them and make them available for one-stop collection.**

![Testground Architecture](/092-launching-testground/launch_testground_architecture.png)

<p style="text-align:center;font-size:75%;"> Architecture diagram, focused on a test plan’s inputs and outputs, highlighting the circuitry of the observability pipeline</p>

## Getting started

Want to hit the ground running? Try the following:

1. Head over to the [Getting started](https://docs.testground.ai/getting-started) section of our docs.
2. Make sure to check out the [testground/testground](https://github.com/testground/testground)  repo on GitHub.
3. Take a peek at some [example test plans](https://github.com/testground/testground/tree/master/plans).
4. Explore the [reference godocs of the Testground SDK](https://pkg.go.dev/github.com/testground/sdk-go?tab=overview), the library you will use to write Testground test plans.

<br/>

## What’s happening next?

The Testground team paces itself in flexible bi-weekly sprints.

In the next couple of weeks, we plan to solidify the foundations of Testground by boosting test coverage across the codebase. We affectionately call this phase “test the testground” 😃

At the tail end of that sprint, we will produce v0.7 of the Testground Core, which will serve as the plumbing for the next features we plan to land:

* time-shared cluster deployments.
* tight continuous integration with GitHub (so that developers can @mention Testground and have their PRs automatically tested).
* better matrix-based forms to visualize test run results.

<br/>
Needless to say, you’re welcome to pitch in at any point in time! Continue reading to learn how.

![Testground flowchart](/092-launching-testground/launch_testground_flowchart.png)

## Getting involved

Testground is an open community, and all the work we do is public. To know what the team is working on, you can peek at the [ZenHub board](https://app.zenhub.com/workspaces/testground-agile-5e55a12c82aac7fef146176e/board), and check the scope & progress of [various milestones](https://github.com/testground/testground/milestones).

If you feel adventurous and would like to lend a hand with some coding, check out the issues marked with the label [“good first issue”](https://github.com/testground/testground/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22good+first+issue%22) to get started!

If you encounter problems, check if an issue has been raised already, or otherwise feel free to raise one on the [GitHub issue tracker](https://github.com/testground/testground/issues).

The team would love to hear how you’re using Testground in your project. Reach out via Twitter on [@run_testground](https://twitter.com/run_testground)!

## The backstory: how Testground came to be

For months, we—the IPFS and libp2p core teams—had been designing and debating ideas to improve the performance of the DHT, secure our pubsub protocol, and speed up content transfer.

Most discussions led to substantial redesign proposals, which eventually circled back to the million dollar question:

**_How do we test this without affecting the live network?_**

Engineers on the libp2p and IPFS projects lean towards taking the scientific approach. It’s in our DNA. We articulate assumptions, gather evidence, formulate hypotheses, speculate about designs, and iterate on proposed changes by *benchmarking and quantifying their impact* on the system.

Proposing and merging pull requests that affect the core subsystems is not something we handle lightly. We strive to take solid steps. Unfortunately, we lacked the instruments to do exactly that, and it was slowing down our progress. We knew it, and it burnt.

The risk of merging a seemingly sane patch and causing a side-effect or regression was crippling. Unit testing and benchmarking at the *micro* level are insufficient to project or predict changes in the emergent behaviour of decentralised structured or unstructured networks at the macro level (with hundreds of thousands of nodes across a complex network topology).

We needed to be capable of:

* launching test workloads on private networks of thousands of nodes.
* exercising arbitrary commits or branches to capture metrics about their behaviour.
* iterating on changesets A and B, launching the same test plans to compare the results against baselines.
* measuring how the network reacts to conditions such as churn and connectivity issues.
* measuring the effect of node upgrades on the overall network health.
* validating that old nodes and upgraded nodes interoperate effectively (avoiding partitions).
* simulating varying network conditions, such as IP address changes, latency, bandwidth, etc.
* doing all of this in a consistent, reproducible manner.

</br>
We looked for existing tools to unlock our progress, but couldn’t find a platform that enabled us to do just that. So we built Testground. But we didn’t start from scratch. Testground stands on the shoulders of OSS giants such as [Kubernetes](https://kubernetes.io/), [Docker](https://www.docker.com/), and [Redis](https://redis.io/). We also had previous past experiments, like [InterPlanetary TestLab (IPTB)](https://github.com/ipfs-inactive/pm-test-lab) to learn from and iterate on. 

Since Day Zero, we recognized the value of Testground to the larger distributed systems and p2p community out there. Therefore, we made it project-agnostic from the get-go. 

Despite being born out of the IPFS and libp2p projects, **nothing in Testground depends on libp2p or IPFS: there is a grand total of zero imports.** You don't have to use IPFS or libp2p in order to benefit from Testground to test your p2p network (be it a dapp, a blockchain, or another p2p protocol)!

We hope that Testground will accelerate your development and experimentation, just like it did for us, and help you gain confidence and reassurance that you’re only improving systems, commit after commit, PR after PR, release after release.
