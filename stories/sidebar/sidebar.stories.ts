import type { Meta } from '@storybook/html';
import { SideBar } from '../../lib/sidebar/sidebar';
import { fixIndent } from '../../lib/util';

const elName = 'x-sidebar';
const className = SideBar;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'SideBar',
  render: (args) => {
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('x-sidebar-toggle', 'display-6');
    buttonEl.innerText = '☰';

    const el = document.createElement(elName);
    el.innerHTML = args.html || 'Error, missing sidebar content in html.';

    const msgEl = document.createElement('div');

    const wrapperEl = document.createElement('div');
    wrapperEl.append(el, buttonEl, msgEl);
    wrapperEl.addEventListener('sidebar', (e:any) => msgEl.innerText = `event 'sidebar': ${e.detail}`);

    return wrapperEl;
  },
  argTypes: {
    html: { 
      description: `sidebar contents`, 
      control: { type: 'text' },
    },
  },
};

export default meta;

export const Primary = { 
  args: { 
    html: fixIndent(`
      <div>
        <span>Content</span>
        <button class="x-sidebar-close">×</button>
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>
          Dropdown
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </li>
        <li>Support</li>
      </ul>
    `)
  }
};

