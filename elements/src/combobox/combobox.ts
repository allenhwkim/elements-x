import { addCss, removeCss, debounce, getReactProp } from '../../lib';
import css from './combobox.css';

export class ComboBox extends HTMLElement {
  listTemplate = '';

  disConnnectedCallback() {
    removeCss(this.tagName);
  }

  connectedCallback() { 
    addCss(this.tagName, css);
    const inputEl = this.querySelector('input');
    const ulEl = this.querySelector('ul');
    const attrPropName = this.getAttribute('src');
    const srcFunc = attrPropName ? (this[attrPropName] || globalThis[attrPropName]) :  getReactProp(this as any, 'src');
    if (srcFunc && ulEl) {
      this.listTemplate = ulEl.children[0]?.outerHTML;
      ulEl.innerHTML = '';
    }
    
    if (!inputEl || (!(inputEl.readOnly || inputEl.disabled) && !ulEl)) {
      this.textContent = 'error: requires <input> and <ul>';
      return;
    }

    if (!(inputEl && ulEl)) {
      return; // readonly or disabled ones
    }

    inputEl.addEventListener('focus', () => this.highlightValue(ulEl, inputEl.value))

    // remove highlighted part when input focused out to remove duplicated highlighting.
    inputEl.addEventListener('blur', function(event) { 
      const highlightedEl = ulEl.querySelector('x-highlighted');
      highlightedEl?.classList.remove('x-highlighted');
    });

    inputEl.addEventListener('keydown', (event: any) => {
      const highlightedEl = this.querySelector('.x-highlighted:not(.hidden)');
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
        if      (event.key === 'ArrowDown') { this.highlightNext( ulEl, 1); }
        else if (event.key === 'ArrowUp') { this.highlightNext( ulEl, -1); } 
        else if (event.key === 'Escape') { inputEl.blur(); }
        else if (event.key === 'Enter') { 
          this.querySelector('.x-selected')?.classList.remove('x-selected');
          this.selectHandler(event, inputEl, highlightedEl);
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    });

    const inputListener = srcFunc ? 
      debounce(() => srcFunc(inputEl.value).then((resp: any) => {
        if (Array.isArray(resp)) {
          this.rewriteListEl(ulEl, resp, this.listTemplate)
        } else {
          console.error('combobox, src response is not an array', resp);
        }
      }), 500) : () => this.highlightSearch(ulEl, inputEl.value);
    inputEl.addEventListener('input', inputListener);

    // mousedown -> inputEl.blur(), hide dropdown -> input:focus, show dropdown, 
    // do not call selectHandler with click event, but only with mousedown
    ulEl.addEventListener('mousedown', (event) => { 
      const highlightedEl = ulEl.querySelector(`.x-highlighted:not(.hidden)`);
      ulEl.querySelector('.x-selected')?.classList.remove('x-selected');
      this.selectHandler(event, inputEl, highlightedEl)
    });
  }

  /* action when an dropdown list is selected */
  selectHandler(event: any, inputEl: HTMLInputElement, highlightedEl: any) {
    const liEl = event.target.closest('ul') && event.target.closest('li');
    if (event instanceof MouseEvent && liEl) { // <li> mouse clicked
      const value = liEl.dataset.value !== undefined ?  liEl.dataset.value : liEl.innerText;
      const detail = liEl.data || value;
      liEl.dispatchEvent(new CustomEvent('select', {bubbles: true, detail}));
      inputEl.value = value;
      inputEl.blur();
    } else if (event instanceof KeyboardEvent && highlightedEl) { // keyboard enter
      const value = highlightedEl.dataset.value !== undefined ?  highlightedEl.dataset.value : highlightedEl.innerText;
      const detail = highlightedEl.data || value;
      highlightedEl.dispatchEvent(new CustomEvent('select', {bubbles: true, detail}));
      inputEl.value = value;
      inputEl.blur();
    }
  }

  /**
   * Find an element that has attribute 'value' is the same as the given value from the list element.
   */
  highlightValue(listEl: any, value: string) {
    const highlightedEl = listEl.querySelector('.x-highlighted:not(.hidden)')

    const nextHighlight = [...listEl.children].find((liEl) => {
      return (liEl.dataset.value === value) || (liEl.innerText === value);
    })

    if (nextHighlight) {
      highlightedEl?.classList.remove('x-highlighted', 'x-selected');
      nextHighlight.classList.add('x-highlighted', 'x-selected');
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
    listEl.children[0]?.classList.add('x-highlighted');
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
      el.classList.remove('x-highlighted');
      el.removeAttribute('hidden');
      if (!match) {
        el.setAttribute('hidden', '');
      }
      return match;
    });
    matches[0]?.classList.add('x-highlighted');
  }

  /**
   * Find the current highlighted class, and move highting to the next element
   */
  highlightNext(listEl: any, inc=1) {
    const highlightedEl = listEl.querySelector('.x-highlighted:not(.hidden)');
    const notDisaledOrHidden = [...listEl.children].filter(liEl => {
      const notDisabled = !liEl.classList.contains('disabled');
      const notHidden = !liEl.classList.contains('hidden');
      return notDisabled && notHidden;
    });

    const curIndex = notDisaledOrHidden
      .findIndex(el => el.isEqualNode(highlightedEl)) || 0;
    const total = notDisaledOrHidden.length;

    const nextHighlight = notDisaledOrHidden[(curIndex + total + inc) % total];

    highlightedEl?.classList.remove('x-highlighted');
    nextHighlight.classList.add('x-highlighted');
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