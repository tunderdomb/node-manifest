var DEBUG = process.env.NODE_ENV == "development"

module.exports = function( app, manifest ){
  //  debugger
  var adapter = require("dustin")({
    cache: !DEBUG,
    whiteSpace: false,
    helpers: "helpers/node/*.js",
    views: manifest.engine.views
  })
  return function( path, context, cb ){
    //    debugger
    return adapter.__express.apply(this, arguments)
  }
}