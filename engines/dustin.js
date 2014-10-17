module.exports = function( app, manifest ){
  //  debugger
  var adapter = require("dustin")({
    cache: !manifest.env.development,
    whiteSpace: true,
//    helpers: "helpers/node/*.js",
    views: manifest.engine.views
  })
  return function( path, context, cb ){
    //    debugger
    return adapter.__express.apply(this, arguments)
  }
}