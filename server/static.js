var path = require("path")
var url = require('url')
var express = require("express")
var st = require("st")

module.exports = function( app, manifest ){
  manifest.static.forEach(function( content ){
    switch( content.type ){
      case "download":
        app.use(content.url, express.static(path.join(process.cwd(), content.path), {
          setHeaders: function( res, path ){
            res.attachment(path)
          }
        }))
        break
      default:
        if( manifest.livereload ){
          // st can't not cache content and basically makes livereload impossible
          app.use(content.url, express.static(path.join(process.cwd(), content.path)))
        }
        else{
          // but for production it's better
          app.use(st({
            path: content.path,
            url: content.url,
            index: content.index,
            passthrough: content.passthrough,
            gzip: content.gzip,
            cache: content.cache
          }))
        }
    }
  })
}