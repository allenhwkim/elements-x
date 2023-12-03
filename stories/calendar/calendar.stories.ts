import type { StoryObj, Meta } from '@storybook/html';
import {Calendar} from '../../lib/calendar/calendar';

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
!customElements.get(elName) && customElements.define(elName, Calendar);
function createElement(args) {
  const el = document.createElement(elName) as any;
  for (var key in args) {
    (key === 'date') && el.setAttribute('date', new Intl.DateTimeFormat(
      'fr-CA',{ month:'2-digit',day:'2-digit', year:'numeric'}).format(args.date));
    (key === 'weekFormat') && el.setAttribute('week-format', args[key]);
    (key === 'monthFormat') && el.setAttribute('month-format', args[key]);
    (key === 'locale') && el.setAttribute('locale', args[key]);
    (key === 'firstDayOfWeek') && el.setAttribute('first-day-of-week', args[key]);
    (key === 'required') && el.setAttribute('required', '');
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
    divEl.addEventListener('select', (event) => {
      msgEl.innerText = `'select' event: ${event.detail?.toString()}`;
    })
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
      description: 'Month display format, e.g., long(June), short(Jun), narrow(J)', 
      control: { type: 'radio' },
      options: ['long', 'short', 'narrow'],
      table: { defaultValue: { summary: 'long' } },
    },
    weekFormat: { 
      description: 'Weekday display format, e.g., long(Monday), short(Mon), narrow(M)', 
      control: { type: 'radio' },
      options: ['long', 'short', 'narrow'],
      table: { defaultValue: { summary: 'long' } },
    },
    locale: { 
      description: 'Language of calendar', 
      control: { type: 'radio' },
      options: ['en', 'ja', 'ko', 'zh-CN'],
      table: { defaultValue: { summary: 'en' } },
    },
    firstDayOfWeek: {
      description: 'Start day of week. 0(Sunday), 1(Monday), 6(Saturday)', 
      control: { type: 'radio' },
      options: [0, 1, 6],
      table: { defaultValue: { summary: 0 } },
    },
    required: {
      description: 'Required', 
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
  },
};

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Primary: Story = { args: { required: true}};
export const Simple: Story = { args: { required: true, locale: 'en', monthFormat: 'short', weekFormat: 'narrow', width: 200 } };
export const Korean: Story = { args: { required: true, locale: 'ko', date: new Date().setMonth(11), firstDayOfWeek: 6, width: 400 } };
export const Chinese: Story = { args: { required: true, locale: 'zh-CN', date: new Date().setMonth(0), weekFormat: 'short', width: 400 } };