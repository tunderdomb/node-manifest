var asArray = require("../util/asArray")

module.exports = function( xml ){
  if( !xml.preprocess ) return null
  var pre = {}
  pre.less = processRules(xml.preprocess, "less", "css", "../processors/less")
  pre.browserify = processRules(xml.preprocess, "browserify", "js", "../processors/browserify")
  return pre
}

function processRules( preprocessors, preprocessorName, targetsName, preprocessorModule ){
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
    options: preprocessor,
    css: pairs
  }
}