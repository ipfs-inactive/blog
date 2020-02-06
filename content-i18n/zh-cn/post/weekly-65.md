---
date: 2019-10-29
url: zh-ch/weekly-65
translationKey: ipfs-weekly-65
tags: weekly
title: IPFS 周报-65
author: 默奕
---

## 欢迎来到 IPFS 周刊。👋

[星际文件系统 (IPFS)](https://ipfs.io/) 是一种新的超媒体分布协议，通过内容和标识来寻址。IPFS 支持创建完全分布式的应用程序。它的目标是使网络更快、更安全、更开放。由于范围广大，本周刊旨在跟踪整个生态系统的开发。

想参与其中？点击下面的一些链接，查看我们在 [GitHub](https://github.com/ipfs) 上的内容，或加入我们的 [IRC](https://riot.im/app/#/room/#ipfs:matrix.org)。
 
想要更新您的收件箱吗? [订阅我们的每周通讯!](http://eepurl.com/gL2Pi5)

以下是自上次 IPFS 周刊以来的一些亮点。


## 最新发布


### 了解如何将 go-ipfs 用作程序库 📚 
[标题说明了一切。](https://blog.ipfs.io/073-go-ipfs-as-a-library/)通过此新教程了解如何将 go-ipfs 用作程序库，并充分利用 go-ipfs 核心 API。 

###  js-ipfs 0.39.0 发布 🎉 
喔！使用预设配置文件配置您的节点！限制从浏览器传出的请求！使用一条命令从头开始创建节点！ [全部使用 js-ipfs 0.39.0！](https://blog.ipfs.io/071-js-ipfs-0-39/) 


##  IPFS 生态圈的动态
*您是否关注 [Twitter 上的 IPFS](https://twitter.com/IPFSbot) ?有关 IPFS 的最新新闻，请查看我们的 Twitter 提要或查看[关于 Awesome IPFS 的最新文章](https://awesome.ipfs.io/articles/)。*

+ 照片：[蒂姆·伯纳斯·李（ Tim Berners-Lee ）看起来是 IPFS 和 libp2p 的粉丝](https://twitter.com/sgrasmann/status/1189194596544200708/photo/1) ，Twitter，2019年10月29日
+ [RTrade Technologies 与 Dappkit 合作利用企业 IPFS 基础架构和 API](https://medium.com/temporal-cloud/rtrade-technologies-partners-with-dappkit-utilizing-enterprise-ipfs-infrastructure-apis-7c9b67fdb589) ，Temporal，2019年10月28日
+ 照片：[在 ＃devcon5 和 #CrosslinkTaiwan 之后，我们上周一参加了 #IPFS 聚会。](https://twitter.com/pswu11/status/1188403475471831042) Twitter，2019年10月27日
+ [观察者十月更新：IPFS 和内置插件](https://medium.com/@rumkin/observer-october-update-ipfs-and-built-ins-6a821fe2a42d) ，Paul Rumkin，2019年10月27日
+ [正如对我持怀疑态度的父亲所解释的，为什么科技公司仍然可以创造光明的未来。](https://medium.com/datadriveninvestor/why-tech-can-still-create-a-bright-future-as-explained-to-my-skeptical-father-f3a6e6dc960) Alex White，2019年10月25日
+ 教程：[如何设置公共 IPFS 网关](https://raptoreum.com/blog/how-to-set-up-a-public-ipfs-gateway/) ，Raptoreum，2019年10月25日
+ [走向自治组织 - 过去，现在，未来](https://medium.com/a-mma/towards-autonomous-organizations-past-present-future-9b66612507e6) ，Jose Jubin，2019年10月25日
+ [Ocean Protocol 和 IPFS，坐在默克尔树中](https://blog.oceanprotocol.com/ocean-ipfs-integration-store-asset-files-43c623c356d7) ，Ocean Protocol，2019年10月24日
+ [嵌入式 Textile 简介](https://blog.textile.io/introducing-embeddable-textile/) ，Textile，2019年10月23日
+ 教程： [Embark 很棒！](https://medium.com/@andrej.rakic.97/embark-is-awesome-9eee74fdfb4f)Andrej，2019年10月23日
+ [ARK 发展路线图：迈向 2020 年](https://blog.ark.io/ark-development-roadmap-moving-towards-2020-36d5e78a1dfe) ，ARK，2019年10月23日
+ [Function X，采用区块链技术的现代智能手机](https://medium.com/@ailaafton2/function-x-a-modern-smartphone-with-blockchain-technology-c7194615f931) ，Afton Aila，2019年10月21日
+ PODCAST：[分布式 Web：Web 的民主化？](https://www.innoq.com/de/podcast/068-distributed-web/) 2019年10月14日
+ [设计用于可互操作和通用数据保护法规的分布式分类帐技术系统-符合卫生数据交换：血糖数据中的用例](https://www.jmir.org/2019/6/e13665/)，Hawig D, Zhou C，Fuhrhop S, Fialho AS，Ramachandran N，Journal of Medical Internet Research, 2019年6月


## 空缺的 IPFS 工作岗位

+ [技术负责人，分布式系统测试基础架构](https://jobs.lever.co/protocol/1ef5b878-573d-44fc-9fe6-c3745597c1fd)，Protocol Labs，远程工作
+ [分布式系统工程师，IPFS 群集（Go 语言）](https://jobs.lever.co/protocol/29207ca7-76a4-470f-b94a-e24244f9adc1)，Protocol Labs，远程工作
+ [高级后端工程师](https://www.golangprojects.com/golang-go-job-dcr-Senior-Backend-Engineer-Berlin-MXC-Foundation-gGmbH.html)，MXC 基金会 gGmbH，德国 柏林
+ [分布式系统技术主管](https://jobs.lever.co/protocol/9283f9b0-de64-4e1f-a221-5d02b0202198)，IPFS，Protocol Labs，远程工作


## 更新和最新版本
*查看生态系统中 IPFS 工具和项目的最新版本。*

+ [async-std v0.99.11 已经发布！](https://github.com/async-rs/async-std/releases/tag/v0.99.11)包括添加的 sync::channel，添加的 Future::delay，添加的 Stream::timeout， 修复 task::block_on 和更快的 fs::File 操作。 
+ [发布的 Ocean Protocol v1.1](https://blog.oceanprotocol.com/ocean-protocol-v1-1-released-2a8bedc0466d) ：一项小的维护更新，具有一些新功能：IPFS 文件托管集成，新的 Events-Handler 组件和 Commons 作为 Barge 中的默认 UI。 


## 我们<3的工具和项目
*[Awesome IPFS](https://awesome.ipfs.io/) 是一个由社区维护和更新的列表，它包括项目、工具或几乎所有与IPFS相关的东西，非常棒。想要了解更多，或将您的信息添加到列表中，请访问 [GitHub 上的 Awesome IPFS](https://github.com/ipfs/awesome-ipfs)。*

+ [os](https://github.com/tomaka/os/) – 尝试构建某种类似于操作系统的环境，其中可执行文件全部位于 WASM 中，并从类似于 IPFS 的去中心化网络中加载。 
+ [深度了解 Graph 网络](https://thegraph.com/blog/the-graph-network-in-depth-part-1) 
+ [Witness](https://witnessdb.com/home) – 使用 IPFS 使以太坊区块链上的文件永生

## 即将到来的社区活动
*您知道 IPFS 在 [discuss.ipfs.io](https://discuss.ipfs.io/) 上有一个社区论坛吗? 注册参与关于编码的讨论、教程、查看公告和了解即将到来的社区活动。*

+ **2019年10月28日至30日：** [开源峰会 + ELC Europe 2019](https://osseu19.sched.com/event/TLD8)将由戴尔技术公司的 Trevor Conn 主持，主题为 “使用 IPFS 和分布式分类帐安全地存储 IOT Edge 数据”。法国，里昂。 
+ **2019年10月30日：** 由 ScaleUp Porto 计划支持的 [OPO.js Meetup＃10](https://www.meetup.com/opo-js/events/265502030/)将主办下一次免费的 Porto JavaScript 社区聚会。葡萄牙，波尔图。 
+ **2019年10月30日：** [数据科学在 Palo Alto 发生争执](https://events.attend.com/f/1383790393) – 在数据科学创新的前沿与实践者进行联系，社交和交易记录，并了解专业人士如何在日常工作流程中利用 ML 推动业务成果。美国， 加利福尼亚，Palo Alto。 
+ **2019年11月6日：** [巴黎每月 P2P Peer 对 Beer](https://p2p.paris/en/event/monthly-2/) 活动是由 P2P 和密码学爱好者社区组织并为其举办的会议。法国，巴黎。
+ **2019年11月14日：** [DWeb 会谈：Textile.io 的 Carson Farmer](https://www.meetup.com/ProtoSchool-Seattle-Learn-to-Make-the-Decentralized-Web/events/263590720/)，西雅图 ProtoSchool 主办。快来访问 Textile.io 上的去中心化网络开发人员 Carson Farmer！美国，华盛顿州，西雅图。 
+ **2019年12月6日：** [柏林 React Day](https://reactday.berlin/) ：构建代码，而不是围墙。参与 React 世界的探索！ React Day Berlin 会议专注于深入的演讲，动手研讨会和寻找新的机会，为每个人提供了结识新朋友和共同开发一流应用程序的空间。德国，柏林。 

## 感谢您的阅读 ☺️

以上是本周有关 IPFS 的全部新闻。如果我们错过了什么，[请回复邮件](mailto:newsletter@ipfs.io)通知我们! 我们可以在下周的节目中介绍您。
