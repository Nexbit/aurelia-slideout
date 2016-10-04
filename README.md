# aurelia-slideout
Provides a component to wrap the [slideout](https://github.com/mango/slideout) Javascript library.

## Introduction

This article covers the basic usage guidelines for `aurelia-slideout`.

To get started you'll need to install `aurelia-slideout` using `jspm install aurelia-slideout` or `npm install aurelia-slideout --save`. Afterwards, add `.plugin('aurelia-slideout')` to the configuration in your `main.js` to ensure the plugin is loaded at application startup.

If you're using the `aurelia-cli`, add the following configuration to your `aurelia.json` after you've installed the package with npm. 

```
    "slideout",
    "decouple",
    "emitter",
    {
      "name": "aurelia-slideout",
      "path": "../node_modules/aurelia-slideout/dist/amd",
      "main": "aurelia-slideout",
      "resources": [
        "style.css"
      ]
    }
```

If you're not sure where to put this, search your `aurelia.json` for *aurelia-templating-resources* and put it underneath.

*todo: Add more documentation here*
