var AUTO_RUN = process.env.AUTO_RUN
var app = require("express")()

module.exports = function( cb ){
  require("./manifestFile")(function( manifest ){
    app.set("manifest", manifest)
    cb && cb(app, manifest)
    if( manifest.env.development ){
      require("./run/development")(app, manifest)
    }
    else {
      require("./run/production")(app, manifest)
    }
  })
}

module.exports.app = app

if( AUTO_RUN ){
  module.exports()
}