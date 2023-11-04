import type { Meta } from '@storybook/html';
import {List} from './list';

const elName = 'x-list';
const className = List;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'List',
  render: (args) => {
    const el = document.createElement(elName) as any;
    (args.html) &&  (el.innerHTML = args.html);
    (args.selected) &&  (el.setAttribute('selected', args.selected));
    const wrapperEl = document.createElement('div');
    const msgEl = document.createElement('div');
    wrapperEl.appendChild(el);
    wrapperEl.appendChild(msgEl);
    wrapperEl.addEventListener('select', (event: any) => {
      msgEl.innerText = `'select' event: ${JSON.stringify(event.detail.innerText)}. Check console for more.`;
      console.log(`'select' event`, event.detail);
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
    }
  },
}

export default meta;

export const Primary = { args: { 
  html: `
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
  `,
  selected: 'file-a'
}};

export const MenuStyle = { args: { 
  html: `
    <ul class="menu">
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
  `,
  selected: 'file-a'
}};