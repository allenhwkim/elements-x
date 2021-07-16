export function getLonLat(str) {
  return new Promise( resolve => {
    if (typeof str === 'string' && str.match(/[-0-9.]+,\s?[-0-9.]+/)) { //'-99.99, 99'
      const lngLat = str.split(',').map(el => +(el.trim()));
      resolve(lngLat);
    } else if (typeof str === 'string') {
      const url = `https://nominatim.openstreetmap.org/search?q=${str}&format=json`;
      window.fetch(url).then(resp => resp.json())
        .then(resp => {
          const lngLat = resp[0] ? [resp[0].lon, resp[0].lat] : [0,0];
          resolve(lngLat);
        });
    }
  });
}
