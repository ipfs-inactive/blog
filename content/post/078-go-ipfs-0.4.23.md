---
date: 2020-01-27
url: 2020-01-27-go-ipfs-0-4-23
title: go-ipfs 0.4.23 released
author: Alan Shaw
---

> Would sir/madam care for another patch release while they wait?

Yes that's right, the next feature release of go-ipfs (0.5.0) is, well, running a tiny bit behind schedule. In the mean time though we have patches, and I'm not talking pirate eye patches, I'm talking bug fixes. We're hunting these bugs like they're Pokemon, and jeez, do we come across some rare and difficult to fix ones? - you betcha.

Alright, enough funny business, what's the deal? Ok so, I don't want to _alarm_ anyone but this release has some **critical fixes** and if you're using go-ipfs or know someone who is then you and your friends need to slide into your upgrade pants and give those IPFS nodes a good wipe down ASAP.

## 🔦 Highlights

### 🤝 Fixed Spontaneous TLS Disconnects

If this isn't reason enough to upgrade I don't know what is. Turns out, a TLS handshake _may_ have accidentially been unintentionally aborted for no good reason 😱. I shouldn't need to tell you this but \*whispers\* that's really bad for connectivity! Excellent news though, it's fixed, and if you want to stay well connected in the glorious future of p2p communications then you should definitely upgrade.

### 😱 Fixed Panics and Crashes

Panicing won't help, in life, and also in golang. Stay calm and breathe slowly. We patched a number of panics and crashes that were uncovered, including a panic seen commonly in the websocket transport. High ten 🙌?

### 🔁 Fixed Resursive Resolving of dnsaddr Multiaddrs

Imagine this: rolling out a brand spanking new set of bootstrap nodes only to discover their new addresses are not resolvable. I know right - bad news bears 🐻!?

Ok, "bear" this in mind: you want to keep all your DNS TXT records [below 512 bytes to avoid UDP fragmentation](https://serverfault.com/questions/840241/do-dns-queries-always-travel-over-udp), otherwise you'll get a truncated reply and have to connect with TCP to get all the records. If you have lots of dnsaddr TXT records then it can be more efficient to use recursive resolving than to get a truncated reply and go through the famous 18-way SYN, SYN-ACK ACK, ACK-SYN, ACK-ACK (...etc, etc) TCP handshake, not to mention the fact that go-ipfs will not even try to fallback to TCP 😅.

Anyway, long story short. We fixed that. You're welcome.

### 📻 Retuned Connection Manager

The Connection Manager has been tuned to better prioritise existing connections by not counting new connections in the "grace" period towards connection limits. New connections are like new friends. You can't hang out with everyone all the time, I mean, it just gets difficult to book a resturant after a while.

You also wouldn't stop being friends with Jane just because you met Sarah _once_ on the train. You and Jane have history, think of everything you've been through. Remember that time when Jane's dog, Dave, ran away? I know, it's a weird name for a dog, I mean who gives a human name to a dog anyway, but I guess that's one of the reasons you like Jane. Anyway, she lost her dog and you both looked all around town for it, you were about to give up but then you heared faint wimpering as you were walking back to the house. Dave had somehow managed to fall into the old abandoned well!

You see?! History! ...and, erh, what was I saying? Oh yeah, Connection Manager - new connections don't cause us to close useful, existing connections (like Jane), but it does mean you'll keep more connections in total. Maybe consider reducing the `HighWater` setting in your config.

### 🍖 Reduced Relay Related DHT Spam

When `AutoRelay` was enabled, your IPFS node basically spent all it's time searching the DHT for relays, like a fly to a honey trap. I say that because every other IPFS node was doing the same and if you had `AutoRelay` and `RelayHop` enabled then, erm, DoS happens. Bad times.

So, instead of spamming the DHT the whole time trying to find random, potentially poor relays, IPFS is now using a pre-defined set of autorelays. I mean, try to tell me that _doesn't_ make sense.

### 🐾 Better Bitswap

Joe has the rare shiny collectable card but your shoes have holes in them and he's standing in the rain on the other side of the playground 💦🕺🏻. This is exactly what bitswap is like when you have a bug that stops you from connecting to providers. Ok, I mean, there's a few differences, but it's basically the same.

We're also now marking frequently used peers as "important" in the connection manager so those connections do not get dropped. This is like, erm, you and Joe being besties. Joe has all the good cards and is surprisingly willing to part with them. Ok, I'll admit, card trading is probably not a great analogy to bitswap 😛

### 🦄 And More!

* Fixed build on go 1.13
* New version of the WebUI to fix some issues with the peers map

## ❤️ Contributors

| Contributor | Commits | Lines ± | Files Changed |
|-------------|---------|---------|---------------|
| Steven Allen | 52 | +1866/-578 | 102 |
| vyzo | 12 | +167/-90 | 22 |
| whyrusleeping | 5 | +136/-52 | 7 |
| Roman Proskuryakov | 7 | +94/-7 | 10 |
| Jakub Sztandera | 3 | +58/-13 | 7 |
| hucg | 2 | +31/-11 | 2 |
| Raúl Kripalani | 2 | +7/-33 | 6 |
| Marten Seemann | 3 | +27/-10 | 5 |
| Marcin Rataj | 2 | +26/-0 | 5 |
| b5 | 1 | +2/-22 | 1 |
| Hector Sanjuan | 1 | +11/-0 | 1 |
| Yusef Napora | 1 | +4/-0 | 1 |

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [go-ipfs repo](https://github.com/ipfs/go-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at [discuss.ipfs.io](https://discuss.ipfs.io/) and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

## ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode, which is also [accessible through our Matrix bridge](https://riot.im/app/#/room/#freenode_#ipfs:matrix.org).