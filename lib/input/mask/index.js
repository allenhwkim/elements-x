import { setHTML, addCss, syncAttr} from '../../common';
import html from './mask.html';
import css from './mask.css';

const maskType = {
  y: '[0-9]', m: '[0-9]', d: '[0-9]',
  Y: '[0-9]', M: '[0-9]', D: '[0-9]',
  9: '[0-9]', '#': '[0-9]',
  x: '[a-zA-Z]', X: '[a-zA-Z]',
  _: '[0-9]'
};

export class Mask {
  static init() {
    const maskAttrs = ['mask', 'hide-input'];
    css && addCss(this, css);

    return setHTML(this, html).then(_ => {
      this.inputEl = this.querySelector('.x-input');
      this.maskEl = this.querySelector('.x-mask'); // used to show guide of input
      this.faceEl = this.querySelector('.x-face'); // used to hide user input
      this.hideInput = this.getAttribute('hide-input') !== null;
      this.maskStr = this.getAttribute('mask');
      !this.maskStr && (this.innerHTML = 'mask attribute is required.');

      this.maskEl.innerText = this.maskStr;
      syncAttr(this, this.inputEl, maskAttrs); // copy attributes to <input> and set
      Mask._syncStyle(this.inputEl, this.maskEl, this.faceEl);

      this.inputEl.addEventListener('focus', Mask._handleInitial.bind(this)); // to prepend char
      this.inputEl.addEventListener('keydown', Mask._handleKeyDown.bind(this)); // to accept char
      this.inputEl.addEventListener('input', Mask._handleInput.bind(this)); // to hide char
    });
  }

  static _syncStyle(inputEl, maskEl, faceEl) {
    const cs = getComputedStyle(inputEl);
    // console.log({inputEl, maskEl, faceEl, cs});
    maskEl.style.fontSize    = faceEl.style.fontSize = cs.fontSize;
    maskEl.style.paddingLeft = faceEl.style.paddingLeft =cs.paddingLeft;
    maskEl.style.borderWidth = faceEl.style.borderWidth =cs.borderWidth;
  }

  static _handleInput() {
    // setup maskEl
    this.maskEl.innerText = ' '.repeat(this.inputEl.value.length) +
      this.maskStr.substring(this.inputEl.value.length);

    // setup faceEl
    if (this.hideInput) {
      this.faceEl.innerText = this.inputEl.value.replace(/[a-z0-9_#]/g, '●');
      this.faceEl.innerText = this.inputEl.value.slice(0, -1).replace(/[a-z0-9_#]/g, '●')
        + this.inputEl.value.substring(this.inputEl.value.length - 1);
      setTimeout(_ => {
        this.faceEl.innerText = this.inputEl.value.replace(/[a-z0-9_#]/g, '●');
      }, 1000);
    }

  }

  static _handleInitial() {
    if (this.inputEl.value === '' && this.maskStr.match(/^[^a-z0-9_#]/i)) {
      this.inputEl.value = this.maskStr.match(/^[^a-z0-9_#]/i)[0];
      this.maskEl.innerText =
        ' '.repeat(this.inputEl.value.length) +
        this.maskStr.substring(this.inputEl.value.length);
    }
  }

  static _handleKeyDown(event, prepended=false) {
    const inputChar = event.key;
    const maskArr = this.maskStr.split('');
    const matchingMask = maskArr[this.inputEl.value.length]; // matching mask character e.g. for 'yy/', 'y'

    const isCharInput = inputChar.match(/^\S$/);
    if (isCharInput && !matchingMask) {
      event.preventDefault(); // when too many input, ignore input
    } else if (isCharInput) { // character input
      const isAcceptable = Mask._isInputAcceptable(inputChar, matchingMask);
      !isAcceptable && event.preventDefault(); // if not match to mask char, ignore input
      Mask._addNextMask(this.inputEl, maskArr); // if next mask needed, add to the value

    } else { // for special char.
      // console.log('space char', {event, inputEl, inputChar});
    }
  }

  // if next chars is/are help char(s), append those. e.g., '/' at '99/99'
  static _addNextMask(inputEl, maskArr) {
    setTimeout( function() {
      const inputValLen = inputEl.value.length;
      for (let i = inputValLen; i < maskArr.length; i++) {
        const nextMask = maskArr[i];
        if (!(nextMask && !maskType[nextMask])) { break; }
        inputEl.value += nextMask;
      }
    });
  }

  // check if input char is acceptable or not by checking with mask character
  static _isInputAcceptable(inputChar, maskChar) {
    const reExpStr = maskType[maskChar];
    if (reExpStr) {
      const reStr = `^${reExpStr}$`;
      const re = new RegExp(reExpStr);
      return !!inputChar.match(re);
    }
  }
}
