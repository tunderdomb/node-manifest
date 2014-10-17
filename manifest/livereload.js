var asArray = require("../util/asArray")
module.exports = function( xml ){
  if( !xml.livereload ) return null
  var lr = {}
  var patterns = asArray(xml.livereload, "watch")
  if( !patterns.length ) return null
  lr.watch = patterns.map(function( watch ){
    if( !watch.pattern ) throw new Error("Watch condition is missing pattern")
    return watch.pattern
  })
  return lr
}