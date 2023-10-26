import { addCss, getReactProp, removeCss } from "../../lib";
const css = `
  json-viewer ul.format-json ul { border-left: 1px dashed black; padding-left: 2rem;  margin-left: -12px;}
  json-viewer ul.format-json li { cursor: initial; }
  json-viewer ul.format-json li small { opacity: .7; }
  json-viewer ul.format-json li:has(> ul.hidden) { list-style: '⊞ ' }
  json-viewer ul.format-json li:has(> ul) { list-style: '⊟ '; cursor: pointer; }
  json-viewer ul.format-json li:has(> ul) sup { display: none; }
  json-viewer ul.format-json li:has(> ul.hidden) sup { display: initial; opacity: .8; }
  json-viewer ul.format-json.hidden { display: none; }
`;

export class JsonViewer extends HTMLElement {
  static get observedAttributes() { return ['level']; }
  #data = undefined;
  get data() { return this.#data;}
  set data(val) {
    this.#data = val;
    this.render();
  }

  connectedCallback() {
    addCss(this.tagName, css);
    this.#data = getReactProp(this as any, 'data') || this.data;
    this.render();
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.render();
  }

  render() {
    this.innerHTML = '';
    this.writeDOM(this, this.data); // recursively call
  }

  writeDOM(el: HTMLElement, data: any, level=0) {
    const ul = document.createElement('ul');
    const attrLevel = +(this.getAttribute('level') as string);
    ul.classList.add('format-json');
    (level >= attrLevel) && (ul.classList.add('hidden'));

    if (typeof data === 'object') { // array is an object
      for (var key in data) {
        const item = document.createElement('li');
        const li = ul.appendChild(item);
        const values = Object.values(data[key])
          .filter(el => typeof el === 'string')
          .map(el => (el as string).replace(/</g, '&lt;'))
          .map(el => (el as string).length > 20 ? el.substring(0, 20) + ' ...' : el)
          .join(' / ');
        li.innerHTML = `${key} <small>${values}</small>`;

        const toggleList = function(event) {
          const child = event.target.querySelector('ul');
          const action = child?.classList.contains('hidden') ? 'remove' : 'add';
          action && child?.classList[action]('hidden');
          event.stopPropagation();
        }

        li.addEventListener('click', toggleList);
        el.appendChild(ul);

        if (typeof data[key] === 'object') {
          this.writeDOM(li, data[key], ++level);
        } else if (typeof data[key] === 'function') {
          item.innerHTML = `${key}: function`;
        } else if (typeof data[key] === 'string') {
          item.innerHTML = `${key}: "${data[key].replace(/</g, '&lt;')}"`;
        } else {
          item.innerHTML = `${key}: ${data[key]}`;
        }
      }
    }
  }
}