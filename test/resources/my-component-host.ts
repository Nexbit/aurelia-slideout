import { inlineView } from 'aurelia-templating';

@inlineView(`
<template>
    <nx-slideout id="menu" content-ref.bind="content" view-model.ref="slideout"></nx-slideout>
    <main id="panel" ref="content">
        <header>
            <button id="toggleButton" click.delegate="slideout.toggle() & throttle:500">☰</button>
            <h2>Panel</h2>
        </header>
    </main>
</template>`)
export class MyComponentHost {
}
