import * as grapesjs from 'grapesjs';
import { initGrapesJs } from './init-grapesjs';

export class FormDesigner extends HTMLElement {
  editor: grapesjs.Editor = undefined as any;
  editorLoaded = false;

  connectedCallback() {
    this.innerHTML = `
      <link rel="stylesheet" href="//unpkg.com/grapesjs/dist/css/grapes.min.css" />
      <style>
        :root{ --gjs-left-width: 20%; }
        .gjs-block {width: 28%; min-height: initial;}
      </style>
      <div id="gjs"></div>
    `;
    this.editor = initGrapesJs('#gjs');
  }
}
