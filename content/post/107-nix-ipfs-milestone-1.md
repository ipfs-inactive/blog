---
date: 2020-08-20
url: /2020-08-20-nix-ipfs-milestone-1/
title: Nix × IPFS - Intro and Milestone 1 Report
author: John Ericson
tags: ipfs, nix
---

[Obsidian Systems](https://obsidian.systems/) is adding support for IPFS to Nix so that build products can be persisted to and fetched from IPFS.
This adds resiliency and makes it easier for Nix users to reproduce and distribute their work.

## What is Nix?

[Nix](https://nixos.org/) is usually used as a package manager, but at its heart is a general-purpose build tool, like Make, Ninja, or Bazel.

What distinguishes Nix is its focus on sandboxing build steps and caching build artifacts.
With these features, neither the plans nor the build artifacts can have hidden dependencies, so builds can be reproduced and build artifacts shared robustly. 
This makes Nix an ideal build tool to use with a peer-to-peer system like IPFS. Indeed, the premier project using Nix is Nixpkgs, a package collection (with associated Linux distro) that is one of the largest most widely-contributed projects on GitHub.

## Who is Obsidian Systems?

Obsidian Systems, LLC is an end-to-end software product consultancy.
We serve everyone from recently funded startups to large institutions needing innovative solutions to longstanding problems.

Obsidian Systems has made Nix an integral part of our both production deployments and developer workflows since our founding 2014. 
Nix is an indispensable tool for us because we frequently need to switch between projects, and Nix makes setting-up and sharing per-project dev environments trivial. 
We were thrilled with the opportunity to add functionality we ourselves have wanted for years, and hopefully broaden both our communities in the process.

## Challenges that inspired our use of IPFS

While Nix build plans are reproducible, one limitation that remains is the availability of the initial data—source code.
Nix plans have what are known as “fixed output derivations”.
These are *un*sandboxed build steps, with network access to download various sources.
They produce data that must match a pre-fixed hash, so the lack of sandboxing cannot be exploited to result in nondeterministic output.

The big problem with this is that if the URL becomes inaccessible or the data download is non-deterministic, this build step will fail—in other words, the exact same problems IPFS is trying to solve with the web in general! 

Yes, we can already pin and cache the results of those fixed-output build steps just as we do with regular build steps, but we’re stuck with our own cache of source code completely independent from what upstream offers.

## Value

For the Nix community, we finally have a chance to leverage our hard work on reproducibility and make it a practical reality.
Rather than relying on our centralized cache.nixos.org to build artifacts before sources rot away, everyone should feel free and able to use Nixpkgs as a source or binary distro—as was originally intended.

Ideally, we want to cache and distribute source code in collaboration with the upstream developers themselves and other downstream distributions.
IPLD, more than any other schema we’ve seen, understands the value of addressing data with its original intended “native” references, rather than some bespoke 3rd-party format that others cannot understand.
We think this is the key to enable that cooperation.

## Scope

The scope of work designed to leverage the above opportunities was broken out across two distinct phases.

### Milestone 1: Distribution with IPFS

We wanted Nix to be able to use IPFS as a “substituter” or provider of source/build artifacts alongside the other sorts of substituters that exist today.

Also, we taught Nix git tree hashing, so it can content-address git repos in a way IPFS will understand---it’s important that all of IPFS, Nix, upstream collaborators, and other parties with an interest in archiving and disseminating source code find a common way to reference source code.
While the git hashing scheme has its limitations, we think it is the best method for multi-party collaboration on git data.

Looking ahead to using IPFS for build products and deployments, we also added support for a metadata format around git tree hashing for IPFS and Nix to also convey data with run-time dependencies between separately-installed file system trees.
We show how existing Nix build artifacts can be converted to use this new data format.

### Milestone 2: Building with IPFS

Nix doesn’t actually content-address data produced by regular build steps (as opposed to the “fixed output” build steps described above).
Instead, it addresses them based on the plan from which they were made.

Situations exist — such as when someone edits a comment — where the plan changes but the results don’t.
Besides causing extra rebuilding downstream, this muddles the separation between the raw data and its providence.

This introduces complications around peer-to-peer concerns, such as separating out who is providing the data, which emphatically doesn’t matter, from who is claiming the data.

Finally, with this core improvement, we can, in IPFS, make new improved versions of build plans and “trust maps”, linking plans to their output data.
This final step brings everything from both milestones together.

For a complete breakdown visit: https://github.com/ipfs/devgrants/blob/master/open-grants/open-proposal-nix-ipfs.md

## What was accomplished

We’re happy to announce completion of Milestone 1! In response to community feedback, we were also able to do some extra work to get the Nix community started on using IPFS before migrating to the ideal git tree hashing.

This neatly lays the groundwork for some of our Milestone 2 objectives.
We hope this step can help everyone transition to using IPFS more gracefully.

See https://github.com/obsidiansystems/ipfs-nix-guide/blob/master/branches.md for details!

## Getting Started

Please see our guide at: https://github.com/obsidiansystems/ipfs-nix-guide/
In particular, our tutorial can be found here: https://github.com/obsidiansystems/ipfs-nix-guide/blob/master/tutorial.md

## What’s Next?

### Milestone 2

We’ve begun implementing the improved build steps that produce content-addressed data.
We expect this to be the bulk of the work, with the final IPFS integration being relatively smooth, as by that point the concepts of Nix and IPFS will align so neatly!

### Upstreaming

We’ve been fastidious about juggling many branches to separate feature work from general improvements of the internals, and thus been able to upstream many of those improvements.

We like this approach because it allows us to continuously engage with the community, and leaves much more readable diffs for the features themselves.

We hope you can give the demo a spin and like what you see.
Stay tuned for milestone 2!
