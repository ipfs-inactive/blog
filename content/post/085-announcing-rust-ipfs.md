---
date: 2020-03-16
url: 2020-03-16-announcing-rust-ipfs
title: Announcing Rust IPFS, and a call for contributors
author: Mark Robert Henderson and Molly Mackinlay
---

![Rust IPFS Logo](https://github.com/ipfs-rust/logo/raw/master/rust-ipfs-logo-256w.png)

Calling all rustaceans, rustafarians, ferrosities, and rustlers - we’ve got an exciting update!
Active full time work on a rust-IPFS implementation has commenced, building on the great work by
Parity in `rust-libp2p`. [Equilbrium](https://equilibrium.co) is spearheading the new community and
implementation with support from Protocol Labs, and is looking for additional rust devs itching
to help build a new language implementation of the InterPlanetary File System combining the
performance and resource utilization benefits of Rust with a keen eye on conformance to the IPFS spec.

## Why Rust IPFS? Why Now?

Rust, the programming language, has enjoyed a recent spike in popularity. This is due both to its
inclusive community, and also being a safe systems language with performance comparable to C and
C++. An IPFS implementation written in Rust only makes sense. Additionally, the community has been
[asking for a while now](https://github.com/ipfs/notes/issues/363), for a number of use cases:

1. Usage in resource-constrained systems such as Industrial Internet-of-Things (IIoT) controllers
2. Portability of certain subsets of the IPFS stack into WebAssembly
3. Usage of IPFS functionality and APIs via native Rust function calls via inclusion as a Rust crate.

Given that, it's no surprise that Rust-IPFS was also one of the [IPFS 2020 Theme Proposals](https://github.com/ipfs/roadmap/issues/54) suggested in our community-driven [IPFS 2020 Roadmapping Process](https://github.com/ipfs/roadmap/blob/master/2020-IPFS-Project-Planning.md) - and that the community quickly rose to the challenge. Equilibrium, an active participant in many dweb infrastructure projects, stepped up to take on core implementation and stewardship of this new language implementation, with support through the [new IPFS DevGrants program](https://github.com/ipfs/devgrants) to provide coordination and maintainership for passionate developers in the wider Rust community. 

With both community demand and active participation, the time was ripe for the Rust-IPFS effort to be revitalized and reborn!


## Leveraging Community Efforts

The IPFS community is a talented group of people with an impressive array of high quality work in the Rust space already. There's the aforementioned
[rust-libp2p](https://github.com/libp2p/rust-libp2p), which is already used by the likes of
Polkadot, Substrate, and Lighthouse. We have ferrismtg's
[rust-ipfs-api](https://github.com/ferristseng/rust-ipfs-api) which is aleady doing wonders in
providing a bridge from the Rust world. Finally, we have David Craven's
[rust-ipfs](https://github.com/ipfs-rust/rust-ipfs), which is the foundational work behind this latest endeavor.

Instead of forking and/or starting fresh, this project aims to support and build on the impressive amount of progress that's already been made, helping carry the torch across the finish line while _incorporating_ and _including_ the community of passionate Rust contributors in the process.
the finish line, _incorporating_ and _including_ the community into its efforts and not forking
and/or starting fresh.

## What can be expected, and when?

At a high level, the [devgrant](https://github.com/ipfs/devgrants/tree/master/open-grants/ipfs-rust)
takes place mostly over early Q2 2020 and covers the use case of **IPLD applications**,
targeting the low-level blockstore, libp2p integration, and IPLD-related functionality
such as `ipfs dag put` and `ipfs dag get`. 

To learn more about the effort, please visit the following links:

1. The [ipfs-rust organization](https://github.com/orgs/ipfs-rust) on GitHub
2. The in-depth post on this effort on the Equilibrium Labs blog (link coming soon)

## You can help!

Community participation in making Rust-IPFS a reality is encouraged and welcomed! If you
want to pitch in, here are a few ways:

1. Star and watch the [GitHub repo](https://github.com/ipfs-rust/rust-ipfs)
2. Take on the development efforts associated with IPFS APIs [not covered by the grant](https://github.com/ipfs-rust/ipfs-rust-conformance/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
3. Back IPFS Rust on [OpenCollective](https://opencollective.com/ipfs-rust)
