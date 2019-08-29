---
date: 2019-08-29
url: 2019-08-29-pubsub-in-the-browser
title: PubSub in the browser with the JS IPFS HTTP API client
author: Alan Shaw
---

> EXCELLENT NEWS! You can now pubsub with the JS IPFS HTTP API client in the BROWSER!

Due to [boring technical reasons](https://github.com/ipfs/js-ipfs-http-client/issues/518) it’s previously not been possible to support [pubsub](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) over the [HTTP API](https://docs.ipfs.io/reference/api/http/) in the browser but since the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) now supports cancelation (and has done for a while) it’s now possible! Hooray \o/

There’s also a brand new example application that you can play with showing how to use pubsub in the browser:

[github.com/ipfs/js-ipfs-http-client/examples/browser-pubsub](https://github.com/ipfs/js-ipfs-http-client/tree/master/examples/browser-pubsub)

![Screenshot of PubSub in the browser example app](/056-pubsub-in-the-browser/demo-screenshot.png)

This was made possible by the experimentation done in a [“lite” http client](https://github.com/ipfs-shipyard/js-ipfs-http-client-lite) I was working on, which was originally meant to be just really really small (it’s currently ~13kb gzipped vs ~200kb for the regular client). To make it small we needed to switch to using the fetch API but I soon realised that this opened up a bunch of opportunities like enabling pubsub in addition to just being really small (we get easily cancelable requests, request timeouts, custom fetch implementations and a switch to async/await and async iterators).

I originally demoed it in the lite client here: https://www.youtube.com/watch?v=NZb6ybkAYWs

The lite client has been a great proving ground for ensuring the “hard parts” of the API are now possible using browser native APIs and I’ll be applying more the learnings from there to the regular http client in the near future which should hopefully result in a smaller bundle size as well as more cool new features like this one.

Version 34 of `ipfs-http-client` is out now! https://www.npmjs.com/package/ipfs-http-client/v/34.0.0

Thanks for reading 😘
