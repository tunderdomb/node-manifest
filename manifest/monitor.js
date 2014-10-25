var asArray = require("../util/asArray")
module.exports = function( xml ){
  var monitor = {}
  monitor.watch = asArray(xml.monitor, "watch").map(function( watch ){
    if( !watch.pattern ) throw new Error("Watch condition is missing pattern")
    return watch.pattern
  })
  monitor.env = xml.env || {}
  return monitor
}