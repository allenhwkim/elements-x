import * as React from 'react';
import type { Meta } from '@storybook/react';
import { InputTable } from './input-table';

!customElements.get('input-table') && customElements.define('input-table', InputTable);

const meta: Meta = { component: InputTable as any };

export default meta;

export const Primary = {
  render: () => <>
    <input-table>
      <template>
        <div>
          <input name="foo[][x]"></input>
          <input name="foo[][y]"></input>
        </div>
      </template>
    </input-table>
  </>,
};