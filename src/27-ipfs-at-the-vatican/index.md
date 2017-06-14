Possible Titles:
Showing off Serverless Annotations at the Vatican
Bringing Distributed Applications to Museums, Libraries, Archives … and the Vatican

Making the Case for Institutions to use Decentralized Tools

## IPFS at the Vatican

The IPFS team co-presented at a conference at the Vatican last week with Drew Winget (Stanford University Libraries) and Ed Silverton (Holoscene & [Digirati](http://digirati.com/technology/our-solutions/universal-viewer/)). We were there to show Galleries, Libraries, Archives and Museums from around the world how they can _go serverless_, publishing their digitized artworks, manuscripts, maps, videos and even 3D scans over the peer-to-peer web. Matt Zumwalt from Protocol Labs presented on the benefits of going serverless, showing how you can open new possibilities for access, discovery and preservation by putting digital content _along with the viewers for the content_ onto IPFS nodes and serving everything over the peer-to-peer network. Drew and Ed followed that presentation with a demo showing a proof of concept for _serverless, interoperable annotations_ — using IPFS pubsub to collaboratively annotate images without relying on any servers. They produced this work in collaboration with David Dias and Pedro Teixeras from the js-ipfs team.

The presentations were at the [2017 Conference](http://iiif.io/event/2017/vatican/) of the [International Image Interoperability Framework](http://iiif.io) (IIIF), hosted by the Vatican Libraries.

## What is IIIF?

IIIF is the result of Libraries, Archives and Museums collaborating to produce specifications and tools for displaying high resolution images, video and other digitized content. It’s used to display digitized content like Stanford University’s collections of [scanned maps](http://library.stanford.edu/guides/maps-masses), Princeton University’s collections of [Papyri](http://pudl.princeton.edu/results.php?f1=kw&v1=Papyri) and [Japanese Scrolls](http://pudl.princeton.edu/results.php?v1=scroll&f1=kw&b1=AND&v2=&f2=kw&b2=AND&v3=&f3=kw&year=before&ed=&ld=&sort=score&rpp=10&view=pudlUI), the [Wellcome Library’s Digitized Collections](https://wellcomelibrary.org/item/b20417081#?c=0&m=0&s=0&cv=0&z=-0.9651%2C-0.0828%2C2.9303%2C1.6564), [manuscripts from Oxford’s Bodleian Libraries](http://iiif.bodleian.ox.ac.uk/iiif/viewer/60834383-7146-41ab-bfe1-48ee97bc04be#?c=0&m=0&s=0&cv=1&z=-0.8999%2C-0.0503%2C2.8188%2C1.539), and [Renaissance texts displayed by the Biblissima project in France](http://demos.biblissima-condorcet.fr/mirador/#8c063e80-73b6-4de1-addf-ad4ab1520246).

Over the past decade hundreds of millions of dollars have been spent digitizing the collections of Galleries, Libraries, Archives and Museums. These digitization efforts are primarily driven by the aspiration to put those collections online, allowing people to access the artwork, books and archival materials from anywhere in the world. They have also made millions of objects available to the public for the first time — objects that are usually kept in storage, unavailable to everyday Museum or Library visitors. This presents huge opportunities for new engagement, but it requires good tools to allow people to discover, access, explore, and annotate the content.

IIIF is an open-source success story. It shows that open-source collaboration can produce reliable, useful software maintained by vibrant professional communities who work to create solutions for their users.

By 2011 Stanford, Princeton, Oxford, Bibliothèque nationale de France, British Library, Internet Archive, and many others had all built "page turning" applications to display their scanned books and manuscripts. In the same time frame, Microsoft had introduced "deep zoom" functionality in Photosynth and Silverlight and then open-sourced the technology as [OpenSeadragon](http://openseadragon.github.io/). The possibilities were obvious but there were big technical hurdles to adopting these technologies. To display an image on a web page with deep-zoom you had to deploy image servers, often pre-processing the images, and then you had to build web interfaces for end-users to interact with the images.

Rather than tackling these challenges piecemeal, several institutions collaborated. They called this collaboration IIIF - the International Image Interoperability Framework and started by designing the IIIF presentation API. This led to the creation of IIIF-based image viewers and a proliferation of open-source IIIF-compliant image servers. While the project was initially focused on displaying high resolution images with features like deep zoom and page turning (for scanned books), the collaborators have extended the project's scope to accommodate video content, maps, and even 3D objects like [this 3D scan of a vertebra from Stanford's archives](https://ipfs.io/ipfs/QmTwPn8ojWaS9hhBAKjL5TFRp5WgbqyWtxnNtcV3qbPUsd/#?manifest=https%3A%2F%2Fipfs.io%2Fipfs%2FQmUPuA4BLmAVBNimyitpbEZh97FbwjXRSoimxJEgW7mJ3S%2Fhc941fm6529.json&c=0&m=0&s=0&cv=0). They have also produced API specifications for interactions like search, access control and annotations.

In addition to letting people view these images, institutions have built tools to let scholars do things like [compare two Van Gogh paintings and annotate them](http://projectmirador.org/demo/).

The IIIF conference at the Vatican was an opportunity for participants to show the tools they've built, to share the impact they've had for end users, and to envision paths forward.

## Why Cultural Institutions Need IPFS

There are many compelling reasons for cultural institutions (Galleries, Libraries, Archives, Museums) to embrace distributed technologies, but there's an underlying reason why they actually need the distributed web to survive in a digital age. Cultural institutions need to embrace the distributed web because the centralized web is poisonous for them. The centralized web forces them to behave in ways that are at odds with their missions.

There are the obvious bits — IPFS will let you spread the burden of providing access, it will provide better referential integrity of the system of linked data, and it will allow profoundly more flexible options for preservation.

There are also less obvious bits — IPFS will open new avenues for supporting scholarly use like [exposing collections for text analysis](https://www.neh.gov/about/chairman/speeches/the-civilizing-implications-the-digital-humanities) and it will provide new ways to measure public engagement like tracking the number of replicas on the network, harvesting metadata from peers, or following public streams of annotations.

Those benefits are all interesting, but the real value of IPFS for cultural institutions is that it will allow us to escape the tyranny of location addressing.

Location-addressing is one of the stumbling blocks that have prevented cultural institutions from expressing their real value in a digital context. This is because location-addressing creates a false dichotomy where we either link to the institution's copy or ignore their copy. It forces institutions into a zero-sum game which fundamentally conflicts with the non-zero-sum scenario they exist to support.



Contrast a pre-digital pattern for information sharing with our contemporary digital context:

If a researcher publishes her findings in a book and publishes an excerpt in an academic journal, libraries around the world can hold copies of both. When someone cites the book or the excerpt I can go to any of those libraries, or even the bookshelf of my home library, to retrieve it.

Today's digital context is very different. When a researcher publishes her findings on a server somewhere, blogs about it, and publishes an excerpt in an online journal we use HTTP links to identify the content. I can't use those location-addressed links to find my library's copy of the data, nor could I use them to find a cached copy that's on my local network. The links force us to rely on specific servers in specific locations. _This location-addressed approach impedes cultural institutions from doing the valuable work they were created for._ If a library, museum or archive makes a copy of the content, their copy is only marginally valuable because it's outside the system of citations that everyone relies on. Even if the original copy is lost, the library's copy is still outside the system of links; its value is still only marginal. This pattern undermines all the value propositions offered by cultural institutions; the access, discovery and preservation services they provide are dissociated from the flow of engagement.

Institutions have been forced to either 1) compete to be _the definitive location where content lives_ or 2) struggle at the edge of irrelevance. That's a terrible, false dichotomy.

A task force at MIT recently produced a report on the [Future of Libraries](https://future-of-libraries.mit.edu/). They applied the notion of "library as platform":

> [We] envision the library as a networked set of global platforms replete with content, data, metadata, images, audio files, laboratory notebooks, course materials, and more. We imagine a repository of knowledge and data that can be exploited and analyzed by humans, machines, and algorithms. This transformation will accelerate the accumulation and validation of knowledge, and will enable the creation of new knowledge and of solutions to the world’s great challenges. Libraries will no longer be geared primarily to direct readers but instead to content contributors, community curators, text-mining programs, machine-learning algorithms, and visualization tools. \[source: https://www.pubpub.org/pub/future-of-libraries]

To fulfill this vision, we have to break away from the centralizing, destabilizing patterns of location-addressed web.

The role of institutions on the decentralized web: act as peers on the network, bringing the resources of institutions and applying the sensibilities of organizations whose aim is to serve broad communities of users for the long term.

If you want the decentralized web to be open and if you want it to serve the many, then join the decentralized revolution and use your influence to ensure that future.


## The First Demo: Peer to Peer Deep Zoom and 3D Object Viewers

The first demo has been floating around since last October. It shows how you can serve IIIF content _and the IIIF viewer_ over IPFS.

This is a powerful alternative to the normal situation where people put the HTML and JavaScript for their IIIF viewer on a web server and then put the content on an image server. The decentralized alternative is to just add everything to an IPFS node. With the old-web approach, you're committing to run two servers indefinitely. As soon as you turn off those servers, the content ceases to be available. With the decentralized web approach you're committing to ensure that _at least one node somewhere on the network will hold onto a copy of the content at any given time._ This gives you many more options for supporting access while controlling costs and responding dynamically to circumstances. You can increase or decrease the number of replicas based on demand and can even pass responsibility between organizations, individuals, and geographic locations.

The process for doing this is simple:
1. Generate IIIF tiles based on your image, along with a IIIF level 0 manifest that points to the tiles
2. Add the tiles and the manifest to IPFS
3. Use the IPFS hash of your manifest to point the viewer at it

For example, [this manifest](https://ipfs.io/ipfs/QmYomyCpT1vKNovYvTjAStYq31JoaH8xdivjmWcDj5mpM1) will let any IIIF viewer display [these tiles](https://ipfs.io/ipfs/QmWsGPTKFWFRxMqvT2ic8LQxTiomwLP81gSybWmiYtStAD)

_Note: this proof-of-concept relies on pre-generating IIIF tiles. In the long run, it would also be possible to skip that step, instead loading JPEG2000 files onto IPFS and making IPFS nodes interpret them on the fly. For more info, see the "Future Work" section at the end of this blog post._

To test this, you can pass the manifest into the demo version of the Universal Viewer. Using this url: https://universalviewer.io/uv.html?manifest=https://ipfs.io/ipfs/QmYomyCpT1vKNovYvTjAStYq31JoaH8xdivjmWcDj5mpM1

This lets you use any IIIF viewer to display IPFS content. We can go entirely serverless by adding the viewer to IPFS too. You can do this with any IIIF viewer, configured however you want. Ed Silverton added [this demo version of the universal viewer](https://ipfs.io/ipfs/Qmb7N1ZmoE9k2Yz6r4cDmMYQB64Gi1X2damE2FFA66LX4X) to IPFS. You can use [this link](https://ipfs.io/ipfs/Qmb7N1ZmoE9k2Yz6r4cDmMYQB64Gi1X2damE2FFA66LX4X/#?manifest=https://ipfs.io/ipfs/QmYomyCpT1vKNovYvTjAStYq31JoaH8xdivjmWcDj5mpM1) to display the tiles we added to IPFS using an entirely IPFS-based stack.

<iframe src="https://ipfs.io/ipfs/Qmb7N1ZmoE9k2Yz6r4cDmMYQB64Gi1X2damE2FFA66LX4X/uv/uv.html#?manifest=https://ipfs.io/ipfs/QmYomyCpT1vKNovYvTjAStYq31JoaH8xdivjmWcDj5mpM1&c=0&m=0&s=0&cv=0&config=examples-config.json&locales=en-GB:English (GB),cy-GB:Cymraeg&xywh=-391,0,4780,2999&r=0" width="560" height="420" allowfullscreen frameborder="0"></iframe>


If you look at the URIs in all of these examples, you'll see they all rely on the `https://ipfs.io` domain. These are _gateway links_, which make IPFS content backwards-compatible with the classical HTTP web. Every IPFS node is able to present itself as an HTTP server, acting as a _gateway_ between the HTTP web and the distributed peer-to-peer web. When one of these gateways receives a request, it uses the IPFS protocol to retrieve the corresponding content from the peer-to-peer web and then returns it over HTTP.

If you use one of these gateway links in a web browser that doesn't speak IPFS, the content will still load because you're falling relying on the gateway to translate the requests for you. Over time, as browsers add support for IPFS (starting with the IPFS web extensions you can install in your browser) the browser will recognize those gateway requests, skip the HTTP connection, and instead resolve the content via IPFS.

In the meantime, to confirm that you're actually retrieving content that any IPFS node could resolve, you can replace the ipfs.io portion of any url with the hostname of any IPFS gateway. There is a [thread in the IPFS discussion forum](https://discuss.ipfs.io/t/curated-list-of-ipfs-gateways/620) where people are gathering a list of gateways you could test out.

## The Second Demo: Serverless Collaborative Annotations on IPFS

Our second demo is more involved and it requires more explanation. The demo focuses on allowing people to annotate images and sync those annotations across the peer-to-peer network without relying on an annotation server. To support this real-time collaborative sharing of data we use [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) and [IPFS pubsub](../25-pubsub/).

One obstacle to enabling annotations of IIIF content is the fact that nobody wants to run an annotation server. Institutions want to let their own patrons and curators create annotations. Though they are also interested in seeing the annotations other people create, they don't want to get stuck storing the whole world's annotations indefinitely. That would be like your local public library committing to store all the notes anyone ever made about the books in their collection rather than letting everyone take their own notes home with them and store those notes as they see fit.

Peer to peer tools are the right tech to apply here. With the demo we set up, each node on the network holds its own copy of the annotations. The user of that node decides which streams of annotations they will publish to and subscribe from. Groups of people can share their annotations as they see fit. Third parties like the library can follow or ignore public streams, choosing which content to keep a copy of.

This is an example of the permissionless web — where nobody needs permission to create content or share it. There is no annotation server, so there is no gatekeeper deciding who gets to create annotations; everyone is free to create content as they see fit.

This peer-to-peer approach also gives us an example of the role for cultural institutions on the decentralized web. If each person or group is holding their own copies of the data they deem important, you inevitably need someone to coordinate the effort to ensure ongoing access to those data, to ensure that people will find/discover the content, and to ensure that the content is preserved for the long term. This is exactly the role that Libraries, Archives and Museums exist to fill.

In the demo, we showed annotations synchronizing between the two main IIIF viewers -- Mirador and Universal Viewer. We pointed the viewers at the same IIIF manifest and configured them to use a pre-selected pubsub channel. When a user adds an annotation in Mirador, it publishes the annotation to the pubsub channel and Universal Viewer displays the annotation on its copy of the image.

TODO: VIDEO* Present the demo (screen capture)

## The Tech: IPFS, CRDTs and pubsub

From a tech perspective, the first demo was easy — add all the content to IPFS and replace all the HTTP links with links to IPFS gateways. We use gateway links for backwards compatibility — if a browser that is aware of IPFS (i.e. with a web extension installed) it will intercept those gateway requests and resolve them via IPFS but a browser that doesn't speak IPFS will still work because it just sees the IPFS gateway as a regular HTTP server.

The second demo is where the tech gets interesting. It shows most of the building blocks you need to build a distributed, serverless application. It involves four parts

- IPFS - a way of persisting the data (i.e. the history of annotations) and replicating it between peers
- pubsub - a means of declaring named _channels_ or _topics_ that participants can _publish_ updates to and _subscribe_ to receive updates. This is how nodes tell each other when they have modified the data.
- CRDTs - a pattern for formatting your data/messages to support real-time collaborative editing. It allows you to ensure that everyone will see the same info ordered in the same way, even if the info arrived on each machine in a different order.
- End-user UX: the application that end-users rely on to view, create, and interact with the data. In this example, Mirador and Universal Viewer provide the end-user UX.

When people first learn about IPFS and read about immutable, content-addressed data, they inevitably ask "What about mutable data?" It's great that content-addressing gives us all of these powerful features (replication, integrity, etc) but the world is not static. To handle everyday use, we need to let data change over time; people need to be able to ask "What does the website look like _now_?" or "What's the current status of the dataset?". This annotations demo shows one way to do this in a decentralized context: pubsub with CRDTs.

As our [previous post about pubsub](../25-pubsub/) explains, the [Publish-Subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern can support things like collaborative document editing, "dynamic" website content, chat applications, multiplayer games, continuously evolving datasets,
and webservice workers passing around messages. To make this work in the real world, where you often have multiple parties contributing updates in parallel, you also need to merge changes as they arrive. This is where CRDTs (Conflict-Free Replicated Data Types) come in. CRDTs give us a way to deterministically handle updates to a feed so that all peers will eventually be consistent even if messages arrive in different orders.

An alternative to using CRDTs would be to track the 'head' of your data on a blockchain. This would allow you to rely on the blockchain's consensus model to enforce order on messages. For some applications, especially applications where you need to handle byzantine faults, a blockchain is a perfect solution. For other applications, where the priority is to support real-time collaborative updates between a known set of peers, CRDTs are a strong option. With both options you can write the bulk of your data to IPFS, putting the IPFS hashes of your data into the CRDT-formatted data or blockchain transactions.

If you would like to dive deeper into these topics, we have gathered a handful of reference materials in the PUBSUB_RESEARCH and CRDT_RESEARCH github repositories.

The code used in the demo is at https://github.com/viewdir/ipfs-experiments/tree/master/viewer-annotations

Relevant parts of the code:
* [viewer-annotations/uv.html](https://github.com/viewdir/ipfs-experiments/blob/master/viewer-annotations/uv.html): HTML and JavaScript to configure and display the Universal Viewer with IPFS pubsub support
* [viewer-annotations/mirador.html](https://github.com/viewdir/ipfs-experiments/blob/master/viewer-annotations/mirador.html): HTML and JavaScript to configure and display Mirador with IPFS pubsub support
* [viewer-annotations/js/ipfs-endpoint.js](https://github.com/viewdir/ipfs-experiments/blob/master/viewer-annotations/js/ipfs-endpoint.js): sample endpoint that the viewers use to publish and subscribe to annotations
* [ipfs-iiif-db](https://github.com/pgte/ipfs-iiif-db/): the code that deals with the details of putting IIIF annotations onto CRDTs and interacting with IPFS pubsub
* [yjs](https://github.com/y-js/yjs) the library that ipfs-iiif-db uses to handle CRDTs
* [js-ipfs pubsub API](https://github.com/ipfs/interface-ipfs-core/tree/master/API/pubsub) The JavaScript APIs for IPFS pubsub

For reference, many of the planning discussions for this demo were handled in [the Github Issue ipfs/notes#240](https://github.com/ipfs/notes/issues/240).

> **Technical note:** The pubsub channel name can be any string. For our demo, we chose a channel name based on the URI of the IIIF manifest that Mirador and Universal Viewer are using to display the image(s). The manifest URI is `http://wellcomelibrary.org/iiif/b18035723/manifest`, so we set the pubsub channel name to `http://wellcomelibrary.org/iiif/b18035723/manifest#ipfs-iiif-db-example`. While this approach to naming channels is only a stop gap measure, we like it for demos and experiments because it makes the pubsub channel names slightly descriptive — this channel contains the `ipfs-iiif-db-example` annotations about `http://wellcomelibrary.org/iiif/b18035723/manifest`.

## Implications

These demos touched on many big topics, pointing at major implications that extend far beyond Libraries, Archives and Museums. The first demo shows how decentralization can change the landscape for access, discovery and preservation of content. The serverless annotations demo provides an example of a distributed, serverless application that uses IPFS, CRDTs and a peer-to-peer implementation of the publish-subscribe pattern to display mutable, dynamic data.

## Future Work

If you like the ideas in this post, there is more to come. Here's a smattering of upcoming related work and a few speculative ideas that people might want to chase.

**Simplified libraries with clear docs & tutorials:** We aim to turn the [viewer-annotations code](https://github.com/viewdir/ipfs-experiments/tree/master/viewer-annotations) from the demo into a set of tutorials that people can use to learn about building distributed apps. This will also involve improving the documentation of all the underlying libraries. If you would like to help with this effort, please post issues on the github repositories or post a thread on the [IPFS community forums](https://discuss.ipfs.io).

**Decentralized database over IPFS**: Pedro Teixeras ([@pgte](https://github.com/pgte)) has already started making a more generic implementation of the CRDT + pubsub functionality we baked into [ipfs-iiif-db](https://github.com/pgte/ipfs-iiif-db/). Underneath the hood it implements the leveldown interface and replicates the data using CRDTs and IPFS pubsub. The working version of this serverless database is called [tevere](https://github.com/pgte/tevere), named after the river that runs through Rome.

**More efficient pubsub**: As noted in our [previous post about pubsub](../25-pubsub/), we plan to create a faster, more scalable implementation of the pubsub pattern.

**(maybe) Native support for IIIF on IPFS** It would be relatively easy to make a tool that automatically generates IIIF tiles and manifests based on any images you add to IPFS. This would allow us to make IIIF features like deep-zoom and open, standards-based annotations a default feature for all images and video you add to IPFS. The [go-iiif](https://thisisaaronland.github.io/go-iiif/) library has tools for this pre-processing, which would make it dead simple to provide an easy-to-install extension that people can run on their machines alongside go-ipfs.

**(ideal) IPLD resolver for JPEG2000**: Rather than generating tiles when people add images (which takes up more space than the original image), we could write an IPLD resolver for [JPEG2000](https://en.wikipedia.org/wiki/JPEG_2000), a compressed image format that lets you retrieve regions and varying resolutions directly from the file. This would allow any IPFS node to act as a JPEG2000 image server by installing that IPLD resolver.

_**About the author** Before becoming Program Manager at Protocol Labs, Matt Zumwalt spent 10 years building open source tools for Libraries and Archives. He was the tech lead on a [software framework used to curate many of the world's digital cultural heritage collections](https://projecthydra.org), and he advised digital repository projects at many research institutions such as Stanford, Oxford, and the Royal Library of Denmark_
