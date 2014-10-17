var asArray = require("../util/asArray")
var clone = require("../util/clone")
var merge = require("../util/merge")
var toCwd = require("../util/toCwd")

module.exports = function routes( xml ){
  var routes = asArray(xml.routes, "route")
  return routes.reduce(function( routes, route ){
    createRoute(xml, routes, route)
    return routes
  }, routes)
}

function createRoute( xml, routes, route ){
  if( route.error ){
    routes.errors = routes.errors || {}
    routes.errors[route.error] = route
  }
  else if( route.name ){
    routes[route.name] = route
  }

  if( route.handler ){
    try{
      route.handler = require(toCwd(route.handler))
    }
    catch( e ){
      throw new Error("Invalid handler for route '"+route.name+"'")
    }
  }
  createContext(xml, route)
}

function createContext( xml, route ){
  var globalContext = getGlobalContext(xml)
  var localContext
  var context = route.context

  if( !context ) {
    route.context = function( superLocal ){
      return clone(globalContext, superLocal)
    }
    return
  }

  if( Array.isArray(context) ){
    context = context[0]
  }
  context = context.replace(/^[\n\s\t]+|[\n\s\t]+$/g, "")
  if( /^({[\w\W]*}|\[[\w\W]*\])$/g.test(context) ){
    // JSON context
    try{
      localContext = JSON.parse(context)
    }
    catch( e ){
      throw new Error("Route '"+route.name+"' has malformed context")
    }
    route.context = function( superLocal ){
      return merge.apply(null, [globalContext, localContext].concat([].slice.call(arguments)))
    }
  }
  else{
    // script context
    context = toCwd(context)
    try{
      localContext = require(context)
    }
    catch( e ){
      throw new Error("Route '"+route.name+"' has invalid context '"+context+"'")
    }
    if( typeof localContext!="function" ){
      throw new Error("Route '"+route.name+"' has permanent context '"+context+"'")
    }
    route.context = function( superLocal ){
      return merge.apply(null, [globalContext, localContext()].concat([].slice.call(arguments)))
    }
  }
}

function getGlobalContext( xml ){
  if( !xml.context ) return {}
  try{
    return JSON.parse(xml.context)
  }
  catch( e ){
    console.log("Context Error", e)
    throw new Error("Malformed global context")
  }
}
