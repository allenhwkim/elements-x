import type { Meta } from '@storybook/react';
import { InputTable } from './input-table';

const elName = 'x-input-table';
const className = InputTable;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'InputTable',
  render: (args) => {
    const wrapperEl = document.createElement('div');
    const el = document.createElement(elName) as any;
    const msgEl = document.createElement('div');
    args.keys && el.setAttribute('keys', args.value);
    wrapperEl.appendChild(el);
    wrapperEl.appendChild(msgEl);
    wrapperEl.addEventListener('update', (e: any) => {
      msgEl.innerText = `'update' event: ${JSON.stringify(e.detail)}`
    });
    return wrapperEl as any;
  },
  argTypes: {
    keys: { 
      description: `Keys of each input. If given, return as an object. If not given, return as an array`, 
      control: { type: 'text' },
    },
  },
};


export default meta;

export const Primary = { args: {}};
export const Object = { args: {keys: 'key1, key2, key3'}};