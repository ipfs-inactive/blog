---
date: 2016-02-22
id: 10-ipscend-update
template: tmpl/layouts/post.html
baseurl: ..
breadcrumbs:
  - {name: "10-ipscend-update", link: "./" }
tags: publishing, web, app, publish
title: ipscend update, now compatible with IPFS 0.3.11
author: David Dias
collection: posts
---

[![](!img/ipscend.png)](https://github.com/diasdavid/ipscend)

> Web Application publishing, simple and distributed with IPFS


** The case for this tool 

# Using ipscend

- [ ] asciinema / video

# Users friendly

- [ ] explain naming problem
- [ ] explain how IPFS public gateways can be the proxies for users seemlessly (with graphs!)

# Next

When it comes to publishing web applications and web sites, some of the requirements to optimize the workflow and enhance the developer experience are very similar to the ones of publishing code packages. We've talked and demonstrated how IPFS is a perfect transport for moving around [packages of code](https://www.youtube.com/watch?v=-S-Tc7Gl8FM) or [containarized services](https://www.youtube.com/watch?v=vaIWRyotz4g), mainly for its ability to use bandwidth very efficiently with very smart and distributed discovery mechanism that guarantees integrity for the content being looked up.

## timeline view

One another feature that will increase signficantly the developer experience with `ipscend` is [**versioning**](https://github.com/ipfs/notes/issues/23). Apps, as any software piece, have several iterations across their lifetime and these iterations pack different things, like new features, complete application revamps or sometimes, regressions. 

Version Control Systems have enabled developers to work collaboratively in the same codebase, avoiding spending time in merge conflicts. We can improve these tools by letting developers, designers and other individuals have a quick access to the timeline of the application, make annotations of the current iterations before a release, be able to cherry pick with version to be released (visual rollbacks), analize if there has been any regressions in a specific browser and more.

Currently we have a `timeline` feature that let's you browser through screenshots of all of the published versions of your application.

![](http://zippy.gfycat.com/TameDampKob.gif)

## extending current VCS with IPFS and IPLD


