export * from './nx-slideout';
import { SlideoutOptions } from './nx-slideout';
/**
 * Configures the plugin.
 */
export declare function configure(frameworkConfig: {
    globalResources: (...resources: string[]) => any;
}, callback?: (config: SlideoutOptions) => void): void;
