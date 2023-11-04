import type { Meta } from '@storybook/html';
import { InputMasked } from './input-masked';

const elName = 'x-input-masked';
const className = InputMasked;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Input (for masked entry)',
  render: (args) => {
    const divEl = document.createElement('div');
    const el = document.createElement(elName) as any;
    const inputEl = document.createElement('input');
    args.value && inputEl.setAttribute('value', args.value);
    args.mask && el.setAttribute('mask', args.mask);
    el.appendChild(inputEl);
    divEl.appendChild(el);
    return divEl as any;
  },
  args: {},
  argTypes: {
    mask: { 
      description: `input mask, 'Y', 'M', 'D', '9', '_', '#'' for number. 'X' for string. e.g. YYYY-MM-DD`, 
      control: { type: 'text' },
    },
    value: { 
      description: 'value of input element', 
      control: { type: 'text' },
    }
  },
};


export default meta;

export const Primary = { args: { mask: 'yyyy-mm-dd', value: '202312'}};
export const ZipCode = { args: { mask: '99999', value: '205' } };
export const ID = { args: { mask: '###-##-####'} };
export const PhoneNumber = { args: { mask: '9 (999) 999-9999', value: 1} }
export const PostalCode = { args: { mask: 'A9A 9A9', value: 'L7A'} }
export const CreditCard = { args: { mask: '9999 9999 9999 9999', value: '4599'} }
export const HealthCard = { args: { mask: '____ ___ ___'} }