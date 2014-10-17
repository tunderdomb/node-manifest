var loopMap = require("./loopMap")

module.exports = realValue

function realValue( value ){
  switch( true ){
    case value=="true":
      return true
    case value=="false":
      return false
    case /^-?(\d*[\.,])?\d+?$/.test(value):
      return parseFloat(value)
    default:
      return value
  }
}

realValue.obj = function( obj ){
  return loopMap(obj, realValue)
}