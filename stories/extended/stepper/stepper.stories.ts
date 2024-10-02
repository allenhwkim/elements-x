import type { Meta } from '@storybook/html';
import { Stepper } from '../../../lib/extended/stepper/stepper';
import { fixIndent } from '../../../lib/util';

!customElements.get('x-stepper') && customElements.define('x-stepper', Stepper);

const meta: Meta = { 
  title: 'Extended/stepper',
  render: (args) => {
    const wrapperEl = document.createElement('div');
    wrapperEl.insertAdjacentHTML('beforeend', fixIndent(`
      <x-stepper 
        steps="${args.steps}" 
        active="${args.active}">
      </x-stepper> 
    `));
    return wrapperEl;
  },
  argTypes: {
    steps: { 
      description: 'step names', 
      control: { type: 'text'},
    },
    active: {
      description: 'Current active step name"',
      control: { type: 'text'},
    },
  },
};

export default meta;

export const Primary = { 
  args: { 
    steps: 'Step 1, Step 2, Step 3, Step 4',
    active: 'Step 2'
  }
}; 
export const Secondary = { 
  args: { 
    steps: 'Step1, Step2, Step3, Step4, Step5, Step6'
  }
}; 


