import * as React from 'react';
import { createRoot } from 'react-dom/client'
import type { Meta } from '@storybook/html';
import { ReactflowChart } from '../../../lib/extended/formflow/react-components/reactflow-chart/reactflow-chart';

const meta: Meta = { 
  title: 'Extended/Reactflow',
  render: (args) => {
    const containerEl = document.createElement('div');
    const custEl = document.createElement('div');
    custEl.classList.add('reactflow-chart');
    const root = createRoot(custEl);

    root.render(
      <ReactflowChart
        nodes={args.nodes}
        edges={args.edges}
        onNodeClick={args.onNodeClick}
        onEdgeClick={args.onEdgeClick}
        onInit={args.onInit}
        showImage={args.showImage}
      />
    );
    containerEl.append(custEl);
    return containerEl;
  },
  argTypes : {
    nodes: { control: 'object' },
    edges: { control: 'object' },
    onInit: { action: 'init'},
    onNodeClick: { action: 'node click'},
    onEdgeClick: { action: 'edge click'},
    showImage: { action: 'showImage'},
  }
};

export default meta;

export const Primary = {};
