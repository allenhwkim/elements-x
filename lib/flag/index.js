import { define } from '../common/util';
import { flags } from './flags';

export class XFlag extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name');
    const flag = flags.find(el => el.name.match(new RegExp(name, 'i')));
    console.log({flag});
    if (flag) {
      this.innerText = flag.flag;
      this.setAttribute('title', flag.name);
    }
  }
}
XFlag.define = define('x-flag', XFlag);
