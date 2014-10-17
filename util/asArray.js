module.exports = function asArray( obj, field ){
  if( !obj || !obj[field] ) return []
  if( Array.isArray(obj[field]) ) return obj[field]
  return [obj[field]]
}