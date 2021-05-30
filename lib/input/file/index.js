import html from './file.html';
import css from './file.css';
import {setHTML, addCss, syncAttr} from '../../common';

// input upload-fn    param file, return xhr
// output x-progress xhr progressG event
// output x-load xhr load event
// output x-error xhr error evenn
// output x-select list of file
export class XFile {
  
  static init() {
    const fileAttrs = 'upload-fn'.split(',');

    // css && addCss(this, css);
    addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, fileAttrs); // copy attributes to <input> and set

      this._files = [];
      this._showList = true;
      this._uploadFn = this.getAttribute('upload-fn');

      this._onAddFile = XFile._onAddFile.bind(this);
      this._setDragover = XFile._setDragover.bind(this);
      this._showFile = XFile._showFile.bind(this);
      this._deleteFile = XFile._deleteFile.bind(this);
      this._changeFiles = XFile._changeFiles.bind(this);
      this._readURL = XFile._readURL.bind(this);
      this._formatSize = XFile._formatSize.bind(this);
      this._upload = XFile._upload.bind(this);

      this.addEventListener('dragover', evt => this._setDragover(evt, true));
      this.addEventListener('dragleave', evt => this._setDragover(evt, false));
      this.addEventListener('drop', evt => this._onAddFile(evt));
      this.addEventListener('paste', evt => this._onAddFile(evt));
      this.querySelector('input[type="file"]').addEventListener('change', event => {
        this._changeFiles(event);
      });
    });
  }

  static _onAddFile(event) {
    this._setDragover(event, false);
    this._changeFiles(event);
  }

  static _setDragover(evt, value) {
    evt.preventDefault();
    evt.stopPropagation();
    const method = value ? 'add' : 'remove';
    this.classList[method]('x-dragover');
  }

  static _showFile(file) {
    if (!this._showList) return;

    const fileEl = document.createElement('div');
    fileEl.classList.add('x-file');
    const imgEl = file.type.startsWith('image') ?
      `<img class="x-preview" src="${file.dataURL}" />`: `<span>${file.type}</span>`;

    fileEl.insertAdjacentHTML('beforeend', `
      <div class="x-name">${file.name}</div>
      <div class="x-preview">${imgEl}(${this._formatSize(file.size)})</div>
      <div class="x-buttons">
        <button class="x-delete">🗑</button>
        <button class="x-upload">⇧</button>
      </div>
      <div class="x-progress"></div>
    `);
    fileEl.querySelector('.x-delete').addEventListener('click', event => {
      this._deleteFile(event, file);
    });
    fileEl.querySelector('.x-upload').addEventListener('click', _ => this._upload(file));
    this._uploadFn && this.classList.add('x-with-upload');

    this.querySelector('.x-file-list').appendChild(fileEl);
  }

  static _deleteFile(event, file) {
    const index = this._files.indexOf(file);

    this._files.splice(index, 1);
    
    event.target.closest('.x-file').remove();
    const customEvent = new CustomEvent('x-select', {
      bubbles: true,
      detail: this.files
    });
    this.dispatchEvent(customEvent);
  }


  static _changeFiles(evt) {
    const files = [...(
      evt.dataTransfer ||  // drag and drop
        evt.clipboardData || // copy and paste
        evt.target           // open and select
    ).files];

    if (files.length > 0) {
      files.forEach(file => {
        this._readURL(file).then(url => {
          file.dataURL = url;
          this._showFile(file);
        });
      });
      const customEvent = new CustomEvent('x-select', {bubbles: true, detail: files});
      this.dispatchEvent(customEvent);
      this._files = this._files.concat(files);
    }
  }

  static _readURL(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = e => res(e.target.result);
      reader.onerror = e => rej(e);
      reader.readAsDataURL(file);
    });
  }

  static _formatSize(bytes, decimalPoint = 2) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, i))
      .toFixed(decimalPoint)) + ' ' + sizes[i];
  }

  static _upload(file) {
    const uploadFn = this._uploadFn && new Function(`return ${this._uploadFn};`)(); 
    const xhr = uploadFn(file); // xhr.constructor.name XMLHttpRequest
    if (xhr instanceof XMLHttpRequest) {
      xhr.addEventListener('progress', event => {
        const progress = Math.round(100 * event.loaded / file.size) + '%';
        this.querySelector('.x-progress').style.width = progress;
        this.dispatchEvent(new CustomEvent('x-progress', {detail: event, bubbles: true}));
      });
      xhr.addEventListener('load', event => {
        this.querySelector('.x-progress').style.width = '100%';
        this.dispatchEvent(new CustomEvent('x-load', {detail: event, bubbles: true}));
      });
      xhr.addEventListener('error', event => {
        this.dispatcohEvent(new CustomEvent('x-error', {detail: event, bubbles: true}));
      });
    }
  }
}