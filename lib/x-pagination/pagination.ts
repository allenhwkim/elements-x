import morphdom from 'morphdom/dist/morphdom-esm';
import { addCss, removeCss } from '../../lib';
import css from './pagination.css';

export class Pagination extends HTMLElement {
  static get observedAttributes() { return ['total', 'page', 'numPerPage', 'numPages']; }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.#updateDOM();
  }

  connectedCallback() {
    addCss(this.tagName, css);
    this.addEventListener('click', this.clickListener.bind(this));
    this.#updateDOM();
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  #index = 0;
  get index() {return this.#index;}
  set index(val) {
    this.#index = val;
    this.#updateDOM();
  }

  getAttrs() {
    const attrs = [...this.attributes as any]
      .reduce( (acc, attr) => {
        const attrVar = attr.name.replace(/-([a-z])/g, (m, w) => w.toUpperCase());
        const attrVal = !isNaN(attr.value as any) ? +attr.value : attr.value;
        return { ...acc, [attrVar]: attrVal };
      }, {})

    return attrs;
  }

  clickListener(event) {
    if (event.target.classList.contains('page')) { 
      this.index = +event.target.getAttribute('index');

      const attrs = this.getAttrs();
      const detail = {...attrs, index: this.index};
      this.dispatchEvent(new CustomEvent('select', {bubbles: true, composed: true, detail}));
    }
  }

  getPages({total, numPerPage, index, numPages}) {
    const totalPages = Math.ceil(total / numPerPage);
    const currentPage = (index + numPerPage) / numPerPage;
    const numNeighbor = (numPages - 1) / 2;

    let middlePage = currentPage;
    if ((numNeighbor*2 - currentPage) >= 1) { // currentPage is a low number
      middlePage = numNeighbor + 1;
    } else if ((numNeighbor + currentPage) > totalPages) { // currentPage is a high number
      middlePage = totalPages - numNeighbor;
    }
    const minPage = Math.max(middlePage - numNeighbor, 1);
    const maxPage = Math.min(totalPages, middlePage + numNeighbor);

    function range(start, end) {
      return Array.from({ length }, (_, i) => start + i);
    }

    var length = maxPage - minPage + 1;
    return [...Array(length).keys()].map(el => el + minPage);
  }

  render() {
    const attrs = this.getAttrs();

    for (var key in attrs) {
      const isObservedAttr = (this.constructor as any).observedAttributes.includes(key);
      const isValidNum = !isNaN(attrs[key]) && attrs[key] > 0;
      if (isObservedAttr && !isValidNum) {
        console.error('error: invalid attribute value', attrs[key], ' for', key);
        return 
      }
    }

    (attrs.numPages % 2 === 0) && attrs.numPages++; // make it odd number to find a center
    const {total=100, page=1, numPerPage=10, numPages=5} = attrs;
    const index = this.index || (page - 1) * numPerPage;

    const pages = this.getPages({total, index, numPerPage, numPages});
    const [pages0, pagesX] = [pages[0], pages.slice(-1)[0]];
    const pages0Index = (pages0 -1) * numPerPage;
    const pagesXIndex =  (pagesX -1) * numPerPage;

    const fDisabled = !(pages0Index > numPerPage) ? 'disabled' : '';
    const pDisabled = !(pages0Index > 0) ? 'disabled' : '';
    const nDisabled = !(total > pagesXIndex + numPerPage) ? 'disabled' : '';
    const lDisabled = !(total > (pagesXIndex + numPerPage*2)) ? 'disabled' : '';
  
    return `
      <button class="first page navigation" title="first page" 
        index="0" ${fDisabled}></button>
      <button class="prev page navigation" title="previous page" 
        index="${pages0Index - numPerPage}" ${pDisabled}></button>
      <div class="pages">
        ${
          pages.map(page => {
            const pageStaIndex = (page - 1) * numPerPage;
            const selected = pageStaIndex === index ? ' selected' : '';
            return `<button class="page${selected}" index="${pageStaIndex}">${page}</button>`;
          }).join('\n')
        }</div>
      <button class="next page navigation" title="next page" 
        index="${pagesXIndex + numPerPage}" ${nDisabled}></button>
      <button class="last page navigation" title="last page" 
        index="${total - numPerPage}" ${lDisabled}></button>
    `;
  }

  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const newHTML = await this.render();
      const updated = document.createElement('div');
      updated.innerHTML += newHTML;
      morphdom(this, updated, { childrenOnly: true }); 
    }, 50);
  }
}
