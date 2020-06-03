---
date: 2019-04-16
url: /83-go-ipfs-0-4-20/
title: go-ipfs 0.4.20 released
author: Steven Allen
---

We're excited to release go-ipfs 0.4.20, trail-blazing the way to the distributed web. This release includes some critical
performance and stability fixes so all users should upgrade ASAP! As of release four-twenty, the CLI should be more usable due to improved commands, Bitswap should be more reliable, and the relays should be much more performant. Enjoy!

This is also the first release to use the budding go modules system instead of GX. While GX has
been a great way to dogfood an IPFS-based package manager, building and
maintaining a custom package manager is a _lot_ of work and we haven't been able
to dedicate enough time to bring the user experience of gx to an acceptable
level. You can read [#5850](https://github.com/ipfs/go-ipfs/issues/5850) for
some discussion on this matter.

# 🔦 Highlights

## ⛴ Docker

As of this release, it's now much easier to run arbitrary IPFS commands within
the docker container:

```bash
> docker run --name my-ipfs ipfs/go-ipfs:v0.4.20 config profile apply server # apply the server profile
> docker start my-ipfs # start the daemon
```

This release also [reverts](https://github.com/ipfs/go-ipfs/pull/6040) a change that
caused some significant trouble in 0.4.19. If you've been running into Docker
permission errors in 0.4.19, please upgrade.

## 🕸 WebUI

This release contains a major
[WebUI](https://github.com/ipfs-shipyard/ipfs-webui) release with some
significant improvements to the file browser and new opt-in, privately hosted,
anonymous usage analytics.

## 🕹 Commands

As usual, we've made several changes and improvements to our commands. The most
notable changes are listed in this section.

### New: `ipfs version deps`

This release includes a new command, `ipfs version deps`, to list all
dependencies (with versions) of the current go-ipfs build. This should make it
easy to tell exactly how go-ipfs was built when tracking down issues.

### New: `ipfs add URL`

The `ipfs add` command has gained support for URLs. This means you can:

1. Add files with `ipfs add URL` instead of downloading the file first.
2. Replace all uses of the `ipfs urlstore` command with a call to `ipfs add
   --nocopy`. The `ipfs urlstore` command will be deprecated in a future
   release.


### Changed: `ipfs swarm connect`

The `ipfs swarm connect` command has a few new features:

It now marks the newly created connection as "important". This should ensure
that the connection manager won't come along later and close the connection if
it doesn't think it's being used.

It can now resolve `/dnsaddr` addresses that _don't_ end in a peer ID. For
example, you can now run `ipfs swarm connect /dnsaddr/bootstrap.libp2p.io` to
connect to one of the bootstrap peers at random. NOTE: This could connect you to
an _arbitrary_ peer as DNS is not secure (by default). Please do not rely on
this except for testing or unless you know what you're doing.

Finally, `ipfs swarm connect` now returns _all_ errors on failure. This should
make it much easier to debug connectivity issues. For example, one might see an
error like:

```
Error: connect QmYou failure: dial attempt failed: 6 errors occurred:
	* <peer.ID Qm*Me> --> <peer.ID Qm*You> (/ip4/127.0.0.1/tcp/4001) dial attempt failed: dial tcp4 127.0.0.1:4001: connect: connection refused
	* <peer.ID Qm*Me> --> <peer.ID Qm*You> (/ip6/::1/tcp/4001) dial attempt failed: dial tcp6 [::1]:4001: connect: connection refused
	* <peer.ID Qm*Me> --> <peer.ID Qm*You> (/ip6/2604::1/tcp/4001) dial attempt failed: dial tcp6 [2604::1]:4001: connect: network is unreachable
	* <peer.ID Qm*Me> --> <peer.ID Qm*You> (/ip6/2602::1/tcp/4001) dial attempt failed: dial tcp6 [2602::1]:4001: connect: network is unreachable
	* <peer.ID Qm*Me> --> <peer.ID Qm*You> (/ip4/150.0.1.2/tcp/4001) dial attempt failed: dial tcp4 0.0.0.0:4001->150.0.1.2:4001: i/o timeout
	* <peer.ID Qm*Me> --> <peer.ID Qm*You> (/ip4/200.0.1.2/tcp/4001) dial attempt failed: dial tcp4 0.0.0.0:4001->200.0.1.2:4001: i/o timeout
```

### Changed: `ipfs bitswap stat`

`ipfs bitswap stat` no longer lists bitswap partners unless the `-v` flag is
passed. That is, it will now return:

```
> ipfs bitswap stat
bitswap status
	provides buffer: 0 / 256
	blocks received: 0
	blocks sent: 79
	data received: 0
	data sent: 672706
	dup blocks received: 0
	dup data received: 0 B
	wantlist [0 keys]
	partners [197]
```

Instead of:

```
> ipfs bitswap stat -v
bitswap status
	provides buffer: 0 / 256
	blocks received: 0
	blocks sent: 79
	data received: 0
	data sent: 672706
	dup blocks received: 0
	dup data received: 0 B
	wantlist [0 keys]
	partners [203]
		QmNQTTTRCDpCYCiiu6TYWCqEa7ShAUo9jrZJvWngfSu1mL
		QmNWaxbqERvdcgoWpqAhDMrbK2gKi3SMGk3LUEvfcqZcf4
		QmNgSVpgZVEd41pBX6DyCaHRof8UmUJLqQ3XH2qNL9xLvN
        ... omitting 200 lines ...
```

### Changed: `ipfs repo stat --human`

The `--human` flag in the `ipfs repo stat` command now intelligently picks a
size unit instead of always using MiB.

### Changed: `ipfs resolve` (`ipfs dns`, `ipfs name resolve`)

All of the resolve commands now:

1. Resolve _recursively_ (up to 32 steps) by default to better match user
   expectations (these commands used to be non-recursive by default). To turn
   recursion off, pass `-r false`.
2. When resolving non-recursively, these commands no longer fail when partially
   resolving a name. Instead, they simply return the intermediate result.

### Changed: `ipfs files flush`

The `ipfs files flush` command now returns the CID of the flushed file.

## Performance And Reliability

This release has the usual collection of performance and reliability
improvements.

### 🐺 Badger Memory Usage

Those of you using the badger datastore should notice reduced memory usage in
this release due to some upstream changes. Badger still uses significantly more
memory than the default datastore configuration, but it is also much faster, and memory usage will hopefully continue
to improve.

### 🔁 Bitswap

We fixed some critical CPU utilization regressions in bitswap for this release.
If you've been noticing CPU _regressions_ in go-ipfs 0.4.19, especially when
running a public gateway, upgrading to 0.4.20 will likely fix them.

### 🏃‍ Relays

After AutoRelay was introduced in go-ipfs 0.4.19, the number of peers connecting
through relays skyrocketed to over 120K concurrent peers. This highlighted some
performance issues that we've now fixed in this release. Specifically:

* We've significantly reduced the amount of memory allocated per-peer.
* We've fixed a bug where relays might, in rare cases, try to actively dial a
  peer to relay traffic. By default, relays only forward traffic between peers
  already connected to the relay.
* We've fixed quite a number of performance issues that only show up when
  rapidly forming new connections. This will actually help _all_ nodes but will
  especially help relays.
  
If you've enabled relay _hop_ (`Swarm.EnableRelayHop`) in go-ipfs 0.4.19 and it
hasn't burned down your machine yet, this release should improve things
significantly. However, relays are still under heavy load so running an open
relay will continue to be resource intensive.

We're continuing to investigate this issue and have a few more patches on the
way that, unfortunately, won't make it into this release.

### 😱 Panics

We've fixed two notable panics in this release:

* We've fixed a frequent panic in the DHT.
* We've fixed an occasional panic in the experimental QUIC transport.

## 📖 Content Routing

IPFS announces and finds content by sending and retrieving content routing
("provider") records to and from the DHT. Unfortunately, sending out these
records can be quite resource intensive.

This release has two changes to alleviate this: 1. a reduced number of initial
provide workers and 2. a persistent provider queue.

We've reduced the number of parallel initial provide workers (workers that send
out provider records when content is initially added to go-ipfs) from 512 to 6, to avoid additional performance overhead from simultaneous provide requests.
Currently, due to some issues in our DHT, each provide request tries to
establish hundreds of connections, significantly impacting the performance of
go-ipfs and [crashing some
routers](https://github.com/ipfs/go-ipfs/issues/3320).

We've introduced a new persistent provider queue for files added via `ipfs add`
and `ipfs pin add`. When new directory trees are added to go-ipfs, go-ipfs will
add the root/final CID to this queue. Then, in the background, go-ipfs will walk
the queue, sequentially sending out provider records for each CID.

This ensures that root CIDs are sent out as soon as possible and are sent even
when files are added when the go-ipfs daemon isn't running.

By example, let's add a directory tree to go-ipfs:

```bash
> # We're going to do this in "online" mode first so let's start the daemon.
> ipfs daemon &
...
Daemon is ready
> # Now, we're going to create a directory to add.
> mkdir foo
> for i in {0..1000}; do echo do echo $i > foo/$i; done
> # finally, we're going to add it.
> ipfs add -r foo
added QmUQcSjQx2bg4cSe2rUZyQi6F8QtJFJb74fWL7D784UWf9 foo/0
...
added QmQac2chFyJ24yfG2Dfuqg1P5gipLcgUDuiuYkQ5ExwGap foo/990
added QmQWwz9haeQ5T2QmQeXzqspKdowzYELShBCLzLJjVa2DuV foo/991
added QmQ5D4MtHUN4LTS4n7mgyHyaUukieMMyCfvnzXQAAbgTJm foo/992
added QmZq4n4KRNq3k1ovzxJ4qdQXZSrarfJjnoLYPR3ztHd7EY foo/993
added QmdtrsuVf8Nf1s1MaSjLAd54iNqrn1KN9VoFNgKGnLgjbt foo/994
added QmbstvU9mnW2hsE94WFmw5WbrXdLTu2Sf9kWWSozrSDscL foo/995
added QmXFd7f35gAnmisjfFmfYKkjA3F3TSpvUYB9SXr6tLsdg8 foo/996
added QmV5BxS1YQ9V227Np2Cq124cRrFDAyBXNMqHHa6kpJ9cr6 foo/997
added QmcXsccUtwKeQ1SuYC3YgyFUeYmAR9CXwGGnT3LPeCg5Tx foo/998
added Qmc4mcQcpaNzyDQxQj5SyxwFg9ZYz5XBEeEZAuH4cQirj9 foo/999
added QmXpXzUhcS9edmFBuVafV5wFXKjfXkCQcjAUZsTs7qFf3G foo
```

In 0.4.19, we would have sent out provider records for files `foo/{0..1000}`
_before_ sending out a provider record for `foo`. If you were to ask a friend to
download /ipfs/QmUQcSjQx2bg4cSe2rUZyQi6F8QtJFJb74fWL7D784UWf9, they would
(baring other issues) be able to find it pretty quickly as this is the first CID
you'll have announced to the network. However, if you ask your friend to
download /ipfs/QmXpXzUhcS9edmFBuVafV5wFXKjfXkCQcjAUZsTs7qFf3G/0, they'll have to
wait for you to finish telling the network about every file in `foo` first.

In 0.4.20, we _immediately_ tell the network about
`QmXpXzUhcS9edmFBuVafV5wFXKjfXkCQcjAUZsTs7qFf3G` (the `foo` directory) as soon
as we finish adding the directory to go-ipfs _without_ waiting to finish
announcing `foo/{0..1000}`. This is especially important in this release
because we've drastically reduced the number of provide workers.

The second benefit is that this queue is persistent. That means go-ipfs won't
forget to send out this record, even if it was offline when the content was
initially added. NOTE: go-ipfs _does_ continuously _re_-send provider records in
the background twice a day, it just might be a while before it gets around to
sending out any specific one.

## 🔂 Bitswap Reliability

Bitswap now periodically re-sends its wantlist to connected peers. This should
help work around some race conditions we've seen in bitswap where one node wants
a block but the other doesn't know for some reason.

You can track this issue here: https://github.com/ipfs/go-ipfs/issues/5183.

## 🤠 Improved NAT Traversal

While NATs are still p2p enemy #1, this release includes slightly improved
support for traversing them.

Specifically, this release now:

1. Better detects the "gateway" NAT, even when multiple devices on the network
   _claim_ to be NATs.
2. Better guesses the external IP address when port mapping, even when the
   gateway lies.

## 📡 Reduced AutoRelay Boot Time

The experimental AutoRelay feature can now detect NATs _much_ faster as we've
reduced initial NAT detection delay to 15 seconds. There's still room for
improvement, but this should make nodes that have enabled this feature dialable
earlier on start.

# ❤️ Contributors

We'd like to thank all the users who contributed to this release including
contributors to ipfs, ipld, libp2p, and multiformats.

| Contributor         | Commits | Lines ±     | Files Changed |
|---------------------|---------|-------------|---------------|
| Raúl Kripalani      |      60 | +5489/-1104 |           163 |
| Jakub Sztandera     |      55 | +4891/-514  |           145 |
| Steven Allen        |     130 | +2075/-1563 |           246 |
| vyzo                |      63 | +474/-268   |            92 |
| Michael Avila       |      13 | +458/-74    |            22 |
| Matt Joiner         |      14 | +323/-172   |            32 |
| hannahhoward        |       5 | +158/-130   |             6 |
| Łukasz Magiera      |      10 | +120/-167   |            19 |
| Anton Petrov        |       4 | +135/-4     |             8 |
| Andrew Nesbitt      |       3 | +57/-64     |             4 |
| Yusef Napora        |      14 | +63/-49     |            14 |
| Marten Seemann      |       3 | +24/-78     |            11 |
| tg                  |       1 | +82/-15     |             5 |
| jmank88             |       4 | +88/-4      |             6 |
| Richard Littauer    |       3 | +64/-1      |             3 |
| whyrusleeping       |       2 | +55/-9      |             3 |
| Kevin Atkinson      |       3 | +34/-1      |             5 |
| aschmahmann         |       1 | +33/-0      |             1 |
| Evgeniy Kulikov     |       2 | +7/-17      |             3 |
| Anatoliy Basov      |       1 | +11/-6      |             1 |
| Bob Potter          |       1 | +3/-10      |             1 |
| Lars Gierth         |       1 | +1/-9       |             1 |
| Dominic Della Valle |       1 | +5/-2       |             1 |
| Leonhard Markert    |       1 | +2/-2       |             1 |
| gukq                |       2 | +2/-2       |             2 |
| Alex Browne         |       1 | +1/-1       |             1 |
| Hector Sanjuan      |       1 | +1/-1       |             1 |
| Tomas Virgl         |       1 | +1/-1       |             1 |
| lnykww              |       1 | +1/-1       |             1 |
| monotone            |       1 | +1/-1       |             1 |

We'd also like to thank users who've reported and helped diagnose bugs and all
those community members who've helped out on the forums and IRC.

# 📜 Changelog

For those of you who like to look through the PRs that went into this release,
here is the complete changelog.

- github.com/ipfs/go-ipfs:
  - gitattributes: avoid normalizing known binary files ([ipfs/go-ipfs#6209](https://github.com/ipfs/go-ipfs/pull/6209))
  - gitattributes: default to LF ([ipfs/go-ipfs#6198](https://github.com/ipfs/go-ipfs/pull/6198))
  - Fix level db panic ([ipfs/go-ipfs#6186](https://github.com/ipfs/go-ipfs/pull/6186))
  - Dockerfile: Remove 2 year old deprecation warning ([ipfs/go-ipfs#6188](https://github.com/ipfs/go-ipfs/pull/6188))
  - align output for the command ipfs object stat ([ipfs/go-ipfs#6189](https://github.com/ipfs/go-ipfs/pull/6189))
  - provider queue: don't repeatedly retry the same item if we fail ([ipfs/go-ipfs#6187](https://github.com/ipfs/go-ipfs/pull/6187))
  - test: remove version/deps from ro commands test ([ipfs/go-ipfs#6185](https://github.com/ipfs/go-ipfs/pull/6185))
  - feat: add version deps command [modversion] ([ipfs/go-ipfs#6115](https://github.com/ipfs/go-ipfs/pull/6115))
  - readme: update for go modules ([ipfs/go-ipfs#6180](https://github.com/ipfs/go-ipfs/pull/6180))
  - Switch to Go 1.12 ([ipfs/go-ipfs#6144](https://github.com/ipfs/go-ipfs/pull/6144))
  - ci: avoid interleaving output from different sharness tests ([ipfs/go-ipfs#6175](https://github.com/ipfs/go-ipfs/pull/6175))
  - fix two bugs where the repo may not properly be closed ([ipfs/go-ipfs#6176](https://github.com/ipfs/go-ipfs/pull/6176))
  - fix error check in swarm connect ([ipfs/go-ipfs#6174](https://github.com/ipfs/go-ipfs/pull/6174))
  - feat(coreapi): tag all explicit connect requests in the connection manager ([ipfs/go-ipfs#6171](https://github.com/ipfs/go-ipfs/pull/6171))
  - chore: remove CODEOWNERS ([ipfs/go-ipfs#6172](https://github.com/ipfs/go-ipfs/pull/6172))
  - feat: update to IPFS Web UI 2.4.4 ([ipfs/go-ipfs#6169](https://github.com/ipfs/go-ipfs/pull/6169))
  - fix add error handling ([ipfs/go-ipfs#6156](https://github.com/ipfs/go-ipfs/pull/6156))
  - chore: remove waffle ([ipfs/go-ipfs#6157](https://github.com/ipfs/go-ipfs/pull/6157))
  - chore: fix a bunch of issues caught by golangci-lint ([ipfs/go-ipfs#6140](https://github.com/ipfs/go-ipfs/pull/6140))
  - docs/experimental-features.md: link to ipfs-ds-convert ([ipfs/go-ipfs#6154](https://github.com/ipfs/go-ipfs/pull/6154))
  - interrupt: fix send on closed ([ipfs/go-ipfs#6147](https://github.com/ipfs/go-ipfs/pull/6147))
  - docs: document Gateway.Writable not Gateway.Writeable ([ipfs/go-ipfs#6151](https://github.com/ipfs/go-ipfs/pull/6151))
  - Fuse fixes ([ipfs/go-ipfs#6135](https://github.com/ipfs/go-ipfs/pull/6135))
  - Remove duplicate blockstore from the package list ([ipfs/go-ipfs#6138](https://github.com/ipfs/go-ipfs/pull/6138))
  - Query for provider head/tail ([ipfs/go-ipfs#6125](https://github.com/ipfs/go-ipfs/pull/6125))
  - Remove dead link from ISSUE_TEMPLATE.md ([ipfs/go-ipfs#6128](https://github.com/ipfs/go-ipfs/pull/6128))
  - coreapi: remove Unixfs.Wrap ([ipfs/go-ipfs#6123](https://github.com/ipfs/go-ipfs/pull/6123))
  - coreapi unixfs: change Wrap logic to make more sense  ([ipfs/go-ipfs#6019](https://github.com/ipfs/go-ipfs/pull/6019))
  - deps: switch back to jbenet go-is-domain ([ipfs/go-ipfs#6119](https://github.com/ipfs/go-ipfs/pull/6119))
  - command repo stat: add human flag tests to t0080-repo.sh ([ipfs/go-ipfs#6116](https://github.com/ipfs/go-ipfs/pull/6116))
  - gc: fix a potential deadlock ([ipfs/go-ipfs#6112](https://github.com/ipfs/go-ipfs/pull/6112))
  - fix config options in osxfuse error messages ([ipfs/go-ipfs#6105](https://github.com/ipfs/go-ipfs/pull/6105))
  - Command repo stat: improve human flag behavior ([ipfs/go-ipfs#6106](https://github.com/ipfs/go-ipfs/pull/6106))
  - Provide root node immediately on add and pin add ([ipfs/go-ipfs#6068](https://github.com/ipfs/go-ipfs/pull/6068))
  - gomod: Update Dockerfile, remove Dockerfile.fast ([ipfs/go-ipfs#6100](https://github.com/ipfs/go-ipfs/pull/6100))
  - Return CID from 'ipfs files flush'  ([ipfs/go-ipfs#6102](https://github.com/ipfs/go-ipfs/pull/6102))
  - resolve: fix recursion ([ipfs/go-ipfs#6087](https://github.com/ipfs/go-ipfs/pull/6087))
  - fix(swarm): add dnsaddr support in swarm connect ([ipfs/go-ipfs#5535](https://github.com/ipfs/go-ipfs/pull/5535))
  - make in-memory datastore thread-safe ([ipfs/go-ipfs#6085](https://github.com/ipfs/go-ipfs/pull/6085))
  - Update package table to remove broken jenkins links ([ipfs/go-ipfs#6084](https://github.com/ipfs/go-ipfs/pull/6084))
  - mk: fix maketarball to work with gomod ([ipfs/go-ipfs#6078](https://github.com/ipfs/go-ipfs/pull/6078))
  - fix ls command to use the new coreinterface types ([ipfs/go-ipfs#6051](https://github.com/ipfs/go-ipfs/pull/6051))
  - mk: remove install_unsupported, leave a note ([ipfs/go-ipfs#6063](https://github.com/ipfs/go-ipfs/pull/6063))
  - mk: change git-hash command to include information about modifications ([ipfs/go-ipfs#6060](https://github.com/ipfs/go-ipfs/pull/6060))
  - mk: fix make install by not setting GOBIN ([ipfs/go-ipfs#6059](https://github.com/ipfs/go-ipfs/pull/6059))
  - go: require Golang 1.11.4 ([ipfs/go-ipfs#6057](https://github.com/ipfs/go-ipfs/pull/6057))
  - yamux: increase yamux window size to 8MiB. ([ipfs/go-ipfs#6049](https://github.com/ipfs/go-ipfs/pull/6049))
  - Introduce go modules [yey] ([ipfs/go-ipfs#6038](https://github.com/ipfs/go-ipfs/pull/6038))
  - cleanup daemon online logic ([ipfs/go-ipfs#6050](https://github.com/ipfs/go-ipfs/pull/6050))
  - ci: test on 32bit os ([ipfs/go-ipfs#5429](https://github.com/ipfs/go-ipfs/pull/5429))
  - feat/cmds: hide peers info default in bitswap stat ([ipfs/go-ipfs#5820](https://github.com/ipfs/go-ipfs/pull/5820))
  - Improve CLI help pages ([ipfs/go-ipfs#6013](https://github.com/ipfs/go-ipfs/pull/6013))
  - Close #6044 ([ipfs/go-ipfs#6045](https://github.com/ipfs/go-ipfs/pull/6045))
  - commands(dht): return final error ([ipfs/go-ipfs#6034](https://github.com/ipfs/go-ipfs/pull/6034))
  - Revert "Really run as non-root user in docker container" ([ipfs/go-ipfs#6040](https://github.com/ipfs/go-ipfs/pull/6040))
- github.com/ipfs/go-bitswap:
  - feat(messagequeue): rebroadcast wantlist ([ipfs/go-bitswap#106](https://github.com/ipfs/go-bitswap/pull/106))
  - reduce provide workers to 6 ([ipfs/go-bitswap#93](https://github.com/ipfs/go-bitswap/pull/93))
  - Reduce memory allocation ([ipfs/go-bitswap#103](https://github.com/ipfs/go-bitswap/pull/103))
  - refactor(messagequeue): remove dead code ([ipfs/go-bitswap#98](https://github.com/ipfs/go-bitswap/pull/98))
  - fix: limit use of custom context type ([ipfs/go-bitswap#89](https://github.com/ipfs/go-bitswap/pull/89))
  - fix: remove non-error log message ([ipfs/go-bitswap#91](https://github.com/ipfs/go-bitswap/pull/91))
  - fix(messagequeue): Remove second run loop ([ipfs/go-bitswap#94](https://github.com/ipfs/go-bitswap/pull/94))
- github.com/ipfs/go-blockservice:
  - Revert "Remove verifcid as it is handled in go-cid" ([ipfs/go-blockservice#25](https://github.com/ipfs/go-blockservice/pull/25))
  - Remove verifcid as it is handled in go-cid ([ipfs/go-blockservice#23](https://github.com/ipfs/go-blockservice/pull/23))
- github.com/ipfs/go-datastore:
  - cleanup and optimize naive query filters ([ipfs/go-datastore#125](https://github.com/ipfs/go-datastore/pull/125))
  - Fix – sorted limited offset mount queries ([ipfs/go-datastore#124](https://github.com/ipfs/go-datastore/pull/124))
  - Fix function comments based on best practices from Effective Go ([ipfs/go-datastore#122](https://github.com/ipfs/go-datastore/pull/122))
  - remove ThreadSafeDatastore ([ipfs/go-datastore#120](https://github.com/ipfs/go-datastore/pull/120))
  - Splinter TTLDatastore interface into TTL + Datastore ([ipfs/go-datastore#118](https://github.com/ipfs/go-datastore/pull/118))
- github.com/ipfs/go-ds-badger:
  - tweak the default options ([ipfs/go-ds-badger#52](https://github.com/ipfs/go-ds-badger/pull/52))
  - remove thread-safe assertion ([ipfs/go-ds-badger#55](https://github.com/ipfs/go-ds-badger/pull/55))
  - make memory-safe against concurrent closure/operations ([ipfs/go-ds-badger#53](https://github.com/ipfs/go-ds-badger/pull/53))
  - make badger use our logging framework ([ipfs/go-ds-badger#50](https://github.com/ipfs/go-ds-badger/pull/50))
- github.com/ipfs/go-ds-flatfs:
  - remove thread-safe assertion ([ipfs/go-ds-flatfs#53](https://github.com/ipfs/go-ds-flatfs/pull/53))
- github.com/ipfs/go-ds-leveldb:
  - Fast reverse query ([ipfs/go-ds-leveldb#28](https://github.com/ipfs/go-ds-leveldb/pull/28))
  - remove thread-safe assertion ([ipfs/go-ds-leveldb#27](https://github.com/ipfs/go-ds-leveldb/pull/27))
- github.com/ipfs/go-ipfs-cmdkit:
  - Extract files package ([ipfs/go-ipfs-cmdkit#31](https://github.com/ipfs/go-ipfs-cmdkit/pull/31))
- github.com/ipfs/go-ipfs-cmds:
  - sync: add yet another sync error ([ipfs/go-ipfs-cmds#161](https://github.com/ipfs/go-ipfs-cmds/pull/161))
  - Removed broken link from readme ([ipfs/go-ipfs-cmds#159](https://github.com/ipfs/go-ipfs-cmds/pull/159))
  - Fix broken link in readme ([ipfs/go-ipfs-cmds#160](https://github.com/ipfs/go-ipfs-cmds/pull/160))
  - set WebFile fpath to URL base ([ipfs/go-ipfs-cmds#158](https://github.com/ipfs/go-ipfs-cmds/pull/158))
  - Handle stdin name in cli/parse ([ipfs/go-ipfs-cmds#157](https://github.com/ipfs/go-ipfs-cmds/pull/157))
  - support url paths as files.WebFile ([ipfs/go-ipfs-cmds#154](https://github.com/ipfs/go-ipfs-cmds/pull/154))
  - typed encoder: improve pointer reflection ([ipfs/go-ipfs-cmds#155](https://github.com/ipfs/go-ipfs-cmds/pull/155))
  - cli: don't sync output to NUL on Windows ([ipfs/go-ipfs-cmds#153](https://github.com/ipfs/go-ipfs-cmds/pull/153))
- github.com/ipfs/go-ipfs-files:
  - return url as AbsPath from WebFile to implement FileInfo ([ipfs/go-ipfs-files#13](https://github.com/ipfs/go-ipfs-files/pull/13))
  - fix the content disposition header ([ipfs/go-ipfs-files#14](https://github.com/ipfs/go-ipfs-files/pull/14))
  - go format ([ipfs/go-ipfs-files#15](https://github.com/ipfs/go-ipfs-files/pull/15))
  - simplify content type checking ([ipfs/go-ipfs-files#9](https://github.com/ipfs/go-ipfs-files/pull/9))
  - remove extra webfile test code ([ipfs/go-ipfs-files#12](https://github.com/ipfs/go-ipfs-files/pull/12))
- github.com/ipfs/go-merkledag:
  - add function to marshal raw nodes to json ([ipfs/go-merkledag#36](https://github.com/ipfs/go-merkledag/pull/36))
  - fix some performance regressions when reading protobuf nodes ([ipfs/go-merkledag#34](https://github.com/ipfs/go-merkledag/pull/34))
- github.com/ipfs/go-metrics-interface:
  - update the counter interface to match prometheus ([ipfs/go-metrics-interface#2](https://github.com/ipfs/go-metrics-interface/pull/2))
- github.com/ipfs/go-mfs:
  - Return node from FlushPath ([ipfs/go-mfs#72](https://github.com/ipfs/go-mfs/pull/72))
  - Wire up context to FlushPath ([ipfs/go-mfs#70](https://github.com/ipfs/go-mfs/pull/70))
- github.com/ipfs/interface-go-ipfs-core:
  - don't close the top-level addr ([ipfs/interface-go-ipfs-core#25](https://github.com/ipfs/interface-go-ipfs-core/pull/25))
  - fix a bunch of small test "bugs" ([ipfs/interface-go-ipfs-core#24](https://github.com/ipfs/interface-go-ipfs-core/pull/24))
  - remove Wrap ([ipfs/interface-go-ipfs-core#21](https://github.com/ipfs/interface-go-ipfs-core/pull/21))
  - Unixfs.Wrap Fixes ([ipfs/interface-go-ipfs-core#10](https://github.com/ipfs/interface-go-ipfs-core/pull/10))
  - tweak the Ls interface ([ipfs/interface-go-ipfs-core#14](https://github.com/ipfs/interface-go-ipfs-core/pull/14))
- github.com/libp2p/go-buffer-pool:
  - Enable tests ([libp2p/go-buffer-pool#6](https://github.com/libp2p/go-buffer-pool/pull/6))
- github.com/libp2p/go-flow-metrics:
  - Just repair spelling mistake ([libp2p/go-flow-metrics#3](https://github.com/libp2p/go-flow-metrics/pull/3))
- github.com/libp2p/go-libp2p:
  - Deprecate gx in readme & link to workspace repo ([libp2p/go-libp2p#591](https://github.com/libp2p/go-libp2p/pull/591))
  - Respect nodial option in routed host ([libp2p/go-libp2p#590](https://github.com/libp2p/go-libp2p/pull/590))
  - fix panic in observed address activation check ([libp2p/go-libp2p#586](https://github.com/libp2p/go-libp2p/pull/586))
  - Improve observed address handling ([libp2p/go-libp2p#585](https://github.com/libp2p/go-libp2p/pull/585))
  - identify: avoid parsing/printing multiaddrs ([libp2p/go-libp2p#583](https://github.com/libp2p/go-libp2p/pull/583))
  - move things outside of the lock in obsaddr ([libp2p/go-libp2p#582](https://github.com/libp2p/go-libp2p/pull/582))
  - identify: be more careful about the addresses we store ([libp2p/go-libp2p#577](https://github.com/libp2p/go-libp2p/pull/577))
  - relay: turn autorelay into a service and always filter out relay addresses ([libp2p/go-libp2p#578](https://github.com/libp2p/go-libp2p/pull/578))
  - chore: fail in the libp2p constructor if we fail to store the key ([libp2p/go-libp2p#576](https://github.com/libp2p/go-libp2p/pull/576))
  - Fix broken link in README.md ([libp2p/go-libp2p#580](https://github.com/libp2p/go-libp2p/pull/580))
  - Link to docs & discuss in readme ([libp2p/go-libp2p#571](https://github.com/libp2p/go-libp2p/pull/571))
  - Reduce autorelay boot delay and correctly handle private->public transition ([libp2p/go-libp2p#570](https://github.com/libp2p/go-libp2p/pull/570))
  - reduce nat error level ([libp2p/go-libp2p#568](https://github.com/libp2p/go-libp2p/pull/568))
  - relay: simplify declaration of multiaddr var ([libp2p/go-libp2p#563](https://github.com/libp2p/go-libp2p/pull/563))
  - Fix UDP listen on a Unspecified Address and Dial from the Unspecified Address ([libp2p/go-libp2p#561](https://github.com/libp2p/go-libp2p/pull/561))
  - Remove jenkins column from package table ([libp2p/go-libp2p#562](https://github.com/libp2p/go-libp2p/pull/562))
  - Fix typos in p2p/net/README.md ([libp2p/go-libp2p#555](https://github.com/libp2p/go-libp2p/pull/555))
  - better nat mapping ([libp2p/go-libp2p#549](https://github.com/libp2p/go-libp2p/pull/549))
- github.com/libp2p/go-libp2p-autonat:
  - fully close the autonat client stream ([libp2p/go-libp2p-autonat#21](https://github.com/libp2p/go-libp2p-autonat/pull/21))
  - parallelize dialbacks ([libp2p/go-libp2p-autonat#20](https://github.com/libp2p/go-libp2p-autonat/pull/20))
  - Pacify the race detector ([libp2p/go-libp2p-autonat#17](https://github.com/libp2p/go-libp2p-autonat/pull/17))
- github.com/libp2p/go-libp2p-autonat-svc:
  - full close the autonat stream ([libp2p/go-libp2p-autonat-svc#20](https://github.com/libp2p/go-libp2p-autonat-svc/pull/20))
  - reduce dialback timeout to 15s ([libp2p/go-libp2p-autonat-svc#17](https://github.com/libp2p/go-libp2p-autonat-svc/pull/17))
- github.com/libp2p/go-libp2p-circuit:
  - use buffer pool in newDelimitedReader ([libp2p/go-libp2p-circuit#71](https://github.com/libp2p/go-libp2p-circuit/pull/71))
  - Use NoDial option when opening hop streams for non-active relays ([libp2p/go-libp2p-circuit#70](https://github.com/libp2p/go-libp2p-circuit/pull/70))
  - use io.CopyBuffer with explicitly allocated buffers ([libp2p/go-libp2p-circuit#69](https://github.com/libp2p/go-libp2p-circuit/pull/69))
  - docs and nits ([libp2p/go-libp2p-circuit#66](https://github.com/libp2p/go-libp2p-circuit/pull/66))
- github.com/libp2p/go-libp2p-kad-dht:
  - dialQueue: start the control loop later ([libp2p/go-libp2p-kad-dht#312](https://github.com/libp2p/go-libp2p-kad-dht/pull/312))
  - make it work in wasm ([libp2p/go-libp2p-kad-dht#310](https://github.com/libp2p/go-libp2p-kad-dht/pull/310))
  - Revert "GoModules: Checksum mismatch:" ([libp2p/go-libp2p-kad-dht#309](https://github.com/libp2p/go-libp2p-kad-dht/pull/309))
  - defer dialqueue action until initial peers have been added ([libp2p/go-libp2p-kad-dht#301](https://github.com/libp2p/go-libp2p-kad-dht/pull/301))
- github.com/libp2p/go-libp2p-nat:
  - switch to libp2p's go-nat fork ([libp2p/go-libp2p-nat#16](https://github.com/libp2p/go-libp2p-nat/pull/16))
  - remove all uses of multiaddrs ([libp2p/go-libp2p-nat#14](https://github.com/libp2p/go-libp2p-nat/pull/14))
- github.com/libp2p/go-libp2p-net:
  - fix WithNoDial to return the context ([libp2p/go-libp2p-net#43](https://github.com/libp2p/go-libp2p-net/pull/43))
  - NoDial context option ([libp2p/go-libp2p-net#42](https://github.com/libp2p/go-libp2p-net/pull/42))
- github.com/libp2p/go-libp2p-peer:
  - Let ID implement encoding.Binary[Un]Marshaler and encoding.Text[Un]Marshaler ([libp2p/go-libp2p-peer#44](https://github.com/libp2p/go-libp2p-peer/pull/44))
- github.com/libp2p/go-libp2p-peerstore:
  - keep temp addresses for 2 minutes ([libp2p/go-libp2p-peerstore#67](https://github.com/libp2p/go-libp2p-peerstore/pull/67))
  - migrate to multiformats/go-base32 ([libp2p/go-libp2p-peerstore#61](https://github.com/libp2p/go-libp2p-peerstore/pull/61))
- github.com/libp2p/go-libp2p-protocol:
  - update readme ([libp2p/go-libp2p-protocol#6](https://github.com/libp2p/go-libp2p-protocol/pull/6))
  - Enable standard Travis CI tests. ([libp2p/go-libp2p-protocol#5](https://github.com/libp2p/go-libp2p-protocol/pull/5))
  - Fix go get address. ([libp2p/go-libp2p-protocol#4](https://github.com/libp2p/go-libp2p-protocol/pull/4))
  - Add MIT license ([libp2p/go-libp2p-protocol#3](https://github.com/libp2p/go-libp2p-protocol/pull/3))
  - Standardized Readme ([libp2p/go-libp2p-protocol#2](https://github.com/libp2p/go-libp2p-protocol/pull/2))
- github.com/libp2p/go-libp2p-pubsub-router:
  - gx publish 0.5.17 ([libp2p/go-libp2p-pubsub-router#26](https://github.com/libp2p/go-libp2p-pubsub-router/pull/26))
- github.com/libp2p/go-libp2p-quic-transport:
  - update quic-go to v0.11.0 ([libp2p/go-libp2p-quic-transport#54](https://github.com/libp2p/go-libp2p-quic-transport/pull/54))
- github.com/libp2p/go-libp2p-routing-helpers:
  - fix(put): fail if any router fails ([libp2p/go-libp2p-routing-helpers#19](https://github.com/libp2p/go-libp2p-routing-helpers/pull/19))
- github.com/libp2p/go-libp2p-swarm:
  - Add context option to disable dialing when opening a new stream ([libp2p/go-libp2p-swarm#116](https://github.com/libp2p/go-libp2p-swarm/pull/116))
  - return all dial errors if dial has failed ([libp2p/go-libp2p-swarm#115](https://github.com/libp2p/go-libp2p-swarm/pull/115))
  - Differentiate no addresses error from no good addresses ([libp2p/go-libp2p-swarm#113](https://github.com/libp2p/go-libp2p-swarm/pull/113))
- github.com/libp2p/go-libp2p-transport:
  - tests: constrain concurrency with race detector. ([libp2p/go-libp2p-transport#47](https://github.com/libp2p/go-libp2p-transport/pull/47))
  - pick test timeout from env var if available. ([libp2p/go-libp2p-transport#46](https://github.com/libp2p/go-libp2p-transport/pull/46))
  - increase test timeout. ([libp2p/go-libp2p-transport#45](https://github.com/libp2p/go-libp2p-transport/pull/45))
- github.com/libp2p/go-msgio:
  - Improve test coverage ([libp2p/go-msgio#10](https://github.com/libp2p/go-msgio/pull/10))
- github.com/libp2p/go-reuseport:
  - fix: add wasm build tag to wasm module ([libp2p/go-reuseport#70](https://github.com/libp2p/go-reuseport/pull/70))
- github.com/libp2p/go-reuseport-transport:
  - don't set linger to 0 ([libp2p/go-reuseport-transport#14](https://github.com/libp2p/go-reuseport-transport/pull/14))
- github.com/libp2p/go-tcp-transport:
  - set linger to 0 for both inbound and outbound connections ([libp2p/go-tcp-transport#36](https://github.com/libp2p/go-tcp-transport/pull/36))
- github.com/libp2p/go-ws-transport:
  - modernize request handling ([libp2p/go-ws-transport#41](https://github.com/libp2p/go-ws-transport/pull/41))
