---
date: 2020-03-16
url: 2020-03-16-announcing-rust-ipfs
title: Announcing Rust IPFS
author: Mark Robert Henderson and Volker Mische
---

![Rust IPFS Logo](https://github.com/ipfs-rust/logo/raw/master/rust-ipfs-logo-256w.png)

We are excited to announce that we have awarded a devgrant to
[Equilbrium](https://equilibrium.co) to work on the Rust implementation of IPFS. Our
collective goal is to combine the _performance_ and resource utilization benefits of Rust, with
a keen eye on _conformance_ to the IPFS spec.

## Why Rust IPFS? Why Now?

Rust, the programming language, has enjoyed a recent spike in popularity. This is due both to its
inclusive community, and also being a safe systems language with performance comparable to C and
C++. An IPFS implementation written in Rust only makes sense. Additionally, the community has been
looking for a Rust implementation [for a while now](https://github.com/ipfs/notes/issues/363),
for a number of use cases:

1. Usage in resource-constrained systems such as Industrial Internet-of-Things (IIoT) controllers
2. Portability of certain subsets of the IPFS stack into WebAssembly
3. Usage of IPFS functionality and APIs via native Rust function calls via inclusion as a Rust crate.

## Leveraging Community Efforts

The IPFS community has been and remains and impressive, talented group of people who have
astounded and impressed us with their work in the Rust space already. We have Parity's
[rust-libp2p](https://github.com/libp2p/rust-libp2p), which is already used by the likes of
Polkadot, Substrate, and Lighthouse. We have ferrismtg's
[rust-ipfs-api](https://github.com/ferristseng/rust-ipfs-api) which is aleady doing wonders in
providing a bridge from the Rust world. Finally we have David Craven's
[rust-ipfs](https://github.com/ipfs-rust/rust-ipfs) foundations, which is the main repo this grant will build upon.

This devgrant endeavors to take this impressive amount of community work carry the torch across
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

Although Equilibrium is the main grantee, community involvment is encouraged and welcomed. If you
want to pitch in, here are a few ways:

1. Star and watch the [GitHub repo](https://github.com/ipfs-rust/rust-ipfs)
2. Take on the development efforts associated with IPFS APIs [not covered by the grant](https://github.com/ipfs-rust/ipfs-rust-conformance/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
3. Back IPFS Rust on [OpenCollective](https://opencollective.com/ipfs-rust)

