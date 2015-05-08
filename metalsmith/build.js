#!/usr/bin/env node

var Metalsmith = require('metalsmith')
var debug = require('metalsmith-debug')
var templates = require('metalsmith-templates')
var collections = require('metalsmith-collections')
var partial = require('metalsmith-partial')
var msstatic = require('metalsmith-static')
var serve = require('metalsmith-serve')
var watch = require('metalsmith-watch')
var markdown = require('metalsmith-markdown')

var nunjucks = require('nunjucks')
var njmd = require('nunjucks-markdown')
var njdate = require('nunjucks-date')
var marked = require('marked')

marked.setOptions({
  gfm: true,
  tables: true,
  smartLists: true,
})

njenv = nunjucks.configure()
njmd.register(njenv, marked)

njdate.setDefaultFormat('YYYY-MM-DD, h:mm:ss a');
njdate.install(njenv)


Metalsmith(__dirname)
  .use(debug())
  .use(markdown())
  .use(collections({
    posts: '*.md',
    sortBy: 'date',
    reverse: true
  }))
  .use(templates({
    "directory": ".",
    "engine": "nunjucks",
    "inPlace": true
  }))
  .use(templates({
    "directory": ".",
    "engine": "nunjucks",
  }))
  .use(msstatic({"src": "styles/", "dest": "styles"}))
  .use(serve({
    "port": 8081,
    "verbose": true
  }))
  .use(watch())
  .destination('./build')
  .build(function(err){
    if (err) {
      console.log(err)
      throw err;
    }
  })
