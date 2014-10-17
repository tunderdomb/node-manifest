var toCwd = require("../util/toCwd")

//function defaultEngine( path, context, cb ){
//  require("fs").readFile(path, "utf8", cb)
//}

module.exports = function( app, manifest ){
  var engines = manifest.engine
//  debugger
//  if( !engines.length && manifest.routes.length ){
////    throw new Error("An engine is required for page rendering")
//    console.log("Using default engine 'html'")
//    app.engine("html", defaultEngine)
//  }
  engines.forEach(function( engine ){
    var module = engine.module
    if( typeof module == "string" ) {
//      debugger
      try{
        module = require(module)(app, manifest)
      }
      catch( e ){
        throw new Error("Invalid engine module '"+engines.module+"'")
      }
    }
    if( typeof module != "function" ){
      throw new Error("Invalid engine module '"+engines.module+"'. Engine must be a function")
    }
    app.engine(engine.name, module)
  })
  engines.set.forEach(function( setting ){
    app.set(setting.option, setting.value)
  })
}