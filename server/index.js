module.exports = function( app, manifest ){
  require("./engine")(app, manifest)
  require("./extensions")(app, manifest)
  require("./inject")(app, manifest)
  require("./routes")(app, manifest)
  require("./static")(app, manifest)
  require("./errors")(app, manifest)
}