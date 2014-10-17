var less = require("less")
var fs = require("fs")
var path = require("path")

module.exports = function( file, options, cb ){
  fs.readFile(file, "utf-8", function( err, contents ){
    if( err ) return cb(err)
    new less.Parser({
      paths: [
        process.cwd(),
        // adding the file dir to the include paths
        // so relative imports will work
        path.dirname(file)
      ]
    }).parse(contents, function( err, tree ){
        if( err ) return cb(err)
        var css = null
        try{
          css = tree.toCSS(options)
        }
        catch( e ){
          return cb(e)
        }
        cb(null, css)
      })
  })
}