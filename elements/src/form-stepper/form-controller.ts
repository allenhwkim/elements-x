import { DEFAULT_FORMS } from '../default-forms';
import { IForms, IForm, IUserData, ISubmitData } from './types';
import { AppStorage } from '../app-storage';
import { FormStepper } from './form-stepper';
import { DEFAULT_SUBMIT_DATA } from '../default-submit-data';

export class FormController extends HTMLElement {
  forms: IForms;
  steps: string[]; // ids of reactflow Node
  currentForm: IForm = undefined as any;
  currentStepIndex: number = -1;

  _currentFormId: string = ''; // id of reactflow Node
  get currentFormId() { return this._currentFormId; }
  set currentFormId(val: string) {
    this._currentFormId = val;
    this.currentForm = this.forms[val] || {};
    this.currentStepIndex = this.steps.indexOf(val);
  }

  constructor() {
    super();
    this.forms = {};
    this.steps = Object.keys(DEFAULT_FORMS);
  }

  connectedCallback() {
    this.addEventListener('form-goto', (event: any) => this.initForm(event.detail));
    this.addEventListener('click', this.clickListener);
  }

  getFormStepper = () => this.querySelector('form-stepper') as FormStepper;
  getFormErrorsEl = () => this.querySelector('.form-errors') as HTMLElement;
  getFormEl = () => this.querySelector('form.form-flow') as HTMLFormElement;
  getButtonsEl = () => this.querySelector('.form-buttons') as HTMLElement;
  
  clickListener = (event: any) => {
    const buttonEl = event.target.closest('.form-review, .form-submit, .form-prev, .form-next');
    if (buttonEl) {
      if (buttonEl.classList.contains('form-review')) {
        this.initForm('review'); 
      } else if (buttonEl.classList.contains('form-submit')) {
        this.initForm('submit'); // submit and show thankyou message
      } else if (buttonEl.classList.contains('form-prev')) {
        this.initForm('prev'); 
      } else if (buttonEl.classList.contains('form-next')) { 
        const errors = this.setErrors();
        if (!errors) { // set error classes and contents of .form-errors 
          const formEl = this.getFormEl();
          const formElData = Object.fromEntries(new FormData(formEl).entries())
          if (Object.keys(formElData).length) {
            const userData = AppStorage.getItem('currentFormflow.userData') || {};
            userData[this.currentFormId] = formElData;
            AppStorage.setItem('currentFormflow.userData', userData);
          }
          this.initForm('next');
        }
      }
    }
  }

  async initForm(target: string = 'auto') {
    let nextStepIndex = 0;
    if (target === 'auto') {
      nextStepIndex = this.steps.findIndex(formName => this.getStatus(formName) !== 'complete');
    } else if (['review', 'submit', 'prev', 'next'].includes(target)) {
      if (target === 'review') {
        nextStepIndex = this.steps.findIndex(formName => (this.forms[formName] as IForm)?.type === 'review');
      } else if (target === 'submit') {
        await this.submitForm();
        nextStepIndex = this.steps.findIndex(formName => (this.forms[formName] as IForm)?.type === 'submit');
      } else if (target === 'prev') {
        nextStepIndex = (this.currentStepIndex - 1) % this.steps.length;
      } else if (target === 'next') {
        nextStepIndex = (this.currentStepIndex + 1) % this.steps.length;
      }
    } else if (this.steps.indexOf(target)) {
      nextStepIndex = this.steps.indexOf(target);
    }

    this.currentFormId = this.steps[nextStepIndex];
    this.initStepperEl();
    this.initFormEl();
    this.initButtonsEl();
  }

  getStatus(formId: string): 'complete' | 'incomplete'  { 
    const userData = AppStorage.getItem('currentFormflow.userData');
    return userData?.[formId] ? 'complete' : 'incomplete'; // user has visited this formName already and saved data 
  }

  initStepperEl(): void {
    this.getFormStepper().render();
  }

  async initFormEl(): Promise<void> { // set innerHTML of <form> element
    const formEl = this.getFormEl();
    const html = this.currentForm.html;
    if (formEl) {
      if (typeof html === 'string' && html.match(/^http/)) {
        window.fetch(html)
          .then(resp => resp.text())
          .then(resp => formEl.innerHTML = resp)
          .catch(error => formEl.innerHTML = error)
      } else if (typeof html === 'function') {
        formEl.innerHTML = html();
      } else {
        formEl.innerHTML = html as string;
      }

      const currentFormUserData = 
        AppStorage.getItem('currentFormflow.userData')?.[this.currentFormId] || {};
      for (var key in currentFormUserData) {
        const el = formEl.elements[key as any] as HTMLInputElement;
        const value = currentFormUserData[key];
        if (el.type === 'checkbox') {
          el.checked = ['on', el.value].includes(value);
        } else if (el.type === 'radio') {
          el.checked = value === el.value;
        } else {
          el.value = value;
        }
      }
    }
  }  

  initButtonsEl(): void { // set buttons text and availability
    const reviewButtonEl = this.getButtonsEl().querySelector('.form-review');
    const submitButtonEl = this.getButtonsEl().querySelector('.form-submit');
    const prevButtonEl = this.getButtonsEl().querySelector('.form-prev') as HTMLButtonElement;
    const nextButtonEl = this.getButtonsEl().querySelector('.form-next') as HTMLButtonElement;

    // 0-1-2-3-current -> enabled,  current-1-2-3-review -> disabled
    if (prevButtonEl) {
      prevButtonEl.disabled = !(this.currentStepIndex > 0) || this.currentForm.type === 'submit';
    }
    // 0-1-2-3-current -> disabled, current-1-2-3-review -> enabled
    nextButtonEl && (nextButtonEl.disabled = !(this.currentStepIndex !== this.steps.length - 1));
    if (reviewButtonEl) { // do not set inline style here. Grapejs not handling well by setting it outside
      const shouldShow = this.isReviewable() && (['review', 'submit'].indexOf(this.currentForm.type) === -1);
      shouldShow ? reviewButtonEl.removeAttribute('hidden') : reviewButtonEl.setAttribute('hidden', '');
    }
    if (submitButtonEl) {
      const shouldShow = this.currentForm.type === 'review';
      shouldShow ? submitButtonEl.removeAttribute('hidden') : submitButtonEl.setAttribute('hidden', '');
    }
  }

  setErrors(): string[] | void {
    const formEl = this.getFormEl();
    const errorsEl = this.getFormErrorsEl();
    errorsEl && (errorsEl.innerHTML = '');
    formEl.classList.add('error-checked');

    const nativeErrors: string[] = [];
    Array.from(formEl.elements).forEach( (el: any) => {
      el.classList.remove('error');
      if (!el.checkValidity()) {
        el.classList.add('error');
        const errorMessage = `${el.name || el.tagName}: ${el.validationMessage}`;
        !nativeErrors.includes(errorMessage) && nativeErrors.push(errorMessage);
      }
    });
    if (errorsEl && nativeErrors.length) {
      nativeErrors.forEach(el => errorsEl.insertAdjacentHTML('beforeend', `<div class="error">${el}</div>`))
      return nativeErrors;
    }

    const formElData = Object.fromEntries(new FormData(formEl).entries());
    const getErrorFunc = (this.forms[this.currentFormId] as IForm).getErrors;
    const customUserErrors = getErrorFunc && getErrorFunc(formElData);
    if (errorsEl && customUserErrors) {
      customUserErrors.forEach( (el: any) => {
        errorsEl.insertAdjacentHTML('beforeend', `<div class="error">${el}</div>`);
      })
      return customUserErrors;
    }
  }

  isReviewable(): boolean {
    // complete - skippable - skippable - review => true
    // incomplete - skippable - skippable - review => false
    for (var i = 0; i < this.steps.length; i++) {
      const stepName = this.steps[i];
      const stepStatus = this.getStatus(stepName);
      const form = this.forms[stepName] as IForm;
      if (form.type === 'review') {
        return true;
      } else if (!(stepStatus === 'complete' || form.skippable)) {
        return false;
      } else {
        console.debug('FormController.isReviewable()', {stepStatus})
      }
    }
    return false;
  }

  submitForm(): Promise<any> {
    const formUserData: IUserData = AppStorage.getItem('currentFormflow.userData') || {};
    const submitData: ISubmitData = AppStorage.getItem('currentFormflow.submitData');
    if (submitData) {
      const payload = typeof submitData.payload === 'function' ? 
        JSON.stringify(submitData.payload(formUserData)) : JSON.stringify(formUserData);

      const {url, method, headers, onSuccess, onError} = submitData;
      this.getButtonsEl().querySelectorAll('button').forEach( (el: any) => el.disabled = true);
      return window.fetch(url, { method: method, headers: headers, body: payload })
        .then(response => response.json())
        .then(response => {
          submitData.onSuccess?.(response);
          AppStorage.removeItem('currentFormflow.userData');
        })
        .catch(error => submitData.onError?.(error))
        .finally(() => {})
    } else {
      return Promise.resolve('no submit data provided')
    }
  }

  showStep(step: string) {
    this.currentFormId = step;
    this.initStepperEl();
    this.initFormEl();
    this.initButtonsEl();
  }
}
