import  grapesjs from 'grapesjs';
import { addCss, removeCss } from '../../util';

import html from './formdesigner.html?raw';
import * as themeCssM from './theme.css?inline';
import * as stylesCssM from './styles.css?inline';

import { initGrapesJs } from './init-grapejs';

const themeCSS = themeCssM.default;
const stylesCSS = stylesCssM.default;

export class FormDesigner extends HTMLElement {
  editor: grapesjs.Editor = undefined as any;

  connectedCallback() {
    addCss(this.tagName, themeCSS + stylesCSS);

    this.innerHTML = html;
    this.editor = initGrapesJs('#gjs');
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  runCommand(command: string, options: any) {
    this.editor.runCommand(command, options); 
  }
  
  on(eventName: grapesjs.GrapesEvent, eventListener: any) {
    this.editor.on(eventName, eventListener);
  }

  /* utility functions */
  getHtml() { return this.editor.getHtml(); }
  setStyle(css: string) { this.editor.setStyle(css); }
  setHtml(html: string) { this.editor.setComponents(html); }
}