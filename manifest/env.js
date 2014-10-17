var realValue = require("../util/realValue")
var argv = require("minimist")(process.argv.splice(2))
module.exports = function( xml ){
  var run = xml.run || {}
  var env = {}
  env.development = process.NODE_ENV == "development"
    || argv.development
    || argv.dev
    || realValue(run.development)
  env.open = argv.open || realValue(run.open) || false
  env.port = run.port || {}
  env.port.start = realValue(env.port.start) || 8000
  return env
}