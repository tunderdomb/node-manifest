var nodemon = require("nodemon")
var path = require("path")
//var cwd = process.cwd()
//var async = require("async")
var argv = require('minimist')(process.argv.slice(2))

var args = argv._
delete argv._

require("../manifestFile")(function( manifest ){

  var watch = [
    "manifest.xml"
  ]
    .concat(manifest.monitor.watch)
    .map(function( p ){
      return path.resolve(p)
    })

  var nodemonSettings = {
    "script": path.join(__dirname, "../index.js"),
    "restartable": "rs",
    "ignore": [
      ".git",
      "node_modules",
      ".idea"
    ],
    "verbose": true,
    "execMap": {
      "js": "node"
    },
    "watch": watch,
    "env": argv,
    "ext": "js json",
    "nodeArgs": ["--debug"].concat(args)
  }
  var started = false
  nodemon(nodemonSettings).on("start",function (){
    if( !started ){
      console.log("App has started")
      started = true
    }
  }).on("quit",function (){
    console.log("App has quit")
  }).on("restart", function ( files ){
    console.log("App restarted due to: ", files)
  })
})