var path = require("path")

module.exports = function( app, manifest ){
  var request = manifest.request
  if( request.cookie ) app.use(manifest.cookieParser(request.cookie ? request.cookie.secret : null, request.cookie))
  if( request.json ) app.use(manifest.bodyParser.json(request.json))
  if( request.urlencoded ) app.use(manifest.bodyParser.urlencoded(request.urlencoded))
  if( request.multipart ) app.use(manifest.multer(request.multipart))
}
