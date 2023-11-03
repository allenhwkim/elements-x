import type { StoryObj, Meta } from '@storybook/html';
import {Calendar} from './calendar';

Calendar.GET_DAY_INFO = function(date) {
  const monthDay = [date.getMonth()+1, date.getDate()].join('-');
  switch(monthDay) {
    case '1-1': return {type: 'Statuory holiday', name: 'New years day'}
    case '12-25': return {type: 'Statuory holiday', name: 'Christmas'}
    case '10-20': return {type: 'Birthday', name: 'John Birthday'}
  }
} as any;

Calendar.IS_SELECTABLE = function(date) {
  const dayInfo = Calendar.GET_DAY_INFO(date) as any;
  return dayInfo?.type !== 'Statuory holiday';
}

const elName = 'x-calendar';
const elAttributes = ['date', 'month-format', 'week-format', 'locale', 'first-day-of-week'];

!customElements.get(elName) && customElements.define(elName, Calendar);
function createElement(args) {
  const el = document.createElement(elName) as any;
  for (var key in args) {
    const val = key === 'date' ? new Date(args[key]).toISOString().slice(0,10):  args[key];
    elAttributes.includes(key) ?  el.setAttribute(key, val) : (el.props[key] = val);
  }
  args.width && (el.style.width = `${args.width}px`);
  return el;
}

// More on how to set up stories at: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta = {
  title: 'Calendar',
  // tags: ['autodocs'],
  render: (args) => {
    const divEl = document.createElement('div') as any;
    divEl.className = 'text-center';
    const msgEl = document.createElement('div') as any;
    divEl.appendChild(createElement(args));
    divEl.appendChild(msgEl);
    divEl.addEventListener('select', (event) => msgEl.innerText = `'select' event: ${event.detail.toDateString()}`);
    return divEl;
  },
  args: {},
  argTypes: {
    date: { 
      description: 'Start day of calendar', 
      default: 'The current date', 
      control: 'date',
      table: { defaultValue: { summary: 'today' } },
    },
    monthFormat: { 
      default: 'long', 
      description: 'Month display format, e.g., long(June), short(Jun), narrow(J)', 
      control: { type: 'radio' },
      options: ['long', 'short', 'narrow'],
      table: { defaultValue: { summary: 'long' } },
    },
    weekFormat: { 
      default: 'long', 
      description: 'Weekday display format, e.g., long(Monday), short(Mon), narrow(M)', 
      control: { type: 'radio' },
      options: ['long', 'short', 'narrow'],
      table: { defaultValue: { summary: 'long' } },
    },
    locale: { 
      default: 'en', 
      description: 'Language of calendar', 
      control: { type: 'radio' },
      options: ['en', 'ja', 'ko', 'zh-CN'],
      table: { defaultValue: { summary: 'en' } },
    },
    firstDayOfWeek: {
      default: 0, 
      description: 'Start day of week. 0(Sunday), 1(Monday), 6(Saturday)', 
      control: { type: 'radio' },
      options: [0, 1, 6],
      table: { defaultValue: { summary: 0 } },
    },
  },
};

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Primary: Story = {};
export const Simple: Story = { args: { locale: 'en', monthFormat: 'short', weekFormat: 'narrow', width: 200 } };
export const Korean: Story = { args: { locale: 'ko', date: new Date().setMonth(11), firstDayOfWeek: 6, width: 400 } };
export const Chinese: Story = { args: { locale: 'zh-CN', date: new Date().setMonth(0), weekFormat: 'short', width: 400 } };