# IPFS Blog

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)

> Source for the [IPFS Blog](https://blog.ipfs.io)

![ipfs-blog @ 2018-11-30](https://ipfs.io/ipfs/QmYxumHGuNdu8rAwcw6kgc2UU1buJxv7V7uFs17tBx9w3W/ipfs-blog.png)

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

We add the static site to IPFS, Pin it to our IPFS Cluster, and then update the DNSLink for the domain.

**You will need an access a DigitalOcean access token** with permission to edit records on blog.ipfs.io to update the site.

6. `$ git checkout master && git pull origin master`
7. `$ ipfs daemon`
8. `$ make publish`
  Now anyone who has the hash can access.
10. Use pinbot on IRC to pin the new hash across our IPFS cluster.

      `$ !pin <hash> <label>`

  Use the label `blog` to keep the tradition.

11. Run `$ make publish-to-domain` to update the DNSLink on blog.ipfs.io

It will take a few minutes for the DNS update to propagate.

## Contribute

Feel free to join in! PRs and [issues](https://github.com/ipfs/blog/issues) are welcome.

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

### Want to hack on IPFS?

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

## License

© Protocol Labs | Code is licensed with the [MIT](LICENSE) License. Except as noted, other content licensed [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/us/).
