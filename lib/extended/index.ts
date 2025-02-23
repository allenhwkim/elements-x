import { BarCode } from './barcode/barcode';
import { Clock } from './clock/clock';
import { Highlight } from './highlight/highlight';
import { Json } from './json/json';
import { Monaco } from './monaco/monaco';
import { QRCode } from './qrcode/qrcode';

if (window) {
  // let users override code by not defining custom elements
  const X = { BarCode, Clock, Highlight, Json, Monaco, QRCode };

  for (var key in X) {
    const elName = `x-${key.toLowerCase()}`;
    !customElements.get(elName) && customElements.define(elName, X[key]);
  }
}

export { BarCode, Clock, Highlight, Json, Monaco, QRCode };
