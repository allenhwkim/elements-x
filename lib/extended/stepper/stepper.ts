import morphdom from 'morphdom/dist/morphdom-esm';
import { addCss, removeCss } from '../../util';
import * as cssM from './stepper.css?inline';
const css = cssM.default;

import { StepperController } from './stepper-controller';

export class Stepper extends HTMLElement {
  stepperCtrl: StepperController = undefined as any;

  get forms() {
    return this.stepperCtrl?.forms;
  }

  set forms(arg) {
    if (this.stepperCtrl) {
      this.stepperCtrl.forms = arg;
      this.stepperCtrl.stepNames = Object.keys(arg);
      this.stepperCtrl.initForm();
      this.render();
    }
  }

  _stepNames = [];
  get stepNames() {
    return this.stepperCtrl.stepNames;
  }

  set stepNames(arg) {
    this.stepperCtrl.stepNames = Object.keys(arg);
    this.stepperCtrl.initForm();
    this.render();
  }

  static get observedAttributes() {
    return ['step-names', 'step'];
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (name === 'step-names') {
      this.stepperCtrl.stepNames = newValue.split(',').map(el => el.trim());
    } else if (name === 'step') {
      this.stepperCtrl.initForm(newValue);
    }
  }

  connectedCallback() {
    addCss(this.tagName, css);
    this.classList.add('x', 'stepper');

    this.stepperCtrl = this.closest('.x.stepper-controller') as StepperController;
    if (!this.stepperCtrl) {
      console.error('[ERROR] in .x.stepper, missing .x.stepper-controller. wrap it with <x-stepper-controller>');
      return;
    }

    if (this.forms) {
      this.stepperCtrl.forms = this.forms;
      this.stepperCtrl.stepNames = Object.keys(this.forms);
    }

    this.stepperCtrl.initForm();
    this.addEventListener('click', (event: UIEvent) => {
      const formLinkEl = (event.target as any).closest('.stepper-link');
      const formStepEl = (event.target as any).closest('.form-step');
      const visitable = !formStepEl.classList.contains('incomplete');
      const formName = formLinkEl.dataset?.name;
      const submitted = this.stepperCtrl.currentForm.type === 'submit';
      if (formName && visitable && !submitted) {
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
    if (!this.forms) return `Error. missing forms`;

    this.innerHTML = '';
    const formCtrl = this.stepperCtrl;
    let html = ``;
    formCtrl.stepNames.forEach( (formId: string, index: number) => {
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

