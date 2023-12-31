import { addCss, removeCss, debounce, getReactProp } from '../../util';
import * as cssM from './combobox.css?inline';
const css = cssM.default;

export class ComboBox extends HTMLElement {
  value: HTMLElement | undefined;
  required: boolean = false;
  src: undefined | ((key: string) => Promise<any>); 
  srcTemplate: string = '';

  static get observedAttributes() { return ['selected', 'required']; }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (name === 'required') && (this.required = newValue !== null);
    if (name === "value") {
      const ulEl = this.querySelector('ul') as any;
      this.highlightValue(ulEl, newValue);
    }
  }

  connectedCallback() { 
    addCss(this.tagName, css);
    this.classList.add('x', 'combobox');
    setTimeout(() => this.init())
  }

  disConnnectedCallback() {
    removeCss(this.tagName);
  }

  init() { 
    const inputEl = this.querySelector('input') as any;
    const ulEl = this.querySelector('ul') as any;
    if (this.src && ulEl) {
      this.srcTemplate = ulEl.children[0]?.outerHTML;
      ulEl.innerHTML = '';
    }
    
    const isDisabled = inputEl?.readOnly || inputEl?.disabled;
    if (!inputEl) {
      this.textContent = 'error: requires <input>';
      return;
    } else if (!isDisabled && !ulEl) {
      this.textContent = 'error: requires <ul>';
      return;
    }

    inputEl.addEventListener('focus', () => this.highlightValue(ulEl, inputEl.value))

    // remove highlighted part when input focused out to remove duplicated highlighting.
    inputEl.addEventListener('blur', event => { 
      const highlightedEl = ulEl.querySelector('.highlighted');
      highlightedEl?.classList.remove('highlighted');
      if (this.required) {
        this.classList[this.value ? 'remove': 'add']('error', 'required');
      }
    });

    inputEl.addEventListener('keydown', (event: any) => {
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
        if      (event.key === 'ArrowDown') { this.highlightNext( ulEl, 1); }
        else if (event.key === 'ArrowUp') { this.highlightNext( ulEl, -1); } 
        else if (event.key === 'Escape') { inputEl.blur(); }
        else if (event.key === 'Enter') { 
          this.selectHandler(event); 
          inputEl.blur();
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    });

    const inputListener = this.src ? 
      debounce(() => (this.src as Function)(inputEl.value).then((resp: any) => {
        if (Array.isArray(resp)) {
          this.rewriteListEl(ulEl, resp, this.srcTemplate)
        } else {
          console.error('combobox, src response is not an array', resp);
        }
      }), 500) : () => this.highlightSearch(ulEl, inputEl.value);
    inputEl.addEventListener('input', inputListener);

    // mousedown -> inputEl.blur(), hide dropdown -> input:focus, show dropdown, 
    // do not call selectHandler with click event, but only with mousedown
    if (ulEl) { // readonly or disabled does not have ulEl
      ulEl.addEventListener('mousedown', (event) => this.selectHandler(event));
    }
  }

  selectHandler(event) {
    const ulEl = this.querySelector('ul');
    const inputEl = this.querySelector('input') as any;
    const highlightedEl = event.type === 'mousedown' ? 
      event.target.closest('li') : this.querySelector('.highlighted:not(.hidden)') as any;
    ulEl?.querySelector('.selected')?.classList.remove('selected');
    ulEl?.querySelector('.highlighted')?.classList.remove('highlighted');

    if (highlightedEl) {
      const strValue = highlightedEl.dataset?.value || highlightedEl.getAttribute('value') || highlightedEl.innerText;
      inputEl.value = highlightedEl.innerText;
      this.value = highlightedEl;
      highlightedEl.classList.add('highlighted', 'selected');
      highlightedEl.toString = () => strValue;
      this.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: highlightedEl }));
    }
  }

  /**
   * Find an element that has attribute 'value' is the same as the given value from the list element.
   */
  highlightValue(listEl: any, value: string) {
    const highlightedEl = listEl.querySelector('.highlighted:not(.hidden)')

    const nextHighlight = [...listEl.children].find((liEl) => {
      return (liEl.dataset.value === value) || 
        (liEl.getAttribute('value') === value) ||
        (liEl.innerText === value);
    })

    if (nextHighlight) {
      highlightedEl?.classList.remove('highlighted', 'selected');
      nextHighlight.classList.add('highlighted', 'selected');
      this.scrollIfNeeded(listEl, nextHighlight);
    }
  }

  /**
   * Rebuild list from the given array
   */
  rewriteListEl(listEl: any, rows: any[], template: string) {
    const replExprs = template.match(/\[\[.*?\]\]/g) || [];
    // rewrite list elements
    listEl.innerHTML = '';
    rows.forEach( (row) => {
      let html = template;
      replExprs.forEach( (expr) => {
        const key = expr.match(/\[\[(.*?)\]\]/)?.[1] as string;
        html = html.replace(expr, row[key]);
      });
      listEl.insertAdjacentHTML('beforeend', html);
      (listEl.lastElementChild).data = row;
    })
    listEl.children[0]?.classList.add('highlighted');
  }

  /**
   * Hide all child elements of list element that does not have search string
   * by removing highlighted class and adding hidden class.
   * It also add highted class to the first searched element.
   */
  highlightSearch(listEl: any, search: string) {
    const matches = [...listEl.children].filter((el) => {
      const re = new RegExp(search.replace(/\\/g, '\\\\'), 'i');
      const match = el.innerText.match(re);
      el.classList.remove('highlighted');
      el.removeAttribute('hidden');
      if (!match) {
        el.setAttribute('hidden', '');
      }
      return match;
    });
    matches[0]?.classList.add('highlighted');
  }

  /**
   * Find the current highlighted class, and move highting to the next element
   */
  highlightNext(listEl: any, inc=1) {
    const highlightedEl = listEl.querySelector('.highlighted:not(.hidden)');
    const notDisaledOrHidden = [...listEl.children].filter(liEl => {
      const notDisabled = !liEl.classList.contains('disabled');
      const notHidden = !liEl.classList.contains('hidden');
      return notDisabled && notHidden;
    });

    const curIndex = notDisaledOrHidden
      .findIndex(el => el.isEqualNode(highlightedEl)) || 0;
    const total = notDisaledOrHidden.length;

    const nextHighlight = notDisaledOrHidden[(curIndex + total + inc) % total];

    highlightedEl?.classList.remove('highlighted');
    nextHighlight.classList.add('highlighted');
    this.scrollIfNeeded(listEl, nextHighlight);
  }

  /**
   * scroll to the given element within a container.
   */
  scrollIfNeeded(container: HTMLElement, element: HTMLElement) {
    if (element.offsetTop < container.scrollTop) {
      container.scrollTop = element.offsetTop;
    } else {
      const offsetBottom = element.offsetTop + element.offsetHeight;
      const scrollBottom = container.scrollTop + container.offsetHeight;
      if (offsetBottom > scrollBottom) {
        container.scrollTop = offsetBottom - container.offsetHeight;
      }
    }
  }
}