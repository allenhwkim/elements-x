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
    if (args.value) {
      try {
        if (typeof args.value === 'string') {
          const valFunc = new Function(`return ${args.value};`);
          el.value = valFunc();
        } else {
          el.value = args.value;
        }
      } catch(e) {
        console.error('Error, x-input-table, invalid value', e);
      }
    }
    wrapperEl.appendChild(el);
    wrapperEl.appendChild(msgEl);
    wrapperEl.addEventListener('update', (e: any) => {
      msgEl.innerText = `'update' event: ${JSON.stringify(el.value)}`
    });
    return wrapperEl as any;
  },

  argTypes: {
    value: { 
      description: `value of input table. e.g. ['a','b','c'], [{a: 1, b:2, c:3}] `, 
      control: { type: 'object' },
    },
  },
};


export default meta;

export const Primary = {};
export const Object = { args: {value: [
  {key1: '', key2: '', key3: ''}
]}};
export const StringsWithValue = { args: {value: [
  'pre', 
  'filled', 
  'strings'
]}};
export const ObjectsWithValue = { args: {value: [
  {key1: 'pre', key2: 'filled', key3: 'values'}, 
  {key1: '', key2: '', key3:''}
]}};