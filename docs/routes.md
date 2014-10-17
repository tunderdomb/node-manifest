## Routes

Defined inside the app root

```xml
<app>
  <routes>
  </routes>
</app>
```

### Default settings simply render a template

```xml
<routes>
  <route url="/" template="pages/index" />
</routes>
```

### Defining a script for context

```xml
<routes>
  <route url="/"
         template="pages/index"
         context="views/pages/index/context"/>
</routes>
```

It should be a project relative script that will be required.
The script should export a function that will be called each time a page renders,
and may return any data that will be merged with the global context.

### Define a static json context

```xml
<routes>
  <route url="/"
         template="pages/index"
         context="views/pages/index/context">
    <context>
      {
        "hey": "ho"
      }
    </context>
  </route>
</routes>
```

**Note:** the script context takes precedence and the json data here will be ignored.
This json literal will be merged to the rendering context each time the page renderes.

### Context merging

Rendering contexts are always generated fresh to avoid
value persistence across requests. You don't want to render a user the previous one's data.

If the context is a static json literal,
it means the json object is shallow copied each time a page renders.

If the context is a required function that returns something,
that function is called each time
and the return value is used for creating the rendering context.

The precedence is what you expect:

- global context is the base
- route context overwrites
- request context overwrites

#### Global context

is what you define in

```xml
<app>
  <context>
  </context>
</app>
```

#### route context

is what you define on each route and is specific to that route only.

#### request context

firstly is the following fields with the same names:

```js
req.params
req.query
req.cookies
```

and what you pass back from a handler (discussed below).

### Define a request handler

```xml
<routes>
  <route url="/"
         template="pages/index"
         context="views/pages/index/context"
         handler="server/route/index">
  </route>
</routes>
```

The handler will be required and should export a function that returns another function itself.
The exported function will be called with the express app instance, the manifest data,
and the infividual page data from the manifest that belongs to this route.

The returned function will be called when the page renderes,
and is passed all the arguments any other middleware receives, plus a callback function.

You may call the callback to return control to the bootstrap,
and pass an error (that will just call `next(err)` and return),
or an optional additional context object that will be merged with the default.

If there's no template defined on this route,
this operation can't conclude so an error is thrown.

```js
module.exports = function( app, manifest, page ){
  return function( req, res, next, done ){
    done(null, {})
  }
}
```

### Error routes

```xml
<routes>
  <route error="404" template="errors/404"/>
</routes>
```

Error routes are treated differently on more ways.
You define an error number that represents the status code of the error it renders.
Furthermore error routes are assigned after every other route and static middleware.
