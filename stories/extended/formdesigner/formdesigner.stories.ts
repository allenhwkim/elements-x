
import type { Meta } from '@storybook/html';
import { FormDesigner } from '../../../lib/extended/formdesigner/formdesigner';
import DEFAULT_HTML from './DEFAULT_HTML.html?raw';
import { DEFAULT_FORMS } from './DEFAULT_FORMS';

const elName = 'x-formdesigner';
const className = FormDesigner;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Extended/FormDesigner',
  render: (args) => {
    const custEl = document.createElement(elName) as any;
    const containerEl = document.createElement('div');
    const msgEl = document.createElement('div');
    containerEl.addEventListener('select', (event: any) => {
      msgEl.innerText = `'select' event: ${JSON.stringify(event.detail)}. Check console for details`
    });

    args.forms && (custEl.forms = args.forms);
    args.html && (custEl.html = args.html);
    args.stepNames && custEl.setAttribute('step-names', args.stepNames);
    args.step && custEl.setAttribute('step', args.step);

    containerEl.append(custEl, msgEl);
    return containerEl;
  },
  argTypes: {
    html: { description: 'inner HTML of editor', control: {type: 'text'}},
    forms: { 
      description: 'forms object. key is form name and value is form property', 
      control: {type: 'text'} 
    },
    stepNames: { 
      description: 'array of step names for x-stepper',
      control: { type: 'object' },
    },
    step: {
      description: 'current step name',
      control: { type: 'text' },
    },
  },
};


export default meta;

export const Primary = { 
  args: {
    html: DEFAULT_HTML,
    forms: DEFAULT_FORMS,
    stepNames: Object.keys(DEFAULT_FORMS),
    step: 'Name'
  }
};