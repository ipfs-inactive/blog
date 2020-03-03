---
date: 2019-03-04
url: 2020-03-04-explore-the-anatomy-of-a-cid-on-protoschool
title: Explore the Anatomy of a CID on ProtoSchool
author: José Bateira and Teri Chadbourne
---
The ProtoSchool team is pleased to announce the launch of a shiny new multiple-choice tutorial on the **[Anatomy of a CID](https://proto.school/#/anatomy-of-a-cid)**! 🎉

![Tutorial Table of Contents](/img/084-explore-the-anatomy-of-a-cid-on-protoschool/type-icons.jpg)
![Multiple Choice Challenge](/img/084-explore-the-anatomy-of-a-cid-on-protoschool/type-icons.jpg)

Content identifiers (CIDs) and cryptographic hashing make content addressing possible, allowing us to securely locate and identify data on the decentralized web. The string representations of CIDs that used by IPFS look like random characters strung together, but there's a lot more going on under the hood. In this new tutorial we explore all of the data revealed by these self-describing content-addressed identifiers, digging deep into multihash, multicodec, multibase, and version prefixes.

The [CID specification](https://github.com/multiformats/cid), which originated in IPFS, now lives in the [Multiformats Project](https://multiformats.io/), a collection of self-describing protocols that future-proof distributed information systems including IPFS, IPLD, libp2p, and Filecoin.

Curious why some IPFS CIDs start with `Qm...` and others start with `b`? Wondering why we made the switch from CIDv0 to CIDv1, or whether those versions are interchangeable? We've got you covered!

## Making it easier to find code-free ProtoSchool content
If you've explored ProtoSchool in the past, you may have noticed that most of our tutorials use JavaScript coding challenges to teach IPFS methods, allowing you to explore them right from your web browser without installing anything or touching the command line. We have code-based content introducing the [Mutable File System (MFS)](https://proto.school/#/mutable-file-system), the [Regular Files API](https://proto.school/#/regular-files-api), and the [DAG API](https://proto.school/#/basics).

However, we're also committed to providing beginner-friendly content that doesn't require coding experience, such as our text-based tutorial on [Decentralized Data Structures](https://proto.school/#/decentralized-data-structures), which introduces important decentralized web concepts like content addressing, cryptographic hashing, content identifiers (CIDs), and sharing with peers. (This one makes a great precursor to our latest tutorial!)

The new [Anatomy of a CID](https://proto.school/#/anatomy-of-a-cid) tutorial is our first to include multiple-choice quizzes to keep you sharp on the concepts introduced in each lesson. 😉

Looking to find content that doesn't require coding experience? From our [tutorial listings](https://proto.school/#/tutorials) you can now filter out coding challenges using our handy new toggle! 👏

![Toggle Coding Challenges](/img/084-explore-the-anatomy-of-a-cid-on-protoschool/type-icons.jpg)

You'll also find new icons throughout the site to represent our coding, text-only, and multiple-choice tutorials, making it easy to identify lesson formats before you get started.

![Lesson Type Icons](/img/084-explore-the-anatomy-of-a-cid-on-protoschool/type-icons.jpg)

## Other resources on CIDs

### CID Inspector
Did you know you can paste any IPFS CID into the [**CID Inspector**](https://cid.ipfs.io/) for a human-friendly breakdown its length, multihash format and length, multicodec, multibase, and version? It can even convert CIDv0 to CIDv1!

The awesome [Oli Evans](https://github.com/olizilla) built this super-useful visualization tool that we explore in this new tutorial and which you can now access from our coding challenges.

### IPFS Camp Course: Understanding How IPFS Deals with Files
If you'd like to dig a little deeper into CIDs via video, we recommend checking out the IPFS Camp 2019 workshop that inspired this tutorial, **Understanding How IPFS Deals with Files**. (No coding required.) It offers a deep dive on key concepts like immutability, content addressing, hashing, the anatomy of CIDs, what the heck a Merkle DAG is, and how chunk size affects file imports. It also covers the joys and pitfalls of the Mutable File System (MFS), the layer of abstraction in IPFS that lets you work with immutable files and directories as if you were using a traditional name-based file system. As with all great talks, this one is enhanced by images of adorable poodles. 🐩 (12 / 10, would recommend.)

Watch the recording below or check out the [slides](https://github.com/ipfs/camp/blob/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_A/IPFS_Camp_Core_Course_A_Slides.pdf)!

[![Video: Understanding How IPFS Deals with Files](/img/057-ipfs-camp-course-videos/core-a-thumbnail.png)](https://youtu.be/Z5zNPwMDYGg)

_Video: [Understanding How IPFS Deals with Files](https://youtu.be/Z5zNPwMDYGg)_

Kudos to [Alan Shaw](https://github.com/alanshaw) for creating the portion of this course that [José Bateira](https://github.com/zebateira) adapted into our new ProtoSchool tutorial. 🏆

## Help us improve our curriculum
We're constantly working to improve and grow our ProtoSchool curriculum, and have lots of new content planned for you in the months ahead. You can help us improve our offereings by sharing your feedback on existing tutorials (using the links provided a the bottom of each lesson) or by [building a new tutorial](https://proto.school/#/build). (Our platform currently supports browser-based JavaScript coding challenges, text-based lessons, and multiple-choice quizzes.)
