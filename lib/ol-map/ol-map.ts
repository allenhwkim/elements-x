import { addCss, loadScript, removeCss, waitFor } from '../../lib';

const css = 'ol-map {display: block; height: 300px;}';

export class OlMap extends HTMLElement {
  static get observedAttributes() { return ['center', 'zoom']; }
  #map: any = undefined;

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    (oldValue !== newValue) && this.render();
  }

  async connectedCallback() {
    loadScript('//cdn.jsdelivr.net/npm/ol@v7.2.2/dist/ol.js', '//cdn.jsdelivr.net/npm/ol@v7.2.2/ol.css');
    addCss(this.tagName, css);
    await waitFor('window.ol');
    this.#map = new window['ol'].Map({ target: this });
    this.#map.addLayer(new window['ol'].layer.Tile({source: new window['ol'].source.OSM()}));
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  async render() {
    const center = this.getAttribute('center') || 'Brampton Ontario, Canada';
    const zoom = this.getAttribute('zoom') || 11;
    const lonLat = await this.getLonLat(center);
    this.#map.getView().setCenter(window['ol'].proj.fromLonLat(lonLat));
    this.#map.getView().setZoom(zoom);
  }

  getLonLat(address) {
    return new Promise( resolve => {
      if (typeof address === 'string' && address.match(/[-0-9.]+,\s?[-0-9.]+/)) { //'-99.99, 99'
        const lonLat = address.split(',').map(el => +(el.trim()));
        resolve(lonLat);
      } else if (typeof address === 'string') {
        const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;
        window.fetch(url).then(resp => resp.json())
          .then(resp => {
            const lonLat = resp[0] ? [resp[0].lon, resp[0].lat] : [0,0];
            resolve(lonLat);
          });
      }
    });
  }
}
