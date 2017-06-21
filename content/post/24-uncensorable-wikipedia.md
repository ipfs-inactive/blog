---
date: 2017-05-04
url: 24-uncensorable-wikipedia
title: Uncensorable Wikipedia on IPFS
author: The IPFS Team
---

_**UPDATE:** There are now [English](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco) and [Kurdish](https://ipfs.io/ipfs/QmWY4KZXKTuspGSwYVDNbNLLZcmSiQ63Mdmz7eRd4KzBbb) versions of Wikipedia on IPFS as well as the Turkish verison. You can find the latest hashes for all of our Wikipedia snapshots in [this YAML file](https://github.com/ipfs/distributed-wikipedia-mirror/blob/master/snapshot-hashes.yml)_

> There is more than one way to burn a book. And the world is full of people running about with lit matches.
> -- Ray Bradbury, Fahrenheit 451

> The Internet treats censorship as a malfunction and routes around it.
> -- John Perry Barlow

We are happy to announce that **we have published a [snapshot of tr.wikipedia.org, the Turkish version of Wikipedia](https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Anasayfa.html) on IPFS**. There will be Arabic, Kurdish and English versions coming shortly.  This blog post includes information on how you can access those snapshots, how you can help mirror them, and why it's so powerful to put content like this on IPFS.

The effort to put snapshots of Wikipedia onto IPFS is an independent effort undertaken by the IPFS maintainers. It is not affiliated with the Wikimedia Foundation and is not connected with the volunteers who contribute to Wikipedia articles.

## What Triggered This Announcement

At 8am local time on April 29th, Wikipedia went dark for everyone in Turkey. According to the independent watchdog group [Turkey Blocks](https://turkeyblocks.org), the Turkish government has issued a court order that permanently restricts access to the online encyclopedia.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Confirmed: All editions of the <a href="https://twitter.com/hashtag/Wikipedia?src=hash">#Wikipedia</a> online encyclopedia blocked in <a href="https://twitter.com/hashtag/Turkey?src=hash">#Turkey</a> as of 8:00AM local time<a href="https://t.co/ybFolRmsOs">https://t.co/ybFolRmsOs</a> <a href="https://t.co/hI9tn4bHe5">pic.twitter.com/hI9tn4bHe5</a></p>&mdash; Turkey Blocks (@TurkeyBlocks) <a href="https://twitter.com/TurkeyBlocks/status/858189777585262592">April 29, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

A main goal of the IPFS Project is improving humanity's access to information. We strongly oppose the censorship of history, of news, of free thought, of discourse, and of compendiums of vital information such as Wikipedia. Free access to information is key to modern human life, to a free society, and to a flourishing culture. We're alarmed by the erosion of civil liberties wherever it occurs, and we want to help people like the citizens of Turkey preserve freedom of information, even in the face of a tightening iron fist.

Upon hearing the news, we revived an effort to put snapshots of Wikipedia on IPFS, so that people may be able to read it in a decentralized and distributed way. This can help people to at least _view_ all of the Wikipedia content, even if they cannot reach Wikipedia.org itself.

## Quick Background: IPFS and Content Addressing

**[IPFS](https://ipfs.io) -- the Inter-Planetary File System** -- is a new internet protocol that makes the web faster, safer, and more open. IPFS changes the _addressing_ of information, moving from *location addressing* to *content addressing*. You can find out more about IPFS at [the IPFS Website](https://ipfs.io) or by [watching this talk](https://www.youtube.com/watch?v=2RCwZDRwk48).

*Content addressing* is a technique to reference files or data by a unique fingerprint derived from the contents of the file or data itself. Content addressing is implemented with [cryptographic hashing](https://simple.wikipedia.org/wiki/Cryptographic_hash_function), so that content addresses are secure, permanent, and derived directly from the content itself. Information systems like IPFS use content addressing to ensure files, websites, and webapps can move around the network and be distributed by any computer securely and with perfect fidelity. This means that the contents of websites like Wikipedia can be moved around and accessed in a peer-to-peer, decentralized way, much like BitTorrent or even email. This works even if access to the specific https://en.wikipedia.org servers is censored. To find out more about content addressing, you can watch [this part of a talk](https://youtu.be/2RCwZDRwk48?t=847) or [this excellent post](https://ipfs.io/ipfs/QmNhFJjGcMPqpuYfxL62VVB9528NXqDNMFXiqN5bgFYiZ1/its-time-for-the-permanent-web.html).

### Why put Wikipedia on IPFS?


By putting important information like Wikipedia onto the decentralized web, we open many avenues for people to access, hold, cite, and use that information in more durable ways. This is a quick summary of the ways IPFS makes these things possible. To learn more, visit https://ipfs.io.

In short, content on IPFS is **harder to attack** and easier to distribute because it’s **peer-to-peer and decentralized**.

**Even if the original publisher is taken down, the content can be served by anyone who has it.** As long as at least one node on the network has a copy of the content, everyone will be able to get it.  This means the responsibility for serving content can change over time without changing the way people link to the content and without any doubt that the content you're reading is exactly the content that was originally published.

**The content you download is cryptographically verified** to ensure that it hasn’t been tampered with.

**IPFS can work in partitioned networks** - you don’t need a stable connection to the rest of the web in order to access content through IPFS. As long as your node can connect to at least one node with the content you want, it works!

**As soon as any node has the content, everyone's links start working.** Even if someone destroys all the copies on the network, it only takes one node adding the content in order to restore availability.

**If one IPFS gateway gets blocked, you can use another one.** IPFS gateways are all capable of serving the same content, so you’re not stuck relying on one point of failure.

**Lightening the load**: With IPFS, people viewing the content are also helping distribute the content (unless they opt out) and anyone can choose to pin a copy of some content on their node in order to help with access and preservation.

**You can read anonymously.** As with HTTP, IPFS can work over Tor and other anonymity systems

**IPFS does not rely on DNS**. If someone blocks your access to DNS or spoofs DNS in your network, it will not prevent IPFS nodes from resolving content over the peer-to-peer network. Even if you're using the DNSlink feature of IPFS, you just need to find a gateway that _does_ have access to DNS. As long as the gateway you're relying on has access to DNS it will be able to resolve your DNSlink addresses.

**IPFS does not rely on the Certificate Authority System**, so bad or corrupt Certificate Authorities do not impact it.

**You can move content via [sneakernet](https://en.wikipedia.org/wiki/Sneakernet)!** _This is very useful in areas with poor connectivity, due to resource limitations, security reasons, or censorship._ Even if your network is physically disconnected from the rest of the internet, you can write content from IPFS onto USB drives or other external drives, physically move them to computers connected to a new network, and re-publish the content on the new network. Even though you're on a separate network, IPFS will let nodes access the content using the same identifiers in both networks as long as at least one node on the network has that content.

**IPFS nodes work hard to find each other on the network** and to reconnect with each other after connections get cut.

(experimental) **You can even form private IPFS networks** to share information _only_ with computers you've chosen to connect with.

## Wikipedia on IPFS -- Background

### What does it mean to put Wikipedia on IPFS?

The idea of putting Wikipedia on IPFS has been around for a while. Every few months or so someone revives the threads. You can find such discussions in [this github issue about archiving Wikipedia](https://github.com/ipfs/archives/issues/20), [this issue about possible integrations with Wikipedia](https://github.com/ipfs/notes/issues/46), and [this proposal for a new project](https://github.com/ipfs/notes/issues/47#issuecomment-140587530).

We have two consecutive goals regarding Wikipedia on IPFS: Our first goal is to create periodic read-only snapshots of Wikipedia.  A second goal will be to create a full-fledged read-write version of Wikipedia. This second goal would connect with the Wikimedia Foundation’s bigger, longer-running conversation about decentralizing Wikipedia, which you can read about at https://strategy.m.wikimedia.org/wiki/Proposal:Distributed_Wikipedia

### (Goal 1) Read-Only Wikipedia on IPFS

The easy way to get Wikipedia content on IPFS is to periodically -- say every week -- take snapshots of all the content and add it to IPFS. That way the majority of Wikipedia users -- who only read Wikipedia and don’t edit -- could use all the information on Wikipedia with all the benefits of IPFS. Users couldn't edit it, but users could download and archive swaths of articles, or even the whole thing. People could serve it to each other peer-to-peer, reducing the bandwidth load on Wikipedia servers. People could even distribute it to each other in closed, censored, or resource-constrained networks -- with IPFS, peers do not need to be connected to the original source of the content, being connected to anyone who has the content is enough. Effectively, the content can jump from computer to computer in a peer-to-peer way, and avoid having to connect to the content source or even the internet backbone. We've been in discussions with many groups about the potential of this kind of thing, and how it could help billions of people around the world to access information better -- either free of censorship, or circumventing serious bandwidth or latency constraints.

So far, we have achieved part of this goal: we have static snapshots of all of Wikipedia on IPFS. This is already a huge result that will help people access, keep, archive, cite, and distribute lots of content. In particular, we hope that this distribution helps people in Turkey, who find themselves in a tough situation. We are still working out a process to continue updating these snapshots, we hope to have someone at Wikimedia in the loop as they are the authoritative source of the content. **If you could help with this, please get in touch with us at wikipedia-project@ipfs.io.**

### (Goal 2) Fully Read-Write Wikipedia on IPFS

The long term goal is to get the full-fledged read-write Wikipedia to work on top of IPFS. This is much more difficult because for a read-write application like Wikipedia to leverage the distributed nature of IPFS, we need to change the how the applications write data. A read-write Wikipedia on IPFS would allow completely decentralized and extremely difficult to censor operation. In addition to all the benefits of the static version above, the users of a read-write Wikipedia on IPFS could write content from anywhere and publish it, even without being directly connected to any wikipedia.org servers. There would be automatic version control and version history archiving. We could allow people to view, edit, and publish in completely encrypted contexts, which is important to people in highly repressive regions of the world.

A full read-write version (2) would require a strong collaboration with Wikipedia.org itself, and finishing work on important dynamic content challenges -- we are working on all the technology (2) needs, but it's not ready for prime-time yet. We will update when it is.

## Wikipedia on IPFS -- The Release Today

Today, we are releasing the first full static snapshot on IPFS of all of https://tr.wikipedia.org. We describe how to access it and how we did this below. This snapshot was taken on `2017-04-30`. Over the coming days we will also release snapshots of the Arabic (https://ar.wikipedia.org) and Kurdish (https://ku.wikipedia.org) versions of Wikipedia. There's an English snapshot coming too. The English version of Wikipedia is taking longer to load onto IPFS because it's much bigger than the others (20 times larger), with many more links. We will post updates when we add snapshots of each new language.

The unique identifier (cryptographic hash) for the snapshot of tr.wikipedia.org from April 30th is:
* Turkish Wikipedia (30 April 2017): [/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Anasayfa.html](https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Anasayfa.html)  

This link points to a specific snapshot. It will always point to that specific day's snapshot. To find the most up-to-date snapshot of Wikipedia on IPFS you can use this IPNS link, which will resolve to the latest snapshot whenever we release a new one:
* Turkish Wikipedia (most recent snapshot, resolved through IPNS): [/ipns/QmVH1VzGBydSfmNG7rmdDjAeBZ71UVeEahVbNpFQtwZK8W/wiki/Anasayfa.html](https://ipfs.io/ipns/QmVH1VzGBydSfmNG7rmdDjAeBZ71UVeEahVbNpFQtwZK8W/wiki/Anasayfa.html)

### Human-readable links

For your convenience we have set up a domain name and DNS entry at [tr.wikipedia-on-ipfs.org](http://tr.wikipedia-on-ipfs.org) that will resolve to the current IPFS snapshot.

If you are not able to access ipfs.io or wikipedia-on-ipfs.org, you can use this dnslink URL to access the content -- simply replace `ipfs.io` with the address of any IPFS gateway:

- Turkish Wikipedia: [https://ipfs.io/ipns/tr.wikipedia-on-ipfs.org](https://ipfs.io/ipns/tr.wikipedia-on-ipfs.org/wiki/Anasayfa.html)

Failing that, use the (less readable) IPFS or IPNS links from above.


## How to access Wikipedia on IPFS

IPFS makes it possible to access information through many different paths. If one path is closed, you have other options. Some of the options are very simple.  Others require a bit more effort. In most cases you can use [this link](https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Anasayfa.html) to view the Wikipedia snapshot through the ipfs-to-http gateway at ipfs.io. If that path doesn't work, for example if ipfs.io is blocked in your area, you can use the same basic information from that ipfs.io link and access Wikipedia through a different path.

We've written a number of tutorials describing the many different ways to access content through IPFS, including ways to access IPFS anonymously through Tor. You can read those tutorials in the current draft of [The Decentralized Web Primer](https://dweb-primer.ipfs.io/avenues-for-access/), which is available [online](https://dweb-primer.ipfs.io/avenues-for-access/) or as a [downloadable PDF](https://dweb-primer.ipfs.io/decentralized-web-primer.pdf), [epub](https://dweb-primer.ipfs.io/decentralized-web-primer.epub), or [mobi](https://dweb-primer.ipfs.io/decentralized-web-primer.mobi)

Your main options for accessing the snapshot of Wikipedia are: _(depending on your network, some of these won't work)_

* **Option**: Use the ipfs.io gateway to access the 30 April 2017 snapshot: https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Anasayfa.html
* **Option**: Use the ipfs.io gateway to access the latest version: https://ipfs.io/ipns/QmVH1VzGBydSfmNG7rmdDjAeBZ71UVeEahVbNpFQtwZK8W/wiki/Anasayfa.html
* **Option**: Connect with the IPFS network over Tor (this is experimental). Read [this tutorial on Tor gateways](https://dweb-primer.ipfs.io/avenues-for-access/lessons/tor-gateways.html).
* **Option**: Install an IPFS node on your computer and access Wikipedia through that node (requires [using the command line](http://lifehacker.com/5633909/who-needs-a-mouse-learn-to-use-the-command-line-for-almost-anything). _This is the most reliable method because it retrieves the content directly from the IPFS peer-to-peer network)_
    1. Install IPFS [following these instructions](https://dweb-primer.ipfs.io/install-ipfs/). Use the most recent verison of IPFS: 0.4.9-rc2 or higher if possible.
    2. Start your IPFS node by running `ipfs daemon` so it can connect to the network.
    3. Read the content through your IPFS node's local HTTP gateway by visiting:
       - 30 April 2017 snapshot: http://localhost:8080/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Anasayfa.html
       - latest snapshot: http://localhost:8080/ipns/QmVH1VzGBydSfmNG7rmdDjAeBZ71UVeEahVbNpFQtwZK8W/wiki/Anasayfa.html

**Coming soon:** We've almost finished creating a web browser extension that will allow you to access IPFS directly from your web browser without installing any additional external tools. Watch https://github.com/ipfs/in-web-browsers for the announcement when we release that browser extension.

## How to Mirror Wikipedia on an IPFS Node

If you want to help make this information available, you can install IPFS on your computer and _"pin"_ the Wikipedia snapshot(s) on that IPFS node. Here are instructions for doing that.

**Prerequisites**:
* Requires [using the command line](http://lifehacker.com/5633909/who-needs-a-mouse-learn-to-use-the-command-line-for-almost-anything)
* You need to have enough storage space to hold the snapshot(s) you want to serve.
    * Turkish snapshot requires 10 GB
    * Turkish, Arabic and Kurdish snapshots combined together will require 25 GB
    * English snapshot will require 250 GB
* _If possible, use a machine with a public IP address._ If you want to run an ipfs-to-http gateway that lets people access the IPFS content using their web browswer, you need to ensure that youre machine can be reached with a public IP address.

If you don't have enough storage space to hold full copies of the snapshot(s), you can still run an IPFS gateway so that people can rely on you to retrieve the content from the IPFS network on the fly.

**Steps**:
   1. Install IPFS [following these instructions](https://dweb-primer.ipfs.io/install-ipfs/). Use the most recent verison of IPFS -- 0.4.9-rc2 or higher if possible.
   2. Start your IPFS node by running `ipfs daemon` so it can connect to the network.
   3. Pin the snapshot(s) onto your machine
      - Pin Turkish Wikipedia: `ipfs pin add QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX`
   4. If your machine has a public IP addresses, tell people the address of your gateway. They can use that address to request IPFS content from their web browsers.

**Alternative: Using a Sneakernet to Mirror data**

I'm not kidding. If you'd like to access this content via [sneakernet](https://en.wikipedia.org/wiki/Sneakernet), IPFS is just fine with that. To find out how, follow the instructions in [this tutorial](https://dweb-primer.ipfs.io/avenues-for-access/lessons/sneakernets.html)

## How we made this Wikipedia snapshot

The steps we followed to create these first snapshots were:

1. Download the latest snapshot of Wikipedia (in ZIM format) from http://wiki.kiwix.org/wiki/Content_in_all_languages
2. Unpack the ZIM snapshot using https://github.com/dignifiedquire/zim/commit/a283151105ab4c1905d7f5cb56fb8eb2a854ad67
3. Add mirror info and search bar to the snapshot using the script [here](https://github.com/ipfs/distributed-wikipedia-mirror/blob/master/execute-changes.sh)
4. Add the snapshot to IPFS with the command `ipfs add -w -r --raw-leaves $upacked_wiki`

This work was primarily done by [@Kubuxu](https://github.com/kubuxu) [@dignifiedquire](https://github.com/dignifiedquire) and [@lgierth](https://github.com/lgierth) with help from [@whyrusleeping](https://github.com/whyrusleeping). They used code originally written by [@eminence](https://github.com/eminence)

## How to add new Wikipedia snapshots to IPFS

If you would like to repeat this process, adding an updated Wikipedia snapshot on IPFS, you can follow the instructions at https://github.com/ipfs/distributed-wikipedia-mirror. We will keep that page up to date as we improve the process.

## How we will publish the hashes of new snapshots

Whenever we add an updated snapshot of Wikipedia to IPFS, we will announce it in a few ways.

1. We will tweet the new snapshot hash on the [@ipfsbot](https://twitter.com/ipfsbot) account along with the hashtag [#WikipediaOnIPFS](https://twitter.com/search?f=tweets&q=WikipediaOnIPFS)
2. We will update this IPNS entry to point to the latest snapshot:
    - Turkish Wikipedia: [/ipns/QmVH1VzGBydSfmNG7rmdDjAeBZ71UVeEahVbNpFQtwZK8W/wiki/Anasayfa.html](https://ipfs.io/ipns/QmVH1VzGBydSfmNG7rmdDjAeBZ71UVeEahVbNpFQtwZK8W/wiki/Anasayfa.html)

The DNS entry at [tr.wikipedia-on-ipfs.org](https://tr.wikipedia-on-ipfs.org) is mapped to the IPNS value, so it will also give you the latest available snapshot (if DNS and IPNS are working properly in your area).

## Who controls the information

At the moment this is an experiment, done in haste in response to current events. Employees of Protocol Labs are building the Wikipedia snapshots on IPFS and pinning that content onto some of the IPFS nodes that they run.

If people start relying on this information over time, it will be important to establish a clear chain of custody, ideally with people at Wikimedia foundation building the snapshots and publishing the hashes. Protocol Labs is exploring possibilities in this direction.

## Review

* You can access a snapshot of Wikipedia through any IPFS gateway
  * Turkish Wikipedia (30 April 2017 snapshot): [/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Anasayfa.html](https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Anasayfa.html)
* These are read-only snapshots. Supporting full read-and-write would take further work.
* IPFS links use cryptographic hashes, so you don’t have to worry about spoofing
* The IPNS hashes point to the most recent snapshot
  * Turkish Wikipedia (most recent snapshot): [/ipns/QmVH1VzGBydSfmNG7rmdDjAeBZ71UVeEahVbNpFQtwZK8W/wiki/Anasayfa.html](https://ipfs.io/ipns/QmVH1VzGBydSfmNG7rmdDjAeBZ71UVeEahVbNpFQtwZK8W/wiki/Anasayfa.html)
* If people start relying on this information, we will encourage Wikimedia to take over generating these snapshots
* We are encouraging Wikimedia to publish their own IPNS hash that is always up to date AND is cryptographically signed by Wikimedia
* (if wikimedia updates DNS) if you have access to a gateway that’s outside of Turkey, you will be able to use the convenient path [/ipns/wikipedia.org](https://ipfs.io/ipns/wikipedia.org) instead of using hashes in your IPFS links
* If you want to mirror the data, run an ipfs node and pin the Wikipedia data onto your node
