
import {syncAttr} from 'elements-x';

export class XIframe extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    this._init();
    this._winMsgHandler = this.windowMsgHandler.bind(this);
    window.addEventListener('message', this._winMsgHandler);
  }

  disonnectedCallback() {
    window.removeEventListener('message', this._winMsgHandler);
  }

  _init() {
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('frameborder', '0');
    this.appendChild(this.iframe);
    syncAttr(this, this.iframe);
    this.iframe.addEventListener('load', e => {
      try {
        this.iframe.width =
          this.iframe.contentWindow.document.body.scrollWidth + 10;
        this.iframe.height =
          this.iframe.contentWindow.document.body.scrollHeight + 10;
      } catch (e) {
        console.error(e);
      }
    });
  }

  windowMsgHandler(event) {
    const {width, height} = event.data;
    if (window && height) {
      this.iframe.width = width;
      this.iframe.height = height;
    }
  }
}

if (!customElements.get('x-iframe')) {
  customElements.define('x-iframe', XIframe);
}