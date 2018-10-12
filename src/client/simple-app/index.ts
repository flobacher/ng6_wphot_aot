import { createButton } from './app';

let button = createButton();
const appRoot = document.getElementById('approot');
appRoot.appendChild(button);

if (module.hot) {
    module.hot.accept('./app', () => {
        appRoot.removeChild(button);
        button = createButton();
        appRoot.appendChild(button);
    });
}
