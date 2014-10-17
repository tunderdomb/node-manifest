var fs = require("fs")
var path = require("path")
var mkdirp = require("mkdirp")

module.exports = function( dest, contents, cb ){
  mkdirp(path.dirname(dest), function (err) {
    if( err ) return cb(err)
    fs.writeFile(dest, contents, cb)
  })
}