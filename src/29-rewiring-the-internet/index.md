---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: 29-rewiring-the-internet

breadcrumbs:
  - {name: "29-rewiring-the-internet", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2015-05-05

# this is the Title
title: Re-wiring The Internet For Decentralization

# this is the name of the main author(s)
author: Protocol Labs

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

In June 2016, at the Decentralized & Encrypted conference in Berlin hosted by [Blue Yard](http://blueyard.com/), our Juan Benet was on a panel with Ryan Shea ([Blockstack](https://uport.me/#home)), Christian Lundqvist ([ConsenSys](https://consensys.net/)), Trent McConaghy ([BigchainDB](https://www.bigchaindb.com/)) (moderated by Ludwig Siegele of The Economist). Here is the video of that presentation, along with a transcription of the talk below.

<iframe width="700" height="400" src="https://www.youtube.com/embed/mwjqxaCs7So" frameborder="0" allowfullscreen></iframe>

LUDWIG: Hello. My name is Ludwig Siegele, cover technology for The Economist. If you want to talk about that later during the break, happy to explain to you what we're doing at the Economist and why we're riding about the blockchain. Well, not so much anymore.

You already know two of our panelists here, but let's give the other two the opportunity to introduce yourself. Why don't we start with you.

CHRISTIAN: Thank you. Hi everyone, thanks so much for inviting me to this event. My name is Christian Lundqvist. I work for a company called [ConsenSys](https://consensys.net/), which is a venture production studio. We have a lot of internal projects in the blockchain space using mainly the Ethereum blockchain and the idea is to work very horizontally to find industry experts in various different industries and team up with them to build decentralized applications.

We have projects going on in energy and music, finance, and a lot of different things. My name project is identity. We're building an identity system called [UPort](https://uport.me/#home) and we recently announced a collaboration with Ryan here and another small company called Microsoft. That's going to be very exciting. We're building a cross blockchain identity system.

Thank you!

LUDWIG: Thanks, Christian. Ryan, so, blockchain or Blockstack labs. Tell me more.

RYAN: Sure.

LUDWIG:  And of course, about what you deal with Microsoft.

RYAN: Absolutely.

Hi everyone! My name is Ryan Shea. I am one of the co-founders of [Blockstack labs](https://blockstack.org/) which works on Blockstack, which is a decentralized application stack for the new internet, which is secure, blockchain secured, and it provides services like naming, identity, authentication, and then, user centric storage.

As Christian mentioned, we actually just announced yesterday a partnership with Microsoft and ConsenSys where we'll be collaborating on a self-sovereign user-centric identity system. You might know me as one of the creators of [OneName](https://onename.com/) and OneName is a consumer web application that was built on top of Blockstack, this blockchain application stack.

LUDWIG: Well, you started out as Onename, I think. Why that change?

RYAN: Yes.

LUDWIG: Is that a name change or…?

RYAN: It's just a name change. We still have OneName consumer product at OneName.com, but Blockstack, we built out Blockstack as the application platform underneath OneName and we wanted to focus more on the application stack, more on what we're providing to developers and companies, and it just shows that OneName is one of many possible applications that could be built on top of the technology.

LUDWIG: Cool. One thing you mentioned Trent and Juan very often is the _emerging stack_ for these decentralized applications. That's an interesting thing. I haven't heard that before, but tell me, how far along are we? Is this just a collection of projects that find a common name, like Interplanetary? Where are you actually?

JUAN: I think the stack has been… It's not like a new stack in a sense in that we're replacing the functions of different things in the past. In general, the way the protocols work is they layer nicely to provide different pieces of functionality, and as Trent has talked about, storage layer underneath computation, and then being able to have a network to be able to talk to different groups and so on.

I think all the pieces are there already, and Bitcoin was this nice catalyst for getting us to rethink the stack of applications that we have, when we think about how web applications work today, there's this massive machine that everyone has to run with tons of little computers and so on to just provide the service for one web application, but oftentimes, it could just be replaced by an Ethereum script and that's it.

I think although the pieces are there, there's great solutions for payments or great solutions for computations, the identity pieces are getting worked out by the two people here, there's file systems and databases and so on, and all the pieces are there. I think right now, we're just re-wiring how they all fit together and work together. Ultimately, it's going to be the applications that drive the development forward.

It's finding those really killer applications that are going to drive the use of all of these applications. Bitcoin was nice because it had this in-built payments application platforms. All the other blockchains have that, too but we need something even deeper and more user-facing and consumer-oriented that is just going to surface all of the benefits of this new way of looking at data and computation, that is publicly verifiable, shared, with no organizations in the middle.

Once we find that, the rest is going to just go really quickly because all of the infrastructure, it's in the last phases now.

LUDWIG: Ryan, do you agree with that? What do you think can be the killer app to drive that, the adoption of that new stack.

RYAN: I absolutely agree. I think it's a little difficult to know. We're seeing quite a few applications being built on top of all these technologies, but it's hard to predict what's going to come out and be the big ones. I think it will be applications where there is a particularly strong advantage of building it on top of something like this.

I think if you look at something like an encrypted messaging app, there's quite a few UX challenges with these applications. If you guys use Signal, you may notice when you're talking to someone, there's a link between the person's name and their phone number, and there's also a link to a public key. In a sense, you're trusting Signal to form that association.

What Signal will do is everytime the public key changes, it will notify you and ask you to authenticate the public key, but you don't really know what's going on. And so, if you want a truly secure application that works with the user, then you need to use some of these systems that allow for you to actually trust the information, trust that you're getting it exactly like with IPFS, trusting that you're getting the exact correct user like you are with some identity systems, like what we have and what ConsenSys has. I think it's really going to be the applications that shine because they couldn't have been built in a certain way without these technologies.

LUDWIG: Christian, same question to you, do you think there is something like the Blockstack emerging and what could be the killer app?

CHRISTIAN: Yes. I think there is a stack emerging but I also think that it's very early days. We're seeing a lot of pieces. IPFS is one piece, BigChainDB, and blockchains, whether it be Bitcoin or Ethereum is another piece. I think we still have ways to go before we figure out what is the right way to link up all these technologies.

I would also say here centralized services is one piece. They have very big advantages which is why they are so popular, but if we can scale them down so that they are used for just the things that they are best at, then I think we get a very good stack.

I think one of the big challenges we're thinking about is user experience and this is also something that Ryan mentioned. If we have a system where you interact with a blockchain, and if you want the user to be empowered, then they have to control their own private keys. That is something that's never really been done before because keys has always been some administrator and some company that creates that.

And so, to create the UX from that is something that we're seeing as a big challenge.

LUDWIG: Isn't the challenge here that you have a system, a centralized system that works quite well. You've laid out the reason why it doesn't, but if let's say, I have a decentralized database, interplanetary database and compare that to an already interplanetary but centralized database, Google is operating. I'd bet my money, at least at this point, on Google. So, how can that change?

Trent, perhaps?

TRENT: Sure. Actually, and maybe this is to answer your previous question, too of the emerging stack, another way to frame the emerging is you have a stack that exists that's centralized or several stacks, the LAMP stack of the late 90s to a variety of ones today. You can build a centralized app and then, say, "Let's decentralize this piece. Let's decentralize this piece," and it makes it easier to have this adoption and UX issue has been resolved, towards then, the question is, "Okay, what is the benefit?" You should only use decentralized if there is a benefit, otherwise, you are wasting your time.

The case we described, everything was centralized except for just who owned what? Because if you're a little startup and you have a database of who owns what, and you go, kaput! People are buying digital art on your platform, and you go kaput! They lose their digital art. It's a little different. You don't have repetition yet. You don't have trust.

If you're Apple and you're giant, you have trust because you have a long history and you probably won't go broke in the next five years, and so, if I buy a song through iTunes, then I can probably be pretty sure that I still own it through Apple and the licensing there.

So, it really has to solve a specific problem and a lot of it comes down to basically, it's a way for the little guy to get a proxy for trust rather than relying on size and scale. There's a whole bunch of other key use cases, but that's a really important one.

RYAN: One way that we're actually thinking about the stack, it's very similar to how Juan thinks about it where a lot of the components are swappable. I mentioned before that Blockstack in a sense is its own stack, but it provides naming, identity, authentication, and user storage, but the way we look at it is that the actual location where the data can be stored is independent. It can be stored in IPFS. It can be stored on other locations.

And then, also the system actually has a directory that it builds off of either blockchain or some other ledger and it's also blockchain diagnostics. I think it's very important that we think of things in a way where we are not hard coding in certain components and we can actually swap them out.

LUDWIG: Let me push you on that more generally. You said centralization where it's good, decentralization where it would serve the purpose. More generally, for you, it sometimes seems to me in this whole decentralization debate that decentralization is a goal. We want to have a blockchain. We want to have a decentralized database. And, that is missing the point. It's a tool. Any thought on that, perhaps?

RYAN: I think that we often talk about decentralization, but there's a lot of derivative properties that are related to decentralization. It comes down to not having to rely on a single entity for uptime. It comes down to not having to trust a single entity for pieces of information. It allows you to escape censorship. It allows you to make sure that large organizations can cooperate with one another and actually have, for example, an authentication system that works amongst them without having to delegate to one particular organization. So, it's also something that very large organizations find attractive because they can then work with each other in a neutral playing field.

I think there are a lot of derivative properties. Decentralization in of itself is more of like an ideological thing, or it's an abstract concept that's really hard to pin down but there are so many derivative advantages that we get and it depends on the system and it depends on the application and you should think about that in context.

So, if it's a messaging application, then you care about maybe having privacy, being not censorable and so on. For example, in any country where there is some kind of uprising, you need that property. That's how I think about it.

JUAN: When we think about the systems and how they are going to actually get deployed and beat some of the other competitors that are right now enormous and dominate the space, you have to think about the unfair advantages that these systems have. People mentioned trust, identity, and so on. That's a huge one like being able to use a system without having to trust the corporation that's going to be around in five years to ten years. Sure, Google and Apple and so on, we've seen that they've been around, but anything can happen in these networks. Google shuts down services often. Many services that you used are now gone.

We need to transition our application stack to one where users do not have to depend on an organization continuing to find that as a very valuable profit model in that if a large collection of users want to continue running this thing, they should be able to do it.

I think one killer business opportunity in this space is to think about cloud computing. Traditionally, we think about cloud computing in terms of the giants -- Google, Amazon, and so on. The people who can afford to build out massive data centers and wire up all these computers and do all their processing.

However, when you think about the Bitcoin hashrate and how many computers today are wired up, crunching hashes to maintain a ledger, it's an enormous computing power. It defies any kind of expectation that people had before which is how much processing is dedicated to maintaining this one ledger. It raises this amazing question of saying, "Huh! If we can convince so much cheap power to emerge, to be dedicated to maintaining these networks, what other kinds of networks can we maintain this way? What properties do you gain by doing so?"

Google and Amazon are not going to build totally distributed data centers where like you have one machine in this room that they are deploying. Maybe that is where they are headed but right now, they are certainly not there.

You have the ability to create something like what AirBnB and Uber did to really get in with everyone that's distributed around the world, precisely where they are needed most, to build out an infrastructure for computing.

This might seem like a totally contrary point of view here because cloud computing is such like the secret sauce of these major corporations, but I think that there's a Achilles' heel on all these which is that the major corporations have to deal with bandwidth being an enormously expensive thing, and if you can beat them and go directly to the edge, that is a killer application or killer business.

CHRISTIAN: Can I quickly jump in? I think from what Juan was saying also is that right now, it seems that the killer application is actually monetary and financial. The reason why we have this world's biggest supercomputer is that these people get paid for running these Bitcoin miners and we've also seen in the Ethereum space the biggest thing right now is the DAO. I don't know if Kristoff is here. He will talk more about that later, but it's basically a 150 something million dollar decentralized VC fund that emerged.

I think these kinds of systems where people can just go in and allocate capital, allocate resources spontaneously, I think there is such tremendous power and potential there. We haven't really started scratching the surface of that.

JUAN: One of the interesting properties there is the ability to create markets where there wasn't a market before. So, we think of companies like Google, Amazon, AirBnB, and Uber as a centralized entity that's creating a market underneath them in certain cases, but application platforms on top of Ethereum and IPFS and IPDB and so on, and Blockstack, can do is suddenly cut out this huge middleman with a protocol. That's a massive cost savings for the entire network.

One thing that has been talked about a lot is what happens when you can do things like AirBnB and Uber without the central service. It may be the sort of thing that you access so vital and important that you need this entity to do the market making or to create a market, but it maybe that that's not the case and that you can turn this into a protocol that will optimize the entire process much faster than a centralized company would do it because it turns it into a market.

The moment you can take a very complicated process and translate it into a market where a whole bunch of different actors can vie for opportunities and just be each other, you have this amazing optimization power where it will just fit the function much better than a centralized entity could have.

LUDWIG: I'm going to ask one more question before I turn it to the audience. Yes, we talked about centralized services, you talked about markets, you talked about institutions we have to trust. In a way, centralization pops up all the time, then you get a governance problem, and the DAO for example is a good example. Bitcoin is a good example. You always get that governance problem. Any thoughts on that?

If you organize this into a planetary file system or database, foundation you mentioned, how are you going to run it? How are you going to avoid getting into that governance crisis that Bitcoin is in right now?

TRENT: I grew up in a place in rural Canada that's colder than Siberia called Saskatchewan and people basically had to work together. If they didn't, they'd literally die from the cold. How they did it was via a governing vehicle called co-ops. So, there was a co-op for the local grocery store. There was a co-op for selling grains. Actually, it's billions of dollars worth of sales of these co-op in Saskatchewan and it had these governing structures. Kind of the way that I see governance moving forward, you can come from the angle of starting with blocks and decentralization and try to figure out the legals on top of that and that's fine. It's hard though like we've been seeing with DAO. After it was released, there was challenges here and there. They will get results but it will take time.

You can also start with the existing legal structures that work really well, that have been proven over the centuries even, and you can add in elements of decentralization here and there, here and there and work with the existing legal frameworks and I think that's actually a powerful way to think about it. A lot of DAOs are extremely well-suited to the notion of a co-op.

You can go from both angles. What we chose with IPDB was actually to take the traditional route to start with  knowing that there can be challenges with the other way, but as time goes on, as the challenges of DAO and etc. get resolved, then to essentially eventually dissolve the current governance of IPDB.

It will take time. We're excited but there's a lot of existing legal frameworks that can be leveraged intelligently.

LUDWIG: Thanks Trent. Questions from the audience. Who wants to be the first one? Over here.

AUDIENCE: I'm trying to think there's a -- My name is Ken Berger. There's the paradox of the commons. I've heard this from a couple of you. Throughout the years, we always want to, the internet is mostly a bunch of nodes, but really, you wind up getting this big hub that is in control.

What is the biggest threat, single biggest threat that any of you see, to general topic on re-wiring the internet for decentralization, technical, government, anything?

CHRISTIAN: One thing is I think we need to be careful to remember that these things, decentralization, etc is not always a good thing. Blockchains are extremely empowering because they mean that you can hold assets, etc, in a self-sovereign way, but they also have very difficult privacy issues. So, I think one threat is that. If we don't design our systems very carefully, we might end up in a worse situation, let's say privacy wise, than we're in right now. This is something we need to remember.

TRENT: My biggest fear is if you go to the early 1900s, JP Morgan, Rockefeller, all these guys, they created things like US Steel and Standard Oil and all these major trusts. I'm super concerned about that. I'm really concerned that a lot of its consortium chains will end up being too powerful and cut out the little guys.

We've been thinking long and hard about that. How do you balance sharing resources within an ecosystem, within an industry, and at the same time, making things accessible to the little guys who weren't part of that initial club.

I fear a lot about that. There had to be laws introduced in the early 1900s to basically stop these trusts but it took decades. That's my greatest fear.

JUAN: I think one big risk that we run is, and I actually haven't seen it that much, so that's good, is that a lot of this change started happening in the early 2000s with the whole peer-to-peer networks that emerged then.

The problem though is that the majority of the use cases there were bad in that there were some of them were illegal in some way. Some of them were not well tuned to the actual problem they were solving.

And so, what you ended up with was a huge regulatory backlash to counteract all of these kinds of networks and just systematic destruction of multiple groups that were trying to build these kinds of networks and technologies. A few of them survived. I'm sure that you have used Skype. Skype started as - the same team did Kazaa previously. That was a problem and so then, they shut that down, moved it on and created Skype. Then, they actually had to rethink the whole peer-to-peer thing and not really use it as much marketing because the words "peer-to-peer" became synonymous with "illegal" in many different kinds of jurisdictions.

Even today, we still have this hold over where, for example, our website, IPFS.io is blocked in some universities because it has the words peer-to-peer. Universities that have CS departments that are really good, who should know better. The internet is peer-to-peer. IP is peer-to-peer. Email is peer-to-peer in a way.

It's just like this problem where the hubris of the early groups cause them to really ride the wave of all these problematic use cases that then cause this, in lots of ways warranted and in other ways not so warranted, massive backlash that just killed the space. And so, we might face challenges like that coming up.

There are certain things that will emerge out of these networks and so on that will be hard to control, hard to control in ways that governments will be scared by deeply. If we are not careful with the applications that we start building and the way that we present this to the rest of the world and the messaging, we might face this similar ignorant backlash against a lot of the things and we might see, for example, like tomorrow, we might see cryptocurrency banned in some countries wholesale instead of actually thinking about the nuance behind each cryptocurrency and so on. That kind of quick reaction might happen if we are not careful with the applications we distribute.

RYAN: I'll just quickly say my biggest concern is that we don't get the UX and distribution right and we don't go to mass market.

LUDWIG: When you said that there was a systematic destruction of everything P2P, I'm just wondering if that's true. I remember, I'm now rather aged when I arrived in the vValley in the early nineties, the talk was quite similar. I went to EFF event decentralization. It didn't turn out that way. The economics drove this decentralization. I'm just wondering whether that's not a pendulum swing back and forward and that we need both, we may... The systems we have are actually rather efficient.

JUAN: Skype did what it could do because it was peer-to-peer. Underneath the hood, Skype was using all your bandwidth and using it to route calls. So, the massive cost that normally other companies would have to front to route all of that bandwidth, they didn't have to face because they used the peer-to-peer network.

However, that wasn't so clear because they had to remove a lot of that messaging to avoid these kinds of problems. Kazaa ran into problems. Limewire ran into these problems. A whole bunch of companies ran these problems.

Many of them, because they had a bunch of hubris and said, "Oh yes, we're cool with all these bad uses," that is a sure-fire way to get yourself down, but there were many companies that had to completely shed any notion of peer-to-peer and hide the fact that they were doing peer-to-peer, not exactly fully hide, but if you knew what you're doing and you knew the networks, you could know that Skype was peer-to-peer underneath the hood, but it wasn't lumped into the same category and that enabled the business that would have been extremely difficult to scale without that.

TRENT: I think another good example like as a difference from the early nineties and now, I'm older too, anyway a big example is it's now easy to transmit value that isn't just bandwidth. Bittorrent was about bandwidth back and forth but a great example is Swarm which is a bandwidth and storage and Ether. There's that dynamic market that exists. Once there is opportunity for people to make dollars in different ways or other cryptocurrencies, then new forces emerge and it can actually help to drive exponential growth of the people behind it.

So, even crowdsale, etc, this is money flowing into the ecosystem partly by people incentivized to make money, but it's actually helping the builders. That's healthy.

LUDWIG: Thank you. More questions from the audience?

CHRISTIAN: Yes, I just want to add to Juan's point about regulatory backlash. I think we need to be very careful around the things that we are now able to do around financial things. We can create completely decentralized derivatives trading platforms and let anyone create their own derivatives and sell them to their friends.

My personal feeling is that that's not a tool that I want to build right now because it would basically be illegal to use that tool. We have to engage with regulators and say, "These are things that will be possible with this technology, but this technology can also help you do your job better." That's the message.

It's very easy to just rush ahead and say, "Oh, we can do this. I don't need permission from anyone," but we do live in a society and we need to be thoughtful.

LUDWIG: Thank you. There was one more question over there.

AUDIENCE: Yes. One quick question. I'm trying to put in the right words. I'm not as smart as you guys, so please bear with me.

If you're rationalizing in a way or if you're making everything so efficient by decentralizing everything, how do you think, for example, entrepreneurs, or people building new things, will be incentivized to stay decentralized because what you just said was Skype and these others used certain particular peer-to-peer and decentralized ways of benefitting, but eventually building that one business that way. How do you make sure that people can stay, trust the decentralized nature and still build a business? Maybe I'm looking at it from a too capitalistic view, but that…

JUAN: You always need a lot of people working extremely hard to build products. Great products are difficult and expensive to build. That will still be something that people will have to pay for in some way.

What these kinds of networks create is the pressure to really think about your business model and figure out what part of doing that is actually necessary, meaning what part cannot be automated away by a network? And, if you have a business that could be replaced by a script, you're in trouble and you will be replaced by a script eventually. A lot of businesses have this problem.

The issue that you need to be concerned with is say, "Great, what can we offload to the network and run as a protocol? What do we provide value to this network that will continue being a source of value that we have to keep inputting and build a business around that, around something that's more stable and secure and really needed by the network?" If what you're doing is not needed, then you shouldn't exist.

RYAN: And, I also think that these services, what all these platforms are doing is they are commoditizing a core set of services and it's making it much easier to build these applications and it's allowing you to focus on, as Juan said, exactly the value add that you provide that no one else can provide. With that, I think what it's going to do is it's going to liberate everyone and it's going to push the innovation up and there's going to be a lot more experimentation because it's going to be so much easier to build apps like imagine not having to worry about storage, not having to worry about user management at all, not having to worry about authentication or any of these things and then, all of a sudden, you can just build it an app very quickly and simply and it's easier for you and you can focus on things and have more thought and effort put into that core functionality.

LUDWIG: Doesn't the space to make money gets smaller and smaller or is there kind of no ceiling?

RYAN: I don't think so. I think one thing it does is it actually increases competition but you will still see breakout successes for whatever effect. There can be other network effects or other types of things that have emerged. Just look at the Apple App Store. It heavily increased competition across a wide variety of categories. There's a lot of note-taking apps, a lot of calendars, and so on, but there are still some very, very high-quality products that break out.

LUDWIG: Yes, but the App Store is a good example of how difficult it is to make money on such a platform.

RYAN: Yes, I think for a lot of people it will be difficult to make money but there will still be breakout successes. But, at the end of the day, the consumer heavily, heavily wins. And also because it significantly decreased the amount of work it took to build one of those applications, you can have people who have full-time jobs who are just building a tiny application. Maybe it's hard to make money in the App Store, maybe it's in the lifestyle business and you make half a million dollars a year or whatever. That's a really good lifestyle business.

Yes, it's difficult to make money but what we're doing is we're democratizing this and allowing way more people to have access to make $50,000 or $500,000 a year.

TRENT: I would suggest that it's broadening the scope of platforms and as there is more platforms, there's platforms for VR and for AR and all of these, this is platform for cloud computing and related, and it's unlocking new capabilities, too. So, we might see 10x the opportunities especially as it interplays with these other platforms emerging.

It's much easier to do VR apps now compared to ten years ago. This actually unlocks a lot of potential with networking-related apps and identity and IP and all of these.

LUDWIG: Okay, on that optimistic note, thank you very much. On to the next speaker.
