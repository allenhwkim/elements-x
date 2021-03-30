// import {setHTML, addCss, removeCss} from 'elements-x/dist/common';
import {getLngLat} from './index.js';

export class XMarker extends HTMLElement {
  static get observedAttributes() { return ['lnglat', 'color', 'rotation']; }

  connectedCallback() {
    this.map;
    this.marker;
    this.center = this.getAttribute('center') !== null;
    this.lngLat = this.getAttribute('lnglat');
    if (this.lngLat) {
      this._init();
    } else {
      console.error('ERROR, lat/lng required for x-marker');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.marker) return;
    (name === 'lnglat') && this.setLngLat(newValue);
    (name === 'color') && this.setColor(newValue);
    (name === 'rotation') && this.setRotation(newValue);
  }

  setColor(val) { this.marker.setColor(val); }
  setRotation(val) { this.marker.setRotation(+val);}
  setLngLat(lngLat) {
    getLngLat(lngLat).then(lngLat => {
      this.marker.setLngLat(lngLat);
      this.center && this.map.setCenter(lngLat);
    });
  };

  _init() {
    this.closest('x-mapbox').getMap().then(map => {
      this.map = map;
      this.marker = new window.mapboxgl.Marker();
      return getLngLat(this.lngLat);
    }).then(lngLat => {
      this.lngLat = lngLat;
      this.center && this.map.setCenter(lngLat);
      this.marker.setLngLat(lngLat).addTo(this.map);
      this._setPopup(this.innerHTML);
    });
  }

  _setPopup(html) {
    if (!html.trim()) return;
    this.marker.getLngLat();
    const popup = new window.mapboxgl.Popup({closeButton: false})
      .setLngLat(this.lngLat)
      .setHTML(this.innerHTML);
    this.marker.setPopup(popup).togglePopup();
  }

}

if (!customElements.get('x-marker')) {
  customElements.define('x-marker', XMarker);
}