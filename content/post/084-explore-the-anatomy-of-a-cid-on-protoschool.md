---
date: 2020-03-04
url: 2020-03-04-protoschool-tutorial-anatomy-of-a-cid
title: Explore the anatomy of a CID in ProtoSchool’s newest tutorial
author: José Bateira and Teri Chadbourne
header_image: 084-explore-the-anatomy-of-a-cid-on-protoschool.png
---
The [ProtoSchool](https://proto.school/#/) team is pleased to announce the launch of a shiny new multiple-choice tutorial on the **[Anatomy of a CID](https://proto.school/#/anatomy-of-a-cid)**, built by the fabulous [José Bateira](https://github.com/zebateira)! It’s our first multiple-choice content and the first to explore Multiformats. 🎉

<img src="/img/084-protoschool-tutorial-anatomy-of-a-cid/table-of-contents.png" width="425" alt="Table of Contents"/>
<img src="/img/084-protoschool-tutorial-anatomy-of-a-cid/sample-lesson.png" width="425" alt="Sample Lesson"/>

Content identifiers (CIDs) and cryptographic hashing make content addressing possible, allowing us to securely locate and identify data on the decentralized web. The string representations of CIDs used by IPFS look like random characters strung together, but there’s a lot more going on under the hood. In this new tutorial we explore all of the data revealed by these self-describing content-addressed identifiers, digging deep into multihash, multicodec, multibase, and version prefixes.

We also take a look at the evolution of the [CID specification](https://github.com/multiformats/cid), which originated in IPFS and now lives in the [Multiformats Project](https://multiformats.io/). The Multiformats Project is a collection of self-describing protocols that future-proof distributed information systems including IPFS, IPLD, libp2p, and Filecoin. Curious why some IPFS CIDs start with `Qm...` and others start with `b`? Wondering why we made the switch from CIDv0 to CIDv1, or whether those versions are interchangeable? We’ve got you covered!

## More ways to explore CIDs

### CID Inspector
Did you know you can paste any IPFS CID into the [**CID Inspector**](https://cid.ipfs.io/) for a human-friendly breakdown of its multihash format and length, multicodec, multibase, and version? It can even convert CIDv0 to CIDv1! The awesome [Oli Evans](https://github.com/olizilla) built this super-useful visualization tool that we explore in this new tutorial and which you can now access from our coding challenges.

<img src="/img/084-protoschool-tutorial-anatomy-of-a-cid/cid-inspector.png" width="600" alt="CID Inspector"/>

### IPFS Camp Course: Understanding How IPFS Deals with Files
If you’d like to dig a little deeper into CIDs via video, we recommend checking out the IPFS Camp 2019 workshop that inspired this tutorial, [**Understanding How IPFS Deals with Files**](https://youtu.be/Z5zNPwMDYGg). It offers a deep dive on key concepts like immutability, content addressing, hashing, the anatomy of CIDs, what the heck a Merkle DAG is, and how chunk size affects file imports. It also covers the joys and pitfalls of the Mutable File System (MFS), the layer of abstraction in IPFS that lets you work with immutable files and directories as if you were using a traditional name-based file system. Kudos to [Alan Shaw](https://github.com/alanshaw) for creating the portion of this course that inspired our new tutorial. 🏆

Watch the recording below or check out the [slides](https://github.com/ipfs/camp/blob/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_A/IPFS_Camp_Core_Course_A_Slides.pdf)!

[![Video: Understanding How IPFS Deals with Files](/img/057-ipfs-camp-course-videos/core-a-thumbnail.png)](https://youtu.be/Z5zNPwMDYGg)

_Video: [Understanding How IPFS Deals with Files](https://youtu.be/Z5zNPwMDYGg)_

## ProtoSchool content for every learner

### Introducing multiple-choice tutorials
The new [Anatomy of a CID](https://proto.school/#/anatomy-of-a-cid) tutorial is our first to include **multiple-choice quizzes** to keep you sharp on the concepts introduced in each lesson.  😉

<img src="/img/084-protoschool-tutorial-anatomy-of-a-cid/quiz.png" width="550" alt="Multiple-Choice Quiz"/>

Kudos to [Teri Chadbourne](https://github.com/terichadbourne) and [Diogo Silva](https://github.com/fsdiogo), who laid the groundwork for our multiple choice lessons.

### Finding the content that meets your needs
If you’ve explored [ProtoSchool tutorials](https://proto.school/#/tutorials) in the past, you may have noticed that most of them use **JavaScript coding challenges** to teach IPFS methods, allowing you to explore them right from your web browser without installing anything or touching the command line. We have code-based content introducing the [Mutable File System (MFS)](https://proto.school/#/mutable-file-system), the [Regular Files API](https://proto.school/#/regular-files-api), and the [DAG API](https://proto.school/#/basics).

We also offer a **text-based** tutorial on [Decentralized Data Structures](https://proto.school/#/data-structures), which introduces important decentralized web concepts like content addressing, cryptographic hashing, content identifiers (CIDs), and sharing with peers. (This one makes a great precursor to our latest tutorial!)

We’re excited to create beginner-friendly content suitable for a variety of learners, regardless of their coding experience. To that end, we recently added **spiffy new icons** throughout the site to represent our coding challenges, multiple-choice quizzes, and text-only lessons, making it easy to identify lesson formats before you get started.

<img src="/img/084-protoschool-tutorial-anatomy-of-a-cid/type-icons.png" width="600" alt="Lesson Type Icons"/>

We also updated our [tutorial listings](https://proto.school/#/tutorials) with a **handy toggle to help you hide coding challenges** if you’d like to stick to text-based and multiple-choice content. 👏

<img src="/img/084-protoschool-tutorial-anatomy-of-a-cid/toggle-coding-challenges.png" width="300 alt="Toggle Coding Challenges"/>

A shoutout to [Teri Chadbourne](https://github.com/terichadbourne) for taking the lead on these improvements, and to [Agata Krych](https://github.com/akrych) for the aforementioned spiffy new icons.

## Help us improve ProtoSchool

As you can tell from all the name-dropping, ProtoSchool is a team effort. We depend on folks in the IPFS community and beyond to outline new content, add new features, fix bugs, catch typos, and test-drive new tutorials like this one. There are many ways to [contribute to the project](https://proto.school/#/contribute), no matter your background. In fact, our new multiple-choice format makes it super easy to [create new tutorials](https://proto.school/#/build) without any coding experience.

**Here’s to the many folks whose names we’ve failed to drop who are pitching in daily to making ProtoSchool more useful for our learners.** ❤️

One of the easiest ways to help is by sharing your feedback as you explore our tutorials. You’ll find a link at the bottom of every lesson to help you submit your suggestions.

**We can’t wait to hear what you think of the [new tutorial](https://proto.school/#/anatomy-of-a-cid)!**
