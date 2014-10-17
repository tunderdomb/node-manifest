var extend = require("./extend")
module.exports = function clone( obj ){
  return extend({}, obj)
}