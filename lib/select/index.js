import {addCss, removeCss, waitUntilIdle, define, waitUntil} from '../common';
import css from './select.css';
import {highlight, getHighlighted} from './highlight';

export class XSelect extends HTMLElement {
  get value() { return this._value; }
  set value(val) {
    this._value = val;
    waitUntil.bind(this)(
      _ => this.inputEl).then(_ => {
        const el = highlight(this, {value: val}); // highlight el with value
        if (el) {
          this.displayValue = el ? el.innerText : '';
          this.inputEl.value = this.displayValue || '';
        } else if (!val) {
          this.displayValue = '';
          this.inputEl.value = '';
        }
      }, 
      e => {
        // console.error(e) ;
      });
  }

  get disabled() { return this._disabled;}
  set disabled(val) {
    this._disabled = val;
    waitUntil.bind(this)(_ => this.inputEl).then(_ => {
      this.inputEl.disabled = val;
    });
  }

  static get observedAttributes() { 
    return ['value', 'disabled', 'required', 'placeholder', 'read-only']; 
  }

  connectedCallback() {
    addCss(this, css);
    waitUntilIdle(this) // wait for some framework finish this.children rendering
      .then(_ => {
        this.prependInputEl();

        Array.from(this.children).forEach(optionEl => { // set value attribute
          const noValueAttr = optionEl.getAttribute('value') === null;
          noValueAttr && optionEl.setAttribute('value', optionEl.innerText);
        });
        // 'blur' event prevent 'click' event from firing. Thus using 'mousedown'
        this.addEventListener('mousedown', event => {
          this._select(event.target.closest('[value]'));
        });
        this.addEventListener("click", (event) => { // fixing bug of focus back to inputEl on click(mousedown)
          setTimeout(_=> this.inputEl.blur());
        });
      });
  }

  disconnectedCallback() {
    removeCss(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.inputEl?.setAttribute(name, newValue);
    (name === 'value') && (this.value = newValue);
    (name === 'disabled') && (this.disabled = [null, '', 'true'].includes(newValue));
    (name === 'read-only') && (this.readOnly = newValue !== null);
  }

  prependInputEl() {
    this.inputEl = document.createElement('input');
    this.inputEl.setAttribute('aria-label', 'select input');
    this.inputEl.classList.add('x-select');
    this.insertAdjacentElement('beforebegin', this.inputEl);
    const size = this.getAttribute('size');
    size && (this.inputEl.style.width = size + 'rem');

    if (this.parentElement) {
      if (window.getComputedStyle(this.parentElement).position === 'static') {
        this.parentElement.style.position = 'relative';
      }
      if (window.getComputedStyle(this.parentElement).display === 'inline') {
        this.parentElement.style.display = 'inline-block';
      }
    }

    XSelect.observedAttributes.forEach(attrName => {
      this.getAttribute(attrName) !== null && 
        this.inputEl.setAttribute(attrName, this.getAttribute(attrName));
    });
  
    this.inputEl.addEventListener('keydown', this.onInputElKeydown.bind(this));
    this.inputEl.addEventListener('input', this.onInputElInput.bind(this));
    
    this.inputEl.addEventListener('focus', _ => {
      this.showWithAnimation();
      const el = highlight(this, {value: this.value}); // highlight el with value
      this.displayValue = el ? el.innerText : '';
    });

    this.inputEl.addEventListener('blur', _ => {
      this.hideWithAnimation();
    });
  }

  onInputElKeydown(event) { // input key event handler
    if (event.key === 'ArrowDown') {
      highlight(this, {prevNext: 'NEXT'});
    } else if (event.key === 'ArrowUp') {
      highlight(this, {prevNext: 'PREV'});
    } else if (event.key === 'Enter') {
      this._select(getHighlighted(this));
    } else if (event.key === 'Escape') {
      this.inputEl.blur();
    }
    const isDropdownKey = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key);
    if (isDropdownKey || this.readOnly) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }

  onInputElInput(event) { // input key event handler
    if (this.readOnly) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    } else { // search
      highlight(this, {search: this.inputEl.value});
    }
  }

  _select(optionEl) {
    if (!optionEl) return;
    if (optionEl.getAttribute('disabled') !== null) return;

    this.value = optionEl.value || optionEl.getAttribute('value');
    this.displayValue = optionEl.innerText;
    this.inputEl.value = optionEl.getAttribute('value') === '' ? '' : optionEl.innerText;
    this.dispatchEvent(new Event('change', {bubbles: true}));
    this.inputEl.blur();
  }

  showWithAnimation() {
    // appear with animation
    this.style.transition = 'opacity 0.25s linear';
    this.style.minWidth = this.inputEl.offsetWidth + 'px';
    this.style.display = 'block';
    this.style.opacity =  1;

    // place this under newly-prepended inputEl
    this.setDropdownPosition(this.inputEl, this);
  }
  
  hideWithAnimation() {
    this.style.opacity = 0;
    setTimeout(_ => this.style.display = 'none', 250);
  }

  setDropdownPosition(inputEl, dropdownEl) {
    const elYPos = inputEl.getBoundingClientRect().bottom;
    const inputElAtBottom = window.innerHeight < elYPos + dropdownEl.offsetHeight;
    if (inputElAtBottom) {
      dropdownEl.style.top = `${inputEl.offsetTop - dropdownEl.offsetHeight}px`;
    } else {
      dropdownEl.style.top = `${inputEl.offsetTop + inputEl.offsetHeight}px`;
    }

    dropdownEl.style.left = `${inputEl.offsetLeft}px`;
    dropdownEl.style.minWidth = inputEl.offsetWidth + 'px';

    // if too much to the right, adjust the position
    const dropdownElEnd = dropdownEl.getBoundingClientRect().right;
    if (dropdownElEnd > window.innerWidth) {
      const left = window.innerWidth - dropdownElEnd.offsetWidth - 24;
      dropdownEl.style.left = `${left}px`;
    }
  }
}

XSelect.define = define('x-select', XSelect);
