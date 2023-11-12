import { addCss, removeCss } from '../util';
import * as cssM from './sidebar.css?inline';
const css = cssM.default;

export class SideBar extends HTMLElement {
  documentClickListener: any;

  connectedCallback() {
    addCss(this.tagName, css);

    this.documentClickListener = this.docClickHandler.bind(this);
    this.addEventListener('click', function(this:any, event: any) {
      if (event.target.closest('.x-sidebar-close')) {
        this.toggle(event);
      } else {
        this.dispatchEvent(new CustomEvent('sidebar', {bubbles: true, detail: event.target}));
      }
    });
    document.querySelector('.x-sidebar-toggle')?.addEventListener('click', e => this.toggle(e));
    document.addEventListener('click', this.documentClickListener);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.documentClickListener);
    removeCss(this.tagName);
  }

  toggle(event) {
    this.classList.toggle('visible');
    const detail = this.classList.contains('visible') ? 'open' : 'close';
    this.dispatchEvent(new CustomEvent('sidebar', {bubbles: true,  detail}));
  }
  
  docClickHandler(event) {
    const clickInSidebar = event.target.closest('x-sidebar');
    const isToggleButton = event.target.closest('.x-sidebar-toggle');
    const isCloseButton = event.target.closest('.x-sidebar-close');
    if (clickInSidebar) {
      // todo
    } else if (isToggleButton) {
    } else if (isCloseButton || this.classList.contains('visible')) {
      this.toggle(event);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
