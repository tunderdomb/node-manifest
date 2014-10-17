module.exports = function toCwd( path, explicit ){
  return /^\.?\/?/.test(path) && !/^(\/|\w:[\\\/])/.test(path)
    ? (process.cwd()+"/"+path.replace(/^\.?\/?/, "")).replace(/\\+/g, "/")
    : path
}