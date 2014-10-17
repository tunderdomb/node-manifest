var nodemon = require("nodemon")
var path = require("path")
//var cwd = process.cwd()
//var async = require("async")
var argv = require('minimist')(process.argv.slice(2))

//console.log("args", argv)

var args = argv._
delete argv._

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
  "watch": [
    "app/**/*.js",
    "manifest.xml"
  ],
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