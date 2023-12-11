import { IForms, IForm, IUserData, ISubmitFunc } from './types';
import { StepperStorage } from './stepper-storage';
import { Stepper } from './stepper';

export class StepperController extends HTMLElement {
  stepNames: string[]; // ids of reactflow Node
  submitFunc: ISubmitFunc; // function used when submit clicked.
  currentForm: IForm = undefined as any;
  currentStepIndex: number = -1;

  _currentFormId: string = ''; // id of reactflow Node
  get currentFormId() { return this._currentFormId; }
  set currentFormId(val: string) {
    this._currentFormId = val;
    this.currentForm = this.forms[val] || {};
    this.currentStepIndex = this.stepNames.indexOf(val);
  }

  _forms: IForms;
  get forms() { return this._forms;}
  set forms(val: any) { 
    this._forms = val;
    this.stepNames = Object.keys(val);
    this.initForm('auto');
  }

  constructor() {
    super();
    this._forms = {};
    this.stepNames = [];
    this.submitFunc = (data) => Promise.resolve(true);
  }

  connectedCallback() {
    StepperStorage.baseEl = this;
    this.addEventListener('stepper-goto', (event: any) => this.initForm(event.detail));
    this.addEventListener('click', this.clickListener);
  }

  getFormEl = () => this.querySelector('form.stepper.form') as HTMLFormElement;
  getButtonsEl = () => this.querySelector('.stepper.buttons') as HTMLElement;

  getStatus(formId: string): 'complete' | 'incomplete'  { 
    const formIdNdx = this.stepNames.indexOf(formId);
    const currentNdx = this.stepNames.indexOf(this.currentFormId);

    if (currentNdx > formIdNdx) { // make all previous steps complete
      return 'complete';
    } else {
      const userData = StepperStorage.getItem('stepper.userData');
      return userData?.[formId] ? 'complete' : 'incomplete'; // user has visited this formName already and saved data 
    }
  }

  getErrors(): any[] {
    const nativeErrors: string[] = [];
    let customUserErrors: string[] = [];

    const formEl = this.getFormEl();
    if (formEl?.elements) {
      formEl.classList.add('error-checked');

      Array.from(formEl.elements).forEach( (el: any) => {
        el.classList.remove('error');
        if (!el.checkValidity()) {
          el.classList.add('error');
          const errorMessage = `${el.name || el.tagName}: ${el.validationMessage}`;
          !nativeErrors.includes(errorMessage) && nativeErrors.push(errorMessage);
        }
      });

      const formElData = Object.fromEntries(new FormData(formEl).entries());
      const getErrorFunc = (this.forms[this.currentFormId] as IForm).getErrors;
      getErrorFunc && (customUserErrors = getErrorFunc(formElData) as string[]);
    }
    return [...nativeErrors, ...customUserErrors];
  }

  isReviewable(): boolean {
    // complete - skippable - skippable - review => true
    // incomplete - skippable - skippable - review => false
    for (var i = 0; i < this.stepNames.length; i++) {
      const stepName = this.stepNames[i];
      const stepStatus = this.getStatus(stepName);
      const form = this.forms[stepName] as IForm;
      if (form.type === 'review') {
        return true;
      } else if (!(stepStatus === 'complete' || form.skippable)) {
        return false;
      } else {
        console.debug('StepperController.isReviewable()', {stepStatus})
      }
    }
    return false;
  }
  
  clickListener = async (event: any) => {
    const buttonEl = event.target.closest('.form-review, .form-submit, .form-prev, .form-next, .form-reset');
    if (buttonEl) {
      if (buttonEl.classList.contains('form-reset')) {
        this.resetForm(); 
      } else if (buttonEl.classList.contains('form-review')) {
        this.initForm('review'); 
      } else if (buttonEl.classList.contains('form-submit')) {
        await this.submitForm();
        this.initForm('thankyou'); // submit and show thankyou message
      } else if (buttonEl.classList.contains('form-prev')) {
        this.initForm('prev'); 
      } else if (buttonEl.classList.contains('form-next')) { 
        const errors = this.getErrors();
        const errorsEl = this.querySelector('.stepper.errors') as HTMLElement;
        if (errorsEl && errors.length) {
          errorsEl.innerHTML = '';
          errors.forEach(el => errorsEl.insertAdjacentHTML('beforeend', `<div class="error">${el}</div>`))
        } else { // save user data
          const formEl = this.getFormEl();
          if (formEl) {
            const formElData = Object.fromEntries(new FormData(formEl).entries()) || {};
            const userData = StepperStorage.getItem('stepper.userData') || {};
            userData[this.currentFormId] = formElData;
            StepperStorage.setItem('stepper.userData', userData);
          }
          this.initForm('next');
        }
      }
    }
  }
  
  resetForm() {
    StepperStorage.removeItem('stepper.userData'); 
    this.initForm('auto');
  }

  async initForm(target: string = 'auto') {
    let nextStepIndex = 0;
    if (target === 'auto') {
      nextStepIndex = Math.max(this.stepNames.findIndex(formName => this.getStatus(formName) !== 'complete'), 0);
    } else if (['review', 'thankyou', 'prev', 'next'].includes(target)) {
      if (target === 'review') {
        nextStepIndex = this.stepNames.findIndex(formName => (this.forms[formName] as IForm)?.type === 'review');
      } else if (target === 'thankyou') {
        nextStepIndex = this.stepNames.findIndex(formName => (this.forms[formName] as IForm)?.type === 'thankyou');
      } else if (target === 'prev') {
        nextStepIndex = (this.currentStepIndex - 1) % this.stepNames.length;
      } else if (target === 'next') {
        nextStepIndex = (this.currentStepIndex + 1) % this.stepNames.length;
      }
    } else if (this.stepNames.indexOf(target)) {
      nextStepIndex = this.stepNames.indexOf(target);
    }

    this.currentFormId = this.stepNames[nextStepIndex];

    (this.querySelector('x-stepper') as Stepper).render();
    this.initFormEl();
    this.initButtonsEl();
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
        const userData = StepperStorage.getItem('stepper.userData');
        formEl.innerHTML = html(userData);
      } else {
        formEl.innerHTML = html as string;
      }

      const currentFormUserData = 
        StepperStorage.getItem('stepper.userData')?.[this.currentFormId] || {};
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
    const reviewButtonEl = this.getButtonsEl().querySelector('.review');
    const submitButtonEl = this.getButtonsEl().querySelector('.submit');
    const prevButtonEl = this.getButtonsEl().querySelector('.prev') as HTMLButtonElement;
    const nextButtonEl = this.getButtonsEl().querySelector('.next') as HTMLButtonElement;

    // 0-1-2-3-current -> enabled,  current-1-2-3-review -> disabled
    if (prevButtonEl) {
      prevButtonEl.disabled = !(this.currentStepIndex > 0) || this.currentForm.type === 'thankyou';
    }
    // 0-1-2-3-current -> disabled, current-1-2-3-review -> enabled
    nextButtonEl && (nextButtonEl.disabled = !(this.currentStepIndex !== this.stepNames.length - 1));
    if (reviewButtonEl) { // do not set inline style here. Grapejs not handling well by setting it outside
      const shouldShow = this.isReviewable() && (['review', 'thankyou'].indexOf(this.currentForm.type) === -1);
      shouldShow ? reviewButtonEl.removeAttribute('hidden') : reviewButtonEl.setAttribute('hidden', '');
    }
    if (submitButtonEl) {
      const toShowSubmitBtn = this.currentForm.type === 'review';
      if (toShowSubmitBtn) {
        submitButtonEl.removeAttribute('hidden');
        nextButtonEl.setAttribute('hidden', '');
      } else {
        submitButtonEl.setAttribute('hidden', '');
        nextButtonEl.removeAttribute('hidden');
      }
    }
  }

  async submitForm(): Promise<any> {
    const formUserData: IUserData = StepperStorage.getItem('stepper.userData') || {};
    const response = await this.submitFunc(formUserData);
    StepperStorage.removeItem('stepper.userData');
    return response;
  }
}
