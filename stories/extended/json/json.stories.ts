import * as React from 'react';

import { Json } from '../../../lib/extended/json/json';
import type { Meta } from '@storybook/html';

const elName = 'x-json';
const className = Json;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Extended/Json viewer',
  render: (args) => {
    const el = document.createElement(elName) as any;
    (args.data) && (el.data = args.data);
    (args.level) && el.setAttribute('level', args.level);
    return el;
  },

  argTypes: {
    data: { 
      description: `json data`, 
      control: { type: 'object' },
    },
    level: { 
      description: `The level of hierarchy to display when initialized.`, 
      control: { type: 'radio' },
      options: [1, 2, 3],
      table: { defaultValue: { summary: 1 } },
    },
  },
};


export default meta;

export const Primary = { args: {
  data: {
    Droids: {
      Astromech: { R2_Units: [ 'R2-D2', 'R2-KT' ], 'R5-D4': 'I am R5 D4', },
      Protocol: { 'C-3PO': 1, 'TC-3': 2, },
    },
    Aliens: [ 'Greedo', 'Hammerhead', 'Snaggletooth', { foo: 1, bar: 2 } ]
  }, 
  level: 2,
}};