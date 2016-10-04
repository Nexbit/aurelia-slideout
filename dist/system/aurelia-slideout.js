System.register(['./nx-slideout'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var nx_slideout_1;
    /**
     * Configures the plugin.
     */
    function configure(frameworkConfig, callback) {
        // configure...
        if (callback instanceof Function) {
            callback(nx_slideout_1.defaultSettings);
        }
        // add global resources...
        frameworkConfig.globalResources('./nx-slideout');
    }
    exports_1("configure", configure);
    var exportedNames_1 = {
        'configure': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (nx_slideout_2_1) {
                exportStar_1(nx_slideout_2_1);
                nx_slideout_1 = nx_slideout_2_1;
            }],
        execute: function() {
        }
    }
});
