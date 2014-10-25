var app = require("express")()

require("./manifestFile")(function( manifest ){
  run(manifest)
})

function run( manifest ){
  if( manifest.env.development ){
    require("./run/development")(app, manifest)
  }
  else {
    require("./run/production")(app, manifest)
  }
}