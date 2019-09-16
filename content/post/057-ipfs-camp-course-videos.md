---
date: 2019-09-16
url: 2019-09-16-ipfs-camp-course-videos
title: IPFS Camp course videos released 🍿
author: Teri Chadbourne
---

If you've been following the updates from IPFS Camp here in the blog, you've likely already explored the videos from our [lightning talks](https://github.com/ipfs/camp#%EF%B8%8F-lightning-talks), [deep dives](https://github.com/ipfs/camp#-deep-dives), and [poster projects](https://github.com/ipfs/camp#-poster-projects). **Today we're excited to announce the release of the videos from our [core and elective courses](https://github.com/ipfs/camp#-core--elective-courses)**!

## Core Courses
Core courses at IPFS Camp served as the starting point to get all of us on the same page with a shared understanding of some the most essential concepts underlying IPFS. Elective courses covered even more ground, branching out into bleeding-edge DWeb topics, exciting use cases, and community endeavors. The format for these 75-minute courses varied, so you'll find app-building tutorials and  interactive group discussions alongside cleverly diagrammed deep-dives and interpretive skits. There's something for everyone!

**Check out the [complete course listings](https://github.com/ipfs/camp#-core--elective-courses) in the IPFS Camp repo for links to videos, slide decks, and other workshop materials for each session.**

Whether you're new to IPFS or looking for a deeper understanding of core concepts, I highly recommend these two core courses as your starting point. Both are easily consumable in video form -- no coding required -- and offer plenty of "aha" moments:

### Understanding How IPFS Deals with Files
This core course covers the basics of how IPFS deals with files, including key concepts like immutability, content addressing, hashing, the anatomy of CIDs, what the heck a Merkle DAG is, and how chunk size affects file imports. It also covers the joys and pitfalls of the Mutable File System (MFS), the layer of abstraction in IPFS that lets you work with immutable files and directories as if you were using a tradiitional name-based file system. As with all great talks, this one is enhanced by images of adorable poodles. 🐩 (12 / 10, would recommend.)

This workshop introduced a few awesome visualization and learning tools that you can try out at home:

- Explore the [ProtoSchool tutorial on the Mutable File System (MFS)](https://proto.school/#/mutable-file-system) for coding challenges designed to familiarize you with its API
- Paste a Content Identifier (CID) into the [CID Inspector](https://cid.ipfs.io/) to break down its anatomy
- Drag a file into the [DAG Builder](https://dag.ipfs.io/) and adjust chunk size, DAG layouts, etc. to see how it affects the Merkle DAG

Watch the recording below or check out the [slides](https://github.com/ipfs/camp/blob/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_A/IPFS_Camp_Core_Course_A_Slides.pdf)!

[![Video: Understanding How IPFS Deals with Files](/img/057-ipfs-camp-course-videos/core-a-thumbnail.png)](https://youtu.be/dJ7TkB4UpZ8)

_Video: [Understanding How IPFS Deals with Files](https://youtu.be/dJ7TkB4UpZ8)_


### The Lifecycle of Data in DWeb

This course covers all the stuff that happens _after_ you add a file to IPFS, highlighting the intricacies of how peers interact with each other to provide, get, pin, and delete blocks of data. It explains the Distributed Hash Table (DHT) that helps us track which peers are storing which CIDs, as well as how Bitswap requests and sends blocks while verifying their data. No poodle pics here, but the live Bitswap dance using bean bags to model the block-sharing process is not to be missed! 🤹‍♂️

Watch the video below or check out the slides (available on [Google Slides with speaker notes](https://docs.google.com/presentation/d/1UOX-a1lCxi-LOyEOe9VEFRcxg_j93Xkywwa4Y95TJaw/edit?usp=sharing) or as a [PDF](https://github.com/ipfs/camp/blob/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_D/IPFS_Camp_Core_Course_D_Slides.pdf))!

[![Video: The Lifecycle of Data in DWeb](/img/057-ipfs-camp-course-videos/core-d-thumbnail.png)](https://youtu.be/fLUq0RkiTBA)

_Video: [The Lifecycle of Data in DWeb](https://youtu.be/fLUq0RkiTBA)_



### And more!

There are plenty more core and elective courses to explore in the latest batch of videos. Check out our full [course playlist](https://www.youtube.com/playlist?list=PLuhRWgmPaHtSsHMhjeWpfOzr8tonPaePu) or jump right to the video that looks most interesting:

**Core Courses**

- [Understanding how the InterPlanetary File System deals with files](https://youtu.be/dJ7TkB4UpZ8)
- [Solving distributed networking problems with libp2p](https://youtu.be/Q4IH5rWEO-E)
- [Developing apps with IPFS API](https://youtu.be/6EHBOnFQJN4)
- [The lifecycle of data in DWeb](https://youtu.be/fLUq0RkiTBA)

**Elective Courses**

- [Identity on the DWeb](https://youtu.be/EsLqjFEN-MM)
- [Managing pinsets with IPFS Cluster](https://youtu.be/wmxaVrAFfeE)
- [Cat Roulette!](https://youtu.be/kVzHE4MRPOM)
- [Deploying IPFS Infrastructure](https://youtu.be/PD0e89b4NBk)
- [Starting, Growing, and Stewarding your IPFS Community](https://youtu.be/crTa1j3FRac)
- [Building DApps with Textile, the iCloud for the DWeb](https://youtu.be/4r7_lOyv4W8)
- [Managing Datasets with QRI](https://youtu.be/ZN1mPBECsvA)


Each of these courses has its own folder in the IPFS Camp repo, complete with course descriptions, slide decks, videos, code walk-throughs, or other materials provided by our awesome instructors.  Check out the [complete course listings](https://github.com/ipfs/camp#-core--elective-courses) for all the details.

## Explore related content in ProtoSchool
If you enjoy hands-on learning, set down that popcorn for a minute and try out a [ProtoSchool tutorial](https://proto.school/#/tutorials)! Or better yet, find a [chapter near you](https://proto.school/#/chapters) and attend a live workshop. (Want to get really meta? Today's batch of videos includes an [interactive workshop on leading interactive workshops](https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/ELECTIVE_COURSE_F)!)

The ProtoSchool curriculum is growing, and we're excited to explore all of the fabulous IPFS Camp content to find gems to add to our tutorials. Watch [this issue](https://github.com/ProtoSchool/protoschool.github.io/issues/261) to track those content developments, or learn more about [contributing to ProtoSchool](https://proto.school/#/contribute) as a tutorial author or chapter leader.

## But wait, that's not all!
There's even more great content from IPFS Camp content coming your way, including recordings of keynotes and interviews. If you're interested in receiving an update when the next batch of videos are available, try out one of these strategies:

- Watch and star the [ipfs/camp repo](https://github.com/ipfs/camp/blob/master/README.md), where all the content will live.
- Subscribe to the [RSS feed of this blog](https://blog.ipfs.io/index.xml).
- Subscribe to the [IPFS Weekly Newsletter](https://tinyletter.com/ipfsnewsletter) if you're interested in general IPFS updates.
- Subscribe to the [IPFS Events Newsletter](https://protocol.us20.list-manage.com/subscribe?u=62e1eb7f68461b5a2ab5c52e6&id=f3fed9af1d) if you're interested in IPFS events.
