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
author: Richard Littauer, Matt Zumwalt

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

# New IPFS Roadmap Structure for for Q1 in 2017

The IPFS team are trying out a new format for arranging our work and our roadmap. This post covers some of the basic aspects of these changes and their motivations.

Previously we used a loosely organized approach where each team member would set their own goals for a sprint. We broke our work up under three headings: js-ipfs, go-ipfs or "Apps on IPFS". Now we're moving to a scrum-like structure, where we form teams around targeted, two-week scrum-style Sprints.

We talked about this in the All Hands call on Monday the 16th. You can see the video for that, here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cvz_PW1GfIY" frameborder="0" allowfullscreen></iframe>

### Why the change?

<!-- TODO: Should also cover lessons learned about kanban (loosely coordinated vs. not coordinated) -->

Over the past year our core contributor base grew immensely. There are now dozens of contributors working at least part-time on IPFS and its related projects (e.g. cluster, multiformats, IPLD, Orbit). With the increased amount of contributors we've also seen an overwhelming increase in the amount of projects we're actively working on.

As you may know, Protocol Labs has quarterly meetings (aka "Lab Week") where we discuss our work for the quarter and plan our open-source contributions. Last year, during our fourth quarter, we set very ambitious goals for dozens of little projects. After that, at our Lab Week in Berlin this January, we looked back at our projects and found that we hadn't been able to meet all of those goals.

We think that a large part of why we didn't achieve everything was that it was difficult for team members to know what everyone else was working on and because we were constantly context-switching between dozens of little projects. This lead to thrashing - like a processor, there were too many active threads going on at any one point, which led to limited bandwidth for getting real work done.

So, we're pivoting; instead of having everyone come up with their own goals and ideas, and syncing with the team casually about what goals should go where, we're going to be much more explicit about what goals we aim to achieve as a group and who will work together on each set of goals.

### What will this look like?

This is an experiment. We will follow this arrangement through Q1. At the end of Q1 we will review the quarter, consider whether this approach is working and identify ways to improve. One of our main questions will be whether this format makes it easier for community members to contribute to sprints, follow along with our work, and/or add their own initiatives to the project roadmap.

For this first run of the experiment, we've scheduled three types of things on our roadmap: [sprints](https://github.com/ipfs/pm/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20label%3Asprint), [sprintinos](https://github.com/ipfs/pm/issues?q=is%3Aopen+is%3Aissue+label%3Asprintino) and [events](https://github.com/ipfs/pm/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20label%3Aevent%20)

For Q1, our definition of a [sprint](https://github.com/ipfs/pm/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20label%3Asprint) is a team effort that
* lasts exactly two weeks
* involves 3 or more team members
* is the main focus of that team's attention for the duration of the 2 weeks
* has a Captain/PM assigned to lead it

By contrast, a [sprintino](https://github.com/ipfs/pm/issues?q=is%3Aopen+is%3Aissue+label%3Asprintino) lasts one week or less and involves only 1 or 2 team members.

The [events](https://github.com/ipfs/pm/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20label%3Aevent%20) are any public events that IPFS team members will be attending. These events are on the roadmap because they impact the goals for that week and because it gives community members a way to know about opportunities to meet IPFS contributors and to interact with them in-person.

We are also putting this info into the [ROADMAP.md](https://github.com/ipfs/ipfs/blob/master/ROADMAP.md) file in the [main ipfs github repository](https://github.com/ipfs/ipfs).

### What about endeavors that aren't covered by sprints?

As with any organization hoping to effect real change in the world, we have to be very careful to make sure that we're working on the projects that will have the most impact. This means sometimes we have to set other projects aside temporarily or let them go entirely. 

To that end, we've started maintaining a list of the endeavors that didn't make the priority cut for this quarter. Rather than simply neglecting those endeavors, we're making an active effort to set a plan for each one. We've termed these projects 'stale' endeavors because they're not being constantly infused with the improvements, new designs, etc that keep a project alive. For each of those stale endeavors what we'll try to do this quarter is make it clear what the status of the project is and how we plan to deal with it.  

Some of these stale endeavors will be picked up later; we're just not going to focus on them this quarter. We think of those as being "moved to the back burner". Other projects have been in a limbo state for a long time. Some of those might be "set free" so that others can pick up the code in the future with minimal confusion.

If you are interested in helping to keep any of these "stale" endeavors fresh, please say so! Though the core maintainers don't have time to focus on them, that doesn't mean you can't move them forward while we're busy on other sprints.

There is a list of stale endeavors in the updated  [ROADMAP.md](https://github.com/ipfs/ipfs/blob/master/ROADMAP.md#stale-endeavors). This list will change over time as we handle each endeavor to get it out of the 'stale' state by either "putting it on the back burner", "setting it free", or establishing another plan for its future.

### Where can I ask more questions?

We will continue to have our All Hands calls on Mondays. You are encouraged to join! Check out the latest issues at [ipfs/pm](https://github.com/ipfs/pm/issues) for a link and a schedule to those calls.
