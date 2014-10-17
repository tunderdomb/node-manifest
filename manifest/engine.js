var realValue = require("../util/realValue")
var toCwd = require("../util/toCwd")
var asArray = require("../util/asArray")

var path = require("path")

module.exports = function engine( xml ){
  var engines = asArray(xml.engines, "engine")
  engines.forEach(function( engine ){
//    debugger
    switch( engine.name ){
      case "builtin:html":
        engine.name = "html"
        engine.module = path.join(__dirname, "../engines/html")
        break
      case "builtin:dust":
        engine.name = "dust"
        engine.module = path.join(__dirname, "../engines/dustin")
        break
    }
    if( !engine.name ) throw new Error("Engine requires a name attribute")
    if( !engine.module ) throw new Error("Engine '"+engine.name+"' has no module defined")
    engine.module = toCwd(engine.module)
  })

  engines.set = asArray(xml.engines, "set")
  engines.set.forEach(function( setup ){
    setup.value = engines[setup.option] = realValue(setup.value)
    return setup
  })

//  debugger
  if( !engines["view engine"] ) {
    // set the default engine extension to use when omitted e.g. `res.render("index")`
    if( !engines.length ){
//      debugger
      // use a simple html engine that renders html files
      engines.push({
        name: "html",
        module: function defaultEngine( path, context, cb ){
          require("fs").readFile(path, "utf8", cb)
        }
      })
    }
    // use the first engine name as extension
    var defaultEngine = engines[0].name
    engines["view engine"] = defaultEngine
    engines.set.push({
      option: "view engine",
      value: defaultEngine
    })
  }

  return engines
}