import * as grapesjs from 'grapesjs';
import { addCss, removeCss } from '../../util';

import html from './formdesigner.html?raw';
import * as themeCssM from './theme.css?inline';
import * as stylesCssM from './styles.css?inline';

import { initGrapesJs } from './init-grapejs';
import { IForms } from '../stepper/types';

const themeCSS = themeCssM.default;
const stylesCSS = stylesCssM.default;

export class FormDesigner extends HTMLElement {
  _forms: IForms | undefined;
  get forms() { return this._forms; }
  set forms(val) {
    this._forms = val;
    this.#setForms(val);
  }

  _html= '';
  get html() { return this._html; }
  set html(val) {
    this._html = val;
    this.#setHtml(val);
  }

  stepNames: string[] | undefined; // e.g. ['address', 'review', 'thankyou']
  step: string = ''; // e.g. 'adderss'
  editor: grapesjs.Editor = undefined as any;
  editorLoaded = false;

  static get observedAttributes() {
    return ['step-names', 'step'];
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (this.editorLoaded) {
      const iframe: any = this.querySelector('iframe');
      const ctrlEl: any = iframe.contentWindow.document.querySelector('x-stepper-controller');
      if (name === 'step-names') {
        ctrlEl && (ctrlEl.stepNames = newValue.split(',').map(el => el.trim()));
      } else if (name === 'step') {
        ctrlEl && await ctrlEl.initForm(newValue);
      }
    }
  }

  connectedCallback() {
    addCss(this.tagName, themeCSS + stylesCSS);
    this.classList.add('x', 'form-designer');

    this.innerHTML = html;
    this.editor = initGrapesJs('#gjs');
    this.editor.on('load', e => {
      this.editorLoaded = true;
      this.html && this.#setHtml(this.html);
      this.forms && this.#setForms(this.forms);
    });
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  #setHtml(val) {
    this.editor?.setComponents(val);
  }

  #setForms(forms) {
    if (this.editorLoaded) {
      const iframe: any = this.querySelector('iframe');
      const ctrlEl: any = iframe?.contentWindow.document.querySelector('x-stepper-controller');
      ctrlEl && (ctrlEl.forms = forms);
    }
  }

}
