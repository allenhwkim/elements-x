
import type { Meta } from '@storybook/html';
import { Formflow } from '../../../lib/extended/formflow/formflow';

const elName = 'x-formflow';
const className = Formflow;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Extended/Formflow',
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