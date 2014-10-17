module.exports = function( obj, fn ){
  for( var prop in obj ){
    if( obj.hasOwnProperty(prop) ) obj[prop] = fn(obj[prop], prop, obj)
  }
  return obj
}