---
date: 2019-07-18
url: 2019-07-18-ipfs-release-process
tags: IPFS, go-ipfs, release process, 
title: Improving the IPFS Release Process
author: Steven Allen, Alan Shaw, David Dias, Molly Mackinlay
---

**go-ipfs is introducing a new release cycle and process to ensure more reliable and frequent releases!**


When reflecting on this year so far, we noticed an unusual number of critical
regressions (since fixed) introduced in the last three go-ipfs releases:

* **go-ipfs 0.4.19** had multiple regressions:
  1. A regression in the docker container (introduced by
    [#6040](https://github.com/ipfs/go-ipfs/pull/6040)) that would have been
    caught by testing the go-ipfs docker image in more production environments.
  2. A CPU utilization regression in bitswap only seen under very high load. This
    would have been caught by testing under production loads.
  3. Panics in the DHT and QUIC modules that only show up under heavy load.
* **go-ipfs 0.4.20** had a regression where adding multiple independent files in the same
  add command didn't work ([#6254](https://github.com/ipfs/go-ipfs/pull/6255)).
  A regression test has since been added, but this _also_ would have been caught
  with better cross-application testing.
* **go-ipfs 0.4.21** had two performance regressions in bitswap:
  1. A throughput regression that should have been caught by regression testing
    (now tested) but almost certainly would have been noticed by downstream
    users given a longer release-testing process.
  2. A CPU utilization regression that only shows up with >10000 peers. Something
    that only really shows up in certain production systems under heavy load.

We found two root causes:

1. An uptick in development pace with respect to previous quarters without
   matching improvements to our testing practices. Several large refactors
   touching key but poorly tested subsystems landed this year.
2. A significant increase in the network size and production demands on go-ipfs
   without large-scale testing or network simulation infrastructure. In
   the past all production scale testing has been done by deploying a custom
   go-ipfs build to a bootstrapper or gateway and watching how it behaves.
   
To address these concerns, we've paused all non-bugfix go-ipfs releases
as we improve our testing practices and build out our testing and network
simulation infrastructure. We felt this measure necessary as testing tends to
become a secondary concern in the face of new features and pressing performance
improvements.

However, even with our current testing practices, these regressions should have
been caught by pre-release testing. Furthermore, a better release process (e.g.
the ability to cut patch releases) would have enabled us to quickly release
fixes for these regressions.

Therefore, in addition to improving our testing, we're introducing a new release
process to ensure that releases have been tested in as many environments as we
can, and that we can quickly release bug fixes without waiting an entire release
cycle.

## Release Process Changes
  
We've made three specific changes to the release process:

1. To address the stability issues, we've introduced a new release process that
   involves extensively testing releases in a wide variety of production
   environments.
2. To address the issue of slow releases, we've introduced a 6 week release
   cycle.
3. To address the issue of slow bug fixes, we've switched to semver and
   introduced patch releases. The first patch release will be 0.4.22 and the
   next _feature_ release will be 0.5.0.
   
### Early Testers Program

We're introducing an early testers program that allows groups using go-ipfs in production to
self-volunteer to help with testing `go-ipfs` release candidates in development
and production environments. While we invite the _entire_ community to help test
releases, members of the early testers program participate directly and actively
in every release.

Early testers will deploy release candidates to dev and prod environments,
giving us quick feedback on any regressions or performance changes they notice.
This means we can get some quick feedback from heavy users before we cut the
official release and these heavy users can work with us to make sure the new
release doesn't introduce any regressions into their systems.

This program currently includes:

- [Infura](https://infura.io/)
- [Textile](https://textile.io/)
- [Pinata](https://pinata.cloud/)
- [RTrade (Temporal)](https://temporal.cloud/)
- [QRI](https://qri.io/)
- [Siderus](https://siderus.io/)

### Cycle

Baring any feature freezes, go-ipfs will now cut a new release approximately
every 6 weeks. Specifically, we will aim to branch off a new release every 6 weeks and
then run through the release process in an expected 3 weeks.

If the release process runs under or over the expected 3 weeks, the next release
will aim to branch at the 6 week mark, regardless. That way, even if we don't
release on schedule, we can still maintain a 6 week release cadence.

#### Patch Releases

Given the increased structure and extensive testing in this release process, we need a way
to quickly release fixes for critical regressions, should they arise. If we fix
a critical regression in a go-ipfs release, we will create a _patch_ release for
this regression based on the current stable release.

This patch release will still undergo an abbreviated release testing process, but we expect
it to take 2-3 days, rather than weeks:

1. Less than a day for internal testing.
2. 1-2 days for production testing by members of the early testers program.

Note: This release process _does not_ introduce long term support releases.
Patches will only be applied to the latest release and will not be backported.
Furthermore, the next feature release will likely include additional bug fixes not deemed critical to fix in
a patch release.

#### Semver

This release process finally switches go-ipfs over to [semver](https://semver.org/). Like many pre-1.0
project, go-ipfs has reserved MINOR releases for large breaking changes.
However, this means we can't distinguish between true patch releases (bug fixes
applied to the previous release) and feature releases (minor releases).

This means that until go-ipfs reaches 1.0:

* Minor releases will no longer signal large breaking changes.
* Patch releases will now be just that: patches on the previous stable release.

As an historical tidbit, we held a somewhat romantic hope that 0.5.0
would mark feature completeness ("beta") and that the next non-patch release
after that would be 1.0. However, the next feature release, 0.5.0, does not mean
anything special, and will not be a major milestone.

### Process

The new release process includes 5 stages:

0. Automated Testing - go-ipfs CI Passes.
1. Internal Testing - go-ipfs is tested against IPFS infrastructure, internal
   testing and simulation tools, and
   [Shipyard](https://github.com/ipfs-shipyard) applications.
2. Community Dev Testing - go-ipfs is tested by the community in dev
   environments.
3. Community Prod Testing - go-ipfs is tested by the community in production
   environments.
4. Release - go-ipfs is released.

If we merge any non-trivial fixes during the release process, we'll start over
at stage 0 with a compressed release process for the stages that have already
been completed once.

We expect stages 1-3 to take a week each, on average - suggesting a 3 week period between cutting and launching a new release.

#### Stage 0 - Automated Testing

While we strive to keep master green, issues do occasionally slip through
(usually due to faulty tests or unnoticed issues with CI). Before we even branch
off a release, we expect master to be green.

This is the stage where we branch off a release candidate.

#### Stage 1 - Internal Testing

The first real stage of this process is internal testing. In this stage, the
IPFS team will test the release candidate against applications in the [IPFS
Shipyard](https://github.com/ipfs-shipyard), on some new testing and simulation
infrastructure we're in the process of building, and on a subset of the IPFS
project's production infrastructure (bootstrappers and gateways).

This stage allows us to rapidly find, diagnose, and fix issues within a
constrained sphere of control before asking the wider community to begin
testing.

#### Stage 2 - Community Dev Testing

At this stage, we announce the impending release to the community and ask for
beta testers. This stage exists to give a new IPFS release candidate some
low-stakes testing on as many environments as possible.

This is also the first stage where we involve members of the early testers
program. Here, we ask them to test the go-ipfs release in their _dev_
infrastructure and work with us to resolve any issues.

#### Stage 3 - Community Prod Testing

Once the go-ipfs release candidate has been thoroughly tested in dev
environments, we ask members of the early testers program to deploy the release
candidate to a subset of their production environment. This stage gives us a
chance to test on production workloads while retaining the ability to quickly
roll back changes and fix any issues that might arise before the final release.

#### Stage 4 - Release

At stage 4, we make sure all the documentation has been updated, cut the final
release, and announce it to the community.

## Communication

We have several communication points in this process:

* When we cut each RC, we will create an associated [GitHub
  release](https://github.com/ipfs/go-ipfs/releases). You can follow along by
  either:
  * Subscribing to the [RSS feed](https://github.com/ipfs/go-ipfs/releases.atom).
  * Subscribing to release email notifications on the go-ipfs repository.
* At stage 0, we will create an issue with a copy of the [release
  checklist](https://github.com/ipfs/go-ipfs/blob/master/docs/RELEASE_ISSUE_TEMPLATE.md).
* At stage 2, we will announce the release candidate on IRC/Matrix.
* At stage 3, we will announce the release candidate on IRC/Matrix and Twitter for a wider audience.
* At stage 4, we will continue to publish a blog post announcing the highlights in the release

## Where To Learn More

If you're interested in seeing this release process in action, we trialed the
_full_ (not patch) release process for the latest patch release (0.4.22):
[#6506](https://github.com/ipfs/go-ipfs/issues/6506).

If you'd like to read through the official release process, you can find it in
[docs/releases.md](https://github.com/ipfs/go-ipfs/blob/master/docs/releases.md).

Finally, if you're using go-ipfs in production and would like to join the the
Early Testers program, please read
[docs/EARLY_TESTERS.md](https://github.com/ipfs/go-ipfs/blob/master/docs/EARLY_TESTERS.md) and submit a PR to join if interested.
