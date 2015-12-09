---
date: 2015-09-07
id: 2-idempotent-encoder-decoder
template: tmpl/layouts/post.html
baseurl: ..
breadcrumbs:
  - {name: "2-idempotent-encoder-decoder", link: "./" }
tags: codec
title: Idempotent encoders and decoders
author: David Dias
collection: posts
---

Encoding and decoding data is a practice that has been present since we started storing and transmiting information -- even before the Information Age. Encoding and decoding with a specific algorithm, or as we are used to call it, a `codec`, has several different benefits such as: reduced storage space, faster transmission over a selected transport, the possibility to capture data in a specific system-readable form, among others. However not every codec has offers the same features and it is typically wise to use the best codec for the type of data we are dealing with.

A deterministic and idempotent encoding and decoding process should return the same data that was served for the encode function, once the decode function is applied. In essence, something like:

```JavaScript
function isIdempotent(codec, val) {
  return val === codec.decode(codec.encode(val))
}
// should always return true, for all encodable values val
```

Having deterministic and idempotent codecs are not always possible. For example, take a look at sound and video. Capturing a continuous signal would require infinite memory storage, as the segment between two points in a continuum space has an infinite number of other points. And so, in order to capture this, we have to encode 'samples' of the input signal and not the signal as a whole. This loses information and is typically known as lossy compression. Have in mind that there are some codecs for sound and video that are known as lossless compression, simply because the deviations from the original signal don't represent a significant enough change to be relevant.

The expectation is that for discrete signals and finite sets of data, the codecs should be always deterministic and idempotent. Unfortunately this is not always true in the languages we have access to today, with the serializers and deserializers they offer.

I remembered that this expectation can be violated recently, when I needed to rename some keys in a JavaScript object for a Linked Data expander function. My first quick (and hacky) solution was to encode the object to a String. From that format, I'd apply a Regular Expression to change all of the occurrences of a given key.

```JavaScript
function remapKeys(key, newKey, obj)
  // so hacky
  var strObj = JSON.stringify(obj)
  strObj.replace(key, newKey)
  return JSON.parse(strObj)
})
```

This solution worked 'fine', for a while, until I found a case where the data the function was returning started to look diferent, although I was just remaping the keys. Since the type Buffer is not part of the JSON spec (it was later added by in Node.js), there is no standardised way to express it in the JSON format. So, Node.js changes the format if `decoding(encoding(objWithABuffer))` is applied.

```JavaScript
» node
> var obj = { buf: new Buffer('aaaah the data')}
undefined
> obj
{ buf: <Buffer 61 61 61 61 68 20 74 68 65 20 64 61 74 61> }
> JSON.stringify(obj)
'{"buf":{"type":"Buffer","data":[97,97,97,97,104,32,116,104,101,32,100,97,116,97]}}'
> JSON.parse(JSON.stringify(obj))
{ buf:
   { type: 'Buffer',
     data: [ 97, 97, 97, 97, 104, 32, 116, 104, 101, 32, 100, 97, 116, 97 ] } }
```

As we can see in the example above, there is a mutation of the data and a violation of our deterministic and idempotent codec expectation.

Fortunately, I was able to solve my problem with a proper solution, which is a work around the encoding/decoding problem. This is also a more elegant way to remap keys.

```
function remapKeys (obj, keyMap) {
  return _.reduce(obj, remap, {})

  function remap (newObj, val, oldKey) {
    var newKey
    if (keyMap[oldKey]) {
      newKey = keyMap[oldKey]
    } else {
      newKey = oldKey
    }

    if (val instanceof Object && !Buffer.isBuffer(val)) {
      newObj[newKey] = _.reduce(val, remap, {})
    } else {
      newObj[newKey] = val
    }
    return newObj
  }
}
```

You can find this code available as an npm module [remap-keys](https://www.npmjs.com/package/remap-keys).

Unfortunately, it is very hard to revert these decisions, since it would break the current developers expectations. A newer, recent finding of encoder/decoder that doesn't comply with the expectation is [node-cbor](https://www.npmjs.com/package/cbor). In this case, the decoder function returns the decoded objects inside an Array, even if the encoded data was a single object. If you would like to participate in the discussion to find a good approach to fix this (if you consider it needs to be changed), visit https://github.com/hildjj/node-cbor/issues/21.

In summary, I hope this post helped expose how we can not always assume that our data won't be mangled once it traverses a encoding -> decoding routine, although we should shoot to build codecs that are idempotent and deterministic for discrete sets of data.
