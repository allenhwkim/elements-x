import { addCss, removeCss, debounce, getReactProp } from '../../util';
import * as cssM from './combobox.css?inline';
const css = cssM.default;

export class ComboBox extends HTMLElement {
  value: HTMLElement | undefined;
  required = false;

  // dropdown source
  dataUrl = ''; // from 'data-url' attribute, a url
  dataPath= ''; // from 'data-path' attribute, to find data path from API response

  _dataFunction: ((key: string) => Promise<any>) | undefined;  // from a custom function
  set dataFunction(val: any) { this._dataFunction = val; this.rewriteListEl(val); }
  get dataFunction() { return this._dataFunction; }

  _dataList: any[] | undefined; // from an array
  set dataList(val: any) { this._dataList = val; this.rewriteListEl(val); }
  get dataList() { return this._dataList; }

  // e.g. <li data-value="[[key]]">[[key]]</li>
  listTemplate = ''; // from first <li>, to display dropdown

  static get observedAttributes() { return ['selected', 'required']; }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (name === 'required') {
      this.required = newValue !== null;
    } else if (name === "value") {
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
  async init() { 
    this.dataUrl = this.getAttribute('data-url') as string; // e.g. "https://dummyjson.com/products/search?q=[[input]]"
    this.dataPath = this.getAttribute('data-path') as string; // e.g. "products.foo.bar"

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

    if (this.dataUrl || this.dataFunction || this.dataList) {
      this.listTemplate = ulEl.firstElementChild.outerHTML;
      ulEl.innerHTML = '';
    }

    if (this.dataUrl && (this.dataUrl as any||'').match(/^(http|\/)/)) {
      const dynamicSearch = this.dataUrl?.indexOf('[[input]]') > 0; // replace dateUrl with key
      if (dynamicSearch) { // build list when user enters input
        this.rewriteListEl([]); // show empty list at the begining
      } else { // build list now, then filter out when user enters input
        const resp = await fetch(this.dataUrl as any)
        const json = await resp.json();
        const list = this.getListData(json);
        this.rewriteListEl(list);
      }
    } else if (this.dataFunction) {
      this.rewriteListEl([])
    } else if (this.dataList) {
      this.rewriteListEl(this.dataList)
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
    const dynamicSearch = this.dataUrl?.indexOf('[[input]]') > 0; // replace dateUrl with key
    if (this.dataUrl && dynamicSearch) {
      return debounce( () => {
        const url = this.dataUrl.replace('[[input]]', inputEl.value);
        return fetch(url)
          .then(resp => resp.json())
          .then(resp => this.getListData(resp))
          .then(list => this.rewriteListEl(list));
      }, 500);
    } else if (this.dataFunction) {
      return debounce(() => {
        return (this.dataFunction as Function)(inputEl.value)
          .then(resp => this.rewriteListEl(resp))
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
  rewriteListEl(rows: any[]) {
    if (!this.isConnected) return;

    if (rows && !Array.isArray(rows) && typeof rows === 'object') {
      rows = Object.entries(rows).map( ([key, value]) => ({key, value}));
    }
    const ulEl = this.querySelector('ul') as HTMLUListElement;

    const replExprs = this.listTemplate.match(/\[\[.*?\]\]/g) || [];
    // rewrite list elements
    ulEl.innerHTML = '';
    rows.forEach( (row) => {
      let html = this.listTemplate;
      replExprs.forEach( (expr) => {
        const key = expr.match(/\[\[(.*?)\]\]/)?.[1] as string;
        html = html.replace(expr, row[key]);
      });
      ulEl.insertAdjacentHTML('beforeend', html);
      (ulEl.lastElementChild as any).data = row;
    })
    ulEl.children[0]?.classList.add('highlighted');
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