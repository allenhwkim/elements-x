import { waitFor, setHTML, addCss, removeCss } from '../common/util';
import css from './openlayers.css';
import html from './openlayers.html';
import { getLonLat } from './get-lon-lat';
import './marker.js'; // To define x-ol-marker

export class XOpenLayers extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this.zoom;
    this.center;
    return self;
  }
  
  static get observedAttributes() { return ['center', 'zoom']; }
  disconnectedCallback() { removeCss(this); }

  attributeChangedCallback(name, oldValue, newValue) {
    (name === 'center') && this.setCenter(newValue);
    (name === 'zoom') && this.setZoom(newValue);
  }

  connectedCallback() {
    addCss(this, css);
    this.zoom = +this.getAttribute('zoom') || 13;
    this.center = this.getAttribute('center');
    this.satellite = this.getAttribute('satellite') !== null;

    setHTML(this, html)
      .then(_ => waitFor(_ => this.querySelector('.map').offsetWidth > 0))
      .then(_ => waitFor('ol'))
      .then(ol => {
        this.map = new ol.Map({ target: this.querySelector('.map') });
        this.map.addLayer(new window.ol.layer.Group({ layers: this.getLayers(ol) }));
        this.center && this.setCenter(this.center);
        this.setZoom(this.zoom);
        this.map.addControl(this.getCustomControl(ol));
        setTimeout(_ => this.map.updateSize(), 100);
      });
  }

  getCustomControl(ol) {
    class LayerControl extends ol.control.Control {
      constructor(options = {}) {
        const button = document.createElement('button');
        button.setAttribute('title', 'Switch Map');
        button.innerHTML = '🛰';
    
        const element = document.createElement('div');
        element.className = 'ol-rotate ol-unselectable ol-control';
        element.appendChild(button);
    
        super({element, target: options.target });
    
        this.layerNo = 1;
        button.addEventListener('click', this.handleRotateNorth.bind(this), false);
      }
    
      handleRotateNorth() {
        const layers = this.getMap().getLayerGroup().getLayersArray()
          .filter(layer => layer instanceof ol.layer.Tile);
        this.layerNo = (this.layerNo+1) % layers.length;
        layers.forEach((layer, i) => {
          layer.setVisible( i === this.layerNo ? true : false);
        });
      }
    }
    return new LayerControl();
  }

  getLayers(ol) {
    const layers = [
      new window.ol.layer.Tile({ source: new ol.source.XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 19
      }) }),
      new window.ol.layer.Tile({  source: new ol.source.OSM() }),
    ];
    return this.satellite ? layers.reverse() : layers;
  }

  setZoom(val) {
    if (!this.map) return;
    this.map.getView().setZoom(val ? +val : 15);
  }

  setCenter(param) {
    if (!this.map) return;
    getLonLat(param).then(
      resp => this.map.getView().setCenter(window.ol.proj.fromLonLat(resp))
    );
  }

  waitForMap() {
    let [_this, waiting] = [this, 0];
    return new Promise( (resolve, reject) => {
      function checkVariable() {
        _this.map ? resolve(_this.map) : (waiting += 100);
        waiting > 3000 ? reject() : setTimeout(checkVariable, 100);
      }
      setTimeout(checkVariable, 100);
    });
  }
}

if (!customElements.get('x-openlayers')) {
  customElements.define('x-openlayers', XOpenLayers);
}
