module.exports = function ( app, manifest ){
  if( !manifest.env.development ) return

  var inject = require("connect-inject")
  var snippet = ""

  if ( manifest.env.WEINRE ) {
    /* inject weinre script to pages */
    snippet += '<script async src="' + manifest.env.WEINRE + '"></script>'
  }
  if ( manifest.livereload ) {
    /* inject browser-sync script to pages */
    snippet += '<script async src="' + manifest.livereload.script + '"></script>'
  }
  if ( snippet ) {
    app.use(inject({snippet: snippet}))
  }
}
