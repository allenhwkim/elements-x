
import {setHTML, addCss, removeCss} from 'elements-x';
import css from './accordion.css';
import html from './accordion.html';

export class XAccordion extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    this.label = this.getAttribute('label');
    
    setHTML(this, html).then(_ => {
      const btn = this.querySelector('.accordion-button');
      btn.innerText = this.label;
      btn.addEventListener('click', _ => {
        this.classList.toggle('expanded');
      })
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }

}

if (!customElements.get('x-accordion')) {
  customElements.define('x-accordion', XAccordion);
}