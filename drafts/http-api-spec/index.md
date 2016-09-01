---
# this is the final blog post's id (used in the directory)
# this id is part of the url, and should only contain:
#   letters, numbers, dashes.
id: http-api-spec-on-apiary

breadcrumbs:
  - {name: "http-api-spec-on-apiary", link: "./" }

# the date here should be set to the final publication date,
# on the day it is published.
date: 2015-05-05

# this is the Title
title: The IPFS HTTP API Spec

# this is the name of the main author(s)
author: Richard Littauer

# technical details required for the software, don't change these.
baseurl: ..
template: tmpl/layouts/post.html
collection: posts
---

# Apiary

![Screenshot of Apiary](apiary.png)

We now have an HTTP API specification, available on the API-viewing website [Apiary](http://docs.ipfs.apiary.io/#). This means that you can browse the response for any IPFS command online.

### Description of Apiary

[Apiary](https://apiary.io) is an online service that provides a nice UI for looking at HTTP API specifications. It uses the [API Blueprint](https://apiblueprint.org/), a simple and accessible language with concise and expressive syntax. The Apiary site reads from the [apiary.apib](https://github.com/ipfs/http-api-spec/blob/master/apiary.apib) file in the [ifps/http-api-spec](https://github.com/ipfs/http-api-spec) repository.

Currently, the Apiary spec has a request and response listed for every command and subcommand that [go-ipfs](https://github.com/ipfs/go-ipfs) sensibly exposes to the API. The spec also includes as many sensible invalid requests (with an invalid number of arguments, the wrong types or arguments, and with inadequate options specified) as needed in order to understand what errors are returned. Finally, it includes a response for most options.

Some commands available on the CLI are not included: for instance, `ipfs init`, `ipfs daemon`, and `ipfs mount` cannot sensibly be called using the HTTP API currently. Many options are also not available; for instance, `verbose` generally prints to standard out, but doesn't change the response. However, there are still 29 different groups (corresponding to CLI commands: `add`, `ls`, `cat`, and so on), comprising over 12500 lines of Apiary blueprint.

### Example entry

The `.apib` syntax is powerful. Here is a simple example of the `ipfs version` command

    # Group version

    Show version details about the IPFS node.

    ## version [GET /version]
    Returns the current version of ipfs and exits.

    + Request

        #### curl

            curl -i "http://localhost:5001/api/v0/version"

        + Body

            ```
            curl -i "http://localhost:5001/api/v0/version"
            ```

    + Response 200

        + Headers

            ```
            Access-Control-Allow-Headers: X-Stream-Output, X-Chunked-Output, X-Content-Length
            Access-Control-Expose-Headers: X-Stream-Output, X-Chunked-Output, X-Content-Length
            Content-Type: application/json
            Server: go-ipfs/0.4.1
            Trailer: X-Stream-Error
            Date: Thu, 28 Apr 2016 17:33:41 GMT
            Transfer-Encoding: chunked
            ```

        + Attributes (object)
            - Version: "0.4.0-dev" (string)
            - Commit: "b036b23a233a64faa6a456522b0f45763be70e64" (string)
            - Repo:  "3" (string)

        + Body

            ```
            {
              "Version": "0.4.0-dev",
              "Commit": "",
              "Repo": "3"
            }
            ```

Here, we see a description of the command name and the request type (in this case, GET). For the request, we have both a Body section (parsed by Apiary, and used in their live mock runner) and a section in the description with the curl request, which is used to display the command in more clearly on the Apiary site. Then, we have the response; with all of the headers returned from running the `curl` request, as well as an example of the JSON returned and a specification for how the response should looks.

The API blueprint language allows us to define our own data structures, of which three in particular are used often by IPFS: multihashes, swarm addresses, and multiaddresses.

```apib
## Multihash (string)
An hash as defined [here](https://github.com/jbenet/multihash)

### Sample

  `QmNjRVohhWBX31EoaAXkrj5mPF9vQNcTVvQgWHNwdxweCN`

## SwarmAddrs (object)
A list of swarm addresses.

### Sample

+ Body

  ```
  "QmNRCEwFMgCcbjNk5bFud9oqjJduvjBNbkiM8SuxuLh3GS": [
    "/ip4/127.0.0.1/tcp/4001",
    "/ip4/172.17.42.1/tcp/4001",
    "/ip4/192.168.2.3/tcp/4001",
    "/ip6/::1/tcp/4001"
  ],
  "QmNRV7kyUxYaQ4KQxFXPYm8EfuzJbtGn1wSFenjXL6LD8y": [
    "/ip4/127.0.0.1/tcp/4001",
    "/ip4/172.17.42.1/tcp/4001",
    "/ip4/5.9.33.222/tcp/4001",
    "/ip6/2a01:4f8:161:124a::1337:cafe/tcp/4001",
    "/ip6/2a01:4f8:161:124a::2/tcp/4001",
    "/ip6/::1/tcp/4001",
    "/ip6/fcfc:762a:e12a:245d:8e5b:6a40:f65:acab/tcp/4001"
  ]
  ```

## MultiAddr (string)
A multiaddr as defined [here](https://github.com/jbenet/multiaddr).

### Sample

  `/ip6/fcfc:762a:e12a:245d:8e5b:6a40:f65:acab/tcp/4001`
```

### How to edit and join in

This specification can be used immediately to verify that a request you have received from the API is valid. It can also be used as a confirmation standard for cross-language interoperability for IPFS implementations. The [JavaScript IPFS implementation](https://github.com/ipfs/js-ipfs) is already using as a baseline against which to test their outputs, to ensure interop with go-ipfs.

No documentation effort is ever complete, or perfect. If you see an error or would like to add a feature, go to [ipfs/http-api-spec](https://github.com/ipfs/http-api-spec) and join in the conversation in the issues. Current goals that need work include:

 - Making [a test runner](https://github.com/ipfs/http-api-spec/issues/103) that enables Apiary to mock curl requests against a daemon, so that we can do live API tests;
 - [Automatic generation of the API Spec](https://github.com/ipfs/http-api-spec/issues/108) - so far, it has all been written by hand by [@RichardLitt](https://github.com/RichardLitt);
 - [Sharness testing](https://github.com/ipfs/http-api-spec/issues/23) to enable implementations to do live testing against the API;
 - [Enabling subset permissions](https://github.com/ipfs/http-api-spec/issues/2).

For now, [go take a look](http://docs.ipfs.apiary.io/#) and use it! Feedback is always appreciated.
