import { StageComponent, ComponentTester } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { MyComponentHost } from './resources/my-component-host';
import { configure } from './shared';

describe('end to end', () => {
    it('basic scenarios', (done: () => void) => {
        const component: ComponentTester = StageComponent
            .withResources()
            .inView('<my-component-host></my-component-host>')
            .boundTo({});
        component.bootstrap(configure);

        let slideoutElement: HTMLElement;
        let slideoutPanel: HTMLElement;

        let viewModel: MyComponentHost;

        (component.create(bootstrap as any))
            // grab some references.
            .then(() => {
                viewModel = component.viewModel;
                slideoutElement = component.element.querySelector('#menu') as HTMLElement;
                slideoutPanel = component.element.querySelector('#panel') as HTMLElement;
            })
            // the slideoutElement element should have a class with name "slideout-menu"
            .then(() => expect(slideoutElement.className).toBe('au-target slideout-menu'))
            // and the content panel should have a class with name "slideout-panel"
            .then(() => expect(slideoutPanel.className).toBe('au-target slideout-panel'))

            // cleanup and finish.
            .then(() => component.dispose())
            .then(done);
    });
});
