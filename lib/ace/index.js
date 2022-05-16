import { waitUntil, setHTML, addCss, removeCss, waitUntilIdle, define } from '../common';
import css from './ace.css';

/**
 * attributes
 *  - theme
 *  - mode
 *  - gutter
 *  - wrap-mode
 */
export class XAce extends HTMLElement {
  get value() { return this.editor?.getValue(); }
  set value(val) { 
    if (!val) return;
    waitUntil.bind(this)(_ => this.editor)
      .then(_ => this.editor.setValue(val));
  }

  // session.setUseWrapMode(opts.useWrapMode);
  connectedCallback() {
    this.theme = this.getAttribute('theme') || 'monokai';
    this.mode = this.getAttribute('mode') || 'javascript';
    this.showGutter = this.getAttribute('gutter') !== null;
    this.useWrapMode = this.getAttribute('wrap-mode') !== null;

    const cssEl = addCss(this, css);
    waitUntilIdle(this)
      .then(_ => {
        this.orgValue = this.fixIndent(this.innerText);
        const aceHtml = cssEl ? 
          `<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js">` +
          `</script><pre class="editor"></pre>` :
          '<pre class="editor"></pre>'; // not to load script multiple times
        return setHTML(this, aceHtml);
      })
      .then(_ => waitUntil.bind(window)(_ => window.ace))
      // .then(_ => waitUntil.bind(this)(_ => this.querySelector('.editor').offsetWidth))
      .then(_ => {
        const editorEl = this.querySelector('.editor');
        const editor = window.ace.edit(editorEl);
        editor.setTheme(`ace/theme/${this.theme}`);
        editor.renderer.setShowGutter(this.showGutter);
        editor.session.setMode(`ace/mode/${this.mode}`);
        editor.session.setUseWrapMode(this.useWrapMode);
        editor.renderer.setScrollMargin(8, 8, 0, 0);
        editor.setValue(this.orgValue);
        editor.clearSelection();
        editorEl.querySelector('textarea').setAttribute('aria-label', 'ACE editor');

        this.editor = editor;
        this.dispatchEvent(new CustomEvent('load', {detail: editor, bubbles: true}));

        ['blur', 'change', 'copy', 'focus', 'paste'].forEach(eventName => {
          editor.on(eventName, data => {
            this.dispatchEvent(new CustomEvent(eventName, { detail: data, bubbles: true }));
          });
        });
      })
      .then(_ => this.editor.resize());
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

XAce.define = define('x-ace', XAce);