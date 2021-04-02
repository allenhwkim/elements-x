import './marker.js';
import {setHTML, addCss, removeCss} from '../common';
import css from './mapbox.css';

export function waitFor(variable, scope=window, interval=200, maxWait=5000) {
  let waiting = 0;
  return new Promise( (resolve, reject) => {
    function checkVariable() {
      scope[variable] ? resolve(scope[variable]) : (waiting += interval);
      waiting > maxWait ? reject(maxWait) : setTimeout(checkVariable, interval);
    }
    setTimeout(checkVariable, interval);
  });
}

export function getLngLat(str) {
  return new Promise( (resolve, reject) => {
    if (typeof str === 'string' && str.match(/[-0-9.]+,\s?[-0-9.]+/)) { //'-99.99, 99'
      const lngLat = str.split(',').map(el => +(el.trim()));
      resolve(lngLat);
    } else if (typeof str === 'string' && str.match(/[a-z]+/i)) {
      const url = 
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${str}.json?` +
        `types=address&access_token=${XMapbox.accessToken}`;
      window.fetch(url).then(resp => resp.json())
        .then(resp => resolve(resp.features[0].center) );
    } else {
      resolve([0,0]);
    }
  });
}

const html = '<div class="map"></div><slot></slot>';

export class XMapbox extends HTMLElement {
  static get observedAttributes() { return ['center', 'zoom']; }

  connectedCallback() {
    this.mapboxgl;
    this.map;
    addCss(this, css);
    setHTML(this, html).then(_ => {
      return this._init(); // set map, center, zoom
    }).then(_ => {
      this._setStyleControl(); // switch between satellite and terrain mode
    });
  }

  disconnectedCallback() { removeCss(this); }

  attributeChangedCallback(name, oldValue, newValue) {
    (name === 'center') && this.setCenter(newValue);
    (name === 'zoom') && this.setZoom(newValue);
  }

  setZoom(val) {
    this.map && this.map.setZoom(val ? +val : 15);
  }

  setCenter(param) {
    this.map && getLngLat(param)
      .then(lngLat => this.map.setCenter(lngLat));
  }

  getMap() { // returns a Promise
    return waitFor('map', this);
  }

  _init() {
    this.zoom = +this.getAttribute('zoom');
    this.center = this.getAttribute('center');
    return this._setLibrary().then(
      resp => {
        this.mapboxgl = resp;
        if (!this.mapboxgl.accessToken) {
          this.mapboxgl.accessToken = XMapbox.accessToken ||
            window.mapboxgl?.accessToken ||
            window.xKeys?.mapbox;
        }
        this.map = new window.mapboxgl.Map({
          container: this.querySelector('.map'), 
          style: 'mapbox://styles/mapbox/streets-v11',
          // style: 'mapbox://styles/mapbox/satellite-v9',
          attributionControl: true
        });
        this.setCenter(this.center);
        this.setZoom(this.zoom);
      },
      err => console.error('ERROR', err)
    );
  }

  _setLibrary() {
    if (typeof window.mapboxgl === 'undefined') {
      const lScriptEl = document.createElement('script');
      lScriptEl.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js');
      document.head.appendChild(lScriptEl);
  
      const lStyleEl = document.createElement('link');
      lStyleEl.setAttribute('rel', 'stylesheet');
      lStyleEl.setAttribute('href', 'https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css');
      document.head.appendChild(lStyleEl);
    }

    return waitFor('mapboxgl', window);
  }

  _setStyleControl() {
    const mapStyleHTML = `
      <div class="map-style">
        <div class="satellite-v9" title="satellite">🛰</div>
        <div class="streets-v11" title="terrain">🗺</div>
      </div>`;
    this.insertAdjacentHTML('beforeend', mapStyleHTML);
    const el = this.querySelector('.map-style');
    el.addEventListener('click', event => {
      el.classList.toggle('satellite');
      const layerId = event.target.getAttribute('class');
      this.map.setStyle('mapbox://styles/mapbox/' + layerId);
    });
  }
}

if (!customElements.get('x-mapbox')) {
  customElements.define('x-mapbox', XMapbox);
}
