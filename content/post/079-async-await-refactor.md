---
date: 2020-02-01
url: /2020-02-01-async-await-refactor/
title: The Async Await Refactor
author: Alan Shaw
---

We're on the cusp of completing a refactor in the js-ipfs, js-libp2p and js-ipld codebases to use Promises and remove [Node.js streams](https://nodejs.org/dist/latest/docs/api/stream.html) and [pull streams](https://pull-stream.github.io/) from the code base entirely. We're using `async`/`await` everywhere (i.e. not the vanilla `then`/`catch` style of working with promises) and async iterables, allowing users to consume our streaming APIs with [`for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loops.

🚨 If you're using **js-ipfs** or **js-ipfs-http-client**, this is your early warning klaxon - the next releases of these two modules will have BIG breaking changes. Good news though, the [migration guide](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26) is already written and a pre-release of js-ipfs-http-client is already available for testing (`v42.0.0-pre.0`) along with a comprehensive [list of breaking changes](https://github.com/ipfs/js-ipfs-http-client/releases/tag/v42.0.0-pre.0). So, read this post and then check out those resources, it'll make the transition way easier, I promise you (no pun intended).

Motivations? Yes, we have them. Many of them in fact. Too many perhaps, because it tipped the scales in favour of a 60+ repo refactor! Something that no developers should take on lightly.

The refactor is much more than just a switch to promises, it's also primarily a refocus to offer a smaller, streaming-first core API to js-ipfs, giving our team and the community a code base that's much easier to debug, understand and maintain, as well as a few other reasons.

⚠️ It's important to note that the changes we're making don't actually alter the HTTP API or CLI in any way, these interfaces are untouched and remain compatible with the HTTP and CLI interfaces that go-ipfs exposes. The changes we're referring to only change the [core API](https://github.com/ipfs/interface-js-ipfs-core/tree/master/SPEC), which is the interface you'd use to interact with IPFS programmatically in JavaScript.

Anyway, motivations, yes, I've listed them below in a rough order of importance:

## 1. Streaming by default

We need streaming APIs by default. Currently we provide non-streaming APIs and our users are frustrated when things take a long time to yield any results _and_ they get no feedback. To explain a little, non-streaming APIs buffer data in memory. These are currently the _default_ in js-ipfs but we also provide streaming _alternatives_ of the same API methods. One such example is `ipfs.cat()`, for which we also expose `ipfs.catReadableStream()` and `ipfs.catPullStream()`.

When the size of the result is small and/or the information is readily available it is absolutely fine to have, and use, buffering APIs; we're not suggesting switching _all_ API methods to be streaming by default. However, when the size of the result is big or unknown and/or may not be instantly available it makes a whole lot more sense for it to be streamed.

**For big files, it's entirely necessary to stream data to reduce memory pressure**. This is particularly important for IPFS because typically users will not know the size of a file, given a hash, and it will be obtained from a network of poorly connected peers where locality and immediacy cannot be assumed. Bearing that in mind, we should provide APIs that a) encourage developers to do the right thing and not buffer content into memory regardless of the size of the file they're retrieving and b) reduce time to first byte, giving users visibility over progress and allowing them to differentiate between the file being unavailable or it being very large.

**Removing streaming alternatives reduces our API surface area**. That's good because it means there's simply fewer API methods for developers to understand and choose from. This just makes things a little easier, and by guiding developers towards streaming by default we're hopefully helping them to avoid OOM errors when their applications become popular or are used on resource constrained devices like mobile or when their users start sharing huge files.

A more concrete benefit of a smaller API surface area is that there is simply less code to ship. There's a lot less boilerplate and fewer streaming modules and conversion utilities that need to be `npm install`-ed or that make their way into the final bundle. That means a smaller `node_modules` directory and smaller browser builds for applications. There's also no performance hits to be had converting between two different streaming implementations.

## 2. Streaming with async iterables

Our streaming APIs will use [async iterables](https://javascript.info/async-iterators-generators). That's significant for a couple of reasons. Firstly, since we've been talking about bundle sizes it's worth mentioning that using a streaming implementation that is actually a language feature means that we don't need to _bundle_ any libraries/modules to provide a streaming implementation! Obviously, that also means that we don't need to `npm install` them either.

Secondly, **async iterables make streaming APIs approachable**. There's a BIG hurdle involved with streaming APIs that is lowered significantly by using async iterables instead of Node.js or pull streams. That hurdle is understanding the naming, usage, and concepts, which developers new to JS or new to streaming have to overcome.

There's tension between exposing streaming APIs vs exposing an API that is easy to use and understand for _all_ developers. With async iterables, you can boil down the understanding of reading from a stream to a `for` loop (you read an async iterable using [`for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loops), helping developers instantly draw parallels to one of the first things they learnt in programming and making streaming APIs easier to use. This is simply not the case if your API returns a Node.js `ReadableStream` for example.

## 3. Better debugging

One of the best things about debugging in an `async`/`await` code base is that **stack traces are much better**. With callbacks you typically lose the stack trace across an async boundary because with callbacks, the call stack starts at the callback function.

This can make debugging super difficult because you can't get a good idea of the execution path of the program prior to the async boundary. The situation is improved by using promises, but using `async`/`await` is _even better_:

> `await X()` suspends execution of the current function, while `promise.then(X)` continues execution of the current function after adding the X call to the callback chain. In the context of stack traces, this difference is pretty significant.
> https://mathiasbynens.be/notes/async-stack-traces

The upshot is that stack traces are more informative and span async boundaries, giving developers more power to debug code. Take this example using callbacks:

```js
function one (callback) {
  setTimeout(() => two(callback))
}

function two (callback) {
  setTimeout(() => three(callback))
}

function three (callback) {
  try {
    throw new Error('boom')
  } catch (err) {
    callback(err)
  }
}

one(err => console.error(err))
```

It yields the following stack:

```
Error: boom
    at three (cb-stacks.js:11:11)
    at Timeout._onTimeout (cb-stacks.js:6:20)
    at listOnTimeout (internal/timers.js:531:17)
    at processTimers (internal/timers.js:475:7)
```

What happened before the call to `three`? We can't see past the async boundary. An approximately equivalent example using `async`/`await`:

```js
async function one () {
  await two()
}

async function two () {
  await three()
}

async function three () {
  throw new Error('boom')
}

one().catch(err => console.error(err))
```

Yields the following stack:

```
Error: boom
    at three (async-fn-stack.js:10:9)
    at two (async-fn-stack.js:6:9)
    at one (async-fn-stack.js:2:9)
    at Object.<anonymous> (async-fn-stack.js:13:1)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1103:10)
    at Module.load (internal/modules/cjs/loader.js:914:32)
    at Function.Module._load (internal/modules/cjs/loader.js:822:14)
    at Function.Module.runMain (internal/modules/cjs/loader.js:1143:12)
    at internal/main/run_main_module.js:16:11
```

Aha! We can now trace this all the way back to the call to `one`!

The second best thing about debugging in an `async`/`await` code base is that synchronous and asynchronous errors are handled by the same construct: `try`/`catch`.

Asynchronous errors when using callbacks must be handled by checking for an error parameter passed to the callback function using an `if` statement:

```js
saveData(someData, (err, result) => {
  if (err) {
    console.error(err) // handle the error
    return // remember to return or execution continues!
  }
  // continue the program, no error happened yet :)
})
```

Synchronous errors can be thrown on purpose, using `throw new Error('...')` or because of bugs in the code e.g. `Cannot read property 'z' of undefined`, `x is not a function` etc. etc. and _must_ be handled with a `try`/`catch` block.

Typically, developers _trust_ that a call to a function that does asynchronous work will not throw an error _synchronously_ so they don't put `try`/`catch` around calls to them. They also _trust_ that they won't throw an error _after_ they've done some async work because they have no means to catch it - even if there were a `try`/`catch`, program execution has moved outside of the scope of it. Hence the need for any errors to be passed to a callback. So, when using callbacks, any thrown errors, synchronous or asynchronous can cause uncaught exceptions and force a mixing of two different error handling strategies e.g.

```js
function saveData (someData, callback) {
  let serialized

  // Handle synchronous error with try/catch
  try {
    serialized = JSON.stringify(someData.map(d => d.value))
  } catch (err) {
    // (This should really be called on a future tick or we risk unleashing zalgo
    // https://blog.izs.me/2013/08/designing-apis-for-asynchrony)
    return callback(err)
  }

  fs.writeFile('/path/to/data.json', serialized, err => {
    // Handle asynchronous error from fs.writeFile with if statement
    if (err) {
      return callback(err)
    }

    callback()
  })
}
```

With promises, the situation is significantly better, because thrown errors are caught for you, but you can still be in danger of causing an unhandled rejection if code in a `.catch()` throws an error.

With `async`/`await` you use only `try`/`catch`, and it works for all errors: synchronous and asynchronous. It reduces boilerplate and guards against uncaught exceptions and unhandled rejections making it significanly less likely your code will take down the process or unrecoverably crash your application:

```js
async function saveData (someData) {
  const serialized = JSON.stringify(someData.map(d => d.value))
  await fs.promises.writeFile('/path/to/data.json', serialized)
}

try {
  await saveData(someData)
} catch (err) {
  // Could be a sync error caused by serialization, or an async error from writing the file
  console.error(err)
}
```

The other super power that `try`/`catch` has is that you can wrap it around a [`for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loop to catch errors in a stream. Having had to deal with error handling in Node.js streams for many years I find it _incredible_ that you can just `catch` an error in a stream and continue program execution. Let me explain why:

If you're familiar with Node.js streams you'll know that you have to add an event listener for the `error` event and then somehow deal with the error, and then continue program execution. You also need to listen for the `data` event _or_ "pipe" the stream somewhere and listen for an event that signifies that the stream has completed. Writable streams have `close` and `finish` events and you have to figure out the correct one to use, while worrying about whether the `close` listener gets called or not when an `error` occurs. Also, readable streams emit an `end` event, so, don't get confused between `end`, `close` and `finish`...or do, because we're all humans.

Even if you do manage to figure this all out you now have two (or sometimes more) possible continuation points for your program that you have to juggle, which is not always easy.

Note: it would be remiss of me not to mention that there are modules out there that help with this, [`pump`](https://www.npmjs.com/package/pump) and [`pipeline`](https://nodejs.org/dist/latest/docs/api/stream.html#stream_stream_pipeline_streams_callback) are two popular examples. These utils essentially hide the complexity of dealing with streams, which is convenient, but doesn't always mean you can simply ignore that it's there.

At this point, `catch`ing an error and being able to continue program execution from the same point after processing a stream asynchronously sounds super appealing! Just incase you didn't already notice this is another reason async iterables make streams aproachable!

## 4. Improved readability

Asynchronous code written using `async`/`await` is simply easier to follow than code written using callbacks or vanilla promises. This is a little subjective and I'm pretty sure there are ways and means of writing `async`/`await` code to make it more difficult to follow but for the most part, asynchronous code that can be read as though it is synchronous is easier to follow.

This is also true when working with conditionals. Things get hairy pretty quickly as soon as you need to conditionally execute async tasks and then continue with some common code. There's libraries that'll help with this but just being able to use an `if` statement is so much easier and doesn't require the cognitive overhead of understanding those libraries.

Readability is also improved by the reduction in overall code to look at. By this I mean that there's a lot less boilerplate involved with asychronous code written using `async`/`await`. In refactoring our callback based code we often found ourselves reducing 3 (or more) lines of code down to a single statement that achieved exactly the same task.

## 5. Performance improvements

The reduction in boilerplate in combination with the reduced API surface area (which meant we could remove many modules relating to different stream implementations) means **js-ipfs will be faster to `npm install`, take up less disk space and be smaller when bundled with your dweb applications**. A smaller bundle is great for saving bandwidth, but also faster to download and friendlier in low powered or resource constrained environments.

Any kind of streaming that was done previously was passing chunks through various conversion libraries and we were taking a performance hit for every chunk. This has been eradicated from js-ipfs and now we only do conversions where absolutely necessary when interfacing with TCP or WebSocket libraries for example.

Another important performance improvement of switching to streaming APIs by default is that it actually **enables operations that were previously impossible**, like listing a really really really REALLY big directory. We put the entirety of npm on js-ipfs a while ago and had this problem - our process just hung and eventually ran out of memory.

Outside of the `async`/`await` world, we've taken this opportunity to make some other changes we always wanted to get done to improve preformance, here's a few interesting ones:

1. Removed crypto libraries from js-ipfs-http-client. These were being brought in by the [`PeerId`](https://www.npmjs.com/package/peer-id) class and were basically unused. Instead of `PeerId` instances we now return strings, which, for the HTTP API does not result in any loss of information and it's made a huge reduction to the bundle size of the HTTP client.
1. Use [`BufferList`](https://www.npmjs.com/package/bl) throughout libp2p. This helps reduce unnecessary (and slow) buffer copies. Instead of using `Buffer.concat`, we just pass around `BufferList` instances and concat them together when absolutely necessary.
1. Return [`CID`](https://www.npmjs.com/package/cids) instances from core. This simply reduces the amount of conversions between string and buffer forms of CIDs. If you never need to see a CID as a string, you no longer have to do the work of encoding it. Previously this wasn't the case and all CIDs would be converted to strings and core would make assumptions about what multibase the CID should be encoded with.

Be sure to read the release notes when js-ipfs 0.41 is released because we will pack it with as many perf stats as we can get our hands on.

## 6. It's the right time to switch

Using `async`/`await` in JavaScript is gaining a _lot_ of traction in the ecosystem and is rapidly becoming the de facto way of writing idiomatic JS. We want js-ipfs to **move with the times and continue to be attractive to contributors** by using modern JS features, techniques and practices. The big idea with these changes is for the code to be easier to contribute to, easier to understand, easier to maintain, and be faster and smaller than ever.

The `async`/`await` syntax, async iterables and `for await...of` loops are now supported by the overwhelming majority of browsers as well as Node.js since v10. It means that we can continue to _not_ transpile our code, keeping debugging nice and easy.

Another great reason to make this switch is that **Node.js streams are async iterable**, and have been for a while now. So we can switch to async iterables and remove Node.js streams from the code base, but that doesn't stop us from accepting them as inputs because we don't need any special streaming code to be able to read from them. Browser streams will also hopefully follow this move too.

In rewriting the code base we built a few tools to help us work with async iterables and share code. They mostly begin with the `it-` prefix (for "iterable") which follows other existing module themes like the `p-` ("promises") collection of modules. They're being documented here: https://github.com/alanshaw/it-awesome

One thing you should know about these tools is that there's an iterator helpers proposal (https://github.com/tc39/proposal-iterator-helpers) at stage 2 of the TC39 process, so...

> The committee expects the feature to be developed and eventually included in the standard

It means that when/if the proposal makes it into the standard a bunch of them will become obsolete, so instead of, for example:

```js
const all = require('it-all')
const filesAdded = await all(ipfs.add([/* ... */]))
```

You will be able to, more simply:

```js
const filesAdded = await ipfs.add([/* ... */]).toArray()
```

Awesome, huh!!

...and that's about...half of what needs to be said on the `async`/`await` refactor 😉. In the next blog post we'll cover some of the learnings of completing this big code refactor with a distributed team. In the mean time, watch out for the upcoming js-ipfs 0.41 RC and the release post when it finally lands.
