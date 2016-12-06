---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: the-mission-to-upgrade-the-internet

breadcrumbs:
  - {name: "the-mission-to-upgrade-the-internet", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2016-06-14

# this is the Title
title: The Mission to Upgrade the Internet

# this is the name of the main author(s)
author: Juan Benet

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

In June 2016, at the Decentralized & Encrypted conference in Berlin hosted by [Blue Yard](http://blueyard.com/), Juan Benet gave a short introduction to IPFS and explained our mission to upgrade the internet. Here is the video of that presentation, along with a transcription of the talk below.

<iframe width="700" height="400" src="https://www.youtube.com/embed/Vs3l2_Th4q0" frameborder="0" allowfullscreen></iframe>


I'm here to talk to you about IPFS but before we do that, I wanted to talk about the Internet in general. This talk is called The Mission to Upgrade the Internet and that's not just our mission. It's all our mission. We have become dependent on this amazing machine, the internet.

We think, both in the IPFS project and Protocol Labs, that this is the most important piece of technology humanity has ever created and has brought about an enormous amount of change in just a few decades.

I'm going to flash a few photos of what you might associate with the internet. These are undersea cables, data centers, people using the internet throughout their learning in their lecture here, I'm sure that all the organizers are right now using the internet, learning for students, learning in all kinds of places; Wikipedia, access to all knowledge, the ability to watch videos in some countries, the ability to collaborate on work across the globe, the ability to stay in touch with your loved ones who are far away, the ability to work really remotely, the ability to collaborate on open source and build amazing pieces of technology together, the ability to travel has been revolutionized, the packaging and buying of goods has been dramatically changed, purchases of all sorts.

Markets have already been revolutionized multiple times and they are being changed again. This is also a problem that the internet faces today. We have all of these happening. We also saw some of this going on with the internet. We also have a bunch of problems that are associated with our use of the internet and the freedom of communication that we have. It has some tricky bits, trickier stuff.

So, one interesting thing to look at is graphs like this, the users of the internet. This is a graph, not exactly of the internet. This is starting with the web when it was opened up for commercial use and we are up to around three billion people now. That's almost half of people on the planet.

So, the graph looks like this. It's still kind of far up, but this is growing at a tremendous space, and we also have 8 billion mobile phones. There's an interesting discrepancy there -- 8 billion mobile phones but only about three billion people on the internet. What's going on there? And, there has been suggestions by the UN to declare the internet as a right for all humans.

And so, this machine that we all had built together is pretty important to our everyday lives. Most of what we do today is mediated in some form or another through the internet, and not just the internet but the web and mobile applications and so on, all these different application platforms that ride on the internet.

The difference between the internet and the web, by the way, is like the internet is the wire and the connectivity framework, and the web is the application platform that we humans use. We don't speak in byte streams to each other, so we can't directly use the internet. We have to use these applications.

The properties of how these applications get to us, how we find them, retrieve them, use them and so on, those properties have vast implications on our capabilities as humans because the software that we use through the internet, things like the web, things that you deploy through the web, these are some applications that you use daily, the way they function and are able to function is defined through a bunch of protocols underneath the hood, and the properties of those determine what you can do as a human.

So, if you want to give yourself a superpower, give the whole world superpower, you go underneath the hood and you change protocols around, and then, you can just patch the internet and now the world has new things.

This is amazingly powerful. When you think about the ability to actually upgrade the internet with the thought that you as a person that was just a user can suddenly say, "Oh, wouldn't it be great if the internet did X, Y, and Z, and actually go through and patch it, get everyone to adapt something," and suddenly this new set of capabilities emerges and everyone starts sharing this.

This is what we all should be thinking about. You are all thinking about this because you are here, but it's good to be reminded of the importance of this mission and your users. The images that you saw did not just have nice offices in some well-connected city. The internet is everywhere and the edges are increasing. You have to think very carefully about your users out in the edges, as well.

There's a whole bunch of problems with the internet and the web. These are the ones that we think mostly about. There's a whole bunch of others but we want to highlight some. This is what the IPFS project is about.

The web has gone from this more distributed and centralized form to a pretty centralized construction now where you really only think about one huge web server that's serving millions of clients or in some cases billions.

This has all sorts of problems. This centralization is the cause of a whole bunch of other issues like efficiency.

With Gangnam Style being viewed 2.5 billion times, if you calculate out roughly back-of-the-envelope calculation, this is the amount of bandwidth that has been served through Google servers.

Things like ubiquitous computing are taking up the web. You can't really use the web when you're disconnected or offline. You have to constantly be connected. So, if we have a whole bunch of devices here and then, we want to talk with each other and work with each other, and the connectivity to the backbone falls apart, we're hosed. Why? We have supercomputers in our packets. This should not be a problem.

There is a very terrible security model. Basically, nothing at rest is encrypted, so we're only encrypting the connections between point to point links instead of encrypting the content at rest (and we should be really thinking about this). Data control and data sovereignty are non-existent. These huge organizations own your data and own how you access that data. Not in name. You own your data name but you can't really link people to it in a different location.

When we think about the internet in locations like this, you realize that most of the websites out there just don't work. They're too heavy. They have all these assumptions about the connectivity and the latency, and suddenly the people that need the internet most can't use it. This is a serious problem.

Think about how the internet or your application would fare in a natural disaster when people can't connect to a majority of infrastructure. What if you provide some important connectivity fabric for people like a messaging platform? You have to think about these cases.

Then, suddenly there's things like surprise oppression one day.

The biggest problem is that, in my point of view, the web has no notion of giving permanence to links. Links break over time. So, this idealized web of documents is really a web of documents in specific computers. That's what causes all these issues where you can just go to one host and block that.

These are the problems that the IPFS project is here to solve. I wanted to mostly talk about that. We can go through a little bit of the actual architecture and so on but it's really about making sure that these websites that we depend on can be accessed through our mobile phones, through our browsers and so on, without relying on a constant connection to the backbone all the time. That's a model that worked really well to scale up the web, but over time, we are no longer able to rely on that.

We have been sold this myth that connectivity will always suddenly achieve perfect throughput and really good latency and so on, and that everyone is going to get connected and you just sit back and wait until everyone gets wired up and everything will be fine.

But, the reality is very different. The applications as they are structured today, will not work for tons of people on the planet unless we change the underlying structure, unless we go under the hood and patch the protocols to change how data flows in the network.

The IPFS project is about that. It's about turning this link structure that forces us to go to specific locations into a different link structure that allows us to go directly to the content wherever it's available.

In the traditional model, even if a whole bunch of people had the content that you're trying to find, you'd still be forced to go and talk to specific set of hosts.

The good news in all of these, in all the problems is that the internet has been upgraded many, many times before. This is not an event that happens. It's rather a continuous stream of happenings that sometimes have huge spikes like for example, the web. When the web exploded and so on, we saw an enormous amount of innovation. We saw an enormous amount of innovation again in Web 2.0 early days. We're seeing yet another massive wave.

All of these changes happen over time. They go through this process of turning ideas into these protocols that form the part of the infrastructure of the applications that we use.

The exciting thing for us is that changing the network, changing the internet, upgrading with new capabilities, is really as simple as translating a whole bunch of good ideas into running applications. There's this pipeline of going from ideas to more refined ideas into specs, and once you have specs, you can turn those into code. Once they're a code, you can deploy them to computers and once they're in computers, people can use them through applications.

The reality is, this pipeline can get really long and problematic when protocols that are making their way down gets stuck somewhere in between because maybe they didn't have the right implementation, maybe they were flawed, or something, but it truly is pretty simple when you think about it. You don't need to be a massive corporation and you don't need to convince tons of governments to patch anything. You just have to have really good ideas, a really good implementation and a really good adoption path. Make sure that your thing is actually desired by the network. If it is, you'll get adoption.

That's pretty exciting because it means that we can apply our engineering skills and so on to fundamentally change how the whole machine works. The hard part of building the internet, all the hardware, has been done for a long time. It's still happening of course, but the bulk of it is there.

The software is much more malleable and changeable. That's what's really exciting to us.

There is another problem in this pipeline, the fact that most ideas die in research, they never quite make it through applications and fixing this pipeline is a whole other challenge that we have for ourselves. If we want to upgrade the internet, we have to get really good at this pipeline at translating ideas into development libraries and implementations into applications that actually work and so on.

All along, you can start making assumptions about your users, and if you're not careful, pretty soon, you'll cut out a whole lot of users from using your application.

For example, there is a lot of TLS implementations that have some short time outs for the handshake, and if you have a pretty big latency like out in the middle of nowhere, you're done. You can't view a website. You're just completely cut out of it.

There's a lot of really good reasons for things like that. You want to have shorter window and so on, but these problems show up, and suddenly someone deploys this implementation somewhere and accidentally cuts off tons of users.

One extremely exciting thing that's happening right now is that we are seeing this major wave of innovation through a whole bunch of different projects. I really see Bitcoin as a thing that catalyzed all these changes. There was a lot of latent development happening, or latent desire to change things, but Bitcoin was the thing that reminded us that it is actually fairly easy to deploy a thing and get it adopted by a bunch of people if it's the right thing. Change is really around the corner if you work hard and you're careful about how you construct your protocol.

That whole thing just caused an explosion of innovation that brought back a lot of the ideals with the old peer-to-peer world in the early days. This is what we are a part of. Of course, there is Ethereum and there's a whole bunch of other projects that are interesting.

I'll talk about this a little bit. I think a lot of you are already familiar about IPFS and how it works or the technical details and so on. I can talk a little more about the model but this is something important that I want to draw attention to you. It's always useful to step back a little bit and observe what changes are actually happening.

Web 1.0 was about putting content easily acceptable on the network, just writing on top of the internet, being able to address each other's content and fetch it.

Web 2.0 was about wiring programs to that, being able to have dynamic content, being able to execute changes in a really fast pace, where you're also collaborating with these applications and so on, but it's also dependent on specific organizations and computers.

What I think Web 3.0 is (this is just my view and there are probably others that are more valid), is that we have an inversion going on now where things like Bitcoin reminded us that we don't need to trust the organizations at all. We don't need to trust that infrastructure. We can just have content linked to each other, programs linked to each other, forget about the specific organizations or the specific locations and that is the power that these new systems, like Bitcoin and Ethereum, IPFS, and so on, are bringing about. It's this inversion of how the computation actually happens.

At the end of the day, this is all fancy ways of addressing and moving computation over data. It's just a whole bunch of data and a whole bunch of programs operating on data. Simple. It turned out to be pretty complicated but this is the thing.

You can think of a stack that is emerging around verifiable, decentralized applications that you don't need to trust anyone for, and you have things like smart contracts and multiparty computations, that's a component there. You have things like ledgers and secure, consensus protected transaction systems. Underneath that, you have all these data structures that are just hash links that are making all these possible -- Merkle trees, Merkle links. At the very bottom layer, you have this secure high-performance connectivity framework.

What IPFS and the project is looking at the bottom layer of that making that a really high performance thing and enabling these applications to work better.

We have a model but we can't even assume you can have consensus. We can't even assume that you are able to talk to the rest of the network. We really want to make sure that applications work here in this room. So, if we have a chat application on IPFS, which we do, and we'll have to show you later, you should be able to chat with people in this room even if the internet is down. How many times have you faced that problem where just your connectivity to the rest of the world breaks but your office is still good.

I will stop there because I don't want to take too much time and really cement this idea of the mission to upgrade the internet in your minds. This is an evolving machine. The packet-switching networks happened in the 40s or 50s, around then, and then, we got into the ARPANET around that time, and then, we got to the actual proper internet. Eventually, the web came about and now we're ripping the web off of its location and making it all secure, properly linked, and so on.

It's a very exciting time. All of the projects here factor in a whole bunch of different ways. There's a number of large open problems that we can think about and this shared journey is something that we are all taking together and it would be great to have way more collaboration. There is already a lot of it but I think, we need to be reminded of something that the web and the internet people understood really well, which is standards matter. Agreeing on certain formats and structures really, really matter to make sure that adoption happens really well throughout the system.

Cool, well, thank you very much. I have a lot more to say about IPFS and so on and we can chat more later.

Thank you.
