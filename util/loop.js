module.exports = function( obj, fn ){
  for( var prop in obj ){
    if( obj.hasOwnProperty(prop) ) fn(obj[prop], prop, obj)
  }
  return obj
}