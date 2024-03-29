import type { Meta } from '@storybook/html';
import {List} from '../../../lib/core/list/list';
import { fixIndent } from '../../../lib/util';

const elName = 'x-list';
const className = List;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Core/List',
  render: (args) => {
    const custEl = document.createElement(elName) as any;
    (args.html) && (custEl.innerHTML = args.html);
    (args.selected) && (custEl.setAttribute('selected', args.selected));
    (args.required) && (custEl.setAttribute('required', args.required));
    const wrapperEl = document.createElement('div');
    const msgEl = document.createElement('div');
    wrapperEl.append(custEl, msgEl);
    wrapperEl.addEventListener('select', (event: any) => {
      msgEl.innerText = `'select' event: ${JSON.stringify(event.detail.innerText)}. Check console for more.`;
    });
    return wrapperEl as any;
  },
  args: {},
  argTypes: {
    html: {
      description: '<ul> html',
      control: { type: 'text' },
    },
    selected: {
      description: 'Id of selected list item', 
      control: { type: 'text' },
    },
    required: {
      description: 'Required', 
      control: { type: 'boolean' },
    }
  },
}

export default meta;

export const Primary = { args: { 
  selected: 'file-a',
  required: true,
  html: fixIndent(`
    <ul>
      <li> File
        <ul>
          <li id="new">New</li>
          <li>Open
            <ul>
              <li> Recent Files 
                <ul>
                  <li id="file-a">File A</li>
                  <li>File B</li>
                  <li>File C</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li> Edit
        <ul>
          <li>Undo</li>
          <li id="redo">Redo</li>
          <li className="disabled">Cut</li>
          <li className="disabled">Copy</li>
          <li className="disabled">Paste</li>
        </ul>
      </li>
      <li> Format
        <ul>
          <li>Font</li>
          <li>Text</li>
        </ul>
      </li>
      <li> View
        <ul>
          <li>100%</li>
          <li>Zoom In</li>
          <li>Zoom Out</li>
        </ul>
      </li>
      <li id="help">Help</li>
    </ul>
  `),
}};
