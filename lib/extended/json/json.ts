import morphdom from 'morphdom/dist/morphdom-esm';
import { addCss, removeCss } from "../../util";
import * as cssM from './json.css?inline';

export class Json extends HTMLElement {
  static get observedAttributes() { return ['level']; }

  #data = undefined;
  get data() { return this.#data;}
  set data(val) {
    this.#data = val;
    this.#updateDOM();
  }

  connectedCallback() {
    if (this.isConnected) {
      addCss(this.tagName, cssM.default);
      this.#data = this.data;
      this.#updateDOM();
    }
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.#updateDOM();
  }

  render() {
    this.innerHTML = '';
    return this.getNewDOM(this, this.data); // recursively call
  }

  getNewDOM(el: HTMLElement, data: any, level=0) {
    const ul = document.createElement('ul');
    const attrLevel = +(this.getAttribute('level') as string) || 1;
    (level >= attrLevel) && (ul.classList.add('hidden'));

    if (typeof data === 'object') { // array is an object
      for (var key in data) {
        const item = document.createElement('li');
        const li = ul.appendChild(item);
        const values = Object.values(data[key])
          .filter(el => typeof el === 'string')
          .map(el => (el as string).replace(/</g, '&lt;'))
          .map(el => (el as string).length > 20 ? el.substring(0, 20) + ' ...' : el)
          .join(' / ');
        li.innerHTML = `${key} <small>${values}</small>`;

        const toggleList = function(event) {
          const child = event.target.querySelector('ul');
          const action = child?.classList.contains('hidden') ? 'remove' : 'add';
          action && child?.classList[action]('hidden');
          event.stopPropagation();
        }

        li.addEventListener('click', toggleList);
        el.appendChild(ul);

        if (typeof data[key] === 'object') {
          this.getNewDOM(li, data[key], ++level);
        } else if (typeof data[key] === 'function') {
          item.innerHTML = `${key}: function`;
        } else if (typeof data[key] === 'string') {
          item.innerHTML = `${key}: "${data[key].replace(/</g, '&lt;')}"`;
        } else {
          item.innerHTML = `${key}: ${data[key]}`;
        }
      }
    }
    return ul;
  }

  // called when attribute/props changes and connectedCallback
  // run as debounced since it's called from many places and often
  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const newDOM = this.render();
      const updated = document.createElement('div');
      updated.appendChild(newDOM);
      morphdom(this, updated, { childrenOnly: true }); 
    }, 50);
  }

}