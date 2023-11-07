import type { Meta } from '@storybook/html';
import { QRCode } from '../../lib/qrcode/qrcode';

const elName = 'x-qrcode';
const className = QRCode;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'QR code',
  render: (args) => {
    const el = document.createElement(elName);
    args.value && el.setAttribute('value', args.value);
    return el;
  },
  argTypes: {
    value: { 
      description: `Value of QR code`, 
      control: { type: 'text' },
    }
  },
};

export default meta;

export const Primary = { 
  args: { 
    value: 'https://elements-x.com/?path=/docs/qr-code--primary'
  }
};
