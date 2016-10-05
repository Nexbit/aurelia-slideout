"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_templating_1 = require('aurelia-templating');
var aurelia_binding_1 = require('aurelia-binding');
var aurelia_dependency_injection_1 = require('aurelia-dependency-injection');
var aurelia_pal_1 = require('aurelia-pal');
var Slideout = require('slideout');
// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
function extend(deep, target) {
    var objects = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        objects[_i - 2] = arguments[_i];
    }
    // Variables
    var extended = target;
    var length = arguments.length;
    // Merge the object into the extended object
    var merge = function (obj) {
        for (var prop in obj) {
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
    for (var i = 0; i < length; i++) {
        var obj = objects[i];
        merge(obj);
    }
    return extended;
}
;
exports.defaultSettings = {
    fx: 'ease',
    duration: 300,
    tolerance: 70,
    padding: 256,
    side: 'left',
    closeOnContentClick: true
};
var NxSlideout = (function () {
    function NxSlideout(_element) {
        this._element = _element;
        this._clickAttached = false;
        this.opened = false;
    }
    NxSlideout.prototype.openedChanged = function (newValue, oldValue) {
        if (newValue !== oldValue && this._slideout) {
            if (newValue && !this._slideout.isOpen()) {
                this.open();
            }
            else if (!newValue && this._slideout.isOpen()) {
                this.close();
            }
        }
    };
    NxSlideout.prototype.attached = function () {
        this.init();
    };
    NxSlideout.prototype.detached = function () {
        this.destroy();
    };
    /**
     * Open the slideout.
     *
     * @memberOf NxSlideout
     */
    NxSlideout.prototype.open = function () {
        if (this._slideout) {
            this._slideout.open();
            this.opened = this._slideout.isOpen();
        }
    };
    /**
     * Close the slideout.
     *
     * @memberOf NxSlideout
     */
    NxSlideout.prototype.close = function () {
        if (this._slideout) {
            this._slideout.close();
            this.opened = this._slideout.isOpen();
        }
    };
    /**
     * Toggle the slideout: close it if opened, or open it if closed.
     *
     * @memberOf NxSlideout
     */
    NxSlideout.prototype.toggle = function () {
        if (this._slideout) {
            this._slideout.toggle();
            this.opened = this._slideout.isOpen();
        }
    };
    NxSlideout.prototype.init = function () {
        if (this._slideout) {
            return;
        }
        var bindableOptions = {
            fx: this.fx,
            duration: this.duration,
            tolerance: this.tolerance,
            padding: this.padding,
            side: this.side,
            closeOnContentClick: this.closeOnContentClick
        };
        this._options = extend(/*deep*/ false, {}, bindableOptions, exports.defaultSettings);
        var libOptions = this._options;
        if (this.contentRef) {
            libOptions.panel = this.contentRef;
        }
        else {
            throw new Error('content-ref attribute is mandatory.');
        }
        libOptions.menu = this._element;
        this.attachEventHandlers();
        this._slideout = new Slideout(libOptions);
        if (this.opened) {
            this.open();
        }
    };
    NxSlideout.prototype.destroy = function () {
        if (this._slideout) {
            this.detachEventHandlers();
            this._slideout.destroy();
            this._slideout = undefined;
        }
    };
    NxSlideout.prototype.attachEventHandlers = function () {
        if (this._options.closeOnContentClick) {
            this.contentRef.addEventListener('click', this.contentOnClick.bind(this));
            this._clickAttached = true;
        }
    };
    NxSlideout.prototype.detachEventHandlers = function () {
        if (this._clickAttached) {
            this.contentRef.removeEventListener('click', this.contentOnClick);
        }
    };
    NxSlideout.prototype.contentOnClick = function () {
        if (this._slideout === undefined) {
            return;
        }
        if (this._slideout.isOpen()) {
            this._slideout.close();
        }
    };
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
    ], NxSlideout.prototype, "contentRef", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
    ], NxSlideout.prototype, "fx", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
    ], NxSlideout.prototype, "duration", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
    ], NxSlideout.prototype, "tolerance", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
    ], NxSlideout.prototype, "padding", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
    ], NxSlideout.prototype, "side", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
    ], NxSlideout.prototype, "closeOnContentClick", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], NxSlideout.prototype, "opened", void 0);
    NxSlideout = __decorate([
        aurelia_templating_1.customElement('nx-slideout'),
        aurelia_templating_1.inlineView("\n  <template>\n    <require from=\"./style.css\"></require>\n    <slot></slot>\n  </template>\n"),
        aurelia_dependency_injection_1.inject(aurelia_pal_1.DOM.Element)
    ], NxSlideout);
    return NxSlideout;
}());
exports.NxSlideout = NxSlideout;
