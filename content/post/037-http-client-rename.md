---
date: 2018-12-03
url: /58-http-client-rename/
title: The HTTP client libraries are being renamed!
author: Alan Shaw
---

👋 hey everyone! If you're using one of the many HTTP client libraries for IPFS then this blog post is for you!

The important news is that we're renaming the HTTP client libraries from `ipfs-api` to `ipfs-http-client`. I know, it's longer. BUT, and hear me out - it's SOOO much better at describing what the module is.

In the past people have been baffled and outraged thinking `ipfs-api` is THE implementation of IPFS, when it's not, it's just a client to the HTTP API that IPFS exposes. We finally said, "Enough is enough! The people have been confused for far too long and we must change the name! We owe them this much!", and with the utterance of those fabled words the gears were set in motion and this very blog post was committed to ~~stone~~ Github.

The JS module is DONE! You can still install `ipfs-api` with npm, but you'll get a deprecation notice and no further updates will be published under that name.

Use `npm install ipfs-http-client` from now on! Don't delay ⏰, update your `package.json`'s today!

You can also check on the progress over at https://github.com/ipfs/ipfs/issues/374
