import { print } from './print';

export function createButton() {
    const btn = document.createElement('button');
    btn.innerHTML = 'Click me now and check the console!';
    btn.onclick = () => print('KLICK');
    return btn;
}
