import html from './http.html';
import css from './http.css';
import {setHTML, addCss, removeCss, fireAttrChanged, getCustomAttributes} from '../common/util';

class XHttp extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return []; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    this.url; 
    this.debug;
    this.method = 'get'; 
    this.payload = {};
    this.headers = {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    };
    this.resptype = 'json'; // arrayBuffer, blob, json, text, formData
    return self;
  }

  connectedCallback() { 
    addCss(this, css); 
    this.url = this.getAttribute('url'); 
    this.method = this.getAttribute('method') || 'get'; 
    this.auto = this.getAttribute('auto') !== null; 
    this.debug = this.getAttribute('debug') !== null;
    // arrayBuffer, blob, json, text, formData 
    this.resptype = this.getAttribute('resptype') || 'json'; 
    const xHeaders = this.getAttribute('x-headers');
    xHeaders && xHeaders.split(';').forEach(el => {
      const [key, value] = el.split(':').map(el => el.trim());
      this.setHeader(key, value);
    });

    if (!this.innerHTML.trim()) { // show loading sign if custom html is not provided
      this.payload = getCustomAttributes(this, ['auto', 'url', 'method', 'debug', 'resptype']);
      setHTML(this, html).then(_ => { 
        this.auto && this.fetch(this.payload); 
      });
    } else {
      this.firstElementChild.classList.add('loading');
    }
    // accepts payloads from attributes, and this attr. name is not fixed,
    // we can't use attributechangedcallback. Thus, uses MutationObserver
    // set to fire 'x-attr-changed' event for custom attribures only
    fireAttrChanged(this, ['url','method','auto','resptype']); 

    this.addEventListener('x-attr-changed', this.handleAttrChanged.bind(this));
  }

  disconnectedCallback() {
    removeCss(this);
  }

  // Authorization: Bearer ab59e108c5d279e83e51564c27aecd3282fd7c6e3af7bbb2fe23b3175c4d5c85
  setHeader(key, value) {
    this.headers[key] = value;
  }

  handleAttrChanged(event) { 
    this.debug && console.debug('<x-http> handleAttrChanged', event);
    const mutation = event.detail;
    const attrName = mutation.attributeName;
    this.setPayload({[attrName]: mutation.target.getAttribute(attrName)});
  }

  setPayload(payload) {
    const prevPayload = Object.assign({}, this.payload);
    this.payload = Object.assign({}, this.payload, payload);
    const isDifferent = JSON.stringify(prevPayload) !== JSON.stringify(this.payload);
    if (this.auto && isDifferent) {
      this.fetch(this.payload);
    }
  }

  fetch(payload) {
    if (!this.url) return false;

    const method = this.method.toUpperCase();
    const headers = this.headers;
    const mode = 'cors'; // *default, no-cors, *cors, same-origin
    const cache = 'no-cache'; // // *default, no-cache, reload, force-cache, only-if-cached
    const credentials = 'same-origin'; // *default, include, *same-origin, omit
    const redirect = 'follow'; // *default, manual, *follow, error

    const referrerPolicy = 'no-referrer-when-downgrade';
    const [url, body] = this.method.toUpperCase() === 'GET' ?
      [this._getUrl(payload)] : [this._getUrl(), payload && JSON.stringify(payload)];

    if (this.url.includes('{{')) return false;
    if (this.method !== 'GET' && !payload) return false;
    this.debug && console.debug('<x-http> fetch starts', 'payload', JSON.stringify(payload));
    this.debug && console.debug('<x-http> fetch starts', {url, payload, method, headers, body});

    this.showLoading();
    return fetch(url, {method, mode, cache, credentials, redirect, referrerPolicy, headers, body})
      .then(resp => {
        if (!resp.ok) throw Error(resp.statusText);
        return resp[this.resptype](); // resp.json();
      }).then(resp => {
        this.debug && console.debug('<x-http> fetch success', url, resp);
        const event = new CustomEvent('x-http-success', { bubbles: true, detail: resp});
        this.dispatchEvent(event);
      }).catch(error =>  {
        this.debug && console.debug('<x-http> fetch error', url, error);
        const event = new CustomEvent('x-http-error', { bubbles: true, detail: error});
        this.dispatchEvent(event);
      }).finally( _ => {
        setTimeout(_ => this.hideLoading(), 100);
      });
  }

  _getUrl(qs = {}) {
    const bindings = this.url.match(/{{.+?}}/g);
    (bindings || []).forEach(expr => {
      const attrName = expr.replace(/[{}]/g, '');
      const attrValue  = this.getAttribute(attrName);
      this.url = this.url.replace(expr, attrValue);
    });

    const qsExists = this.url.includes('?');
    const suffix = Object.entries(qs).map( ([key, value]) => `${key}=${qs[key]}`).join('&');
    const url = qsExists ? this.url + suffix : 
      suffix ? this.url + '?' + suffix : this.url;
    
    return url;
  }

  showLoading() {
    const containerEl = this.parentElement;
    const parentPosition = getComputedStyle(containerEl).position;
    (parentPosition === 'static') && (containerEl.style.position = 'relative');
    this.querySelector('.loading') && 
      this.querySelector('.loading').classList.add('visible');
    return parentPosition;
  }

  hideLoading(orgParentPosition) {
    const containerEl = this.parentElement;
    const parentPosition = getComputedStyle(containerEl).position;
    this.querySelector('.loading').classList.remove('visible');
    orgParentPosition && (containerEl.style.position = null);
  }

}

if (!customElements.get('x-http')) {
  customElements.define('x-http', XHttp);
}
