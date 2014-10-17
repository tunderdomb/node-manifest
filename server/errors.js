module.exports = function( app, manifest ){

  app.use(function( req, res, next ){
    var e = new Error()
    e.status = 404
    next(e)
  })

  app.use(function( err, req, res, next ){
    //    app.get("log").error({err: err.original})
    console.log("Error '"+req.originalUrl+"'", err)
    switch( req.headers.accept ){
      case "application/json":
        res.send(err)
        break
      default:
        var errorPage = manifest.routes.errors && manifest.routes.errors[err.status]
        if( !errorPage || !errorPage.template ){
          return res.status(500).end()
        }
        res.render(errorPage.template, err)
    }
  })
}