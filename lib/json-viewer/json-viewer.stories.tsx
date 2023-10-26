import * as React from 'react';

import { JsonViewer } from '../index';
!customElements.get('json-viewer') && customElements.define('json-viewer', JsonViewer);

export default {
  title: 'json-viewer',
  component: JsonViewer,
};

export const Primary = (args?: any) => {
  const data = {
    Droids: {
      Astromech: { R2_Units: [ 'R2-D2', 'R2-KT' ], 'R5-D4': 'I am R5 D4', },
      Protocol: { 'C-3PO': 1, 'TC-3': 2, },
    },
    Aliens: [ 'Greedo', 'Hammerhead', 'Snaggletooth', { foo: 1, bar: 2 } ]
  };

  return <>
    <json-viewer level="3" data={data}></json-viewer>
  </>
}; 

