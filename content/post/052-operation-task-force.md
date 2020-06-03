---
date: 2019-07-31
url: /2019-07-31-operation-task-force/
tags: IPFS, Project
title: IPFS Project Q3 Priorities & Working Groups
author: Dietrich Ayala
---

IPFS is growing! This year we've grown immensely in network size, number of apps building with IPFS, number of end-users of IPFS-powered apps, and the number of developers contributing to the codebase.

![ecosystem diagram edited](https://user-images.githubusercontent.com/618519/62986295-b8657100-bdef-11e9-9d0b-db7a08568d15.png)

Along with that growth, we've also experienced some challenges:

* The HTTP to IPFS gateways [didn’t keep up](https://github.com/ipfs/go-ipfs/issues/6385) with the needs of our growing community 
* The public IPFS network (via the DHT) was [slow and sometimes unreliable](https://github.com/ipfs/go-ipfs/issues/6383)
* We shipped some bugs and performance regressions in our releases ([0.4.19](https://github.com/ipfs/go-ipfs/releases/tag/v0.4.20) & [0.4.20](https://github.com/ipfs/go-ipfs/releases/tag/v0.4.21))
* Our documentation and websites were poorly maintained and [fell out of date](https://github.com/ipfs/docs/#ipfs-docs-q3-2019-update)

Last month in Barcelona we got together and hammered out a plan to make IPFS performant, stable, high quality and updated regularly - and ready to grow even more! Check out the [Q3 OKR planning issue](https://github.com/ipfs/team-mgmt/issues/995) that documents our analysis and next steps.

We're switching things up this quarter, remixing the IPFS working groups and forming ourselves (Voltron-like) into a set of new teams focused on these high priority challenges. Meet our new working groups for Q3:

* **[Team Bifrost](https://docs.google.com/spreadsheets/d/1AiNUL7vK5Jp8aa839UaMaI_AlBU5r6Bor-A40179I2A/edit#gid=1439867466)** (aka IPFS Infra as a Service) - Improve performance and stability of gateways and pinning, and provide public observability of services.
* **[Test Infrastructure](https://docs.google.com/spreadsheets/d/1AiNUL7vK5Jp8aa839UaMaI_AlBU5r6Bor-A40179I2A/edit#gid=96566767)** - Improve our confidence that every release improves the previous one through testing infrastructure designed to evaluate IPFS and libp2p at scale - from single node performance to overall network health and efficiency - tightly integrated with our software engineering pipeline.
* **[Project Operations](https://github.com/ipfs/project-operations)** - Ship core go and js implementations with reliable rigor, systematize community communications and collaborations, and spin up IPFS research to meet future project needs.
* **[Package Managers](https://github.com/ipfs/package-managers)** - Improve performance of import and update of large filesystems to support file-system-based package managers.
* **[Documentation & Developer UX](https://github.com/ipfs/docs#ipfs-docs-q3-2019-update)** - Overhaul our documentation platform and content based on audits, research and community needs assessment to make IPFS more accessible to developer users.

This new set of problem-oriented working groups will remain in place as long as needed to set IPFS on a stable course for achieving the broader vision for the project. Some might live for one or two quarters to be replaced by new focus areas we identify, while others might continue on as long as they're useful to the project. These changes are live in the [IPFS Project Teams, Roles & Structures document](https://github.com/ipfs/team-mgmt/blob/master/TEAMS_ROLES_STRUCTURES.md).

Your feedback is a large part of identifying these challenges, evaluating how we're doing at addressing them, and assessing whether your needs (or your users' needs!) are being met by IPFS! You can find ways to participate and make your voice heard on the [IPFS Github repository](https://github.com/ipfs/ipfs#project-and-community).

These new working groups meet regularly, and you can join them to help us achieve these goals! Check the [IPFS community calendar](https://github.com/ipfs/community/blob/master/README.md#calendar) for times and connection information, or watch the meetings at your leisure on the [IPFS Youtube channel](https://www.youtube.com/channel/UCdjsUXJ3QawK4O5L1kqqsew). 

The work these teams are doing will require a number of different skillsets, and could use your help! If you're interested and have bandwidth to help out - jump on a community call or Github issue and share your time and expertise! Looking for fulltime roles to help out on these and other IPFS challenges? Check the IPFS Weekly Newsletter for [IPFS-focused job opportunities](https://blog.ipfs.io/weekly-51/#open-positions-working-on-ipfs)!

## How does this work affect you?

* **As an IPFS user**: The HTTP to IPFS gateways used to get started with IPFS should be more reliable and responsive. Projects built on IPFS will begin performing better. If you have problems getting up and running with IPFS, you'll have access to more and better documentation for helping you troubleshoot.
* **As a developer building things with IPFS**: You can begin to count on a reliable release process. New releases will have better test coverage, so are less likely to contain performance or functional regressions. New features, as well as existing features and topics that we know can be tricky, will be better documented to help you get moving faster.
* **As a core contributor**: Depending on which part of the project you're contributing to, you may see more or less activity. Your tests might start running much faster. Projects that are not critical to the initiatives above might take longer to review your pull-request or answer your question. You may be encouraged and empowered to better document improvements you make for everyone to take advantage of.

