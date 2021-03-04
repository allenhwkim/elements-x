import css from './list.css';
import {addCss, removeCss} from '../common/util';
import {setSearchInput} from './set-search-input';
import {ListNavigation} from './list-navigation';

// <x-list
//   x-value=“todos” 
//   selected="id-of-listitem"
//   target="id-of-input"
//   search-input="id-of-input"
//   x-http="my-x-http"
//   x-pagination="my-x-pagination"
//   filter=“done=false”
//   order=“time desc”
//   offset="30"
//   limit="10"
//   ></x-list>
export class XList extends HTMLElement {
  static get observedAttributes() { return ['filter', 'order', 'offset', 'limit']; }

  get value() { return this._value; }
  set value(val) {
    this._value = val;
    if (this.xPagination && val.length !== this._limit) {
      // console.log('xxxxxxxxxxxxxxxxxxxxxx')
      this.xPagination.setAttribute('num-records-per-page', this._limit);
      this.xPagination.setAttribute('total-records', this.value.length);
    }
    this._renderWithTemplate();
    this._setInfiniteScrolling();
  }

  constructor(...args) {
    const self = super(...args);
    this._selectFirst; // if true, highlight the first one, set by attr. 'select-first'
    this._selected;    // id of selected list item, set by attribute 'selected'
    this._searchInput; // set by attribute 'search-input' input element id that limits display of children
    this._template; // for dynamic html template updated by datalist
    this._value = []; // getter/setter variable for this.datalist
    this._filterExpr; // e.g. done=false;key=value
    this._orderExpr; // e.g. id desc
    this._offset; // starting index of list
    this._limit; // number of records to display
    this.xHttp; // <x-http> linked to list. if given, when x-http-success event provides list value
    this.xPagination; // <x-pagination> linked to list. if given, x-page-selected event provides _offset value
    return self;
  }

  connectedCallback() {
    this._selectFirst = this.getAttribute('select-first') === 'true';
    this._selected = this.getAttribute('selected');
    this._filterExpr = this.getAttribute('filter');
    this._orderExpr = this.getAttribute('order');
    this._offset = +this.getAttribute('offset') || 0;
    this._limit = +this.getAttribute('limit') || 0;
    this.infScroll = this.getAttribute('infinite-scroll') !== null;
    addCss(this, css);  // this is for child to override it

    const tmplSuccess = this.querySelector('template:not(.error)');
    if (tmplSuccess) {
      this._template = {
        success: (tmplSuccess || {}).innerHTML,  
        empty: (this.querySelector('template.empty') || {}).innerHTML
      };
      this._templateContainer = (this.querySelector('template') || {}).parentElement;
    }

    if (!this._templateContainer || (this._templateContainer === this)) {
      const listNav = new ListNavigation(this);
      listNav.setKeyAndMouseListener();
      listNav.setHighlightAndSelect(this._selected, this._selectFirst);
      // this._initKeyAndMouseListener();
      // this._initHighlightAndSelect(this._selected, this._selectFirst);
      setSearchInput.bind(this)(); // if search-input attr. given, set input el behaviour
    }

    // this._renderWithTemplate is called by set value(val)
    setTimeout(_ => {
      this._handlePagination();
      this._handleHttpResponse();
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) { return false; } 

    switch(name) {
    case 'filter': this._filterExpr = +newValue;
    case 'order': this._orderExpr = +newValue; // eslint-disable-line no-fallthrough
    case 'offset': this._offset = +newValue; // eslint-disable-line no-fallthrough
    case 'limit': this._limit = +newValue; // eslint-disable-line no-fallthrough
      this._renderWithTemplate();
      break;
    }
  }

  _handlePagination() {
    this.xPagination = document.getElementById(this.getAttribute('x-pagination'));
    this.xPagination && (this.value.length !== this._limit) &&
      this.xPagination.addEventListener('x-page-selected', event => {
        this._offset = event.detail.offset;
        this._renderWithTemplate();
      });
  }

  _handleHttpResponse() {
    this.xHttp = document.getElementById(this.getAttribute('x-http'));
    this.xHttp && this.xHttp.addEventListener('x-http-success', event => {
      this.value = event.detail;
      this._renderWithTemplate();
    });
  }
  
  _getSorted(orgValue = [], orderExpr) { // e.g., 'id desc'
    if (orderExpr) {
      let [colName, order = 'asc'] = orderExpr.split(' ');
      const newList = orgValue.sort( (a, b) => {
        const ret = a[colName] > b[colName] ? 1 : -11;
        const isDesc = order.match(/^desc/i) ? -1 : 1; 
        return ret * isDesc;
      });
      return newList;
    } else {
      return orgValue;
    }
  }

  _getFiltered(orgValue = [], filterExpr) { // e.g., done=false;key=value
    let newList = [...orgValue];
    if (filterExpr) {
      filterExpr.split(';').forEach(expr => { // e.g, done=false;
        const [key, value] = expr.split('=');
        newList = newList.filter(el =>  {
          if (value === 'true' || value === 'false') {
            return (!!el[key]) == (value == 'true');
          } else {
            return el[key] == value;
          }
        });
      });
    }
    return newList;
  }

  _getHTMLFromTemplate(template, data) {
    let html = template || JSON.stringify(data);
    (html.match(/{{[^}]+}}/g) || []).forEach( expr => {
      html = html.replace(/{{([^}]+)}}/g, (m, expr) => {
        if (expr.includes(' ')) { // check if done
          const [_, str, varExpr] = expr.match(/(.+) if (.+)/);
          const func = new Function(`return this.${varExpr};`);
          return func.bind(data)() ? str : '';
        } else {
          const func = new Function(`return this.${expr};`);
          return `${func.bind(data)()}`;
        }
      }).replace(/(checked)="false"/, '');
    });
    return html;
  }

  // reset html with datalist. this is called with setter, e.g., `this.datalist = ...`;
  _renderWithTemplate(reset = true) {
    if (!this._template) return;

    if (this._offset && this._limit === 0) {
      this._limit = 10;
    }

    let list = [...this._value];
    list = this._getFiltered(list, this._filterExpr);
    list = this._getSorted(list, this._orderExpr); 
    if (this._offset === 0 && this._limit === 0) {
      // no action required
    } else if (this._limit > 0) {
      list = list.slice(this._offset, this._offset + this._limit);
    }

    reset && (this._templateContainer.innerHTML = ''); // reset list HTML
    if (list.length) {
      list.forEach( data => {
        const html = this._getHTMLFromTemplate(this._template.success, data);
        this._templateContainer.insertAdjacentHTML('beforeend', html);
      });
    } else {
      this._templateContainer.insertAdjacentHTML('beforeend', this._template.empty || '');
    }
  }

  _setInfiniteScrolling() {
    if (!this.infScroll) return;
    if (this.xPagination) return;

    this.addEventListener('scroll', event => {
      const isAtBottom = this.scrollHeight - this.scrollTop - this.clientHeight < 1;
      const isNoMoreData = this._offset >= this.value.length;

      if(isAtBottom && !isNoMoreData) {
        this._offset += this._limit;
        this._renderWithTemplate(false); // append at the bottom
      }
    });
  }
}


if (!customElements.get('x-list')) {
  customElements.define('x-list', XList);
}