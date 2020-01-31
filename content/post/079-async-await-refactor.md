---
date: 2020-01-31
url: 2020-01-31-async-await-refactor
title: The Async Await Refactor
author: Alan Shaw
---

We're on the cusp of completing a refactor in the js-ipfs, js-libp2p and js-ipld codebases to use Promises and remove [Node.js streams](https://nodejs.org/dist/latest/docs/api/stream.html) and [pull streams](https://pull-stream.github.io/) from the code base entirely. We're using `async`/`await` everywhere (i.e. not the vanilla `then`/`catch` style of working with promises) and async iterables, allowing users to consume our streaming APIs with [`for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loops.

🚨 If you're using **js-ipfs** or **js-ipfs-http-client**, this is your early warning klaxon - the next releases of these two modules will have BIG breaking changes. Good news though, the [migration guide](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26) is already written and a pre-release of js-ipfs-http-client is already available for testing (`v42.0.0-pre.0`) along with a comprehensive [list of breaking changes](https://github.com/ipfs/js-ipfs-http-client/releases/tag/v42.0.0-pre.0). So, read this post and then check out those resources, it'll make the transition way easier, I promise you (no pun intended).

Motivations? Yes, we have them. Many of them in fact. Too many perhaps, because it tipped the scales in favour of a 60+ repo refactor! Something that no developers should take on lightly.

The refactor is much more than just a switch to promises, it's also primarily a refocus to offer a smaller, streaming-first core API to JS IPFS, giving our team and the community a code base that's much easier to debug, understand and maintain, as well as a few other reasons.

⚠️ It's important to note that the changes we're making don't actually alter the HTTP API or CLI in any way, these interfaces are untouched and remain compatible with the HTTP and CLI interfaces that go-ipfs exposes. The changes we're referring to only change the [core API](https://github.com/ipfs/interface-js-ipfs-core/tree/master/SPEC), which is the interface you'd use to interact with IPFS programmatically in JavaScript.

Anyway, motivations, yes, I've listed them below in a rough order of importance:

## 1. Streaming by default

We need streaming APIs by default. Currently we provide non-streaming APIs and our users are frustrated when things take a long time to yield any results _and_ they get no feedback. To explain a little, non-streaming APIs buffer data in memory. These are currently the _default_ in js-ipfs but we also provide streaming _alternatives_ of the same API methods. One such example is `ipfs.cat()`, for which we also expose `ipfs.catReadableStream()` and `ipfs.catPullStream()`.

When the size of the result is small and/or the information is readily available it is absolutely fine to have, and use, buffering APIs; we're not suggesting switching _all_ API methods to be streaming by default. However, when the size of the result is big or unknown and/or may not be instantly available it makes a whole lot more sense for it to be streamed.

**For big files, it's entirely necessary to stream data to reduce memory pressure**. This is particularly important for IPFS because typically users will not know the size of a file, given a hash, and it will be obtained from a network of poorly connected peers where locality and immediacy cannot be assumed. Bearing that in mind, we should provide APIs that a) encourage developers to do the right thing and not buffer content into memory regardless of the size of the file they're retrieving and b) reduce time to first byte, giving users visibility over progress and allowing them to differentiate between the file being unavailable or it being very large.

**Removing streaming alternatives reduces our API surface area**. That's good because it means there's simply fewer API methods for developers to understand and choose from. This just makes things a little easier, and by guiding developers towards streaming by default we're hopefully helping them to avoid OOM errors when their applications become popular or are used on resource constrained devices like mobile or when their users start sharing huge files.

A more concrete benefit of a smaller API surface area is that there is simply less code to ship. There's a lot less boilerplate and fewer streaming modules and conversion utilities that need to be `npm install`-ed or that make their way into the final bundle. That means a smaller `node_modules` directory and smaller browser builds for applications. There's also no performance hits to be had converting between two different streaming implementations.

## 2. Streaming with async iterables

Our streaming APIs will use [async iterables](https://javascript.info/async-iterators-generators). Thats significant for a couple of reasons. Firstly, since we've been talking about bundle sizes it's worth mentioning that using a streaming implementation that is actually a language feature means that we don't need to _bundle_ any libraries/modules to provide a streaming implementation! Obviously that also means that we don't need to `npm install` them either.

Secondly, **async iterables make streaming APIs approachable**. There's a BIG hurdle involved with streaming APIs that is lowered significantly by using async iterables instead of Node.js or pull streams. The hurdle is the understanding of the concepts, naming and usage that surrounds them that developers new to JS or new to streaming have to overcome.

There's a big conflict of interests in exposing streaming APIs and exposing an API that is easy to use and understand for _all_ developers. When you boil down the understanding of reading from a stream to a `for` loop (you read an async iterable using [`for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loops) then developers can instantly draw parallels to one of the first things they learnt in programming. This is simply not the case if your API returns a Node.js `ReadableStream` for example.

## 3. Better debugging

One of the best things about debugging in an `async`/`await` code base is that **stack traces are much better**. With callbacks you typically lose the stack trace across an async boundary because with callbacks, the call stack starts at the callback function.

This can make debugging super difficult because you can't get a good idea of the execution path of the program prior to the async boundary. The situation is improved by using promises but by using `async`/`await` it's _even better_:

> `await X()` suspends execution of the current function, while `promise.then(X)` continues execution of the current function after adding the X call to the callback chain. In the context of stack traces, this difference is pretty significant.
> https://mathiasbynens.be/notes/async-stack-traces

The upshot is that stack traces are more informative and span async boundaries giving developers more power to debug code.

The second best thing about debugging in an `async`/`await` code base is that synchronous and asynchronous errors are handled by the same construct: `try`/`catch`.

Asynchronous errors when using callbacks must be handled by checking for an error parameter passed to the callback function using an `if` statement. You must also either _trust_ that a call to a function that takes a callback does not throw synchronously (this is what most people do) or put a `try`/`catch` around it as well.

Likewise, if you're writing a function that takes a callback you've got to be _really_ careful that it doesn't throw, or make sure you catch any potential throws and pass them to the callback.

With promises the situation is significantly better, but you can still be in danger of an unhandled rejection if code in a `.catch()` throws.

With `async`/`await` you use only `try`/`catch`, and it works for all errors: synchronous and asynchronous. It reduces boilerplate and guards against uncaught exceptions and unhandled rejections making it significanly less likely your code will take down the process or unrecoverably crash your application.

The other super power that `try`/`catch` has is in combination with [`for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loops to stream data. I find it amazing that you can just `catch` an error in a stream and continue program execution. Let me explain why:

If you're familiar with Node.js streams you'll know that you have to add an event listener for the `error` event and then somehow deal with the error, and then continue program execution. You also need to listen for the `data` event _or_ "pipe" the stream somewhere and listen for an event that signifies that the stream has completed. Writable streams have `close` and `finish` events and you have to figure out the correct one to use, while worrying about whether the `close` listener gets called or not when an `error` occurs. Also, readable streams emit an `end` event, so, don't get confused between `end`, `close` and `finish`...or do, because y'all are humans.

Even if you do manage to figure this all out you now have two (or sometimes more) possible continuation points for your program that you have to juggle, which is not always easy.

At this point `catch`ing an error and being able to continue program execution from the same point after processing a stream asynchronously sounds super appealing! Just incase you didn't already notice this is another reason async iterables make streams aproachable!

## 4. Improved readability

Asynchronous code written using `async`/`await` is simply easier to follow than code written using callbacks or vanilla promises. This is a little subjective and I'm pretty sure there are ways and means of writing `async`/`await` code to make it more difficult to follow but for the most part, asynchronous code that can be read as though it is synchronous is easier to follow.

This is also true when working with conditionals. Things get hairy pretty quickly as soon as you need to conditionally execute async tasks and then continue with some common code. There's libraries that'll help with this but just being able to use an `if` statement is so much easier and doesn't require the cognitive overhead of understanding those libraries.

Readability is also improved by the reduction in overall code to look at. By this I mean that there's a lot less boilerplate involved with asychronous code written using `async`/`await`. In refactoring our callback based code we often found ourselves reducing 3 (or more) lines of code down to a single statement that achieved exactly the same task.

## 5. Performance improvements

The reduction in boilerplate in combination with the reduced API surface area (which meant we could remove many modules relating to different stream implementations) means **js-ipfs will be faster to `npm install`, take up less disk space and be smaller when bundled with your dweb applications**. A smaller bundle is great for saving bandwidth, but also faster to download and more friendly in low powered or resource constrained environments.

Any kind of streaming that was done previously was passing chunks through various conversion libraries and we were taking a performance hit for every chunk. This has been eradicated from js-ipfs and now we only do conversions where absolutely necessary when interfacing with TCP or WebSocket libraries for example.

Another important performance improvement of switching to streaming APIs by default is that it actually **enables operations that were previously impossible**, like listing a really really really REALLY big directory. We put the entirety of npm on js-ipfs a while ago and had this problem - our process just hung and eventually ran out of memory.

Outside of the `async`/`await` world, we've taken this opportunity to make some other changes we always wanted to get done to improve preformance, here's a few interesting ones:

1. Removed crypto libraries from `js-ipfs-http-client`. These were being brought in by the [`PeerId`](https://www.npmjs.com/package/peer-id) class and were basically unused. Instead of `PeerId` instances we now return strings, which, for the HTTP API does not result in any loss of information and it's made a huge reduction to the bundle size of the HTTP client.
1. Use [`BufferList`](https://www.npmjs.com/package/bl) throughout libp2p. This helps reduce unnecessary (and slow) buffer copies. Instead of using `Buffer.concat`, we just pass around `BufferList` instances and concat them together when absolutely necessary.
1. Return [`CID`](https://www.npmjs.com/package/cids) instances from core. This simply reduces the amount of conversions between string and buffer forms of CIDs. If you never need to see a CID as a string, you no longer have to do the work of encoding it. Previously this wasn't the case and all CIDs would be converted to strings and core would make assumptions about what multibase the CID should be encoded with.

Be sure to read the release notes when `js-ipfs` 0.41 is released because we will pack it with as many perf stats as we can get our hands on.

## 6. It's the right time to switch

Using `async`/`await` in JavaScript is gaining a _lot_ of traction in the ecosystem and is rapidly becoming the de facto way of writing idiomatic JS. We want `js-ipfs` to **move with the times and continue to be attractive to contributors** by using modern JS features, techniques and practices. The big idea with these changes is for the code to be easier to contribute to, easier to understand, easier to maintain, and be faster and smaller than ever.

The `async`/`await` syntax, async iterables and `for await...of` loops are now supported by the overwhelming majority of browsers as well as Node.js since v10. It means that we can continue to _not_ transpile our code, keeping debugging nice and easy.

Another great reason to make this switch is that **Node.js streams are async iterable**, and have been for a while now. So we can switch to async iterables and remove Node.js streams from the code base, but that doesn't stop us from accepting them as inputs because we don't need any special streaming code to be able to read from them. Browser streams will also hopefully follow this move too.

In rewriting the code base we built a few tools to help us work with async iterables and share code. They mostly begin with the `it-` prefix (for "iterable") which follows other existing module themes like the `p-` ("promises") collection of modules. They're being documented here: https://github.com/alanshaw/it-awesome

What's funny about these tools is that there's a iterator helpers proposal (https://github.com/tc39/proposal-iterator-helpers) at stage 2 of the TC39 process, which means that:

> The committee expects the feature to be developed and eventually included in the standard

It's funny because if the proposal makes it into the standard a bunch of them will become obsolete, so instead of, for example:

```js
const all = require('it-all')
const filesAdded = await all(ipfs.add([/* ... */]))
```

You will be able to, more simply:

```js
const filesAdded = await ipfs.add([/* ... */]).toArray()
```

One last thing, if you're currently using pull streams or Node.js streams extensively in your application and wondering/worrying how these changes will affect your code then see the appropriate [from pull streams](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26#from-pull-streams) and [from Node.js streams](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26#from-nodejs-streams) sections in the migration guide.

...and that's about...half of what needs to be said on the `async`/`await` refactor 😉. In the next blog post we'll cover some of the learnings of completing this big code refactor with a distributed team. In the mean time, watch out for the upcoming js-ipfs 0.41 RC and the release post when it finally lands.
