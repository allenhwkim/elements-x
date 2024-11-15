import * as grapesjs from 'grapesjs';
import html from './formdesigner.html?raw';
import templateHtml from './formdesigner.template.html?raw';
import { initGrapesJs } from './init-grapejs';

export class FormDesigner extends HTMLElement {
  template: string = templateHtml;

  editor: grapesjs.Editor = undefined as any;
  editorLoaded = false;

  connectedCallback() {
    this.innerHTML = html;
    this.editor = initGrapesJs('#gjs');
    this.editor.on('load', e => {
      this.editorLoaded = true;
      this.editor.setComponents(this.template);
    });
  }
}
