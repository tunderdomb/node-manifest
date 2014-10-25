var fs = require("fs")
var path = require("path")
var xml = require("xml2js")
var parser = new xml.Parser({
  attrkey: "attributes",
  charkey: "text",
  trim: true,
  normalizeTags: true,
  normalize: true,
  explicitArray: false,
  mergeAttrs: true,
  explicitChildren: false
})
var MANIFEST_SRC = path.join(process.cwd(), "manifest.xml")
var Manifest = require("./Manifest")
var app = require("express")()

module.exports = function( cb ){
  fs.readFile(MANIFEST_SRC, function( err, data ){
    parser.parseString(data, function( err, data ){
      cb(new Manifest(data.app))
    })
  })
}