
import type { Meta } from '@storybook/html';
import { FormDesigner } from '../../../lib/extended/formdesigner/formdesigner';

const elName = 'x-formdesigner';
const className = FormDesigner;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Extended/FormDesigner',
  render: (args) => {
    const custEl = document.createElement(elName) as any;
    const containerEl = document.createElement('div');
    const msgEl = document.createElement('div');
    containerEl.append(custEl, msgEl);
    containerEl.addEventListener('select', (event: any) => {
      msgEl.innerText = `'select' event: ${JSON.stringify(event.detail)}. Check console for details`
    });
    return containerEl;
  }
};


export default meta;

export const Primary = { args: { }};