var AUTO_RUN = process.env.AUTO_RUN
var app = require("express")()
module.exports = function( cb ){
  require("./manifestFile")(function( manifest ){
    app.set("manifest", manifest)
    if( manifest.env.entry ) {
      var timer = setTimeout(function(  ){
        throw new Error("Entry point timed out")
      }, manifest.env.entryTimeout)
      manifest.env.entry(app, manifest, function(  ){
        clearTimeout(timer)
        run(manifest, cb)
      })
    }
    else {
      run(manifest, cb)
    }
  })
}

function run( manifest, cb ){
  cb && cb(app, manifest)
  if( manifest.env.development ){
    require("./run/development")(app, manifest)
  }
  else {
    require("./run/production")(app, manifest)
  }
}

module.exports.app = app

if( AUTO_RUN ){
  module.exports()
}