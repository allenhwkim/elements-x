import * as grapesjs from 'grapesjs';
import html from './formdesigner.html?raw';
import { initGrapesJs } from './init-grapejs';

export class FormDesigner extends HTMLElement {
  editor: grapesjs.Editor = undefined as any;
  editorLoaded = false;

  connectedCallback() {
    this.innerHTML = html;
    this.editor = initGrapesJs('#gjs');
  }
}
