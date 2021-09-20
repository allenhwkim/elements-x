import html from './dialog.html';
import css from './dialog.css';
import { setHTML, addCss, removeCss, waitUntilIdle } from '../common/util';

/**
 * 1. close dialog when background clicked
 * 2. when esc pressed close dialog
 * 3. when open, trap focus within it.
 * 4. when closed, focus back to trigger element
 * 4. fire event when opened or closed
 */
export class XDialog extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    this.triggerEl;
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    setHTML(this, html).then(_ => {
      this._lastActiveEl = document.activeElement;
      this.setAttribute('tabindex', '-1'); // to listen to keyboard
      this.closable = this.getAttribute('closable') === 'false' ? false : true;
      !this.closable && this.classList.add('not-closable');
      this._setEventListener();

      const triggerId = this.getAttribute('trigger');
      this.triggerEl = document.getElementById(triggerId);
      if (triggerId && this.triggerEl) {
        this.triggerEl.addEventListener('click', _ => this.open());
        this.triggerEl.addEventListener('keydown', event => (event.key === 'Enter') && this.open());
      }
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }

  async open() {
    this.classList.add('x-visible');
    document.body.style.overflow = 'hidden';
    await waitUntilIdle(this);
    this._trapFocus(this.querySelector('.x-dialog'));
    this.dispatchEvent(new CustomEvent('x-dialog-open', {bubbles: true}));
    this.focus();
  }

  close() {
    this.classList.remove('x-visible');
    if (!this._lastActiveEl.isSameNode(document.body)) {
      this._lastActiveEl && this._lastActiveEl.focus();
    }
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
 
// openDialog(message, {
//   buttons: {
//     yes: _ => console.log('yes'),
//     no: _ => console.log('no)
//   },
//   style: {width, height, minWidth, minHeight, maxWidth, maxHeight}
// })
export async function openDialog(msg, options={buttons: {}}) {
  document.querySelector('x-dialog.x-main')?.remove();
  const dialogEl = document.createElement('x-dialog');
  dialogEl.classList.add('x-main');
  dialogEl.innerHTML = '';
  dialogEl.addEventListener('click', e => {
    const buttonClicked = e.target.tagName.includes('BUTTON') && e.target; 
    if (buttonClicked && options.buttons[buttonClicked.innerText]) {
      options.buttons[buttonClicked.innerText](e);
      dialogEl.close();
    }
  });

  const msgEl = document.createElement('p');
  msgEl.innerText = msg;
  dialogEl.append(msgEl);

  for (var key in options.buttons) {
    const buttonEl = document.createElement('x-button');
    buttonEl.innerText = key;
    dialogEl.append(buttonEl);
  }

  document.body.appendChild(dialogEl);

  await waitUntilIdle(document.body);
  Object.assign(dialogEl.querySelector('.x-dialog').style, options.style || {});
  dialogEl.open();
}