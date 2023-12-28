import type { Meta } from '@storybook/html';
import { Stepper } from '../../../lib/extended/stepper/stepper';
import { StepperController } from '../../../lib/extended/stepper/stepper-controller';
import { fixIndent } from '../../../lib/util';

const elName = 'x-stepper';
const className = Stepper;

!customElements.get(elName) && customElements.define(elName, className);
!customElements.get('x-stepper-controller') && customElements.define('x-stepper-controller', StepperController);

const meta: Meta = { 
  title: 'Extended/stepper',
  render: (args) => {
    const wrapperEl = document.createElement('div');
    const ctrlEl: any = document.createElement('x-stepper-controller');

    ctrlEl.insertAdjacentHTML('beforeend', fixIndent(`
      <x-stepper></x-stepper>
      <div class="stepper errors" style="padding: 16px"> Error goes here </div>
      <form class="stepper form" style="border: 1px dashed; padding: 16px"> Form goes here </form>
      <div class="stepper buttons" style="border: 1px dashed; padding: 16px">
        <button class="stepper-prev-btn">Prev</button>
        <button class="stepper-next-btn">Next</button>
        <button class="stepper-review-btn">Review</button>
        <button class="stepper-submit-btn">Submit</button>
        <button class="stepper-reset-btn">Reset</button>
      </div>
      <pre class="user-data"></pre>
    `));
    const stepperEl = ctrlEl.querySelector('x-stepper') as any;
    const userDataEl = ctrlEl.querySelector('.user-data') as any;
  
    ctrlEl.addEventListener('stepper-storage', (event: any) => {
      userDataEl.innerText = JSON.stringify(event.detail.data, null, '  ')
    });

    setTimeout(() => {
      args.forms && (stepperEl.forms = args.forms);
    });
    wrapperEl.append(ctrlEl);
    return wrapperEl;
  },
  argTypes: {
    forms: { 
      description: 'Form object to initialize stepper and form', 
      control: { type: 'object'},
      // table: { defaultValue: { summary:  JSON.stringify(DEFAULT_FORMS) } },
    }
  },
};

export default meta;

export const Primary = { 
  args: { 
  }
}; 


