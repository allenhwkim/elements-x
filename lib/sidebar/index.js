import css from './sidebar.css';
import html from './sidebar.html';
import { XTouchSwipe } from './touch-swipe';
import {setHTML, addCss, removeCss, range, debounce, throttle } from '../common/util';

export class XSidebar extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    this.width; // default 200px
    this._url = location.href;
    this._urlChangeListner = this._handleUrlChange.bind(this);
    this._touchSwipeListner = this._handleTouchSwipe.bind(this);
    return self;
  }

  connectedCallback() {
    this.width = this.getAttribute('width');
    addCss(this, css);
    setHTML(this, html)
      .then(_ => {
        new XTouchSwipe(document.body);
        this.width && this.style.setProperty('--x-sidebar-width', `${this.width}px`);
        this.querySelector('.x-blocker').addEventListener('click', _ => this.toggle());
        (window.innerWidth < 768) && 
          document.body.addEventListener('click', this._urlChangeListner);
        document.body.addEventListener('x-swipe', this._touchSwipeListner);
      });
  }

  disconnectedCallback() {
    removeCss(this);
    document.body.removeEventListener('click', this._urlChangeListner);
    document.body.removeEventListener('x-swipe', this._touchSwipeListner);
  }

  // show/hide sidebar by 
  // 1. blocker click
  // 2. swipe right/left
  // 3. url change
  toggle(show) {
    const isVisible = this.classList.contains('x-visible');
    if (isVisible && show === true) return;
    if (!isVisible && show === false) return;
    this.classList.toggle('x-visible');
    if (window.innerWidth < 768) {
      document.body.style.overflow = this.classList.contains('x-visible') ? 'hidden' : '';
    }
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