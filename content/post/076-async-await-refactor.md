---
date: 2019-12-10
url: 2019-12-10-async-await-refactor
title: The async await refactor
author: Alan Shaw
---

We're on the cusp of completing a refactor to the js-ipfs, js-libp2p and js-ipld codebases to use Promises and remove [Node.js streams](https://nodejs.org/dist/latest/docs/api/stream.html) and [pull streams](https://pull-stream.github.io/) from the code base entirely. We're using `async`/`await` everywhere (i.e. not the `then`/`catch` style of working with promises) and async iterables, allowing users to consume our streaming APIs with `for await (const chunk of iterable)` loops.

🚨 If you're using **js-ipfs** or **js-ipfs-http-client**, this is your early warning klaxon - the next releases of these two modules will have BIG breaking changes. Good news though, the [migration guide](https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26) is already written and a pre-release of js-ipfs-http-client is already available for testing (`v42.0.0-pre.0`) along with a comprehensive [list of breaking changes](https://github.com/ipfs/js-ipfs-http-client/releases/tag/v42.0.0-pre.0). So, read this post and then check out those resources, it'll make the transition way easier, I promise you (no pun intended).

Motivations? Yes, we have them. Many of them in fact. Too many perhaps, because it tipped the scales in favour of a 60+ repo refactor! Something that no developers should take on lightly.

The refactor is much more than just a switch to promises, it's also primarily a refocus to offer a smaller, streaming-first core API to JS IPFS, as well as giving our team and the community a code base that's much easier to debug, understand and maintain amongst a bunch of other things.

It's important to note that these changes don't actually alter the HTTP API or CLI in any way, they only change the [programmatic core API](https://github.com/ipfs/interface-js-ipfs-core/tree/master/SPEC).

I've listed these in order of what I deem to be the most important:

1. Streaming by default
1. Better debugging
1. Improved readability
1. Reduced boilerplate
1. Reduced bundle size
1. More performant

> If you're considering a refactor that'll touch ~70 interdependent repos you've come to the right place for some perspective.

If you think you'd like to take on a challenge like this, do the math. If each repo takes a day to refactor and if you work on it 5 days a week then you've automatically used 14 of your 52 weeks in a year. That's like, 4 months, and that's the absolute best case scenario.

In reality, even if you get approval to do it you're unlikely to be able to work on it all day every day. The problem is that the benefits of a refactor like this can't really be seen until everything is done and the whole stack is using the new code. I'll go into the benefits more later, but the point is, **your project needs to keep moving**. New features need to land and those bugs don't squash themselves.

Refactors to each dependent repo **won't take just one day**. A tiny percentage of them will take less than a day but the vast majority will take multiple days to complete, if not weeks.

You'll be tempted to make those API changes and performance refactors you've always wanted to make. **Beware of scope creep**. If you also decide to take on these tasks, be aware that you're adding to the complexity of integrating a massive breaking change and also to the time the refactor is going to take. You'll probably significantly underestimate the amount of extra time your additional changes will take to write, be tested, be reviewed and re-integrated into the project. **Stay focused**. You cannot make everything perfect now. Pick your battles, open an issue, and move on.

Some repos will just take days or weeks to actually convert, and that's not even including converting the tests, getting your work reviewed, making changes from review feedback or rebasing your work because master got this critical security fix in the interim.

Prioritise refactors by dependents. It's obvious, but maybe worth highlighting - the only way you're going to get this done is from the bottom up. **Refactor repos that don't depend on anything first**. Make a list and assign an approximate priority to each repo based on how many other repos it depends on.

It's not always possible to use a refactored repo in your dependencies. Sometimes this is due to a circular dependency but sometimes the refactor in another repo is taking longer than expected or is blocked on something else. **Unblock yourself with facades**. You can make the old look like the new but consider it carefully. Doing this takes time and will need to be revisited at a later date to be removed once the dependency refactor is released. In our refactor we made use of `promisify` and `callbackify` modules and also created facades to make the new look like the old so that it could get into production sooner.

Keep track of what's been done, who is owning what, and where the PR is.

It's taken us 1 year and 2 months so far, but we're nearly there.

## ROUGH NOTES DO NOT READ BELOW HERE

* I prefer callbacks to then/catch
* streaming is valuable but learning how steams work is difficult
* async iterables significantly lower the barrier to entry to using streams - when streaming is as easy as writing a for loop (one of the first things most people are taught)
* something about error handling over for loop
* no more uncaught exception - synchronous and asynchronous errors handled by the same construct (try/catch) 
* stack traces span async boundaries
* easier to follow code
* pull streams pipeline super powerful, pump only recent. Error handling not present in .pipe
* identify what is changing

Working with async iterables is not super new in JS but to use them in ways where they can be "piped" together, "written" to or as "duplex" streams for use in networking required some thinking and definition. It's nothing new really (I basically used a lot of ideas from pull streams) but I wrote down the information and the team have been using this document as their definition of the different types of streaming async iterables that are available (it is now referenced from js-libp2p docs): https://gist.github.com/alanshaw/591dc7dd54e4f99338a347ef568d6ee9

I created this repo to track modules for working with async iterables: https://github.com/alanshaw/it-awesome. I created many of the modules listed and started a nomenclature around the modules (the "it-" prefix which stands for "iterable").

We need streaming APIs by default. Currently we provide non-streaming APIs and users are frustrated when things take a long time to yield any results _and_ they get no feedback. For big files, it's entirely necessary to stream data and given the majority of people won't know the size of the file they're retrieving, and are trying to obtain it from a network of poorly connected peers we should provide an API that a) encourages them to do the right thing and not buffer content into memory regardless of the size of the file they're retrieving and b) reduces time to first byte, gives them visibility over progress and allows them to differentiate between the file being unavailable or it being large.

At the moment the async/await PR to js-ipfs-http-client has a net removal of ~360 lines of code and decreases the bundle size from ~250kb to ~90kb (gzipped).

The async/await PR to js-ipfs currently has a net removal of ~2,600 lines of code and a bundle size reduction of around 70kb (gzipped).

js-ipfs now has only 105 direct dependencies, down from 132. We should be able to get this below 100 soon. This is still a lot, but removing 27 dependencies is definitely going to help with npm install times.

Another notable win is that in CI we're seeing test run times reductions by around 5-10 minutes on linux.

These are interesting stats and have real benefits to end users but what I'm really interested in is the wins that the team and the community will see from this change going forward.

For the team there's just less code to work with. That sounds innocuous but at the end of the day, the less code that there is to run, the fewer things that can go wrong. There's less boilerplate, no chance of forgetting to handle errors in callbacks, no more worries about calling callbacks multiple times, no more worries about uncaught exceptions that should have been passed to a callback, fewer transforms between Node.js streams and pull streams and vice versa, and many more.

Subjectively, asynchronous code written with async/await is easier to read, understand and follow - a view _I know_ is held by the whole team.

The team and the whole community can benefit from the code being easier to debug since we'll get better stack traces that aren't clipped at async boundaries and they can both also benefit from working with a code base that uses modern JS features, techniques and practices.

Finally, we still need to verify, but connection setup and data transfer may be faster now. In benchmarks taken at the mplex and lower levels we already know that performance has improved. One aspect of this is likely to be `BufferList`, which I made great effort to now thread through libp2p. It allows us to avoid unnecessary (and slow) buffer copies. Something that was flagged as being a performance bottleneck by NearForm.

https://github.com/tc39/proposal-iterator-helpers

Migration guide:
https://gist.github.com/alanshaw/04b2ddc35a6fff25c040c011ac6acf26
