import { waitUntil, setHTML, addCss, removeCss, waitUntilIdle } from '../common/util';
import css from './ace.css';
import html from './ace.html';

export class XAce extends HTMLElement {
  
  set value(val) { this.editor.setValue(val); }
  get value() { return this.editor.getValue(); }

  set disabled(val) { 
    this.editor.setReadOnly(val); 
    val? this.classList.add('disabled') : this.classList.remove('disabled'); 
  }
  get disabled() { return this.editor.getReadOnly(); }

  set readonly(val) { 
    this.editor.setReadOnly(val); 
    val? this.classList.add('readonly') : this.classList.remove('readonly'); 
  }
  get readonly() { return this.editor.getReadOnly(); }

  connectedCallback() {
    this.theme = this.getAttribute('theme') || 'monokai';
    this.language = this.getAttribute('language') || 'javascript';

    const cssEl = addCss(this, css);

    waitUntilIdle(this)
      .then(_ => {
        this.orgValue = this.fixIndent(this.innerHTML);
        const aceHtml = cssEl ? html : '<pre class="editor"></pre>'; // not to load script multiple times
        return setHTML(this, aceHtml);
      })
      .then(_ => waitUntil('ace'))
      .then(_ => waitUntil(_ => this.querySelector('.editor').offsetWidth))
      .then(_ => {
        const editorEl = this.querySelector('.editor');
        const editor = window.ace.edit(editorEl);
        editor.setValue(this.orgValue);
        editor.setTheme(`ace/theme/${this.theme}`);
        editor.session.setMode(`ace/mode/${this.language}`);
        editor.renderer.setScrollMargin(8, 8, 0, 0);
        this.editor = editor;

        this.dispatchEvent(new CustomEvent('load', {
          detail: editor,
          bubbles: true
        }));

        editor.on('change', data => {
          this.dispatchEvent(new CustomEvent('change', {
            detail: data,
            bubbles: true
          }));
        });
      }).then(_ => this.editor.resize());
  }

  disconnectedCallback() {
    removeCss(this);
  }

  fixIndent(code) {
    code = code.replace(/^([ \t]*\n+){1,}|[\n\t ]+$/g, ''); // remove empty first/last line
    const firstIndent = (code.match(/^([ ]+)/) || [])[1];
    if (firstIndent) {
      const re = new RegExp(`^${firstIndent}`, 'gm');
      return code.replace(re, '');
    }
    return code;
  }
  
}

if (!customElements.get('x-ace')) {
  customElements.define('x-ace', XAce);
}
