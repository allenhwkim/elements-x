import css from './list.css';
import {setTargetValue, addCss, removeCss} from '../common/util';
import {setSearchInput} from './set-search-input';

// <x-list id=“todos” x-value=“todos” 
//   selected="id-of-listitem"
//   target="id-of-input"
//   search-input="id-of-input"
//   filter=“done=false”
//   order-by=“time descending”></x-list>
export class XList extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this._selectFirst; // if true, highlight the first one, set by attr. 'select-first'
    this._selected;    // id of selected list item, set by attribute 'selected'
    this._searchInput; // set by attribute 'search-input' input element id that limits display of children
    this._template; // for dynamic html template updated by datalist
    this._datalist; // getter/setter variable for this.datalist
    this.rarget;
    return self;
  }

  get value() { return this._value; }
  set value(val) {
    this._orgValue = val;
    this._value =  [...this._orgValue];
    this._renderWithTemplate(this._template, this._value);
  }

  connectedCallback() {
    this._selectFirst = this.getAttribute('select-first') === 'false' ? false : true;
    this._selected = this.getAttribute('selected');

    addCss(this, css);  // this is for child to override it

    const tmplSuccess = this.querySelector('template:not(.error)');
    this._template = {
      varName: tmplSuccess && tmplSuccess.getAttribute('var-name'),
      success: (tmplSuccess || {}).innerHTML,  
      error: (this.querySelector('template.error') || {}).innerHTML
    };

    this._init();
    this._initHighlightAndSelect(this._selected, this._selectFirst);
    setSearchInput.bind(this)(); // if search-input attr. given, set input el behaviour
  }

  disconnectedCallback() {
    removeCss(this);
  }

  _init() {
    this.setAttribute('tabindex', 0);
    this.addEventListener('keydown', this._keydownHandler.bind(this));

    this.addEventListener('click', event => {
      // find children of `x-list` children, not the event.target 
      let clicked = event.target;
      while (clicked.parentElement.tagName !== 'X-LIST') {
        clicked = clicked.parentElement;
      }
      this._fireSelect(clicked);
    });
  }

  _initHighlightAndSelect(selected, select1st) {
    const selectedListItem = this.querySelector('#'+selected);
    if (selectedListItem) {
      selectedListItem.classList.add('x-highlighted');
    } else if (select1st) {
      const firstListItem = this.querySelector('li') || this.firstElementChild;
      firstListItem && firstListItem.classList.add('x-highlighted');
    }
    this._fireSelect(this.querySelector('.x-highlighted'));
  }

  // reset html with datalist. this is called with setter, e.g., `this.datalist = ...`;
  _renderWithTemplate(template, list = []) {
    this.innerHTML = ''; // reset HTMl

    function getElementFromHTML(template, data) {
      let htmlSuccess = template.success || 'missing template';
      htmlSuccess.match(/\${[^}]+}/g).forEach( expr => {
        htmlSuccess = htmlSuccess.replace(/\${([^}]+)}/g, (m, expr) => {
          const func = new Function(`return this.${expr};`);
          return `${func.bind(data)()}`;
        });
      });
      const container = document.createElement('div');
      container.insertAdjacentHTML('beforeend', htmlSuccess);
      const element = container.firstElementChild;
      template.varName && (element[template.varName] = data);
      return element;
    }

    if (list.length) {
      list.forEach( data => {
        const element = getElementFromHTML(template, data);
        this.insertAdjacentElement('beforeend', element);
      });
    } else {
      const tmplError = template.error || 'error with datalist';
      this.insertAdjacentHTML('beforeend', tmplError);
    }
  }

  _fireSelect(el) {
    const highlightedEl = this.querySelector('.x-highlighted');
    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    if (el && (el.offsetParent !== null)) { // if visible
      el.classList.add('x-highlighted');
      this.dispatchEvent(new CustomEvent('x-listitem-selected', { bubbles: true, detail: el}));
      this.target = document.getElementById(this.getAttribute('target'));
      this.target && setTargetValue(this.target, el.getAttribute('value') || el.innerText);
    }
  }

  _toggleAriaExpanded(el) {
    const expanded = el.getAttribute('aria-expanded') !== null;
    expanded ? el.removeAttribute('aria-expanded') : el.setAttribute('aria-expanded', '');
  }

  _keydownHandler(event) {
    if (['Enter', 'Space'].includes(event.code)) {
      const highlightedEl = this.querySelector('.x-highlighted');
      const hasList = highlightedEl.classList.contains('x-has-list');
      highlightedEl && hasList && this._toggleAriaExpanded(highlightedEl);
      (event.code === 'Enter') && this._fireSelect(highlightedEl);
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.code)) {
      this._highlightEl(-1);
    } else if (['ArrowDown', 'ArrowRight'].includes(event.code)) {
      this._highlightEl(+1);
    }
    if (['Enter', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event.code)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }


  _highlightEl(inc) {
    const allEls = this._isUlLiStyle ? 
      this.querySelectorAll('li') : this.children;
    const visibles = Array.from(allEls)
      .filter(el => el.offsetParent !== null);
    const highlightedEl = this.querySelector('.x-highlighted');
    const curIndex = visibles.indexOf(highlightedEl);
    const nxtIndex = (visibles.length + curIndex + inc) % visibles.length;

    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    visibles[nxtIndex] && visibles[nxtIndex].classList.add('x-highlighted');
  }
}

if (!customElements.get('x-list')) {
  customElements.define('x-list', XList);
}