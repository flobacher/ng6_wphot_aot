import { enableProdMode } from '@angular/core';
import { ɵrenderComponent, ɵComponentType } from '@angular/core';

import { AppComponent } from './app.component';

enableProdMode();
ɵrenderComponent(AppComponent as ɵComponentType<AppComponent>);
