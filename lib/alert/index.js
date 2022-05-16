import css from './alert.css';
import { addCss, removeCss, trapFocus } from '../common';

function _open(alertEl, options) {
  addCss({tagName: 'alert'}, css);
  alertEl.insertAdjacentHTML('beforeend', `
    <div class="x-blocker" aria-label="dialog backdrop"></div>
    <div class="x-contents" role="dialog" aria-modal="true">
      <button x="" class="x-close-button no-style" aria-lable="close">✗</button>
      <div class="title"></div>
      <div class="message"></div>
      <div class="buttons"></div>
    </div>
  `);

  const contentsEl = alertEl.querySelector('.x-contents');
  contentsEl.querySelector('.title').innerHTML = options.title || '';
  contentsEl.querySelector('.message').innerHTML = options.message || '';
  const buttonsEl = contentsEl.querySelector('.buttons');
  (options.buttons || []).forEach(txt => {
    const btnClass = txt === 'Cancel' ? 'cancel' : `primary ${txt.toLowerCase()}`;
    buttonsEl.insertAdjacentHTML('beforeend', `<button x="" class="${btnClass}">${txt}</button>`);
  });
  options.notClosable && alertEl.classList.add('not-closable');

  alertEl.dispatchEvent(new CustomEvent('x-dialog-open', {bubbles: true, detail: alertEl}));
  document.body.classList.add('x-alert-no-scroll');
  document.body.appendChild(alertEl);
}

export function showAlert(message, options = {}) {
  const lastActiveEl = document.activeElement;
  const alertEl = document.createElement('x-alert');

  options.message = message;
  _open(alertEl, options); // title, message, buttons, notClosable

  const contentsEl = alertEl.querySelector('.x-contents');
  const trapListener = trapFocus(contentsEl); // use trapListener when close

  return new Promise((resolve, reject) => {
    alertEl.close = function() {
      alertEl.removeEventListener('keydown', trapListener); // no needed but as ref.
      alertEl.remove();
      lastActiveEl && lastActiveEl.focus();
      removeCss({tagName: 'alert'});
      document.body.classList.remove('x-alert-no-scroll')
    }

    alertEl.addEventListener('click', e => {
      if (
        e.target.classList.contains('x-blocker') || 
        e.target.classList.contains('x-close-button') 
      ) {
        if (!options.notClosable) {
          alertEl.close();
          resolve('close');
        }
      } else if (e.target.tagName === 'BUTTON') {
        alertEl.close();
        resolve(e.target.innerText);
      }
    });

    alertEl.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        alertEl.close();
        resolve('close');
      }
    });
  });
}
