import type { Meta } from '@storybook/html';
import { Table } from '../../../lib/core/table/table';

const elName = 'x-table';
const className = Table;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Core/Table',
  render: (args) => {
    const wrapperEl = document.createElement('div');
    const custEl = document.createElement(elName) as any;
    (args.required) && custEl.setAttribute('required', '');
    if (args.value) {
      if (typeof args.value === 'string') {
        custEl.setAttribute('value', args.value);
      } else {
        custEl.value = args.value;
      }
    }
    const msgEl = document.createElement('div');
    wrapperEl.append(custEl, msgEl);

    wrapperEl.addEventListener('update', (el: any) => {
      msgEl.innerText = `'update' event: ${JSON.stringify(el.value)}`
    });

    return wrapperEl as any;
  },

  argTypes: {
    value: { 
      description: `value of input table. e.g. ['a','b','c'], [{a: 1, b:2, c:3}] `, 
      control: { type: 'object' },
    },
    required: { 
      description: `Required`, 
      control: { type: 'boolean' },
    },
  },
};


export default meta;

export const Primary = {
  args: {
    required: true
  }
};

export const Object = {
  args: {
    required: true,
    value: JSON.stringify([ { key1: '', key2: '', key3: '' } ])
  }
};

export const StringsWithValue = {
  args: {
    required: true,
    value: JSON.stringify([ 'pre', 'filled', 'string' ])
  }
};

export const ObjectsWithValue = {
  args: {
    required: true,
    value: [
      { key1: 'pre', key2: 'filled', key3: 'values' },
      { key1: '', key2: '', key3: '' }
    ]
  }
};