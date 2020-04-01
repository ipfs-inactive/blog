---
date: 2020-04-03
url: 2020-04-01-deprecating-the-old-docs-site
title: Deprecating the old docs site
author: Johnny Matthews
---

# Goodbye, IPFS legacy docs

The IPFS team is deprecating the old documentation website. That’s just a fancy way of saying we’re replacing the current docs.ipfs.io website with the new [docs-beta.ipfs.io website](https://docs-beta.ipfs.io).

## We built a new docs site

A common complaint from users new and old was that the IPFS onboarding experience was rough - and that the documentation was particularly difficult to navigate to find fast, reliable answers. We set out to change that! Work on a new documentation site for IPFS started in Q3 of 2019. Before that, the docs site was built upon Hugo. While Hugo is an excellent static-site generator, it was missing some features around interactive content that we needed to adaptively respond to user needs and collect feedback on which pages to improve first.

With that in mind, the IPFS docs and UX working group built a new site to host the documentation on VuePress. After finishing the new site towards the end of 2019, we ran an opt-in public beta to get feedback and continue making improvements throughout Q1. You can see a preview of the site at [docs-beta.ipfs.io](https://docs-beta.ipfs.io).

## The deprecation plan

We’ve built the site, put it online, and it’s been well received. Next comes the tricky part: removing the old website and putting this one in its place.

Back in the early days of the internet, deprecating a site was as simple as putting up a notice saying things were going to be down for an hour or so, deleting everything in `/var/www/html`, and replacing it with the new website. Sadly, the good-old-days are gone, and we now live in a world full of checks, balances, and redirects. With that in mind, here is our plan to deprecate the old site and replace it with the new one.

### Inform the world

The first step is to let everyone know what we’re going to be doing. This post serves as part of the notification process, along with call-outs on the legacy site, and in the `ipfs/docs` GitHub repository.

### Plan for redirects

There have been several changes to the structure and naming conventions in the docs repo. Significant URL redirects must be put in place from legacy links to where the content now lives. The idea here is to minimize the amount of 404 errors encountered by the reader.

### Update external services

Tools like Google Analytics and Bing Webmaster all need to be informed of the changes. While they may not be major players in the decentralized web of tomorrow, for today at least, centralized search engines are still tools that help us reach people with IPFS questions and spread the word about the dweb.

### Combine all the repos

The IPFS docs have been stuck in limbo for a few months, with GitHub issues living in `ipfs/docs`, but the actual documentation and website content living in `ipfs/ipfs-docs-v2`. This has caused some confusion with posting and commenting upon issues in one repo while reflecting those changes in another.

Part of our deprecation plan is to merge the *code* in `ipfs/ipfs-docs-v2` into `ipfs/docs`. All the legacy docs site content in `ipfs/docs` will be overwritten, but the issues will remain intact. Open issues will have their links checked to make sure they are referencing the correct and updated pages.

### Follow-up

This final task will take place around 6-12 weeks after the site deprecation. There are four things the docs team will need to focus on at this stage:

1. Remove the _this URL has changed_ notices in any existing pages.
2. Re-crawl the site to make sure all the links and references are still working and up to date.
3. Check the top 404 referrers, and create a fix for them where possible.
4. Search all content in the IPFS and Protocol Labs GitHub orgs for references to old site pages, and fix those (so we don’t 404 ourselves!).

## And that’s it

After these steps are complete, the docs site will be fully ready to help readers explore the wonderful world of the decentralized web! These deprecation steps are set to begin in April and should be finished by June 2020. You can take a look at [the full plan over at hackmd.io](https://hackmd.io/@jessicaschilling/S1__jQ2TH).
