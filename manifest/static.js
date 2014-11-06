var realValue = require("../util/realValue")
var asArray = require("../util/asArray")

// when converting to json,
// subclassing Array helps keep named references
function StaticContents(  ){}
StaticContents.prototype = []

module.exports = function( xml ){
//  debugger
  var staticOptions = xml.static
  var contents = asArray(staticOptions, "content")
  delete staticOptions.content

  var staticContents = new StaticContents()

  contents.forEach(function( content ){
    var url = content.url
      , resourcePath = content.path

    if( !url ) throw  new Error("Static content: missing url")
    if( !resourcePath ) throw  new Error("Static content: missing resource path")

    if( content.name && !(content.name in staticContents) ) {
      staticContents[content.name] = content
    }

    content = realValue.obj(content)
    !function( cacheOptions ){
      for( var opt in cacheOptions ){
        cacheOptions[opt] = realValue.obj(cacheOptions[opt])
      }
    }( content.cache )
    //return content
    staticContents.push(content)
  })

  return staticContents
}