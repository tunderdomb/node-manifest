var app = require("express")()

module.exports.app = app
require("./manifestFile")(function( manifest ){
  app.set("manifest", manifest)
  if( manifest.env.development ){
    require("./run/development")(app, manifest)
  }
  else {
    require("./run/production")(app, manifest)
  }
})