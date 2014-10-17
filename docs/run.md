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

### open

Opens the server in the default browser.

### port.start

When assigning ports for the development server start with this one.