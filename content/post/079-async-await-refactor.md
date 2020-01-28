---
date: 2020-01-28
url: 2020-01-28-async-await-refactor
title: The Async Await Refactor
author: Alan Shaw
---

We're on the cusp of completing a refactor to the js-ipfs, js-libp2p and js-ipld codebases to use Promises and remove [Node.js streams](https://nodejs.org/dist/latest/docs/api/stream.html) and [pull streams](https://pull-stream.github.io/) from the code base entirely. We're using `async`/`await` everywhere (i.e. not the `then`/`catch` style of working with promises) and async iterables, allowing users to consume our streaming APIs with `for await (const chunk of iterable)` loops.

🚨 If you're using **js-ipfs** or **js-ipfs-http-client**, this is your early warning klaxon - the next releases of these two modules will have BIG breaking changes. Good news though, the [migration guide](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26) is already written and a pre-release of js-ipfs-http-client is already available for testing (`v42.0.0-pre.0`) along with a comprehensive [list of breaking changes](https://github.com/ipfs/js-ipfs-http-client/releases/tag/v42.0.0-pre.0). So, read this post and then check out those resources, it'll make the transition way easier, I promise you (no pun intended).

Motivations? Yes, we have them. Many of them in fact. Too many perhaps, because it tipped the scales in favour of a 60+ repo refactor! Something that no developers should take on lightly.

The refactor is much more than just a switch to promises, it's also primarily a refocus to offer a smaller, streaming-first core API to JS IPFS, as well as giving our team and the community a code base that's much easier to debug, understand and maintain, as well as a few other reasons.

⚠️ It's important to note that the changes we're making don't actually alter the HTTP API or CLI in any way, these interfaces are untouched and remain compatible with the HTTP and CLI interfaces that go-ipfs exposes. The changes we're referring to only change the [core API](https://github.com/ipfs/interface-js-ipfs-core/tree/master/SPEC), which is the interface you'd use to interact with IPFS programmatically in JavaScript.

Anyway, motivations, yes, I've listed them below in a rough order of importance:

1. Streaming by default

We need streaming APIs by default. Currently we provide non-streaming APIs and our users are frustrated when things take a long time to yield any results _and_ they get no feedback. To explain a little, non-streaming APIs buffer data in memory. These are currently the _default_ in js-ipfs but we also provide streaming _alternatives_ of the same API methods. One such example is `ipfs.cat()`, for which we also expose `ipfs.catReadableStream()` and `ipfs.catPullStream()`.

When the size of the result is small and/or the information is readily available it is absolutely fine to have, and use, buffering APIs; we're not suggesting switching _all_ API methods to be streaming by default. However, when the size of the result is big or unknown and/or may not be instantly available it makes a whole lot more sense for it to be streamed.

**For big files, it's entirely necessary to stream data to reduce memory pressure**. This is paricularly important for IPFS because typically a user will not know the size of a file, given a hash, and it will be obtained from a network of poorly connected peers where locality and immediacy cannot be assumed. Bearing that in mind, we should provide a APIs that a) encourages developers to do the right thing and not buffer content into memory regardless of the size of the file they're retrieving and b) reduces time to first byte, giving them visibility over progress and allows them to differentiate between the file being unavailable or it being large.

**Removing streaming alternatives reduces our API surface area**. That's good because it means there's simply fewer API methods for developers to understand and choose from. This just makes things a little easier, and by guiding them towards streaming by default we're hopefully helping them to avoid OOM errors when their applications become popular or are used on resource constrained devices like mobile or when their users start sharing huge files.

A more concrete benefit of a smaller API service area is that there is simply less code to ship. There's a lot less boilerplate and many fewer streaming modules and conversion utilities that need to be `npm install`-ed or that make their way into the final bundle. That means a smaller `node_modules` directory and smaller browser builds for your applications. There's also no performance hits to be had converting between two different streaming implementations.

1. Streaming with async iterables

Our streaming APIs will use async iterables. Thats significant for a couple of reasons. Firstly, since we've been talking about bundle sizes it's worth mentioning that using a streaming implementation that is actually a language feature means that we don't need to bundle any libraries/modules to provide a streaming implementation! Obviously that also means that we don't need to `npm install` them either.

Secondly, **async iterables make streaming APIs approachable**. There's a BIG hurdle involved with streaming APIs that is lowered significantly by using async iterables instead of Node.js or pull streams. The hurdle is the understanding of the concepts, naming and usage that surrounds them that developers new to JS or new to streaming have to overcome.

There's a big conflict in interests in exposing streaming APIs and exposing an API that is easy to use and understand for _all_ developers. When you boil down the understanding of reading from a stream to a `for` loop (you read an async iterable using [`for await...of` loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)) then developers can instantly draw parallels to one of the first things they learnt in programming. This is simply not the case if your API returns a Node.js `ReadableStream` for example.

1. Better debugging

* something about error handling over for loop
* pull streams pipeline super powerful, pump only recent. Error handling not present in .pipe
* no more uncaught exception - synchronous and asynchronous errors handled by the same construct (try/catch) 
* stack traces span async boundaries

1. Improved readability

* easier to follow code
* I prefer callbacks to then/catch but async/await is so much easier to follow

1. Reduced boilerplate
1. Reduced bundle size
1. More performant

* Finally, we still need to verify, but connection setup and data transfer may be faster now. In benchmarks taken at the mplex and lower levels we already know that performance has improved. One aspect of this is likely to be `BufferList`.

1. It's the right time to switch

* working with a code base that uses modern JS features, techniques and practices.

## ROUGH NOTES DO NOT READ BELOW HERE

Working with async iterables is not super new in JS but to use them in ways where they can be "piped" together, "written" to or as "duplex" streams for use in networking required some thinking and definition. It's nothing new really (I basically used a lot of ideas from pull streams) but I wrote down the information and the team have been using this document as their definition of the different types of streaming async iterables that are available (it is now referenced from js-libp2p docs): https://gist.github.com/alanshaw/591dc7dd54e4f99338a347ef568d6ee9

I created this repo to track modules for working with async iterables: https://github.com/alanshaw/it-awesome.


