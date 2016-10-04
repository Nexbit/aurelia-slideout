// Exports
/*
 * Add all your exported files here
 */
export * from './nx-slideout';
import { defaultSettings } from './nx-slideout';
/**
 * Configures the plugin.
 */
export function configure(frameworkConfig, callback) {
    // configure...
    if (callback instanceof Function) {
        callback(defaultSettings);
    }
    // add global resources...
    frameworkConfig.globalResources('./nx-slideout');
}
