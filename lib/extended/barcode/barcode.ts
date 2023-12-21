import morphdom from 'morphdom/dist/morphdom-esm';
import {loadScript, waitFor} from '../../util';
declare const window: any;

export interface BarcodeProps {
  value: string;
  format: string;
  width?: number;
  height?: number;
  background?: string;
  lineColor?: string;
  margin?: number;
  displayValue?: boolean;
  font?: string;
  fontSize?: number;
  textAlign?: 'start' | 'end' | 'center' | 'justify';
  textPosition?: 'bottom' | 'top';
  textMargin?: number;
  fontOptions?: 'bold' | 'bold italic' | '' | 'italic';
}

export class BarCode extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'format', 'width', 'height'];
  }

  props = {
    width: 1,
    height: 100,
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
    this.classList.add('x', 'barcode');
    loadScript('https://unpkg.com/jsbarcode/dist/JsBarcode.all.min.js');
    await waitFor('window.JsBarcode');
    this.#updateDOM();
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (oldValue !== newValue) {
      var propsKey = name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
      this.props[propsKey] = newValue.match(/^[0-9]+/) ? +newValue: newValue;
      this.#updateDOM();
    }
  }

  async render() { 
    if (window.JsBarcode) {
      try {
        const value = this.getAttribute('value') || '123456789012'; 
        const svgEl = document.createElement('svg');
        window.JsBarcode(svgEl, value, this.props);
        return svgEl.outerHTML;
      } catch (e) {
        return 'Invalid barcode format and value, e.g., certain format requires a certain numerical value.'
      }
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
