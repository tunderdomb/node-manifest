module.exports = function( app, manifest ){
  require("./favicon")(app, manifest)
  require("./request")(app, manifest)
}
