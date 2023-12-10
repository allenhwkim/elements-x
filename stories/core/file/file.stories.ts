import type { Meta } from '@storybook/html';
import { File } from '../../../lib/core/file/file';
import { fixIndent } from '../../../lib/util';

const elName = 'x-file';
const className = File;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Core/File',
  render: (args) => {
    // const el = document.createElement(elName) as any;
    // if (args.message) {
    //   el.setAttribute('message', args.message);
    // }
    const divEl = document.createElement('div');
    const msgEl = document.createElement('div');
    divEl.insertAdjacentHTML('beforeend', fixIndent(`
      <x-file>
        <label>
          <input type="file" multiple>
          <span>Select, copy/paste files, or drag/drop files here</span>
        </label>
        <div class="list"></div>
      </x-file>
    `));
    divEl.append(msgEl);
    divEl.addEventListener('select', (event: any) => {
      msgEl.innerText = `'select' event: ${JSON.stringify(event.detail)}. Check console for details`
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