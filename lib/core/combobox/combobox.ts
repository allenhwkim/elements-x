import { addCss, removeCss, debounce, getReactProp } from '../../util';
import * as cssM from './combobox.css?inline';
const css = cssM.default;

function isValidUrl(string) {
  if (string.startsWith('/')) { // e.g. /countries.json
    return true;
  }

  try {
    const url = new URL(string);
    return url.protocol?.startsWith('http');
  } catch (e) {
    return false;  
  }
}

export class ComboBox extends HTMLElement {
  value: HTMLElement | undefined;
  required = false;

  // dropdown source
  list: any[] | undefined; // from an array
  searchFunc: ((key: string) => Promise<any>) | undefined;  // from a custoin function
  dataUrl = ''; // from 'data-url' attribute, a url
  dynamicSearch = false;

  dataPath= ''; // from 'data-path' attribute, to find data path from API response
  listTemplate = ''; // to display dropdown

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
    setTimeout(() => this.init())
  }

  disConnnectedCallback() {
    removeCss(this.tagName);
  }

  // properties  src={function} or src={array}

  // url with [[input]]
  // change the list by API response with list-path="products", default ""

  // url without [[search]]
  // filter the dropdown with the keyboard input
  async init() { 
    this.dataUrl = this.getAttribute('data-url') as string; // e.g. "https://dummyjson.com/products/search?q=[[input]]"
    this.dataPath = this.getAttribute('data-path') as string; // e.g. "products.foo.bar"
    this.dynamicSearch = this.dataUrl?.indexOf('[[input]]') > 0;

    // initialize dropdown, ulEl
    const inputEl = this.querySelector('input') as any;
    const ulEl = this.querySelector('ul') as any;

    const isDisabled = inputEl?.readOnly || inputEl?.disabled;
    if (!inputEl) {
      this.textContent = 'error: requires <input>';
      return;
    } else if (!isDisabled && !ulEl) {
      this.textContent = 'error: requires <ul>';
      return;
    }

    if (this.dataUrl && (this.dataUrl as any||'').match(/^(http|\/)/)) {
      this.listTemplate = ulEl.children[0]?.outerHTML;
      ulEl.innerHTML = '';
      if (this.dynamicSearch) { // build list when user enters input
        this.rewriteListEl(ulEl, [], this.listTemplate)
      } else { // build list now, then filter out when user enters input
        const resp = await fetch(this.dataUrl as any)
        const json = await resp.json();
        const list = this.getListData(json);
        this.rewriteListEl(ulEl, list, this.listTemplate);
      }
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

    // const inputListener = typeof this.searchFunc === 'function' ? 
    //   debounce(() => (this.searchFunc as Function)(inputEl.value).then((resp: any) => {
    //     if (Array.isArray(resp)) {
    //       this.rewriteListEl(ulEl, resp, this.listTemplate)
    //     } else {
    //       console.error('combobox, searchFunc response is not an array', resp);
    //     }
    //   }), 500) : () => this.highlightSearch(ulEl, inputEl.value);

    const inputListener = this.getInputListener();
    inputEl.addEventListener('input', inputListener);

    // mousedown -> inputEl.blur(), hide dropdown -> input:focus, show dropdown, 
    // do not call selectHandler with click event, but only with mousedown
    if (ulEl) { // readonly or disabled does not have ulEl
      ulEl.addEventListener('mousedown', (event) => this.selectHandler(event));
    }
  }

  getInputListener() {
    const inputEl = this.querySelector('input') as any;
    const ulEl = this.querySelector('ul') as any;
    if (this.dataUrl && this.dynamicSearch) {
      return debounce( () => {
        const url = this.dataUrl.replace('[[input]]', inputEl.value);
        return fetch(url)
          .then(resp => resp.json())
          .then(resp => this.getListData(resp))
          .then(list => this.rewriteListEl(ulEl, list, this.listTemplate));
      }, 500);
    } else {
      return () => this.highlightSearch(ulEl, inputEl.value);
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

  getListData(obj) {
    if (this.dataPath) {
      const paths = this.dataPath.split('.');
      const list = paths.reduce( (acc, path) => acc[path], obj);
      return list;
    } else {
      return obj;
    }
  }
}