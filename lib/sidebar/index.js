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
        this.width && this.style.setProperty('--x-sidebar-width', `${this.width}px`);

        new XTouchSwipe(document.body);
        document.body.addEventListener('x-swipe', this._touchSwipeListner);

        if (window.innerWidth < 768) {
          this.querySelector('.x-blocker').addEventListener('click', _ => this.hide());
          document.body.addEventListener('click', this._urlChangeListner);
        } else {
          this.classList.add('x-visible'); // display when desktop width
        }
      });
  }

  disconnectedCallback() {
    removeCss(this);
    document.body.removeEventListener('click', this._urlChangeListner);
    document.body.removeEventListener('x-swipe', this._touchSwipeListner);
  }

  show() { // swipe right
    this.classList.add('x-visible');
    (window.innerWidth < 768) && (document.body.style.overflow = 'hidden');
  }

  hide() { // by blocker click, swipe left, or url change
    this.classList.remove('x-visible');
    document.body.style.overflow = '';
  }

  toggle() {
    this.classList.contains('x-visible') ? this.hide() : this.show();
  }

  // watch URL change, and if changed, hide side bar
  _handleUrlChange(event) {
    setTimeout(_ => {
      (this._url !== location.href) && this.hide();
      this._url = location.href;
    });
  }

  _handleTouchSwipe(event) {
    const direction = event.detail;
    direction === 'right' ? this.show() : this.hide();
  }

}

if (!customElements.get('x-sidebar')) {
  customElements.define('x-sidebar', XSidebar);
}