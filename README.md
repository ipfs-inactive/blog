# IPFS Blog

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)

> Source for the [IPFS Blog](https://blog.ipfs.io)

![ipfs-blog @ 2018-11-30](https://ipfs.io/ipfs/QmYxumHGuNdu8rAwcw6kgc2UU1buJxv7V7uFs17tBx9w3W/ipfs-blog.png)

## Usage

The IPFS blog is a static website, built with `hugo`. We use `node`, `npm`, `less` and a few other helpful modules to optimize the site for deployment.
=======
- [Install](#install)
- [Usage](#usage)
  - [Creating a Post](#creating-a-post)
  - [Live editing](#live-editing)
  - [Theme](#theme)
- [Publishing Post](#publishing-post)
  - [Editing](#editing)
  - [Publishing](#publishing)
  - [Translating](#translating) (optional)
- [Contribute](#contribute)
  - [Want to hack on IPFS?](#want-to-hack-on-ipfs)
- [License](#license)

With `make`, [`node`](http://nodejs.org) and `npm` installed on your system, you can:

**Run the site in dev mode**

```console
$ make dev

# lots of output...
Web Server is available at http://localhost:1313/
```

The first time you run it, it will install all the dependencies ✨, Then it will watch for changes in the source code and rebuild the site when you save your changes.

Run it and open <http://localhost:1313/> in your browser, and start editing your new blog post.

**Build the production site**

```console
$ make

# lots of output...
Site built out to ./public dir
```

This will build out the static site, optimized and ready for deployment, to the `./public` directory.

## Create a new blog post

Each blog post is a markdown file, with a little meta data at the top (known as YAML front matter) to help us create the post index page.

A blog post looks like this:

```markdown
---
date: 2019-01-24
title: 2018 Q4 London Hack Week Summary
author: David Dias
---

Back in October last year, the Go Core Dev Team for the IPFS, IPLD and libp2p projects spent some quality time together

and so on... your _markdown_ goes **here**
```

**To create your new post** find the last post in `content/post`, create a copy, and change the file name by incrementing the number in the title, and change the name to be a useful url slug for your post. e.g.

```console
$ cd content/post
$ cp 66-london-hack-week-report.md 67-incredible-adventures.md
```

Now edit the metadata at the top of the file

- `date` - the "_published at_" date, shown on the [blog index page](https://blog.ipfs.io) - **required**
- `author` - used to give you credit for your words - **required**
- `title` - used as the `h1` on the post page, and the name of the post on the index page. **required**
- `tags` - don't appear to be used right now, but set them anyone, as we'll want to add a "see more posts like this one" feature one day.
- `url` - can be used to override the post url if needed.

We have a process for creating and reviewing content before it gets published. **Please review [PIPELINE.md](./PIPELINE.md) for the details.**

### Editing

Submit a Github PR with your changes, and request a review.

1. Make a change to a file
2. Add and commit.
3. Push to a remote branch.
4. Make a pull request to `master`.
5. Request a review from another member of the IPFS org.

### Publishing

CircleCI builds the static site, Pins it to our IPFS Cluster, and provides a preview link for review on the Gateway. Merges to to `master` does the same steps plus an update the DNSLink for the domain.
=======
1. `$ ipfs daemon`
2. `$ make publish`
   Now anyone who has the hash can access.
3. Go to IRC: Use pinbot to liase with all of the other 8 gateways (planets: Uranus, Venus, etc) and make sure they have it pinned. So, like so:

      `$ !pin <hash> <label>`

  The label (it should be `blog`) can change, of course. This can sometimes take ages, because there is a pinbug that causes a hang. Pinbot will tell you when it succeeds. If it continually hangs, the gateway needs to restart. Pin @lgierth or @whyrusleeping and tell them that the pinning bug is bugging you, and have them zap it. Then try pinning again (it should work right away).

4. `$ make publish-to-domain`

It will take a few minutes for the DNS update to propagate.

### Translating

Every post can be optionally translated by:

1. Ensuring `config.toml` includes relevant language code in `[languages]` section
2. Adding a translation file with correct locale suffix, for example:
	- English: `content/post/45-ipfs-weekly-11.md` → [/45-ipfs-weekly-11/](https://ipfs.io/ipfs/QmfEW4q4Z1G46m4rNhsYFHSsZumVX264dXQpUpRJ8hgczk/45-ipfs-weekly-11/)
	- Chinese: `content/post/45-ipfs-weekly-11.zh.md` → [/**zh**/45-ipfs-weekly-11/](https://ipfs.io/ipfs/QmfEW4q4Z1G46m4rNhsYFHSsZumVX264dXQpUpRJ8hgczk/zh/45-ipfs-weekly-11/)

	Note: To ensure translation is grouped with source post the `translationKey` needs to be the same in both, and `url` of translation needs to be prefixed with locale code, for example:
	```
	url: zh/45-ipfs-weekly-11
	translationKey: 45-ipfs-weekly-11
	```

Having that, non-english version will have unique URL, as seen on the example below:

| English | Chinese |
| ---- | ---- |
|  ![2018-09-30--00-04-11](https://user-images.githubusercontent.com/157609/46250892-c236ed80-c444-11e8-8099-a5d8fd320fa2.png) | ![2018-09-30--00-04-40](https://user-images.githubusercontent.com/157609/46250891-c236ed80-c444-11e8-9303-669ca3f8342d.png) |


## Contribute

Feel free to join in! PRs and [issues](https://github.com/ipfs/blog/issues) are welcome.

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

### Want to hack on IPFS?

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

## License

© Protocol Labs | Code is licensed with the [MIT](LICENSE) License. Except as noted, other content licensed [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/us/).
