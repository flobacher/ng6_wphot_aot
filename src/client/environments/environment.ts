import { environmentDev } from './environment.dev';
import { environmentProd } from './environment.prod';

const isDebug = module && module.hot;
if (isDebug) {
    console.log('DEBUG');
}

export const environment = isDebug ? environmentDev : environmentProd;

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
