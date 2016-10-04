var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, inlineView, bindable } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import * as Slideout from 'slideout';
// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
function extend(deep, target, ...objects) {
    // Variables
    const extended = target;
    const length = arguments.length;
    // Merge the object into the extended object
    const merge = function (obj) {
        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(/*deep*/ true, extended[prop], obj[prop]);
                }
                else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };
    // Loop through each object and conduct a merge
    for (let i = 0; i < length; i++) {
        const obj = objects[i];
        merge(obj);
    }
    return extended;
}
;
export let defaultSettings = {
    fx: 'ease',
    duration: 300,
    tolerance: 70,
    padding: 256,
    side: 'left',
    closeOnContentClick: true
};
export let NxSlideout = class NxSlideout {
    constructor(_element) {
        this._element = _element;
        this._clickAttached = false;
    }
    attached() {
        this.init();
    }
    detached() {
        this.destroy();
    }
    /**
     * Open the slideout.
     *
     * @memberOf NxSlideout
     */
    open() {
        if (this._slideout) {
            this._slideout.open();
        }
    }
    /**
     * Close the slideout.
     *
     * @memberOf NxSlideout
     */
    close() {
        if (this._slideout) {
            this._slideout.close();
        }
    }
    /**
     * Toggle the slideout: close it if opened, or open it if closed.
     *
     * @memberOf NxSlideout
     */
    toggle() {
        if (this._slideout) {
            this._slideout.toggle();
        }
    }
    init() {
        if (this._slideout) {
            return;
        }
        const bindableOptions = {
            fx: this.fx,
            duration: this.duration,
            tolerance: this.tolerance,
            padding: this.padding,
            side: this.side,
            closeOnContentClick: this.closeOnContentClick
        };
        this._options = extend(/*deep*/ false, {}, bindableOptions, defaultSettings);
        const libOptions = this._options;
        if (this.contentRef) {
            libOptions.panel = this.contentRef;
        }
        else {
            throw new Error('content-ref attribute is mandatory.');
        }
        libOptions.menu = this._element;
        this.attachEventHandlers();
        this._slideout = new Slideout(libOptions);
    }
    destroy() {
        if (this._slideout) {
            this.detachEventHandlers();
            this._slideout.destroy();
            this._slideout = undefined;
        }
    }
    attachEventHandlers() {
        if (this._options.closeOnContentClick) {
            this.contentRef.addEventListener('click', this.contentOnClick.bind(this));
            this._clickAttached = true;
        }
    }
    detachEventHandlers() {
        if (this._clickAttached) {
            this.contentRef.removeEventListener('click', this.contentOnClick);
        }
    }
    contentOnClick() {
        if (this._slideout === undefined) {
            return;
        }
        if (this._slideout.isOpen()) {
            this._slideout.close();
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "contentRef", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "fx", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "duration", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "tolerance", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "padding", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "side", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], NxSlideout.prototype, "closeOnContentClick", void 0);
NxSlideout = __decorate([
    customElement('nx-slideout'),
    inlineView(`
  <template>
    <require from="./style.css"></require>
    <slot></slot>
  </template>
`),
    inject(DOM.Element)
], NxSlideout);
