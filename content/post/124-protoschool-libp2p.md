---
date: 2021-02-15
url: /2021-02-15-libp2p-comes-to-protoschool/
title: libp2p comes to ProtoSchool
author: Teri Chadbourne
tags: protoschool, libp2p, ipfs
header_image: 124-libp2p-comes-to-protoschool.png
---

The [ProtoSchool](https://proto.school) team is pleased to announce the launch of a shiny new multiple-choice tutorial [introducing libp2p](https://proto.school/introducing-libp2p), the modular peer-to-peer networking stack that spun out of IPFS into its own first-class project and a dependency of IPFS itself. Today, IPFS focuses on _content addressing_ (i.e., finding, fetching and authenticating any piece of content in the web) while libp2p focuses on _process addressing_ (i.e., finding, connecting and authenticating any data transfer processes in the network).

<img style="width: 42rem" src="/124-libp2p-comes-to-protoschool/libp2p-ipfs-animation.gif" alt="libp2p animation representing libp2p being extracted out of ipfs" />

Historically, companies that produced peer-to-peer applications like Skype or BitTorrent created their own protocols to support them. Those protocols made a lot of assumptions about the environments they’d run in and the needs they’d meet, making them incredibly hard to upgrade or adapt to new environments. libp2p, however, has been extracted from its original implementation as the networking stack of IPFS, and can now serve a broad variety of use cases. While everyone building on IPFS or Filecoin is using libp2p as a dependency, many folks are using libp2p independently or embedded in other projects such as Ethereum 2.0, Polkadot, and Status.im.

<img style="width: 50rem" src="/124-libp2p-comes-to-protoschool/libp2p-logo-animation.gif" alt="libp2p animation representing libp2p modularity. Each block of the libp2p logo represents a component of the libp2p network stack." />

libp2p takes a modular approach to addressing the many components that can make up a network stack, from transports to multiplexing and beyond. A user can choose the specific pieces they need and compose their own configuration, tailored for their use cases. All of those pieces have very well defined interfaces that enable interoperability and easy upgrades, creating a future-proof networking stack. This ecosystem of interoperable modules is key to libp2p’s versatility across multiple environments.


Learn more in our code-free [Introduction to libp2p tutorial](https://proto.school/introducing-libp2p), or view our full [IPFS course on ProtoSchool](https://proto.school/course/ipfs) for intros to fundamental DWeb concepts, hands-on coding challenges with the js-ipfs APIs, and more.

## More on libp2p

We’re excited to bring more libp2p content to ProtoSchool in the near future! In the meantime, we highly recommend the [libp2p docs site](https://docs.libp2p.io/) as a great source of conceptual explainers, as well as code examples featuring the Go Lang, JavaScript, and Rust implementations of the networking stack.

## Help us improve ProtoSchool

ProtoSchool is a team effort, and we depend on folks in the IPFS and dweb community to outline new content, add new features, fix bugs, catch typos, and test-drive new tutorials like this one. There are many ways to [contribute to the project](https://proto.school/contribute), no matter your background, and our new multiple-choice format makes it super easy to [create new tutorials](https://proto.school/build) without any coding experience. In fact, the awesome José Bateira, who created our latest tutorial, built it with the help of our user-friendly ProtoWizard CLI!

<img src="/115-protoschool-merkle-dags/protowizard.png" alt="Screenshot of ProtoWizard CLI"/>

One of the easiest ways to help is by sharing your feedback as you explore our tutorials. You’ll find a link at the bottom of every lesson to help you submit your suggestions.

We can’t wait to hear what you think of the [new libp2p tutorial](https://proto.school/introduction-to-libp2p)!
