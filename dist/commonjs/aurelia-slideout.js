"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Exports
/*
 * Add all your exported files here
 */
__export(require('./nx-slideout'));
var nx_slideout_2 = require('./nx-slideout');
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
