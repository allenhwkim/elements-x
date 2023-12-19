
import { addCss, removeCss } from '../../util';
import * as cssM from './dropdown.css?inline';
import { getTrapFocusKeydownListener } from './get-trap-focus-keydown-listener';
const css = cssM.default;

export class Dropdown extends HTMLElement {
  dataTargetEl: any = undefined; // dropdown under this element, set data to this element when close
  closeEventName = 'select'; // when this event fires, close dropdown
  hiding = false; // prevent showing dropdown when hiding + input focus 
  cancelBlur = false; // prevent hiding dropdown when losing input focus + contents click
  trapFocusListener: any = undefined;
  hasFocusableEls: boolean = false;

  static get observedAttributes() { 
    return [
      'data-target',  // css selector, e.g. '#my-input'
      'close-event' // e.g. 'select'
    ]; 
  }

  attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (name === 'data-target') {
      const dataTargetEl = document.querySelector(newValue) as HTMLElement;
      dataTargetEl && (this.dataTargetEl = dataTargetEl);
    };
    (name === 'close-event') && (this.closeEventName = newValue);
  }


  connectedCallback() {
    addCss(this.tagName, css);
    this.classList.add('x', 'dropdown');
    !this.dataTargetEl && (this.dataTargetEl = this.previousElementSibling);

    setTimeout(() => { // contents render slowly
      const selector = 'a[href], button, textarea, input[type="text"], input:not([type]), input[type="radio"], input[type="checkbox"], select, [tabindex]';
      this.hasFocusableEls = !!this.querySelectorAll(selector).length;
    })

    this.style.minWidth = `${this.dataTargetEl.clientWidth}px`;

    this.dataTargetEl.addEventListener('focus', e => {
      !this.hiding && this.showDropdown();  // prevent loop when hideDropdown with focusing back
    });
    this.dataTargetEl.addEventListener('blur', e => {
      !this.cancelBlur && this.hideDropdown(); 
    });
    this.dataTargetEl.addEventListener('keydown', e => {
      (e.key === 'Enter')  && this.showDropdown();
      if (e.key === 'Tab' && this.hasFocusableEls) { // need to focus on the dropdown contents
        this.cancelBlur = true; 
        setTimeout(() => this.cancelBlur = false);
      }
    });

    setTimeout(() => {
      if (!this.dataTargetEl.parentElement.isSameNode(this.parentElement)) {
        console.error('[dropdown] dropdown element and position element must be in the same parent element');
      } else if (!this.isInPositionedEl(this)) {
        console.error('[dropdown] dropdown element must be in a positioned element');
      }
    }, 100);

    if (this.hasFocusableEls) {
      this.trapFocusListener = getTrapFocusKeydownListener(this);
      this.addEventListener('keydown', this.trapFocusListener);
    }

    this.addEventListener(this.closeEventName, this.hideHandler);
    window.addEventListener('resize', this.hideHandler);
    document.body.addEventListener('mousedown', this.hideHandler);
    document.body.addEventListener('keydown', this.hideHandler);
  }

  disconnectedCallback() {
    removeCss(this.tagName);
    this.removeEventListener('keydown', this.trapFocusListener);
    window.removeEventListener('resize', this.hideHandler);
    document.body.removeEventListener('mousedown', this.hideHandler);
    document.body.removeEventListener('keydown', this.hideHandler);
  }

  // dropdown element must be in a positioned element, e.g. 'relative', 'absolute'
  isInPositionedEl(el: HTMLElement) {
    do {
      el = el.parentElement as HTMLElement;
      if (!el)
        return false;
    } while (el && getComputedStyle(el).position === 'static');
    return true;
  }

  showDropdown() {
    const baseEl = this.dataTargetEl;

    // set dropdown position
    const elYPos = baseEl.getBoundingClientRect().bottom;
    const baseElAtBottom = window.innerHeight < elYPos + this.offsetHeight;
    if (baseElAtBottom) {
      this.style.top = `${baseEl.offsetTop - this.offsetHeight}px`;
    } else {
      this.style.top = `${baseEl.offsetTop + baseEl.offsetHeight}px`;
    }
    this.classList.add('visible');
  
    // if too right resulting not right-side visible
    const dropdownElEnd = this.getBoundingClientRect().right;
    if (dropdownElEnd > window.innerWidth) {
      const left = window.innerWidth - this.offsetWidth - 24;
      this.style.left = `${left}px`;
    }
  }

  hideDropdown(focusBackToDataTargetEl = false) {
    this.classList.remove('visible');
    if (focusBackToDataTargetEl) {
      this.hiding = true;
      setTimeout(() => (this.hiding = false)); // prevent opening again by focusing it
      this.hiding && this.dataTargetEl.focus();
    }
  }

  hideHandler = (event: any) => { // need to bind to this
    if (event.type === 'keydown' && (event as KeyboardEvent).key === 'Escape') {
      this.hideDropdown(true);
    } else if (event.type === 'resize') {
      this.hideDropdown();
    } else if (event.type === 'mousedown') {
      const mousedownInDropdown = this.contains(event.target as Node);
      const mousedownInDataTarget = this.dataTargetEl.contains(event.target as Node);
      if (mousedownInDropdown || mousedownInDataTarget) { // input el click, or dropdown click
        this.cancelBlur = true; 
        setTimeout(() => this.cancelBlur = false);
      } else {
        this.hideDropdown();
      }
    } else if (event.type === 'select') {
      this.dataTargetEl.value = event.detail?.innerText || event.detail;
      this.hideDropdown(true);
    }
  }

}
