var realValue = require("../util/realValue")
module.exports = function( xml ){
  xml = xml || {}
  var request = {}
  request.cookie = parseOptions(xml.cookie, {})
  request.json = parseOptions(xml.json, {})
  request.urlencoded = parseOptions(xml.urlencoded, {extended: true})
  request.multipart = parseOptions(xml.multipart, {inMemory: true})
  return request
}

function parseOptions( options, defaults ){
  options = realValue(options)
  return options == true
    ? defaults
    : options != false && realValue.obj(options)
}