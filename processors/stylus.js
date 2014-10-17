var stylus = require("stylus")
var fs = require("fs")
var path = require("path")

module.exports = function( file, options, cb ){
  fs.readFile(file, "utf-8", function( err, contents ){
    if( err ) return cb(err)
    file = path.resolve(process.cwd(), file)
    var renderer = stylus(contents)
    for( var prop in options ){
      if( options.hasOwnProperty(prop) ) {
        renderer.set(prop, options[prop])
      }
    }
    renderer
      .set('filename', file)
      .set('paths', [
        process.cwd(),
        // adding the file dir to the include paths
        // so relative imports will work
        path.dirname(file)
      ])
      .render(function( err, css ){
        if( err ) return cb(err)
        cb(null, css)
      })
  })
}