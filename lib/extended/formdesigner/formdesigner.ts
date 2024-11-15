import * as grapesjs from 'grapesjs';
import { addCss, removeCss } from '../../util';

import html from './formdesigner.html?raw';
import templateHtml from './formdesigner.template.html?raw';
// import * as themeCssM from './formdesigner.theme.css?inline';
// import * as stylesCssM from './formdesigner.styles.css?inline';

import { initGrapesJs } from './init-grapejs';

// const themeCSS = themeCssM.default;
// const stylesCSS = stylesCssM.default;

export class FormDesigner extends HTMLElement {
  editor: grapesjs.Editor = undefined as any;
  editorLoaded = false;

  _template: string = templateHtml;
  get template() { return this._template;}
  set template(val) {
    this._template = val;
  }

  get html() { return this.editor.getHtml(); }
  set html(val) {
    this.#setHtml(val);
  }

  connectedCallback() {
    // addCss(this.tagName, themeCSS + stylesCSS);

    this.innerHTML = html;
    this.editor = initGrapesJs('#gjs');
    this.editor.BlockManager.getCategories().each((category, ndx) => {
      (ndx > 0) && category.set('open', false);
    });
    this.editor.on('load', e => {
      this.editorLoaded = true;
      this.template && this.#setHtml(this.template);
    });
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  #setHtml(val: string) {
    this.editor?.setComponents(val);
  }
}
