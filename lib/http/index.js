import html from './http.html';
import css from './http.css';
import {setHTML, addCss, removeCss} from '../common/util';

class XHttp extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    this.url; 
    this.debug;
    this.method = 'get'; 
    this.headers = {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    };
    this.resptype = 'json'; // arrayBuffer, blob, json, text, formData
    this.respStatusCode;
    this.__payload = {};
    this.payload = new Proxy(this.__payload, {
      set: (target, key, value) => {
        if (key !== '') {
          const prevTarget = Object.assign({}, target);
          target[key] = isNaN(value) ? value : +value;
          const isDifferent = JSON.stringify(prevTarget) !== JSON.stringify(target);
          this.auto && isDifferent && this.fetch();
        }
        return true;
      }
    });

    return self;
  }

  connectedCallback() { 
    addCss(this, css); 
    this.url = this.getAttribute('url'); 
    this.method = this.getAttribute('method') || 'get'; 
    this.auto = this.getAttribute('auto') !== null; 
    this.debug = this.getAttribute('debug') !== null;
    this.resptype = this.getAttribute('resptype') || 'json'; 
    this.respStatusCode = this.getAttribute('resp-status-code');
    this.initHeaders();
    this.initPayload();
    if (this._validateProps().length > 0) {
      this.innerHTML = JSON.stringify(this._validateProps(), null, '  ');
    } else {
      if (!this.innerHTML.trim()) { // show loading sign if custom html is not provided
        setHTML(this, html).then(_ => this.auto && this.fetch() );
      } else {
        this.firstElementChild.classList.add('loading');
        this.auto && this.fetch();
      }
    }
  }

  disconnectedCallback() {
    removeCss(this);
  }

  _validateProps() {
    const errors = [];
    if (!this.method.match(/^(GET|POST|PUT|DELETE|PATCH)$/i)) 
      errors.push({method: this.method, error: 'Invalid method'});
    if (this.respSTatusCode && this.respStatusCode.match(/ /)) 
      errors.push({method: this.respStatusCode, error: 'Invalid respStatusCode'});
    return errors;
  }

  // Authorization: Bearer ab59e108c5d279e83e51564c27aecd3282fd7c6e3af7bbb2fe23b3175c4d5c85
  initHeaders() {
    const exprs = this.getAttribute('headers');
    (exprs || '').split(';').forEach(expr => {
      const [key, value] = expr.split(':').map(el => el.trim());
      key && (this.headers[key] = value);
    });
  }

  initPayload() {
    const exprs = (this.getAttribute('payload') || '').split(';');
    exprs.forEach(expr => {
      const [key, value] = expr.split('=').map(el => el.trim());
      this.payload[key] = value;
    });
  }

  fetch() {
    if (!this.url) return false;

    const method = this.method.toUpperCase();
    const headers = this.headers;
    const mode = 'cors'; // *default, no-cors, *cors, same-origin
    const cache = 'no-cache'; // // *default, no-cache, reload, force-cache, only-if-cached
    const credentials = 'same-origin'; // *default, include, *same-origin, omit
    const redirect = 'follow'; // *default, manual, *follow, error

    const referrerPolicy = 'no-referrer-when-downgrade';
    const url = this.method.toUpperCase() === 'GET' ? this._getUrl(this.payload) : this._getUrl();
    const body = this.method.toUpperCase() === 'GET' ? undefined : this._getBody();

    if (this.url.includes('{{')) return false;
    this.debug && console.debug('<x-http> fetch starts', {url, payload: this.payload, method, headers, body});

    this.showLoading();
    return fetch(url, {method, mode, cache, credentials, redirect, referrerPolicy, headers, body})
      .then(resp => {
        if (!resp.ok) throw Error(resp.statusText);
        return resp[this.resptype](); // resp.json();
      }).then(resp => {
        if (this.respStatusCode) {
          if (resp[this.respStatusCode] > 300) throw resp;
        }
        this.debug && console.debug('<x-http> fetch success', url, resp);
        const event = new CustomEvent('x-success', { bubbles: true, detail: resp});
        this.dispatchEvent(event);
      }).catch(error =>  {
        this.debug && console.debug('<x-http> fetch error', url, error);
        const event = new CustomEvent('x-error', { bubbles: true, detail: error});
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

  _getBody(payload) {
    const body = Object.assign({}, this.payload, payload);
    return JSON.stringify(body);
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
