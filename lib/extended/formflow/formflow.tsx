import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { Node, Edge, ReactFlowJsonObject } from 'reactflow';
import { ReactflowChart } from './react-components/reactflow-chart/reactflow-chart';
import * as edgeCss from './react-components/custom-edges/styles.css?inline';
import * as nodeCss from './react-components/custom-nodes/styles.css?inline';
import * as chartCss from './react-components/reactflow-chart/styles.css?inline';
import * as reactflowCss from '../../../node_modules/reactflow/dist/style.css?inline';
import { addCss, removeCss } from '../../util';
import { DEFAULT_CHART } from './DEFAULT_CHART';

const css = '' + 
  reactflowCss.default + 
  edgeCss.default + 
  nodeCss.default + 
  chartCss.default;

export class Formflow extends HTMLElement {
  root: any;

  connectedCallback() {
    addCss(this.tagName, css);
    const {nodes, edges} = DEFAULT_CHART;
    this.mount(nodes, edges); // sets this.root
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

  externalCalls = {}; // empty! because it's set inside react component
  updateNodeData(id: string, data: {[key:string]: any}) { 
    this.externalCalls['updateNodeData'](id, data);
  };
  updateEdgeData(id: string, data: {[key:string]: any}) { 
    this.externalCalls['updateEdgeData'](id, data);
  };

  mount(nodes?: Node[], edges?: Edge[]) {
    this.root = createRoot(this);
    this.root.render(
      <StrictMode>
        <ReactflowChart
          nodes={nodes}
          edges={edges}
          externalCalls={this.externalCalls} /* to call a function from outside */
        />
      </StrictMode>
    );
  }

}