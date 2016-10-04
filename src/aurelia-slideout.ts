// Exports
/*
 * Add all your exported files here
 */
export * from './nx-slideout';

import { defaultSettings, SlideoutOptions } from './nx-slideout';

/**
 * Configures the plugin.
 */
export function configure(
  frameworkConfig: { globalResources: (...resources: string[]) => any },
  callback?: (config: SlideoutOptions) => void
) {
  // configure...
  if (callback instanceof Function) {
    callback(defaultSettings);
  }

  // add global resources...
  frameworkConfig.globalResources('./nx-slideout');
}
