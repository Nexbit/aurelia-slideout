import { inlineView } from 'aurelia-templating';

@inlineView(`
<template>
    <nx-slideout ref="slideout" id="menu" target.bind="content" view-model.ref="slideout" close-on-click.bind="closeOnClick" opened.bind="opened" duration="1"></nx-slideout>
    <main id="panel" ref="content">
        <header>
            <button id="toggleButton" click.delegate="slideout.toggle() & throttle:500">☰</button>
            <h2>Panel</h2>
        </header>
    </main>
</template>`)
export class MyComponentHost {
    closeOnClick: boolean = true;
    opened: boolean = false;
    slideout: any;

    toggle() {
        this.slideout.toggle();
    }
}
