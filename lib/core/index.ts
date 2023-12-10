import css from './css/index.css';
import { Calendar } from './calendar/calendar';
import { ComboBox } from './combobox/combobox';
import { Dropdown } from './dropdown/dropdown';
import { File } from './file/file';
import { List } from './list/list';
import { Map } from './map/map';
import { Masked } from './masked/masked';
import { Pagination } from './pagination/pagination';
import { Resize } from './resize/resize';
import { SideBar } from './sidebar/sidebar';
import { Table } from './table/table';

if (!document.querySelector(`style[x-css]`)) {
  document.head.insertAdjacentHTML('beforeend', `<style x-css>${css}</style>`);
}

export {
  Calendar, ComboBox, Dropdown, File, 
  List, Map, Masked, Pagination, 
  Resize, SideBar, Table
};

if (window) {
  const X = {
    Calendar, ComboBox, Dropdown, File, 
    List, Map, Masked, Pagination, 
    Resize, SideBar, Table
  };
  (window as any).X = {...(window as any).X, ...X};

  // let users override code by not defining custom elements
  if (!(window as any).X?.override) {
    for (var key in X) {
      const elName = `x-${key.toLowerCase()}`;
      !customElements.get(elName) && customElements.define(elName, X[key]);
    }
  }
}
