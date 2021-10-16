import { define } from '../common/util';
import { getLonLat } from './get-lon-lat';
import defaultMaker from './marker.svg.html';

export class XOLMarker extends HTMLElement {
  static get observedAttributes() { return ['position']; }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.marker) return;
    (name === 'position') && this.setMarker(newValue);
  }

  connectedCallback() {
    this.map;
    this.marker;
    this.center = this.getAttribute('center') !== null;
    this.style.display = 'none';
    if (this.closest('x-openlayers') && this.getAttribute('position')) {
      this._init();
      // console.error('ERROR, x-ol-marker, x-openlayers and lat/lng required');
      return;
    }
  }

  _init() {
    const mapEl = this.closest('x-openlayers');
    this.image = this.getAttribute('src');
    mapEl.waitForMap().then(map => {
      this.map = map;
      return this.setMarker(this.getAttribute('position'));
    }).then(marker => {
      this.popup = this.getPopup(this.map);
      this.popup && this.map.addOverlay(this.popup);
    });
  }

  setMarker(position) {
    this.marker && this.map.removeLayer(this.marker);
    return getLonLat(position).then(lonLat => {
      this.marker = this.getMarker(lonLat, this.image);

      this.map.addLayer(this.marker);
      this.center && this.map.getView().setCenter(window.ol.proj.fromLonLat(lonLat));
      return this.marker;
    });
  }

  getMarker(lonLat, image = null) {
    image = image || this._svgToBase64(defaultMaker);
    const ol = window.ol;
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(lonLat)),
      name: 'Somewhere',
    });
    const marker =  new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [iconFeature]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: image
        })
      })
    });

    // console.log(marker);
    // marker.getFeatures(0).then(feature => console.log('yyyyyyyyyy', feature));

    return marker;
  }

  getPopup(map) {
    if (!this.innerHTML) return null;

    const container = document.createElement('div');
    container.classList.add('ol-popup');
    const closer = document.createElement('a'); 
    closer.classList.add('ol-popup-closer');
    const content = document.createElement('div'); 
    container.append(closer, content);

    var popup = new window.ol.Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: { duration: 250 }
    });

    closer.addEventListener('click', _ => {
      popup.setPosition(undefined); 
      closer.blur();
      return false;
    });

    map.on('singleclick', event => {
      if (map.hasFeatureAtPixel(event.pixel) === true) {
        content.innerHTML = this.innerHTML;
        popup.setPosition(event.coordinate);
      } else {
        popup.setPosition(undefined);
        closer.blur();
      }
    });

    return popup;
  }

  _svgToBase64(svg) {
    return 'data:image/svg+xml,' + 
      svg.replace('<svg>', '<svg xmlns="http://www.w3.org/2000/svg">')
        .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
        .replace('xmlns="http://www.w3.org/2000/svg" '.repeat(2), 'xmlns="http://www.w3.org/2000/svg" ')
        .replace(/>\s+</g, '><')
        .replace(/\s+/g, ' ')
        .replace(/"/g, '\'')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E') 
        .replace(/#/g, '%23') 
        .replace(/\n/g, '');
  }
}
XOLMarker.define = define('x-ol-marker', XOLMarker);
