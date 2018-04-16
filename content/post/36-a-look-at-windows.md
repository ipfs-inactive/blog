---
date: 2018-04-23
url: 36-a-look-at-windows
title: A look at go-ipfs on Windows
author: Dominic Della Valle
---

`go-ipfs` is built on top of [Golang](https://golang.org/), which allows for some cross platform compatibility. However, it doesn't cover everything. Over the past few weeks, we've fine-tuned several aspects of the Windows experience to fix errors and remove inconsistencies.  
In this post, we'll be taking a closer look at these issues and what we've done to resolve them before the next release of `go-ipfs` (v0.4.15).

If you're not a Windows or `go-ipfs` user, you may still be interested in seeing where we encountered problem points, and our resolution plans for them. Issue [#4808 (Windows initiative 2018)](https://github.com/ipfs/go-ipfs/issues/4808) in particular may give you a head start if you plan on porting `go-ipfs` to a new platform, or are encountering inconsistent behavior in one of your own projects. It offers a more in-depth look at how we discovered, discussed, and dealt with platform problems.  

***
### Log output
![log-before](img/log-before.png)  
Issue:  
The output on Windows was filled with non-native [control characters](https://en.wikipedia.org/wiki/Control_character). This made our output hard to read, both for users and developers (when malformed logs were shared with us).

![log-after](img/log-after.png)  
Resolution:  
We've added a method of translating these characters into native equivalents. There should be no more oddities related to character color or cursor placement, text should be clear and lines shouldn't overlap anymore. This should make everyone a little bit happier.

### Building
![build](img/build.gif)  
Issue:  
Building the Windows binary, on Windows itself, had multiple problems: silent failures, lack of respect for user supplied arguments, inconsistent handling of dependencies, and more.

Resolution:  
Multiple fixes had to be applied to `go-ipfs`, `gx`, some of our first and third party dependencies, and even Golang itself. The building experience should now be consistent with other platforms. In addition, the [documentation has been rewritten](https://github.com/ipfs/go-ipfs/blob/master/docs/windows.md) to clarify the process and add a section that covers Windows specific concerns and how to deal with them.

### Temporary file access errors
![garbage](img/garbage.png)  
Issue:  
When trying to move data-blocks from a temporary location, the destination address was getting corrupted. This led to "Access Denied" errors and the unexpected creation of garbage files in the working directory.

Resolution:  
[An audit is in progress](https://github.com/ipfs/go-ipfs/issues/4485), directed at finding areas where memory corruption is possible. We've detected and resolved the Windows specific issue above. Operations should now succeed as expected.

### File output names
Issue:  
No filters were being applied to file paths during extraction (IPFS -> other file systems). This caused multiple issues when using `ipfs get`.

1. #### Extracting content from IPFS could fail due to native file system restrictions
![File names](img/filenames.png)  
FAT32, NTFS, ReFS, and Windows itself, all impose their own path limitations. If a hash contained a non-legal path, operations like `ipfs get` would fail. In the image above, the [XKCD archive ](https://github.com/ipfs/archives/issues/21) could not be downloaded on Windows because the directory "1031 - s keyboard leopard " ends in a space.  

2. #### Hashes that contained malicious file paths would be extracted
![overwrite 1](img/overwrite%201.png)  
![overwrite 2](img/overwrite%202.png)  
It was possible for users to craft specific hashes that could escape the extraction root and overwrite files (if the target file's location was known in advance and users had write permissions for the files).  

Resolution:  
We now account for these limitations and translate path-names into platform legal paths, which are restricted to their hash-root.

### `stdio`
![pipe](img/pipe.png)  
Issue:  
stdin support was explicitly disabled in `go-ipfs`, preventing basic [IPC](https://en.wikipedia.org/wiki/Inter-process_communication) with other applications.
Resolution:  
stdin support has been added to the Windows version of go-ipfs which allows you to place ipfs anywhere in a [pipeline](https://en.wikipedia.org/wiki/Pipeline_(Unix)).  

## And more...

There’s still more to be done to enhance the experience of `go-ipfs` on Windows. As well as address portability concerns in general. We plan to keep making progress in these areas going forward.
If you’re interested in contributing (or just keeping an eye on progress), feel free to check out issue [#4808 (Windows initiative 2018)](https://github.com/ipfs/go-ipfs/issues/4808).

***

# Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - <https://waffle.io/ipfs/go-ipfs?label=help%20wanted>
- Join an IPFS All Hands call, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/pm/#all-hands-call
- The All Hands call is also the perfect venue for demos, join in and show us what you built!
- Join the discussion at <http://discuss.ipfs.io/>

# Do you have questions?

The best place to ask your questions about IPFS, how it works, and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the [#ipfs](irc://freenode.net/ipfs) channel on Freenode.
