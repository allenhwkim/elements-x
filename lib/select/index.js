import {setHTML, addCss, removeCss, syncAttr} from '../../lib/common/util';
import html from './select.html';
import css from './select.css';

class XSelect extends HTMLElement {
  constructor() {
    super();
    this.html = this.innerHTML;
    this.xNative;
    this.xCustom;
  }

  connectedCallback() {
    css && addCss(this, css);
    setHTML(this, html).then(_ => {
      this.xNative = this.querySelector('.x-native');
      this.xCustom = this.querySelector('.x-custom');

      syncAttr(this, this.xNative, ['onclick','onchange']); // copy attributes to <select> and set

      const newHTML = this.html
        .replace(/option/g, 'div')
        .replace(/value=/g, 'data-value=');
      this.xCustom.innerHTML = newHTML;
      this._init();
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }

  _init() {
    if (this.getAttribute('multiple') === null) {
      this.xNative.addEventListener('keydown', this._xNativeKeydownHandler.bind(this));
    } else {
      this.xCustom.setAttribute('tabindex', 0);
      this.xCustom.removeAttribute('aria-hidden');
      this.xCustom.addEventListener('keydown', this._xNativeKeydownHandler.bind(this));
    }

    this.xCustom.addEventListener('mousedown', e => {
      this._syncNativeAndCustom(e.target.dataset.value)
    });
    this._syncNativeAndCustom();
  }
  
  _xNativeKeydownHandler(event) {
    if (event.keyCode === 27) { 
      event.target.blur();
      return;
    }
    
    function highlightFocused(inc) {
      const curCustomIndex = allCustomOptions
        .findIndex(el => el.classList.contains('active'));
      const nxtCustomIndex = 
        (curCustomIndex + inc + allCustomOptions.length) % allCustomOptions.length;

      allCustomOptions.forEach((el, index) => {
        const func = index === nxtCustomIndex ? 'add' : 'remove';
        el.classList[func]('active');
      });
    }

    const allCustomOptions =
      Array.from(this.xCustom.querySelectorAll('[data-value]'));

    if (event.keyCode === 39 || event.keyCode === 40) { // right, down arrow
      highlightFocused(1);
    } 
    else if (event.keyCode === 37 || event.keyCode === 38) { // left, up arrow
      highlightFocused(-1);
    }
    else if (event.keyCode === 13) {
      const activeIndex = 
        allCustomOptions.findIndex(el => el.classList.contains('active'));
      const value = allCustomOptions[activeIndex].dataset.value;
      this._syncNativeAndCustom(value);
      this.xNative.blur();
    }
    else { // if text entered
      const keyEntered = event.key.toLowerCase();
      allCustomOptions.forEach(el => {
        const elText = el.innerText.toLowerCase();
        const func = elText.indexOf(keyEntered) !== -1 ? 'add' : 'remove';
        el.classList[func]('active');
      });
    }
  }

  // synchronize selected value on both native and custom
  _syncNativeAndCustom(valueFromCustom) {
    if (valueFromCustom !== undefined) {
      this.xNative.value = valueFromCustom;
    }
    this.value = this.xNative.value;
    this.dispatchEvent(new Event('change'), {bubbles: true});

    const allNativeOptions = Array.from(this.xNative.querySelectorAll('option'));
    const curNativeIndex = allNativeOptions.findIndex(el => el.value == this.xNative.value);
    const allCustomOptions =
      Array.from(this.xCustom.querySelectorAll('[data-value]'));
    allCustomOptions.forEach((el, index) => {
      const func = index === curNativeIndex ? 'add' : 'remove';
      el.classList[func]('selected');
      el.classList[func]('active');
    });
  }  
}

if (!customElements.get('x-select')) {
  customElements.define('x-select', XSelect);
}
