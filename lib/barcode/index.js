
import jsbarcode, { code128, canvasRenderer } from 'jsbarcode';
import {setHTML} from '../common/util';
import html from './barcode.html';

export class XBarcode extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    this.value = this.getAttribute('value');
    this.format = this.getAttribute('format');
    if (this.value) {
      setHTML(this, html).then(_ => {
        const svg = this.querySelector('svg');
        svg.setAttribute('jsbarcode-value', this.value);
        this.format && svg.setAttribute('jsbarcode-format', this.format);
        try {
          jsbarcode('.barcode').init();
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

if (!customElements.get('x-barcode')) {
  customElements.define('x-barcode', XBarcode);
}