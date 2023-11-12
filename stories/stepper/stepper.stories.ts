import type { Meta } from '@storybook/html';
import { Stepper } from '../../lib/stepper/stepper';
import { StepperController } from '../../lib/stepper/stepper-controller';
import { DEFAULT_FORMS } from '../../lib/stepper/default-forms';
import { DEFAULT_SUBMIT_FUNC } from "../../lib/stepper/default-submit-func"; // Shares the same FormController
import { StepperStorage } from "../../lib/stepper/stepper-storage"; // Shares the same FormController
import { fixIndent } from '../../lib/util';
import { IUserData } from '../../lib/stepper/types';

const elName = 'x-stepper';
const className = Stepper;

!customElements.get(elName) && customElements.define(elName, className);
!customElements.get('x-stepper-controller') && customElements.define('x-stepper-controller', StepperController);

const meta: Meta = { 
  title: 'Stepper',
  render: (args) => {
    const wrapperEl = document.createElement('div');
    const ctrlEl: any = document.createElement('x-stepper-controller');

    ctrlEl.insertAdjacentHTML('beforeend', fixIndent(`
      <x-stepper></x-stepper>
      <div class="stepper errors" style="padding: 16px"> Error goes here </div>
      <form class="stepper form" style="border: 1px dashed; padding: 16px"> Form goes here </form>
      <div class="stepper buttons" style="border: 1px dashed; padding: 16px">
        <button class="form-prev">Prev</button>
        <button class="form-next">Next</button>
        <button class="form-review">Review</button>
        <button class="form-submit">Submit</button>
        <button class="form-reset">Reset</button>
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
      args.submitFunc && (stepperEl.submitFunc = args.submitFunc);
    });
    wrapperEl.append(ctrlEl);
    return wrapperEl;
  },
  argTypes: {
    forms: { 
      description: 'Form object to initialize stepper and form', 
      control: { type: 'object'},
      table: { defaultValue: { summary:  DEFAULT_FORMS } },
    },
    submitFunc: { 
      description: 'Function to be called when submit button is clicked.', 
      control: { type: 'object'},
      table: { defaultValue: { summary:  DEFAULT_SUBMIT_FUNC } },
    },
  },
};

export default meta;

export const Primary = { 
  args: { 
    forms: DEFAULT_FORMS,
    submitFunc : DEFAULT_SUBMIT_FUNC,  
  }
}; 


