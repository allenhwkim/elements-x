import {addCss, removeCss} from '../common/util';
import css from './snackbar.css';

export class XSnackbar extends HTMLElement {
  connectedCallback() {
    css && addCss(this, css);
  }

  disconnectedCallback() {
    removeCss(this);
  }

  addMessage(msg, options = {}) {
    options.class && (this.className = options.class);

    const msgEl = document.createElement('div');
    msgEl.classList.add('x-message');
    msgEl.innerText = msg;
    this.appendChild(msgEl);
    setTimeout(_ => this.removeMessage(msgEl), options.duration || 5000);
  }

  removeMessage(msgEl) {
    msgEl.style.opacity = '0';
    setTimeout(_ => {
      msgEl.remove();
      if (!this.children.length) {
        this.remove();
      }
    }, 300);
  }
}

if (!customElements.get('x-snackbar')) {
  customElements.define('x-snackbar', XSnackbar);
}

export function addSnackbar(msg, options) {
  if (!document.querySelector('x-snackbar')) {
    const newEl = document.createElement('x-snackbar');
    document.body.appendChild(newEl);
  }

  const snackbar = document.querySelector('x-snackbar');
  snackbar.addMessage(msg, options);
}