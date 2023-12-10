import type { StoryObj, Meta } from '@storybook/html';
import {BarCode} from '../../../lib/extended/barcode/barcode';

!customElements.get('x-barcode') && customElements.define('x-barcode', BarCode);

function createBarcode(args) {
  const el = document.createElement('x-barcode') as any;

  for (var key in args) {
    if (['value', 'format', 'width', 'height'].includes(key)) {
      el.setAttribute(key, args[key]);
    } else {
     el.props[key] = args[key];
    }
  }
  return el;
}

// More on how to set up stories at: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta = {
  title: 'Extended/Barcode',
  render: (args) => { return createBarcode(args); },
  argTypes: {
    value: { description: 'Value of barcode', control: {type: 'text'} },
    format: {
      description: 'format of barcode',
      control: { type: 'select' },
      options: ['CODE128', 'UPC', 'CODE39', 'EAN13', 'EAN8', 'ITF', 'MSI', 'codabar'],
    },
    width: { description: 'Width of each line', control: { type: 'range', min: 1, max: 10, step: 1 } },
    height: { description: 'Height of each line', control: { type: 'range', min: 10, max: 100, step: 10 } },
    background: { description: 'Background color',  control: 'color' },
    lineColor: { description: 'line color',  control: 'color' },
    displayValue: { description: 'to show text or not',  control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const CODE39: Story = { args: { value: 'CODE39 Barcode', format: 'CODE39' } };
export const CODE128: Story = { args: { value: 'Example1234', format: 'CODE128' } };
export const EAN13: Story = { args: { value: '5901234123457', format: 'EAN13' } };
export const UPC: Story = { args: { value: '123456789999', format: 'UPC' } };
export const EAN8: Story = { args: { value: '96385074', format: 'EAN8' } };
export const EAN5: Story = { args: { value: '12345', format: 'EAN5' } };
export const EAN2: Story = { args: { value: '12', format: 'EAN2' } };
export const ITF14: Story = { args: { value: '12345678901231', format: 'ITF14' } };
export const MSI: Story = { args: { value: '123456789', format: 'MSI' } };
export const codabar: Story = { args: { value: '1234567890', format: 'codabar' } };
