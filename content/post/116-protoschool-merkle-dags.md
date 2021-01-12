---
date: 2021-01-10
url: /2021-01-14-protoschool-tutorial-merkle-dags/
title: Explore Merkle DAGs at ProtoSchool
author: Teri Chadbourne
tags: ipfs, ipld, protoschool
header_image: 116-protoschool-merkle-dags.jpg
---

The [ProtoSchool](https://proto.school) team is pleased to announce the launch of a shiny new multiple-choice tutorial on [Merkle DAGs](https://proto.school/merkle-dags), the cornerstone of our freshly launched [IPLD course](https;//proto.school/course/ipld). 🎉

This new content sprang from feedback on our Decentralized Data Structures tutorial, which originally explored both content addressing and data structures. Based on learner feedback, we've split the content in two! You'll now find the majority of our original content in our rebranded tutorial, [Content Addressing on the Decentralized Web](https://proto.school/content-addressing), which highlights the key differences in how data is shared and retrieved on the centralized web and decentralized web. Meanwhile, our brand new tutorial, [Merkle DAGs: Structuring Data for the Distributed Web](https://proto.school/merkle-dags), is chock full of new content exploring the intricacies the magical data structure that much of the decentralized web relies on.

<img src="/116-protoschool-merkle-dags/dag-deduplication.png" alt="Merkle DAG diagram"/>

_Screenshot of a Merkle DAG from the new tutorial_

In IPFS, as across the decentralized web, content addressing enables us to securely locate and identify data stored by peers. The Content Identifiers (CIDs) we often use to link to individual files or pieces of data can also be used to express complex webs of data in their entirety, when we structure that data as content-addressable Merkle DAGs. Merkle DAGs, wrapped in structures provided by IPLD, are key to the interoperability of IPFS, libp2p, Filecoin, and other distributed protocols. In this new code-free ProtoSchool tutorial, we take a deep dive into the properties that make Merkle DAGs the backbone of the distributed web, and explore the many benefits that the data structure unlocks, from verifiability to distributability to deduplication. [Check it out!](https://proto.school/merkle-dags)

## Introducing our IPLD course

In 2020, ProtoSchool introduced collections of tutorials on specific distributed web protocols. Our Merkle DAG tutorial is the cornerstone of our newly launched [IPLD Course](https://proto.school/course/ipld), which includes both JavaScript coding challenges and code-free content.

If you're a developer, we encourage you to get hands on with Merkle DAGs through our two coding tutorials that explore the Javascript implementation of the IPFS DAG API:

‍👩🏾‍💻 In [P2P Data Links with Content Addressing](http://proto.school/basics), you'll use the DAG API to add data objects to IPFS and link between them.

‍👨🏻‍💻 In the more advanced [Blogging on the Decentralized Web](http://proto.school/blog), you'll use the same API to encode relationships between authors, posts, and tags, as you create a fictional blog, watching CIDs change as you reshape the data structure.

## More on Merkle DAGs

Prefer your learning in video format? Check out these presentations on the superpowers of Merkle DAGs:

🎬 [Content-Addressed Distributed Data Structures](https://youtu.be/VtzpJU4Cns8) (SpeakeasyJS Meetup 2020): In this talk, Rod Vagg of the IPLD team explains how to build complex and very large data data structures on top of content addressing.

🎬 [How Merkle Trees Enable the Decentralized Web](https://youtu.be/YIc6MNfv5iQ) (!!Con 2017): This session by Tara Vancil explores what make the Merkle Tree the backbone of decentralized software like Git, BitTorrent, ZFS, and Ethereum.

🎬 [Understanding How IPFS Deals with Files](https://youtu.be/Z5zNPwMDYGg) (IPFS Camp 2019): This presentation by Alan Shaw and Mikeal Rogers offers a deep dive on key IPFS concepts like immutability, content addressing, hashing, the anatomy of CIDs, what the heck a Merkle DAG is, and how chunk size affects file imports. It also covers the joys and pitfalls of the Mutable File System (MFS), the layer of abstraction in IPFS that lets you work with immutable files and directories as if you were using a traditional name-based file system.

TODO: Make thumbnails smaller and show all or just show Rod's, insert missing captions

[![Video: Content-Addressed Distributed Data Structures ](/116-protoschool-merkle-dags//talk-rod.png)](https://youtu.be/VtzpJU4Cns8)

[![Video: How Merkle Trees Enable the Distributed Web](/116-protoschool-merkle-dags/talk-tara.png)](https://youtu.be/YIc6MNfv5iQ)

[![Video: Understanding How IPFS Deals with Files](/img/057-ipfs-camp-course-videos/core-a-thumbnail.png)](https://youtu.be/Z5zNPwMDYGg)

_Video: [Understanding How IPFS Deals with Files](https://youtu.be/Z5zNPwMDYGg)_



## Help us improve ProtoSchool

ProtoSchool is a team effort, and we depend on folks in the IPFS community and beyond to outline new content, add new features, fix bugs, catch typos, and test-drive new tutorials like this one. There are many ways to [contribute to the project](https://proto.school/contribute), no matter your background, and our new multiple-choice format makes it super easy to [create new tutorials](https://proto.school/build) without any coding experience. In fact, the awesome Mitch Wagner, who created our latest tutorial, built it with the help of our user-friendly ProtoWizard CLI!

TODO: insert protowizard screenshot

One of the easiest ways to help is by sharing your feedback as you explore our tutorials. You’ll find a link at the bottom of every lesson to help you submit your suggestions.

We can’t wait to hear what you think of the [new Merkle DAG tutorial](https://proto.school/merkle-dags)!
