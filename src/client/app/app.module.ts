import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule],
    providers: [],
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {}

    hmrOnInit(store) {
        if (!store || !store.state) return;
        console.log('HMR store', store);
        console.log('store.state.data:', store.state.data);
        // inject AppStore here and update it
        // this.AppStore.update(store.state)
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        // change detection
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }
    hmrOnDestroy(store) {
        var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // inject your AppStore and grab state then set it on store
        // var appState = this.AppStore.get()
        store.state = { data: 'testdata' };
        // store.state = Object.assign({}, appState)
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    }
}