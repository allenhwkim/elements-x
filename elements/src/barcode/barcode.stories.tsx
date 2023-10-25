import * as React from 'react';
import type { Meta } from '@storybook/react';
import { BarCode } from './barcode';

!customElements.get('bar-code') && customElements.define('bar-code', BarCode);

const meta: Meta = { component: BarCode as any };

export default meta;

export const Primary = {
  render: () => <>
    <bar-code value="Hello Bar Code" format="code128">
    </bar-code>
  </>,
};