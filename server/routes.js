module.exports = function( app, manifest ){
  //  debugger
  manifest.routes.forEach(function( route ){
    // deal with error pages later
    if( route.error ) return

    var method = route.method || "get"
    var handler = route.handler
    var template = route.template

    function render( req, res, context ){
      res.render(template, route.context({
        params: req.params||{},
        query: req.query||{},
        cookies: req.cookies||{}
      }, context))
    }

    if( handler ){
      handler = handler(app, manifest, route)
      if( route.url && typeof handler == "function" ){
        // url is present and the handler returned a middleware
        app[method](route.url, function( req, res, next ){
          handler(req, res, next, function( err, context ){
            if( err ) return next(err)
            if( template ){
              // the handler doesn't necessarily need to pass the control back here
              // it can do anything any middleware wants
              // but if it calls the callback (with an optional context that is merged with the default)
              // a template is needed to be rendered
              render(req, res, context)
            }
            else{
              throw new Error("Handler passed rendering but there's no default template.")
            }
          })
        })
      }
    }
    else if( template ){
      // a default route that simply renders the template with the defined context
      app[method](route.url, render)
    }
    else{
      throw new Error("Route '"+route.name+"' has no function")
    }
  })
}