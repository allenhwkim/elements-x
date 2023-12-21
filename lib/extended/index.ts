import { BarCode } from './barcode/barcode';
import { Clock } from './clock/clock';
import { Formflow } from './formflow/formflow';
import { FormDesigner } from './formdesigner/formdesigner';
import { Highlight } from './highlight/highlight';
import { Json } from './json/json';
import { Monaco } from './monaco/monaco';
import { QRCode } from './qrcode/qrcode';
import { Stepper } from './stepper/stepper';
import { StepperController } from './stepper/stepper-controller';
import { StepperStorage } from './stepper/stepper-storage';
import { Sidebar } from './sidebar/sidebar';

if (window) {
  // let users override code by not defining custom elements
  if (!window['X']?.override) { 
    const X = { 
      BarCode, Clock, Highlight, Json, 
      Monaco, QRCode, Stepper, Sidebar, 
      Formflow, FormDesigner,
    };

    window['X'] = {...window['X'], ...X};

    for (var key in X) {
      const elName = `x-${key.toLowerCase()}`;
      !customElements.get(elName) && customElements.define(elName, X[key]);
    }
    !customElements.get('x-stepper-controller') &&
      customElements.define('x-stepper-controller', StepperController);
  }
}

export {
  BarCode, Clock, Highlight, Json, 
  Monaco, QRCode, 
  Formflow, FormDesigner, Sidebar,
  Stepper, StepperController, StepperStorage,
};
