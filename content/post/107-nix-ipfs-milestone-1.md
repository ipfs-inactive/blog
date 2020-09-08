---
date: 2020-09-08
url: /2020-09-08-nix-ipfs-milestone-1/
title: Nix × IPFS - Milestone 1
author: John Ericson
tags: ipfs, nix
header_image: 107-nix-ipfs.jpg
---

[Obsidian Systems](https://obsidian.systems/) is adding support for IPFS to Nix so that build products can be persisted to and fetched from IPFS.
This adds resiliency and makes it easier for Nix users to reproduce and distribute their work.

## What is Nix?

[Nix](https://nixos.org/) is usually used as a package manager, but at its heart is a general-purpose build tool, like Make, Ninja, or Bazel.

What distinguishes Nix is its focus on sandboxing build steps and caching build artifacts.
With these features, neither the plans nor the build artifacts can have hidden dependencies, so builds can be reproduced and build artifacts shared robustly.

This makes Nix an ideal build tool to use with a peer-to-peer system like IPFS.
Indeed, the premier project using Nix is Nixpkgs, a package collection (with associated Linux distro) that is one of the largest most widely-contributed projects on GitHub.

## Why we use Nix

Obsidian Systems is an end-to-end software product consultancy serving everyone from recently funded startups to large institutions.
We have made Nix an integral part of both our production deployments and developer workflows since our founding 2014.

Nix is an indispensable tool for us because we frequently need to switch between projects, and Nix makes setting up and sharing per-project development environments trivial.
It has also made it easy to package software that the end user installs on their own machines, such as blockchain wallets.

## Challenges that inspired our use of IPFS

While Nix build plans are reproducible, one limitation that remains is the availability of the initial data—source code.
Nix plans have what are known as “fixed output derivations”.
These are unsandboxed build steps, with network access to download various sources.
They produce data that must match a pre-fixed hash, so the lack of sandboxing cannot be exploited to result in nondeterministic output.

The big problem with this is that if the URL becomes inaccessible or the data downloaded is non-deterministic (e.g. due to some metadata), this build step will fail —
in other words, we are facing the exact same problems around linkrot IPFS is trying to solve with the web in general!
The IPFS solution is the right one —
we shouldn’t be relying on the _location_ at which some source code was originally uploaded.
And we’re already identifying source code by content addresses, so IPFS solution isn’t even a huge leap from our existing tooling and community practices.

Yes, we can already pin and cache the results of those fixed-output build steps just as we do with regular build steps, but we’re stuck with our own cache of source code completely independent from what upstream offers.
It is tedious and inefficient for users of Nix to each maintain their own uncooperative caches of source code, and even more so for the downstream user who would have to manually configure each of the caches individually, when all they want is some source code that is self-authenticating due to the content-address.

## Value

For the Nix community at large, we finally have a chance to leverage our hard work on reproducibility and make it a practical reality.
Rather than relying on our centralized [cache.nixos.org](https://cache.nixos.org) to build artifacts before sources rot away, everyone should feel free to use Nixpkgs as a source or binary distro—as was originally intended.

For users of Obsidian’s open-source software specifically, they finally have an easy and robust way to trust neither our own pre-built binaries or **cache.nixos.org**’s, but build everything from source, which makes auditing security-critical code easier.

Ideally, we want to cache and distribute source code in collaboration with the upstream developers themselves and other downstream distributions.
[IPLD](https://ipld.io), more than any other schema we’ve seen, understands the value of addressing data with its original intended “native” references, rather than some bespoke 3rd-party format that others cannot understand.

We think this is the key to enable that cooperation.
Upstream devs can simply continue working with git repos (or any other version control system with content-addressing that IPLD supports).
Downstream distros consume that data directly, without any conversion steps that obscure the data’s authenticity.
Neither party is faced with doing chores that the other used to handle.

## Scope

We aim to address these problems in two distinct phases.

### Milestone 1: Distribution with IPFS

We wanted Nix to be able to use IPFS as a “substituter” or provider of source/build artifacts alongside the other sorts of substituters that exist today.

As part of this, we taught Nix git tree hashing, so it can content-address git repos in a way IPFS will understand —
which helps IPFS, Nix, upstream collaborators, and other parties with an interest in archiving and disseminating source code find a common way to reference these artifacts.
While the git hashing scheme has its limitations, we think it is the best method for multi-party collaboration on git data.

Looking ahead to using IPFS for build products and deployments, we also added support for a metadata format around git tree hashing for IPFS and Nix to also convey data with run-time dependencies between separately-installed file system trees.
Finally, we provide a way for existing Nix build artifacts to be converted to this new data format.

### Milestone 2: Building with IPFS

Nix doesn’t actually content-address data produced by regular build steps (as opposed to the “fixed output” build steps described above).
Instead, it addresses them based on the plan from which they were made.

Situations exist — such as when someone edits a comment — where the plan changes but the results don’t.
Besides causing extra rebuilding downstream, this muddles the separation between the raw data and its provenance.
With peer-to-peer systems, it doesn't matter who is *providing* the data (and we want to take advantage of that not mattering), but it absolutely does matter who is *claiming* what the data represents.

With this core improvement, we can make new improved versions of build plans in IPLD and produce our newly supported IPFS-compatible formats directly from each build step, no manual conversions from legacy input-addressed data needed. This final step brings everything from both milestones together.

For a complete breakdown, visit our [open grant proposal](https://github.com/ipfs/devgrants/blob/master/open-grants/open-proposal-nix-ipfs.md).

## What was accomplished

We’re happy to announce completion of Milestone 1! In response to community feedback, we were also able to do some extra work to get the Nix community started on using IPFS before migrating to the ideal git tree hashing.

This neatly lays the groundwork for some of our Milestone 2 objectives.
We hope this step can help everyone transition to using IPFS more gracefully.

Get started using our [guide repo](https://github.com/obsidiansystems/ipfs-nix-guide/) and, in particular, our [tutorial](https://github.com/obsidiansystems/ipfs-nix-guide/blob/master/tutorial.md).

Finally, we recently did an interview on the [Nix Friday](https://zimbatm.com/NixFriday/) stream going over all our work, and also discussing more broadly how we see the IPFS and Nix ecosystems fitting together.
You can watch a recording [here](https://www.youtube.com/watch?v=FievtzvDbs82):

{{< youtube FievtzvDbs82 >}}

## What’s Next?

We’ve begun implementing Milestone 2, including the improved build steps that produce content-addressed data.
We expect this to be the bulk of the work, with the final IPFS integration being relatively smooth, as by that point the concepts of Nix and IPFS will align so neatly!

We’ve been fastidious about juggling many branches to separate feature work from general improvements of the internals, and thus have been able to upstream many of those improvements.

We like this approach because it allows us to continuously engage with the community, and leaves much more readable diffs for the features themselves.

We hope you can give the demo a spin and like what you see.
Stay tuned for milestone 2!
