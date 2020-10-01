import * as ace from 'brace';
import 'brace/mode/css';
import 'brace/theme/github';
import * as prettier from 'prettier';
import * as cssParser from 'prettier/parser-postcss';
import  {setCustomElementHTMLCss}  from '../lib/common/util';

const css = `
  app-custom-css .custom-css { 
    display: block;
    position: relative; 
    text-align: right;
    height: 2em;
  }
  app-custom-css.visible .ace {
    display: block;
    top: 0;
    right: 0;
    width: 70%;
    min-width: 400px;
    box-shadow: 2px 2px 8px #CCC;
    z-index: 1;
  }
  app-custom-css .ace {
    display: none;
    position: absolute;
    padding: 8px;
    top: 100%;
    background: #FFF;
    text-align: left;
  }
  app-custom-css a {
    cursor: pointer;
    color: blue;
  }
  `;

const html = `
  <div class="custom-css">
    <a id="edit-css">Edit Custom Style</a>
    <div class="editor-container ace">
      Edit css here. Then, it will be applied to all.
      <pre id="ace-editor">
        <slot></slot>
      </pre>
    </div>
  </div>
`

class AppCustomCss extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    this.docClickListener = this._docClick.bind(this);
    this.customStyleEl;
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, html, css);
    document.addEventListener('click', this.docClickListener)
    this._addEventListeners();
    this._initAceEditor();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.docClickListener)
    this.customStyleEl && this.customStyleEl.remove();
  }

  _addEventListeners() {
    this.querySelector('#edit-css').addEventListener('click', 
      _ => this.classList.add('visible'));
    // this.querySelector('#reset-css').addEventListener('click',
    //   _ => this._resetCustomStyle());
  }

  _docClick(event) {
    const closetHostEl = event.target.closest(this.tagName);
    (closetHostEl !== this) && (this.classList.remove('visible'));
  }

  _applyCustomCss(css) {
    this.customStyleEl = document.body.querySelector('style#custom-style');
    if (!this.customStyleEl) {
      this.customStyleEl = document.createElement('style');
      this.customStyleEl.id = 'custom-style';
      document.body.appendChild(this.customStyleEl);
    }
    // this.customStyleEl.innerText = css;
    this.customStyleEl.appendChild(document.createTextNode(css));
  }

  _resetCustomStyle() {
    this.classList.remove('visible');
    this.customStyleEl && this.customStyleEl.remove();
  }

  _initAceEditor() {
    const el = this.querySelector('#ace-editor');
    const code = el.innerText;
    const editor = ace.edit('ace-editor');
    editor.$blockScrolling = Infinity;

    const value = prettier.format(code, {parser: 'css', plugins: [cssParser]});
    editor.setValue(value);
    editor.clearSelection();

    // const height =
    //   (editor.getSession().getScreenLength() * editor.renderer.lineHeight) + 
    //   editor.renderer['scrollBar'].getWidth();
    // el.style.height  = height + "px";
    editor.resize();

    editor.setOption('useWorker', false); // disable error highlighting
    editor.setOption('maxLines', 200);
    editor.setOption('mode', 'ace/mode/css');
    editor.setOption('theme', 'ace/theme/github');
    editor.on('blur', args => {
      this._applyCustomCss(editor.getValue());
    });

    window.editor = editor;
  }
}

if (!customElements.get('app-custom-css')) {
  customElements.define('app-custom-css', AppCustomCss);
}

