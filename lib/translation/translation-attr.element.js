import { setTargetValue } from '../common/util.js';
import {Translation} from './translation.js';
   
export class TranslationAttrElement extends HTMLElement {
  constructor() {
    super();
    this.targetEl;
  }

  connectedCallback() {
    const selector = this.getAttribute('selector');
    setTimeout(_ => { // give time to render
      if (selector) {
        this.targetEl = document.querySelector(selector);
        const observer = new MutationObserver(this.mutationCallback.bind(this));
        observer.observe(this, {attributes: true});
      } else {
        console.error('element not found', selector);
      }
    });
  }

  mutationCallback(_) { // mutationList
    // find all elements with [x-translate] attributes, then replace attribute values
    const els = this.targetEl.querySelectorAll('[x-translate]');
    els.forEach(el => {
      const attrNames = el.getAttribute('x-translate').split(',');
      attrNames.forEach(attrName => {
        const key = el.getAttribute(attrName);
        const translated = Translation.translate(key);
        el.setAttribute(attrName, translated);
      });
    });
  }
}

if (!customElements.get('t9n-attr')) {
  customElements.define('t9n-attr', TranslationAttrElement);
}
