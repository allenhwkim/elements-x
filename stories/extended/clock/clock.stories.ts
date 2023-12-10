import type { StoryObj, Meta } from '@storybook/html';
import { Clock } from '../../../lib/extended/clock/clock';
import timezones from './timezones';

!customElements.get('x-clock') && customElements.define('x-clock', Clock);


// More on how to set up stories at: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta = {
  title: 'Extended/Clock',
  tags: ['autodocs'],
  render: (args) => {
    const el = document.createElement('x-clock') as any;
    args.hour && el.setAttribute('hour', args.hour);
    args.minute && el.setAttribute('minute', args.minute);
    args.timezone && el.setAttribute('timezone', args.timezone);
    (args.run !== undefined) && el.setAttribute('run', args.run);
    return el;
  },
  argTypes: {
    hour: { description: 'hour', control: { type: 'range', min: 0, max: 23, step: 1 } },
    minute: { description: 'minute', control: { type: 'range', min: 0, max: 59, step: 1 } },
    timezone: { 
      description: 'Timezone, e.g. Asia/Seoul',       
      control: { type: 'select' },
      options: timezones 
    },
    run: { description: 'Indicates to run a clock or not',  control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {};
export const ByHourMinute: Story = { args: { hour: 23, minute: 59, run: true } };
export const ByTimezone: Story = { 
  render: () => `
    <div class="d-inline-block text-center">
      <x-clock timezone="Asia/Seoul" run></x-clock>
      <div>Seoul</div>
    </div>
    <div class="d-inline-block text-center">
      <x-clock timezone="Europe/London" run></x-clock> 
      <div>London</div>
    </div>
    <div class="d-inline-block text-center">
      <x-clock timezone="America/New_York" run></x-clock> 
      <div>New York</div>
    </div>
  `
};
