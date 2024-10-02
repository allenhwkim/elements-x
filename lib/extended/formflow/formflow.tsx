import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { Node, Edge, ReactFlowInstance, ReactFlowJsonObject } from 'reactflow';
import { toPng } from 'html-to-image';
import { ReactflowChart } from './react-components/reactflow-chart/reactflow-chart';
import * as edgeCss from './react-components/custom-edges/styles.css?inline';
import * as nodeCss from './react-components/custom-nodes/styles.css?inline';
import * as chartCss from './react-components/reactflow-chart/styles.css?inline';
import * as reactflowCss from '../../../node_modules/reactflow/dist/style.css?inline';
import { addCss, removeCss } from '../../util';

const css = '' + reactflowCss.default + edgeCss.default + nodeCss.default + chartCss.default;

export class Formflow extends HTMLElement {
  root: any;
  reactflowInstance!: ReactFlowInstance;

  constructor() {
    super(); 
  }

  connectedCallback() {
    addCss(this.tagName, css);
    this.mount(); // sets this.root and this.reactflowInstance
  }
  
  disconnectedCallback() {
    removeCss(this.tagName);
    setTimeout( () => this.root.unmount());
  }

  setData(data?: any) {
    setTimeout(() => { // to avoid warning, asynchornously unmount a root while React was already rendering.
      this.root?.unmount();
      this.mount(data?.nodes, data?.edges);
    })
  }

  getData(): ReactFlowJsonObject {
    const data = this.reactflowInstance?.toObject()
    return data;
  }

  async getImage(): Promise<string> {
    const blobUrl = await toPng(
      this.querySelector('.react-flow') as HTMLElement, 
      {
        filter: (node: HTMLElement) => !(
          node.classList?.contains('react-flow__minimap') ||
          node.classList?.contains('react-flow__controls')
        )
      }
    );
    return blobUrl;
  };

  getInstance(): ReactFlowInstance {
    return this.reactflowInstance;
  }

  fireEvent(detail: any) {
    const customEvent = new CustomEvent('formflow', { detail, bubbles: true});
    this.dispatchEvent( customEvent );
  }

  externalCalls = {}; // empty! because it's set inside react component

  updateNodeData(id: string, data: {[key:string]: any}) { 
    this.externalCalls['updateNodeData'](id, data);
  };
  updateEdgeData(id: string, data: {[key:string]: any}) { 
    this.externalCalls['updateEdgeData'](id, data);
  };

  mount(nodes?: Node[], edges?: Edge[]) {
    const onNodeClick = (node: Node, nodes: Node[], edges: Edge[]) => {
      this.fireEvent({ action: 'selected', type: 'node', node, nodes, edges })
    };
  
    const onEdgeClick =(edge: Edge, nodes: Node[], edges: Edge[]) => {
      this.fireEvent({ action: 'selected', type: 'edge', edge, nodes, edges })
    };
  
    const onInit = (event: ReactFlowInstance) => {
      this.reactflowInstance = event;
      this.fireEvent({ action: 'init', event })
    }

    const showImage = async () => {
      var image = new Image();
      image.src = await this.getImage();
      (window as any).open('').document.write(image.outerHTML);
    }
  
    this.root = createRoot(this);
    this.root.render(
      <StrictMode>
        <ReactflowChart
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onInit={onInit}
          showImage={showImage}
          externalCalls={this.externalCalls} /* to call a function from outside */
        />
      </StrictMode>
    );
  }

}