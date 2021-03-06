var reserve = require("portreserver")
var browserSync = require("browser-sync")
var gaze = require('gaze')
var path = require("path")
var writeFile = require("../util/writeFile")
var glob = require("glob")
var async = require("async")

module.exports = function( app, manifest ){
  reserve(manifest.env.port.start, 2, function( serverPort, livereloadPort ){
    setupLiveReload(manifest, serverPort, livereloadPort)
    setupPreprocessors(manifest)
    setupServer(app, manifest, serverPort)
  })
}

function setupServer( app, manifest, serverPort ){
  require("../server")(app, manifest)
  if( manifest.env.listen ) {
    app.listen(serverPort, function(){
      console.log("app listening on %s", serverPort)
      if( manifest.env.open ){
        require("open")("http://" + reserve.IP + ":" + serverPort)
      }
    })
  }
}

function livereloadScriptPath( livereloadPort ){
  var browserSyncVersion = require("browser-sync/package.json").version
  return "//" + reserve.IP + ":" + livereloadPort + "/browser-sync/browser-sync-client." + browserSyncVersion + ".js"
}

function setupLiveReload( manifest, serverPort, livereloadPort ){
  if( !manifest.livereload ) return
  manifest.livereload.port = livereloadPort
  manifest.livereload.script = livereloadScriptPath(livereloadPort)
  browserSync({
    notify: false,
    port: livereloadPort,
    proxy: {
      host: reserve.IP,
      port: serverPort
    }
  })
  gaze(manifest.livereload.watch, function( err, watcher ){
    if( err ){
      console.log("File watching failed during livreload init", err)
      return
    }
    watcher.on('changed', function( filepath ){
      browserSync.reload(filepath)
    })
  })
}

function setupPreprocessors( manifest ){
//  debugger
  if( !manifest.preprocess ) return
  var less = manifest.preprocess.less
  if( less ){
    cratePreprocessorWatcher(less.pairs, function( filepath, destWriter ){
      less.render(filepath, less.options, destWriter)
    }, function( content ){
      return less.postProcess(content, less.options.browsers)
    })
  }
  var stylus = manifest.preprocess.stylus
  if( stylus ){
    cratePreprocessorWatcher(stylus.pairs, function( filepath, destWriter ){
      stylus.render(filepath, stylus.options, destWriter)
    }, function( content ){
      return stylus.postProcess(content, stylus.options.browsers)
    })
  }
  var browserify = manifest.preprocess.browserify
  if( browserify ){
    cratePreprocessorWatcher(browserify.pairs, function( filepath, destWriter ){
      browserify.render(filepath, browserify.options, destWriter)
    })
  }
}

function cratePreprocessorWatcher( pairs, preProcess, postProcess ){
  pairs.forEach(function( options ){
    gaze(options.watch||options.src, function( err, watcher ){
      if( err ){
        console.log("File watching failed for preprocessing", err)
        return
      }
      watcher.on('added', function( filepath ){
        console.log("added", filepath)
        watcher.add(filepath)
      })
      var rendering = false
      watcher.on('changed', function( filepath ){
        //console.log("changed", filepath)
        // TODO: trigger rendering only if file hasn't changed (stat cache)
        function render( filepath, done ){
          console.log("preprocess", filepath)
          var write = createDest(filepath, options.dest, options.ext, options.root, done)
          preProcess(filepath, function destWriter( err, contents ){
            if( err ) {
              console.log("Error during preprocessing '"+filepath+"'", err)
              // that didn't go well, but at least call back so rendering won't halt
              return done()
            }
            if( postProcess ){
              try{
                contents = postProcess(contents)
              }
              catch( e ){
                // post processing is sync so don't let it make the rendering queue stuck
                console.log("Error during post processing '"+filepath+"'", e)
                return done()
              }
            }
            write(err, contents)
          })
        }
        if( options.watch ){
          // when multiple files would trigger rendering
          // this prevents the glob to run more than once
          if( rendering ) {
            //console.log("preprocessor is busy")
            return
          }
          rendering = true
          glob(options.src, function( err, files ){
            if( err ) {
              return console.log("Error collecting preprocessables ", err)
            }
            async.each(files, render, function(  ){
              // re-allow rendering when everything is finished
              rendering = false
            })
          })
        }
        else {
          render(filepath)
        }
      })
    })
  })
}

function createDest( src, dest, ext, root, cb ){
  return function( err, contents ){
    if( err ) {
      console.log("Error during preprocessing '"+src+"'", err)
      cb && cb()
      return
    }
    root = root || ""
    var file = src.replace(path.join(process.cwd(), root), "")
    file = path.basename(file, path.extname(file))+"."+ext.replace(/^\./, "")
    dest = path.join(dest, file)
    writeFile(dest, contents, function( err ){
      if( err ) {
        console.log("Error during preprocessing '"+src+"'", err)
      }
      cb && cb()
    })
  }
}