import * as React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { BarCode } from './barcode';

!customElements.get('bar-code') && customElements.define('bar-code', BarCode);

const meta: Meta = { component: BarCode as any };

export default meta;

export const Primary = {
  args: {
    value: 'Hello Bar Code',
    format: 'code128',
  },
  render(args) { 
    const [{ value, format }, updateArgs] = useArgs();
    function updateBarcode(value, format) {
      updateArgs({value, format});
    }

    return (<>
      <bar-code id="barcode" value={value} format={format}></bar-code><br/>
      <button onClick={()=> updateBarcode('123456789012', 'upc')}>UPC</button>
      <button onClick={()=> updateBarcode('Hello Barcode', 'code128')}>Code128</button>
      <button onClick={()=> updateBarcode('Hello World', 'code39')}>Code39</button>
    </>) 
  },
};