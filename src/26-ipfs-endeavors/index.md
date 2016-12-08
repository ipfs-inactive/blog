---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: 26-ipfs-endeavors

breadcrumbs:
  - {name: "26-ipfs-endeavors", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2015-05-05

# this is the Title
title: IPFS Endeavors - An overview

# this is the name of the main author(s)
author: Juan Benet

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

In October, Juan Benet sat down to do a quick overview of the main IPFS endeavors. This video runs through the different projects; a transcript is provided below.

<iframe width="700" height="400" src="https://www.youtube.com/embed/D1u7m_XzLTA" frameborder="0" allowfullscreen></iframe>


I’m just going to go through a bunch of different projects really quickly mentioning them. This is mostly to refresh people’s minds about a bunch of things that we have, that we are working on that are interrelated. This is a moment for us to synchronize and pull back, step back, and look at all the different things that are going on.

So, at the highest level, we have [the IPFS Project](https://github.com/ipfs/ipfs). Itself it is the biggest thing we have, out of which a lot of other smaller projects are being created. A number of those smaller projects have graduated into becoming their own organizations.

Then, we have the [go-ipfs](https://github.com/ipfs/go-ipfs), which is the Go language implementation of IPFS. It’s the main one. It’s the one that is most widely used and it’s the one that people rely on.

There’s [js-ipfs](https://github.com/ipfs/js-ipfs) which is the implementation to put this entirely on the browser. It can also run on Node, of course, but the main goal is to get it working entirely on the browser so people don’t have to install anything.

This implementation is also what can go into browser extensions directly. There are ways of getting browser extensions potentially to work with go-ipfs, but it’s a lot easier if it is in javascript.

There is a set of [IPFS APIs](https://github.com/ipfs/js-ipfs-api). There is one in Javascript. There is [one in Go](https://github.com/ipfs/go-ipfs-api). There is [one in Python](https://github.com/ipfs/py-ipfs-api). There is a bunch of others and these are the way that people consume and use IPFS nodes inside of their applications programmatically. It’s a pretty important user-facing pieces.


There is [libp2p](https://github.com/libp2p). It's a large project on its own. It's a large peer-to-peer network stack. It's the bottom half of IPFS. It's all the peer-to-peer magic heavy lifting. This is a large project on its own, with a lot of smaller pieces. It is it's own huge stack of protocols. There's lots of different little small efforts around it, and there's a ton of potential for this on its own. It has two implementations so far, [one in Go](https://github.com/libp2p/go-libp2p) and [one in Javascript](https://github.com/libp2p/js-libp2p), and there will probably be more over time as interests gathers around this.

You can see here, for example, this is a really cool listing of all the different modules and kind of work where they're at.

There's [IPLD](https://github.com/ipld/ipld) which is another project on its own. It's the way to represent Merkle-linked data structures or authenticated structures. There's a lot of efforts within IPLD. There is [cid](https://github.com/ipfs/cid), which is the way that we point to content. There is [a Go implementation](https://github.com/ipfs/go-cid). There is [a Javascript implementation](https://github.com/ipfs/js-cid). There is a Python implementation as well that is in heavy use by another group called [Bigchain](https://www.bigchaindb.com/).

There is a [multiformats](https://github.com/multiformats/multiformats) project, which is a set of self-describing values to allow people to not depend on all decisions. This is like promotes agility, increases interop between different systems and avoids lock in. There are several sub-projects within that. There is [multihash](https://github.com/multiformats/multihash), [multiaddr](https://github.com/multiformats/multiaddr), [multibase](https://github.com/multiformats/multibase), [multicodec](https://github.com/multiformats/multicodec), [multistream](https://github.com/multiformats/multistream), [multikey](https://github.com/ipfs/specs/issues/58), [multigram](https://github.com/multiformats/multigram)... There are a few others that are in the works. These are all pretty small specs, but they are pretty important to get right. They each have their own set of implementation.

Multiformats is a large effort in terms of a lot of different little pieces. Each one of the pieces is not that big but there is a lot of work that needs to be done to write implementations of all these things. There's several of these. Some of them are still in, "Hey, it's an idea!" phase. Others are ready for [IETF standardization](https://www.ietf.org/).


There is [Orbit](https://github.com/haadcode/orbit). Orbit is a large project, as well. It's becoming its own thing, and will probably get it's own organization at some point. And, this is a chat application and the data structures and database piece of making a completely distributed application using CRDTs and IPFS.


Orbit on its own is a standalone application that you can load either on [Electron](http://electron.atom.io/) or Javascript and potentially other interfaces that you can use to have a real time completely distributed peer-to-peer chat written on top of IPFS using a CRDT distribution model. It has a bunch of sub-components like [orbit-db](https://github.com/haadcode/orbit-db) which is the database thing that I mentioned. It has things like a [text ui](https://github.com/haadcode/orbit-textui). It has things like [ipfs-log](https://github.com/haadcode/ipfs-log) which is a piece of orbit-db and it has a number of other sub-pieces.


There's the [IPFS Gateway](https://github.com/ipfs/go-ipfs/tree/master/core/corehttp) which right now is embedded inside go-ipfs which we want to pull out into its own thing. It is a project on its own, an endeavour on its own, and this will allow people to set up their own gateways potentially easier and will enable all accounts and tools to be run.


There’s [IPFS Station](https://github.com/ipfs/station), which is a distribution of IPFS meant to be installed into a desktop and so, it bundles at go-ipfs node with like a menu bar icon and a web UI. It's like a user facing product. Right now, it hasn't been worked on for a while, but it is something we care about.

There is the [webui](https://github.com/ipfs/webui) which is just a webapp that can be loaded from any IPFS node with a web browser and would be bundled within station and so on and lastly, to look at an IPFS node and to understand what’s going on with it. It's like a web console to it.

There’s [IPFS cluster](https://github.com/ipfs/ipfs-cluster) which we talked about a bit, and here's some images that describe what it would be like. The idea is to bind together a set of IPFS nodes to form a larger IPFS node. This is for replication purposes or sharding or things like that. Scaling IPFS to large numbers of machines. [This is the issue](https://github.com/ipfs/notes/issues/58) where lots of conversations got defined.


There’s [IPFS distributions](https://github.com/ipfs/distributions), which is [the website](https://dist.ipfs.io) that we use to store and list and allow downloading of all of the different kinds of projects and things we ship. Here it is on the web. You can see it - there's a number of things that you can download. It has the smart button that detects your OS. It has all the different download links and you can see all the different versions of the tool. You can download whatever you want.

This is pretty important for any kind of serious dependability of a project. This is of course, entirely distributed. The distributions site works on top of IPFS, so you can take it completely offline and run it yourself.


[Starlog](https://github.com/ipfs/starlog) is an effort to try and think about blogs on top of IPFS. It hasn't seem to work for a long time, but this can actually be rebased entirely on top of Orbit and a lot of really cool stuff can happen.


There's [ipscend](https://github.com/diasdavid/ipscend) which is a way of versioning websites and it's a tool around helping you version and ship websites using IPFS. There's a lot to that. I know a number of people who are depending on it.

The [infrastructure project](https://github.com/ipfs/infrastructure) which is running all of the gateways and other nodes that we run to help the networks for bootstrapping, gateways, and other kinds of things. There's a lot of interesting things that come out of this. Other people are using or can use this to build their own set of infrastructure out.


There's [XTP](https://github.com/libp2p/xtp) which is still kind of like in idea phase but it increasingly, from a number of conversations, it sounds more and more important, which is the ability to enable testing and using of other transports. XTP stands for "external transport protocol." It's just a way of taking a transport implementation and loading it as a different process, so that we can try out things like [quic]() or [UTP]() and so on. It's pretty integral to [libp2p](https://github.com/libp2p). There's a small implementation emerging but it's still doesn't work.


There's [GX](https://github.com/whyrusleeping/gx) which is a package management tool that's pretty general. It is the set of tooling and plumbing on top of IPFS to enable package managers to be built and it has a set of common things that you might have in a bunch of different package managers there, and there's things like [gx-go](https://github.com/whyrusleeping/gx-go), which is the Go specific package manager on top of GX. This governed how you do, like how do you deal with the Go packages in GX?

There's other possibilities for GX -- gx-js, GX-bin which is for binaries, gx-c potentially and so on.

We were talking to people recently and they were interested in writing a GX-C++, for example, because that doesn't really have a package manager.


There's [npm-on-ipfs](https://github.com/diasdavid/npm-on-ipfs) which used to be called registry-mirror and this is the effort to put the NPM registry on top of IPFS. There's other projects that's around this. There's INPM - everything stays - and a couple others that are out there and they are all related with the same idea which is make the NPM registry much more resilient using IPFS.


There's [project-repos](https://github.com/ipfs/project-repos) which is just this huge listing of all the different projects that we have going. Here is this large dashboard with all of the repositories that we have and some testing of things whether it has run the files. This is a great thing to turn green, so like we should make it a goal to get this page to all be good.


There is the [newsletter](https://github.com/ipfs/newsletter). This is a newsletter that we write with news of the project and how it's going and we update people with this. We haven't pushed one out in a while but it's a lot of really good stuff there. There's a blog issue in this newsletter. The newsletter gets posted to the [blog](https://github.com/ipfs/blog). You can look at blogs [here](https://ipfs.io/blog/). We do things like ship out the releases through that and so on.

There is the actual websites, [the IPFS website](https://ipfs.io) and there's a number of other websites that we run. You can view those individually. There's a website for each of the major projects.

There's probably a lot of other projects that I didn't mention but this is a sample of a lot of them and at least the major ones I covered unless I'm missing something like totally obvious that I’ve not mentioned.

There's a larger list that I link to from [that pad](https://public.etherpad-mozilla.org/p/a1cOc3rc7j) which is this large endeavours list. This is a large endeavours list that we made last quarter. People can look at it from the pad. It has all sorts of stuff around libp2p and IPFS and ipld and so on. Each one of this is individually like its own thing.

Cool. Think I'm done.
