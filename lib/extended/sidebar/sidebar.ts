import { addCss, removeCss } from '../../util';
import * as cssM from './sidebar.css?inline';
const css = cssM.default;

export class Sidebar extends HTMLElement {
  documentKlickListener: any;

  connectedCallback() {
    addCss(this.tagName, css);
    this.classList.add('sidebar')
    this.documentKlickListener = this.documentClickHandler.bind(this);

    const closeBtn = this.querySelector('.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', e => this.toggle(e));
    } else {
      this.insertAdjacentHTML('afterbegin', '<button class="close">x</button>');
      this.querySelector('.close')?.addEventListener('click', e => this.toggle(e));
    }

    const toggleBtn =  document.querySelector('.sidebar.toggle');
    toggleBtn?.addEventListener('click', e => this.toggle(e))

    this.addEventListener('click', function(this:any, event: any) {
      if (!event.target.closest('.close')) {
        this.dispatchEvent(new CustomEvent('select', {bubbles: true, detail: event.target}));
      }
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
    const clickInSidebar = event.target.closest('x-sidebar, .sidebar.toggle');
    if (!clickInSidebar && this.classList.contains('visible')) {
      this.toggle(event);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}