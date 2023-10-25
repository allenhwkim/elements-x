import morphdom from 'morphdom/dist/morphdom-esm';
import {loadScript, waitFor} from '../../lib';
declare const window: any;

export class BarCode extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'format'];
  }

  props = {
    width: 1,
    background: '#FFFFFF',
    lineColor: '#000000',
    margin: 10,
    displayValue: true,
    font: 'monospace',
    fontSize: 20,
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontOptions: 'bold',
  };

  constructor() {
    super();
    for (let key in this.props) {  //  getter and setters of all reactive props
      Object.defineProperty(this, key, {
        get() { return this.props[key]; },
        set(value) {
          if (this.props[key] === value) return;
          this.props[key] = value;
          this.#updateDOM(); // react to props change
        }
      });
    }
  }

  async connectedCallback() {
    loadScript('//unpkg.com/jsbarcode/dist/JsBarcode.all.min.js');
    await waitFor('window.JsBarcode');
    this.#updateDOM();
  }

  disconnectedCallback() {
    //removeCss(this.tagName);
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.#updateDOM();
  }

  async render() { 
    if (window.JsBarcode) {
      const value = this.getAttribute('value') || '123456789012'; 
      const format = this.getAttribute('format') || 'code128';
      const svgEl = document.createElement('svg');
      window.JsBarcode(svgEl, value, {...this.props, format});
      return svgEl.outerHTML;
    }
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
