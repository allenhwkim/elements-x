import { Node, Edge } from 'reactflow';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'combo-box': any;
      'x-calendar': any;
      'form-controller': any;
      'form-stepper': any;
      'form-designer': any;
      'form-diagram': any;
      'input-mask': any;
      'resize-divs': any;
      'resize-handle': any;
      'json-viewer': any;
      'bar-code': any;
      'file-select': any;
      'list-select': any;
      'ol-map': any;
      'x-pagination': any;
      'x-if': any;
      'x-bind': any;
      'qr-code': any;
      'syntax-highlight': any;
      'side-bar': any;
      'monaco-editor': any;
      'input-table': any;
      'input-array': any;
    }
  }
}
 
import { BarCode } from './barcode/barcode';
import { ComboBox } from './combobox/combobox';
import { FileSelect } from './file-select/file-select';
import { FormController } from './form-stepper/form-controller';
import { FormDesigner } from './form-designer/form-designer';
import { FormDiagram } from './form-diagram/form-diagram';
import { FormStepper } from './form-stepper/form-stepper';
import { FormflowChart } from "./react-components/FormflowChart/FormflowChart"
import { InputMask } from './input-mask/input-mask';
import { JsonViewer } from './json-viewer/json-viewer';
import { ListSelect } from './list-select/list-select';
import { OlMap } from './ol-map/ol-map';
import { Pagination } from './x-pagination/pagination';
import { QrCode } from './qr-code/qr-code';
import { ResizeDivs } from './resize-divs/resize-divs';
import { ResizeHandle } from './resize-handle/resize-handle';
import { SideBar } from './sidebar/sidebar';
import { SyntaxHighlight } from './syntax-highlight/syntax-highlight';
import { MonacoEditor } from './monaco-editor/monaco-editor';
import { XBind, XChecks, XIf } from './x-if/index';

export {
 BarCode,
 ComboBox,
 FileSelect,
 FormController,
 FormDesigner,
 FormDiagram,
 FormStepper,
 FormflowChart,
 InputMask,
 JsonViewer,
 ListSelect,
 OlMap, 
 Pagination, 
 QrCode,
 ResizeDivs,
 ResizeHandle,
 SideBar,
 SyntaxHighlight,
 MonacoEditor,
 XBind, XChecks, XIf,
};

export function defineAll() {
  !customElements.get('bar-code') &&         customElements.define('bar-code', BarCode);
  !customElements.get('combo-box') &&        customElements.define('combo-box', ComboBox);
  !customElements.get('file-select') &&      customElements.define('file-select', FileSelect);
  !customElements.get('form-controller') &&  customElements.define('form-controller', FormController);
  !customElements.get('form-designer') &&    customElements.define('form-designer', FormDesigner);
  !customElements.get('form-diagram') &&     customElements.define('form-diagram', FormDiagram);
  !customElements.get('form-stepper') &&     customElements.define('form-stepper', FormStepper);
  !customElements.get('input-mask') &&       customElements.define('input-mask', InputMask);
  !customElements.get('json-viewer') &&      customElements.define('json-viewer', JsonViewer);
  !customElements.get('list-select') &&      customElements.define('list-select', ListSelect);
  !customElements.get('monaco-editor') &&    customElements.define('monaco-editor', MonacoEditor);
  !customElements.get('ol-map') &&           customElements.define('ol-map', OlMap);
  !customElements.get('qr-code') &&          customElements.define('qr-code', QrCode);
  !customElements.get('resize-divs') &&      customElements.define('resize-divs', ResizeDivs);
  !customElements.get('resize-handle') &&    customElements.define('resize-handle', ResizeHandle);
  !customElements.get('side-bar') &&         customElements.define('side-bar', SideBar);
  !customElements.get('syntax-highlight') && customElements.define('syntax-highlight', SyntaxHighlight);
  !customElements.get('x-bind') &&           customElements.define('x-bind', XBind);
  !customElements.get('x-if') &&             customElements.define('x-if', XIf);
  !customElements.get('x-pagination') &&     customElements.define('x-pagination', Pagination);
}

export { AppStorage } from './app-storage';
export { DEFAULT_CHART } from './default-chart';
export { DEFAULT_HTML } from './default-html';
export { DEFAULT_FORMS } from './default-forms';
export { DEFAULT_SUBMIT_DATA } from './default-submit-data';

export interface IReactflowEvent {
  action: 'selected' | 'init' | 'change';
  type: 'node' | 'edge' | 'init' | 'chart';
  node: Node;
  edge: Edge;
  nodes: Node[],
  edges: Edge[]
}