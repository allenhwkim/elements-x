import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { Node, Edge, ReactFlowInstance, ReactFlowJsonObject } from 'reactflow';
import { toPng } from 'html-to-image';
import { FormflowChart } from '../react-components/FormflowChart/FormflowChart';
import { DEFAULT_CHART } from '../default-chart';

export class FormDiagram extends HTMLElement {
  root: any;
  reactflowInstance!: ReactFlowInstance;

  constructor() {
    super(); 
  }

  connectedCallback() {
    this.mount(); // sets this.root and this.reactflowInstance
  }
  
  disconnectedCallback() {
    setTimeout( () => this.root.unmount());
  }

  setData(data: any) {
    setTimeout(() => { // to avoid warning, asynchornously unmount a root while React was already rendering.
      this.root?.unmount();
      this.mount(data.nodes, data.edges);
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
    const customEvent = new CustomEvent('reactflow', { detail, bubbles: true});
    this.dispatchEvent( customEvent );
  }

  externalCalls = {}; // empty! because it's set inside react component

  updateNodeData(id: string, data: {[key:string]: any}) { 
    this.externalCalls['updateNodeData'](id, data);
  };
  updateEdgeData(id: string, data: {[key:string]: any}) { 
    this.externalCalls['updateEdgeData'](id, data);
  };

  mount(nodes: Node[] = DEFAULT_CHART.nodes, edges: Edge[] = DEFAULT_CHART.edges) {
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
        <FormflowChart
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