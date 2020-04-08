---
date: 2019-01-17
url: 64-js-ipfs-0-34
title: js-ipfs 0.34.0 released
author: Alan Shaw
header_image: 038-js-ipfs-0.34.png
---

> Speed and flexibility, new IPFS for a new year!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I just saw JS IPFS 0.34 breeze out the front door in a totally disco powder blue suit 🕺🏻. It&#39;s fast, small, supports big dirs, is flexible with CID versions and much, much more. More deets in the release notes <a href="https://t.co/3uqFw6WDbu">https://t.co/3uqFw6WDbu</a> <a href="https://t.co/ydTmq2B4zn">pic.twitter.com/ydTmq2B4zn</a></p>&mdash; Alan Shaw (@_alanshaw) <a href="https://twitter.com/_alanshaw/status/1085860207513657344?ref_src=twsrc%5Etfw">January 17, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 🔦 Highlights

## 🏎 Reading Protobuf DAG nodes is super fast

Reading Protobuf DAG nodes just got a serious speed boost as well as a memory reduction. Previously Protobuf DAG nodes (dag-pb nodes for short) carried a multihash property (a [CIDv0](https://docs.ipfs.io/guides/concepts/cid/#version-0)) with them. This used up loads of CPU time calculating the hash for a given node as it was retrieved from storage and with the advent of [CIDv1](https://docs.ipfs.io/guides/concepts/cid/#version-1) there was no guarantee the hashing algorithm and length were correct.

So, we removed it! 🦖 ...but that had the unfortunate consequence of making the object API a whole lot less useful when writing data - the DAG nodes you got back were basically the data you put in. Hence the object API was refactored to return CIDs instead of DAG nodes for write operations...and we all lived happily ever after.

## 🚤 Adding content is blazingly fast

We found a bottleneck that meant the bigger the file you added to IPFS, the longer it would take - oh no 😭! Good news folks, we've seen the speed of adding large files increase by 50% or more in some cases! 💥

Read all about it in [the pull request notes](https://github.com/ipfs/js-ipfs-unixfs-importer/pull/10).

## 🎄 HAMT support added to MFS

We're putting the whole of npm on IPFS! These days npm is like 5.3 terabytes of data and it's all going in [MFS](https://docs.ipfs.io/guides/concepts/mfs/). This is super rad, but we needed a good sharding strategy because 5TB is a lorra lorra files.

If you're curious about npm on IPFS, check out the [project here](https://github.com/ipfs-shipyard/npm-on-ipfs).

## 📣 IPNS over pubsub and DHT

Get informed of [IPNS](https://docs.ipfs.io/guides/concepts/ipns/) record updates and read and publish your IPNS records to the DHT. It's all there and it's all awesome. For those of you new to IPNS, let me give you the lowdown - IPNS puts the mutable in immutable 🤣 It's an age old problem, content addressing is rad and all that, but if I change something the hash changes - 👎 boo...but wait, IPNS solves this, you get a permenant address for changeable content - hooray \o/.

IPNS over pubsub gets the word out quicker to peers that are interested when an IPNS record changes. IPNS over DHT allows peers to find and resolve your IPNS address to some content in the first place! In the next JS IPFS release (0.35) the DHT will be enabled by default and it's going to be epic.

## ⚾️ CID handling improvements

Smoosh your CIDs into whatever version you like - you can now add data under a version 0 CID and get it back using a version 1 CID and vice versa. Now that you have this freedom you can encode them with whatever multibase encoding you like. Version 0 CIDs are all base58btc but if you convert to a version 1 CID you can encode it with base2, base32, base64url or whatever:

```console
# base2
010111000000010010001000000100011011010100010010000001010010111001110001011010111100010100000111000011101010101010101101111100000001011101110001011110100001000100111010101101010111111001000111110001001010000101100010110000001000011110101110100100010101110110100010110100110000001110
# base32
bafybeicg2rebjoofv4kbyovkw7af3rpiitvnl6i7ckcywaq6xjcxnc2mby
# base58btc
QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
# base64url
uAXASIEbUSBS5xa8UHDqqt8BdxehE6tX5HxKFiwIeukV2i0wO
```

This is all work to smooth out the eventual transition to base32 CIDv1 by default - a move to allow CIDs to be used as valid URL origins. Have a [read of this for more](https://blog.ipfs.io/53-go-ipfs-0-4-18/#cidv1-base32-migration).

To help you craft your artisanal CIDs we've introduced a `--cid-base` option to a bunch of CLI commands (and `?cid-base` option to a bunch of HTTP API endpoints). Check it out:

```sh
jsipfs add file.txt --cid-base=base32
added bafybeibns4lrebrxaymvyshgmki5biwh6cd53idxfpen6ysomzrywtsm44 file.txt
```

## 💪 Deps got upgrades!

We got you covered with [WebUI 2.3](https://github.com/ipfs-shipyard/ipfs-webui/releases/tag/v2.2.0) (quic support, responsive navbar, and a language selector), [libp2p 0.24](https://blog.ipfs.io/55-js-libp2p-0-24/) and many other upgrades giving you a faster and smaller JS IPFS.

# 🏗 API Changes

* Object API methods that write DAG nodes now return a [CID](https://www.npmjs.com/package/cids) instead of a DAG node. Affected methods:
    * `ipfs.object.new`
    * `ipfs.object.patch.addLink`
    * `ipfs.object.patch.appendData`
    * `ipfs.object.patch.rmLink`
    * `ipfs.object.patch.setData`
    * `ipfs.object.put`
    * [More info](https://github.com/ipfs/js-ipfs-api/pull/896)
* `DAGNode` instances, which are part of the IPLD dag-pb format have been refactored. These instances no longer have `multihash`, `cid` or `serialized` properties. This effects the following API methods that return these types of objects:
    * `ipfs.object.get`
    * `ipfs.dag.get`
    * [More info](https://github.com/ipld/js-ipld-dag-pb/pull/99)
* Files API methods `add*`, `cat*`, `get*` have moved from `files` to the root namespace. Specifically, the following changes have been made:
    * `ipfs.files.add` => `ipfs.add`
    * `ipfs.files.addPullStream` => `ipfs.addPullStream`
    * `ipfs.files.addReadableStream` => `ipfs.addReadableStream`
    * `ipfs.files.cat` => `ipfs.cat`
    * `ipfs.files.catPullStream` => `ipfs.catPullStream`
    * `ipfs.files.catReadableStream` => `ipfs.catReadableStream`
    * `ipfs.files.get` => `ipfs.get`
    * `ipfs.files.getPullStream` => `ipfs.getPullStream`
    * `ipfs.files.getReadableStream` => `ipfs.getReadableStream`
* New core files API methods added:
    * [`ipfs.addFromStream`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addfromstream)
    * [`ipfs.addFromUrl`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addfromurl)
    * [`ipfs.addFromFs`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addfromfs)
* DHT API methods renamed and return types changed
    * `ipfs.dht.findprovs` renamed to `ipfs.dht.findProvs` and returns an array of [PeerInfo](https://github.com/libp2p/js-peer-info)
    * `ipfs.dht.findpeer` renamed to `ipfs.dht.findPeer` and returns a [PeerInfo](https://github.com/libp2p/js-peer-info)
    * `ipfs.dht.query` now returns an array of [PeerInfo](https://github.com/libp2p/js-peer-info)
    * [More info](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/DHT.md)
* A new option is available in the CLI, HTTP API and core that will allow the multibase encoding to be specified for any CIDs that are returned as strings.
    * A `--cid-base` option has been added to the following **CLI commands**:
        * `jsipfs bitswap stat`
        * `jsipfs bitswap unwant`
        * `jsipfs bitswap wantlist`
        * `jsipfs block put`
        * `jsipfs block stat`
        * `jsipfs add`
        * `jsipfs ls`
        * `jsipfs object get`
        * `jsipfs object links`
        * `jsipfs object new`
        * `jsipfs object patch add-link`
        * `jsipfs object patch append-data`
        * `jsipfs object patch rm-link`
        * `jsipfs object patch set-data`
        * `jsipfs object put`
        * `jsipfs object stat`
        * `jsipfs pin add`
        * `jsipfs pin ls`
        * `jsipfs pin rm`
        * `jsipfs resolve`
        * Note: these two MFS commands _already_ implement the `--cid-base` option:
        * `jsipfs files ls`
        * `jsipfs files stat`
    * A `?cid-base=` query option has been added to the following **HTTP endpoints**:
        * `/api/v0/bitswap/wantlist`
        * `/api/v0/bitswap/stat`
        * `/api/v0/bitswap/unwant`
        * `/api/v0/block/put`
        * `/api/v0/block/stat`
        * `/api/v0/add`
        * `/api/v0/ls`
        * `/api/v0/object/new`
        * `/api/v0/object/get`
        * `/api/v0/object/put`
        * `/api/v0/object/stat`
        * `/api/v0/object/links`
        * `/api/v0/object/patch/append-data`
        * `/api/v0/object/patch/set-data`
        * `/api/v0/object/patch/add-link`
        * `/api/v0/object/patch/rm-link`
        * `/api/v0/pin/ls`
        * `/api/v0/pin/add`
        * `/api/v0/pin/rm`
        * `/api/v0/resolve`
    * A `cidBase` option has been added to the following **core functions**:
        * `resolve`
    * **NOTE** Using the CID base option in `bitswap`, `dag` and `object` APIs **WILL NOT** auto upgrade your CID to v1 if it is a v0 CID and **WILL NOT** apply the encoding you specified. This is because these APIs return IPLD objects with links and changing the version of the links would result in a different hash for the node if you were to re-add it. Also, the CID you used to retrieve the node wouldn't actually refer to the node you got back any longer. [Read this](https://github.com/ipfs/go-ipfs/issues/5349#issuecomment-445104823) for further context.
* All API methods that returned [`big.js`](https://github.com/MikeMcl/big.js/) instances now return [`bignumber.js`](https://github.com/MikeMcl/bignumber.js/) instances.

# ❤️ Huge thank you to everyone that made this release possible

By alphabetical order, here are all the humans that contributed to the release:

* [Aakil Fernandes](https://github.com/aakilfernandes) (1 comment)
* [Alan Shaw](https://github.com/alanshaw) (54 PRs, 12 issues, 115 reviews, 203 comments)
* [Aleksey Bykhun](https://github.com/caffeinum) (1 issue, 1 comment)
* [Alex Knol](https://github.com/Elexy) (1 issue)
* [Alex North](https://github.com/anorth) (1 comment)
* [Alex Potsides](https://github.com/achingbrain) (43 PRs, 7 issues, 41 reviews, 96 comments)
* [André Cruz](https://github.com/satazor) (1 PR, 2 issues, 5 comments)
* [ANUDAVIS](https://github.com/ANUDAVIS) (1 comment)
* [Arkadiy Kukarkin](https://github.com/parkan) (1 issue, 6 comments)
* [Artem Smirnov](https://github.com/uluhonolulu) (1 PR, 1 comment)
* [Arthur Zhuk](https://github.com/ug02fast) (1 PR)
* [AT1452](https://github.com/AT1452) (1 issue)
* [Bazaar Dog](https://github.com/BazaarDog) (1 comment)
* [Beeno Tung](https://github.com/beenotung) (1 issue, 1 review, 2 comments)
* [Billy](https://github.com/WilliamKatz) (1 comment)
* [birbird](https://github.com/birbird) (4 issues, 1 comment)
* [Blake Byrnes](https://github.com/blakebyrnes) (1 PR, 1 issue, 11 comments)
* [Bo](https://github.com/bohendo) (1 comment)
* [Brian Parma](https://github.com/bj0) (1 comment)
* [Cam Stuart](https://github.com/camstuart) (1 comment)
* [Camilo Rodriguez Cuaran](https://github.com/thEpisode) (1 comment)
* [Chang Liu](https://github.com/fluency03) (1 issue, 1 comment)
* [Chris Aslanoglou](https://github.com/chris-asl) (1 PR, 3 issues, 4 comments)
* [Christian Maniewski](https://github.com/chmanie) (2 comments)
* [Daniel Maricic](https://github.com/woss) (2 comments)
* [Daniela Borges Matos de Carvalho](https://github.com/sericaia) (1 comment)
* [David Ammouial](https://github.com/davux) (1 issue, 1 comment)
* [David Dahl](https://github.com/daviddahl) (1 issue)
* [David Dias](https://github.com/daviddias) (9 PRs, 10 issues, 42 reviews, 113 comments)
* [Dean Vaessen](https://github.com/deanvaessen) (1 issue, 1 comment)
* [Diogo Silva](https://github.com/fsdiogo) (4 PRs, 15 reviews)
* [dirkmc](https://github.com/dirkmc) (2 PRs, 3 issues, 3 reviews, 11 comments)
* [Dmitriy Ryajov](https://github.com/dryajov) (2 PRs, 3 comments)
* [Donald Tsang](https://github.com/DonaldTsang) (1 issue)
* [dsmith3210](https://github.com/dsmith3210) (3 comments)
* [eefahy](https://github.com/eefahy) (1 comment)
* [Enrico Fasoli](https://github.com/fazo96) (1 comment)
* [EZ](https://github.com/Nanofortress) (1 comment)
* [Francis Gulotta](https://github.com/reconbot) (2 PRs, 1 issue, 4 comments)
* [Friedel Ziegelmayer](https://github.com/dignifiedquire) (3 reviews, 1 comment)
* [Fuling](https://github.com/Elvenisboy) (1 comment)
* [Giovanni T. Parra](https://github.com/fiatjaf) (1 comment)
* [gitGksgk](https://github.com/gitGksgk) (1 issue)
* [Glenn Vandeuren](https://github.com/VandeurenGlenn) (1 comment)
* [Gorka Ludlow](https://github.com/AquiGorka) (1 comment)
* [Gregory Markou](https://github.com/GregTheGreek) (1 comment)
* [Haad](https://github.com/haadcode) (2 comments)
* [halley801](https://github.com/halley801) (1 issue)
* [Hank Stoever](https://github.com/hstove) (1 comment)
* [Henri S](https://github.com/sternhenri) (1 comment)
* [Henrique Dias](https://github.com/hacdias) (1 issue, 2 comments)
* [Hugo Dias](https://github.com/hugomrdias) (30 PRs, 1 issue, 36 reviews, 41 comments)
* [Hushino](https://github.com/hushino) (4 comments)
* [Irakli Gozalishvili](https://github.com/Gozala) (1 issue)
* [Jaco Greeff](https://github.com/jacogr) (1 comment)
* [Jacob Greenway](https://github.com/Tryptophan) (2 comments)
* [Jacob Heun](https://github.com/jacobheun) (24 PRs, 7 issues, 67 reviews, 114 comments)
* [Jikku Jose](https://github.com/JikkuJose) (4 comments)
* [John Hiesey](https://github.com/jhiesey) (1 PR, 1 issue, 19 reviews, 5 comments)
* [Jonathan Underwood](https://github.com/junderw) (1 comment)
* [Joseph Krug](https://github.com/joeykrug) (1 comment)
* [Juan Esteban Cepeda](https://github.com/Juanchobanano) (1 issue, 2 comments)
* [Juan Perez](https://github.com/Juanperezc) (2 issues, 8 comments)
* [Justin Chase](https://github.com/justinmchase) (1 comment)
* [Kevin Atkinson](https://github.com/kevina) (1 comment)
* [klueq](https://github.com/klueq) (5 issues, 8 comments)
* [Koutaro Chikuba](https://github.com/mizchi) (1 comment)
* [Kyle Drake](https://github.com/kyledrake) (3 comments)
* [Le Hong Son](https://github.com/tomnyson) (1 comment)
* [Leena](https://github.com/leenabhandari) (1 comment)
* [Leon Prouger](https://github.com/leonprou) (1 comment)
* [LiMoMoMo](https://github.com/LiMoMoMo) (1 issue, 3 comments)
* [Lorenzo Setale ](https://github.com/koalalorenzo) (2 issues, 6 comments)
* [lukas2005](https://github.com/lukas2005) (1 issue, 1 comment)
* [Łukasz Magiera](https://github.com/magik6k) (1 review, 1 comment)
* [luojia](https://github.com/JiaJiaJiang) (1 comment)
* [Maciej Krüger](https://github.com/mkg20001) (6 PRs, 3 issues, 1 review, 37 comments)
* [Marcin Rataj](https://github.com/lidel) (3 PRs, 2 issues, 1 review, 10 comments)
* [Marcin Tojek](https://github.com/mtojek) (1 PR, 1 comment)
* [Marcus](https://github.com/marcusnewton1) (3 comments)
* [Mark Robert Henderson](https://github.com/aphelionz) (2 issues, 6 comments)
* [Marten Seemann](https://github.com/marten-seemann) (1 comment)
* [Matt Joiner](https://github.com/anacrolix) (2 issues)
* [Matt Ober](https://github.com/obo20) (1 comment)
* [Matteo Collina](https://github.com/mcollina) (3 PRs, 9 issues, 1 review, 22 comments)
* [Mauricio Cano Giraldo](https://github.com/maooricio) (1 issue, 1 comment)
* [Mauricio Melo](https://github.com/mauriciomelo) (1 comment)
* [mccoysc](https://github.com/mccoysc) (5 issues, 11 comments)
* [Mikeal Rogers](https://github.com/mikeal) (2 issues, 12 comments)
* [Mikerah](https://github.com/Mikerah) (2 issues, 1 comment)
* [Mitra Ardron](https://github.com/mitra42) (1 issue, 6 comments)
* [Mosin Pathan](https://github.com/mosinms7711) (1 issue)
* [Mukundan Senthil](https://github.com/Mukundan314) (1 comment)
* [naure](https://github.com/naure) (1 comment)
* [nikor](https://github.com/nikor) (3 PRs, 3 comments)
* [noot](https://github.com/noot) (1 PR, 1 issue, 4 reviews, 6 comments)
* [Notim Portant](https://github.com/lifeBCE) (2 issues, 6 comments)
* [Oli Evans](https://github.com/olizilla) (7 PRs, 1 issue, 2 reviews, 12 comments)
* [oneEdoubleD](https://github.com/oneEdoubleD) (1 comment)
* [Paul Marlow](https://github.com/sweetpalma) (1 PR, 2 comments)
* [pawankhadpe](https://github.com/pawankhadpe) (1 issue, 3 comments)
* [Pedro Santos](https://github.com/PedroMiguelSS) (1 PR, 1 review)
* [Pedro Teixeira](https://github.com/pgte) (1 PR, 2 issues, 4 reviews, 13 comments)
* [Pierfrancesco Soffritti](https://github.com/PierfrancescoSoffritti) (1 issue, 2 comments)
* [popmanhe](https://github.com/popmanhe) (1 PR)
* [Portia Burton](https://github.com/pkafei) (2 PRs, 2 reviews, 4 comments)
* [Prince Sinha](https://github.com/princesinha19) (3 comments)
* [raduiliescu83](https://github.com/raduiliescu83) (1 issue)
* [Raoul Millais](https://github.com/raoulmillais) (2 PRs, 12 comments)
* [Richard Schneider](https://github.com/richardschneider) (1 issue, 5 comments)
* [Rkrushanovskij](https://github.com/Rkrushanovskij) (1 comment)
* [Robert Misiorowski](https://github.com/rmisio) (2 issues, 7 comments)
* [Robin Monjo](https://github.com/robinmonjo) (1 comment)
* [ron litzenberger](https://github.com/litzenberger) (3 comments)
* [Ross Bulat](https://github.com/rossbulat) (2 comments)
* [Santiago Cammi](https://github.com/scammi) (2 comments)
* [Scott](https://github.com/sprusr) (1 PR, 2 comments)
* [Seshachalam Malisetti](https://github.com/mseshachalam) (1 issue, 1 comment)
* [Snorre Lothar von Gohren Edwin](https://github.com/vongohren) (1 issue, 1 comment)
* [Sri Harsha](https://github.com/sriharrsha) (6 comments)
* [Stanislaw Baranski](https://github.com/stasbar) (1 issue, 2 comments)
* [Steven Allen](https://github.com/Stebalien) (1 PR, 5 issues, 1 review, 13 comments)
* [th3kave](https://github.com/th3kave) (2 issues, 2 comments)
* [TIM](https://github.com/tim-coin) (1 issue)
* [Tomoaki Sato](https://github.com/TOMOAKI12345) (1 comment)
* [Trond Arne Bråthen](https://github.com/tabrath) (1 PR)
* [Vasco Santos](https://github.com/vasco-santos) (49 PRs, 4 issues, 102 reviews, 52 comments)
* [Victor Bjelkholm](https://github.com/victorb) (4 comments)
* [Vishal Kuo](https://github.com/vishalkuo) (1 comment)
* [vitriol-co](https://github.com/vitriol-co) (1 issue, 3 comments)
* [Volker Mische](https://github.com/vmx) (22 PRs, 6 issues, 50 reviews, 79 comments)
* [waliguder](https://github.com/waliguder) (1 issue)
* [Whyrusleeping](https://github.com/whyrusleeping) (1 comment)
* [Willem Wyndham](https://github.com/willemneal) (1 issue)
* [X5 Engine](https://github.com/x5engine) (1 issue, 1 comment)
* [xxyao123](https://github.com/xxyao123) (1 issue, 1 comment)
* [yueleiMaster](https://github.com/yueleiMaster) (1 issue)
* [yuwiggin](https://github.com/yuwiggin) (1 issue)
* [Zack](https://github.com/schollz) (1 PR, 1 comment)
* [Zane Starr](https://github.com/zcstarr) (2 comments)
* [Zhiyuan Lin](https://github.com/edsgerlin) (1 PR)
* [李小明](https://github.com/alx696) (1 issue)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don't know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label at the Ready column in our waffle board - https://waffle.io/ipfs/js-ipfs?label=help%20wanted
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute - https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at http://discuss.ipfs.io/ and help users finding their answers.
- Join the [⚡️ⒿⓈ Core Dev Team Weekly Sync 🙌🏽](https://github.com/ipfs/team-mgmt/issues/650) and be part of the Sprint action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works and what you can do with it is at [discuss.ipfs.io](http://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
