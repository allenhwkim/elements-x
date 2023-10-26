import * as React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Calendar } from './calendar';

!customElements.get('x-calendar') && customElements.define('x-calendar', Calendar);

const meta: Meta = { component: Calendar as any };

export default meta;

export const Primary = {
  render(args) { 
    return (<x-calendar></x-calendar>)
  },
};

export const Mini = {
  render(args) { 
    return (<x-calendar class="small" date="2022-12-31" multiple="true"></x-calendar>)
  },
};