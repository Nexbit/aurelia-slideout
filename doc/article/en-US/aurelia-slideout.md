---
{
  "name": "aurelia-slideout",
  "culture": "en-US",
  "description": "Provides a component to wrap the slideout Javascript library.",
  "engines" : { "aurelia-doc" : "^1.0.0" },
  "author": {
    "name": "Paolo Furini",
  	"url": "https://github.com/nexbit/aurelia-slideout"
  },
  "contributors": [],
  "translators": [],
  "keywords": ["Plugin", "Component", "Slideout"]
}
---

## [Introduction](aurelia-doc://section/1/version/1.0.0)

This article covers the basic usage guidelines for `aurelia-slideout`.

To get started you'll need to install `aurelia-slideout` using `jspm install aurelia-slideout` or `npm install aurelia-slideout --save`. Afterwards, add `.plugin('aurelia-slideout')` to the configuration in your `main.js` to ensure the plugin is loaded at application startup.

If you're using the `aurelia-cli`, add the following configuration to your `aurelia.json` after you've installed the package with npm. 

<code-listing heading="aurelia.json">
  <source-code lang="ES 2015">
    {
      "name": "aurelia-slideout",
      "path": "../node_modules/aurelia-slideout/dist/amd",
      "main": "aurelia-slideout",
      "resources": [
        "style.css"
      ]
    }
  </source-code>
</code-listing>

If you're not sure where to put this, search your `aurelia.json` for *aurelia-templating-resources* and put it underneath.

*todo: Add more documentation here*
