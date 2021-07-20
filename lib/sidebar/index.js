import css from './sidebar.css';
import html from './sidebar.html';
import { XTouchSwipe } from './touch-swipe';
import {setHTML, addCss, removeCss, range, debounce, throttle } from '../common/util';

export class XSidebar extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    this._url = location.href;
    this._urlChangeListner = this._handleUrlChange.bind(this);
    this._touchSwipeListner = this._handleTouchSwipe.bind(this);
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    setHTML(this, html)
      .then(_ => {
        new XTouchSwipe(document.body);
        this.querySelector('.x-blocker').addEventListener('click', _ => this.toggle());
        document.body.addEventListener('click', this._urlChangeListner);
        document.body.addEventListener('x-swipe', this._touchSwipeListner);
      });
  }

  disconnectedCallback() {
    removeCss(this);
    document.body.removeEventListener('click', this._urlChangeListner);
    document.body.removeEventListener('x-swipe', this._touchSwipeListner);
  }

  toggle(show) {
    const isVisible = !this.classList.contains('x-hidden');
    if (window.innerWidth >= 768) return; // Apply only for mobile devices
    if (isVisible && show === true) return;
    if (!isVisible && show === false) return;

    this.classList.toggle('x-hidden');
    document.body.style.overflow = isVisible ? '' : 'hidden';
  }
  
  // watch URL change, and if changed, hide side bar
  _handleUrlChange(event) {
    setTimeout(_ => {
      (this._url !== location.href) && this.toggle();
      this._url = location.href;
    });
  }

  _handleTouchSwipe(event) {
    const direction = event.detail;
    this.toggle(direction === 'right');
  }

}

if (!customElements.get('x-sidebar')) {
  customElements.define('x-sidebar', XSidebar);
}