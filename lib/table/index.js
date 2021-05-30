import css from './table.css';
import html from './table.html';
import {addCss, removeCss, setHTML} from '../common/util';

export class XTable extends HTMLElement {
  static get observedAttributes() { return ['order', 'offset', 'limit']; }

  get list() { return this._list_org; }
  set list(val) {
    this._list_org = val;
    this._renderWithTemplate();
    const paginationEl = this.querySelector('x-pagination');
    paginationEl.setAttribute('num-records-per-page', this._limit);
    paginationEl.setAttribute('total-records', this.list.length);
  }

  constructor(...args) {
    const self = super(...args);
    this._list_org = []; // list of row items

    this._template; // for dynamic html template updated by datalist
    this._orderExpr; // e.g. id desc
    this._offset = 0; // starting index of list
    this._limit = 10; // number of records to display
    this.xPagination; // <x-pagination> linked to list. if given, x-select event provides _offse 
    this.searchInput; // set by attribute 'search-input' input element id that limits display of children
    return self;
  }

  connectedCallback() {
    const validationError = this._getValidationError();
    if (validationError) return (this.innerHTML = validationError);

    this._orderExpr = this.getAttribute('order');
    this._offset = +this.getAttribute('offset') || this._offset;
    this._limit = +this.getAttribute('limit') || this._limit;

    addCss(this, css);  // this is for child to override it
    setHTML(this, html).then(_ => {
      const tmplSuccess = this.querySelector('tbody > tr:not(.error):not(.empty):not(.bottom)').outerHTML;
      const tmplError = 
        this.querySelector('tbody > tr.error')?.outerHTML || '<tr><td colspan="100">Unknown error</td></tr>';
      const tmplEmpty = 
        this.querySelector('tbody > tr.empty')?.outerHTML || '<tr><td colspan="100">No records found</td></tr>';
      const tmplBottom = 
        this.querySelector('tbody > tr.bottom')?.outerHTML || '<tr><td colspan="100">Bottom of list</td></tr>';
      this._template = {
        success: tmplSuccess,
        error: tmplError,
        empty: tmplEmpty,
        bottom: tmplBottom
      };

      this._setListFrom();
      this._setSearchInput();
      this._setupPagination();
      this._setOrderBy();
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) { return false; } 

    switch(name) {
      case 'order': this._orderExpr = newValue;
        this._renderWithTemplate();
        break;
      case 'offset': this._offset = +newValue;
        this._renderWithTemplate();
        break;
      case 'limit': this._limit = +newValue;
        this._renderWithTemplate();
        break;
    }
  }

  _getValidationError() {
    if (!this.querySelector('table') ||
      !this.querySelector('thead') || 
      !this.querySelector('tbody')
    ) {
      return '<b style="color:red">&lt;x-table> error, missing &lt;thead> and/or &lt;body></b>';
    } 
  }

  _setupPagination() {
    this.querySelector('x-pagination').addEventListener('x-select', event => {
      this._offset = event.detail.offset;
      this._renderWithTemplate();
    });
  }

  _setListFrom() {
    const listFrom = document.getElementById(this.getAttribute('list-from'));
    if (listFrom?.tagName === 'X-HTTP') {
      listFrom.addEventListener('x-success', event => {
        this.list = event.detail;
        this._renderWithTemplate();
      });
    } else {
      this.list = listFrom?.value;
    }
  }

  _setSearchInput() {
    this.querySelector('#x-search-input').addEventListener('input', e => {
      const search = e.target.value;
      let newList = [...this.list];
      newList = newList.filter(el =>  JSON.stringify(el).indexOf(search) !== -1);
      this._renderWithTemplate(newList, search);
    });
  }

  _setOrderBy() {
    this.querySelector('table thead tr').addEventListener('click', e => {
      const column = e.target.className.split(' ')[0];
      const order = e.target.classList.contains('asc') ? 'desc' : 'asc';

      this.querySelectorAll('table thead tr th')
        .forEach(el => el.classList.remove('asc', 'desc'));
      e.target.classList.add(order);
      this.setAttribute('order', `${column} ${order}`);
    });
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
  _renderWithTemplate(list, highlight) {
    list = list || this._list_org;
    this.querySelector('#start').innerText = this._offset + 1;
    this.querySelector('#end').innerText = this._offset + this._limit;
    this.querySelector('#total').innerText = list.length;

    const sorted = this._getSorted(list, this._orderExpr); 
    const newList = this._getLimited(sorted, this._offset, this._limit);
    const tbodyEl = this.querySelector('tbody');

    tbodyEl.innerHTML = ''; // reset list HTML
    if (newList.length) {
      newList.forEach( data => {
        const html = this._getHTMLFromTemplate(this._template.success, data);
        if (highlight) {
          const re = new RegExp(`(?<!<[^>]*)(${highlight})`, 'gi');
          const newHtml = html.replace(re, m => `<b class="highlight">${m}</b>`);
          tbodyEl.insertAdjacentHTML('beforeend', newHtml);
        } else {
          tbodyEl.insertAdjacentHTML('beforeend', html);
        }
      });
    } else {
      tbodyEl.insertAdjacentHTML('beforeend', this._template.empty || '');
    }
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

  _getLimited(orgValue=[], offset, limit) {
    if (limit) {  // big list, showing sliced
      return orgValue.slice(offset, offset + limit);
    }
    return orgValue;
  }

}


if (!customElements.get('x-table')) {
  customElements.define('x-table', XTable);
}