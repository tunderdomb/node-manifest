## Preprocessors

Defined inside the app root.

```xml
<app>
  <preprocess>
    <less>
      <css root="style/" src="style/*.less" dest="static/css" watch="style/**/*.less"/>
    </less>
  </preprocess>
</app>
```

### General options

To provide arguments for the parser,
simply define them on the preprocessor root.

```xml
<preprocess>
  <less options1="some" option2="arguments">
    <css root="style/" src="style/*.less" dest="static/css" watch="style/**/*.less"/>
  </less>
</preprocess>
```

### Preprocessor target options

#### src

A globbing pattern. These files will be preprocessed.
If no watch options if defined, this pattern is also
the input for the file watcher that watches changes.
In any case, the files matched by this pattern will be the only ones preprocessed.

#### dest

A directory where the files will be written.
If no root option is defined, files will be relative
to the current working directory.

#### root

If defined, destination files will be mapped relative to this folder.

#### watch

If defined, these files will be watched instead of the src ones.
This option enables to watch subdirectories, but only render a subset
of those files.
For instance, if you don't want to render every less file to a css, only entry points,
but you want the preprocessing to be triggered if an imported less is changed too.

You can also define multiple watch targets like this:

```xml
<preprocess>
  <less>
    <css root="style/" src="style/*.less" dest="static/css">
      <watch pattern="static/**/*.less"/>
      <watch pattern="test/**/*.less"/>
    </css>
  </less>
</preprocess>
```

### less

Preprocess less files.

```xml
<preprocess>
  <less>
    <css root="style/" src="style/*.less" dest="static/css" watch="style/**/*.less"/>
  </less>
</preprocess>
```

### stylus

Preprocess less files.

```xml
<preprocess>
  <stylus>
    <css root="style/" src="style/*.styl" dest="static/css" watch="style/**/*.styl"/>
  </stylus>
</preprocess>
```

### browserify

Browserify scripts.

```xml
<preprocess>
  <browserify>
    <css root="script/" src="script/*.js" dest="script/bundles" watch="script/**/*.js"/>
  </browserify>
</preprocess>
```