module.exports = Manifest

function Manifest( xml ){
  this.routes = require("./manifest/routes")(xml)
  this.request = require("./manifest/request")(xml)
  this.engine = require("./manifest/engine")(xml)
  this.static = require("./manifest/static")(xml)

  this.favicon = xml.favicon

  this.env = require("./manifest/env")(xml)
  this.livereload = require("./manifest/livereload")(xml)
  this.monitor = require("./manifest/monitor")(xml)
  this.preprocess = require("./manifest/preprocess")(xml)

  this.site = xml.site

  this.async = require("async")
  this.glob = require("glob")
  this.express = require("express")
  this.cookieParser = require('cookie-parser')
  this.bodyParser = require('body-parser')
  this.multer = require('multer')
}

Manifest.prototype.locals = function(  ){
  var json = JSON.stringify(this)
  json = JSON.parse(json)
  return function( req, res, next ){
    res.locals.manifest = json
    next()
  }
}