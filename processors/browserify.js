var fs = require("fs")
var path = require("path")

var browserify = require("browserify")

module.exports = function( file, options, cb ){
  try{
    var b = browserify(options)
    b.add(path.resolve(file))
    b.bundle(function( err, src ){
      src = src.toString()
      cb(err, src)
    })
  }
  catch( e ){
    cb(e)
  }
}