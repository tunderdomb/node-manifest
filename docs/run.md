## run

Defined in the app root.

```xml
<run development="true" open="false">
  <port start="8000"/>
</run>
```

### development

Runs the app in development mode.

The value is determined by the `NODE_ENV` environment variable:

```js
development = process.NODE_ENV == "development"
```

or the `--development` argument.

### open

Opens the server in the default browser.

### port

```xml
<run>
  <port start="8000"/>
</run>
```

### port.start

When assigning ports for the development server start with this one.

### entry

The entry is a reference to a script that will run
before any server logic defined in the manifest file
is applied. It uses a callback to enable setting up
async logic for the app - i.e. database connection.

```xml
<run>
  <entry file="app/server" timeout="5000"/>
</run>
```

### entry.file

Run this scrip before anything happens.
The module should export a function with these arguments,
and call the given callback when finished.

```js
module.exports = function( app, manifest, cb ){
  cb()
}
```
### entry.timeout

A number to wait for the entry point to finish.
If the timer runs out before the callback is called,
an error is thrown.
The default is 5s.
