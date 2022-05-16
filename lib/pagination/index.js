import css from './pagination.css';
import html from './pagination.html';
import {setHTML, addCss, removeCss, define } from '../common/util';

export class XPagination extends HTMLElement {
  connectedCallback() {
    addCss(this, css);
    this.total = +this.getAttribute('total') || 100;
    this.index = +this.getAttribute('index') || 0;
    this.numPerPage = +this.getAttribute('num-per-page') || 10;
    this.numPages = +this.getAttribute('num-pages') || 5; // number of page buttons to display
    (this.numPages % 2 === 0) && this.numPages++; // make it odd number

    setHTML(this, html).then(_ => {
      this._setNavButtons();
      this._setPageButtons();
      this._initialized = true;
     });
    this.addEventListener('click', this.handleClick.bind(this));
  }

  disconnectedCallback() {
    removeCss(this);
  }

  static get observedAttributes() { 
    return ['total', 'num-pages', 'index', 'num-per-page' ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const varName = name.replace(/-([a-z])/g, g => g[1].toUpperCase());
    this[varName] = +newValue;

    if (this._initialized) {
      this._setNavButtons();
      this._setPageButtons();
    }
  }

  // Returns array of page numbers to display
  getPages() {
    const totalPages = Math.ceil(this.total / this.numPerPage);
    const currentPage = (this.index + this.numPerPage) / this.numPerPage;
    const numNeighbor = (this.numPages - 1) / 2;

    let middlePage = currentPage;
    if ((numNeighbor*2 - currentPage) >= 1) { // currentPage is a low number
      middlePage = numNeighbor + 1;
    } else if ((numNeighbor + currentPage) > totalPages) { // currentPage is a high number
      middlePage = totalPages - numNeighbor;
    }
    const minPage = Math.max(middlePage - numNeighbor, 1);
    const maxPage = Math.min(totalPages, middlePage + numNeighbor);

    return range(minPage, maxPage);
  }
  
  handleClick(event) {
    const clickedEl = event.target;
    if (clickedEl.classList.contains('page')) { 
      this.index = +clickedEl.getAttribute('index');
      this._setNavButtons();
      this._setPageButtons();

      const {index, numPerPage, total} = this;
      const customEvent = new CustomEvent('select', {
        bubbles: true,
        detail: {index, numPerPage, total}
      });
      this.dispatchEvent(customEvent);
    }
  }

  // Rewrite navigation buttons; first, last, next, prev
  _setNavButtons(page) {
    const firstPageBtn = this.querySelector('.first.page');
    const prevBtn = this.querySelector('.prev');
    const nextBtn = this.querySelector('.next');
    const lastPageBtn = this.querySelector('.last.page');
    
    const pages = this.getPages();
    const [pages0, pagesX] = [pages[0], pages.slice(-1)[0]];
    const pages0Index = (pages0 -1) * this.numPerPage;
    const pagesXIndex =  (pagesX -1) * this.numPerPage;

    firstPageBtn.setAttribute('index', 0);
    firstPageBtn.disabled = !(pages0Index > this.numPerPage);

    prevBtn.setAttribute('index', pages0Index - this.numPerPage);
    prevBtn.disabled = !(pages0Index > 0);

    nextBtn.setAttribute('index', pagesXIndex + this.numPerPage);
    nextBtn.disabled = !(this.total > pagesXIndex + this.numPerPage);

    lastPageBtn.setAttribute('index', (this.total - this.numPerPage));
    lastPageBtn.disabled = !(this.total > (pagesXIndex + this.numPerPage*2));
  }
  
  // Rewrite page buttons
  _setPageButtons() {
    const pages = this.getPages();
    const pagesEl = this.querySelector('.pages');
    pagesEl.innerHTML = '';

    pages.forEach(page => {
      const index = (page - 1) * this.numPerPage;
      const selected = index === this.index ? 'selected' : '';

      pagesEl.insertAdjacentHTML('beforeend', 
        `<button x="" class="page ${selected}" index="${index}">${page}</button>`
      );
    });
  }
}
XPagination.define = define('x-pagination', XPagination);

// Returns array of numbers from start to end
function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}
