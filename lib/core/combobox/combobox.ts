import { addCss, removeCss, debounce, getReactProp } from '../../util';
import * as cssM from './combobox.css?inline';
const css = cssM.default;

/**
 * build dropdown list with user input
 * - dataUrl(/dataPath) with {{q}} 
 * - dataFunction 
 * 
 * build dropdown list when init
 * - dataUrl(/dataPath) without {{q}}
 * - dataList
 * 
 * when attribute changes, it is initialized again
 */
export class ComboBox extends HTMLElement {
  inputEl!: HTMLInputElement;
  ulEl!: HTMLUListElement;

  dataUrl = ''; // from 'data-url' attribute, a url
  dataPath = ''; // with dataUrl, from 'data-path' attribute, to find data path from API response

  selectExpr = ''; // from 'select-expr' attribute. what to select from list, e.g. '{{value}}'
  displayExpr = ''; // from 'display-expr' attribute. what to show from list e.g. '{{id}}-{{value}}'

  _dataFunction: ((key: string) => Promise<any>) | undefined;  // from a custom function
  set dataFunction(val: any) { this._dataFunction = val; this.rewriteListEl([]); }
  get dataFunction() { return this._dataFunction; }

  _dataList: any[] | undefined; // from an array
  set dataList(val: any) { this._dataList = val; this.rewriteListEl(val); }
  get dataList() { return this._dataList; }

  static get observedAttributes() { 
    return [ 'select-expr', 'display-expr', 'data-url', 'data-path' ]; 
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (!this.isConnected) return;
    this.init();
  }

  connectedCallback() { 
    addCss(this.tagName, css);
    setTimeout(() => {
      this.inputEl = this.querySelector('input') as any;
      this.ulEl = this.querySelector('ul') as any;

      if (!this.inputEl) {
        this.inputEl = document.createElement('input');
        this.insertAdjacentElement('afterbegin', this.inputEl);
      }
      if (!this.ulEl) {
        this.ulEl = document.createElement('ul');
        this.inputEl.after(this.ulEl);
      }

      this.init();
    })
  }

  disConnnectedCallback() {
    removeCss(this.tagName);
  }

  // properties  src={function} or src={array}
  async init() { 
    this.dataUrl = this.getAttribute('data-url') as string; // e.g. "https://dummyjson.com/products/search?q={{q}}"
    this.dataPath = this.getAttribute('data-path') as string; // e.g. "products.foo.bar"
    this.selectExpr = this.getAttribute('select-expr') as string; // e.g. '{{key}}'
    this.displayExpr = this.getAttribute('display-expr') as string; // e.g. '{{key}}-{{value}}'

    if (this.dataUrl && (this.dataUrl as any||'').match(/^(http|\/)/)) {
      const dynamicSearch = this.dataUrl.indexOf('{{q}}') > 0; // replace dateUrl with key
      if (dynamicSearch) { // build list when user enters input
        this.rewriteListEl([]); // show empty list at the begining
      } else { // build list now, then filter out when user enters input
        const resp = await fetch(this.dataUrl as any)
        const json = await resp.json();
        const list = this.#getListData(json, this.dataPath);
        this.rewriteListEl(list);
      }
    } else if (this.dataFunction) {
      this.rewriteListEl([])
    } else if (this.dataList) {
      this.rewriteListEl(this.dataList)
    }
    
    this.inputEl.addEventListener('focus', () => this.highlightValue(this.inputEl.value))

    // remove highlighted part when input focused out to remove duplicated highlighting.
    this.inputEl.addEventListener('blur', event => { 
      const highlightedEl = this.ulEl.querySelector('.highlighted');
      highlightedEl?.classList.remove('highlighted');
    });

    this.inputEl.addEventListener('keydown', (event: any) => {
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
        if      (event.key === 'ArrowDown') { this.highlightNext(1); }
        else if (event.key === 'ArrowUp') { this.highlightNext(-1); } 
        else if (event.key === 'Escape') { this.inputEl.blur(); }
        else if (event.key === 'Enter') { 
          this.selectHandler(event); 
          this.inputEl.blur();
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    });

    this.inputEl.addEventListener('input', this.getInputListener());

    // mousedown -> inputEl.blur(), hide dropdown -> input:focus, show dropdown, 
    // do not call selectHandler with click event, but only with mousedown
    this.ulEl.addEventListener('mousedown', (event) => this.selectHandler(event));
  }

  getInputListener() {
    if (this.dataUrl && this.dataUrl.indexOf('{{q}}') > 0) {
      return debounce( () => {
        const url = this.dataUrl.replace('{{q}}', this.inputEl.value);
        return fetch(url)
          .then(resp => resp.json())
          .then(resp => this.#getListData(resp, this.dataPath))
          .then(list => this.rewriteListEl(list));
      }, 500);
    } else if (this.dataFunction) {
      return debounce(() => {
        return (this.dataFunction as Function)(this.inputEl.value)
          .then(resp => this.rewriteListEl(resp))
      }, 500);
    } else {
      return () => this.highlightSearch(this.inputEl.value);
    }
  }

  selectHandler(event) {
    const highlightedEl = event.type === 'mousedown' ? 
      event.target.closest('li') : this.querySelector('.highlighted:not(.hidden)') as any;
    this.ulEl.querySelector('.selected')?.classList.remove('selected');
    this.ulEl.querySelector('.highlighted')?.classList.remove('highlighted');

    if (highlightedEl) {
      highlightedEl.classList.add('highlighted', 'selected');
      const strValue = highlightedEl.dataset?.value 
        || highlightedEl.getAttribute('value') 
        || highlightedEl.innerText;
      this.inputEl.value = strValue;
      const detail = highlightedEl.data || strValue;
      this.dispatchEvent(new CustomEvent('select', { bubbles: true, detail }));
    }
  }

  /**
   * Find an element that has attribute 'value' is the same as the given value from the list element.
   */
  highlightValue(value: any) {
    if (!value) return ;

    const highlightedEl = this.ulEl.querySelector('.highlighted:not(.hidden)')

    const nextHighlight = [...(this.ulEl.children ||[])].find((liEl: any) => {
      return (liEl.dataset.value === value) || 
        (liEl.getAttribute('value') === value) ||
        (liEl.innerText === value);
    })

    if (nextHighlight) {
      highlightedEl?.classList.remove('highlighted', 'selected');
      nextHighlight.classList.add('highlighted', 'selected');
      this.scrollIfNeeded(this.ulEl as any, nextHighlight);
      return nextHighlight;
    }
  }

  rewriteListEl(rows: any[]) {
    if (!this.isConnected) return;

    if (rows && !Array.isArray(rows) && typeof rows === 'object') {
      rows = Object.entries(rows).map( ([key, value]) => ({key, value}));
    }
    
    function getValueFromExpression(obj, expr) {
      if (!expr) return;

      const exprs = expr.match(/{{.*?}}/g) || [];
      let ret = expr;
      exprs.forEach( (expr) => { // {{key}}
        const key = expr.replace('{{','').replace('}}','');
        ret = ret.replace(expr, obj[key]);
      });
      return ret;
    }

    // rewrite list elements
    this.ulEl.innerHTML = '';
    rows.forEach( (row) => {
      const liEl = document.createElement('li') as any;
      const value = getValueFromExpression(row, this.selectExpr);
      const text = getValueFromExpression(row, this.displayExpr);
      if (value) {
        liEl.setAttribute('data-value', value);
        (value === this.inputEl.value) && liEl.classList.add('selected');
      }
      liEl.innerText =  text; 
      liEl.data = row;
      this.ulEl.appendChild(liEl);
    })
    this.ulEl.children[0]?.classList.add('highlighted');
  }

  /**
   * Hide all child elements of list element that does not have search string
   * by removing highlighted class and adding hidden class.
   * It also add highted class to the first searched element.
   */
  highlightSearch(search: string) {
    const matches = [...(this.ulEl.children ||[])].filter((el: any) => {
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
  highlightNext(inc=1) {
    const listEl = this.ulEl as HTMLUListElement;
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
  scrollIfNeeded(container: HTMLElement, element: any) {
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

  // returns the list part from an object
  #getListData(obj, pathStr) {
    return pathStr?.split('.').reduce( (acc, path) => acc[path], obj) || obj;
  }
}