---
baseurl: ..
template: tmpl/layouts/post.html
breadcrumbs:
  - {name: "1-run-ipfs-on-docker", link: "./" }
id: 1-run-ipfs-on-docker
date: 2015-07-11
title: Run IPFS in a Docker container
author: Kyle Drake
collection: posts
---

<a href="https://www.docker.com/">Docker</a> has become something of a standard for containerizing applications, even being used as the container standard for <a href="http://kubernetes.io/">Kubernetes</a>, Google's project to build an open source version of their internal clustering systems.

There's a ridiculous amount of churn in this space, including recent work to <a href="http://runc.io/">develop an industry standard for containers</a> that will likely add even more churn. But it looks like the Docker format will be supported for quite some time, and whatever the new standard ends up being will probably look a lot like Docker.

In my occasional role as a sysadmin, I definitely understand what containers bring to the table. I've configured many systems in the past, and then dealt with the frustration of figuring out how to configure them again, or quickly deploy and scale software to multiple servers, and make sure they don't consume too many resources and take systems down.

The IPFS team has provided an <a href="https://registry.hub.docker.com/u/jbenet/go-ipfs/">IPFS Docker image</a>, which is syncronized with the latest commits to <a href="https://github.com/ipfs/go-ipfs">go-ipfs</a>. It only takes a few commands to try it out!

```sh
mkdir /tmp/ipfs-docker-staging
mkdir /tmp/ipfs-docker-data
docker run -d --name ipfs-node -v /tmp/ipfs-docker-staging:/export -v /tmp/ipfs-docker-data:/data/ipfs -p 8080:8080 -p 4001:4001 -p 5001:5001 jbenet/go-ipfs:latest
```

8080 is the HTTP Gateway, which allows you to query ipfs data with your browser (<a href="http://gateway.ipfs.io/ipfs/QmVyS3iAy7mvDA2HqQWm2aqZDcGDH3bCRLFkEutfBWNBqN/">example</a>). 4001 is what swarm port IPFS uses to communicate with other nodes, and port 5001 is used for the local API.

We've mounted a data and staging volume. The `data` volume is used to store the IPFS config and the database, and `staging` is a directory you can use for staging files for command line usage (such as `ipfs add`). If you're only using the API, you can omit the staging directory volume. And of course, feel free to put those directories somewhere other than `/tmp`.

<a href="http://kuberneteslaunch.com">Kubernetes 1.0</a> comes out next week, so after that, we'll try using it to build a cluster of IPFS nodes that can store any kind of data and be able to retreive it from any other IPFS node. Not just with IPFS nodes in your cluster, but with everyone!
