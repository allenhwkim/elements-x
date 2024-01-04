
import type { Meta } from '@storybook/html';
import { FormDesigner } from '../../../lib/extended/formdesigner/formdesigner';

const elName = 'x-formdesigner';
const className = FormDesigner;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Extended/FormDesigner',
  render: (args) => {
    const custEl = document.createElement(elName) as any;
    args.useTemplate && custEl.setAttribute('use-template', args.useTemplate);
    args.editTemplate && custEl.setAttribute('edit-template', args.editTemplate);

    const containerEl = document.createElement('div');
    const msgEl = document.createElement('div');
    containerEl.addEventListener('select', (event: any) => {
      msgEl.innerText = `'select' event: ${JSON.stringify(event.detail)}. Check console for details`
    });

    containerEl.append(custEl, msgEl);

    setTimeout(() => {
      args.forms && (custEl.forms = args.forms);
      args.html && (custEl.html = args.html);
      args.stepNames && custEl.setAttribute('step-names', args.stepNames);
      args.step && custEl.setAttribute('step', args.step);
    }, 500);
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
      control: { type: 'text' },
    },
    step: {
      description: 'current step name',
      control: { type: 'text' },
    },
    useTemplate: {
      description: 'true or false, Default, true. To use template when init editor html',
      control: { type: 'boolean' },
    },
    editTemplate: {
      description: 'true or false, Default, false. Set true to update template',
      control: { type: 'boolean' },
    },
  },
};


export default meta;

export const Primary = { 
  args: {
    step: 'Name',
    useTemplate: true,
    editTemplate: false,
  }
};