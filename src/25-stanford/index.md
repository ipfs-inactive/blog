---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: 25-stanford

breadcrumbs:
  - {name: "25-stanford", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2015-05-05

# this is the Title
title: "IPFS and The Distributed, Permanent Web"

# this is the name of the main author(s)
author: Juan Benet

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

[A few months ago](https://ipfs.io/ipfs/QmNjKnH6y7x9sR4F3V2bEBhBJCwhmkNPmZcibkUto2etnb/0-hello-worlds) we made this blog. We hoped to kick it off with a series of posts explaining the IPFS protocol, illustrating a bold vision for the future, and charting our intrepid course. The grand goals, the Big Things. But I put writing off in favor of [developing IPFS](https://github.com/ipfs/ipfs), and [building our community](https://github.com/ipfs). These last few months have been deeply fortunate: we've passed ambitious milestones and finally attained software that is _usable_, _useful_, and _transformative_. More importantly, we've gathered dozens of brilliant engineers, developers, scientists, and designers to our team. We are now a full-on [fellowship on a quest](https://ipfs.io/ipfs/QmeEFim2fhstYAx5vnXBwBD441G3zzrXcMAU51zetRXnHc/fellowship-of-ipfs.png), to fix major problems in the web and improve computing.

But this blog cannot wait any longer! We have news, and many interesting things piling up! To make up, this one post will get enough of the "Big Things" out of the way. And to do it quickly, I transcribe here a talk I recently gave at Stanford University. I was invited to speak at the [EE Computer Systems Colloquium](http://web.stanford.edu/class/ee380/Abstracts/151021.html), a very special and much undeserved honor, as I "grew up" [watching](http://web.stanford.edu/class/ee380/Abstracts/100526.html) [my](http://web.stanford.edu/class/ee380/Abstracts/150408.html) [computing](http://web.stanford.edu/class/ee380/Abstracts/080109.html) [heroes](http://web.stanford.edu/class/ee380/Abstracts/101110.html) [lecture](http://www.stanford.edu/class/ee380/Abstracts/110126.html) [me](http://web.stanford.edu/class/ee380/Abstracts/120307.html) [on](http://web.stanford.edu/class/ee380/Abstracts/120208.html) [that](http://web.stanford.edu/class/ee380/Abstracts/121114.html) [very](http://web.stanford.edu/class/ee380/Abstracts/130515.html) [stage](http://www.stanford.edu/class/ee380/Abstracts/100120.html). Here it is in both video and writing.

[![](http://img.youtube.com/vi/HUVmypx9HGI/0.jpg)](http://www.youtube.com/watch?v=HUVmypx9HGI)

Thank you for having me here. I'd like to talk about the future of the web; it is really important to get this right. We've come to depend on the web more than almost any other technology, at least when it comes to international communications and infrastructure, and it is in danger. At least, we're encountering some problems that we should fix.

In this talk, (a) I will be giving a pretty comprehensive overview of the problems that IPFS tries to solve. (b) Then I will discuss the protocol in detail, and IPFS in general. (c) Then, I'll talk about The Project from a meta perspective: how you go about building open source protocols to try and patch the living system that is the internet.

At the end I'll go through a set of principles, of lessons learned as you go about building these systems, a discussion around how protocol development should perhaps happen. For example, what are some critical principles to ensure protocols get adopted? Switching costs is one of them. There's a bunch of others that we've had to struggle with, and had to think through carefully so what we make is actually used, instead of joining the pile of cool, amazing technology that goes absolutely nowhere. I will then open for questions and can dive into whatever people want to talk about.

![Distributed, Permanent Web](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.003.jpg)

### The InterPlanetary File System

Alright, so IPFS! This talk is called: _**"The Distributed, Permanent Web. Or how I learned to stop worrying and love the Merkle Web."**_ Because, when you think about Merkle links -- and I'll describe how those work -- they kind of solve almost everything. Not exactly, but it's a really important property that I just wish had been put into the web from the beginning. And funnily enough, I think the timing was such that they could have been put into the web from the beginning, they just weren't. And if that had happened, the world today would be very different.

We like calling IPFS _"The Distributed Web"_, or _"The Permanent Web"_, or _"The Merkle Web"_, in honor of [Ralph Merkle](http://www.merkle.com/), who came up with Merkle Links. And it is really a protocol to upgrade how the web works.

And the goal is to make something that doesn't change the interface. Meaning, if you do anything that will cause people to **_have to change_** how they think about their application system, it's unlikely to ever be deployed, as people won't easily switch to it. So we're matching the interface people already expect. There will be things you can do with more advanced features, but the goal is to get web developers and web application creators to just be able to layer whatever it is they are building today on top of IPFS. And if nobody knows that there's been a switch, then we've won. Because the internet should be upgraded that way: where the end user should never have to think about programs changing or installing anything else, it should just _"get better"_.

![Protocol to Upgrade the Web](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.005.jpg)

IPFS stands for **The InterPlanetary File System**, and this is a specific choice as an homage to J.C.R. Licklider who -- [when he had the ideas](https://ipfs.io/ipfs/QmNjKnH6y7x9sR4F3V2bEBhBJCwhmkNPmZcibkUto2etnb/ipfs-at-stanford-ee380/refs/intergalactic-network-memo) for what eventually turned into [the ARPANET](https://en.wikipedia.org/wiki/ARPANET) -- called it The [Intergalactic Network](https://en.wikipedia.org/wiki/Intergalactic_Computer_Network). And that just sets the ambition of the original internet project: we're talking about a network that should operate at an intergalactic scale. And that was the idea, let's take all of these networks which are use-case specific and bind them together with this overlay network, an intergalactic network, and everything is going to be able to talk to everything else.

And that's pretty much been true. Today all the devices are connecting through the internet and are able to talk to each other from very simple design principles. Now what does it mean to think about file distribution in that kind of scale; one of the first things that "Inter-Planetary" brings up is we're now moving data across planets. There you run into serious issues when you think about latency, and it turns out that is the same kind of problem that emerges when you think about moving data from the datacenter to users, say, in developing countries, or really slow networks. You end up with different constant factors, of course, but the problem is the same: when in the datacenter you're dealing with things at the microsecond or millisecond scale, when you move out to the edges of the network you're dealing with seconds or minutes. And that kind of difference is the same as communicating over short distances here on Earth, to communicating over distances to something like Mars.

So the claim is we should be building the internet, and the file distribution system of the internet -- i.e. the web -- in such a way that it should work when we consider cases like interplanetary travel. The name IPFS tries to encapsulate all of this: it is an homage to Licklider, and it puts it in peoples' minds that we really mean business when we say "this thing should work across these massively long distances."

### Centralized, Decentralized, Distributed

This is Paul Baran's first categorization of networks, and I like using this image because it shows how the differences in the _structure_ of a network can have vast implications in the uses of the protocols.

![Centralized, Decentralized, Distributed](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.006.jpg)

 * When we think about centralized architectures it's pretty easy to change, you just go and change one thing, and you can upgrade things very quickly. But it centralizes power in one location, and so in the end users may not be able to have the same kind of capabilities.
 * When we talk about decentralized networks we've now sharded the responsabilities of the center node and we could potential have a network that is more resilient, that perhaps could deal with some failures. But still, you don't have the same level of resiliency that you could get if everything spoke the same protocol.
 * And so, in the distributed case when, everything is peer-to-peer when everything can talk to everything else, when every single node is running the exact same code -- or at least is able to speak the same protocol -- now you're talking about an extremely resilient fabric that you can cut in any any kind of shape, and the thing should still work.

For the most part, the web started in the **distributed** world. The original idea was that you would have your own HTTP **server** and your own HTTP **client** and you would both serve files and browse the web. But today that's not really the case, it's centralized completely: you have browsers that talk to servers, and you maybe create content that way, but all your interactions -- or most interactions -- are mediated through this central point. And this is distributed, or federated, across different organizations; but for the most part, when dealing with one website, you're completely centralized. That's an issue.

So why does this matter? Why should we try to make the web more distributed?

### The INTERgalactic NETwork

![The INTERgalactic NETwork](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.007.jpg)

At the end of the day, the _internet_ is a kind of nervous system that we have. Humanity invented this technology and now we've become so dependent on it -- we use it for everything -- to the point where it really is the nervous system we're evolving together. The amazing thing is that it's just a collection of protocols -- it's a whole bunch of really good ideas, implemented and deployed, that made the whole thing work. It is a remarkable feat of engineering and design, from the get go, to construct an architecture that would scale to the use today. I love the fact that we're still running IPv4 -- we should of course switch to IPv6 -- but I love that IPv4 has gotten us here and is still in use today. You can't say the same thing about most other protocols.

!["Thin waist"](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.009.jpg)

The great idea was to create a "thin waist" to allow the lower and upper layers of the network to evolve separately, and only have a very small protocol in between that would mediate how the whole network would grow. But the cool thing about the internet is you can change it, you can make it better by coming up with good ideas. You take these ideas, if they're good enough, you write specs, you turn those specs into code, you deploy it into computers, and you _enhance humans_. (!!!)

This is very real. Think about your daily life; think about how much you use applications that augment your abilities through software that's connected to other software elsewhere. And think about how many of those applications were built by people that didn't have the capabilities to build this massive infrastructure. They just wrote some code, and now you have it, and now you have a super power. This is a remarkable kind of technology. It didn't necessarily have to be this way, it could have been mediated by powers-that-be. But for whatever reason, or rather by clever design and engineering, today we have this internet that is upgradeable in a fantastic way. And any kind of person -- the quintessential college kids in their dorm room -- can come up with a great idea, deploy it to the network, and suddenly build something massive and create tons of value for the world.

![](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.011.jpg)

And the cycle kind of looks like this: you have some research, you then develop it into code, you deploy it, and then people use it. This sequence has some problems. There is a ton of research that happens. When you think about what academia knows, we're basically 15-20 years ahead of what's deployed and in use today. And that to me is pretty sad, because it suggests a lazy deployment and lazy deployment process, in that we know what's right to build, just nobody has done it. In a big way, IPFS is an integration of old ideas. It takes good ideas -- known for a long time -- and upgrades the current internet by developing them; making sure the interfaces make sense; deploying them to the whole network; and making them easy to use for developers, programmers, and end users.

### Why does the Web Matter?

![Why does the web matter?](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.012.jpg)

What is _the Web_ really? How is it different from the internet? The Web is this Application Platform that allows you to write these pieces of software and put them on this interconnected nervous system, and it's what actually gives you the capabilities. It's these applications that grant you super powers. It's not necessarily the communication. Sure, you could potentially write some bits, but the end user is not going to sit and write a protocol to try to communicate with somebody else. The end user is going to use some application deployed on something like the web.

Just think about in your day-to-day life how much of what you do accross all verticals of your life -- from learning, working with your colleagues, to communicating with your loved ones, to maintaining your personal relationships -- how much of that is done through internet protocols in general, and specifically The Web. **The point is that the properties of the Web have vast implications in your capabilities as a human being.** Which means that if there are problems with the web, we better fix them.

### There are problems with the web.

As discussed earlier, the web is centralized now, and that is a source of problems. It all boils down to some design decisions, which mostly have to do with location addressing. And this made a lot of sense at the time. Location Addressing is just the the idea of saying that resources are addressed by the IP Address of the computer that contains (or hosts) the resource. This was great at the time; it made a lot of sense then. It made the web actually work -- _finally_. There had been many [hypertext](https://en.wikipedia.org/wiki/Hypertext) systems in the past, decades before. And it was this idea that made it scale very quickly. It was a great idea at the time.

But _Location Addressing_ has a problem. In a network where the same file may exist in many places, only a _specific host_ -- or virtual host, it could be multiple computers pretending to be one -- only _one_ specific host could serve you the file. Because it is the _authority_ of the content. If you tried to get it from somewhere else, you couldn't know that it is the same thing. You would have to go to _that specific host_ to retrieve the data.

To illustrate this, imagine we're in a room with lots of people and I were to share a picture to Facebook -- a Web Application -- and I sent you the link. Now _all 30 of you_ would have to go and talk to Facebook to pull down the image, which is slow and huge waste of bandwidth. Perhaps the web could be structured in a different way to make use of the fact that perhaps the image is sitting right here, in this computer, and you could get it directly.

![](https://ipfs.io/ipfs/QmNjKnH6y7x9sR4F3V2bEBhBJCwhmkNPmZcibkUto2etnb/ipfs-at-stanford-ee380/img/fb-download.gif)

### Bandwidth

Images are not that big of a deal. We have a lot of bandwidth these days but think about video. 

If there's a 200MB video, which is actually pretty common these days, we could be wasting 48GB just by sharing one video across these links. We took a number of views from Gangnam Style which is I think is the most viewed video. It has been viewed over two billion times. When you count just the data coming out of Google Servers let alone all the links, we're dealing with almost _500 PB of data._ That's a lot for a video!

![](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.034.jpg)

This is clearly an issue. There is no reason we should be moving around all of these data _constantly_ through the network. How many of those people actually saw the same video multiple times? ...in the same day? ...through different tabs that might have caused the content to move again?

HTTP caching is not perfect. It was invented as a way to deal with this problem but in reality, it does not work most of the time. The security model precludes caching most of the time. You can't use network in between caching because if you want privacy and security in the internet, you have to armor the wire, which means you're back to the same problem again where you have to move the data all the way.  

Another issue with bandwidth is it's not increasing very fast. This is a graph showing the average connection speed of the G7 countries. This is from 2007 to 2012. The average connection speed hasn't increased as much as other things like processing power or storage. 

![Average connection speed of the G7 countries (2007-2012)](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.036.jpg)

In fact, when you graph the prices decreasing over time, bandwidth is decreasing in price slower than storage. What this means is that in a sense, we get this impression that the storage capacity is outpacing the speed at which we can move around data in the network, thus implying that the network is getting slower.

![Capacity outpaces speed](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.038.jpg)

Bandwidth could be getting better, our speeds could be getting better, but because (a) our disks are increasing in size faster and (b) we're using media that's ever larger, we get the feeling that the network is actually getting slower. 

This gets worse when you think about developing countries and the number of people that are coming online all the time. Your network is now at the edge of the internet that have really high latencies and small bandwidth. And then, you have websites that try to give them dozens of megabytes just to load a webpage -- they are completely locked out of the internet. These amazing capabilities that we were discussing about before, all the software that you can deploy suddenly can't reach the end user in the network. That's a big issue when you think about the people out there that need the internet most, the people that we discuss and say, "Let's go and create all these great software to deploy it and equalize the disparity of wealth across the world," and ends up being locked out by issues like **latency** and **bandwidth** -- that should not prevent people from accessing the network.

Recently, there's this huge refugee crisis in Europe right now. There are all these camps being set up. There are reports that people have food, clothes, and so on; but what they don't have is bandwidth. They can't actually talk to their loved ones. They can't find each other because they don't have the capability to be able to communicate with each other. This is an insane situation -- something so simple is blocking people.

### Latency

![Amazon data centers and the Google data centers](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.041.jpg)

**Latency** is the bane of computer networks -- you can't go faster than the speed of light problems. The solution is try and spread the content everywhere. Here is the Amazon datacenters and the Google datacenters spread all over the world to try and get you content faster. But, that's only those companies. 

What about everybody else? Everybody else in the network should be able to have capabilities like this but the designed structure of the internet precludes it. I'm sure you could hire them to serve it but it is possible that you may end up not being able to use these systems.

### Disconnected / Offline Operations

There's another set of use cases that the web has mostly ignored so far -- what happens when you deal with _disconnected_ or _offline operation_? 

For example, if I send you a Google doc and we all start collaborating on the same thing and sharing all the data, it's silly that we have to move the updates through the backbone to some server out there and shipping them back here when we now have sophisticated algorithms that can do smart conflict-free resolutions that allows us to collaborate in real time and yet, we're still moving all the updates to the backbone. It gets worse when you think about the network falling apart. 

![Google doc sharing](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.049.jpg)

If our uplink were to go offline, we lose the capability of working together completely. We should be able to continue working because we're in the same room. We are in the same portion of the network. We should continue having this capability and yet, we don't.

There is actually a lot of important infrastructure tools and applications that are out there that basically fall apart in this kind of scenario. You have to work really hard to make sure that you as a user are protected against this problem. There are caches at [Wikipedia](www.wikipedia.org) that you could download, but for the most part, most links will fall apart.

This is something that the web **_can_** and **_should_** fix. I actually think it's completely unacceptable. I want to live in a world where the applications that I use will continue working whether or not I am in the best place in the network. 

I recently took a trip to Europe and I was surprised to find that in the trains between the cities, the latency got so bad on mobile that I just got locked out of many websites. The latency was so high that the roundtrip times (21:59?) was just time out. And so, I could not do anything or turn off IPFS.

I see it as this -- you have this mother ship that is controlling everything. You lose access to the mother ship and everything falls apart. As engineers and as designers of applications and as builders, we need to get out of this huge problem.

### Human Problems

![Bandwidth problems](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.052.jpg)

The thing is, you don't even have to think about full disconnection. Sometimes low bandwidth blocks you out, interference between wireless networks, congestion of use, travel outages, a datacenter on fire -- things do happen and the web should be able to have an infrastructure that makes it easy for the average web developer to build applications in a way that will be resilient. Today, only the major corporations are able to build resiliency against this.

![Infrastructure problems](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.053.jpg)

There's also other kinds of problems like human problems -- surprise oppression. Egypt woke up one morning to the fact that the government had shut off access to the internet. How could they organize now when they had no way of contacting each other? All of their communication infrastructure was gone. Then, there's also censorship and so on. 

![Human problems](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.055.jpg)

This really matters. When you think about the messaging tools, there is really no reason that these shouldn't work in disconnected networks. We already know from a technical standpoint, everything we need to do to make these really critical applications work in the disconnected or offline case.

### Natural Disasters

![Natural disasters](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.056.jpg)

This is also a big deal.

### Ubiquitous Computing

![Ubiquitous computing](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.058.jpg)

If you don't care about the eventualities, maybe I can convince you through pointing out that the web is getting kicked out of ubiquitous computing. All of these devices that we're now using -- tablets, phones, watches, and soon enough, earrings, bracelets and so on -- that are all connected to the internet, none of them basically, except the regular laptops and desktops, really use the web. Most applications that we see in mobile are now shifting entirely to using the web only as a sync system and running entire application platforms that are locked down and closed. This is taking that amazingly malleable system where somebody could build some code and continue to update it very easily into a lockdown platform that only a few people decide whether or not something will be installed.

This is a huge step back from where we were. The web gave us this amazingly beautiful platform where you just ship some HTML and some Java script and CSS. Now, you have a wonderful new capability that you've granted to the whole world and it's getting shut out. This is because the mobile browsers are slow. How would you do a web browser on the watch?

But, there is a deeper problem here -- **the web model does not work in the disconnected case.** How do you deal with a website that you can no longer talk to? 

This suggests that **the real problem is what we're layering the web on.** We shouldn't be doing the web over this simple file distribution system that works over TCP and you have to work really hard to put over anything else. We should be putting the web over a distribution system that can deal with the distributed case, that is offline first.

![Apps  dominating mobile web stats](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.059.jpg) 

This is the stats showing the usage of mobile apps versus the web. This is a real thing.

### Data Control

![App Data](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.063.jpg)

We have all of these huge applications that are gathering all of these data. It's out there. Theoretically, it's our data but in reality, _they control it._ You can't link the data to each other. You _only link to accessing the data through their application._

If you'd make a post on Facebook that is some important piece of information that you're declaring to the world or Twitter or whatever, the link that you can give out to people is specifically a link that accesses that data through their website. If they choose to censor it or if they go away or you close your account, suddenly, all of that data is gone. You can't link to it. 

This breaks the whole idea of the web. The whole point was to be able to build small pieces of information that you can interlink to each other, not to rely on gatekeepers all the way and applications that design how we access things.

### Security

**Security** is another problem -- _how do you deal with the fact that most of the traffic is in the clear?_ We now have GLS and others but still, people break into all these systems all the time and steal data. Also, there's this tragic situation where most web developers don't understand security and the tools are not there to help them design secure systems, so people make all sorts of mistakes all over the place and our data gets leaked or stolen. This can be a really big problem when you think about all of the important pieces of information that you are storing in the web yourself -- as an individual, an organization, a corporation, a government -- and how easily it could be stolen and corrupted, changed under your feed. You might discover someday that all of your communication are slightly different, somebody could actually sneak in to your email servers and do this.

![Snowden leak](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.071.jpg)

This is a fundamental problem. This is an image from the Snowden leaks that shows how the model of the web is such that we armor the wire. This is a really good description from Ben Jacobson who is working on a project similar to IPFS. He talks about how in the web today we're armoring the _wire only_ and not really armoring the data. This means that we are obssessed constantly with protecting the communication between the browser and the server but anybody can sneak into either your browser or the server and change everything or steal it. In reality, we should be _protecting and armoring the data itself._ We need **authenticated and encrypted data at rest.**

![Authenticated and encrypted data at rest](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.075.jpg)

### Permanence

![Destroying knowledge](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.078.jpg)

This one is a big one. Throughout history, we've seen the societies that burn books as the worst. We've seen the whole idea of destroying knowledge which is what makes us human. The whole idea of destroying knowledge is just abhorrent to what we think of civilization. 

![Broken links](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.081.jpg)

Yet, on the web today, we burn books all the time. It just does not happen _en masse._ We break links all over the place. Somebody could just be redesigning a website, break some link and the whole thing is gone. Every application that depended on that link is broken. Though, you could be searching for the content again, all of the software that you built is not doing those searches so they are now broken. 

![Idealized web docs](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.084.jpg)

This is the idealized web of documents which is really a web of documents on computers specifically on specific hosts on the network. If you go and take those out, all the links break.

![Internet Archive](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.087.jpg)

Thankfully, the [Internet Archive](https://archive.org/index.php) has been trying to deal with this problem by ingesting as much of the web they can possibly get and backing it up. This is a really critical component but this suggests that perhaps, we should be rethinking how the web is structured so that this kind of work is easier and that the web itself does not disappear on its own or accidentally. 

### Digital Vellum

[Vint Cerf](https://en.wikipedia.org/wiki/Vint_Cerf) has also been talking about this. In two weeks, he's going to be talking about a whole bunch of the same kinds of problems so you'll get to see this from different perspectives. If you don't know about the archive and Vint Cerf's work, please look it up. It's hugely vital and important to how the network is today.

Funny story, one of the systems that we use as inspiration for IPFS, the source script for it was found through the way back machine. I couldn't find it anywhere else. This is important stuff.

![Vint Cerf](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.088.jpg)

Vint Cerf also describes this as a problem of **digital vellum** -- _what happens when we lose the ability to understand the data that we store?_ We lose some program that knows how to read some format and now, we have a whole bunch of data that is a lot of work to decipher.

We should be thinking about constructing applications in a way that we could resuscitate the whole thing. We should be able to emulate every single machine that we ever built by virtualizing the whole thing and being able to make sure that we back up all of the stuff in multiple different places in the world to prevent against some catastrophic scenario.

![Web problems](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.089.jpg)

Those are the problems. It's a lot but it's core to what this project is about and it's important to set it as a jumping off point for trying to discuss why it is critical to just upgrade the infrastructure of the network, specifically the web, and why it is warranted to do this whole work which is to (a) design a new protocol, (b) think about developing and (c) deploying it to upgrade the web. This is not easy. Why are we spending time on this? It's because of these important problems.

We are trying to:   
 
 * make the web distributed 
 * work offline
 * be permanent 
 * be safer 
 * move around the content smarter
 * (most importantly), make it faster.  
 _If you don't make the thing faster, no one is going to use it._

![Solution](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.091.jpg)  

Technology gets adopted because you make some performance improvement. That is why you make some important change to the bottomline of major corporations when they say "Great, this is faster. Let's use it." If we don't focus on that and make it really good, this whole change is not going to happen.

Finally, this whole thing started because I wanted to make things faster, so it's important to start there.

# What is IPFS?

![hypermedia transport protocol](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.092.jpg)

Just like HTTP, IPFS is what we call the **hypermedia transport protocol.** It's just an algorithm and a program that moves around data with links. The cool thing about it is that it's the synthesis of a whole bunch of good ideas that have come out since the web emerged. This is just a small selection. There is a lot of other good ideas that we've picked up along the way but these are perhaps the most important ones. These translate directly to a stack of protocols that we use. 

![IPFS synthesis](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.094.jpg)

IPFS is a stack of protocols to try and re-base the entire web and the application stack as it is today and move it into a smarter transport protocol. We need some way to:  
 * do naming  
 * represent data that is offline and distributed first  
 * move the data efficiently and smartly  
 * find the data
 
![Core of IPFS stack](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.095.jpg)

The core and central point of IPFS is the _merkle-dag_ like a merkle tree. It's the central point of this whole work. It is a data structure that changes the web from completely always mutable links to making a distinction between mutable and immutable links. If you are able to understand when a link is **immutable**, meaning that the _content you're pointing to has not and will never change_, then you have a much better possibility to be able to route the content quickly, make caches work and so on.

That actual realization was made many times over in many different kinds of systems that adopted Merkle linking along the way. 

On top of that, we layer naming that's based on David Mazieres' work, and underneath that, we learn a lot from all the peer-to-peer protocols out there to try and build a very sophisticated way to move the content as effectively as possible but that's able to take in policies from the user in terms of what capabilities a user wants -- sometimes, you want things to go fast and sometimes, you want privacy. Fundamentally, these two are at odds with each other because the way you get privacy in internet protocols is by doing a whole bunch of wasted work -- oblivious writing of protocols, oblivious RAM. They all work through doing a whole bunch of expensive computations and expensive moving around of data.

You need to be able to dial the transport to be able to understand how you want to move things. This is similar to the work of the Tor project which is to insert Tor underneath HTTP to move around the web that it is today through a privacy preserving protocol. It turns out that IPFS layers very cleanly over Tor so you can use it over Tor directly. In that case, it has to be done carefully to make sure that you don't leak important information like the addresses.

### The Network Stack

![network stack](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.096.jpg)

In the network stack, on top of IP and the transports, we have to deal with finding and routing contents so we can use the HTs and a whole bunch of other protocols, we have to exchange the content but the central piece is the merkle-dag. We have to change how we think about data and we have to think through making it possible to do immutable linking. On that, we can layer naming and so on.

![](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.098.jpg)

In reality, though we have made a whole bunch of protocols that you can use, the whole thing is designed so that _you don't have to use anything that you don't have to use_. The only piece that is critical is the core. It's that description of the data structure that allows merkle linking. That is the only piece that you really need like the IP. 

When you think about TCP/IP, the whole protocol about developed at the same time, but the core contribution was the IP network. Similarly here, we have a whole bunch of protocols on a big stack, but they are all cleaned up in terms of interfaces so you can really layer them on top of anything else, and as described, it should layer over Tor and ITP cleanly.

![](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.099.jpg)

We see this as a new thin waist of the web. If I piece the thin waist of the internet, we see the merkle-dag as the thin waist of distributed protocols. It turns out that it already is the thin waist. It's just that right now, everybody is doing it in different ways with different formats and we're integrating them all into one system so that you can link between them.

We see this as an _internet of data_ or an _internet of data structures_ where you should be able to build applications, link them with this mutable or immutable linking and then, have them write over whatever transport makes sense for the user or the developer and so on, and have that be a separate discussion. Instead of today which is just the same thing. You mostly do only HTTP over TCP.

# Merkle trees

![Merkle trees](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.102.jpg)

How do they work? Why is this data strucutre so important?


The basic idea is that if you have some piece of data that is linking to another in HTTP land, you would have an IP address that identifies some location. 

![hash](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.106.jpg)

The idea of a **merkle link** is that you _link things together with a cryptogrphic hash._ You use the content itself to determine the link. The whole point of a cryptographic hash is that you cannot come up with some other pre-image that gives you the same hash. If you are able to come up with a pre-image on demand, the whole crptographic hash is broken and you should be able to attack all sorts of systems in the network. 

There's this huge bounty right now for whoever wants to break SHA-256, they could run away with five or six billion dollars which is the whole worth of the Bitcoin network. It all rests on whether or not you can break SHA-256. If you can do that, go ahead and then, we can move to SHA-3. Over time, we have to upgrade hash functions. This is an important detail that we're still working on. The whole point is, **let's use cryptographic hashing to address the content.** That's what gives you the **immutability** -- _if you change anything, the cryptograhic hash changes and now, the link is different_.

### Merkle Links
![Merkleized data structure](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.107.jpg)

Let's add merkle links to the web. This is the merkle tree, the first merkleized data structure. This is where the idea of a merkle link came out.

![Git hash](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.108.jpg)

 Git uses them. This is why Git works as well as it does. Data within the Git version control system is merkle-linked.

![bit coin](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.109.jpg)

Bit coin uses it. This is how the whole block chain operates. The whole thing is merkle links. Bit coin is a massive merkle tree. 

![Merkle forest trees](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.111.jpg)

There is a whole bunch of protocols. The point is _all of them have these different merkle links._

![Merkle linking](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.113.jpg)

Let's take the idealized web and add some merkle linking -- that's what IPFS is. 

![Merkle linking](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.115.jpg)

You can see it as a massive forest of Merkle trees where any one tree can point to any other tree. You do this by having a common format around how you do the linking. For those specific systems that are pre-IPFS, for the big and important ones, we'll make them work natively and we'll have mapping to be able to address things like Git and Bitcoin, so we can import all of that data. But for things going forward, it would be great to just use this one format so everything can inter-operate. That is the heart and core of what IPFS is about.

![Merkle linking](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.116.jpg)

Here is the landscape as we see it. There is multiple block chains. There is this massive merkle trees emerging that are now running financial systems and smart contract systems -- pseudolegal code that is executing on the internet on its own that is mediating the transfer of property. They all rely on merkle linking. 

A theorem which is one of these important block chains that is emerging, which is the one focused on smart contracts, is going to be using IPFS already.

### Why is merkle linking so valuable?

It's good to think about the CVS or SVN transition into Git. If you remember the good old days when people had to use CVS, you had this centralized server that had all of the version history of some code and you had a system where if you got disconnected from the central server, you couldn't commit any code. You couldn't work when you were offline. If the server fell apart, nobody could do anything at all. 

![CVS_SVN](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.119.jpg)

Git came in and said "Okay look, let's not do this at all. This is stupid. What if we put the entire version control system in each of the nodes and you have an offline first system where everyone is working independently contributing and adding immutable objects, and then over time, you sync it."  

![Git](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.123.jpg)

This is an extremely valuable idea if you get disconnected from the network, you can still work and operate. You can still communicate with each other. 

![Git](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.125.jpg)

If the centralized servers fall apart, it doesn't matter. Everyone can still work. 

This is the same thing that IPFS does but it does it to the entire web. The whole idea is let's take this distributed offline-first data structure and use it to make the entire web. This is what gives us the distributed web. This is why we are able to make websites and applications that link to each other, that work disconnected, that work offline, and that have no origin server.

In a sense, if you put a website on IPFS, you might need a server to seed out the data -- or at least one node -- but it is not the origin server. Any server that has a data or distributed can do so. The website operates wherever it executes. If you're running in a website locally, the whole rest of the network disappear. The data could be deleted from every other computer and you still have the code and you still have the data and you still operate.

That is the transition of a model.

### Hyperspeed

![git IPFS hyperspeed](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.126.jpg)

This is what I call **hyperspeed** because you are beating the speed of light. You're going faster than the speed of light because you are able to move content sometimes preemptively or know that content has not changed at all so you don't have to connect in any way and you can reason about the content you have and not have to waste time or rely on links that may be off.

### Merkledag

![merkledag IPFS](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.128.jpg)

We call this the **merkledag**. It's not a great name. It's hard to say. We might rename this to the _merkle web_ or something like it.

![merkledag IPFS](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.133.jpg)

The idea is you have this huge graph. Everything is directed acyclic graph where content points to each other with these merkle links and you can represent Unix files and directories over this. Git is an example of this. You can do Bitcoin and block chains. You can even do arbitrary key-value stores. There are even some people that are building a sequel database on top of IPFS so you can have full sequel semantics on top the merkle-dag. 

![unixfs as a dag](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.139.jpg)

_How would you go about doing this?_

You would represent a file as a dag node. Big files would be split into multiple nodes until you can do chunking and duplication. So, if you have a massive file or two different files that share a ton of data, you just duplicate it. It's the same thing that file systems have been doing for decades. Let's just put that on the web itself -- directories or dag nodes and so on.

![example](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.140.jpg)

To show how it looks: In the regular web, you would have the domain name mapping to a location. 

![example](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.142.jpg)

You talk to a specific node and you pull it back.

![hash ipfs](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.144.jpg)

In the IPFS node, let's use the hash and address things by hash. You now have a mapping from the name to the content and you now can retrieve things. 

![hash ipfs](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.146.jpg)

Any node that has the content can serve it to you.

The reason the format is tricky to get right is because you want to preserve two really important properties of the web:

![Resolve paths](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.148.jpg)

 1. You want to be able to resolve paths, the same way that UNIX brought it up. You want to be able to do UNIX mapping on top of this distributed web. 

![Represent directories as dag nodes](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.151.jpg)

 2. You want to be able to represent directories as dag nodes and resolve links through it by finding the hashes along the way. This is effectively what Git does.

# Mutability

![Mutability](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.152.jpg)

The question is, if you now have this massive immutable log where you are adding content all the time and whenever you make any change, just create more content, you still need mutability. We moved out from a web that is completely mutable to a web that is completely immutable where changing content means creating new content because changing the bits would change the value of the hash which means the link has not changed. You still need mutability to be able to do dynamic content.

It turns out that the people that made Plan 9 came up with the right way to do it -- _you use merkle linking but you have pointers on top of the graph_. The old Fossil and Venti file systems worked this way. Everytime you made any change, you would just create more data (ZFS works the same way) and when you want to do dynamic content, you just move the pointer to the latest version. You need some way of having these pointers work across the whole web. Git, again, works the same way. 

In Git, you have immutable objects and you have mutable branches that you keep pointing. The master branch is really just a file in your repository that has a hash in it and whenever you commit, you change that value to point to something else.

We can do mutability trivially with DNS. All we have to do is take a DNS text record and put in a hash there and whenever you want to change things, you change it. But, that's really expensive. We don't want to be doing mutability across DNS. We want sub-millisecond mutability. This would not work on its own.

![IPNS](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.153.jpg)

We introduced a new naming system in between. That's what we call **IPNS** -- the _InterPlanetary Name System_. This is based on David Mazieres' work, the first file system that came up with that was SFS. That was far back as I have traced the idea. It might actually be even older. 

The idea is very simple. 

![private-public key pair](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.155.jpg) 

If you want to point to some immutable content, you generate a public-private key pair and you take the hash of the public key and hand that out as a reference. So, when people are going to look up something, it includes the hash of the public key, which means that they can retrieve the public key and they can check if that is correct.

![pointer](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.158.jpg) 

The next thing you do is you create a pointer which has the value that you want to point to and you sign it with your private key. You take that record and then, put it somewhere in the network that people could resolve it. It could be over DNS but that's slow. We want to do it faster. This gives you a mutable link that you can update whenever you want by just signing the new pointer and distributing it through the network. 

In short, you take the content, you take the hash, you create a pointer, you sign it with your private key and you put that out there which means that somebody can verify that it was signed by you and nobody else. Then, what you do is hand out a reference to it which has the hash of your public key.

If I retrieve the link at the top with the blue link, I take that blue hash. I can find the public key and retrieve that with it and I can then find the pointers and I can verify that the pointer was really signed by you so I have full mutability back. These are these mutable pointers that are layered on top. Of course, nobody wants to look at hashes.

There are multiple ways of making sure that you have the copy of the recent pointer and not the old one. You don't want to choose just one way of doing it because there are different application models that want to support different kinds of updates. One trivial way would be to update a counter. You look for whatever pointers you can see and then, take the highest value. 

There are other cases where you can do ancestry chains. One pointer points to the last pointer. You scan for a while, fetch a bunch of pointers and take the one that is the ancestor of all the other ones.

We are building this to be entirely pluggable with whatever PKI you want to use. We don't enforce some PKI. The idea is that you bring your own keys and you do whatever key you wanted to use and IPFS will work with whatever system you have. That's an important thing because many different organizations trust different cryptographic primitives and you can't tell everyone "Hey, just use these because that is not going to work."

The point here is that _we have a whole set of formats that give us interoperability across different crypticisms._ The hashes are not SHA-256. They are not SHA-3. They are actually called **multi-hash** which encodes in the hash itself which function was used to generate the hash so you can upgrade it over time. You can do the same thing with the keys. You can describe what key it was and so on.

One cool result out of this is that you can take the public keys, put them back into IPFS as immutable content, fetch them, link and have the entire PKI as objects here that you can find. You can have an object that includes the data of the public key and a pointer to its parent key and a signature within it. Having only that object, you can check the key, you can fetch the parent and you can verify the signature is correct. You can do this all the way with the whole PKI.

You can use the immutable part of IPFS to distribute the entire PKI and then, from there, you can do replication however you want. How to do replication and key rotation are really important pieces of this whole thing but nobody has come up with the one right solution and it's mostly different camps want to use different things so we just work with all of them.

That's our principle around all of this. _You won't find one solution that is right forever so you should make the thing be able to work with different people_ by introducing these small simple formats that can multiplex over the other ones. We work over multiple transports that way. IPFS can work over quick, can work over TCP, can work over WebRTC, can work over any single transfer you want because we've made the whole thing self-describing.

![mesh](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.159.jpg)

What this whole thing gives you is this huge _mesh of content_ that's separated from the host that hosts it. This huge mesh of content is either linked with immutable links which you can verify by hashing it or linked with authenticated links or key links which you can verify by checking signatures.

What it means to publish to these networks is that (a) you just create content, add it and share the hash, or (b) you create content, sign it and you share your key. That gives you full power to publish into the network without necessarily having to host it yourself and without having to trust any of the people that are hosting the content for you which buys you those elusive properties which is that I should be able to create the content and store it all over the network and it should be able to be served all over the network and you should be able to check that it was truly me who published that content and that you aren't being attacked by some man in the middle.

# Web Data

![web data](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.162.jpg)

This huge mesh is like a web of data in the same way that the linked data were in the semantic web world wanted except that instead of relying on the links being these mutable references and relying on just constant queries to all of these online servers, you can package the content up and move it to wherever it makes sense to be and everyone can check the whole content integrity on the run.

![web app data](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.164.jpg)

You can translate the standard websites of today directly onto this by just adding files directly onto IPFS and it all works. That's a critical component to interface with all the databases that people use today, those would still work the same way and people still would have some RESTful APIs and those will still operate the same way.

It gets really interesting when you start thinking about how to do dynamic content or how to build applications that really have no centralized databases. We're talking about being able to create applications where a client would generate the data locally. 

For example, a Twitter client could generate the data locally. I would have a set of keys, I create a tweet or an email or whatever, I sign it locally. I distribute it through the network and people can check that data was truly me who wrote that. People can move it around however they want and if you add encryption around the data itself, then you don't have to worry about encrypting the wire all the time.

You should also encrypt the wire but the point is you don't have to worry about the data leaking necessarily and the data is encrypted on its own.

Big asterisk there in that depending on how you encrypt things, depending on how you move it around, people can break encryption but it's a very different model for computation. It's a model that goes back to the distrubuted notion of the web where the publisher is anybody, where the hoster is anybody and where it's completely distributed and peer to peer. 

We can have websites that operate entirely on the browser and have no server necessarily. Of course, servers are a really good idea. It makes things faster. But, it should only make things faster or do some critical processing but you shouldn't have to trust the server all the time with all your data constantly to the point where you no longer have the ability to publish yourself.

That's the shift in model.

# Legal Records

![legal records](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.165.jpg)

This graph could be used for anything. If you really sync down, you can start creating legal records and contracts and link all of these pieces together and have just this web of data that you're checking not necessarily worrying about the representation of the files themselves.

That is how IPFS works.

# How the Project is Going

Why is this different from any other good idea out there? Why is this different from the tons of good ideas that have been written up and implemented but haven't really been deployed?

We are designing the whole thing to interface with the web of today. We have this whole sophisticated adoption plan to make sure that we can migrate to IPFS without the user telling.

For example, the first step is you run some HTTP gateway where you can give people regular HTTP links that will resolve through IPFS and they can pull content and it all work seamlessly. Of course, that still relies on some gateways. 

The next step is you ship them some Java script code which runs a full implementation of the node in their browser tab. You now have the full IPFS node in the browser tab capable of doing the entire protocol and moving around the content but the user never had to install anything. That's not as fast. 

You ideally want it to be as part of the browser itself and you can do this through either browser extensions or you can do this by implementing directly in the browser. We are working with a major browser vendor on implementing IPFS in the browser which is actually a show off traction. This is to the point where browser vendors are going "Oh! This is cool. Let's use it!"

### IPFS as an OS

This is the last case where we are actually extending the web into UNIX. We see IPFS more as an OS service. It should be running as part of the OS itself. If you noticed the link that we had, they don't have the colon in it. If you look at an HTTP link, it has the colon slash-slash thing and we just have slashes.

![hash public private key](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.144.jpg)

Trivial details. But in reality, this is what allows you to mount the entire thing in your UNIX file system. You can now write applications that are running in the regular standard process model that are actually part of the web. You can ship code this way. You can have entire package managers this way. You can model the entire file systems this way. You can model entire machines and virtual machines as just entities in this graph. You can have your name pointing to a VM and all you have to do is remember your one name and you pull down the entire virtual machine. You decrypt it, you emulate and you run it. You have all your personal files in there and you can now compute. All of what that's doing is just adding more immutable content that you are now spreading back into the network. This is where it goes from parity with the web to giving a whole bunch of new capabilities that have been known and studied in distributed systems and file systems but haven't made its way all over to the web.

There is a whole bunch of stuff there that is really exciting and interesting, but that is an example of how you can go about in making sure that this thing isn't just some random idea. The whole set of protocols are designed to plug into all of the other systems that are out there. That's the majority of the work.

The majority of work was not coming up with the ideas. It was not making the core implementations. It's making the whole thing interface with the rest of the ecosystem. It's a whole bunch of tools that have to be made. It's a whole bunch of careful design decisions about whether or not to include a colon there. That colon, the HTTP colon slash-slash, it's a reminder that a trivial decision could make it impossible for the web to be layered on Unix which created a rift between the browsers and the web and the file system. Maybe by removing that colon, we can bring back the web into Unix and make the whole thing work together.

The principle of the whole project is to make sure things integrate well and make decisions based on what will cause zero friction of adoption. We're really trying to get to that zero friction of use. 

![github users](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.168.jpg)

We seem to have done a good job because a lot of people are now using IPFS. This project is completely open source. Anybody can use it. We have two implementations -- written in (1) Go and (2) Javascript. People are actively running IPFS. There is between fifty to 100,000 websites now running on IPFS. They can be viewed through (1) regular web browsers, (2) through our gateways, or (3) they can be viewed natively with IPFS if you happen to be running it locally. 

People are using it not just for the web but for file systems. People are using it to move around containers. There is this huge effort around application containers with Docker and CoreOS which is virtualizing in a very thin way.

People are using IPFS to move around these large images. They tend to be anywhere between five megabytes to a gigabyte and people are using IPFS to move them around the data center. The typical construction there is you have this seed of data in the broader internet where you publish these images then you want to ship them out to a whole bunch of machines in your datacenter. You want that to be really fast. You don't want to pay the cost of talking to that seed outside. You want to minimize the cost to move it into your datacenter and then, use your own machines in your own local networks to distribute the whole thing really quickly. That's another use case that people are doing.

We recently found out that **FreeNas** -- the free BSD distribution for network attached storage devices -- is now bundling IPFS and they have a huge install base between a hundred thousand to maybe a million users but they are not going to be shipping IPFS by default and people are going to be using it.

Another set of interesting set of use cases is around package management. The Linux community made this amazing contribution which is _let's ship code through this very well cleaned up ecosystem of carefully designed packages and signed and do the whole verification and make it really trivial to install code._ It turns out that you can put all of those artefacts directly in IPFS. If you are in a datacenter and you need to download a package, there is no reason you should be having to talk to the whole package manager and wasting all these bandwidth. You could be getting it from whatever other computers near you that you happen to be connected to.

There's a lot of careful policies that go into which computer should be able to connect to each other but that's where the routing system comes in. It turns out that there are some elegant ways to construct those policies. 

Perhaps, for me the most interesting piece of this whole thing is that people are now building web applications that really have no origin. They run completely on the browser and they generate dynamic content that may communicate with each other and it's all hosted on this huge web of content, encrypted by default and you're now mutating data without an origin. The whole thing works in the distributed case, completely offline first. 

![Contributors](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.170.jpg)

It's a huge project now. There are some contributors. Last time I counted, there was upwards from 200 people that have submitted code. The core team is very small. There is about six of us but the reason this massive project is doable is that we're doing the whole thing open source from the beginning, everything is online, all  of our design discussions are up there, anyone can come in and talk.

We've had a number of very interesting developments there where suddenly, we had some questions we didn't really know what the right answer was and someone happened to know that the right person was out there and had worked on this kind of thing. They just tagged them on GitHub. They showed up, solved the problem for us and then, we moved on.

This is simple for most people that do open source like GitHub -- it's this great resource where there's this huge social network around just contributing and making code. We are living this amazing dream of being able to just pull in the right expert at the right time whenever we want. The whole design discussions, everything is there so people can contribute any kind of work.

There is a whole bunch of interesting algorithm questions around CRDTs -- conflict-free replicated data types -- where they're a perfect fit for IPFS because these are immutable and mutable in the same way that IPFS is immutable and mutable and they map very cleanly to IPFS. A world of experts suddenly started having a discussion in our forums of discussion around how best to layer this in IPFS, how to use IPFS to move around their content, how to build applications on it, and that is what is making this gargantuan effort possible. 

![](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.176.jpg)

Again, in short, we are trying to upgrade the entire internet. Our life is really about this whole process of research development, deployment of protocols.

If I were to say one last thing here in this venue at Stanford where people are doing so much research for the network is that truly, when you look at the papers, the idealized systems are 20 years ahead of what we have to put or what's in use today. There's this set of filters around how much of that research gets developed, how much of that research gets developed cleanly in a good usable way to the point where deployment actually makes sense, how many of those deployments are done correctly to the point where they are actually widely used.

Many times the reason great ideas don't make it to be used is that these filters which are mostly around not coming up with ideas but rather how do you take this idea and ship it to the real world, these filters prevent great ideas from distributing and this is what we really care about.

![Protocol Labs](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.177.jpg)

We're building this organization called **Protocol Labs** around making sure that those filters are better. Many times you can just go in and realize that some implementation, if you tweak it, change the language, or just try it again, you can now make a really good system that can actually be deployed. 

This is where I could encourage a lot of people to spend time on thinking about what old ideas are really good. Just maybe it wasn't the right time, maybe the implementation wasn't very good, maybe it just didn'te get deployed the right way, but in reality, there is nothing else holding it back and how can we upgrade the internet and the web as a whole by just putting some work there?

![IPFS logo](https://ipfs.io/ipfs/QmVFdbPU8sfVtyxFuqyCGNbKKMwqGYvi6XX3RA282S1fDt/ipfs-015.stanford/ipfs-015.stanford.178.jpg)