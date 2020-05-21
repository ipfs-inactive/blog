---
date: 2020-05-05
url: 2020-05-05-developer-experience
title: Improving the IPFS Developer experience
author: Hector Sanjuan
tags: Developer, Experience
---

Since its founding in 2014, the IPFS project has been stewarded by the [core IPFS working groups](https://github.com/ipfs/team-mgmt/blob/master/TEAMS_ROLES_STRUCTURES.md#active-teams), including developers, designers, researchers and project managers that work very hard towards its [success](https://blog.ipfs.io/weekly-84/).

However, this success would be impossible without the participation of the open source community that has grown around IPFS - with participants from individuals, to nascent community-owned tools, to large organizations. We are lucky to have this thriving and influential  community participating in our journey towards decentralization during these years. With their help, we’ve grown IPFS to empower [hundreds of tools, applications and projects](https://awesome.ipfs.io/).

A thriving, growing, and participatory open source community is key to the success of the IPFS project, and continues to be a focus for the core IPFS working groups. We want every user and developer interested in building IPFS applications — or willing to join forces to fix and improve the codebase — to feel welcomed, informed, and empowered by the community. Therefore, as part of our [secondary 2020 focus on contributor velocity and support](https://blog.ipfs.io/2020-02-10-our-focus-for-2020/#increasing-contributor-velocity-supporting-adoption) we will:

* Improve how users and developers get help, reducing response times and improving access to existing information and documentation.
* Reduce the number of pull requests and issue reports that stay in limbo by giving consistent feedback on status, prioritization and team capacity.
* Better inform contributors about the different steps of the contribution process, and how they fit with the priorities of the project and core working groups.
Increase community participation, providing better avenues to facilitate involvement in the projects, remove bottlenecks, and create capacity to give support.

After discussion with active IPFS contributors and research into other OSS community best practices, we’ve identified a few changes to help improve the IPFS contributor experience:

* Contributors need a clear and explicit contribution process to the more than 100 active repositories in the IPFS organization. Any new contribution should have clarity on who is going to review the submission, what priority it has, and what the next steps are. To meet this need, we’ll be drafting a new process in the [official IPFS forums](http://discuss.ipfs.io/) so that it can be iterated on by the community.
* The new IPFS Github organization [labelling taxonomy](https://github.com/ipfs/community/blob/master/ISSUE_LABELS.md) (recently rolled out to all repositories) aims to improve triaging of discussions and requests to clearly reflect status and priority. This comes with an additional effort to consolidate and clean up outdated issues and inactive repositories. As a result, many inactive repos have been moved to the [ipfs-inactive Github organization](https://github.com/ipfs-inactive) to clearly differentiate code that is actively maintained from code that is dormant or deprecated.
* To help funnel users and devs where the community can better support them, our [IPFS discussion forums](https://discuss.ipfs.io/) will be more prominently displayed (in docs, READMEs and issue templates) as the default venue for support (along with pointers to [ipfs.io/help](https://ipfs.io/help)). Some discussion-only and meta-topic repositories are also in the process of migrating their conversations to the forums, where they can reach a wider audience and be more easily searchable and discoverable by other users.
* New contributors to repositories will now receive automated responses on their first submission, giving context on the process outlined above and reminders for needed information. This will help reduce the number of round trips for contributors and reviewers/maintainers.
* A [major review of the documentation](https://docs.ipfs.io/) site is already underway to provide better developer documentation for our major implementations and products. [Watch this space!](https://github.com/ipfs/docs/milestones)

![IPFS Autoresponder and labels](/091-dev-exp/labels-autoresponder.png)

At the same time, there are some things that are NOT changing:

* Old issues will not be closed or locked because they are old, or stale, or very low priority. Some parts of the IPFS project have a large backlog and it is important that the information is not lost or dismissed, but can be found by others interested in the topic.
* The core working groups will still dedicate a large portion of time to help users, answer questions, and review and merge contributions. However, there will be an extra focus on keeping discussions on point and limiting information explosion.

We want to empower the developer community to build amazing things with IPFS, and these contributor experience changes aim to make it faster and easier to start participating in the IPFS Community (whether filing issues or making PRs). However, improving that experience requires feedback and iteration as we refine our next steps as a community. For this, [a new discussion thread](https://discuss.ipfs.io/t/ideas-to-improve-the-ipfs-developer-experience/7750) is available in the forum, where anyone can post new proposals or give suggestions/feedback on recent changes.

We hope these measures help everyone build a happy and growing IPFS developer community!

![IPFS Contributors](/090-go-ipfs-0-5-0/ipfs-contributors.png)
