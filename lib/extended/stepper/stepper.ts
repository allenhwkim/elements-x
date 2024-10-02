import morphdom from 'morphdom/dist/morphdom-esm';
import { addCss, removeCss } from '../../util';
import * as cssM from './stepper.css?inline';
const css = cssM.default;

export class Stepper extends HTMLElement {
  steps: string[] = [];
  active: string = '';

  static get observedAttributes() {
    return ['steps', 'active'];
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (name === 'steps') {
      this.steps = newValue.split(',').map(el => el.trim());
      this.render();
    } else if (name === 'active') {
      this.active = newValue.trim();
      this.render();
    }
  }

  connectedCallback() {
    addCss(this.tagName, css);
    this.render();
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  // called when attribute/props changes and connectedCallback
  // run as debounced since it's called from many places and often
  #timer: any;
  render() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const olEl = document.createElement('ol');
      olEl.classList.add('stepper');
      this.steps.forEach( (step: string) => {
        const liEl = document.createElement('li');
        (this.active === step) && liEl.classList.add('active');
        liEl.innerText = step;
        olEl.appendChild(liEl);
      });
      const divEl = document.createElement('div');
      divEl.appendChild(olEl);
      morphdom(this, divEl, { childrenOnly: true }); 
    }, 50);
  }
}

