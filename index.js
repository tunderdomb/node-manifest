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

fs.readFile(MANIFEST_SRC, function( err, data ){
  parser.parseString(data, function( err, data ){
    run(new Manifest(data.app))
  })
})

function run( manifest ){
  if( manifest.env.development ){
    require("./run/development")(app, manifest)
  }
  else {
    require("./run/production")(app, manifest)
  }
}