
import morphdom from 'morphdom/dist/morphdom-esm';
import { addCss, removeCss } from '../../lib';
import css from './file-select.css';

export class FileSelect extends HTMLElement {
  files: any[] = [];
  message = '';

  static get observedAttributes() { return ['message'] }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.#updateDOM();
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  connectedCallback() {
    addCss(this.tagName, css);

    this.message = this.innerHTML.trim() || this.message; // save user's message

    this.addEventListener('dragover', this.dragoverHandler.bind(this));
    this.addEventListener('dragleave', this.dragleaveHandler.bind(this));
    this.addEventListener('change', this.setFiles.bind(this)); 
    this.addEventListener('drop', (evt) => {
      this.dragleaveHandler(evt);
      this.setFiles(evt);
    });
    this.addEventListener('paste', (evt) => {
      this.dragleaveHandler(evt);
      this.setFiles(evt);
    });
    this.addEventListener('click', (e:any) => { // delete clicked
      if (!e.target.classList.contains('x-delete')) return;
      this.files.splice(this.files.indexOf(+e.target.dataset.id), 1);
      e.target.closest('.x-file').remove();
    })

    this.#updateDOM();
  }

  render() {
    const message = this.getAttribute('message') ||
      'Click, copy/paste files, or drag/drop files here. The selected files are displayed below.';

    const formatSize = (bytes, decimalPoint = 2) => {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(1000));
      return parseFloat((bytes / Math.pow(1000, i))
        .toFixed(decimalPoint)) + ' ' + sizes[i];
    };

    return `
      <label class="x-file-input">
        <input type="file" multiple />
        <div class="x-slot">${message}</div>
      </label>
      <div class="x-file-list">${this.files.map( (file, ndx) => {
        return `
          <div class="x-file" id="file-${ndx}">
            <div class="x-name">${file.name}</div>
            <div class="x-preview">${
              file.type.match(/^image/) ?
                `<img class="x-preview" src="${file.dataURL}" />` :
                `<span>${file.type}</span>`}(${formatSize(file.size)
              })
            </div>
            <div class="x-buttons">
              <button class="x-delete" data-id="${ndx}">🗑</button>
            </div>
            <div class="x-progress"></div>
          </div>`.trim();
      }).join('\n')}</div>`;
    }

  // called when attribute/props changes and connectedCallback
  // run as debounced since it's called from many places and often
  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const newHTML = this.render();
      const updated = document.createElement('div');
      updated.innerHTML += newHTML;
      morphdom(this, updated, { childrenOnly: true }); 
    }, 50);
  }

  dragoverHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.classList.add('x-dragover');
  }

  dragleaveHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.classList.remove('x-dragover');
  }

  setFiles(evt) { // dataTransfer(drag/drop), clipboardData(copy/paste), target(select)
    this.files = [...(evt.dataTransfer || evt.clipboardData || evt.target).files ];

    function readURL(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = (e:any) => resolve(e.target.result);
        reader.onerror = e => reject(e);
        reader.readAsDataURL(file);
      });
    }

    this.files.forEach(async file => file.dataURL = await readURL(file));
    this.#updateDOM();
    this.dispatchEvent(new CustomEvent('x-select', {bubbles: true, detail: this.files}));
  }
}
