import morphdom from 'morphdom/dist/morphdom-esm';
import { loadScript, waitFor, fixIndent } from '../../util';

export class Highlight extends HTMLElement {
  static get observedAttributes() { return ['language']; }
  #code;
  get code() { return this.#code; }
  set code(val) {
    this.#code = val;
    this.#updateDOM();
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.#updateDOM();
  }

  connectedCallback() {
    this.classList.add('x', 'highlight'); 
    const theme = this.getAttribute('theme') || 'github';
    loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js',
      `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${theme}.min.css`
      );
    this.#updateDOM();
  }

  async render() {
    await waitFor('window.hljs');

    const language = this.getAttribute('language') || 'javascript';
    const source = this.code || fixIndent(this.textContent as string);
    const highlighted = window['hljs'].highlight(source, {language}).value;
    return `<pre language="${language}">${highlighted}</pre>`;
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