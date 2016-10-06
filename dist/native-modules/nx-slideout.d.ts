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
     * Set this option to false to disable closing the slideout when clicking inside the click-target area.
     * Default: true.
     *
     * @type {boolean}
     * @memberOf SlideoutOptions
     */
    closeOnClick?: boolean;
}
export declare let defaultSettings: SlideoutOptions;
export declare class NxSlideout {
    private _element;
    /**
     * A reference to the HTMLElement that should slide out when the side menu opens.
     * Can also be set to a css selector string.
     *
     * @type {HTMLElement | string}
     * @memberOf NxSlideout
     */
    target: HTMLElement | string;
    /**
     * The CSS effect to use when animating the opening and closing of the slideout.
     * Default: ease.
     *
     * @type {string}
     * @memberOf NxSlideout
     */
    fx?: string;
    /**
     * The time (milliseconds) to open/close the slideout.
     * Default: 300.
     *
     * @type {number}
     * @memberOf NxSlideout
     */
    duration?: number;
    /**
     * The number of px needed for the menu can be opened completely, otherwise it closes.
     * Default: 70.
     *
     * @type {number}
     * @memberOf NxSlideout
     */
    tolerance?: number;
    /**
     * The left padding of the slideout menu in px.
     * Default: 256.
     *
     * @type {number}
     * @memberOf NxSlideout
     */
    padding?: number;
    /**
     * The side to open the slideout.
     * Default: left.
     *
     * @type {('left' | 'right')}
     * @memberOf NxSlideout
     */
    side?: 'left' | 'right';
    /**
     * Set this option to false to disable closing the slideout when clicking inside the click-target area.
     * Default: true.
     *
     * @type {boolean}
     * @memberOf NxSlideout
     */
    closeOnClick?: boolean;
    /**
     * Gets or sets whether the slideout is opened.
     *
     * @type {boolean}
     * @memberOf NxSlideout
     */
    opened?: boolean;
    /**
     * An HTMLElement or css selector that will determine the target for closeOnClick behavior.
     * If not specified, the target element will be used as the click target.
     *
     * @type {HTMLElement | string}
     * @memberOf NxSlideout
     */
    clickTarget?: HTMLElement | string;
    private _slideout?;
    private _options;
    private _clickTarget;
    constructor(_element: HTMLElement);
    propertyChanged(propertyName: string, newValue: any, oldValue: any): void;
    openedChanged(newValue?: boolean, oldValue?: boolean): void;
    attached(): void;
    detached(): void;
    /**
     * Open the slideout.
     *
     * @memberOf NxSlideout
     */
    open(): void;
    /**
     * Close the slideout.
     *
     * @memberOf NxSlideout
     */
    close(): void;
    /**
     * Toggle the slideout: close it if opened, or open it if closed.
     *
     * @memberOf NxSlideout
     */
    toggle(): void;
    private init();
    private destroy();
    private attachEventHandlers();
    private detachEventHandlers();
    private contentOnClick();
}
