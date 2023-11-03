import { Node, Edge } from 'reactflow';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x-barcode': any;
      'x-combobox': any;
      'x-calendar': any;
      'form-controller': any;
      'form-stepper': any;
      'form-designer': any;
      'form-diagram': any;
      'input-mask': any;
      'resize-divs': any;
      'resize-handle': any;
      'json-viewer': any;
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

export interface IReactflowEvent {
  action: 'selected' | 'init' | 'change';
  type: 'node' | 'edge' | 'init' | 'chart';
  node: Node;
  edge: Edge;
  nodes: Node[],
  edges: Edge[]
}