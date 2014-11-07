var realValue = require("../util/realValue")
var argv = require("minimist")(process.argv.splice(2))
var path = require("path")
module.exports = function( xml ){
  var run = xml.run || {}
  var env = {}
  env.development = process.env.NODE_ENV == "production"
    ? false
    : process.env.NODE_ENV == "development"
    || argv.development
    || realValue(run.development)
  env.open = argv.open || realValue(run.open) || false
  env.listen = run.listen == undefined || realValue(run.open) == true
  env.port = run.port || {}
  env.port.start = realValue(env.port.start) || 8000
  var entry = run.entry || {}
  env.entryTimeout = realValue(entry.timeout) || 5000
  if( run.entry ){
    try{
      env.entry = require(path.resolve(entry.file))
    }
    catch( e ){
      console.error("Invalid entry point", run.entry)
      throw e
    }
  }
  return env
}