import type { Meta } from '@storybook/html';
import { Sidebar } from '../../../lib/extended/sidebar/sidebar';
import { fixIndent } from '../../../lib/util';

const elName = 'x-sidebar';
const className = Sidebar;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Extended/Sidebar',
  render: (args) => {
    const wrapperEl = document.createElement('div')
    const msgEl = document.createElement('div');
    msgEl.style.textAlign = 'center';

    const sidebarEl = document.createElement(elName);
    sidebarEl.addEventListener('select', (e: any) => {
      msgEl.innerHTML = 'x-sidebar select event: <br/>' + (e.detail?.innerText || e.detail);
    })
    sidebarEl.insertAdjacentHTML('beforeend', fixIndent(`
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
    `));

    const hamburgerEl = document.createElement('div');
    hamburgerEl.insertAdjacentHTML('beforeend', `
      <button class="sidebar toggle" 
        style="border: 0; font-size: 32px; background: 0; color: #666; cursor: pointer;">
        ☰
      </button>`);

    wrapperEl.append(hamburgerEl, msgEl, sidebarEl);
    return wrapperEl;
  },
  // argTypes: {
  //   value: { 
  //     description: `Value of QR code`, 
  //     control: { type: 'text' },
  //   }
  // },
};

export default meta;

export const Primary = { 
  args: { 
    // value: 'https://elements-x.com/?path=/docs/qr-code--primary'
  }
};
