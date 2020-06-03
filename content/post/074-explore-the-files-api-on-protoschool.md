---
date: 2019-11-06
url: /2019-11-06-explore-the-files-api-on-protoschool/
title: Explore the Files API on ProtoSchool
author: Teri Chadbourne
header_image: 074-explore-the-files-api-on-protoschool.png
---

Today we're excited to announce the launch of a [brand new ProtoSchool tutorial exploring the **Regular Files API**](https://proto.school/#/regular-files-api), built by the awesome [Gil Domingues](https://github.com/dominguesgm). 🎉

![Tutorial Table of Contents](/img/074-explore-the-files-api-on-protoschool/toc_screenshot.png)
![Code Challenge](/img/074-explore-the-files-api-on-protoschool/challenge_screenshot.png)


This new tutorial explores the methods at the top-level of js-ipfs (`add`, `get`, `cat`, etc.) that are custom-built for working with files. We refer to these methods as the Regular Files API to distinguish them from the Mutable File System (MFS). MFS mimics a more traditional file system interface with methods like `files.cp` and `files.mkdir`, but it hides the complexity of immutable content addressing in IPFS. Check out the [first lesson](https://proto.school/#/regular-files-api/01) of the new tutorial for more on the differences between these two approaches, as well as some important distinctions between the Files API and the DAG API.

If you're new to IPFS and finding CIDs to be challenging as a naming convention, keep an eye out in this tutorial for an explanation of how you can use the `wrapWithDirectory` option in the Regular Files API to create more human-readable paths and filenames.

### More to explore on ProtoSchool

#### Explore other IPFS APIs through coding challenges
Like most of our tutorials, this latest addition uses JavaScript coding challenges to teach IPFS methods, allowing you to explore them right from your web browser without installing anything or touching the command line. Check out our other code-based IPFS tutorials on ProtoSchool:

- The [Mutable File System (MFS)](https://proto.school/#/mutable-file-system) (part of the Files API)
- The DAG API: [P2P Data Links with Content Addressing](https://proto.school/#/basics)
- The DAG API: [Blogging on the Decentralized Web](https://proto.school/#/blog)

#### Don't know JavaScript or don't know how to code?
Our [Decentralized Data Structures](https://proto.school/#/data-structures) tutorial offers a code-free look at important concepts like content addressing and hashing.

#### Prefer to learn in a group setting?
Find a [ProtoSchool chapter near you](https://proto.school/#/chapters) and attend a live workshop.

#### Help us improve our curriculum
We're constantly working to improve and grow our ProtoSchool curriculum, and have lots of new content planned for you in the months ahead. You can help us improve our offereings by sharing your feedback on existing tutorials (using the links provided a the bottom of each lesson) or by [building a new tutorial](https://proto.school/#/build). (Our platform currently supports browser-based JavaScript coding challenges, text-based lessons, and multiple-choice quizzes.)

### Other resources on using IPFS with files

If you'd like to dig a little deeper, we recommend checking out the **Understanding How IPFS Deals with Files** course offered at IPFS Camp 2019. (No coding required.) It offers a deep dive on key concepts like immutability, content addressing, hashing, the anatomy of CIDs, what the heck a Merkle DAG is, and how chunk size affects file imports. It also covers the joys and pitfalls of the Mutable File System (MFS), the layer of abstraction in IPFS that lets you work with immutable files and directories as if you were using a traditional name-based file system. As with all great talks, this one is enhanced by images of adorable poodles. 🐩 (12 / 10, would recommend.)

Watch the recording below or check out the [slides](https://github.com/ipfs/camp/blob/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_A/IPFS_Camp_Core_Course_A_Slides.pdf)!

[![Video: Understanding How IPFS Deals with Files](/img/057-ipfs-camp-course-videos/core-a-thumbnail.png)](https://youtu.be/Z5zNPwMDYGg)

_Video: [Understanding How IPFS Deals with Files](https://youtu.be/Z5zNPwMDYGg)_

This course also introduces new visualization tools that you can use to see how IPFS addresses and manipulates files:

- Paste a Content Identifier (CID) into the [**CID Inspector**](https://cid.ipfs.io/) to break down its anatomy
- Drag a file into the [**DAG Builder**](https://dag.ipfs.io/) and adjust chunk size, DAG layouts, etc. to see how it affects the Merkle DAG
