import { BarCode } from './barcode/barcode';
import { Calendar } from './calendar/calendar';
import { Clock } from './clock/clock';
import { ComboBox } from './combobox/combobox';
import { Dropdown } from './dropdown/dropdown';
import { File } from './file/file';
import { Highlight } from './highlight/highlight';
import { Json } from './json/json';
import { List } from './list/list';
import { Map } from './map/map';
import { Masked } from './masked/masked';
import { MonacoEditor } from './monaco/monaco';
import { Pagination } from './pagination/pagination';
import { QRCode } from './qrcode/qrcode';
import { Resize } from './resize/resize';
import { SideBar } from './sidebar/sidebar';
import { Stepper } from './stepper/stepper';
import { StepperController } from './stepper/stepper-controller';
import { Table } from './table/table';
import css from './css/index.css';

if (!document.querySelector(`style[x-css]`)) {
  document.head.insertAdjacentHTML('beforeend', `<style x-css>${css}</style>`);
}

const X = {
  BarCode, Clock, Calendar, ComboBox, Dropdown, File, Highlight, Json, List, 
  Map, Masked, MonacoEditor, Pagination, QRCode, Resize, SideBar, Stepper, Table 
};

if ((window as any).X !== false) { // custom define
  for (var key in X) {
    const elName = `x-${key.toLowerCase()}`;
    if (!customElements.get(elName)) {
      customElements.define(elName, X[key]);
    }
  }
  if (!customElements.get('x-stepper-controller')) {
    customElements.define('x-stepper-controller', StepperController);
  }
}

window && ((window as any).X = X);
export {X};

