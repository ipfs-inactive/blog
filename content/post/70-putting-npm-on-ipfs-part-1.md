---
date: 2019-02-17
title: Putting npm on IPFS Part 1 - The Registry
author: Alex Potsides
---

npm is the de facto package manager for the JavaScript ecosystem and is largest registry in the world, with more than [900k](https://replicate.npmjs.com/_all_docs) packages and over 7 billion downloads a week. In recent years it's got a lot faster and more reliable, but what if we were to take it to the next level and put it on the distributed web?

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

This will instruct it to use our registry mirror instead of the default registry.  You can add this to your npm config via:

```console
$ npm config set registry https://registry.js.ipfs.io
```

### 📦 GET your dependencies, proxy everything else

Only `GET` requests are honoured by our mirror, all other requests are forwarded on to the npm registry, so you if you publish while using our mirror, your package will still end up on the public registry.  Requests/response content is not logged so your credentials are never at rest on our servers.

Everything is also served over https unlike some very old npm modules which are served over http by the npm registry.

## 👷‍♀️ How we built it

A group of [ipfs-npm-registry-mirror](https://github.com/ipfs-shipyard/ipfs-npm-registry-mirror) nodes are running, they contain a js-IPFS instance used to share and resolve modules and are connected to the wider IPFS network.  They also have a small http server used to respond to requests for module metadata and tarballs from the from the npm cli.  These all sit behind an http load balancer to distribute traffic to the mirrors.

![Network topology](/70-putting-npm-on-ipfs-part-1/network-topology.png)

### 🗃️ The datastore

Each mirror has an [IPFS Repository](https://github.com/ipfs/specs/tree/master/repo) that is backed by an instance of [datastore-s3](https://github.com/ipfs/js-datastore-s3) - this lets us deploy the service as a set of immutable containers, handle huge amounts of data and scale up and down as required at the cost of a small amount of latency on transfers.

### 📝 Module metadata

Each module has a set of metadata that describes the versions that are available, along with the tarballs that make up the release.  It is a JSON document that we store in the [MFS](https://docs.ipfs.io/guides/concepts/mfs/) under the directory `/npm-registry`, so, for example for the module [`ipfs`](https://www.npmjs.com/package/ipfs):

```console
$ jsipfs files read /npm-registry/ipfs
{"_id":"ipfs","_rev":"122-28686ac76345db3f398b88ae73346a15","name":"ipfs","description":"JavaScript implementation of the IPFS specification","di...
```

The metadata for a [module on registry.js.ipfs.io](https://registry.js.ipfs.io/ipfs) is identical to that [on the public registry](https://registry.npmjs.org/ipfs), the difference is that we store CIDs and the original download location:

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

![Request sequence](/70-putting-npm-on-ipfs-part-1/request.png)

### 🆕 Updates

What about new modules? npm is constantly being updated with people publishing new modules every few minutes. npm [publishes a feed](https://replicate.npmjs.com/registry) that works like a CouchDB replication log - we have a replication master that watches this feed for new modules being published.  When it sees a new module published, the replicator pulls down any new tarballs, adds them to IPFS and updates the metadata with the CIDs of the new module. It then uses [pubsub](https://blog.ipfs.io/25-pubsub/) to broadcast the new module metadata to the mirrors, which update their local copies with the new versions & CIDs.

## 🎁 What's next?

While you can use the registry today by specifying the `--registry=https://registry.js.ipfs.io` flag, you are still using HTTP to request modules even if they are then resolved internally via IPFS.  What if you could skip that part and just use IPFS?

Stay tuned for [Putting npm on IPFS Part 2 - The Client](/post/71-putting-npm-on-ipfs-part-2)
