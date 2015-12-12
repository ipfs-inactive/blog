#!/usr/bin/env node

var Metalsmith = require('metalsmith')
var debug = require('metalsmith-debug')
var templates = require('metalsmith-templates')
var collections = require('metalsmith-collections')
var serve = require('metalsmith-serve')
var watch = require('metalsmith-watch')
var markdown = require('metalsmith-markdown')
var permalinks = require('metalsmith-permalinks')
var feed = require('metalsmith-feed')
var msstatic = require('metalsmith-static')
var drafts = require('metalsmith-drafts')
var headingsidentifier = require('metalsmith-headings-identifier')

var nunjucks = require('nunjucks')
var njmd = require('nunjucks-markdown')
var njdate = require('nunjucks-date')
var marked = require('marked')

marked.setOptions({
  gfm: true,
  tables: true,
  smartLists: true
})

var njenv = nunjucks.configure()
njmd.register(njenv, marked)

njdate.setDefaultFormat('YYYY-MM-DD, h:mm:ss a')
njdate.install(njenv)

njenv.addFilter('dump', JSON.stringify)

Metalsmith(__dirname)
  .use(debug())
  .use(drafts())
  .metadata({
    site: {
      title: 'IPFS Blog',
      url: 'http://ipfs.io/blog/',
      author: 'The IPFS Team'
    }
  })
  .use(collections({
    posts: {}
  }))
  .use(markdown())
  .use(templates({ 'directory': '.', 'engine': 'nunjucks', 'inPlace': true }))
  .use(templates({ 'directory': '.', 'engine': 'nunjucks' }))
  .use(headingsidentifier())
  .use(permalinks())
  .use(feed({'collection': 'posts'}))
  .use(msstatic({'src': 'tmpl/static', 'dest': 'static'}))
  .use(serve({
    'port': 8081,
    'verbose': true
  }))
  .use(watch())
  .destination('./build')
  .build(function (err) {
    if (err) {
      console.log(err)
      throw err
    }
  })
