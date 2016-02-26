---
date: 2016-02-23
id: 10-static-web-publishing-with-ipfs
template: tmpl/layouts/post.html
baseurl: ..
breadcrumbs:
  - {name: "10-static-web-publishing-with-ipfs", link: "./" }
tags: publishing, web, app, publish
title: Static Web Publishing with IPFS - Simpler and Decentralized
author: David Dias, Juan Benet, Richard Littauer
collection: posts
---

# Static Web Publishing with IPFS - Simpler and Decentralized

![](./img/static-web-publishing-with-ipfs.png)

> "I've always believed that everyone involved in "publishing" should know how to set up a server." -- Joi Ito ([source](http://joi.ito.com/weblog/2016/02/21/a-challenge-fro.html), [archive](https://web.archive.org/web/20160223200231/http://joi.ito.com/weblog/2016/02/21/a-challenge-fro.html), [ipfs](<ipfs-link>)) TODO

Setting up a server is hard. You have to be a sysadmin just to host a single web page. Even with a fully functional website, more issues pop up: [websites go down](https://blogs.loc.gov/digitalpreservation/2011/11/the-average-lifespan-of-a-webpage/), [hosts get attacked](http://arstechnica.com/security/2015/03/github-battles-largest-ddos-in-sites-history-targeted-at-anti-censorship-tools/), [services shut down](http://arstechnica.com/business/2009/04/geocities-to-close-after-15-years-of-aesthetic-awesomeness/), [links rot](https://en.wikipedia.org/wiki/Link_rot). It's 2016, and publishing even a static web page is way too difficult.

Publishing web content has become very complex, confusing, and [precarious](http://journalistsresource.org/studies/society/internet/website-linking-best-practices-media-online-publishers). Even publishing _static_ web content -- simple webpages, images, videos, or documents -- is way harder than it should be. The "easy way" means depending on services that may change things under you or shut down completely. Hundreds of millions of people have been served, sometimes overnight, with a "Sorry, we're going in a different direction" message. The lucky ones get a dump of their data and a short timeline to "get their affairs in order" and rehost their content. This means hard work rebuilding the site elsewhere, and -- for those who were not [extremely careful with domain names and URLs up-front](https://www.w3.org/Provider/Style/URI) -- attempting to update soon-to-be-broken links all over the web. Like changing mailing addresses after moving, most people resign themselves to some things breaking forever.

The alternative -- self-hosting your content on infrastructure you control -- is not much better. Only the zealous few manage [their own hardware today](http://www.instructables.com/id/Set-up-your-very-own-Web-server/?ALLSTEPS). And those who compromise by hosting their own websites on virtual private servers (VPS) run into a myriad of complex and brittle processes. Even expert web developers can struggle with the complexities of setting up servers, replicating across regions, adding load-balancers, securing machines against hackers, responding to sudden problems, and the constant grind of long-term maintenance. All of this requires large amounts of domain specific knowledge that newcomers find very difficult to use.

> "I just wanted to publish my personal website!"

It is not a mystery why most people use Facebook, Twitter, Medium, and Tumblr to publish and host their public personas, their blogs, and all their thoughts. Web publishing and [digital preservation](https://en.wikipedia.org/wiki/Digital_preservation) are hard.

#### IPFS makes web publishing and hosting easier

This is where IPFS -- the permanent web -- comes in. We've been imagining and implementing vastly easier ways to publish, host, and maintain web content, without sacrificing control or independence.

> - What if it was way easier to publish, host, and maintain web content for the long-term?
> - What if links didn't break, even when moving hosts?
> - What if you could count on your links _decades_ from now, with various versions still accessible?
> - What if "hosting" did not also mean "dependence on disappearing services"?
> - What if cloud infrastructure worked more like the power grid, where switching providers is transparent?
> - What if _you_ controlled?
> - What if names (like DNS domains) mapped straight to content, not servers?
> - What if we didn't _have to_ rely on centralized naming (DNS)?
> - What if webapps and websites worked offline, or in local area networks?
> - What if -- the kicker -- managing all this was as simple as tweeting?

These are all hard problems, and full solutions will take time to build. We don't have everything working yet, IPFS is very young -- we're implementing fundamental infrastructure and laying the groundwork for user-facing applications. But we have already put dents into many annoying problems, and this post shows off some of the tooling we are building.

You can find out more about what gives rise to these problems in general, and how IPFS can solve them through these media:

- Kyle Drake's post [_HTTP is obsolete. It's time for the distributed, permanent web_](https://ipfs.io/ipfs/QmNhFJjGcMPqpuYfxL62VVB9528NXqDNMFXiqN5bgFYiZ1/its-time-for-the-permanent-web.html) gives a fantastic overview of the fundamental problems with web hosting through HTTP,  how IPFS improves things, and how [Neocities](https://neocities.org) can help you host your web content in the long-term.
- Juan Benet's seminar talk [_IPFS: the permanent, distributed web_](https://www.youtube.com/watch?v=HUVmypx9HGI) digs into these and other problems plaguing the internet, gives a technical deep-dive on how IPFS solves them, and discusses the IPFS Project itself.



## Tutorial: Publishing a static website to IPFS

The rest of this post is a tutorial on publishing static web content with IPFS. We think this process is still too rough -- we want to simplify much more and build much nicer user-facing tools. But IPFS is already improving people's experience with web publishing, so it's worth writing a short tutorial on how to use these early tools.  We will have nice drag-and-drop applications later on; this post is for developers and users familiar with:

- the commandline,
- installing software binaries, and
- setting DNS records (optional)

The tutorial below guides you through the process of:

(a) publishing a small static website to IPFS with [ipscend](https://github.com/diasdavid/ipscend), (b) backing up the content in other IPFS nodes, and (c) pointing a domain name to use IPFS. All IPFS nodes can view, cache, back up, and serve the content. This means that all the version archiving, bandwidth sharing, and offline-first properties of IPFS apply. Even better, the entire process works with standard HTTP web browsers, too.

We will work on simplifying these processes even further, but for now, we hope that this is enough to help many people to re-host their web content in easier, more resilient, and permanent ways.


**Tutorial Steps**:
- [Step 0: Installing `ipfs` and running a node](#step-0-installing-ipfs-and-running-a-node)
- [Step 1: Prepare the static website to publish](#step-1-prepare-the-static-website-to-publish)
- [Step 2: ipfs add to publish a website at an IPFS address](#step-2-ipfs-add-to-publish-a-website-at-an-ipfs-address)
- [Step 3 (optional): ipscend - tooling to publish your page and track versions](#step-3-optional-ipscend-tooling-to-publish-your-page-and-track-versions)
- [Step 4 (optional): human readable naming with DNS and `dnslink`, and familiar HTTP links](#step-4-optional-human-readable-naming-with-dns-and-dnslink-and-familiar-http-links)
- [Step 5 (optional): Backing up your content elsewhere (pinning)](step-5-backing-up-your-content-elsewhere-pinning)



#### Step 0: Installing `ipfs` and running a node

In order to completely understand this tutorial, you will need to have some familiarity with a terminal prompt, and to install the following software. We are working on a no-install, drag-and-drop solution, and we'll post a new tutorial when that ships.

**Required:**
- The `ipfs` program, version 0.3.11 or later. [See install instructions here](https://github.com/ipfs/go-ipfs#install).

You should be able to run `ipfs version` and see 0.3.11 or later:

```
> ipfs version
ipfs version 0.3.11
```

If this is your first time running ipfs, initialize your node with:

```sh
> ipfs init
generating 2048-bit RSA keypair...done
peer identity: QmNhhVtFkDkW3vW1J48vgVUf4t6MgY5yYBtcMg6Ys3N6Rf
to get started, enter:

        ipfs cat /ipfs/QmXarR6rgkQ2fDSHjSY5nM2kuCXKYGViky5nohtwgF65Ec/readme
```

Now, let's run the ipfs node, in a different terminal window. This should keep running in the background.

```sh
> ipfs daemon
Initializing daemon...
Swarm listening on /ip4/127.0.0.1/tcp/4001
Swarm listening on /ip4/192.168.10.172/tcp/4001
Swarm listening on /ip6/::1/tcp/4001
API server listening on /ip4/127.0.0.1/tcp/5001
Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
Daemon is ready
```

**Optional, for Step 3:**
- `node` (version 4+) and `npm` (version 2+) programs. [See install instructions here](https://nodejs.org/en/download/).
- the `ipscend` tool. Run: `npm install -g ipscend`. You'll need to install `npm`, first.

#### Step 1: Prepare the static website to publish

Let's start with the essentials. In order to use IPFS to publish and share your website with the world, you first need to have a website! For the purpose of this tutorial, we will use a simple one. Feel free to use your own, instead. Open up the terminal and create the website:

```sh
# make a directory to put the website in
mkdir website

# add an index.html page
echo '<html><h1>Hello! This is a webpage!</h1> <img src="./cat.png" /></html>' > website/index.html

# add an image. let's get the image straight from IPFS, because we can.
ipfs get -o website/cat.jpg /ipfs/QmZVLbEzkoZBMMzBsLfY4d86NFMXo1yBBhsqucd7w7VnGV/cat.jpg
```

If `ipfs get` fails, you'll need to make sure your ipfs node is running, with `ipfs daemon`, or see **Step 0** above.


**(Optional)** If you want to preview this website, you can try any HTTP server. For example, the `node-static` module (available on npm):

```sh
> npm install --global node-static
> static website
serving "website" at http://127.0.0.1:8080
```

This page is now being locally served on your machine at http://127.0.0.1:8080. Open this URL in your web browser; note that it is not yet accessible by the whole world. This is when a complex series of steps to get a machine running an HTTP server somewhere would start -- but with IPFS, there is a better way.

#### Step 2: `ipfs add` to publish a website at an IPFS address

Now we are going to use IPFS to host and distribute our static site.  Let's add it:

```bash
> ipfs add -r website
added QmajFHHivh25Qb2cNbnnnEeUe1gDLHX9ta7hs2XKX1vazb website/cat.jpg
added QmP1oQDfYUfmTwqUGNNvCDJCy46VEcwUhC1Q3JFyJm2t1N website/index.html
added QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM website
```

This added the directory and its contents recursively to IPFS. The output of the command includes all the files and directories that were added. Each entry is of the form:

```
added <ipfs-hash-for-the-file-or-directory> <original-path>
```

Sweet! now our website is available on the IPFS network! Now you can load your site on the gateway from your local IPFS node or the public gateway. Let's take the "content root hash", the hash for the "root" directory (in this case `website/`). And let's try viewing it through an IPFS gateway. By default, your local machine should be running one at port `:8080`. Try one of these in your browser:

- Local node gateway: http://localhost:8080/ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
- Public IPFS gateway: https://ipfs.io/ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM

![](https://www.evernote.com/l/AMbLFqvUqg1CiLfIbRed6GGyXF3II9c0GtcB/image.png)

Even, if the [ipfs.io](https://ipfs.io/) domain is not reachable, you would still be able to share and make your page available to other users that are running their own IPFS nodes by sharing the hash that corresponds to the latest version of your web page. This even works in local area networks without connectivity to the broader internet!

You can also retrieve the content with any other `ipfs` node in another computer that can connect to yours:

```
> ipfs get -o website2 /ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
Saving file(s) to website2
140.00 KB

> ls website2
cat.jpg
index.html
```

In a sense, we're done with the publishing step! The content has been successfully published to the network. However, this process can be further improved with some tooling. After all, manual installation of an IPFS node is still required, and we need to keep track of the hashes for the published version. That is where `ipscend` excells.

#### Step 3 (optional): `ipscend` - tooling to publish your page and track versions

`ipscend` is a tool built to streamline and enhance the experience for publishing your static web pages. It is available as a Node.js module, installable through npm. Install it by running:

```bash
> npm install --global ipscend
```

Once you have ipscend installed, you can run `ipscend` in your terminal to check that it is correctly installed and list the commands available:

```bash
> ipscend
Usage: ipscend COMMAND [OPTIONS]

Available commands:

browse      Open your application in a browser
init        Initialize a ipscend project
ipfs start  Start your a local IPFS node
preview     Preview your application before you publish it
publish     Publish your project
screenshot  View or generate screenshots for your application
versions    Check each version published
```

We need to tell ipscend that our project is a web page, as well as which folder contains the static assets that need to be served to the browser. Let's move the content into a content folder first:

```bash
> cd website
> mkdir src
> mv index.html src/index.html
> mv cat.jpg src/cat.jpg
```

Now, let's use `ipscend init` to create an `ipscend.json` file, which serves as the version manifest:

```sh
> ipscend init
This utility will walk you through creating a ipscend.json file.
Path of your Web Application (project)? (public) src
```

ipscend created an `ipscend.json` file with some metadata about the project:

```sh
> cat ipscend.json
{
  "versions": [],
  "path": "src"
}
```

Ok, we are almost ready to publish our first version. Although we already installed an ipfs node, ipscend comes with batteries included: if you're using `ipscend`, you don't need to install IPFS as a separate step. You can simply run `ipscend ipfs start`:

```sh
> ipscend ipfs start
starting IPFS daemon (this might take some seconds)
IPFS daemon has started, you can now publish with ipscend
```

If this fails, it means you already had an `ipfs daemon` running, which is fine.


Now we are really ready to publish the first version of your ipscend website. Run `ipscend publish`:

```sh
> ipscend publish
Published src with the following hash: QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
You can access it through your local node or through a public IPFS gateway:
http://localhost:8080/ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
http://ipfs.io/ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
```

That's it. Your first iteration is now published on IPFS! You can see that this was registered on our `ipscend.json` versioning file:

```bash
> cat ipscend.json
{
  "versions": [
    {
      "hash": "QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM",
      "timestamp": "2016-02-23T00:26:56.366Z"
    }
  ],
  "path": "src"
}
```

This is like very simple version control on top of IPFS. You'll see later how we can extend this to reach git-like levels of versioning, and beyond. There are also plans to use git repositories directly.

#### Step 4 (optional): Human readable naming with DNS and `dnslink`, and familiar HTTP links

You are probably thinking:

> Ok, that was quick and easy to set up and publish! However... hashes are so ugly, and typing them is just not an option!

You are right. And there is a way to improve that part of the experience, to completely avoid seeing or typing hashes. We do this by using _naming systems_. IPFS supports several, though this tutorial will just use the most familiar: DNS. We made a tool called `dnslink` that makes it easy to publish your IPFS web content at your very own domain name. And we run a Public HTTP-to-IPFS Gateway that can serve HTTP websites at your own domain names transparently.

Good examples where this tool is already being used include http://dist.ipfs.io, and even https://ipfs.io itself. You might have not realized as a user, but these websites have been served by IPFS all along! Two related but separate things are going on here:

1. DNS naming using and the `dnslink` protocol
2. Using the public IPFS gateways to serve content

##### 4.1. DNS naming using the `dnslink` protocol

The first part uses DNS to make the following `/ipns/...` "named-links" resolve to `/ipfs/...` content. Check it for yourself. Run the following `dig` commands to see the DNS `TXT` records at those domains:

```sh
> dig +short TXT ipfs.io
"dnslink=/ipfs/QmNu7McSMSi3vp6avTZrgW6MKdgeDkGjJGY6W5zPjnh9Xg"

> dig +short TXT dist.ipfs.io
"dnslink=/ipfs/QmdEgg4GVCgzLyW2hRDedFfhc2Tb92awpvb4wrXUWLpGos"
```

These are "dnslink" `TXT` records -- of the form `dnslink=<path>`. You may see different hashes here; that's fine, it means we are serving a new version. The records are used by IPFS nodes when resolving _names_. The Name System IPFS nodes use (IPNS) supports DNS naming using the "dnslink" protocol, which means that when IPFS nodes encounter a link like this:

  /ipns/dist.ipfs.io/go-ipfs

they must resolve it to a content path. IPFS nodes use DNS to search for `TXT` records at the domain name `dist.ipfs.io` of the form `dnslink=<path>` (as shown above). The value of `<path>` (in this example `/ipfs/QmdEgg4GVCgzLyW2hRDedFfhc2Tb92awpvb4wrXUWLpGos`) is then substituted (replacing `/ipns/dist.ipfs.io`) as the new root of the content, resulting in this new path:

  /ipfs/QmdEgg4GVCgzLyW2hRDedFfhc2Tb92awpvb4wrXUWLpGos/go-ipfs

This is a standard content path as we've seen before, and IPFS nodes simply retrieve and serve this content. Note that IPFS is smartly "rebasing" the remainder of the path, meaning that the `.../go-ipfs` part from the original link is added on to the "content root" of the domain. This enables you to serve arbitrarily large websites using just one domain name, with one `TXT` record.

Going back to our examples:

- `/ipns/ipfs.io` serves (resolves to) `/ipfs/QmNu7McSMSi3vp6avTZrgW6MKdgeDkGjJGY6W5zPjnh9Xg`
- `/ipns/dist.ipfs.io` serves (resolves to) `/ipfs/QmdEgg4GVCgzLyW2hRDedFfhc2Tb92awpvb4wrXUWLpGos`

You can check these for yourself, but the names may point to new versions by the time you see this. The specific version links should still be accessible though! Try these links:

- latest at `ipfs.io`: https://ipfs.io/ipns/ipfs.io
- frozen version: https://ipfs.io/ipfs/QmNu7McSMSi3vp6avTZrgW6MKdgeDkGjJGY6W5zPjnh9Xg
- latest at `dist.ipfs.io`: https://ipfs.io/ipns/dist.ipfs.io
- frozen version: https://ipfs.io/ipfs/QmdEgg4GVCgzLyW2hRDedFfhc2Tb92awpvb4wrXUWLpGos

These links should all work at your local gateway, too: `http://localhost:8080`.

You can try doing the same with your own domain name. Now that we've got the website's hash, we can bind this hash to a human-readable domain name by creating a "dnslink" `TXT` record (of the form `dnslink=<path>`) like this:

```
dnslink=/ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
```

Unfortunately not knowing your particular DNS name server, we cannot give you specific instructions. Here are some guides others for popular providers, yours likely works similarly:

- Namecheap: https://www.namecheap.com/support/knowledgebase/article.aspx/317
- Google Apps: https://support.google.com/a/answer/183895?hl=en
- GoDaddy: https://www.godaddy.com/help/add-a-txt-record-19232

We created a tool called `dnslink-deploy` to help manage dnslink `TXT` records, check it out at: https://github.com/ipfs/dnslink-deploy/. Today it only supports the DigitalOcean api; [help us add support more DNS systems](https://github.com/ipfs/dnslink-deploy/issues/7)!

Once you've set your new `TXT` records, you should be able to check them. Note, they may take some time to propagate:

```
> dig +short TXT <your-domain-name-here>
"dnslink=/ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM"
```

Once this works, you should be able to resolve IPFS paths like `/ipns/<your-domain-name-here>` to your website. These links -- once you put the domain name you used -- should all work:

- Local node gateway: `http://localhost:8080/ipns/<your-domain-name-here>`
- Public IPFS gateway: `https://ipfs.io/ipns/<your-domain-name-here>`

And you should also be able to use the `/ipns/<your-domain-name-here>` path with other `ipfs` commands:

```
> ipfs get -o website3 /ipns/<your-domain-name-here>
Saving file(s) to website3
140.00 KB

> ls website3
cat.jpg
index.html
```

##### 4.2. Using the public IPFS gateways to serve content

Now, an address like https://ipfs.io/ipns/dist.ipfs.io is already pretty good: it works with HTTP web browsers that do not speak IPFS; and does not have ugly hashes in it, so you can write it down. In IPFS-powered browsers, you'll be able to view this with just `/ipns/dist.ipfs.io` or [fs:/ipns/dist.ipfs.io](fs:/ipns/dist.ipfs.io). But for the convenience of the HTTP-only browsers in wide use today, we can do even better:

- http://dist.ipfs.io is served exactly the same, but looks a lot nicer.

This is done by pointing the `A` records of your DNS domain name to the IP addresses of our Public HTTP-to-IPFS Gateways. (And `ipfs` after 0.4.0 has a solution with `CNAME` records too.) Let's check out how the `A` records of `dist.ipfs.io` look, with `dig`:

```bash
> dig +short A dist.ipfs.io
128.199.219.111
178.62.61.185
104.236.151.122
178.62.158.247
104.236.176.52
162.243.248.213
104.236.179.241
104.236.76.40
```

You can set similar `A` records for your own domain name, and it should work the same way. You may have to wait for your DNS records to propagate -- check with `dig +short A <your-domain-name-here>`. Then, you will be able to load your website using your own domain name, through IPFS, with no ugly hashes, and looking exactly like it does today:

- `http://<your-domain-name-here>`

This is for sure powerful, but please note that when you link to domain names directly, you can still run into the problems of link-rot and versioning. Please always link to the _permanent_ URLs like: https://ipfs.io/ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM when archiving, keeping records, or where immutability matters. But know too that we are working on even nicer ways to link and resolve old versions of content without having to write hashes down. Those will be less safe than content-hash links, but still better than today's mess.

You'll find more information about the dnslink mechanism in the [go-dnslink README file](https://github.com/jbenet/go-dnslink). We'll cover it in a more in-depth blog post very soon. We're also working to add support for other name systems: Namecoin, Ethereum, and others.

#### Step 5: Backing up your content elsewhere (pinning)

Now, let's back up your IPFS content using _other_ IPFS nodes. This is important so that your content is sure to be replicated redundantly. There are "[Notes on the Replication Model](#notes-on-the-replication-model)" below that describe how content moves and why IPFS chose this model. But for now, all you have to know is this:

**Pinning:**
- To _keep_ content on an IPFS node, the content must be "pinned".
- Content not "pinned" is only _temporarily cached_, and may be garbage collected.
- Tools and services for shared pinning exist and more are being built.

First, let's try viewing your content elsewhere. First, [install ipfs and run another node](#step-0-installing-ipfs-and-running-a-node) in another computer connected to the internet -- it could be another laptop, a VPS on the cloud, or a VM.

Once IPFS is all setup, you should be able to `ipfs get` the website content:

```sh
# get the content with ipfs
> ipfs get -o website /ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
Saving file(s) to website
140.00 KB

# check it out
> ls website
cat.jpg
index.html
```

Check first that it is _not_ pinned:

```sh
> ipfs pin ls /ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
> # no output means there are no pins for this path
```

This means that the content is merely _cached_ within IPFS. Now, add a "recursive pin" on the website path:

```sh
> # add a recursive pin
> ipfs pin add -r /ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
pinned QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM recursively

> # check the pin
> ipfs pin ls /ipfs/QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM
QmQHjxj3FMRuqcCEo52fwBUFWuWfUrCHUNzuzQtYLiw6fM recursive
```

Now the content is _pinned_, and will remain in the _repository_, or "local storage", of this node until you unpin it.

The act of _pinning_ content (or saving, or backing up) is explicit. IPFS does not keep around anything you don't ask it to. Everything you _fetch_ and don't pin is only cached. This is a tried-and-true model similar to how your web browser cache works. Content that should be kept around is accounted for separately, or "pinned". It's not called "downloading" because both "the cached" and "the pinned" content are local, or downloaded. The distinction is merely what sticks around indefinitely.


##### Notes on the Replication Model

One of the most important things to understand about IPFS is how content moves around the network. Like many peer-to-peer and distributed systems, peers can access and download content directly from each other. But unlike many peer-to-peer systems, IPFS does not automatically push your content to others to back it up. This is so that you can use IPFS to store, address, and move your own data **without** requiring you to store other people's data. This is an important distinction! We sacrifice built-in replication for a richer model that matches how people feel about content. Most individuals and businesses _would never_ use a protocol if it _forced_ them to store other people's unknown data. Because who knows, it might be something illegal; protocols that force that are unlikely to be used massively.

**So when _does_ data get sent out to others?** Data in IPFS is transferred to a node only when it is _requested_. There has to be an explicit action there. Either the user or the application acting in the user's behalf must choose to access some content. This ensures that your IPFS nodes do not get full of other people's stuff, and most importantly, that you do not accidentally receive bad bits. This puts IPFS closer to HTTP and BitTorrent than other peer-to-peer protocols, like Freenet.

**So then how do we replicate, disperse, and backup data?** The short answer is: in a protocol layered _on top of_ IPFS. IPFS tells you how to access and transfer data, and other protocols layer on top of IPFS to provide replication and redundancy guarantees. This closely matches how the world's individuals, organizations, and services administer and replicate their data today. HTTP does not guarantee your data will be around, it just tells you how to access and transfer it. Users and HTTP websites rely on shared systems, or services like Amazon S3, to back up their data. For IPFS, there are emerging protocols and applications to organize data replication. Some of them, like pincoop and ... TODO Finish

**Am I serving or backing-up content if I only view it?** "Backing-up" no, you have to explicitly _pin_ data to ensure long-term backing-up of content. "Serving", potentially. Today, `ipfs` nodes by default serve content they have retrieved locally. This will change in the future to incorporate more nuanced policies, like: (a) view content without serving at all (like in HTTP), (b) only serve parts of content while downloading it (like most bittorrent clients), and even (c) request and serve content only from _trusted_ nodes (akin to how computers in a VPN connect). Today IPFS nodes do the simple thing, but as more people use IPFS for more interesting things, we will introduce expressive policy hooks for developers to play with. In the end, it is applications and users of IPFS that must define what to do.

## What's next? More details and improvements

Let's zoom out and take look at what we just did:

0. We installed the `ipfs` program and ran an IPFS node.
1. We created a simple website. It could be much more elaborate, but the steps would be the same.
2. We published the website to the IPFS network (with `ipfs add`), making it viewable to the whole network.
3. We explored `ipscend`, a tool to version and publish websites with ipfs.
4. We explored DNS naming with `ipfs` and `dnslink`, a tool to publish special `TXT` records.
5. And, finally, we published content to the peer-to-peer web, in a future-safe, resilient way, while depending (mostly) on only one "thing": the IPFS protocol and its tooling.

This is a good start to solving some of the problems that plague web publishing today. But there is much more to do, more problems to simplify, and lots to implement. We are hard at work, and have much more to show you in the coming weeks. Please try our tools, [give us your feedback](https://github.com/ipfs/support/issues/new), and stay tuned. Most importantly, [join us on Github, and build the future with us](https://github.com/ipfs/ipfs)! We have a very active and open community, working on lots of interesting problems.

We will end this post highlighting some things we're working on to improve the web publishing experience even further.

#### Package Managers and Containers

When it comes to publishing web applications and web sites, some of the requirements to optimize the workflow and enhance the developer experience are very similar to the ones for publishing code packages. We've talked and demonstrated how IPFS is a perfect transport for moving around [packages of code](https://www.youtube.com/watch?v=-S-Tc7Gl8FM) or [container-ized services](https://www.youtube.com/watch?v=vaIWRyotz4g), Mainly, this is due to its ability to use bandwidth very efficiently with a very smart and distributed discovery mechanism, which guarantees integrity for the content being looked up.

#### `ipscend` Timeline view

One other feature that will significantly increase the developer experience with `ipscend` is [**versioning**](https://github.com/ipfs/notes/issues/23). Apps, as with any software, have several iterations across their lifetime. These iterations pack different things, like new features, complete application revamps or sometimes, regressions.

Version Control Systems have enabled developers to work collaboratively on the same code, without wasting time dealing with merge conflicts. We can improve these tools by letting developers, designers and other individuals have more power. Ultimately, they should be able to have quick access to the timeline for their application, to make annotations on the current iterations before a release, to cherry pick which version to be released (using visual rollbacks), to analyze if there have been any regressions in a specific browser, among other things.

Currently we have a `timeline` feature that lets you browse through screenshots of all of the published versions of your application.

![](http://zippy.gfycat.com/TameDampKob.gif)

#### Extending current VCS with IPFS and IPLD

VCS (Version Control Systems), like git, are very important to the development and publishing of web applications. We are working to extend versioning tooling to other content types, like large documents, video, and datasets. We will do this using commits in IPFS itself, and leveraging diffing and version compression tooling.

The [IPLD (InterPlanetary Linked Data)](https://github.com/ipfs/specs/blob/master/merkledag/ipld.md) data model will enable current VCS to be extended so that their data structures can live inside the IPFS network, without having to change how that they work. What this means is that we will be able to have one single source "forest" for all code, and where "releases" are just files on IPFS itself. Code, Static Assets, Data, Releases, Public Keys for signatures, and everything else can all be linked with IPFS. :)

#### IPFS 0.4.0 Release

The `go-ipfs@0.4.0` release is loming closer. It packs a punch, with lots of great new features. We will write a blog post describing things very soon (and update this post to link to it). The most relevant changes to mention here are:

- There have been _major_ performance improvements in file adding.
- DNS and `dnslink` support learned to use `CNAME` records (in addition to `A`) to `gateway.ipfs.io`, and also checks `_dnslink.<domain>` for `TXT` records, to avoid `CNAME/TXT` conflicts.

#### Other Naming Systems

DNS is only the most famous internet-wide naming system. Others exist, and we are already working on adding support to IPFS and IPNS for them. Notable ones include:

- IPNS Key Naming - SFS inspired public-key naming on IPFS
- [Ethereum](https://ethereum.org) has emerging name registries.
- [Namecoin](https://namecoin.info) has a DNS-like registry.
- Maybe non-ICANN DNS Roots.
- Other... let us know other name systems we should consider.

#### Drag-and-drop Web Publishing

We are aiming to reach "Drag-and-Drop Web Publishing", a level of usability where anybody can trivially publish content to the open web, by merely dragging and dropping content. It is easy to make this happen in general, and certainly on top of IPFS. It is also easy to allow users some minor data consumption. The tricky piece here is guaranteeing the long-term survival of the data.

![](https://cloud.githubusercontent.com/assets/790842/12539807/a4c31fc4-c2fa-11e5-9a61-c5e9be2d53eb.gif)

#### Pinning Services, Federations, Filecoin

Content needs to be backed up across many ipfs nodes, and for this purpose we are building a host of tools and services that match different people's expectations of how their content should be backed up.

- (tooling / self-managed) in the lowest level, IPFS provides the primitives necessary to manage your own pinning across a number of ipfs nodes. All you need is `ipfs pin add/rm` to create tools.
- (clusters) `ipfs-cluster` is one tool we are making that will manage pinning across sets of ipfs nodes. It will account which nodes have what content, ensure redundancies of configurable levels, and RAIN (Redundant Array of Independent Nodes), similar to [RAID](https://en.wikipedia.org/wiki/RAID) for Disks.
- (federations) a few different tools are emerging to bind together sets of nodes across different organizations -- i.e. across trust boundaries. Two examples are [ipfs-persistence-consortium](https://github.com/pipermerriam/ipfs-persistence-consortium), and [pincoop](https://github.com/victorbjelkholm/pincoop). These tools can use testers and contributions.
- (bots) we are creating a set of "pinbots" -- bots that pin at the request of their users -- for [IRC](https://github.com/ipfs/pinbot-irc), Twitter, GitHub, and more. If you're interested in other channels, please let us know. [Hubot](https://hubot.github.com/) makes it easy to add `pinbots` to various services.
- (cloud service) [Protocol Labs](http://ipn.io) is creating a cloud service on top of existing cloud providers. Stay tuned for more news on this.
- (incentivized protocols) [Protocol Labs](http://ipn.io) is also creating [Filecoin](http://filecoin.io), a cryptocurrency incentivized storage network on top of IPFS. This will be the best way to pin long-term. If you're interested in building Filecoin with Protocol Labs, [reach out](http://ipn.io/join).


