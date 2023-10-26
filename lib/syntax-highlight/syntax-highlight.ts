import morphdom from 'morphdom/dist/morphdom-esm';
import { loadScript, waitFor, fixIndent } from '../../lib';

export class SyntaxHighlight extends HTMLElement {
  static get observedAttributes() { return ['language']; }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.#updateDOM();
  }

  connectedCallback() {
    loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css'
      );
    this.#updateDOM();
  }

  async render() {
    await waitFor('window.hljs');

    const language = this.getAttribute('language') || 'javascript';
    const source = fixIndent(this.textContent as string);
    const highlighted = window['hljs'].highlight(source, {language}).value;
    return `<pre style="padding: 12px; background: #F0F0F0" language="${language}">${highlighted}</pre>`;
  }

  // called when attribute/props changes and connectedCallback
  // run as debounced since it's called from many places and often
  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const newHTML = await this.render();
      const updated = document.createElement('div');
      updated.innerHTML += newHTML;
      morphdom(this, updated, { childrenOnly: true }); 
    }, 50);
  }
}