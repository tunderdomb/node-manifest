var extend = require("./extend")
module.exports = function(  ){
  return Array.prototype.slice.call(arguments).reduce(function( ret, obj ){
    return extend(ret, obj)
  }, {})
}