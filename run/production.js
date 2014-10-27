module.exports = function( app, manifest ){
  if( process.env.PORT ){
    setupServer(app, manifest, process.env.PORT)
  }
  else{
    require("portreserver")(manifest.env.port.start, function( serverPort ){
      setupServer(app, manifest, serverPort)
    })
  }
}

function setupServer( app, manifest, serverPort ){
  require("../server")(app, manifest)
  if( manifest.env.listen ) {
    app.listen(serverPort, function(){
      console.log("app listening on %s", serverPort)
    })
  }
}