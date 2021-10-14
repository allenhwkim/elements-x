
import {setHTML, waitUntil, define} from '../common/util';
import html from './barcode.html';
import scriptHtml from './jsbarcode.html';

export class XBarcode extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    this.value = this.getAttribute('value');
    this.format = this.getAttribute('format');

    const scriptEl = document.querySelector('script#x-jsbarcode');
    const thisHtml = scriptEl ? html : scriptHtml + html;

    if (this.value) {
      setHTML(this, thisHtml)
        .then(_ => waitUntil('JsBarcode'))
        .then(_ => {
          const svg = this.querySelector('svg');
          svg.setAttribute('jsbarcode-value', this.value);
          this.format && svg.setAttribute('jsbarcode-format', this.format);
          try {
            JsBarcode('.barcode').init();
          } catch(e) {
            this.innerHTML = e;
            throw(e);
          }
        });
    } else {
      this.innerHTML = 'barcode value required';
    }
  }

}
XBarcode.define = define('x-barcode', XBarcode);
