---
date: 2019-05-22
url: 93-go-ipfs-0.4.21
title: go-ipfs 0.4.21 released
author: Molly Mackinlay
---

> Key bug fixes, experimental TLS1.3 support, reduced memory usage, base32 CIDv1 CIDs and more!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Lots of snazzy bug fixes & perf improvements in the latest go-ipfs release 0.4.21 - get it while it's hot!🔥 Note there are a few breaking changes - including encoding <a href="https://twitter.com/hashtag/IPFS?src=hash&amp;ref_src=twsrc%5Etfw">#IPFS</a> CIDv1 CIDs using base32 by default to support subdomain usage.🎉 Upgrade ASAP! <a href="https://t.co/sPWj1EJ5rk">https://t.co/sPWj1EJ5rk</a></p>&mdash; Molly Mackinlay (@momack28) <a href="https://twitter.com/momack28/status/1136142187870076929?ref_src=twsrc%5Etfw">May 22, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

We're happy to announce go-ipfs 0.4.21. This release has some critical bug fixes and a handful of new features so every user should upgrade.

Key bug fixes:

* Too many open file descriptors/too many peers ([#6237](https://github.com/ipfs/go-ipfs/issues/6237)).
* Adding multiple files at the same time doesn't work ([#6254](https://github.com/ipfs/go-ipfs/pull/6255)).
* CPU utilization spikes and then holds at 100% ([#5613](https://github.com/ipfs/go-ipfs/issues/5613)).

Key features:

* Experimental TLS1.3 support (to eventually replace secio).
* OpenSSL support for SECIO handshakes (performance improvement).

**IMPORTANT:** This release fixes a bug in our security transport that could potentially drop data from the channel. Note: This issue affects neither the privacy nor the integrity of the data with respect to a third-party attacker. Only the peer sending us data could trigger this bug.

‼️**ALL USERS MUST UPGRADE.**‼️ We intended to introduce a feature this release that, unfortunately, [reliably triggered this bug][secio-bug]. To avoid partitioning the network, we've decided to postpone this feature for a release or two.

Specifically, we're going to provide a minimum _one month_ upgrade period. After that, we'll start testing the impact of deploying the proposed changes.

👉 If you're running the mainline go-ipfs, please upgrade ASAP. If you're building a separate app or working on a forked go-ipfs, make sure to upgrade github.com/libp2p/go-libp2p-secio to _at least_ v0.0.3.

[secio-bug]: https://github.com/libp2p/go-libp2p/issues/644

### 🐛 Bug Fixes And Enhancements

This release includes quite a number of critical bug fixes and performance/reliability enhancements.

#### Error when adding multiple files 🗂

The last release broke the simple command `ipfs add file1 file2`. It turns out we simply lacked a test case for this. Both of these issues (the bug and the lack of a test case) have now been fixed.

#### SECIO 🔏

As noted above, we've fixed a bug that could cause data to be dropped from a SECIO connection on read. Specifically, this happens when:

1. The capacity of the read buffer is greater than the length.
2. The remote peer sent more than the length but less than the capacity in a single secio "frame".

In this case, we'd fill the read buffer to it's capacity instead of its length.

#### Too many open files, too many peers, etc 😵

Go-ipfs automatically closes the least useful connections when it accumulates too many connections. Unfortunately, some relayed connections were blocking in `Close()`, halting the entire process.

#### Out of control CPU usage 🔥

Many users noted out of control CPU usage this release. This turned out to be a long-standing issue with how the DHT handled provider records (records recording which peers have what content):

1. It wasn't removing provider records for content until the set of providers completely emptied.
2. It was loading every provider record into memory whenever we updated the set of providers.

Combined, these two issues were trashing the provider record cache, forcing the DHT to repeatedly load and discard provider records.

#### More Reliable Connection Management 🙌

Go-ipfs has a subsystem called the "connection manager" to close the least-useful connections when go-ipfs runs low on resources.

Unfortunately, other IPFS subsystems may learn about connections _before_ the connection manager. Previously, if some IPFS subsystem tried to mark a connection as useful before the connection manager learned about it, the connection manager would discard this information. We believe this was causing [#6271](https://github.com/ipfs/go-ipfs/issues/6271). [It no longer does that](https://github.com/libp2p/go-libp2p-connmgr/pull/39).

#### Improved Bitswap Connection Management 🤝

Bitswap now uses the connection manager to mark all peers downloading blocks as important (while downloading). Previously, it only marked peers from which _it_ was downloading blocks.

#### Reduced Memory Usage 🧠

The most noticeable memory reduction in this release comes from fixing connection closing. However, we've made a few additional improvements:

* Bitswap's "work queue" no longer remembers every peer it has seen indefinitely.
* The peerstore now interns protocol names.
* The per-peer goroutine count has been reduced.
* The DHT now wastes less memory on idle peers by pooling buffered writers and returning them to the pool when not actively using them.

#### Increased File Descriptor Limit 📝

The default file descriptor limit has been raised to 8192 (from 2048). Unfortunately, go-ipfs behaves poorly when it runs out of file descriptors and it uses a _lot_ of file descriptors.

Luckily, most modern kernels can handle thousands of file descriptors without any difficulty.

#### Decreased Connection Handshake Latency ⏱

Libp2p now shaves off a couple of round trips when initiating connections by beginning the protocol negotiation before the remote peer responds to the initial handshake message.

In the optimal case (when the target peer speaks our preferred protocol), this reduces the number of handshake round-trips from 6 to 4 (including the TCP handshake).

### 📢 Commands

This release brings no new commands but does introduce a few changes, bugfixes, and enhancements. This section is hardly complete but it lists the most noticeable changes.

Take note: this release also introduces a few breaking changes.

#### [DEPRECATION] The URLStore Command Deprecated

The experimental `ipfs urlstore` command is now deprecated. Please use `ipfs add --nocopy URL` instead.

#### [BREAKING] The DHT Command Base64 Encodes Values 

When responding to an `ipfs dht get` command, the daemon now encodes the returned value using base64. The `ipfs` command will automatically decode this value before returning it to the user so this change should only affect those using the HTTP API directly.

Unfortunately, this change was necessary as DHT records are arbitrary binary blobs which can't be directly stored in JSON strings.

#### [BREAKING] Base32 Encoded v1 CIDs By Default

Both js-ipfs and go-ipfs now encode CIDv1 CIDs using base32 by default, instead of base58. Unfortunately, base58 is case-sensitive and doesn't play well with browsers (see [#4143](https://github.com/ipfs/go-ipfs/issues/4143).

#### Human Readable Numbers

The `ipfs bitswap stat` and and `ipfs object stat` commands now support a `--humanize` flag that formats numbers with human-readable units (GiB, MiB, etc.).

#### Improved Errors

This release improves two types of errors:

1. Commands that take paths/multiaddrs now include the path/multiaddr in the error message when it fails to parse.
2. `ipfs swarm connect` now returns a detailed error describing which addresses were tried and why the dial failed.

#### Ping Improvements

The ping command has received some small improvements and fixes:

1. It now exits with a non-zero exit status on failure.
2. It no longer succeeds with zero successful pings if we have a zombie but non-functional connection to the peer being pinged ([#6298](https://github.com/ipfs/go-ipfs/issues/6298)).
3. It now prints out the average latency when canceled with `^C` (like the unix `ping` command).

#### Improved Help Text

Go-ipfs now intelligently wraps help text for easier reading. On an 80 character wide terminal,

**Before**

```
USAGE
  ipfs add <path>... - Add a file or directory to ipfs.

SYNOPSIS
  ipfs add [--recursive | -r] [--dereference-args] [--stdin-name=<stdin-name>] [
--hidden | -H] [--quiet | -q] [--quieter | -Q] [--silent] [--progress | -p] [--t
rickle | -t] [--only-hash | -n] [--wrap-with-directory | -w] [--chunker=<chunker
> | -s] [--pin=false] [--raw-leaves] [--nocopy] [--fscache] [--cid-version=<cid-
version>] [--hash=<hash>] [--inline] [--inline-limit=<inline-limit>] [--] <path>
...

ARGUMENTS

  <path>... - The path to a file to be added to ipfs.

OPTIONS

  -r,               --recursive           bool   - Add directory paths recursive
ly.
  --dereference-args                      bool   - Symlinks supplied in argument
s are dereferenced.
  --stdin-name                            string - Assign a name if the file sou
rce is stdin.
  -H,               --hidden              bool   - Include files that are hidden
. Only takes effect on recursive add.
  -q,               --quiet               bool   - Write minimal output.
  -Q,               --quieter             bool   - Write only final hash.
  --silent                                bool   - Write no output.
  -p,               --progress            bool   - Stream progress data.
  -t,               --trickle             bool   - Use trickle-dag format for da
g generation.
  -n,               --only-hash           bool   - Only chunk and hash - do not 
write to disk.
  -w,               --wrap-with-directory bool   - Wrap files with a directory o
bject.
  -s,               --chunker             string - Chunking algorithm, size-[byt
es] or rabin-[min]-[avg]-[max]. Default: size-262144.
  --pin                                   bool   - Pin this object when adding. 
Default: true.
  --raw-leaves                            bool   - Use raw blocks for leaf nodes
. (experimental).
  --nocopy                                bool   - Add the file using filestore.
 Implies raw-leaves. (experimental).
  --fscache                               bool   - Check the filestore for pre-e
xisting blocks. (experimental).
  --cid-version                           int    - CID version. Defaults to 0 un
less an option that depends on CIDv1 is passed. (experimental).
  --hash                                  string - Hash function to use. Implies
 CIDv1 if not sha2-256. (experimental). Default: sha2-256.
  --inline                                bool   - Inline small blocks into CIDs
. (experimental).
  --inline-limit                          int    - Maximum block size to inline.
 (experimental). Default: 32.

```


**After**

```
USAGE
  ipfs add <path>... - Add a file or directory to ipfs.

SYNOPSIS
  ipfs add [--recursive | -r] [--dereference-args] [--stdin-name=<stdin-name>]
           [--hidden | -H] [--quiet | -q] [--quieter | -Q] [--silent]
           [--progress | -p] [--trickle | -t] [--only-hash | -n]
           [--wrap-with-directory | -w] [--chunker=<chunker> | -s] [--pin=false]
           [--raw-leaves] [--nocopy] [--fscache] [--cid-version=<cid-version>]
           [--hash=<hash>] [--inline] [--inline-limit=<inline-limit>] [--]
           <path>...

ARGUMENTS

  <path>... - The path to a file to be added to ipfs.

OPTIONS

  -r, --recursive            bool   - Add directory paths recursively.
  --dereference-args         bool   - Symlinks supplied in arguments are
                                      dereferenced.
  --stdin-name               string - Assign a name if the file source is stdin.
  -H, --hidden               bool   - Include files that are hidden. Only takes
                                      effect on recursive add.
  -q, --quiet                bool   - Write minimal output.
  -Q, --quieter              bool   - Write only final hash.
  --silent                   bool   - Write no output.
  -p, --progress             bool   - Stream progress data.
  -t, --trickle              bool   - Use trickle-dag format for dag generation.
  -n, --only-hash            bool   - Only chunk and hash - do not write to
                                      disk.
  -w, --wrap-with-directory  bool   - Wrap files with a directory object.
  -s, --chunker              string - Chunking algorithm, size-[bytes] or
                                      rabin-[min]-[avg]-[max]. Default:
                                      size-262144.
  --pin                      bool   - Pin this object when adding. Default:
                                      true.
  --raw-leaves               bool   - Use raw blocks for leaf nodes.
                                      (experimental).
  --nocopy                   bool   - Add the file using filestore. Implies
                                      raw-leaves. (experimental).
  --fscache                  bool   - Check the filestore for pre-existing
                                      blocks. (experimental).
  --cid-version              int    - CID version. Defaults to 0 unless an
                                      option that depends on CIDv1 is passed.
                                      (experimental).
  --hash                     string - Hash function to use. Implies CIDv1 if
                                      not sha2-256. (experimental). Default:
                                      sha2-256.
  --inline                   bool   - Inline small blocks into CIDs.
                                      (experimental).
  --inline-limit             int    - Maximum block size to inline.
                                      (experimental). Default: 32.
```

### ✨ Features

This release is primarily a bug fix release but it still includes two nice features from libp2p.

#### 🤫 Experimental TLS1.3 support

Go-ipfs now has experimental TLS1.3 support. Currently, libp2p (IPFS's networking library) uses a custom TLS-like protocol we call SECIO. However, the conventional wisdom concerning custom security transports is "just don't" so we are working on replacing it with TLS1.3

To choose this protocol by default, set the `Experimental.PreferTLS` config variable:

```bash
> ipfs config --bool Experimental.PreferTLS true
```

Why TLS1.3 and not X (noise, etc.)?

1. Libp2p allows negotiating transports so there's no reason not to add noise support to libp2p as well.
2. TLS has wide language support which should make implementing libp2p for new languages significantly simpler.

#### 👂 OpenSSL Support

Go-ipfs can now (optionally) be built with OpenSSL support for improved performance when establishing connections. This is primarily useful for nodes receiving multiple inbound connections per second.

To enable openssl support, rebuild go-ipfs with:

```bash
> make build GOFLAGS=-tags=openssl
```

### 🎛 CoreAPI

The CoreAPI refactor is still underway and we've made significant progress towards a usable ipfs-as-a-library constructor. Specifically, we've integrated the [fx](https://go.uber.org/fx) dependency injection system and are now working on cleaning up our initialization logic. This should make it easier to inject new services into a go-ipfs process without messing with the core internals.

### Build: `GOCC` Environment Variable

The build system now uses the `GOCC` environment variable allowing for use of specific go versions during builds.

# ❤️ Huge thank you to everyone that made this release possible

Shout-out to all contributors that participated in this release (including contributions to ipld, libp2p, and multiformats):

| Contributor                | Commits | Lines ±     | Files Changed |
|----------------------------|---------|-------------|---------------|
| Steven Allen               | 220     | +6078/-4211 | 520           |
| Łukasz Magiera             | 53      | +5039/-4557 | 274           |
| vyzo                       | 179     | +2929/-1704 | 238           |
| Raúl Kripalani             | 44      | +757/-1895  | 134           |
| hannahhoward               | 11      | +755/-1005  | 49            |
| Marten Seemann             | 16      | +862/-203   | 44            |
| keks                       | 10      | +359/-110   | 12            |
| Jan Winkelmann             | 8       | +368/-26    | 16            |
| Jakub Sztandera            | 4       | +361/-8     | 7             |
| Adrian Lanzafame           | 1       | +287/-18    | 5             |
| Erik Ingenito              | 4       | +247/-28    | 8             |
| Reid 'arrdem' McKenzie     | 1       | +220/-20    | 3             |
| Yusef Napora               | 26      | +98/-130    | 26            |
| Michael Avila              | 3       | +116/-59    | 8             |
| Raghav Gulati              | 13      | +145/-26    | 13            |
| tg                         | 1       | +41/-33     | 1             |
| Matt Joiner                | 6       | +41/-30     | 7             |
| Cole Brown                 | 1       | +37/-25     | 1             |
| Dominic Della Valle        | 2       | +12/-40     | 4             |
| Overbool                   | 1       | +50/-0      | 2             |
| Christopher Buesser        | 3       | +29/-16     | 10            |
| myself659                  | 1       | +38/-5      | 2             |
| Alex Browne                | 3       | +30/-8      | 3             |
| jmank88                    | 1       | +27/-4      | 2             |
| Vikram                     | 1       | +25/-1      | 2             |
| MollyM                     | 7       | +17/-9      | 7             |
| Marcin Rataj               | 1       | +17/-1      | 1             |
| requilence                 | 1       | +11/-4      | 1             |
| Teran McKinney             | 1       | +8/-2       | 1             |
| Oli Evans                  | 1       | +5/-5       | 1             |
| Masashi Salvador Mitsuzawa | 1       | +5/-1       | 1             |
| chenminjian                | 1       | +4/-0       | 1             |
| Edgar Lee                  | 1       | +3/-1       | 1             |
| Dirk McCormick             | 1       | +2/-2       | 2             |
| ia                         | 1       | +1/-1       | 1             |
| Alan Shaw                  | 1       | +1/-1       | 1             |

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [go-ipfs repo](https://github.com/ipfs/go-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [Go Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/team-mgmt/issues/674) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.


