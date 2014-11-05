Request parsers
=======

These request parsers are defined on the app root,
meaning they will digest every request that comes in.

It is recommended to use them only where they are needed.
For this reason,
these libraries are exposed on the Manifest object - 
see the doc for more info.

Defined on the app root.

```xml
<request>
</request>
```

(global) request parsers are optional,
but accessible to further use.

## cookie

It's using the `cookie-parser` library.
Which depends on [`cookie`](https://www.npmjs.org/package/cookie)
Apart from the `secret` option, the rest is passed to `cookie` as is.

Enable with default options:

```xml
<request cookie="true">
</request>
```

Enable with custom options:

```xml
<request>
  <cookie secret=" a string used for signing cookies. This is optional and if not specified, will not parse signed cookies"
          option1="value1"/>
</request>
```

## json

It's using the `body-parser` library.

Enable with default options:

```xml
<request json="true">
</request>
```

Enable with custom options:

```xml
<request>
  <json option1="value1"
        option2="value2"/>
</request>
```

## urlencoded

It's using the `body-parser` library.

Enable with default options:

```xml
<request urlencoded="true">
</request>
```

Enable with custom options:

```xml
<request>
  <urlencoded option1="value1"
              option2="value2"/>
</request>
```

## multipart

It's using the `multer` library.

Enable with default options:

```xml
<request multipart="true">
</request>
```

Enable with custom options:

```xml
<request>
  <multipart option1="value1"
              option2="value2"/>
</request>
```