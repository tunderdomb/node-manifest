var autoprefixer = require('autoprefixer-core')
module.exports = function( contents, browsers ){
  if( typeof browsers == "string" ){
    browsers = browsers.split(/,\s*/)
  }
  var processor = autoprefixer({browsers: browsers||[], cascade: false})
  var prefixed = processor.process(contents)
  return prefixed.css
}