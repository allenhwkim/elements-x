import type { Meta } from '@storybook/html';
import { File } from '../../lib/file/file';

const elName = 'x-file';
const className = File;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'File',
  render: (args) => {
    const el = document.createElement(elName) as any;
    if (args.message) {
      el.setAttribute('message', args.message);
    }
    const divEl = document.createElement('div');
    const msgEl = document.createElement('div');
    divEl.appendChild(el);
    divEl.appendChild(msgEl);
    divEl.addEventListener('select', (event: any) => {
      msgEl.innerText = `'select' event: ${JSON.stringify(event.detail)}. Check console for details`
      console.log(`'select' event`, event.detail);
    });
    return divEl as any;
  },
  args: {},
  argTypes: {
    message: { 
      description: 'Text message to display', 
      control: { type: 'text' },
    }
  },
};

export default meta;

export const Primary = { args: { }};
export const Message = { args: { message: `Hello message` } }