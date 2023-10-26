import * as React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Calendar } from './calendar';

!customElements.get('x-calendar') && customElements.define('x-calendar', Calendar);

const meta: Meta = { 
  component: Calendar as any,
  args: {
    date: new Date(),
    monthFormat: 'long',  // long(June), short(Jun), narrow(J)
    weekFormat: 'long',  // long(Monday), short(Mon), narrow(M)
    locale: 'en', // en-US, ja, ko, zh-CN
    firstDayOfWeek: 0,// 0(Sunday), 1(Monday)
    width: 600,
  },
  argTypes: {
    date: { control: { type: 'date' }, },
    monthFormat: { control: { type: 'radio' }, options: ['long', 'short', 'narrow'], },
    weekFormat: { control: { type: 'radio' }, options: ['long', 'short', 'narrow'], },
    locale: { control: { type: 'radio' }, options: ['en', 'ja', 'ko', 'zh-CN'], },
    firstDayOfWeek: {control: {type: 'radio'}, options: [0, 1, 6]},
    width: { control: { type: 'range', min: 200, max: 600, step: 20 } },
  },
};


export default meta;

export const Primary = {
  render(args) { 
    const [{ date, monthFormat, weekFormat, locale, firstDayOfWeek, width }, updateArgs] = useArgs();
    return (
      <x-calendar style={{width}}
        date={date} 
        month-format={monthFormat}
        week-format={weekFormat}
        locale={locale}
        first-day-of-week={firstDayOfWeek}
      >
      </x-calendar>)

  },
};
