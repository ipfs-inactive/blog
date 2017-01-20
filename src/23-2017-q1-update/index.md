---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: 2017-q1-update

breadcrumbs:
  - {name: "2017-q1-update", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2017-01-25

# this is the Title
title: IPFS Project Management Update for Q1 2017

# this is the name of the main author(s)
author: Richard Littauer

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

# IPFS going into Q1 in 2017

This year, IPFS is changing the way we do our sprints. This post covers some of the basic aspects of these changes. A longer post will be coming in February.

In short, we've switched from weekly set-your-own-goal sprints focused on particular areas - js-ipfs, go-ipfs, Apps on IPFS, and so on - and we're moving, as a project, to more defined two week sessions where we work together on scrum-like projects.

We talked about this in the All Hands call on Monday the 16th. You can see the video for that, here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cvz_PW1GfIY" frameborder="0" allowfullscreen></iframe>

### Why the change?

<!-- TODO: Should also cover lessons learned about kanban (loosely coordinated vs. not coordinated) -->

Last year, our core contributor base grew immensely. There are now dozens of contributors working at least part-time on IPFS and IPFS related projects (e.g. cluster, multiformats, IPLD, Orbit). With the amount of contributors, the amount of projects we've been actively working on has grown, almost exponentially.

As you may know, Protocol Labs has had a quarterly meeting for some of the core contributors to discuss project roadmaps for that quarter. Last year, during our fourth quarter, we set very ambitious goals for dozens of little projects. At our Lab Week in Berlin this January, we looked back at our projects - and found that, as a team, we hadn't been able to meet all of those goals.

We think that a large part of why we didn't achieve everything was that it was difficult to see what everyone else was working on, and because we were constantly context-switching between dozens of little projects. This lead to thrashing - like a processor, there were too many active threads going on at any one point, which led to limited bandwidth for getting real work done.

So, we're pivoting; instead of having everyone come up with their own goals and ideas, and syncing with the team casually about what goals should go where, we're going to be much more explicit about what goals we can do as a project, and who can work together.

### What will this look like?

<!-- TODO: Where is the public roadmap? Can we add a Project to ipfs/pm? https://github.com/protocol/orgdev/projects/1 -->

<!-- TODO: Merge the Roadmap for stale endeavors here: https://github.com/ipfs/ipfs/pull/224/files -->

<!-- TODO: Should cover sprints, sprintinos -->

### What about endeavors that aren't sprints?

As with any organization hoping to affect real change in the world, we have to be very careful to make sure that we're working on the best projects, letting other projects go. To that end, we're actively trying to close out or put other endeavors that didn't make the priority cut on the back burner. Some of these projects will be picked up later; we're just not going to focus on them now. Other projects have been in a limbo state for a long time - what we'll try to do this quarter is make it clear what the status of the project is, and how we plan to deal with it. We've termed these projects 'stale' endeavors. There is a list of them, here; https://github.com/ipfs/ipfs/pull/224/files

### Where can I ask more questions?

We will continue to have our All Hands calls on Mondays. You are encouraged to join! Check out the latest issues at [ipfs/pm](https://github.com/ipfs/pm/issues) for a link and a schedule to those calls.
