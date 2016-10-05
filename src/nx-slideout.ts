import { customElement, inlineView, bindable } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import * as Slideout from 'slideout';

interface Object {
    [key: string]: any;
}
// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
function extend<T extends Object>(deep: boolean, target: T, ...objects: Object[]): T {
    // Variables
    const extended = target;
    const length = arguments.length;

    // Merge the object into the extended object
    const merge = function (obj: Object) {
        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend( /*deep*/ true, extended[prop], obj[prop]);
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
};

export interface SlideoutOptions {
    /**
     * The time (milliseconds) to open/close the slideout.
     * Default: 300.
     *
     * @type {number}
     * @memberOf SlideoutOptions
     */
    duration?: number;

    /**
     * The CSS effect to use when animating the opening and closing of the slideout.
     * Default: ease.
     *
     * @type {string}
     * @memberOf SlideoutOptions
     */
    fx?: string;

    /**
     * The left padding of the slideout menu in px.
     * Default: 256.
     *
     * @type {number}
     * @memberOf SlideoutOptions
     */
    padding?: number;

    /**
     * The number of px needed for the menu can be opened completely, otherwise it closes.
     * Default: 70.
     *
     * @type {number}
     * @memberOf SlideoutOptions
     */
    tolerance?: number;

    /**
     * Set this option to false to disable Slideout touch events.
     * Default: true.
     *
     * @type {boolean}
     * @memberOf SlideoutOptions
     */
    touch?: boolean;

    /**
     * The side to open the slideout.
     * Default: left.
     *
     * @type {('left' | 'right')}
     * @memberOf SlideoutOptions
     */
    side?: 'left' | 'right';

    /**
     * Set this option to false to disable closing the slideout when clicking inside the panel area.
     * Default: true.
     *
     * @type {boolean}
     * @memberOf SlideoutOptions
     */
    closeOnContentClick?: boolean;
}

export let defaultSettings: SlideoutOptions = {
    fx: 'ease',
    duration: 300,
    tolerance: 70,
    padding: 250,
    side: 'left',
    closeOnContentClick: true
};

@customElement('nx-slideout')
@inlineView(`
  <template>
    <require from="./style.css"></require>
    <slot></slot>
  </template>
`)
@inject(DOM.Element)
export class NxSlideout {
    /**
     * A reference to the HTMLElement that hosts the content panel.
     *
     * @type {HTMLElement}
     * @memberOf NxSlideout
     */
    @bindable({ defaultBindingMode: bindingMode.oneWay })
    contentRef: HTMLElement;

    /**
     * The CSS effect to use when animating the opening and closing of the slideout.
     * Default: ease.
     *
     * @type {string}
     * @memberOf NxSlideout
     */
    @bindable({ defaultBindingMode: bindingMode.oneWay })
    fx?: string;

    /**
     * The time (milliseconds) to open/close the slideout.
     * Default: 300.
     *
     * @type {number}
     * @memberOf NxSlideout
     */
    @bindable({ defaultBindingMode: bindingMode.oneWay })
    duration?: number;

    /**
     * The number of px needed for the menu can be opened completely, otherwise it closes.
     * Default: 70.
     *
     * @type {number}
     * @memberOf NxSlideout
     */
    @bindable({ defaultBindingMode: bindingMode.oneWay })
    tolerance?: number;

    /**
     * The left padding of the slideout menu in px.
     * Default: 256.
     *
     * @type {number}
     * @memberOf NxSlideout
     */
    @bindable({ defaultBindingMode: bindingMode.oneWay })
    padding?: number;

    /**
     * The side to open the slideout.
     * Default: left.
     *
     * @type {('left' | 'right')}
     * @memberOf NxSlideout
     */
    @bindable({ defaultBindingMode: bindingMode.oneWay })
    side?: 'left' | 'right';

    /**
     * Set this option to false to disable closing the slideout when clicking inside the panel area.
     * Default: true.
     *
     * @type {boolean}
     * @memberOf NxSlideout
     */
    @bindable({ defaultBindingMode: bindingMode.oneWay })
    closeOnContentClick?: boolean;

    /**
     * Gets or sets whether the slideout is opened.
     *
     * @type {boolean}
     * @memberOf NxSlideout
     */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    opened?: boolean;

    private _slideout?: Slideout;
    private _options: SlideoutOptions;
    private _clickAttached: boolean = false;

    constructor(private _element: HTMLElement) {
        this.opened = false;
    }

    openedChanged(newValue?: boolean, oldValue?: boolean) {
        if (newValue !== oldValue && this._slideout) {
            if (newValue && !this._slideout.isOpen()) {
                this.open();
            }
            else if (!newValue && this._slideout.isOpen()) {
                this.close();
            }
        }
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
            this.opened = this._slideout.isOpen();
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
            this.opened = this._slideout.isOpen();
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
            this.opened = this._slideout.isOpen();
        }
    }

    private init() {
        if (this._slideout) { return; }

        const bindableOptions: SlideoutOptions = {
            fx: this.fx,
            duration: this.duration,
            tolerance: this.tolerance,
            padding: this.padding,
            side: this.side,
            closeOnContentClick: this.closeOnContentClick
        };
        this._options = extend(/*deep*/ false, {} as SlideoutOptions, bindableOptions, defaultSettings);
        const libOptions = this._options as Slideout.Options;
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
    }

    private destroy() {
        if (this._slideout) {
            this.detachEventHandlers();
            this._slideout.destroy();
            this._slideout = undefined;
        }
    }

    private attachEventHandlers() {
        if (this._options.closeOnContentClick) {
            this.contentRef.addEventListener('click', this.contentOnClick.bind(this));
            this._clickAttached = true;
        }
    }

    private detachEventHandlers() {
        if (this._clickAttached) {
            this.contentRef.removeEventListener('click', this.contentOnClick);
        }
    }

    private contentOnClick() {
        if (this._slideout === undefined) { return; }
        if (this._slideout.isOpen()) { this._slideout.close(); }
    }
}
