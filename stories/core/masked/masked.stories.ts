import type { Meta } from '@storybook/html';
import { Masked } from '../../../lib/core/masked/masked';

const elName = 'x-masked';
const className = Masked;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Core/Masked',
  render: (args) => {
    const divEl = document.createElement('div');
    const custEl = document.createElement(elName) as any;
    const inputEl = document.createElement('input');
    args.value && inputEl.setAttribute('value', args.value);
    args.mask && custEl.setAttribute('mask', args.mask);
    custEl.append(inputEl);
    divEl.append(custEl);
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