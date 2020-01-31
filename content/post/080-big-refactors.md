---
date: 2020-01-31
url: 2020-01-31-big-refactors
title: Big Refactors
author: Alan Shaw
---

> If you're considering a refactor that'll touch **~70** interdependent repos you've come to the right place for some perspective! This is the sister post to [The Async Await Refactor](/2020-01-28-async-await-refactor/) and covers some of the learnings of completing a big code refactor with a distributed team.

If you think you'd like to take on a challenge like this, do the math. If each repo takes a day to refactor and if you work on it 5 days a week then you've automatically used 14 of your 52 weeks in a year. That's like, 4 months, and that's the absolute best case scenario.

In reality, even if you get approval to do it you're unlikely to be able to work on it all day every day. The problem is that the benefits of a refactor can't always be seen until everything is done and the whole stack is using the new code. The point is, **your project needs to keep moving**. New features need to land and those bugs don't squash themselves.

Refactors to each dependent repo **won't take just one day**. A tiny percentage of them will take less than a day but the vast majority will take multiple days to complete, if not weeks.

You'll be tempted to make those API changes and performance refactors you've always wanted to make. **Beware of scope creep**. If you also decide to take on these tasks, be aware that you're adding to the complexity of integrating a massive breaking change and also to the time the refactor is going to take. You'll probably significantly underestimate the amount of extra time your additional changes will take to write, be tested, be reviewed and re-integrated into the project. You are also likely to introduce new bugs, so **stay focused**. You cannot make everything perfect now. Pick your battles, open an issue, and move on.

Some repos will just take days or weeks to actually convert, and that's not even including converting the tests, getting your work reviewed, making changes from review feedback or rebasing your work because master got this critical security fix in the interim.

Prioritise refactors by dependents. It's obvious, but maybe worth highlighting - the only way you're going to get this done is from the bottom up. **Refactor repos that don't depend on anything first**. Make a list and assign an approximate priority to each repo based on how many other repos it depends on. This creates an opportunity to example your project's structure and cross-module interdependencies. We removed a lot of dev-deps on IPFS and libp2p from modules low in the stack as part of this refactor, speeding up test runs and making CI significantly more reliable.

It's not always possible to use a refactored repo in your dependencies. Sometimes this is due to a circular dependency but sometimes the refactor in another repo is taking longer than expected or is blocked on something else. **Unblock yourself with facades**. You can make the old look like the new but consider it carefully. Doing this takes time and will need to be revisited at a later date to be removed once the dependency refactor is released. In our refactor we made use of `promisify` and `callbackify` modules and also created facades to make the new look like the old so that it could get into production sooner.

**Keep track of what's been done, who is owning what, and where the PR is**. For you own sanity, keep on top of it and celebrate your progress with the team every step of the way. It's a long road and you will all need all the encouragement you can get. Update the team regularly with percentages of how done you are so you can all stay informed of progress and allow yourself to make better estimates for completion.

It's taken us 1 year and 2 months so far, but we're nearly there. Read all about our big refactor: [The Async Await Refactor](/2020-01-28-async-await-refactor/).
