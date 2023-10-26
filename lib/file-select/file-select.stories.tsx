import * as React from 'react';
import type { Meta } from '@storybook/react';
import { FileSelect } from './file-select';

!customElements.get('file-select') && customElements.define('file-select', FileSelect);

const meta: Meta = { component: FileSelect as any };

export default meta;

export const Primary = {
  render: () => <>
    <file-select></file-select>
  </>,
};