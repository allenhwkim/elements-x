import * as React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { BarCode } from './barcode';

!customElements.get('bar-code') && customElements.define('bar-code', BarCode);

const meta: Meta = { 
  component: BarCode as any,
  args: {
    value: 'Hello Bar Code',
    format: 'code128',
    width: 1,
    height: 100,
  },
  argTypes: {
    format: {
      control: { type: 'select' },
      options: ['CODE128', 'UPC', 'CODE39', 'EAN13', 'EAN8', 'ITF', 'MSI', 'pharmacode', 'codabar'],
    },
    value: {
      control: { type: 'select' },
      options: ['Hello Bar Code', '123456', '123456789012', '12345678', '12345678901234'],
    },
    width: { control: { type: 'range', min: 1, max: 10, step: 1 } },
    height: { control: { type: 'range', min: 10, max: 100, step: 10 } },
  },
};

export default meta;

export const Primary = {
  render(args) { 
    const [{ value, format, width, height }, updateArgs] = useArgs();
    return (<bar-code id="barcode" value={value} format={format} width={width} height={height}></bar-code>) 
  },
};