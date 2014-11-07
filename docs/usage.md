Usage
=====

## From code

Running manifest from code looks like this:

```js
require("node-manifest")(function( app, manifest ){
  // ...
})
```

The callback is called right before setting up the server,
right after the entry point (if defined) is finished.
So if you want to change any value on the manifest object
before they take effect, this is the time.

Note that you can also do that in the entry point file,
but if you don't need async logic to run,
you can simply leverage this function instead.

## From command line

    manifest

This command will instantiate your server with the options from
your manifest file.

Note that running your server through the command line will ignore
you `app.js` or `index.js` or any other script not referenced
in the manifest.

## Differences

There are three key differences in the two approach.

  1. Running from the command line enables you to monitor server code
     and restart the server automatically if something changes.
     Running from code won't do this. There's no monitoring there.

  2. Running from code enables you to change any value before the server starts.

  3. Running from code enables you to simply deploy your application
     and have your manifest file set up your server.