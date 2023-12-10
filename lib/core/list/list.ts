import { addCss, removeCss } from '../../util';
import * as cssM from './list.css?inline';
const css = cssM.default;

export class List extends HTMLElement {
  value: HTMLElement | undefined;
  required: boolean = false;

  static get observedAttributes() { return ['selected', 'required']; }

  connectedCallback() {
    addCss(this.tagName, css);
    this.addEventListener('keydown', e => this.keydownHandler(e));
    this.addEventListener('click', e => this.clickHandler(e));
    this.render();
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (name === 'required') && (this.required = newValue !== null);
    (oldValue !== newValue) && this.render();
  }

  render() {
    const selected = this.getAttribute('selected');
    this.init(); // set tabindex attr, and hide all <ul>
    this.initHighlightAndSelect(selected); // expand selected on
  }

  clickHandler(event: any) {
    const liEl = event.target?.closest('li');
    if (liEl) {
      this.toggleChildList(event.target.closest('li'));
      const highlightedEl = this.highlightEl(liEl);
      this.fireSelect(highlightedEl);
    }
  }

  keydownHandler(event: any) {
    const highlightNextEl = (inc=1, siblingOnly=false) => {
      const allEls = this.querySelectorAll(siblingOnly ? 'ul:has(.x-highlighted) > li:not(.disabled)': 'li:not(.disabled)');
      const visibles: any[] = [...allEls].filter((el:any) => el.offsetParent !== null);
      const curIndex = visibles.indexOf(this.querySelector('.x-highlighted'));
      const nxtIndex = (visibles.length + curIndex + inc) % visibles.length;

      visibles[curIndex]?.classList.remove('x-highlighted');
      visibles[nxtIndex]?.classList.add('x-highlighted');
    }

    if (['Enter', 'Space'].includes(event.code)) {
      this.toggleChildList(event.target.closest('li'));
      const highlightedEl = this.querySelector('.x-highlighted');
      (event.code === 'Enter') && this.fireSelect(highlightedEl);
    } else if (event.code === 'ArrowUp') {
      highlightNextEl(-1);
    } else if (event.code === 'ArrowDown') {
      highlightNextEl(1);
    } else if (event.code === 'ArrowLeft') {
      highlightNextEl(-1, true);
    } else if (event.code === 'ArrowRight') {
      highlightNextEl(1, true);
    }
    if (['Enter', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event.code)) {
      event.stopPropagation();
      event.preventDefault();
    }
  } 

  init() {
    const ulEl = this.querySelector('ul') as HTMLElement;
    if (ulEl) {
      !ulEl.getAttribute('tabindex') && ulEl.setAttribute('tabindex', '0');
      ulEl.querySelectorAll('li > ul, li > * > ul').forEach(el => el.setAttribute('hidden', ''));
    }
  }

  initHighlightAndSelect(selected) {
    const isMenuStyle = this.querySelector('ul.menu')
    const ulEl = this.querySelector('ul') as HTMLElement;
    if (ulEl) {
      const liEl = ulEl.querySelector('#'+ selected || 'unknown') as HTMLElement;
      if (!isMenuStyle && liEl) {
        liEl.classList.add('x-highlighted');
        let expandable = (liEl.parentElement as any).closest('ul');
        while(expandable && ulEl.contains(expandable)) { 
          expandable.removeAttribute('hidden');
          expandable = expandable.parentElement?.closest('ul');
        }
        const highlightedEl = this.querySelector('.x-highlighted');
        this.fireSelect(highlightedEl);
      }
    }
  }

  highlightEl(el: any): HTMLLIElement | undefined {
    this.querySelector('.x-highlighted')?.classList.remove('x-highlighted');
    if (el.querySelector('ul')) {
      return undefined; 
    } else {
      el.classList.add('x-highlighted');
      return el;
    }
  }

  toggleChildList(el) {
    const child = el?.querySelector('ul');
    if (child) {
      child.getAttribute('hidden') !== null ?
        child.removeAttribute('hidden') : child.setAttribute('hidden', '');
    }
  }

  fireSelect(selectedEl) {
    const event = new CustomEvent('select', { bubbles: true, composed: true, detail: selectedEl });
    selectedEl?.dispatchEvent(event);
    this.value = selectedEl;
    console.log('..........', this.required, this.value);
    if (this.required) {
      this.value ? this.classList.remove('error', 'required') : this.classList.add('error', 'required');
    }
  }
}
