import * as grapesjs from 'grapesjs';
import html from './formdesigner.html?raw';
import { initGrapesJs } from './init-grapejs';

export class FormDesigner extends HTMLElement {
  editor: grapesjs.Editor = undefined as any;
  editorLoaded = false;

  connectedCallback() {
    this.innerHTML = `
      <link rel="stylesheet" href="//unpkg.com/grapesjs/dist/css/grapes.min.css" />
      <style>
      :root{
        --gjs-left-width: 20%;
      }
      </style>
      <div id="gjs"></div>
    `;
    this.editor = initGrapesJs('#gjs');
  }
}
