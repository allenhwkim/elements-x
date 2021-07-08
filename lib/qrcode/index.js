// import {addCss, removeCss} from 'elements-x';
// import css from './typing-effect.css';
import QRCode from 'qrcode'

export class XQRCode extends HTMLElement {
  connectedCallback() {
    this.value = this.getAttribute('value') || 'Hello QR Code';

    // With promises
    QRCode.toDataURL(this.value)
      .then(url => {
        const img = document.createElement('img');
        img.setAttribute('alt', this.value);
        img.setAttribute('title', this.value);
        img.src = url;
        this.appendChild(img);
        // console.log(url)
      })
      .catch(err => {
        // console.error(err)
      })
  }
}

if (!customElements.get('x-qrcode')) {
  customElements.define('x-qrcode', XQRCode);
}

