import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { FormflowChart } from './FormflowChart';
import { DEFAULT_CHART } from '../../default-chart';

export default { 
  title: 'FormflowChart',
  component: FormflowChart,
  argTypes : {
    nodes: { control: 'object' },
    edges: { control: 'object' },
  }
};

export const Primary = (args = DEFAULT_CHART) => {
  return <>
    <FormflowChart
        nodes={args.nodes}
        edges={args.edges}
        onNodeClick={action('node-click')}
        onEdgeClick={action('edge-click')}
        onInit={action('init')}
      />
  </>;
};
