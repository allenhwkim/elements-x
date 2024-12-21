import { addCss, removeCss } from '../../util';
import * as cssM from './masked.css?inline';
const css = cssM.default;

export class Masked extends HTMLElement {
  MASK_EXPR = {
    Y: '[0-9]', y: '[0-9]', 
    M: '[0-9]', m: '[0-9]', 
    D: '[0-9]', d: '[0-9]',
    9: '[0-9]', 
    '#': '[0-9]',
    X: '[a-zA-Z0-9]', x: '[a-zA-Z0-9]',
    A: '[a-zA-Z]', a: '[a-zA-Z]',
    _: '[0-9]'
  }; 

  static get observedAttributes() { return ["mask"]; }

  connectedCallback() {
    addCss(this.tagName, css);

    setTimeout(() => { // delaying for this.querySelector
      !this.querySelector('input') && 
        this.insertAdjacentHTML('beforeend', '<input />')

      const inputEl = this.querySelector('input') as HTMLInputElement;
     
      !this.#isInputValid() && (inputEl.value = '');
      inputEl.insertAdjacentElement('afterend', document.createElement('div'));
      this.render();

      inputEl.addEventListener('keydown', this.handleKeyDown.bind(this)); // determint to accept char input or not
      inputEl.addEventListener('input', this.setMaskElText.bind(this)); // change maskEl display
      inputEl.addEventListener('paste',this.handlePaste.bind(this));
    });
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

    this.setMaskElText(); // update mask el text by value of input el
  }

  setMaskElText() {
    const inputEl = this.querySelector('input') as HTMLInputElement;
    const maskEl =  this.querySelector('input + div') as HTMLElement;
    const mask = this.getAttribute('mask') as string;
    maskEl.innerText = ' '.repeat(inputEl.value.length) + (mask.substring(inputEl.value.length));
  }

  handlePaste(event) {
    const inputEl = this.querySelector('input') as HTMLInputElement;
    event.preventDefault(); // not to fire another input event
    !this.#isInputValid() && (inputEl.value = '');
    this.setMaskElText();
  }

  handleKeyDown(event) {
    const inputEl = this.querySelector('input') as HTMLInputElement;
    const inputChar = event.key;
    const mask = this.getAttribute('mask') as string;
    const matchingMask = (''+mask).split('')[inputEl.value.length];
    const isDateInput = mask.toLowerCase() === 'yyyy-mm-dd';

    const isCharInput = inputChar.match(/^\S$/);
    if (isCharInput && !matchingMask) {
      event.preventDefault(); // when too many input, ignore input
    } else if (inputChar === ' ') {  // space is added automatically
      event.preventDefault(); //
    } else if (isCharInput && (event.metaKey || event.ctrlKey)) { // allow copy/paste
    } else if (isDateInput && !this.#validDateInput(inputEl, inputChar)) { // if date input
      event.preventDefault();
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

  #isInputValid() {
    const inputEl = this.querySelector('input') as HTMLInputElement;
    const mask = this.getAttribute('mask') as string;

    const maskArr = (''+mask).split('');
    const reStr = maskArr.map(el => this.MASK_EXPR[el] || `\\${el}`).join('');
    const re = new RegExp(reStr);

    return inputEl.value.match(re)
  }
    
  #validDateInput(inputEl, inputChar) {
    const input= inputEl.value + inputChar;
    const lastChar = inputChar;
    const last2Char = input.slice(-2);
    const isCharInput = inputChar.match(/^\S$/);
    return !isCharInput ? true :
      input.length === 1 ? input >=1 && input <=2 :
      input.length === 2 ? input>=19 && input <= 21:
      input.length === 3 ? input>=196 && input<=210 :
      input.length === 4 ? input>=1969 && input<=2100 :
      input.length === 5 ? true:
      input.length === 6 ? lastChar >= 0 && lastChar <= 1 :
      input.length === 7 ? last2Char >= 1 && last2Char <= 12 :
      input.length === 8 ? true: 
      input.length === 9 ? lastChar >= 0 && lastChar <= 3:
      input.length === 10 ? last2Char >= 1 && last2Char <= 31: false;
  }

}
