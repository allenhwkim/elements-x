import { addCss, removeCss } from '../../lib';
import css from './input-mask.css';

export class InputMask extends HTMLElement {
  MASK_EXPR = {
    Y: '[0-9]', 
    M: '[0-9]', 
    D: '[0-9]',
    9: '[0-9]', 
    '#': '[0-9]',
    X: '[a-zA-Z0-9]',
    A: '[a-zA-Z]',
    _: '[0-9]'
  }; 

  static get observedAttributes() { return ["mask"]; }

  connectedCallback() {
    addCss(this.tagName, css);

    const inputEl = this.querySelector('input');
    if (!inputEl) {
      this.innerHTML = 'error: requires <input> element';
      return;
    }
    inputEl.insertAdjacentElement('afterend', document.createElement('div'));
    this.render();

    inputEl.addEventListener('keydown', this.handleKeyDown.bind(this)); // determint to accept char input or not
    inputEl.addEventListener('input', this.setMaskElText.bind(this)); // change maskEl display
    inputEl.addEventListener('paste',this.handlePaste.bind(this));
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.render();
  }

  render() {
    const inputEl = this.querySelector('input') as HTMLInputElement;
    const maskEl =  this.querySelector('input + div') as HTMLElement;
    if (!inputEl || !maskEl) return;

    const inputElStyle = getComputedStyle(inputEl);
    maskEl.classList.add('mask');
    maskEl.style.fontSize    = inputElStyle.fontSize;
    maskEl.style.paddingLeft = inputElStyle.paddingLeft;
    maskEl.style.borderWidth = inputElStyle.borderWidth; // border color is transparent
    maskEl.style.whiteSpace = 'pre';
    maskEl.innerText = this.getAttribute('mask') as string;

    inputEl.value = this.format(inputEl.value, this.getAttribute('mask') as string);
    this.setMaskElText(); // update mask el text by value of input el
  }

  setMaskElText() {
    const inputEl = this.querySelector('input') as HTMLInputElement;
    const maskEl =  this.querySelector('input + div') as HTMLElement;
    const mask = this.getAttribute('mask') as string;
    maskEl.innerText = ' '.repeat(inputEl.value.length) + (mask.substring(inputEl.value.length));
  }

  format(value, mask = 'YYYY-mm-dd') {
    let formatted = '';
    const valueArr = value.replace(/[^a-zA-Z0-9]/g, '').split('');
    const maskArr = (''+mask).split('');

    let maskChar = maskArr.shift();
    while(maskChar) {
      const maskExpr = this.MASK_EXPR[maskChar.toUpperCase()];

      if (valueArr[0]) {
        if (maskExpr) {
          const reStr = `^${maskExpr}$`; // e.g. `^[0-9]$`;
          if (valueArr[0].match(new RegExp(reStr))) {
            formatted += valueArr.shift();
          }
        } else {
          formatted += maskChar;
        }
      } else {
        break;
      }

      if (!valueArr[0]) break;
      maskChar = maskArr.shift();
    }

    maskChar = maskArr.shift();
    while(maskChar) {
      const maskExpr = this.MASK_EXPR[maskChar.toUpperCase()];
      if (maskExpr) {
        break;
      } else {
        formatted += maskChar;
      }
      maskChar = maskArr.shift();
    }

    return formatted;
  }

  handlePaste(event) {
    const inputEl = this.querySelector('input') as HTMLInputElement;
    const mask = this.getAttribute('mask') as string;

    inputEl.value = this.format(event.clipboardData.getData('text'), mask);
    this.setMaskElText();
    event.preventDefault(); // not to fire another input event
  }

  handleKeyDown(event) {
    const inputEl = this.querySelector('input') as HTMLInputElement;
    const inputChar = event.key;
    const mask = this.getAttribute('mask') as string;
    const matchingMask = (''+mask).split('')[inputEl.value.length];

    const isCharInput = inputChar.match(/^\S$/);
    if (isCharInput && !matchingMask) {
      event.preventDefault(); // when too many input, ignore input
    } else if (isCharInput && (event.metaKey || event.ctrlKey)) { // allow copy/paste
    } else if (isCharInput) { // character input
      const reStr = `^${this.MASK_EXPR[matchingMask.toUpperCase()]}$`; // e.g. `^[0-9]$`;
      const isCharAcceptable = inputChar.match(new RegExp(reStr));
      if (isCharAcceptable) {
        this.addNextMask(); //  // if next mask needed, add to input value
      } else {
        event.preventDefault(); // ignore input
      }
    } else { // for special char. e.g. backspace key
    }
  }

  addNextMask() {
    const inputEl = this.querySelector('input') as HTMLInputElement;
    const mask = this.getAttribute('mask') as string;
    const maskArr = (''+mask).split('');

    setTimeout( () => { // to handle keydown and input event, this performs after input event
      const inputValLen = inputEl.value.length;
      for (let i = inputValLen; i < maskArr.length; i++) {
        const nextMask = maskArr[i];
        if (!(nextMask && !this.MASK_EXPR[nextMask.toUpperCase()])) { break; }
        inputEl.value += nextMask;
      }
    });
  }
}
