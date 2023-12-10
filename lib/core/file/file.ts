
import { addCss, fixIndent, removeCss } from '../../util';
import * as cssM from './file.css?inline';
const css = cssM.default;

export class File extends HTMLElement {
  files: any[] = [];

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  connectedCallback() {
    addCss(this.tagName, css);

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
  }

  #formatSize(bytes, decimalPoint=2) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, i))
      .toFixed(decimalPoint)) + ' ' + sizes[i];
  }

  #getListHTML(files): string {
    const htmls: string[] = [];
    files.forEach( (file, ndx) => {
      const type = file.type || file.dataURL.match(/data:(.*?);/)?.[1];
      console.log({file})
      const imgPreview = !type.match(/^image/) ? '' : `<img class="x-preview" src="${file.dataURL}" 
        onclick="w=window.open(),i=new Image();i.src='${file.dataURL}';w.document.write(i.outerHTML);" />`;
      htmls.push(fixIndent(`
        <div id="file-${ndx}">
          <div class="name">${file.name}</div>
          <div class="detail" title="${type}">
            ${imgPreview}
            <span>
              ${ type.length > 25 ? type.slice(0,24) + '...' : type }
              (${this.#formatSize(file.size)})
            </span>
          </div>
        </div>`));
    });
    return htmls.join('\n');
  }

  setFiles(evt) { // dataTransfer(drag/drop), clipboardData(copy/paste), target(select)
    this.files = [...(evt.dataTransfer || evt.clipboardData || evt.target).files ];

    function readURL(file: Blob) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = (e:any) => resolve(e.target.result);
        reader.onerror = e => reject(e);
        reader.readAsDataURL(file);
      });
    }

    this.dispatchEvent(new CustomEvent('select', {bubbles: true, detail: this.files}));
    const promises = this.files.map(async file => file.dataURL = await readURL(file));
    Promise.all(promises).then(vallues => {
        const listEl = this.querySelector('.list');
        listEl && ( listEl.innerHTML = this.#getListHTML(this.files) );
      })
    ;
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

}
