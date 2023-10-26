import morphdom from 'morphdom/dist/morphdom-esm';
import { waitFor, loadScript } from '../../lib';

export class QrCode extends HTMLElement {
  static get observedAttributes() { return ['value']; }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.#updateDOM();
  }

  connectedCallback() {
    loadScript('https://unpkg.com/qrcode@1.4.4/build/qrcode.min.js');
    this.#updateDOM();
  }

  async render() {
    await waitFor('window.QRCode');
    const value = this.getAttribute('value') || 'Hello QR Code';
    const imgUrl = await window['QRCode'].toDataURL(value)
    return `<img alt="${value}" src="${imgUrl}" /><br/>${value}`;
  }

  // called when attribute/props changes and connectedCallback
  // run as debounced since it's called from many places and often
  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const newHTML = await this.render();
      const updated = document.createElement('div');
      updated.innerHTML += newHTML;
      morphdom(this, updated, { childrenOnly: true }); 
    }, 50);
  }
}