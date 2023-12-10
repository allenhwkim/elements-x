import { BarCode } from './barcode/barcode';
import { Clock } from './clock/clock';
import { Formflow } from './formflow/formflow';
import { Highlight } from './highlight/highlight';
import { Json } from './json/json';
import { Monaco } from './monaco/monaco';
import { QRCode } from './qrcode/qrcode';
import { Stepper } from './stepper/stepper';
import { StepperController } from './stepper/stepper-controller';

export {
  BarCode, Clock, Highlight, Json, 
  Monaco, QRCode, Stepper, Formflow 
};

if (window) {
  const X = { 
    BarCode, Clock, Highlight, Json, 
    Monaco, QRCode, Stepper, Formflow 
  };

  ((window as any).X = {...(window as any).X, ...X});

  // let users override code by not defining custom elements
  if (!(window as any).X?.override) { 
    for (var key in X) {
      const elName = `x-${key.toLowerCase()}`;
      !customElements.get(elName) && customElements.define(elName, X[key]);
    }
    !customElements.get('x-stepper-controller') &&
      customElements.define('x-stepper-controller', StepperController);
  }
}

