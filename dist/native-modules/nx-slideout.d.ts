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
export declare let defaultSettings: SlideoutOptions;
export declare class NxSlideout {
    private _element;
    /**
     * A reference to the HTMLElement that hosts the content panel.
     *
     * @type {HTMLElement}
     * @memberOf NxSlideout
     */
    contentRef: HTMLElement;
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
     * Set this option to false to disable closing the slideout when clicking inside the panel area.
     * Default: true.
     *
     * @type {boolean}
     * @memberOf NxSlideout
     */
    closeOnContentClick?: boolean;
    /**
     * Gets or sets whether the slideout is opened.
     *
     * @type {boolean}
     * @memberOf NxSlideout
     */
    opened?: boolean;
    private _slideout?;
    private _options;
    private _clickAttached;
    constructor(_element: HTMLElement);
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
