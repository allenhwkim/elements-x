import morphdom from 'morphdom/dist/morphdom-esm';
import { addCss, removeCss } from '../util';
import css from './stepper.css';

import { StepperController } from './stepper-controller';
import { StepperStorage } from './stepper-storage';
import { ISubmitFunc } from './types';

export class Stepper extends HTMLElement {
  StepperController: StepperController = undefined as any;

  get forms() {
    return this.StepperController?.forms;
  }

  set forms(arg) {
    if (this.StepperController) {
      this.StepperController.forms = arg;
      this.StepperController.steps = Object.keys(arg);
      this.StepperController.initForm();
      this.render();
    }
  }

  _submitFunc: ISubmitFunc = (data) => Promise.resolve('default submit func');
  get submitFunc() { return this._submitFunc; }
  set submitFunc(val) {
    this._submitFunc = val;
    this.StepperController.submitFunc = this.submitFunc;
  }

  _steps = [];
  get steps() {
    return this.StepperController.steps;
  }

  set steps(arg) {
    this.StepperController.steps = Object.keys(arg);
    this.StepperController.initForm();
    this.render();
  }

  constructor() { 
    super();

  }

  connectedCallback() {
    addCss(this.tagName, css);

    this.StepperController = this.closest('x-stepper-controller') as StepperController;

    if (this.forms) { // data-form attribute
      this.StepperController.forms = this.forms;
      this.StepperController.steps = Object.keys(this.forms);
      this.StepperController.submitFunc = this.submitFunc;
    }

    this.StepperController.initForm();
    this.addEventListener('click', (event: UIEvent) => {
      const formLinkEl = (event.target as any).closest('.stepper-link');
      const formStepEl = (event.target as any).closest('.form-step');
      const visitable = !formStepEl.classList.contains('incomplete');
      const formName = formLinkEl.dataset?.name;
      const isThankyouStatus = this.StepperController.currentForm.type === 'thankyou';
      if (formName && visitable && !isThankyouStatus) {
        const customEvent = new CustomEvent('stepper-goto', {bubbles: true, detail: formName}) as any;
        event.target?.dispatchEvent(customEvent);
      }
    });
    
    this.render();
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  getNewHtml() {
    if (!(this.forms && this.submitFunc)) {
      return `Error. missing forms and/or submit data`;
    }

    this.innerHTML = '';
    const formCtrl = this.StepperController;
    let html = ``;
    formCtrl.steps.forEach( (formId: string, index: number) => {
      const activeClass = formId === formCtrl.currentFormId ? ' active' : '';
      const formProp = formCtrl.forms[formId];
      const formType = formProp.type ? ` ${formProp.type}` : '';
      const label = index + 1;
      html += `
        <div class="form-step ${formCtrl.getStatus(formId)}${activeClass}${formType}">
          ${ index ? `<div class="connection-line"></div>`: '' }
          <div class="stepper-link" data-name="${formId}">
            <!-- ${ formCtrl.getStatus(formId)}${activeClass} -->
            <div class="stepper-label">${label}</div>
            <div class="stepper-title">${formProp.title || formId}</div>
            <div class="stepper-desc">${formProp.subTitle || ''}</div>
          </div>
        </div>
      `;
    });
    return html;
  }

  // called when attribute/props changes and connectedCallback
  // run as debounced since it's called from many places and often
  #timer: any;
  render() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const newHTML = await this.getNewHtml();
      const updated = document.createElement('div');
      updated.innerHTML += newHTML;
      morphdom(this, updated, { childrenOnly: true }); 
    }, 50);
  }
}

