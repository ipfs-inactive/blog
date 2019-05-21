---
date: 2019-05-21
url: 88-ipfs-weekly-43
tags: weekly
title: IPFS Weekly 43
author: Jenn Turner
---

## Welcome to the IPFS Weekly. 👋

The [InterPlanetary File System (IPFS)](https://ipfs.io/) is a new hypermedia distribution protocol, addressed by content and identity. IPFS enables the creation of completely distributed applications. It aims to make the web faster, safer, and more open. Since that’s a pretty large scope, we track development across the ecosystem in this weekly dispatch.

Looking to get involved? Click on some of the links below, see what we’re up to on [GitHub](https://github.com/ipfs), or join us on [IRC](https://riot.im/app/#/room/#ipfs:matrix.org).

Want this update in your inbox? [Subscribe to our weekly newsletter!](https://tinyletter.com/ipfsnewsletter)

Here are some of the highlights since the last IPFS Weekly.


## Meet the Community: Alan Shaw, IPFS Core

With the first-ever IPFS Camp right around the corner, we’re interviewing some of the community members who are making this highly anticipated event a reality.

### Tell us a bit about yourself and your background. How did you get involved with IPFS and end up joining the team at Protocol Labs?

Ok, quick recap of my whole life. Started building websites when I was 16 and basically continued that for nearly 20 years. It means I fondly remember things like tables, frames, IE6, Netscape Navigator, pixel perfect websites, a time before `border-radius` and `box-shadow`, Flash and ActionScript, CSS Zen Garden, Firebug, MooTools, jQuery and the like. Wow ok, I can’t finish that list there’s too much.

I’m basically a developer who started with frontend, moved to backend and now I just tickle whichever end needs to be tackled, including the IoT end. I have a LOT of experience with JavaScript. I’ve worked with a lot of different programming languages in my career but you just always have to do some JavaScript. JavaScript is the one constant in my life and I love it, but that could be Stockholm syndrome talking.

I’ve not had a real job for almost my whole life. I had a couple of years at a “new media agency” building expensive websites for businesses but I quickly became a freelancer (a.k.a. went and did a snowboard season in New Zealand) and after many freelance gigs spanning multiple years, I eventually founded a company with [Oli Evans](https://github.com/olizilla).

We focused on building really great MVPs for entrepreneurs in really short iterations. We basically took the developer practice of “sprints” and applied it directly to working with our clients. Each week we wrote a work plan for 5 days of work. The idea was to have something useable at the end of the week, so it worked really well at focusing the client’s hopes and dreams into just the things we could achieve. We got the client to sign off on the work plan each week and then when the week was done they got something to play with.

From there, the client could either go away and never speak to us again, or book in another week, with new ideas for how we could improve the product or new features they wanted to add. Often as the weeks progressed the thing we built differed drastically from the client’s original plan and was probably all the better for it.

The company had a big focus on community, training and mentoring. We organised a number of tech meetups in the London area and got to know the community. Notably, we organised the London [Meteor](https://www.meteor.com/) and [Nodebots](https://nodebots.io/) meetups. The whole company also regularly attended tech conferences and Oli was invited to give a talk at [LXJS in Lisbon in 2013](http://2013.lxjs.org/). We met some super rad people there but the most “rad-est” person was [David Dias](https://github.com/daviddias/) who went on to organise [LXJS 2014](http://2014.lxjs.org/) and he invited us back to run a [Nodebots workshop](https://youtu.be/L894YhZBz3k).

David Dias went on to work with [&yet](https://andyet.com/) but eventually got involved with IPFS (I believe through work on his university thesis). He started by building the JS implementation of IPFS and went on to become project lead. That’s a story for him to tell, but once he was in, David got us involved to work on a number of projects for IPFS. We started working on the peripheral but gradually ended up working on bigger, more core things. Personally, I love what [Protocol Labs](https://protocol.ai/) is doing and how ambitious it is—as an eternal optimist (often times to my detriment) this pleases me.

So we were more than happy to have Protocol as a client and eventually they ate us. I joke, there was a time where we had a lull in other client work and we were spending most of our time on Protocol work. David had (basically from day 1) been asking us to join up and on a chance visit to London he brought up the subject again and we reconsidered...

### Why should people be excited about IPFS?

IPFS is going to completely change the way people think about storage, addressing, networking and ownership of data. There are so many good ideas in IPFS it’s easy to deep dive into the technical details but, how about this:

Imagine a world where a copy of a file doesn’t actually consume any additional disk space. Maybe I should explain that a little—why would I have two of the same file? Well, it happens. Often I don’t have two of the _exact_ same file, but I have two files that have some bytes in common. When this happens, IPFS can share those bytes between those two files. Imagine how much disk space you’d save if this happened for _all_ of your files!

Imagine what BitTorrent or any one of the old p2p file sharing apps did for individual files but for all files on your computer or the internet.

Imagine two people in the same office downloading the same file and not having to move the same bytes across the Atlantic twice!

Imagine not having to worry so much about man-in-the-middle attacks because the content you received was _automatically verified_ to be the content you asked for.

Imagine a world where DoS attacks don’t really exist because there’s no central place to send the attack at.

Imagine a world where offline first _actually_ works by default.

Imagine building a website and not having to buy an SSL certificate just so your browser doesn’t flag it as “insecure” to your customers.

Imagine a world where CDNs don’t have to exist because the whole network is one giant CDN.

Imagine a world where you don’t have to share all your data with a big corporate entity where it would be mined and profiled and monetised. Imagine not being a product that companies sell to advertisers.

This is why people should be excited about IPFS...and I’m pretty sure I’ve missed a whole bunch of good reasons.

### What projects are really exciting you in the IPFS Ecosystem at the moment and why?

We’ve been collaborating with the people behind [Brave](https://brave.com/) browser for a long time now and I believe we’re on the verge of shipping an IPFS integration, installed by default with the browser. It’s a small step towards a future where _all browsers_ are p2p by default. That is _very_ exciting.

### Open Source communities are full of unsung heroes. Is there someone in IPFS community who you admire for their work?

I really admire the work [Irakli](https://github.com/gozala/) has been doing to get p2p into Firefox with [libdweb](https://github.com/mozilla/libdweb) and his service worker explorations with [lunet](https://github.com/Gozala/lunet). He’s been really active in the IPFS community for a long time and truly understands the importance of p2p technology in the browser. He also has sound opinions about API design.

### What are you most looking forward to at IPFS Camp?

Science Fair. I absolutely _love_ mad science and experimenting.



## IPFS in the wild
*Do you follow [IPFS on Twitter](https://twitter.com/IPFSbot)? For the latest mentions of IPFS in the news, check our Twitter feed or see the [latest articles on Awesome IPFS](https://awesome.ipfs.io/categories/articles/).* 

+ [Starlog: Aiming for the Stars](https://blog.florence.chat/starlog-aiming-for-the-stars-f4d1775f8528), 21 May 2019
+ [How to Start Contributing to Textile Photos](https://medium.com/textileio/how-to-start-contributing-to-textile-photos-b626c3f63493), Textile, 20 May 2019
+ [An Inter-Plantary Journey with LineageOS](https://discuss.ipfs.io/t/an-inter-plantary-journey-with-lineageos/5442), 19 May 2019
+ [VIDEO: IPFS Tutorial - Upload Files With IPFS & JavaScript](https://www.youtube.com/watch?v=I0UolzV3ico&feature=share), CodingSrc, 17 May 2019
+ [OrbitDB: Serverless, Distributed, Peer-to-Peer Database](https://kauri.io/article/6ae5ffa612044a09be856ff390ce6990), Kauri, 16 May 2019
+ [Introducing a Tour of Textile](https://medium.com/textileio/introducing-a-tour-of-textile-92f02969a4d8), The fastest way to build your next decentralized app using IPFS, Textile, 15 May 2019
+ [Microsoft wants to protect your identity with Bitcoin](https://www.wired.com/story/microsoft-wants-protect-identity-bitcoin/), Wired, 14 May 2019
+ [Why Microsoft is building a Bitcoin-based ID verification system](https://www.computerworld.com/article/3394686/why-microsoft-is-building-a-bitcoin-based-id-verification-system.html), Computerworld, 14 May 2019


## Tools and projects we <3
*[Awesome IPFS](https://awesome.ipfs.io/) is a community maintained and updated list of projects, tools, or pretty much any things related to IPFS that are totally awesome. To see more, or add yours to the list, visit [Awesome IPFS on GitHub](https://github.com/ipfs/awesome-ipfs).* 

+ [SourceCred](https://medium.com/sourcecred/introduction-to-sourcecred-7665297af715) is an open-source technology for organizing communities.
+ [Peermaps](https://peermaps.org/) is a distributed, offline-friendly alternative to commercial map providers such as google maps. Instead of fetching data from a centralized tile service, your computer fetches map data from other peers across the network.
+ [Peepeth](https://peepeth.com/welcome) is a blockchain-based microblogging platform similar to Twitter, but focused on meaningful content and powered with Ethereum and IPFS.

 
## Coming up in the Community
*Did you know IPFS has a community forum at [discuss.ipfs.io](https://discuss.ipfs.io/)? Sign up to participate in discussions about coding, tutorials, see announcements and learn about upcoming community events.*

+ **23 May 2019:** [May p2p // dweb meetup](https://www.meetup.com/p2p-and-dweb-toronto/events/258520223/), hosted by Peer-to-peer and Decentralized Web Toronto and held at Mozilla.
+ **27 May 2019:** [Papers We Love – Berlin](https://www.meetup.com/Papers-We-Love-Berlin/events/261542382/), We’ll be learning about the paper “Merkle-CRDTs” presented by one of its authors, Héctor Sanjuán!
+ **29 May 2019:** [ProtoSchool Taipei](https://www.meetup.com/IPFS-Taiwan/events/261636809/) is launching, so join their first event at the AppWorks Taipei office! 
+ **22 June 2019:** [Commit Porto '19](https://commitporto.com/) is a tech conference that brings together professionals who tackle challenges in software development with the latest technologies, Porto, Portugal.
+ **27-30 June 2019:** [IPFS Camp](https://camp.ipfs.io/) is a 3 day hacker retreat designed for the builders of the Distributed Web! Barcelona, Spain.
+ **18-21 July 2019:** [DWeb Camp](https://dwebcamp.org/) is a chance for dreamers and builders to come together in one of the most beautiful spots on earth for a 4-day retreat to reimagine and build the web we want and deserve, location south of San Francisco, California.
+ **2-5 August 2019:** [Offline Camp](http://offlinefirst.org/camp/) is a 4-day retreat to explore Offline First development and design in Grants Pass, Oregon. [Learn more about the event here.](https://medium.com/offline-camp/announcing-offline-camp-v5-eb9111fdcc94)


## Thanks for reading ☺️

That’s it for this week’s news on all things IPFS. If we missed something, [reply to this email](mailto:newsletter@ipfs.io) and let us know! That way we can feature you in next week’s edition. 
