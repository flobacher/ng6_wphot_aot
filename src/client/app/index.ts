// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { bootloader, hmrModule } from '@angularclass/hmr';

// import { AppModule } from './app.module';
// import { environment } from '../environments/environment';

// if (environment.production) {
//     enableProdMode();
//     platformBrowserDynamic()
//         .bootstrapModule(AppModule)
//         .catch(err => console.log(err));
// } else {
//     function main() {
//         return platformBrowserDynamic()
//             .bootstrapModule(AppModule)
//             .then((ngModuleRef: any) => {
//                 return hmrModule(ngModuleRef, module);
//             });
//     }

//     // boot on document ready
//     bootloader(main);
// }
