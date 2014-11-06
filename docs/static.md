

## Static content

Defined inside the app root.

```xml
<app>
  <static>
  </static>
</app>
```

Static content mappings.
These will define routes according to their url and path.
Internally `st` is used, so the options map 1:1.

### Available options

You can defined default options on the `<static>` tag itself,
and overwrite defaults on each individual `<content>` tag too.

#### name

A name for this resource,
you can use it to reference the static descriptor in templates
or other places.

```xml
<content name="something" url="/asd" path="asd" cache="false" />
```

```js
manifest.static.something
manifest.static.something.name
manifest.static.something.path
manifest.static.something.url
...
```

#### index
#### gzip

`true` compresses the response with gzip compression

`false` does not compress the response, even if client accepts gzip

#### path

resolved against the process cwd

#### url

The url this route is being served on

#### cache

```xml
<content url="/asd" path="asd">
  <cache>
    <content max="10" maxAge="222" cacheControl="public, max-age=600"/>
    <fd max="10" maxAge="222"/>
    <stat max="10" maxAge="222"/>
    <index max="10" maxAge="222"/>
    <readdir max="10" maxAge="222"/>
  </cache>
</content>
```

To set caching to false:

```xml
<content url="/asd" path="asd" cache="false" />
```

### Content specific options

#### type

You can define a download provider by setting this to `"download"`.
Files will be served as downloads from this directory on this url.

### Example

```xml
<static index="false" gzip="false">
  <content url="/css/"
           path="public/css"
           index="false"
           gzip="true"/>
  <content url="/font/"
           path="public/font"/>
  <content url="/img/" path="public/image"/>
  <content url="/js/" path="public/js"/>
  <content url="/sprite/" path="public/sprite"/>
  <content url="/templates/" path="public/templates"/>
  <content url="/" path="bower_components"/>
  <content url="/download" path="static/download" type="download"/>
</static>
```
