import { addCss, removeCss } from '../../util';
import * as cssM from './sidebar.css?inline';
const css = cssM.default;

export class Sidebar extends HTMLElement {
  documentKlickListener: any;
  closeSelector = '.close';
  toggleSelector = '.sidebar.toggle';

  connectedCallback() {
    addCss(this.tagName, css);
    this.classList.add('x', 'sidebar');
    this.documentKlickListener = this.documentClickHandler.bind(this);

    const closeBtn = this.querySelector(this.closeSelector);
    const toggleBtn =  document.querySelector(this.toggleSelector);

    closeBtn?.addEventListener('click', e => this.toggle(e));
    toggleBtn?.addEventListener('click', e => this.toggle(e))

    this.addEventListener('click', (event: any) => {
      if (event.target.closest(this.closeSelector)) return;
      this.dispatchEvent(new CustomEvent('select', {bubbles: true, detail: event.target}));
    });

    document.addEventListener('click', this.documentKlickListener);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.documentKlickListener);
    removeCss(this.tagName);
  }

  toggle(e) {
    this.classList.toggle('visible');
    const detail = this.classList.contains('visible') ? 'open' : 'close';
    this.dispatchEvent(new CustomEvent('select', {bubbles: true,  detail}));
  }
  
  documentClickHandler(event) {
    const clickInSidebar = event.target.closest(`${this.tagName.toLowerCase()}, ${this.toggleSelector}`);
    if (!clickInSidebar && this.classList.contains('visible')) {
      this.toggle(event);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}