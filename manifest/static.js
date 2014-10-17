var realValue = require("../util/realValue")
var asArray = require("../util/asArray")

module.exports = function( xml ){
//  debugger
  var staticOptions = xml.static
  var contents = asArray(staticOptions, "content")
  delete staticOptions.content

  return contents.map(function( content ){
    var url = content.url
      , resourcePath = content.path

    if( !url ) throw  new Error("Static content: missing url")
    if( !resourcePath ) throw  new Error("Static content: missing resource path")

    content = realValue.obj(content)
    !function( cacheOptions ){
      for( var opt in cacheOptions ){
        cacheOptions[opt] = realValue.obj(cacheOptions[opt])
      }
    }( content.cache )
    return content
  })
}