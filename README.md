# IPFS Blog

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)

> Source for the [IPFS Blog](https://blog.ipfs.io)

![ipfs-blog @ 2018-11-30](https://ipfs.io/ipfs/QmYxumHGuNdu8rAwcw6kgc2UU1buJxv7V7uFs17tBx9w3W/ipfs-blog.png)

- [Usage](#usage)
- [Publishing Post](#create-a-new-blog-post)
  - [Editing](#editing)
  - [Publishing](#publishing)
  - [Translating](#translating-%EF%B8%8F) (optional)
- [Contribute](#contribute)
  - [Want to hack on IPFS?](#want-to-hack-on-ipfs)
- [License](#license)


## Usage

The IPFS blog is a static website, built with `hugo`. We use `node`, `npm`, `less` and a few other helpful modules to optimize the site for deployment.

With `make`, [`node`](http://nodejs.org) and `npm` installed on your system, you can:

**Run the site in dev mode**

```console
$ make dev

# lots of output...
Web Server is available at http://localhost:1313/
```

The first time you run it, it will install all the dependencies ✨, Then it will watch for changes in the source code and rebuild the site when you save your changes.

Run it and open <http://localhost:1313/> in your browser, and start editing your new blog post.

_**Note**: Blog posts are only displayed (at their own URLs and in the index) once the date listed in their YAML front matter has arrived. This means it's not possible to preview a post on localhost that is set to a future publication date._

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

- `date` - the "_published at_" date, shown on the [blog index page](https://blog.ipfs.io) - please update at posting time to reflect current date (if you postdate a post in advance of publication, it will not appear when you preview the site locally; only posts with current and past dates are displayed) - **required**
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

CircleCI builds the static site, Pins it to our IPFS Cluster, and provides a preview link for review on the Gateway. Merges to to `master` do the same steps plus an update the DNSLink for the domain.

In order for CircleCI to build the site after your merge, you *must* be a member of the [website-deployers](https://github.com/orgs/ipfs/teams/website-deployers/members), comms, gui or admin teams on the IPFS github org and you *must* subscribe to the CircleCI builds for the ipfs/blog repository. Create a free CircleCI account, and then [subscribe to the repo here](https://circleci.com/gh/ipfs/workflows/blog/tree/master).

After the CircleCI build completes, it will take a few minutes for the DNS update to propagate and your changes to show up on the website.

### Translating 🌐✍️🖖

Every post can be optionally translated by:

1. Ensuring `config.toml` includes relevant [language code](http://www.rssboard.org/rss-language-codes) in `[languages]` section
2. Adding a translation file with correct locale suffix, for example:
	- English: `content/post/45-ipfs-weekly-11.md` → //blog.ipfs.io/45-ipfs-weekly-11/
	- Chinese (Simplified): `content-i18n/<lang_code>/post/45-ipfs-weekly-11.md` → //blog.ipfs.io/**zh-cn**/45-ipfs-weekly-11/

	Note: To ensure translation is grouped with source post the `translationKey` header needs to be the same in both files, and `url` of translation needs to be prefixed with locale code (`zh-cn` for Chinese Simplified), for example:
	```markdown
    ---
    date: 2018-09-25
    title: IPFS 周报-11
    url: zh-cn/45-ipfs-weekly-11
    translationKey: 45-ipfs-weekly-11
    ---
	```

Having that, non-english version will have unique URL, as seen on the example below:

| Chinese (Simplified)                                                                                      | English                                                                                                      |
| ----                                                                                                      | ----                                                                                                         |
| ![en](https://user-images.githubusercontent.com/157609/52483815-13a27680-2bb5-11e9-83d5-63a3f0122728.png) | ![zh-cn](https://user-images.githubusercontent.com/157609/52483825-169d6700-2bb5-11e9-94a6-cfde2f82e2b7.png) |


## Contribute

Feel free to join in! PRs and [issues](https://github.com/ipfs/blog/issues) are welcome.

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

### Want to hack on IPFS?

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)

## License

© Protocol Labs | Code is licensed with the [MIT](LICENSE) License. Except as noted, other content licensed [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/us/).
