var reserve = require("portreserver")
var spawn = require("child_process").spawn
var browserSync = require("browser-sync")
var gaze = require('gaze')
var fs = require("fs")
var path = require("path")
var writeFile = require("../util/writeFile")
var glob = require("glob")

module.exports = function( app, manifest ){
  reserve(manifest.env.port.start, 2, function( serverPort, livereloadPort ){
    app.set("manifest", manifest)
    setupLiveReload(manifest, serverPort, livereloadPort)
    setupPreprocessors(manifest)
    setupServer(app, manifest, serverPort)
  })
}

function setupServer( app, manifest, serverPort ){
  require("../server")(app, manifest)
  app.listen(serverPort, function(){
    console.log("app listening on %s", serverPort)
    if( manifest.env.open ){
      require("open")("http://" + reserve.IP + ":" + serverPort)
    }
  })
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
    cratePreprocessorWatcher(less.css, function( filepath, destWriter ){
      less.render(filepath, less.options, destWriter)
    })
//    less.css.forEach(function( css ){
//      gaze(css.src, function( err, watcher ){
//        if( err ){
//          console.log("File watching failed for preprocessing", err)
//          return
//        }
//        watcher.on('changed', function( filepath ){
//          less.render(filepath, less.options, createDest(filepath, css.dest, css.root))
//        })
//      })
//    })
  }
}

function cratePreprocessorWatcher( pairs, preprocess ){
  pairs.forEach(function( options ){
    var render
    gaze(options.watch||options.src, function( err, watcher ){
      if( err ){
        console.log("File watching failed for preprocessing", err)
        return
      }
      watcher.on('changed', function( filepath ){
        if( options.watch ){
          glob(options.src, function( err, files ){
            if( err ){
              console.log("Error collecting preprocessables ", err)
              return
            }
            files.forEach(function( filepath ){
              preprocess(filepath, createDest(filepath, options.dest, options.root))
            })
          })
        }
        else {
          preprocess(filepath, createDest(filepath, options.dest, options.root))
        }
      })
    })
  })
}

function createDest( src, dest, root ){
  return function( err, contents ){
    if( err ) {
      console.log("Error during preprocessing '"+src+"'", err)
      return
    }
    root = root || ""
    var file = src.replace(path.join(process.cwd(), root), "")
    file = path.basename(file, path.extname(file))+".css"
    dest = path.join(dest, file)
    writeFile(dest, contents, function( err ){
      if( err ) {
        console.log("Error during preprocessing '"+src+"'", err)
      }
    })
  }
}