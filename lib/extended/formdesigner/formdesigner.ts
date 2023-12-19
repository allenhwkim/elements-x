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
  forms: IForms | undefined;
  html: string = '';
  stepNames: string[] | undefined;
  step: string = '';
  editor: grapesjs.Editor = undefined as any;
  editorLoaded = false;

  static get observedAttributes() {
    return ['step-names', 'step'];
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (this.editorLoaded && (oldValue !== newValue)) {
      const stepNames = this.getAttribute('step-names')?.split(',');
      const step = this.getAttribute('step') || stepNames?.[0];
      
      const iframe: any = this.querySelector('iframe');
      const ctrlEl: any = iframe.contentWindow.document.querySelector('x-stepper-controller');
      ctrlEl && (ctrlEl.stepNames = stepNames);
      ctrlEl && await ctrlEl.initForm(step);
    }
  }


  connectedCallback() {
    addCss(this.tagName, themeCSS + stylesCSS);
    this.classList.add('x', 'form-designer');

    this.innerHTML = html;
    this.editor = initGrapesJs('#gjs');
    this.html && this.setHtml(this.html);
    this.editor.on('load', e => {
      this.editorLoaded = true;
      if (this.forms) {
        const iframe: any = this.querySelector('iframe');
        const ctrlEl: any = iframe.contentWindow.document.querySelector('x-stepper-controller');
        ctrlEl && (ctrlEl.forms = this.forms);
      }
    });
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  runCommand(command: string, options: any) {
    this.editor.runCommand(command, options); 
  }
  
  on(eventName: string, eventListener: any) { // update, undo, redo, load
    this.editor.on(eventName, eventListener);
  }

  /* utility functions */
  getHtml() { return this.editor.getHtml(); }
  setStyle(css: string) { this.editor.setStyle(css); }
  setHtml(html: string) { this.editor.setComponents(html); }

}
