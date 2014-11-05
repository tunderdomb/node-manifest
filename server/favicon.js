var express = require('express')
var path = require("path")

module.exports = function( app, manifest ){
  if( !manifest.favicon ) return

  var faviconDir = path.resolve(manifest.favicon.root)
  var faviconIco = path.join(faviconDir, "favicon.ico")

  /* rerouting favicons to the root of the site but keeping dir structure organized */
  app.use(require('serve-favicon')(faviconIco))
  app.route(/^\/(?:apple-touch-icon|favicon|mstile)-(\d{2,3})x\1|browserconfig\.xml/)
    .get(express.static(faviconDir))
}
