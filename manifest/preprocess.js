var asArray = require("../util/asArray")
var realValue = require("../util/realValue")

module.exports = function( xml ){
  if( !xml.preprocess ) return null
  var pre = {}
  pre.less = processRules(xml.preprocess, "less", "css", "../processors/less", "../processors/autoprefixer")
  pre.stylus = processRules(xml.preprocess, "stylus", "css", "../processors/stylus", "../processors/autoprefixer")
  pre.browserify = processRules(xml.preprocess, "browserify", "js", "../processors/browserify")
  return pre
}

function processRules( preprocessors, preprocessorName, targetsName, preprocessorModule, postProcessorModule ){
  var preprocessor = preprocessors[preprocessorName]
  if( !preprocessor ) return null
  var pairs = asArray(preprocessor, targetsName)
  delete preprocessor[targetsName]
  pairs.forEach(function( pair ){
    if( !pair.src ) throw new Error("Preprocessor rule is missing 'src' attribute")
    if( !pair.dest ) throw new Error("Preprocessor rule is missing 'dest' attribute")
  })
  return {
    render: require(preprocessorModule),
    postProcess: require(postProcessorModule),
    options: realValue.obj(preprocessor),
    css: pairs
  }
}