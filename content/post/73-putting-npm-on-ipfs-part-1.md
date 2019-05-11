---
date: 2019-03-03
title: Putting npm on IPFS Part 1 - The Registry
author: Alex Potsides
---

[npm](https://www.npmjs.com) is the de facto package manager for the JavaScript ecosystem and the largest registry in the world, with more than [900k](https://replicate.npmjs.com/_all_docs) packages and over 7 billion downloads a week.

Today npm is incredibly fast and reliable thanks to the hard work put in by the NPM, Inc team, however we couldn't stop ourselves from wondering; what if we put the registry on the distributed web and took it to a whole new level?

Having dependencies on the distributed web makes development more resillient as there will be multiple nodes available to supply tarballs and some may even be on your local network which lowers bandwidth costs, is faster and can work without an internet connection. These benefits are still a work-in-progress, but with further iteration there's great potential to evolve this cool experiment into a more production-ready demo.

We're going to look at how we put npm onto IPFS in two parts - this is part one, all about the registry, including design goals, implementation details and infrasructure concerns.  It will be followed by part two which describes a next-generation client you can use to install dependencies from the distributed web.

## 🗄️ registry.js.ipfs.io

We're maintaining a complete mirror of npm at https://registry.js.ipfs.io - the difference being it adds [CID](https://docs.ipfs.io/guides/concepts/cid)s to the metadata for every package which you can use to fetch packages from IPFS!

You can use the registry today by specifying the `--registry` parameter to npm:

```console
$ npm --registry=https://registry.js.ipfs.io install
```

...or Yarn:

```console
$ yarn --registry=https://registry.js.ipfs.io
```

This will instruct it to use our registry mirror instead of the default registry.  You can add this to your config via:

```console
$ npm config set registry https://registry.js.ipfs.io
$ yarn config set registry https://registry.js.ipfs.io
```

### 📦 GET your dependencies, proxy everything else

Only `GET` requests are honoured by our mirror, all other requests are forwarded on to the npm registry, so you if you publish while using our mirror, your package will still end up on the public registry.  Requests/response content is not logged so your credentials are never at rest on our servers.

Everything is also served over https unlike some very old npm modules which are served over http by the npm registry.

## 👷‍♀️ How we built it

A group of [ipfs-npm-registry-mirror](https://github.com/ipfs-shipyard/ipfs-npm-registry-mirror) nodes are running, they contain a [js-ipfs](https://github.com/ipfs/js-ipfs) instance used to share and resolve modules and are connected to the wider IPFS network.  They also have a small http server used to respond to requests for module metadata and tarballs from the from the npm cli.  These all sit behind an http load balancer to distribute traffic to the mirrors.

![Network topology](/73-putting-npm-on-ipfs-part-1/network-topology.png)

### 🗃️ The datastore

Each mirror has an [IPFS Repository](https://github.com/ipfs/specs/tree/master/repo) that is backed by AWS S3 via an instance of [datastore-s3](https://github.com/ipfs/js-datastore-s3) - this lets us deploy the service as a set of immutable containers, handle huge amounts of data cost effectively and scale up and down as required at the price of a small amount of latency on transfers.

![Datastore S3](/73-putting-npm-on-ipfs-part-1/datastore-s3.png)

If you'd like to leverage S3 for your IPFS node, check out the example of how to configure IPFS to use S3 in the [datastore-s3 examples folder](https://github.com/ipfs/js-datastore-s3/tree/v0.2.3/examples/full-s3-repo).

### 📝 Module metadata

Each module has a set of metadata that describes the versions that are available, along with the tarballs that make up the release. It is a JSON document that we store in the [MFS](https://docs.ipfs.io/guides/concepts/mfs/) under the directory `/npm-registry`, so the module [`ipfs`](https://www.npmjs.com/package/ipfs), for example, would look like:

```console
$ jsipfs files read /npm-registry/ipfs
{"_id":"ipfs","_rev":"122-28686ac76345db3f398b88ae73346a15","name":"ipfs","description":"JavaScript implementation of the IPFS specification","di...
```

The metadata for a [module on registry.js.ipfs.io](https://registry.js.ipfs.io/ipfs) is almost identical to that [on the public registry](https://registry.npmjs.org/ipfs), the only difference is that we store CIDs and the original download location:

```javascript
{
...
  "name": "ipfs",
...
  "versions": {
    "0.34.4": {
      "name": "ipfs",
...
      "dist": {
        "tarball": "https://registry.js.ipfs.io/ipfs/-/ipfs-0.34.4.tgz",
        "source": "https://registry.npmjs.org/ipfs/-/ipfs-0.34.4.tgz",
        "cid": "bafybeiafts7s65iodk4wsetucwhury3cpk4fge374wxhdu5vzc4zuli4xi"
      }
    },
...
```

The CID resolves to the tarball for a module, but while the module has been added to IPFS is not stored in the MFS so we resolve it using the CID:

```console
$ jsipfs files read /ipfs/bafybeiafts7s65iodk4wsetucwhury3cpk4fge374wxhdu5vzc4zuli4xi
??V?0:O=E??g?ܢ?]n<?l?...
```

### 🔍 Resolving a tarball

The npm CLI first requests the metadata for a given module - this contains all published versions and URLs to tarballs for that version.  It is a JSON document the CLI uses to select which version to request that satisfies the [semver](https://semver.org/) range the developer has specified in their `package.json` file.

The CLI then requests a tarball - we use the URL to load the metadata from the package and from that to look up the CID of the tarball.  If the metadata contains a CID for the package, we use it to fetch the content from the IPFS network and relay it to the user.  If the CID is not present, we request the tarball from the npm registry and add it to IPFS while streaming it back to the user. Once the stream is complete we update the manifest with the CID for future use.

![Request sequence](/73-putting-npm-on-ipfs-part-1/request.png)

### 🆕 Updates

What about new modules? npm is constantly being updated with people publishing new modules every few minutes. npm [publishes a feed](https://replicate.npmjs.com/registry) that works like a CouchDB replication log - we have a [replication server](https://github.com/ipfs-shipyard/ipfs-npm-registry-mirror/tree/master/packages/replication-master) that watches this feed for new modules being published.

![Replication](/73-putting-npm-on-ipfs-part-1/replication.png)

When it sees a new module published, the replicator pulls down any new tarballs, adds them to IPFS and updates the metadata with the CIDs of the new module.

It then uses [pubsub](https://blog.ipfs.io/25-pubsub/) to inform the mirrors of the update, which then update their local copies of the module metadata with the new versions & CIDs.

### 🧳 Host your own version

The code for [ipfs-npm-registry-mirror](https://github.com/ipfs-shipyard/ipfs-npm-registry-mirror) is completely open source so you can host a version on your own infrastructure, or on a Raspberry Pi. If you try this, [let us know](https://github.com/ipfs-shipyard/ipfs-npm-registry-mirror/issues) how you get on!

## 🎁 What's next?

While you can use the registry today by specifying the `--registry=https://registry.js.ipfs.io` flag, you are still using HTTP to request modules even if they are then resolved internally via IPFS.

What if you could skip that part and just use IPFS?

Stay tuned for [Putting npm on IPFS Part 2 - The Client](/post/74-putting-npm-on-ipfs-part-2)
