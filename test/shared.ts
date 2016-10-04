import { Aurelia } from 'aurelia-framework';
import { DOM } from 'aurelia-pal';

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        // .developmentLogging()
        .plugin('dist/test/src/aurelia-slideout')
        .feature('./dist/test/test/resources');
}

export function blur(element: Element): Promise<void> {
    element.dispatchEvent(DOM.createCustomEvent('blur', {}));
    return new Promise<void>(setTimeout);
}

export function change(element: HTMLInputElement, value: string): Promise<void> {
    element.value = value;
    element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    return new Promise<void>(setTimeout);
}
