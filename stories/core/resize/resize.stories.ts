
import type { Meta } from '@storybook/html';
import { Resize } from '../../../lib/core/resize/resize';
import { fixIndent } from '../../../lib/util';

const elName = 'x-resize';
const className = Resize;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Core/Resize',
  render: (args) => {
    if (['width', 'height'].includes(args.resize)) {
      const el = document.createElement(elName);
      el.innerHTML = args.html || 'Error, blocks are required to resize width or height';
      (args.resize === 'width') && el.setAttribute('width', '');
      (args.resize === 'height') && el.setAttribute('height', '');
      return el;
    } else {
      const wrapperEl = document.createElement('div');
      wrapperEl.classList.add('border-solid', 'flex-center', 'has-handles');
      wrapperEl.innerHTML = args.html || 'Error, handles are required';
      return wrapperEl;
    }
  },
  argTypes: {
    resize: {
      description: '', 
      control: { type: 'radio' },
      options: ['width', 'height', 'handle']
    },
    html: { 
      description: `HTML for resizing`, 
      control: { type: 'text' },
    },
  },
};

export default meta;

export const Width = { 
  args: { 
    resize: 'width',
    html: fixIndent(`
      <div>Section 1</div>
      <div>Section 2</div>
      <div>Section 3</div>
    `)
  }
};

export const Height = { 
  args: { 
    resize: 'height',
    html: fixIndent(`
      <div>Section 1</div>
      <div>Section 2</div>
      <div>Section 3</div>
    `)
  }
};

export const Handle = { 
  args: { 
    resize: 'handle',
    html: fixIndent(`
      <x-resize top left></x-resize>
      <x-resize top right></x-resize>
      <x-resize bottom left></x-resize>
      <x-resize bottom right></x-resize>
    `)
  }
};
