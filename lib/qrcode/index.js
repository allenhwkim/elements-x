import { setHTML, waitUntil, define} from '../common/util';
import scriptHtml from './qrcodejs.html';

export class XQRCode extends HTMLElement {
  connectedCallback() {
    this.value = this.getAttribute('value') || 'Hello QR Code';

    const scriptEl = document.querySelector('script#x-qrcode');
    const thisHtml = scriptEl ? '' : scriptHtml;

    setHTML(this, thisHtml)
      .then(_ => waitUntil('QRCode'))
      .then(_ => QRCode.toDataURL(this.value))
      .then(url => {
        // console.log({url})
        const img = document.createElement('img');
        img.setAttribute('alt', this.value);
        img.setAttribute('title', this.value);
        img.src = url;
        this.appendChild(img);
        // console.log(url)
      })
      .catch(err => {
        // console.error(err)
      });
  }
}
XQRCode.define = define('x-qrcode', XQRCode);
