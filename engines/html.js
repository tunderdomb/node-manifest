/**
 * This engine simply renders files from the file system
 * no caching, nothing, just a simple file renderer.
 * It is used as the default engine to render html files.
 * */
module.exports = function( app, manifest ){
  return function defaultEngine( path, context, cb ){
    require("fs").readFile(path, "utf8", function( err, content ){
      if( err ) return cb(err)
      cb(null, content.toString())
    })
  }
}