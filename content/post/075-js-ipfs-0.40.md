---
date: 2019-12-02
url: 2019-12-02-js-ipfs-0-40
title: js-ipfs 0.40.0 released
author: Alan Shaw
---

# 🔦 Highlights

> Migrations are not just for ducks. We're paving the way for the dweb in the browser by laying foundations to switch to a hash format that can be used in URL origins 🛣

## 🦆 New repo migrations tool

Ever worked on an application where you've had to write a database migration? Yeah, us too. Up until now js-ipfs hasn't been able to migrate repo's to a new format. Well, that's not strictly true, you could have used the go-ipfs repo migration tool on a repo created when running js-ipfs in Node.js (yes, we have repo compatibility!), but in the browser you were stuck.

..and I mean really stuck, if we'd updated the format of a repo that ships with js-ipfs then your applications would just have to catch an error that the repo version was not compatible. You couldn't use it, and you couldn't upgrade. Bad news bears 🐻.

We had a cunning strategy to avoid this situation - do not change the repo 😂, but this is rapidly becoming unsustainable since we actually want to add a migration to achieve our dream of [base32 encoded v1 (by default) CIDs](https://github.com/ipfs/js-ipfs/issues/1440).

Good news friends! The new version of js-ipfs now ships with a repo migration tool that'll automatically migrate repo's in the browser. So now all our ducks are in a line, stay tuned for a migration and a switch to v1 CIDs ✨!

## 🎻 base32 encoded CIDs in IPNS paths

My violin strings gently weep for being able to use Peer IDs in a domain, and let me tell you why.

Peer IDs currently cannot be used in a domain name because their string format is `base58` - a case _SENSITIVE_ encoding. In domain names the following are equivalent:

```
QmNib2c1qCVSbp9QPT81RmDSg3n8kFgPsMCdj4gpveJESE
qmnib2c1qcvsbp9qpt81rmdsg3n8kfgpsmcdj4gpvejese
QMNIB2C1QCVSBP9QPT81RMDSG3N8KFGPSMCDJ4GPVEJESE
```

So, bad times.

...but wait, [Peer IDs _ARE_ CIDs](https://github.com/libp2p/specs/blob/master/RFC/0001-text-peerid-cid.md)! I know, weird, but also rad because in theory we should be able to re-encode them as `base32`. Right now though, everything expects a `base58` encoded string (a v0 CID) because they're actually just a multihash.

In this js-ipfs release we've made a small change to allow you to take your Peer ID (a v0 CID), convert it to a base32 encoded v1 CID and use it in an IPNS path like `/ipns/bafybeidta3hkxk3ihxfsk765oswgsjhmvcnkeestyuov6r2t5tyts4xuoe`. You can take advantage of [cid.ipfs.io](https://cid.ipfs.io) (base32 version is provided for your convenience at the very bottom of the page) or do the conversion with the command line tools:

```sh
jsipfs id | json id | jsipfs cid base32
bafybeidta3hkxk3ihxfsk765oswgsjhmvcnkeestyuov6r2t5tyts4xuoe
```

This is really, seriously cool, because now Peer IDs can be used in domain names and so an IPFS gateway operating at `bafybeidta3hkxk3ihxfsk765oswgsjhmvcnkeestyuov6r2t5tyts4xuoe.ipns.dweb.link` for example, will have origin isolation (hooray for security 🔒) _AND_ IPNS enabled mutable data 🚀⚡️

To ease the transition we support CID v0 converted to v1 (with `dag-pb` multicodec). In the future, new Peer IDs will be v1 CIDs with self-describing [`libp2p-key` codec](https://github.com/libp2p/specs/blob/master/peer-ids/peer-ids.md#libp2p-key-cid) that is `base32` encoded by default...but that's a change for another day.

## 🌲 Implemented `dag put` and `dag resolve` CLI commands

These have been available in core for a while now and we finally got round to surfacing them in the CLI. e.g.

```console
$ jsipfs dag put '""IPLD RULEZ""'
bafyreia5coklfzblgd3reqwaieafmpasdceqmcnjrowre3623mtb4nxlhm

$ jsipfs dag put '{"to": {"/": "bafyreia5coklfzblgd3reqwaieafmpasdceqmcnjrowre3623mtb4nxlhm"}}'
bafyreiequnkfflujkwhxk6wud5w64hmijdqdmx7p55fgrbiizw32kdrb7e

$ jsipfs dag put '{"path": {"/": "bafyreiequnkfflujkwhxk6wud5w64hmijdqdmx7p55fgrbiizw32kdrb7e"}}'
bafyreidgfdsoupe747qnjzkjk2yirgv76wr4drev3i7kv6dht4dkypusze

$ jsipfs dag resolve bafyreidgfdsoupe747qnjzkjk2yirgv76wr4drev3i7kv6dht4dkypusze/path/to
bafyreia5coklfzblgd3reqwaieafmpasdceqmcnjrowre3623mtb4nxlhm

$ jsipfs dag get bafyreia5coklfzblgd3reqwaieafmpasdceqmcnjrowre3623mtb4nxlhm
IPLD RULEZ
```

# 🏗 API Changes

* `dag.put` got a `pin` option to save you from calling the pin API separately (and potentially losing your node if GC runs inbetween!)

# ❤️ Huge thank you to everyone that made this release possible

* [@0x6431346e](https://github.com/0x6431346e) (1 commit, 2 PRs, 1 comment)
* [@0xflotus](https://github.com/0xflotus) (1 comment)
* [@achingbrain](https://github.com/achingbrain) (33 commits, 23 PRs, 1 issue, 56 comments)
* [@alanshaw](https://github.com/alanshaw) (59 commits, 49 PRs, 8 issues, 148 comments)
* [@Alvan98](https://github.com/Alvan98) (1 issue, 1 comment)
* [@andrew](https://github.com/andrew) (1 comment)
* [@anorth](https://github.com/anorth) (1 comment)
* [@aphelionz](https://github.com/aphelionz) (1 comment)
* [@AquiGorka](https://github.com/AquiGorka) (1 comment)
* [@arithmetric](https://github.com/arithmetric) (1 comment)
* [@arminsal1](https://github.com/arminsal1) (1 issue)
* [@atfornes](https://github.com/atfornes) (1 comment)
* [@AuHau](https://github.com/AuHau) (17 commits, 2 PRs, 2 issues, 16 comments)
* [@ay2306](https://github.com/ay2306) (1 commit, 1 PR, 1 issue, 8 comments)
* [@ayushee10](https://github.com/ayushee10) (1 issue, 1 comment)
* [@bitspill](https://github.com/bitspill) (1 comment)
* [@bonedaddy](https://github.com/bonedaddy) (1 issue, 4 comments)
* [@BrunoZell](https://github.com/BrunoZell) (1 comment)
* [@bvand](https://github.com/bvand) (1 comment)
* [@caelumdev](https://github.com/caelumdev) (1 comment)
* [@ceslabdocker](https://github.com/ceslabdocker) (1 issue, 3 comments)
* [@charleenfei](https://github.com/charleenfei) (1 comment)
* [@chirag-shinde](https://github.com/chirag-shinde) (1 comment)
* [@csuwildcat](https://github.com/csuwildcat) (1 comment)
* [@dasilvacontin](https://github.com/dasilvacontin) (1 comment)
* [@datafatmunger](https://github.com/datafatmunger) (1 comment)
* [@daviddias](https://github.com/daviddias) (2 commits, 2 PRs, 3 issues, 21 comments)
* [@davidgilbertson](https://github.com/davidgilbertson) (1 comment)
* [@dbachko](https://github.com/dbachko) (1 comment)
* [@demmojo](https://github.com/demmojo) (1 comment)
* [@dirkmc](https://github.com/dirkmc) (2 commits, 5 PRs, 1 issue, 2 comments)
* [@djdv](https://github.com/djdv) (1 comment)
* [@dordille](https://github.com/dordille) (1 comment)
* [@elsehow](https://github.com/elsehow) (1 comment)
* [@enricomarino](https://github.com/enricomarino) (1 comment)
* [@ethers](https://github.com/ethers) (1 comment)
* [@faheel](https://github.com/faheel) (1 comment)
* [@fbaiodias](https://github.com/fbaiodias) (1 comment)
* [@felixonmars](https://github.com/felixonmars) (1 comment)
* [@Fil](https://github.com/Fil) (1 comment)
* [@filips123](https://github.com/filips123) (1 comment)
* [@fsdiogo](https://github.com/fsdiogo) (2 comments)
* [@Gozala](https://github.com/Gozala) (1 comment)
* [@grantlouisherman](https://github.com/grantlouisherman) (1 comment)
* [@grassias](https://github.com/grassias) (1 comment)
* [@hacdias](https://github.com/hacdias) (2 commits, 2 PRs, 2 comments)
* [@HamzaBinSarfraz](https://github.com/HamzaBinSarfraz) (1 issue, 1 comment)
* [@harshjv](https://github.com/harshjv) (1 comment)
* [@holodisc](https://github.com/holodisc) (1 comment)
* [@hsanjuan](https://github.com/hsanjuan) (1 comment)
* [@hugomrdias](https://github.com/hugomrdias) (1 commit, 1 PR, 10 comments)
* [@iRyanBell](https://github.com/iRyanBell) (1 PR)
* [@ishanjoshi02](https://github.com/ishanjoshi02) (1 comment)
* [@jacobheun](https://github.com/jacobheun) (30 commits, 12 PRs, 1 issue, 32 comments)
* [@jaller94](https://github.com/jaller94) (1 commit, 1 PR)
* [@JChanceHud](https://github.com/JChanceHud) (1 comment)
* [@jessicaschilling](https://github.com/jessicaschilling) (1 commit, 1 PR, 3 comments)
* [@JGAntunes](https://github.com/JGAntunes) (2 comments)
* [@joaosantos15](https://github.com/joaosantos15) (1 comment)
* [@jonahweissman](https://github.com/jonahweissman) (1 comment)
* [@Jonybang](https://github.com/Jonybang) (1 comment)
* [@Jorropo](https://github.com/Jorropo) (1 commit, 1 PR)
* [@kenshyx](https://github.com/kenshyx) (1 comment)
* [@kpp](https://github.com/kpp) (2 issues, 1 comment)
* [@KrishnaPG](https://github.com/KrishnaPG) (1 issue, 1 comment)
* [@lidel](https://github.com/lidel) (5 commits, 6 PRs, 14 comments)
* [@liofchina](https://github.com/liofchina) (1 issue)
* [@machawk1](https://github.com/machawk1) (1 comment)
* [@magik6k](https://github.com/magik6k) (1 comment)
* [@masylum](https://github.com/masylum) (1 comment)
* [@maxlath](https://github.com/maxlath) (1 comment)
* [@mboperator](https://github.com/mboperator) (2 commits, 2 PRs, 2 comments)
* [@mburns](https://github.com/mburns) (1 PR)
* [@mcclure](https://github.com/mcclure) (1 issue, 1 comment)
* [@MichaelMure](https://github.com/MichaelMure) (1 comment)
* [@michaelsbradleyjr](https://github.com/michaelsbradleyjr) (1 issue)
* [@mikeal](https://github.com/mikeal) (3 comments)
* [@mishmosh](https://github.com/mishmosh) (1 comment)
* [@mitar](https://github.com/mitar) (1 comment)
* [@mkg20001](https://github.com/mkg20001) (26 commits, 6 PRs, 4 issues, 52 comments)
* [@mnts](https://github.com/mnts) (1 issue, 2 comments)
* [@momack2](https://github.com/momack2) (3 comments)
* [@moshisushi](https://github.com/moshisushi) (1 comment)
* [@mpetrunic](https://github.com/mpetrunic) (1 commit, 1 PR, 2 comments)
* [@Mr0grog](https://github.com/Mr0grog) (1 comment)
* [@Nashatyrev](https://github.com/Nashatyrev) (1 comment)
* [@NatoBoram](https://github.com/NatoBoram) (1 comment)
* [@negamaxi](https://github.com/negamaxi) (1 comment)
* [@nick](https://github.com/nick) (1 comment)
* [@niinpatel](https://github.com/niinpatel) (1 comment)
* [@noffle](https://github.com/noffle) (2 comments)
* [@npfoss](https://github.com/npfoss) (1 issue)
* [@obo20](https://github.com/obo20) (1 issue, 3 comments)
* [@oed](https://github.com/oed) (1 comment)
* [@olizilla](https://github.com/olizilla) (2 comments)
* [@OR13](https://github.com/OR13) (1 comment)
* [@Otto-AA](https://github.com/Otto-AA) (1 comment)
* [@PascalPrecht](https://github.com/PascalPrecht) (1 comment)
* [@pashoo2](https://github.com/pashoo2) (1 PR, 3 comments)
* [@PedroMiguelSS](https://github.com/PedroMiguelSS) (10 commits, 20 PRs, 1 issue, 22 comments)
* [@petethomas](https://github.com/petethomas) (1 comment)
* [@pgte](https://github.com/pgte) (2 comments)
* [@phillmac](https://github.com/phillmac) (1 commit, 1 PR, 2 comments)
* [@PopTudor](https://github.com/PopTudor) (2 comments)
* [@raksooo](https://github.com/raksooo) (1 comment)
* [@raoulmillais](https://github.com/raoulmillais) (1 comment)
* [@rasmuserik](https://github.com/rasmuserik) (1 comment)
* [@ratsclub](https://github.com/ratsclub) (1 issue, 2 comments)
* [@reasv](https://github.com/reasv) (2 commits, 2 PRs, 1 issue, 9 comments)
* [@requilence](https://github.com/requilence) (1 comment)
* [@RichardLitt](https://github.com/RichardLitt) (2 comments)
* [@RobertFischer](https://github.com/RobertFischer) (1 comment)
* [@rodkeys](https://github.com/rodkeys) (1 comment)
* [@rudolph9](https://github.com/rudolph9) (1 issue, 1 comment)
* [@rumkin](https://github.com/rumkin) (2 issues, 3 comments)
* [@rusfearuth](https://github.com/rusfearuth) (1 issue)
* [@rvagg](https://github.com/rvagg) (1 commit, 1 PR, 4 comments)
* [@sarthak0906](https://github.com/sarthak0906) (1 commit, 1 PR, 1 comment)
* [@satazor](https://github.com/satazor) (1 comment)
* [@SidHarder](https://github.com/SidHarder) (1 comment)
* [@sktt](https://github.com/sktt) (1 comment)
* [@Stebalien](https://github.com/Stebalien) (2 comments)
* [@suutaku](https://github.com/suutaku) (3 issues, 6 comments)
* [@swedneck](https://github.com/swedneck) (1 comment)
* [@terichadbourne](https://github.com/terichadbourne) (1 comment)
* [@thisconnect](https://github.com/thisconnect) (1 comment)
* [@Thisisjuke](https://github.com/Thisisjuke) (1 issue, 2 comments)
* [@uluhonolulu](https://github.com/uluhonolulu) (1 issue)
* [@vasco-santos](https://github.com/vasco-santos) (46 commits, 21 PRs, 4 issues, 15 comments)
* [@victorb](https://github.com/victorb) (1 comment)
* [@vith](https://github.com/vith) (1 comment)
* [@vmx](https://github.com/vmx) (9 commits, 4 PRs, 13 comments)
* [@vporton](https://github.com/vporton) (1 issue, 1 comment)
* [@vweevers](https://github.com/vweevers) (4 comments)
* [@whyrusleeping](https://github.com/whyrusleeping) (1 comment)
* [@wraithgar](https://github.com/wraithgar) (2 comments)
* [@ya7ya](https://github.com/ya7ya) (1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-ipfs repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at https://discuss.ipfs.io/ and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](https://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
