import { Unicodes } from './unicodes';
import  {setCustomElementHTMLCss}  from '../../lib/common/util';

const html = `
  <style id="unicode-search">
    /* app-unicodes .unicode:not([title*="korea"]) { display: none; } */
  </style>
`;
const css =`
  app-unicodes .group .group-name {
    margin-top: 32px;
    font-weight: bold;
  }
  app-unicodes ul {
    display: flex;
    flex-wrap: wrap;
  }
  app-unicodes .unicode {
    border: 1px solid #ccc;
    margin: 4px;
    padding: 8px;
    width: 70px;
    text-align: center;
  }
  app-unicodes .code,
  app-unicodes .css-value {
    font-size: 12px;
    opacity: .7;
  }
  app-unicodes .char {
    display: inline-block;
    font-size: 24px;
    padding-bottom: 8px;
    font-weight: bold;
  }
`;
// const styleEl = document.createElement('style');
// styleEl.setAttribute(hash,'');
// styleEl.appendChild(document.createTextNode(scoped));
// // styleEl.innerText = scoped;
// document.head.appendChild(styleEl)
class AppUnicodes extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, html, css);
    for (var group in Unicodes) {
      const data = Unicodes[group];
      this.appendChild(this._getHTML(group, data));
    }
  }

  search(str) {
    const styleEl = this.querySelector('style#unicode-search');
    const styleStr = str ? `app-unicodes .unicode:not([title*="${str}"]) { display: none; }` : '';
    styleEl.innerText = styleStr;
  }

  _getHTML(category, data) {
    const divEl = document.createElement('div');
    divEl.classList.add('group');
    const ulEl = document.createElement('ul');
    for (var key in data) {
      const desc = data[key];
      ulEl.insertAdjacentHTML('beforeend', `
        <li class="unicode" title="${desc.toLowerCase()}">
          <div class="char">${key}</div>
          <div class="code">${key.replace('&', '&amp;')}</div>
          <div class="css-value">'\\${key.replace(/[&#;]/g, '')}'</div>
        </li>`);
    }

    divEl.insertAdjacentHTML(`beforeend`, `<div class="group-name">${category}</div>`);
    divEl.appendChild(ulEl);
    return divEl;
  }

}

if (!customElements.get('app-unicodes')) {
  customElements.define('app-unicodes', AppUnicodes);
}

