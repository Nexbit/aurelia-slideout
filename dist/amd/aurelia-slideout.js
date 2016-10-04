define(["require", "exports", './nx-slideout', './nx-slideout'], function (require, exports, nx_slideout_1, nx_slideout_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    // Exports
    /*
     * Add all your exported files here
     */
    __export(nx_slideout_1);
    /**
     * Configures the plugin.
     */
    function configure(frameworkConfig, callback) {
        // configure...
        if (callback instanceof Function) {
            callback(nx_slideout_2.defaultSettings);
        }
        // add global resources...
        frameworkConfig.globalResources('./nx-slideout');
    }
    exports.configure = configure;
});
