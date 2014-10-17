## Engines

Defined inside the app root

```xml
<app>
  <engines>
  </engines>
</app>
```

### Use an express compatible engine. Express will require jade for you here.

```xml
<engines>
  <set option="view engine" value="jade"/>
</engines>
```

### Use a custom engine adapter.

```xml
<engines>
  <engine name="dust" module="server/engine"/>
  <set option="view engine" value="dust"/>
</engines>
```

An adapter will be required and executed.
The module property should point to a project relative script.
It should export a function with two arguments and return an engine function:

```js
module.exports = function( app, manifest ){
  return function( path, context, cb ){
    require("fs").readFile(path, "utf8", cb)
  }
}
```

This is also the default engine that renders html file
if no engine and no `view engine` is defined.

If `view engine` is omitted it will use the first engine's name (dust here).

```xml
<engines>
  <engine name="dust" module="server/engine"/>
</engines>
```

### Built in engines

There are a few bult in engines to use.
They all have their name prefixed with `"builtin:"` and the module is omitted/substituted.

#### Dust engine

```xml
<engines>
  <engine name="builtin:dust"/>
</engines>
```

#### Html engine

```xml
<engines>
  <engine name="builtin:html"/>
</engines>
```

This is also the one that is used if engine information is omitted.
So the above is equivalent to this:

```xml
<engines>
  <set option="views" value="views/"/>
  <set option="view cache" value="false"/>
</engines>
```

### Other options

```xml
<engines>
  <set option="views" value="views/"/>
  <set option="view cache" value="false"/>
</engines>
```

### Multiple engines

To use multiple express compatible engines, for now, and for simplicity's sake
you need to create adapters for each of them.

```xml
<engines>
  <engine name="dust" module="server/engine/dust"/>
  <engine name="ejs" module="server/engine/ejs"/>
</engines>
```

in `./server/engine/dust.js`:

```js
module.exports = function( app, manifest ){
  return function( path, context, cb ){
    // dust adapter
  }
}
```

in `./server/engine/ejs.js`:

```js
module.exports = function( app, manifest ){
  return function( path, context, cb ){
    // ejs adapter adapter
  }
}
```
