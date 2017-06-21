# IPFS Blog

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Source for the [IPFS Blog](http://ipfs.io/blog)

![](https://www.evernote.com/l/AMaEbN3YfmVC-JDtlxRdFnMMbfvQjQlmU9MB/image.png)

#### Please Review [PIPELINE.md](./PIPELINE.md) to understand how this repo pipeline works.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Creating a Post](#creating-a-post)
  - [Live editing](#live-editing)
  - [Theme](#theme)
- [Publishing Post](#publishing-post)
  - [Editing](#editing)
  - [Publishing](#publishing)
- [Contribute](#contribute)
  - [Want to hack on IPFS?](#want-to-hack-on-ipfs)
- [License](#license)

## Editing

## Install

1. [Install node + npm](http://nodejs.org) and required modules.
2. [Install hugo](https://gohugo.io/)

```sh
npm install
```

2. Run build.

```sh
npm run build
```

## Usage

### Creating a Post

To create a new post:

```sh
cp -r drafts/post-draft-template drafts/<short-title>
cd drafts/<short-title>
# edit index.md
# edit skeleton.md
rm skeleton-template.md
```

That will create a directory for the post inside `drafts/`. Edit the `index.md` and `skeleton.md` there. Place any static assets (e.g. images) inside that directory.

When ready to publish, the post directory will be moved from `drafts/` into `src/`, with be given the next sequential number.


### Live editing

Start a live reloading hugo:

```
npm start
```

Blog should not be available at http://localhost:1313/blog/

### Theme

The layouts follow [the example viewer](https://github.com/ipfs/examples/tree/master/webapps/example-viewer). Modify the files inside

```
layouts/
static/
```

## Publishing Post

How to publish the blog on IPFS.io.

### Editing

1. Make a change to a file
2. Add and commit.
3. `make build`
4. `$ ipfs add -r build`
  Only if you want a preview for other people (you can just use `make serve`). The path is `build`, in the website and the blog.
  The daemon needs to be running for others to access it, or to access it through a gateway.
5. Push to remote branch.
6. Make a pull request to `master`.
7. Get it merged following review from _another_ member.
8. `$ git checkout master && git pull origin master`

### Publishing

7. `$ ipfs daemon`
8. `$ make publish`
  Now anyone who has the hash can access.
10. Go to IRC: Use pinbot to liase with all of the other 8 gateways (planets: Uranus, Venus, etc) and make sure they have it pinned. So, like so:

      `$ !pin <hash> <label>`

  The label (it should be `blog`) can change, of course. This can sometimes take ages, because there is a pinbug that causes a hang. Pinbot will tell you when it succeeds. If it continually hangs, the gateway needs to restart. Pin @lgierth or @whyrusleeping and tell them that the pinning bug is bugging you, and have them zap it. Then try pinning again (it should work right away).

11. `$ make publish-to-domain`

You will need access to DigitalOcean for this to work. You will then need to use the token. This will take a few minutes for DNS to propogate.

## Contribute

Feel free to join in! PRs and [issues](https://github.com/ipfs/blog/issues) are welcome.

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

### Want to hack on IPFS?

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

## License

© Protocol Labs | Code is licensed with the [MIT](LICENSE) License. Except as noted, other content licensed [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/us/).
