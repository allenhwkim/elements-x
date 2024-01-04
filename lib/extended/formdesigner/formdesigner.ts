import * as grapesjs from 'grapesjs';
import { addCss, removeCss } from '../../util';

import html from './formdesigner.html?raw';
import templateHtml from './formdesigner.template.html?raw';
import * as themeCssM from './formdesigner.theme.css?inline';
import * as stylesCssM from './formdesigner.styles.css?inline';

import { initGrapesJs } from './init-grapejs';
import { IForms } from '../stepper/types';
import { STEPPER_FORMS } from './formdesigner.forms';

const themeCSS = themeCssM.default;
const stylesCSS = stylesCssM.default;

export class FormDesigner extends HTMLElement {
  stepNames: string[] = Object.keys(STEPPER_FORMS); 
  step: string = ''; // e.g. 'adderss'
  editor: grapesjs.Editor = undefined as any;
  editorLoaded = false;

  _forms: IForms = STEPPER_FORMS;
  get forms() { return this._forms; }
  set forms(val) {
    this._forms = val;
    this.#setForms(val);
  }

  _template: string = templateHtml;
  get template() { return this._template;}
  set template(val) {
    this._template = val;
  }

  get html() { return this.editor.getHtml(); }
  set html(val) {
    this.#setHtml(val);
  }

  static get observedAttributes() {
    return ['step-names', 'step'];
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (this.editorLoaded) { 
      const iframe: any = this.querySelector('iframe');
      const ctrlEl: any = iframe.contentWindow.document.querySelector('x-stepper-controller');
      if (name === 'step-names') {
        ctrlEl && (ctrlEl.setAttribute('step-names', newValue.split(',').map(el => el.trim())));
      }
      if (name === 'step') {
        ctrlEl && await ctrlEl.setAttribute('step', newValue);
      }
    }
  }

  connectedCallback() {
    addCss(this.tagName, themeCSS + stylesCSS);
    this.classList.add('x', 'form-designer');

console.log(this.outerHTML);
    const useTemplate = this.getAttribute('use-template') !== 'false'; // default true
    const editTemplate = this.getAttribute('edit-template') !== null;  // default false
console.log({useTemplate, editTemplate}, this.getAttribute('edit-template'), this.getAttribute('use-template'));

    this.innerHTML = html;
    this.editor = initGrapesJs('#gjs');
    this.editor.BlockManager.getCategories().each((category, ndx) => {
      (ndx > 0) && category.set('open', false);
    });
    !editTemplate && this.editor.setStyle( // Disable interaction to stepper and buttons
      'x-stepper, .stepper.buttons {opacity: .5; pointer-events: none}' 
    );
    this.editor.on('load', e => {
      this.editorLoaded = true;
      this.template && useTemplate && this.#setHtml(this.template);
      this.forms && this.#setForms(this.forms);
    });
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  #setHtml(val: string) {
    this.editor?.setComponents(val);
  }

  #setForms(forms: IForms) {
    if (this.editorLoaded) {
      const iframe: any = this.querySelector('iframe');
      const ctrlEl: any = iframe?.contentWindow.document.querySelector('x-stepper-controller');
      ctrlEl && (ctrlEl.forms = forms);
    }
  }

}
