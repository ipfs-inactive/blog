---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: 28-datastructures-on-ipfs

breadcrumbs:
  - {name: "28-datastructures-on-ipfs", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2015-05-05

# this is the Title
title: Data Structures In and On IPFS

# this is the name of the main author(s)
author: Juan benet

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

Juan Benet gave a talk at QCon San Francisco explaining what IPFS is, how it is solving the inherent problems of the Web 2.0, these great ideas that IPFS uses to operate, and finally the data structures on top of IPFS that people are using to create more interesting and more powerful data structures. Here is the video, with a write-up below. The slides can be found [here](https://ipfs.io/ipfs/QmVUYoxfieUw3SJCofKigZAVd3YgQhPu2PMgKsKaBV98Tj/018).

http://www.infoq.com/presentations/data-ipfs-ipld

Hey everyone! Welcome to Data Structures _in_ and _on_ IPFS. Just a quick show of hands; how many people have heard what IPFS is? Sweet, awesome. That's more than half the room, so that is exciting.

Alright. My name is Juan, and I came up with IPFS. It wasn't actually in a sense my idea. IPFS is actually a combination of whole bunch of _really good_ ideas that we've known about for a long time.

This talk is structured in three parts. We'll talk about IPFS generally, I'll give an introduction for those people who don't know what it is or don't know in depth how the tech works. We'll then talk about structures in IPFS: what IPFS uses to work. And then we'll talk about data structures on top of IPFS that are interesting to build, and what IPFS gives you to make those data structures more interesting or more powerful.

IPFS is also called “The Distributed Web”, “The Permanent Web”, or “The Merkle Web” - in honor of Ralph Merkle who came up with Merkle trees (if you don't know what Merkle trees are, we'll cover them, and it'll be great).

In a sense, we see IPFS as part of the next step of an evolution that has been going on for a long time. At the very beginning of the internet, we had packet searching, we had ARPANET; and then on top of the internet we built the web, which is this amazingly powerful application platform.

So, the internet is this nervous system that we use to communicate with each other all over the globe, but the Web is what allows you to build with a few lines of code a new capability and to deploy it to humans everywhere in the world.

It's a really amazing superpower when you think about it: you drop into a terminal - and nowadays you can make websites through the web itself - you write a few lines of code and then you deploy it to the entire rest of humanity and now they can do something new. It's amazingly powerful.

Let me rewind a little bit. I like about the image below, and it comes from Paul Baran's report on packet switching way back in the late 50s. It was sort of pre-internet description of networks and he categorized them into centralized, decentralized and distributed networks.

This not a perfect categorization, but it's very illustrative of one key difference that I like to contrast. Which is that with centralized networks, you can take down the central node and nothing works; and although you gain a little bit of reliability with decentralized networks, you are now sharding states and that is difficult to think about. In the distributive case though, the whole point is to make every single node be the equivalent of a station. So, the distinction between an operation machine that runs the network and the client is gone. In a completely distributive network, the protocol is such as you can cut the network in whatever subsets you want and things would still work; the whole point here is to get a certain level of reliability and redundancy that you could not get in the other network systems.

When you think about the web, think of all these applications that are now part of your daily life. Think about how much that you do on a daily basis and that runs entirely through the web; all of your work - or most of your work, most of your conversations with your friends, family and loved ones, how you learn, how you meet new people, and so on. So much of what defines us as humans now just piped through the internet, through web applications.

But what is actually scary to think about is that the web has a whole bunch of problems. I won't go into depth on these, because there are other recordings where I go into detail into every one of these projects. But here is a quick overview for the people who don't know them.

The process of shipping a video through the web is kind of inefficient, because if all of you right now start downloading the same video we will waste a ton of bandwidth by pulling the same data. We can measure that when, for example, Gangnam Style video had 2.3 billion views that accounted for close to 500 petabytes (PB) of data coming out of Google servers; this is not even counting all these other links in between.

When you think about this model of how the web pulls data, think for a moment of how it operates when you get disconnected from those web servers, the backbone. Suddenly, you can't do whatever you were doing. It's kind of silly. If in one room, you were all collaborating on a Google Doc and you lost connection to the backbone, you suddenly wouldn't be able to work at all. And that's pretty dumb; we have all these really interesting data structures and algorithms that allow us to do this distributive work; so why is it that today we would cease to be able to work? Interestingly, major, really important applications that run people's lives cease to operate in this mode. So if you disconnect from the backbone, you can't message anyone, you can't access your files, etc. Maybe you have a local cache, but if you have several machines in the same room and the files are across them, most applications won't even be able to talk to each other.

Another problem that looms and grows over time is that when you think about mobile, you find that the web is getting kicked out. Mobile applications have, for the most part, removed web applications; and when you think about IoT and smart devices, the web is just completely behind and perhaps not even there at all.

Then you think about  natural disasters: would the web work? Phones may still potentially work, depending on how the network looks, but the web certainly wouldn't. Then of course, there are human disasters. What happens when a government realizes that they can cut off all lines of communication, if they just take down this one link? That is a big deal. The fact that our web applications, particularly the communication ones, don't work in these disconnected settings is really a huge problem that we need to fix as soon as possible.

There also different issues around data control. Today, we feel that we own our data and that we are the one putting all this data out there. But in reality, when we take a link and send it to somebody else, it's usually a link going through another website; and if that website kicks you out, you decide to leave it, or it goes out of business or whatever, that data is basically gone. You can extract it and rehost it but all the links break, all the connections break and it's really no longer the same data.

So, I think this is again an important issue to solve, sometimes in the near future, around where the ownership and sovereignty with data lies. If you write an article and you post it on your social network, shouldn't you be able to link to that permanently? Shouldn't you be able to get an identifier that you can cite in a paper and that it is guaranteed to be there for another 10 years at least? Today, we don't have that. It's kind of silly, right?

Then, there is of course a whole bunch of awful security problems. The security model of the web is pretty bad when you think about it, because in reality we're really just armoring the connection between two hosts. We're putting all of our careful thoughts around encryption and just encrypting that one connection between two peers. But the data itself is not encrypted or authenticated at all, so anybody could sneak into these databases, leak all of it - as we've seen numerous times - or actually change it. Something that I've been waiting to see happen is some hackers breaking into some databases and actually changing the data.

So much of it isn't actually authenticated with checksums. Many times the checksums are right there, so they can recalculate them and put them there; and all the clients will just assume that the server knows what's going on and wouldn't even tell the difference. But imagine that you wake up some day and your email was different; for example, the email you sent out will have said things that you never even thought you would say, or something like that.

This is an issue. We need to be authenticating and encrypting the data at rest; this gets into a whole other set of different debates around and into encryption. But at the very least, we should be signing the data. If you say something, through one of these communication systems, it should be signing that message and shiping it around so you can check in the future that it was actually written by you.

There are more problems, especially around links disappearing and so on; but, hopefully, I've given you a flavor of some of them. And so, the whole point of IPFS is to create a protocol to upgrade the web, to solve a whole bunch of these problems and try to solve them all at once. I know it sounds crazy - and in a sense make make the web operate in a distributed way so you no longer have these central points of failure, so that it works offline or disconnected, so it has a sense of permanence around links you gave out, so that we can develop a better security model around the data that you create, and so that you can host the data in a smarter and faster fashion.

This all started because I wanted to move around machine learning sets faster and I was really annoyed that I had to download them from HTTP server or FTP servers when we've had BitTorrent for a decade and a half. And I was really frustrated by this.

So, let's take a whole bunch of these good ideas from the past, and use them to evolve the web into something more like a secure fabric of data that is very difficult to tear and to break the links in it, in which you could move around whole portions of data from one part of the network to another and maybe even be able to sustain complete or temporary outages. All these are great goals, but how are we actually going to do all of this? Sounds difficult.

At the roots of it all lies a very simple idea, and that is of using Merkle links. Merkle links appear in a whole bunch of different systems, particularly Git - you're probably most familiar with Merkle links from there. And BitTorrent, and in many DHTs.

And as I've mentioned before, IPFS is a synthesis of a whole bunch of good ideas from systems that have emerged since the web was created; perhaps, if those systems had predated the web, things would look a lot different today.

These systems actually translate into a stack of protocols; which are: applications; naming;
something we are calling the Merkle DAG; exchanges, how you move around data; routing, how you find other peers and content; and the network, which is just a layer over your IP or even another network.

The set of protocols look a little bit like this but in reality the IPFS world is very complex and has other different elements. But what IPFS really cares about is that heart by making the web address content and data with these Merkle links. The IPFS protocol uses sets of integrated protocols to provide solutions for naming, for how you move around data, how do you find data and peers, etc.

With this wealth of protocols that already exist, IPFS is well layered so you can take out any piece you don't want and replace it with another protocol that you do want. I even have Tor and I2P over to the side, because in certain applications, you really care about privacy and you need to be able to layer this thing that you used to create the web on top of these protocols to preserve privacy.

When you do that, you give up some other capabilities such as performance. So if you want to route requests for a resource over Tor, you can't really expect to be able to have your two computers in the same room exchanging data to each other immediately. In a sense, there is this trade off between performance and high-performance systems, and privacy and security; that I think we're all familiar about with. However, IPFS makes it easy for you to be able to dial that trade-off depending on the set of protocols that you use to create your IPFS node.

All the exciting peer-to-peer magic happens on this thing that we're calling libp2p. In the future, we're actually going to rip out this whole section of the IPFS protocol and develop a new library. That comes from the realization that there are different ways to finding peers, different ways of connecting them, different transport protocols, and different discovery protocols. There are also ways of finding, addressing, and searching content that have completely different performance trade offs or privacy guarantees, and so on.

The idea is to take all these different pieces, create building blocks out of them, and clean up the interfaces so that you could easily create a peer-to-peer protocol pretty easily by joining together some of these blocks. So you maybe take one discovery protocol, one transport, you use one peer content writing system, and now you have something that works; some of these appear in multiple places.

Everyone always asks why IPFS doesn't use DHT for everything. But the reality is that, when you tease apart what Kademlia - the most famous DHT - is, it's actually a combination of a many different protocols. It's not just a distributed hash table, it also gives you peer routing, peer discovery, and many other things.

By breaking these large peer-to-peer protocols into components and being able to wire them together, you get an extremely powerful and constructive system. We'll be talking more about that in the future, but I figured I would mention it here, because people always wonder how IPFS actually works underneath the hood, how do you find things, and the reality is that you find things according to these specific protocols.

If you create these, than IPFS becomes really easy to implement on top of that, and then it just becomes about the data and the data structures. So, in a sense, an IPFS node, when you look at it, it has a collection of different peer-to-peer protocols that make it work.

IPLD and the data structures that form IPFS and that you can create on IPFS is what this talk is about, so let's jump into that. We see IPFS as a sort of Internet of data, or internet of data structures. You can see this image with a “thin waist”. It's reminiscent of IP and TCP/IP protocols, saying, hey, let's bind together a whole bunch of different networks that all speak different languages with this one intermediate network, which is going to allow you to route from any random specific hardware to any other specific hardware network.

The idea here is to do the same thing but with data; saying that many different kinds of protocols for moving around distributed data exists, and many different databases for addressing data exist. Let's try and pick one format with Merkle linking, because many of these things already use Merkle linking. This one format allows you to link between all of them and let you do whatever is best for your system, while still having the ability to link to everything else.

In a sense Web 2.0 is this model where programs and data live behind servers. In HTTP, when you address something with a location of a server, you are specifically addressing it behind a specific domain which maps to an IP address and so you're addressing it behind this specific location. This usually involves an organization that has some authority over the content, and so you can't really have data pointing to each other directly; you're always going through this intermediary.

That is what is sort of becoming Web 3.0. At risk of making everyone sigh - Web 3.0, right? - there is a number of developments that have been happening. Git and others were early forerunners in how you move around data, BitTorrent was even earlier, that happened in a way which didn't really change how the web works. but then Bitcoin emerged, allowing people to create transactions and move around data through a network of peer-to-peer systems that are trustless as there is no authority (sort of); but there are many different applications being built around these distributed protocols that start to look at the web much more like this.

While you're just routing programs and data, you want to authenticate data by signing it, you also want to interrelate the data to each other; and the locations and servers are really secondary, as you don't want to care about them that much. You actually care about it in the application is the fact that you have people with mobile phones, servers in the cloud somewhere, and you want the data to be able to be interlinked and change over time correctly according to some program; you also want the program to be running correctly in the right trust model. Meaning that sometimes you can't run code and you can't have somebody's mobile phone be dependent on updating the data on somebody else's account because authentication there breaks down - who gets to write what data?

But it turned out that all of these models have really good data structures that capture this kind of important set of constraints around who gets the right to wire data. You can flip them all entirely and move it to a world where you're just talking about linking data together and allowing programs to operate on that data. You just place the program in the right place according to the right trust context. But many times you can do really efficient things like moving tons of processing directly to the client.

This is not just mad science, because it is made science. People are already using IPFS, and the last time I checked, around 100,000 websites use it to do all sorts of cool things. It's already been bundled into FreeNAS which is an operating system around network and NAT storage devices. IPFS is also been used by a whole bunch of organizations and people are using it to archive all sorts of data over different organizations.

Many times, people wonder how we expect to do this with a peer-to-peer protocol, and I like to point out these web application hosting systems. Because, when you think about it, think about how many servers and machines go into serving one HTTP request today.

There are sometimes many different layers that you have to hit. There are several DNS servers, you have to talk to CDNs and to specific routers that will push or request to a specific web server; which will then forward to and proxy into a different web application server, there might be multiple of them, there might be all these microservices talking to each other, and then you're talking to the databases behind that. And so you are really talking about dozens of machines already, that are usually run by one organization, such as Amazon or other cloud systems.

In reality, most of the times, you're doing these requests and finding out that you already have the data. So there is nothing new, and it is kind of really silly, when your application still breaks down and doesn't work when you lose connectivity to the backbone.

We also have this enormous expansion of databases and different ways of looking at data and storing data and retrieving it. What IPFS is suggesting is to open up these databases and instead of treating them as these black boxes that we just pointing data to, we take into account the programs and the data structures that represent these databases, port them entirely onto the web, and allow a lot of different applications to come together to form these services.

And you can imagine something that you store in Redis or Cassandra being actually the same data structure, the same data model that is pointed at by two different indices. But it's really the same data, not only the same bytes that you're putting around - but it's actually the same reference to the data, the same link. So you can hand that out to people and they can know that we already have something.

So how do Merkle links work? So, this is how HTTP works, you have a domain name pointing to a location. Even if other people on the web have that exact file, it doesn't matter and you still have to go to that node and pull down an image, right. So the idea is why can't we just use hashes as names and address the content through these hashes; what if we map names directly to the content itself?

What this means is that anybody* in the network should be able to serve this to you, and anybody in the network here is - there's an asterix there, because you may not want anybody in the network to know that you're retrieving certain files, or you don't want to be served by certain sets of people, so everybody in the network is convolved by what your peer-to-peer system that you're using is actually doing. And there are certain sets policies involved in that.

A Merkle link is the basis of IPFS, it gives you an immutable reference to an object and it looks like a regular HTTP link. We still do allow the scheme identifiers, although there is a good reason we don't want the scheme identifiers as we want to be able to mount the whole thing in Unix. When the web introduced scheme identifiers, it didn't allow you anymore to mount the web into the file system without changing the identifiers. So this rift happened, and the data in the web and the data in your file system became two separate things.

We're endeavoring to make sure that this web that we're making works entirely within file systems, so that you can actually mount it as a file system in your kernel and write applications that do read-write operations on those. Interesting thought.

This gives you an immutable link, and the basic idea behind is using a hash to retrieve an object and that object has links. This `QmW98pJrc6FZ6` is actually a shortened version of a longer hash; this name allows you to retrieve some objects that in it has a set of names mapped to other hashes. In this example, you look up `foo` and you would follow all the way down until you find `baz.png`.

An immutable link allows you to reason about the content in a better way; if I give you a resource with this immutable permanent link and you download it today, you will never have to download it again. If you cache it, you never even have to check if it changed at all. This is how Git is so powerful, how it is able to reason about the large amount of content that is distributed across peers and do fast replication, as you don't have to pull down lots of data.

But immutable links have a problem, and that is if you change the content then the change will go all the way to the root and you end up with a different hash. Thus, we must have an immutable link, and we must have mutable links. We achieve this with something we call Mazieres links. I'll describe those later on. At the end of the day, you must have human readable names. People always say "Oh, that hash looks horrible, how could you suggest the web turn into this". Of course not. You still want human readable names at the very top. But you want those human readable names to have very reasonable ways of understanding when that has changed and when people have to go and check if there has been an update.

For completeness, an IPFS node has a PKI based identity, so public private keypairs that you can store in a graph. They store parts of this huge graph of objects that can be run in servers, they connect to each other, they get pieces of the graph from each other, and they can also be embedded in applications. So there is a possible implementation of IPFS, that you can put inside an application and use it as you would in an HTTP client or something.

Ok, so, this was a compressed version of all the different pieces that form IPFS, but now we're talking about the more interesting things about IPFS; all the pieces that you need to make IPFS work. These elements are Merkle links, IPLD which is basically JSON plus Merkle links, Mazieres links and how they work.

Merkle linking comes from Ralph Merkle's paper that was published a long time ago. It wasn't actually about Merkle links, it was more about how do you distribute signatures efficiently.

You probably are most familiar with Merkle linking through Git. This is a Merkle tree but you can also describe it as a Merkle dag, a hash chain or a hash tree; there are millions of names for this type of data structure. The basic idea is that the objects in between are linked with these hashes, and when you create a new commit in git, you add objects to a graph and you now have a different hash that you can use to crawl and find all the objects you want.

In the “good old days”, CVS and SVN ruled the world with this model of centralization around version control and if you were working and had to check-in some code and suddenly your connection to the central server fell apart, even though you work close to other people, you still couldn't work at all; you couldn't even commit yourself or commit to somebody else to change and exchange objects. If the central server went down, nobody could work! You were totally hosed.

In Git, and in many different control systems - it wasn't just git, there was Monotone and Mercurial and so on - had the idea of saying: hey, let's make every single node here a peer in the distributed system, have all of them with have their own repository, and do versions through them. And all of these three use Merkle Linking, and allow you to move around date through any kind of repository in a very nice way. So, if you part of the network gets disconnected, honey badger doesn't care. And if the two central servers fall apart or something, again, you can still work: honey badger don't care.

The whole point was to forget about this whole model of centralization and allow the data to be manipulated by other people and just have a replication protocol that enables changes to sync over time.

This is what IPFS is doing, but for the entire web, so you can replace "the central server" with "the web application server". In general it is good to have a centralized architecture because everything is easier to think about, but there are failure cases that you want to deal with and that's where the distributed notion comes into play.

This is what I call hyperspeed, because sometimes you already have the data and you don't even have to check if the data has changed. In a way, you are able to cheat the speed of light as you're not actually moving anything. It's also hyperspeed because hyperlinking - there you go.

You're probably familiar with Merkle trees from this kind of data structure, this is what a Merkle tree originally was - but there are many other data structures that use Merkle linking; such as Plan9 (with the two file systems Fossil and Venti), there was ZFS which used checksum - I don't know if they were SHA, might be md4 or md5, need to check this.

Bitcoin is a huge, massive Merkle tree, but not exactly a Merkle "tree" because it is not balanced. This is why this data structure has different names, like Merkle DAG, hash chain, or hash tree; because Merkle trees specifically meant a balanced tree where the intermediate nodes were just hashes. But when you look at Git, it is very different -- because Bitcoin is a huge hash chain, like Ethereum, which is another blockchain as well.

So IPFS is like this web of Merkle links, a huge Merkle forest where, instead of having all these Merkle tree systems only speak to each other, we have a layer that allows all of them to talk to each other and allows links to be traversed across and adding the entire web on this. Intuitively, that's what it is.

A domain mapping to content is just a file system, and we use the hash to pull out an object and then resolve `foo` within that by linking with hashes all the way down; we are actually doing this through a Merkle link.

Let me talk about what we call IPLD. So taking this idea of Merkle linking and creating this general data structure for hash chains. Let's just have one thing that makes sense for everyone, and enable us to represent our objects with it.

These aren't actually files per say, they aren't POSIX files, these are are specific objects in IPLD that represent files. So when you add something to IPFS you get a huge set of lines and all these hashes represent specific objects in IPFS; and this a graph visualizing this example. But when you actually retrieve one of those hashes, what you get is not exactly a file but you rather get this object that represents the file; with things like sizes, mode, file names, etc. And you can also get it in protobuf, and so on.

And IPLD is what we're calling a “thin-waist” Merkle DAG format and it's a way of getting Merkle links, a way of traversing paths through Merkle links.

There are many interesting questions there - do you use ASCII, do you use UTF8, and so on - and there is a whole set of questions around how do you serialize this and how do you define what format you're going to use to serialize it. Everybody has their own personal favorite serialization framework, and they don't want to use other peoples. But then, the problem is which canonical serialization framework you use so that the hashes make sense.

If today you have something in JSON that looks like this, this data lacks context. You have a user and followers, you think that this is maybe Twitter because of the “@” symbols, but also could be GitHub or any other one, it could be a whole bunch of other stuff. What is this?

But when you turn this into IPLD by creating these links that have hashes in them, you give context to the data forever. Thus, wherever you retrieve that object, you can always find that other link and so you don't need to resolve the name though something else.

Actually, we're not giving up much as people don't actually use this nice JSON looking dictionary. We actually use account numbers because at some point somebody would want to change their username; and so you can't actually use a username but rather use numbers or an ID. So we're not giving up that much, in fact, we're only changing where you put identifiers to create a better representation. You can also represent them in YAML or so on.

So IPLD is this format for representing these data structures and it is not actually stored in JSON but in CBOR; which is a JSON for IoT. You're able to retrieve and follow links across these which enables you to resolve through. In a JSON document, you have a property “mlink” and you're now able to resolve through that property transparently.

So imagine having one massive JSON tree for all of your data, but in reality it's sharded across a whole bunch of small objects that you're pulling out. So here I'm showing how you do a path traversal through and pull out different objects. Cool. You can also, for example, add properties to theses links, do file systems, modes and versioning data structures this way. You can do whatever you want.

This is what allows you to do this Web 3.0 world. If you start representing you data structures this way, and it's made explicitly very flexible - you can just take whatever JSON data structure you already have, take these links, add an additional key value that does the Merkle linking, and now you get this possibility of doing Merkle linking.

You can do web app data this way, represent users and following relationships, indexes in this data, and then you can authenticate it. Here's the crazy thing. You can take this massive graph that represents some user data at some point in time, then sign it and just sign the very top hash, and you now have authentication across the entire graph; this allows you to verify very easily and put authentication on massive amount of data.

People are always thinking about legal records in this sense, because all of the blockchain people want to put all of their legal records on blockchains. You don't actually put the data on the blockchain, you just put a link to IPFS, which is what people are already doing.

This gives you this fabric of really hard-to-cut data that makes sense all together and that has integrity checks, validation and authentication all the way through.

IPRS is where we store the records and DNS is this valuable system where you could just enter any records, and everybody uses a TXT record to just put in random things. In reality, you just have a small object with a type, a subdomain, value, and a TTL.

We turn this into an object in IPFS and now we can create these simple records that you can sign to get security directly and to make sure you always find them. You can now also point to other objects, and create pointers to the keys that are used to sign these records; so just by finding a record you have the hash that represents the key and it allows you to pull out the key as well and check the signature. It turns from moving around a lot of data into just moving around one hash and these specially constructed records enable you to reason about other pieces.

There is this notion of validity around IPFS records, where you might have specific ways of describing when a record is valid. TTL works in certain contexts, when you can reason about time in seconds to synchronize machines, but if you go anywhere underneath that into milliseconds or microseconds, you're hose, that's not going to work and so you need another way of understanding if a record is fresh.

There are also problems around censorship, when you don't know if the record is the newest one, or if the record suddenly disappears and you no longer are able to see the new ones, and when you don't know if the other person is actually trying to communicate, or if they don't care anymore. This is often times an application specific thing, so these records leave that up to the user.

I promised mutability: so how do you allow mutable links? This blue link in the top is the link that you can check on the system over time to see what the latest value is, you can think of it like a Git branch. The bottom objects are the objects inside Git and the branches are these mutable pointers.

The way you get this is with what we are calling Mazieres links. This comes from a David Mazieres' paper, I think his PHD thesis, but this isn't that but a side paper he wrote, and it has a wonderful title “Escaping the Evils of Centralized Control with self-certifying pathnames.”

At the time, the point was that you had the CSC system emerging and many people wanted to end their domain system coupled with the CSC system. You had this centralized gatekeeper that didn't allow you to get names that were trustable unless you paid the money. This is crazy. In reality, a name is just an identifier, so if we give up the nice consensus-based human readability for a second, and you just say I am going to give you this ugle name, you can turn public keys into names, and the value of the name can be signed by the private key corresponding to the public key, and you now get self-certifying paths.

To create a link between a public key and content, all you have to do is create a pointer and sign it with a private key that corresponds to that public key. Now, if I have the blue link “QmYJPtosPTfoC”, I can take it, resolve for it in a peer-to-peer system, and pull out a signed record that is “QmW98pJrc6FZ6.” This allows me to resolve through the value through immutable naming that is private key based. All you have to do is create private keys and you have as many names as you want. Now the downside is that it doesn't have nice readability but we can fix that. We talked earlier about how you can fix that.

In IPFS. we use what we're calling Mazieres linking this way, but these pointers are just IPRS records that I've described before, you have a notion around the validity, you have a signature and you can pull out the keys.

DNS. So, DNS is the way we achieve human readability. You could abuse it and put something in a TXT record, we just put in there what we call a DNS link, and that is just a path to some object in IPFS; and that could be IPFS or IPNS.

The [ipfs.io](https://ipfs.io) website, right now, has this DNS link, and it points to content so you can resolve the content for ipfs.io this way by doing just one look up and that's it.

The lookup is just 120 seconds, which is pretty short, but you usually can see the content up to 5 minutes and you don't want to have a website that it takes 5 minutes to update. This is where the Mazieres linking comes in, which you can do as fast as your connection to other peers go; and so you can use a different type of system, do a DHT and it can get you close to 1 second resolution times.

You can also do pubsub through a set of of peers you trust and you can get down to milliseconds resolution time; which is where how you actually get performance out of this.

Git versioning is the way we do versioning and it is similar to how Git does it, we just have Git commit structure that is again just IPFS objects. I mentioned files earlier, and again we take out of Git's book and we represent directories and files the same way as objects, but differently from Git, we acknowledge that the files can get big and that sometimes you want to be able to chunk files. So, we take really large files and we chunk them into smaller pieces; when we do that there are many different kinds of chunkers that come into play.

You can use some crypto-based chunkers that give you roughly the same kind of chunks. You can feed different versions into it and get mostly the same chunks. Or, if you know something about the data you can chunk it yourself; for instance, for a video application you can reason about the chunk, figure out that the chunks should come with keyframes, then you take entire keyframes and a few deltas and you put them into chunks. You can reason about data structures this way.

If we zoom in the graph you saw earlier, we see the `tree-in-cosmos.jpg` is actually a file that is big and that has many objects underneath this, so it's charted.

Alright, so structures on IPFS. I have four minutes to cover structures on IPFS. This will go quickly. We already covered unixfs, and commit, so let's jump to CRDTs.

CRDTs is the future and if you don't yet understand CRDTs, please go and read about them as it really is the future and it really makes you reason about lattices and mutable state in a much better way. You can take all these lattices and just put them straight into IPFS and that's like the short end of the stick, you can just do that. Also, when I googled lattices, I got this picture, so that's really all I am going to say.

Keychain is a data structure that is built on top of IPFS to basically do PKI and put all of the random crypto artifacts that you get out of cryptographic operations directly in IPFS.

One example, is following a keycahin. This is why it is called Keychain. In the CA system and so on, you have the idea of certificates that are signed by key, you find that key that has a certificate related to it and that is signed by some other key. You can follow this massive chain and at some point you get to some root that is actually hardcoded in your machine; this is how you can reason about the thing being trusted.

You can take all these objects that represent the keys themselves and dump them straight into IPFS, so you can walk entire graphics like this way through the same system; and as you've already pulled down the objects, you never have to check them again. And the nice thing is that you get a JSON-like data model instead of these crazy, archaic formats around defining keys and certificates. It works for the CA system, but it also works for the Web of Trust, you can also do Web of Trust style reasoning about certificates this way as well.

Persona - didn't get an image for this - is a system that other people are building around identity management on IPFS, they are putting people's profiles, their keys and relationships directly in IPFS.

Hey! Websites! So, it turns out that, the system that is designed to upgrade the web is really good for websites, who would have thought. We have many different and really simple static websites that you can directly import in IPFS. It's already evolving and interesting applications are making use of this mutability function that IPFS gives you, to create completely distributed applications.

Video players? Super simple to create using JavaScript and HTML in IPFS. People are putting viewers for legal documents, they have made an imgur style clone, you can retrieve images, and keep going, and get random images. People are sharing 3D models this way. This is one of my favorites; this is the only image that is not already a live IPFS website - people are working on taking MineCraft, or an open source version of Minecraft, and linking the worlds through IPFS by storing the data on IPFS and then linking two different worlds to different private keys; and so your world is governed by whoever has that private key.

People are also using it to store documents, blogs and a whole bunch of stuff. The last one is the most exciting, where you take a whole website and put it on IFPS, then you retrieve through it and you have data locally. But all of the data that you change and which goes through that website is generated and pulled directly in IPFS, so you can have an intermediate website where you still use this centered API that we use today and only move you static app on IPFS; or you can go the whole way and make the all the content moving around through IPFS.

That's where it gets interesting, because these websites are totally distributed. Once you move them into a location, they will never have to talk back to whatever central authority it's related to and they can operate in totally distributed.

Somebody did this for 4chan-style board on IPFS, where they voted with Ethereum I think, you have to pay Ether to register a name and then have the entire board this way.

We are also working on putting entire containers into IPFS so you can represent the whole graph this way. So cool. I'm out of time, so, the last one is: You can also put whole blockchains into IPFS and link them.

So now, you know what IPFS is, what the data structures inside IPFS are, and some of the interesting things that people are doing on IPFS. The last part was much smaller because of timing. But, cool. Thank you.
