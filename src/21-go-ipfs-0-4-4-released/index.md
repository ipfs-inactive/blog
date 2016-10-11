---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: 21-go-ipfs-0-4-4-released

breadcrumbs:
  - {name: "go-ipfs 0.4.4 has been released", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2016-10-11

# this is the Title
title: go-ipfs 0.4.4 has been released

# this is the name of the main author(s)
author: whyrusleeping & Lars Gierth

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

[go-ipfs 0.4.4](https://dist.ipfs.io/#go-ipfs) has been released today,
including an important hotfix for a bug we discovered in how *pinning* works.
If you have a large number of pins, new pins would overwrite existing pins.
Apart from the hotfix, this release is equal to the previous release 0.4.3.

- [How pinning works](#how-pinning-works)
- [The bug](#the-bug)
- [Find out if you're affected](#find-out-if-you-re-affected)
- [How to upgrade](#how-to-upgrade)

## How pinning works

Pinning is a means of persisting data in your IPFS repo after adding or fetching it.
It'll prevent objects from getting removed by garbage collection or other methods
of cleaning up the IPFS repo. There are three ways how an object can be pinned:

- **Direct:** Only this object is pinned. It's children aren't pinned.
- **Recursive:** This object and all its children are pinned.
  If the recursive pin is removed, the children aren't pinned any longer either.
- **Indirect:** This object is pinned because one of its parents is pinned.
  If the pins of all parents are removed, this object isn't pinned any longer.

The `ipfs add` command adds a *recursive pin* for the added object by default.
With `--pin=false`, it skips pinning. Similarly, the default pin type for
`ipfs pin add` is *recursive*. With `--recursive=false` this changes to *direct*.

For more information on how pinning works, check out `ipfs pin --help` and `ipfs add --help`.

Direct and recursive pins are stored in separate so-called *pinsets*.
Indirect pins aren't stored, since they're derived from recursive pins.

## The bug

If your IPFS repo had more than 8192 pins, new pins would overwrite existing ones.
Pinned objects wouldn't be directly affected, but they wouldn't be protected from
garbage collection anymore.

We recently discovered a bug in the logic of our pinning code. Because of this
bug, users who add and pin large amounts of files may end up losing pins. If
pins are lost and a garbage collection is run, then content will be lost. The
circumstances that lead to this issue occurring are rather specific, the bug is
triggered any time you pin more than 8192 items. Once the bug is triggered, an
issue with the recursive hash trie implementation caused hash table buckets to
be overwritten resulting in only 256 pins remaining in the pinset. After that,
the bug won't be triggered again until the number of pins again exceeds 8192.
The 256 pins that remain are random.

## Find out if you're affected

If you think you have experienced this issue and have *not* run a garbage
collection, you can still find the 'lost' pins. We have written a new tool
called 'ipfs-see-all' that allows you try and recover any old pins that are
still in your local repo. The tool is available on [out distributions
page](https://dist.ipfs.io), or if you prefer building from source, head over
to [the github repo](https://github.com/whyrusleeping/ipfs-see-all). Once you
have the tool, invoke it as `ipfs-see-all lost-pins` and it will scan for and
print out every pin object that is not actually pinned in your pinset. Note
that this may contain anything you have manually unpinned.

## How to upgrade

Depending on how you initially installed IPFS, there are several ways to
upgrade. If you installed IPFS with a pre-built binary, you can either head over
to [dist.ipfs.io](https://dist.ipfs.io/#go-ipfs) and grab the latest version
from there. Or alternatively, from the same page you can grab the `ipfs-update`
binary, and use it to perform the upgrade for you. If you installed from
source, you can simply run `git checkout v0.4.4`, then run `make install`.

Please upgrade your IPFS nodes as soon as you can,
so you can take advantage of the improvements.
