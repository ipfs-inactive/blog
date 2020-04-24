---
date: 2020-04-24
url: 2020-04-24-ipfs-mobile-design-research-findings
title: IPFS Mobile Design Research Findings
author: Jim Kosem, Dietrich Ayala
tags: mobile-design-guidelines, Mobile, Design, Research
---

# IPFS Mobile Design Research Findings

For IPFS to succeed, it needs to be where people will use it, and for the vast majority around the world that is on their smartphones. In the [introductory post](https://blog.ipfs.io/2020-04-10-ipfs-mobile-design-research/), we laid out the intent of this project - to provide a foundation for successful IPFS apps on mobile by understanding how people are building, using and thinking about P2P and IPFS on mobile today, and then publishing tools to guide the next wave of application builders.

In this first phase of the work, we carried out primary research and analysis consisting of qualitative interviews, and surveys of technology and interaction methods. We’re now ready to publish the results of that research!

A short summary of the findings is below. You can read the full findings and detailed research at the [IPFS Mobile Design Guidelines website](https://protocol-labs.gitbook.io/ipfs-mobile-design-guide/).

## Application Survey

We surveyed the two most used mobile browsers, Android’s Chrome and iOS’s Safari. Neither of these browsers has native P2P capabilities, but we surveyed them to understand mobile users’ first stop on the internet and how they may think about sharing to and from there.

![Google Android sharing photo interaction](https://raw.githubusercontent.com/ipfs/mobile-design-guidelines/master/.gitbook/assets/android-chrome-share.png)


Mobile sharing of files is a very common activity for all ranges of users, but the type of file shared varies from the desktop. We chose sharing photos as an interaction to study on both Android and iOS. This was to understand clearly how mobile users experience getting a file from their phone to another device.

We then tested a variety of publicly released mobile P2P apps. This was to understand previous approaches to designing and developing mobile P2P applications. The applications explored in the survey were spread across three main areas of use: messaging, posting and community boards. From this we learned which features, interface components, and design patterns are currently used in designing for P2P on mobile, to inform future designs for IPFS.

![Status.im's key recovery process](https://raw.githubusercontent.com/ipfs/mobile-design-guidelines/master/.gitbook/assets/status-recover.png)

After in-depth review, we found many intriguing approaches to several shared core areas:

* Apps differed widely in how they approached onboarding and user education.
* Users were generally made aware of privacy and connection implications with sharing.
* Identity and account management varied, ranging from typical email login and password to key and seed phrase recovery.
* We found status and notifications around connection, syncing, and download status to be lacking. We found many scenarios where the user could connect to others and send files without confirmation, as well.
* In general, there was no consistent sharing method. The main sharing methods were either through torrent apps or through messaging, either direct to users or to community boards.
* The anonymous file share web apps handled privacy better, making use of links and QR codes. 
* To find other users with chat, features ranged from public discoverability to obscure invite methods.

## User Research

User research began with creating assumptions. We gathered these by speaking with and running a workshop with IPFS stakeholders. These assumptions framed the interviews with the Experts, Early Adopters, or Potential Users.

#### EXPERTS

In the interviews, the Experts expressed concern for many potential user issues such as battery life and signal. They did not have extensive user feedback to validate this yet and spoke about needing to grow their user bases. There was particular emphasis on identity being essential to both users and developers. There was also the assumption users concerned about privacy and security would find P2P useful. We also found that offline-first is a trend that is important but difficult to push forward. Design came up in interviews as well, pointing to Dropbox and AirDrop as the gold standard for file sharing. Finally, they highlighted status and notifications as areas requiring consideration and further work.

#### EARLY ADOPTERS

Early Adopters thought users should always know what was going on. The app would inform the user with notifications, but they should not be overwhelming. Early Adopters thought privacy and security was crucial, yet in general navigating privacy and security options is difficult even for advanced users. They emphasised file management, security, permissions, and backup as essential. What was less important was who had the final or original file which was interesting. Most mentioned Single Sign-On (SSO) as a good thing but complex to manage. Finally, most mentioned cloud services like Dropbox as easy to use but not trustworthy.

#### POTENTIAL USERS

The Potential Users all showed a great deal of variety in the type of media files used and shared. They all understood P2P as a concept, but, were unaware of its application. Battery and signal strength were significant issues, but only when lacking. Many ignored identity management, thinking of it as a chore they should do more about. All thought cloud services, such as Dropbox and Google Drive, as stable and dependable. There was concern about their longevity as well as their true intents in business models.

## Next steps

In the next phase we will develop and publish tools for designers, implementors, and builders including design recommendations for the implementation and use of IPFS on mobile. This will take the form of use cases, interaction design patterns, and interface components design. All of this will be published for the community to use, and to inform the next wave of application builders using IPFS or other P2P protocols. These learnings will also be used to inform our core protocol design as IPFS usage grows and extends beyond desktop and server machines.

As IPFS matures and the community grows, we need to look in earnest at how to involve users. The [IPFS Mobile Design Guidelines](https://protocol-labs.gitbook.io/ipfs-mobile-design-guide/) will bridge user needs with core development and the many builders of apps and services. The design guidelines will unify thinking and best practices, providing necessary components, interaction and interface design frameworks. Look for our next post sharing that work soon.
