---
date: 2016-02-23
id: 10-webpage-publishing-with-ipfs
template: tmpl/layouts/post.html
baseurl: ..
breadcrumbs:
  - {name: "10-webpage-publishing-with-ipfs", link: "./" }
tags: publishing, web, app, publish
title: Static Web publishing, simple and distributed with IPFS
author: David Dias
collection: posts
---

> - Don't you hate it when your links break?
> - Don't you hate it when your web host gets attacked and your websites go down?
> - Don't you hate managing servers just to self-host a web page?
> - Don't you hate it when you switch cloud providers and all the data links change?
> - Don't you hate it when people relying on your content get broken embeds?

> NOTE: I think it'd be better to start stronger than rhetorical questions. For instance:    
> The web is broken. Links break; web hosts get attacked, and websites go down (often permanently). As a web developer, you have to by a sysadmin just to host a web page. If you switch cloud providers, links break. Even with a fully functional website, more issues might pop up; link rot, or broken embeds for third parties serving your content. It's 2016, and not all is as it should be.

Publishing web content has become a very complex, confusing, and precarious process. Publishing static content -- simple web pages, images, videos, or documents -- is way harder than it should be. The "easy way" means depending on services that may change things under you or shut down completely. Hundreds of millions of people have been served, sometimes overnight, with a "Sorry, we're going in a different direction" message. The lucky ones get a dump of their data and a short timeline to "get their affairs in order" and rehost their content. This means hard work rebuilding the site elsewhere, and -- for those who were not extremely careful with domain names and URLs up-front -- attempting to update soon-to-be-broken links all over the web. Like changing mailing addresses after moving, most resign themselves to suffering some things breaking forever.

The alternative -- self-hosting your content on infrastructure you control -- is not much better. Only the zealous few manage their own hardware today. And those who compromise by hosting their own websites on virtual private servers run into a myriad of complex and brittle processes. Even very experienced web developers can struggle with the complexities of setting up servers, replicating across regions, adding load-balancers, securing machines against hackers, responding to sudden problems, and just the constant grind of long-term maintenance. All of this requires large amounts of domain specific knowledge that newcomers find very difficult to use.

"I just wanted to publish my personal website!" It is not a mystery why most people use Facebook, Twitter, Medium, and Tumblr to publish and host their public personas, their blogs, and all their thoughts.

Suggestion: This is where IPFS, the permanent web, comes in. We've been working on a solution to these issues, imagining a word where it is easier to publish web content; where it easier to host and maintain it; where links don't break or change; where old versions didn't disappear in moment; and where all of this is as simple as tweeting. All at once.

> - What if it was way easier to publish web content?
> - What if it was way easier to host and maintain it?
> - What if by design, links didn't break?
> - What if by design, links didn't change when moving hosts?
> - What if by design, old versions were all still accessible?
> - What if managing all this was as simple as tweeting?

Using [IPFS](https://ipfs.io/), we can already make a big dent into these annoying problems. We don't have all the solutions working yet, but we're working hard to get there. Comparatively, IPFS is very young and we're still doing out all the groundwork and creating the new plumbing infrastructure. But we have a solution we'd like to present here, for developers and users familiar with:

- The commandline,
- Installing software services, and
- Setting DNS records (optional)

The tutorial below guides you through the process of (a) publishing a small static website to IPFS with [ipscend](https://github.com/diasdavid/ipscend), (b) backing up the content in other IPFS nodes, and (c) pointing a domain name to use IPFS. All IPFS nodes can view, cache, back up, and serve the content. This means that all the version archiving, bandwidth sharing, and offline-first properties of IPFS apply. Even better, the entire process works with standard HTTP web browsers, too.

We will work on simplifying these processes even further, but for now, we hope that this is enough to help many people to re-host their web content in easier, more resilient, and permanent ways.

## Tutorial: Publishing a static website to IPFS

#### Step 0: Installing and Running dependencies

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

#### Step 1: Prepare the static website to publish.

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
> cd static-webpage-example
> static src
serving "src" at http://127.0.0.1:8080
```

This page is now being locally served on your machine at http://127.0.0.1:8080. Open this URL in your web browser; note that it is not yet accessible by the whole world. This is when a complex series of steps to get a machine running an HTTP server somewhere would start -- but with IPFS, there is a better way.

#### Step 2: `ipfs add` to publish a website at an IPFS address

Now we are going to use IPFS to host and distribute our static site.  Let's add it:

```bash
> ipfs add -r website
added QmajFHHivh25Qb2cNbnnnEeUe1gDLHX9ta7hs2XKX1vazb website/cat.jpg
added QmSfETeiARbrBTAAfevdKgksbb9WvgRgXJ2GUXB9j5dkJi website/index.html
added QmVtSZiPWUjK175KngUvXeBxkTBRhVU9YgQcHvLNDdXc8s website
```

Sweet, now our website is available on the IPFS network! Now you can load your site on the gateway from your local IPFS node or the public gateway. Open one of these in your browser:

- Local node gateway: http://localhost:8080/ipfs/QmVtSZiPWUjK175KngUvXeBxkTBRhVU9YgQcHvLNDdXc8s
- Public IPFS gateway: https://ipfs.io/ipfs/QmVtSZiPWUjK175KngUvXeBxkTBRhVU9YgQcHvLNDdXc8s

Even, if the [ipfs.io](https://ipfs.io/) domain is not reachable, you would still be able to share and make your page available to other users that are running their own IPFS nodes by sharing the hash that corresponds to the latest version of your web page. This even works in local area networks without connectivity to the broader internet!

However, this process can be improved with some tooling. After all, manual installation of an IPFS node is still required, and we need to keep track of the hashes for the published version. That is where `ipscend` excells.

#### Step 3 (optional): `ipscend` - tooling to publish your page and keep track of different versions

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

Ok, we are almost ready to publish our first version. Although we already installed an ipfs node, ipscend comes with batteries included: if you're using `ipscend`, you don't need to install IPFS as a separate step. Simply run `ipscend ipfs start`:

```sh
> ipscend ipfs start
starting IPFS daemon (this might take some seconds)
IPFS daemon has started, you can now publish with ipscend
```

If this fails, it means you already had an `ipfs daemon` running, which is fine.


Now we are really ready to publish the first version of your ipscend website. Simply run `ipscend publish`:

```sh
> ipscend publish
Published src with the following hash: Qme12sdPTURX8UyR4R4DLGVqNZqkmLRp43utNU8pYfq1Gd
You can access it through your local node or through a public IPFS gateway:
http://localhost:8080/ipfs/QmVtSZiPWUjK175KngUvXeBxkTBRhVU9YgQcHvLNDdXc8s
http://ipfs.io/ipfs/QmVtSZiPWUjK175KngUvXeBxkTBRhVU9YgQcHvLNDdXc8s
```

That's it. Your first iteration is now published on IPFS. You can see that this was registered on our `ipscend.json` versioning file:

```bash
> cat ipscend.json
{
  "versions": [
    {
      "hash": "QmVtSZiPWUjK175KngUvXeBxkTBRhVU9YgQcHvLNDdXc8s",
      "timestamp": "2016-02-23T00:26:56.366Z"
    }
  ],
  "path": "src"
}
```

This is like very simple version control on top of IPFS. You'll see later how we can extend this to reach git-like levels of versioning, and beyond.

#### Step 4: Human readable naming - Host pages from the public gateways

You are probably thinking:

> Ok, so, that was quick and easy to set up and publish. However... remembering and typing hashes is ugly and difficult!

Well, you are right. But there is a way to improve that part of the experience, and completely avoid having to share hashes in the first place. We do this by using _naming systems_. The simplest and most familiar to you is DNS. We made a tool called `dnslink` that makes it easy to publish your IPFS web content at your very own domain name.

Now that we've got the website's hash, we can bind this hash to a human-readable domain name by creating a `TXT` record. Some good examples where this tool is already being used include http://dist.ipfs.io, and even https://ipfs.io. You might have not realized as a user, but these websites have been served by IPFS all along! Check it for yourself:

```sh
> dig +short TXT ipfs.io
"dnslink=/ipfs/QmNu7McSMSi3vp6avTZrgW6MKdgeDkGjJGY6W5zPjnh9Xg"

> dig +short TXT dist.ipfs.io
"dnslink=/ipfs/QmdEgg4GVCgzLyW2hRDedFfhc2Tb92awpvb4wrXUWLpGos"
```

That `dnslink` tells the public gateways which hash should be loaded for that host.

To set it up to add your domain, add the TXT record with `dnslink=/ipfs/<HASH>`, where `<HASH>` is the hash of webpage. Then add some `A` records pointing to the publicly available IPFS gateways. You can find these by running the `dig` command on ipfs.io:

```bash
> dig A ipfs.io
...
;; ANSWER SECTION:
ipfs.io.                120     IN      A       128.199.219.111
ipfs.io.                120     IN      A       178.62.61.185
ipfs.io.                120     IN      A       104.236.151.122
ipfs.io.                120     IN      A       178.62.158.247
ipfs.io.                120     IN      A       104.236.176.52
ipfs.io.                120     IN      A       162.243.248.213
ipfs.io.                120     IN      A       104.236.179.241
ipfs.io.                120     IN      A       104.236.76.40
...
```

You might have to wait for your DNS records to propagate, but once it is complete, you will be able to load your website using your own domain through IPFS.

You'll find more information about the dnslink mechanism in the [go-dnslink README file](https://github.com/jbenet/go-dnslink). We'll cover it in a more in-depth blog post very soon. We're  also working hard to add support for other name systems  -- for example, Namecoin -- too.

#### Step 5: Backing up your content elsewhere.

One of the most important things to understand about IPFS is how content moves around the network. Like many peer-to-peer and distributed systems, peers can access and download content directly from each other. But unlike many peer-to-peer systems, IPFS does not automatically push your content to others to back it up. This is so that you can use IPFS to store, address, and move your own data **without** requiring you to store other people's data. This is an important distinction! We sacrifice built-in replication for a richer model that matches how people feel about content. Most individuals and businesses _would never_ use a protocol if it _forced_ them to be storing other people's unknown data. Because who knows, it might be something illegal! Protocol that force that are unlikely to be used massively.

**So when _does_ data get sent out to others?** Data in IPFS is transferred to a node only when it is _requested_. There has to be an explicit action there. Either the user or the application acting in the user's behalf chose to access some content. This makes it so your ipfs nodes do not get full of other people's stuff, and most importantly, so you do not accidentally receive bad bits. This puts IPFS closer to HTTP and BitTorrent than other peer-to-peer protocols like Freenet.

**So then how do we replicate, disperese, and backup data?** The short answer is: in a protocol layered _on top of_ IPFS. IPFS tells you how to access and transfer data, and other protocols _layer on top of IPFS_ to provide replication and redundancy guarantees. This closely matches how the world's individuals, organizations, and services administer and replicate their data today. HTTP does not guarantee your data will be around, it just tells you how to access and transfer it. Users and HTTP websites rely on shared systems, or services like Amazon S3, to back up their data. For IPFS, there are emerging protocols and applications to organize data replication. Some of them, like pincoop and 

## What's Next? More Details and Improvements 

(recap of what we just did)

Let's zoom out and look at what we just did: 
0. We installed the `ipfs` program and ran an ipfs node.
1. We created a simple website. It could be much more elaborate, but the steps would be the same.
2. We published the website to the ipfs network (with `ipfs add`), making it viewable to the whole network.
3. We explored `ipscend` a tool to version and publish websites with ipfs.
4. We explored DNS naming with `ipfs` and `dnslink`, a tool to publish special `TXT` records.

And we achieved publishing content to the peer-to-peer web, in a future-safe, resilient way, while depending (mostly) on only one thing: the IPFS protocol. 

When it comes to publishing web applications and web sites, some of the requirements to optimize the workflow and enhance the developer experience are very similar to the ones for publishing code packages. We've talked and demonstrated how IPFS is a perfect transport for moving around [packages of code](https://www.youtube.com/watch?v=-S-Tc7Gl8FM) or [container-ized services](https://www.youtube.com/watch?v=vaIWRyotz4g), Mainly, this is due to its ability to use bandwidth very efficiently with a very smart and distributed discovery mechanism that guarantees integrity for the content being looked up.

There is much more to do, more problems to simplify, and lots to implement. We will end this post highlighting a some things we're working on to improve the web publishing experience even further. 

#### Timeline view

One other feature that will significantly increase the developer experience with `ipscend` is [**versioning**](https://github.com/ipfs/notes/issues/23). Apps, as with any software, have several iterations across their lifetime. These iterations pack different things, like new features, complete application revamps or sometimes, regressions.++Version Control Systems have enabled developers to work collaboratively on the same code, avoiding spending time dealing with merge conflicts. We can improve these tools by doing the following; letting developers, designers and other individuals have quick access to the timeline of the application, make annotations of the current iterations before a release, be able to cherry pick which version to be released (using visual rollbacks), analyze if there have been any regressions in a specific browser, and more.++Currently we have a `timeline` feature that lets you browse through screenshots of all of the published versions of your application.++![](http://zippy.gfycat.com/TameDampKob.gif)

(NOTE: I

#### Extending current VCS with IPFS and IPLD

The [IPLD (InterPlanetary Linked Data)](https://github.com/ipfs/specs/blob/master/merkledag/ipld.md) data model will enable current Version Control Systems to be extended so that their data structures can live inside the IPFS network, without having to change how that they work. What this means is t
hat we will be able to have one single source tree, where releases will be one of the iterations and where users will be able to leverage the last .....
