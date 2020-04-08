---
date: 2019-04-12
url: 80-js-ipfs-0-35
title: js-ipfs 0.35.0 released
author: Alan Shaw
header_image: 044-js-ipfs-0.35.png
---

> Small, acyclic and flexible, just the way you like it

# 🔦 Highlights

## ✂️ Huge bundle size cuts!

One of the biggest goals for JS IPFS is to enable the distributed web in the browser. Part of that is being a good web citizen and minimising the amount of code we ship, to ensure IPFS downloads quicker, `npm install`'s quicker, loads quicker and utilizes fewer resources. It's especially important on resource constrained mobiles and IoT devices.

The good news you want to hear is that we've now chopped around **50%** off the bundle size of JS IPFS since 0.33, that's a reduction of nearly _half_ of the code we were previously shipping! This is an amazing improvement and a great reason to upgrade.

## 🌳 DAG HTTP API

The HTTP API now has endpoints for DAG operations like `get`, `put` and `resolve`. Hooray! It was actually super easy so we just decided to do it spontaneously. I know, we're so zany.

On a more serious note, this brings JS IPFS another step closer to feature parity with Go IPFS. We're pushing forwards with this in _every_ release 🚀 - stay tuned!

## 🙉 Multiple address listening for API and Gateway servers

The HTTP API and the HTTP Gateway started by your IPFS node can now listen on multiple addresses. It's a backward compatible change, all you have to do is change the value of `Addresses.API` or `Addresses.Gateway` in your JSON config file to be an _array_ of [multiaddrs](https://github.com/multiformats/multiaddr/) instead of a single string multiaddr. Here's an example:

```json
{
  "Addresses": {
    "API": [
      "/ip4/127.0.0.1/tcp/5001",
      "/ip6/::1/tcp/5002"
    ],
    "Gateway": [
      "/ip4/127.0.0.1/tcp/8080",
      "/ip6/::1/tcp/8080"
    ]
  }
}
```

## 🔭 Recursive DNS link lookups

[DNS link](http://dnslink.io/) TXT records like `dnslink=/ipns/domain.com` can now be recursively resolved until they hit an IPFS hash like `/ipfs/QmHash`. Even better, that's the new default. 👌

# 🏗 API Changes

* CLI
    * The global flag `--local` was renamed to `--offline`
    * Added flag `--enable-preload` to `jsipfs daemon` command to allow users to enable or disable content preloading
* Core
    * `ipfs.util.isIPFS` and `ipfs.util.crypto` have moved to static exports and should now be accessed like:

        ```js
        const { isIPFS, crypto } = require('ipfs')
        ```
    * `ipfs.types.*` have moved to static exports and should now be accessed like:

        ```js
        const { Buffer, CID, multiaddr, multibase, multihash, PeerId, PeerInfo } = require('ipfs')
        ```
    * `ipfs.resolve` now supports resolving to the middle of an IPLD block instead of erroring. Given:

        ```js
        b = {"c": "some value"}
        a = {"b": {"/": cidOf(b) }}
        ```
        `ipfs resolve /ipld/cidOf(a)/b/c` should return `/ipld/cidOf(b)/c`. That is, it resolves the path as much as it can. Previously it would simply fail with an error.
    * `ipfs.dns` now resolves recursively by default, set the `recursive` options to `false` to prevent this behaviour
* HTTP API
    * Added the following DAG endpoints:
      * `/api/v0/dag/put`
      * `/api/v0/dag/get`
      * `/api/v0/dag/resolve`

# ❤️ Huge thank you to everyone that made this release possible

In alphabetical order, here are all the humans that contributed to the release:

* [a1300](https://github.com/a1300) (1 comment)
* [Aarnav](https://github.com/R9295) (1 issue)
* [Adam Gall](https://github.com/adamgall) (1 comment)
* [Adam Uhlíř](https://github.com/AuHau) (1 PR, 2 issues, 4 reviews, 10 comments)
* [Aditya Bose](https://github.com/adbose) (1 PR)
* [Alan Shaw](https://github.com/alanshaw) (82 PRs, 11 issues, 114 reviews, 235 comments)
* [Alberto Elias](https://github.com/AlbertoElias) (3 PRs, 3 issues, 1 review, 13 comments)
* [Alex North](https://github.com/anorth) (1 PR, 1 comment)
* [Alex Potsides](https://github.com/achingbrain) (18 PRs, 2 issues, 43 reviews, 35 comments)
* [André Cruz](https://github.com/satazor) (1 issue, 6 comments)
* [Andrej Novikov](https://github.com/shroomist) (1 comment)
* [Andrew Nesbitt](https://github.com/andrew) (7 PRs)
* [Andrius Bacianskas](https://github.com/Bacis) (1 comment)
* [Angelo](https://github.com/langelog) (1 comment)
* [Arkadiy Kukarkin](https://github.com/parkan) (9 comments)
* [ask03](https://github.com/ask03) (1 issue)
* [Ayush Gupta](https://github.com/AK-007) (1 comment)
* [Barry G](https://github.com/bgits) (1 issue, 6 comments)
* [Baruch Velez](https://github.com/baruchvlz) (1 comment)
* [Beeno Tung](https://github.com/beenotung) (1 PR, 3 comments)
* [Benjamín Vázquez](https://github.com/bazquezero) (1 issue)
* [Blake Byrnes](https://github.com/blakebyrnes) (3 reviews, 2 comments)
* [Brendan Miller](https://github.com/bmiller59) (1 comment)
* [Brian](https://github.com/ethericsol) (1 issue, 9 comments)
* [Chad Retz](https://github.com/cretz) (2 comments)
* [Chance Hudson](https://github.com/JChanceHud) (1 PR, 1 issue, 4 reviews)
* [CHEVALAY JOSSELIN](https://github.com/josselinchevalay) (1 PR, 1 issue, 5 comments)
* [Chris Anderson](https://github.com/jchris) (1 PR, 3 reviews)
* [Chris de Jong](https://github.com/platoscave) (1 comment)
* [Christian Couder](https://github.com/chriscool) (1 comment)
* [cloudbitsum](https://github.com/cloudbitsum) (1 issue, 1 comment)
* [comntr](https://github.com/comntr) (3 issues, 2 comments)
* [Daniel Krech](https://github.com/eikeon) (1 PR, 1 comment)
* [David](https://github.com/multikatt) (1 PR)
* [David Ammouial](https://github.com/davux) (1 comment)
* [David Dias](https://github.com/daviddias) (1 PR, 1 issue, 28 reviews, 23 comments)
* [Davit Barbakadze](https://github.com/jayarjo) (1 issue, 3 comments)
* [Despoinis](https://github.com/Despoinis) (1 issue, 2 comments)
* [Diogo Silva](https://github.com/fsdiogo) (3 PRs, 1 review, 1 comment)
* [dirkmc](https://github.com/dirkmc) (17 PRs, 24 reviews, 14 comments)
* [Dmitriy Ryajov](https://github.com/dryajov) (1 comment)
* [Dustin](https://github.com/Duske) (1 comment)
* [edoo](https://github.com/ookangzheng) (1 PR)
* [Elad](https://github.com/justelad) (1 comment)
* [Federico Luzzi](https://github.com/luzzif) (2 issues)
* [Filip Š](https://github.com/filips123) (1 PR, 2 comments)
* [Francis Gulotta](https://github.com/reconbot) (4 comments)
* [Franck Royer](https://github.com/D4nte) (1 comment)
* [Friedel Ziegelmayer](https://github.com/dignifiedquire) (2 reviews, 9 comments)
* [Georgios Rassias](https://github.com/grassias) (1 PR, 4 comments)
* [Gorka Ludlow](https://github.com/AquiGorka) (1 comment)
* [Grant Herman ](https://github.com/grantlouisherman) (4 PRs, 1 issue, 3 reviews, 12 comments)
* [Guilherme Gervasio](https://github.com/gil-air-may) (1 issue, 1 comment)
* [Guy Sviry](https://github.com/guysv) (1 issue, 1 comment)
* [Haywirez](https://github.com/haywirez) (1 comment)
* [hazae41](https://github.com/hazae41) (1 issue, 3 comments)
* [Henrique Dias](https://github.com/hacdias) (1 review, 8 comments)
* [Henry Rodrick](https://github.com/moshisushi) (1 review, 1 comment)
* [heqimagic](https://github.com/iheqi) (1 issue, 1 comment)
* [Huberto Kaiser Filho](https://github.com/hubertokf) (2 issues, 4 comments)
* [Hugo Dias](https://github.com/hugomrdias) (16 PRs, 3 issues, 29 reviews, 48 comments)
* [Hunter Trujillo](https://github.com/cryptoquick) (1 issue, 2 comments)
* [Irakli Gozalishvili](https://github.com/Gozala) (6 PRs, 16 issues, 14 reviews, 50 comments)
* [isan_rivkin](https://github.com/Isan-Rivkin) (2 PRs, 5 comments)
* [IwraStudios](https://github.com/IwraStudios) (1 issue)
* [Jacob Heun](https://github.com/jacobheun) (26 PRs, 5 issues, 67 reviews, 86 comments)
* [Jakub Sztandera](https://github.com/Kubuxu) (5 comments)
* [James Cullum (Pseudonym)](https://github.com/JamesCullum) (1 comment)
* [JamesYin](https://github.com/elantion) (4 comments)
* [João Antunes](https://github.com/JGAntunes) (1 PR, 2 issues, 4 comments)
* [John Hiesey](https://github.com/jhiesey) (1 comment)
* [Jon](https://github.com/Schwartz10) (1 comment)
* [Jon Chiang](https://github.com/bingge1) (1 comment)
* [Jonathan Gaillard](https://github.com/gaillard) (1 issue, 2 comments)
* [jzstern](https://github.com/jzstern) (1 comment)
* [kesavananbu](https://github.com/kesavananbu) (1 comment)
* [klueq](https://github.com/klueq) (1 comment)
* [kwakwaa](https://github.com/kwakwaa) (2 issues, 1 comment)
* [lanmower](https://github.com/lanmower) (1 issue)
* [LifeBCE](https://github.com/lifeBCE) (2 issues, 3 comments)
* [Lorenzo Setale ](https://github.com/koalalorenzo) (1 comment)
* [LuffySmile](https://github.com/LuffySmile) (1 issue)
* [Łukasz Magiera](https://github.com/magik6k) (5 reviews, 4 comments)
* [Maciej Krüger](https://github.com/mkg20001) (4 reviews, 26 comments)
* [Marcin Czenko](https://github.com/marcinczenko) (1 issue, 1 comment)
* [Marcin Rataj](https://github.com/lidel) (6 PRs, 7 issues, 9 reviews, 16 comments)
* [Mark Robert Henderson](https://github.com/aphelionz) (3 issues, 9 comments)
* [Martín Acosta](https://github.com/tinchoz49) (1 issue)
* [Martin Heidegger](https://github.com/martinheidegger) (1 issue)
* [Matt Joiner](https://github.com/anacrolix) (1 comment)
* [Matt Ober](https://github.com/obo20) (2 issues, 4 comments)
* [Matteo Collina](https://github.com/mcollina) (2 comments)
* [Michael Muré](https://github.com/MichaelMure) (1 PR)
* [Mikeal Rogers](https://github.com/mikeal) (1 PR, 6 issues, 7 reviews, 36 comments)
* [Mikerah](https://github.com/Mikerah) (1 PR, 1 comment)
* [Mitra Ardron](https://github.com/mitra42) (3 comments)
* [Mounish Sai](https://github.com/pvsmounish) (1 PR)
* [Nate Foss](https://github.com/npfoss) (1 comment)
* [Nick Poulden](https://github.com/nick) (1 comment)
* [nijynot](https://github.com/nijynot) (1 comment)
* [Nitin Patel](https://github.com/niinpatel) (10 PRs, 5 issues, 7 reviews, 13 comments)
* [noot](https://github.com/noot) (1 review, 1 comment)
* [Oli Evans](https://github.com/olizilla) (9 PRs, 2 issues, 6 reviews, 16 comments)
* [Olivier Sarrouy](https://github.com/osarrouy) (1 issue, 2 comments)
* [ondratra](https://github.com/ondratra) (1 issue, 2 comments)
* [Patrick Bay](https://github.com/monicanagent) (1 issue)
* [Pedro Gomes](https://github.com/pedrouid) (1 issue, 4 comments)
* [Pedro Teixeira](https://github.com/pgte) (2 issues, 1 review, 9 comments)
* [Perry Kundert](https://github.com/pjkundert) (2 PRs)
* [Pius Nyakoojo](https://github.com/PiusNyakoojo) (1 PR)
* [Portia Burton](https://github.com/pkafei) (1 PR, 3 comments)
* [postables](https://github.com/postables) (1 issue)
* [Prabhat](https://github.com/jollysean) (3 comments)
* [pranav maheshwari](https://github.com/pranavdaa) (1 issue, 2 comments)
* [projectoblio](https://github.com/projectoblio) (1 issue, 2 comments)
* [Rafael Matias](https://github.com/skylenet) (1 PR)
* [Raúl Kripalani](https://github.com/raulk) (2 issues, 9 comments)
* [Richard Schneider](https://github.com/richardschneider) (1 comment)
* [Robert Kiel](https://github.com/robertkiel) (1 PR, 1 comment)
* [Robert Misiorowski](https://github.com/rmisio) (4 issues, 7 comments)
* [Rod Vagg](https://github.com/rvagg) (1 PR, 9 reviews, 6 comments)
* [Rômulo Alves](https://github.com/romuloalves) (2 comments)
* [rori4](https://github.com/rori4) (1 issue, 2 comments)
* [Sam Strauch](https://github.com/SamTS) (1 issue)
* [Sameer Puri](https://github.com/sameer) (2 PRs, 2 reviews, 4 comments)
* [Steven Allen](https://github.com/Stebalien) (2 PRs, 2 comments)
* [Taaliman](https://github.com/taaliman) (1 issue, 1 comment)
* [Teri Chadbourne](https://github.com/terichadbourne) (1 issue, 4 comments)
* [Theo Gravity](https://github.com/theogravity) (1 comment)
* [Thomas Eizinger](https://github.com/thomaseizinger) (3 PRs, 1 issue, 8 comments)
* [Tim Schuppener](https://github.com/ultraschuppi) (1 issue, 2 comments)
* [Tyler van der Hoeven](https://github.com/tyvdh) (1 comment)
* [ukrocks007](https://github.com/ukrocks007) (1 issue)
* [useaquestion](https://github.com/useaquestion) (1 issue, 2 comments)
* [UtopiaCreatorX](https://github.com/UtopiaCreatorX) (1 issue, 2 comments)
* [vasa](https://github.com/vasa-develop) (1 issue, 3 comments)
* [Vasco Santos](https://github.com/vasco-santos) (26 PRs, 7 issues, 83 reviews, 43 comments)
* [Victor Bjelkholm](https://github.com/victorb) (1 review, 1 comment)
* [Vincent Martin](https://github.com/vincepmartin) (2 comments)
* [Vishal1010101](https://github.com/Vishal1010101) (1 comment)
* [Volker Mische](https://github.com/vmx) (30 PRs, 3 issues, 65 reviews, 76 comments)
* [w3cshare](https://github.com/w3cshare) (1 comment)
* [Whyrusleeping](https://github.com/whyrusleeping) (1 issue)
* [X5 Engine](https://github.com/x5engine) (1 issue, 4 comments)
* [xialvjun](https://github.com/xialvjun) (1 issue)
* [Yusef Napora](https://github.com/yusefnapora) (2 PRs, 1 comment)
* [yuwiggin](https://github.com/yuwiggin) (1 issue, 1 comment)
* [Zane Starr](https://github.com/zcstarr) (2 PRs, 2 reviews)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/team-mgmt/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the #ipfs channel on Freenode.
