import html from './dialog.html';
import css from './dialog.css';
import { setCustomElementHTMLCss } from '../common/util';

/**
 * 1. close dialog when background clicked
 * 2. when esc pressed close dialog
 * 3. when open, trap focus within it.
 * 4. when closed, focus back to trigger element
 * 4. fire event when opened or closed
 */
class XDialog extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, html, css);
    this._lastActiveEl = document.activeElement;
    this.setAttribute('tabindex', '-1'); // to listen to keyboard
    this.closable = this.getAttribute('closable') === 'false' ? false : true;
    !this.closable && this.classList.add('not-closable');
    this._setEventListener();
  }

  open() {
    this.classList.add('x-visible');
    document.body.style.overflow = 'hidden';
    this._trapFocus(this.querySelector('.x-dialog'));
    this.dispatchEvent(new CustomEvent('x-dialog-open', {bubbles: true}));
    this.focus();
  }

  close() {
    this.classList.remove('x-visible');
    this._lastActiveEl && this._lastActiveEl.focus();
    document.body.style.overflow = 'auto';
    this.dispatchEvent(new CustomEvent('x-dialog-close', {bubbles: true}));
  }

  _setEventListener() {
    this.querySelector('.x-blocker').addEventListener('click', this.close.bind(this));
    this.querySelector('.x-close-button').addEventListener('click', this.close.bind(this));
    this.addEventListener('keydown', this._onKeydown.bind(this));
  }

  _onKeydown(event) {
    if (event.key === 'Escape') this.close();
  }

  _trapFocus(element) {
    element.setAttribute('tabindex', element.getAttribute('tabindex') || '-1');

    const focusableEls = Array.from(element.querySelectorAll(
      'a[href], button, textarea, input[type="text"],' +
      'input[type="radio"], input[type="checkbox"], select, [tabindex]'
    )).filter( el => {
      const tabindex = el.getAttribute('tabindex') || '0';
      return !el.disabled && tabindex !== '-1';
    });

    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', function(e) {
      const isTabPressed = e.keyCode === 9; // isTabPressed
      if (!isTabPressed) { return; }

      if ( e.shiftKey ) /* shift + tab */ {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }
}

if (!customElements.get('x-dialog')) {
  customElements.define('x-dialog', XDialog);
}
  