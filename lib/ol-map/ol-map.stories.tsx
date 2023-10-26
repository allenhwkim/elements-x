import * as React from 'react';

import { OlMap } from '../index';
!customElements.get('ol-map') && customElements.define('ol-map', OlMap);

export default { component: OlMap as any };

export const Primary = (args?: any) => {
  return <>
    <ol-map zoom="11" center="Brampton Ontario, Canada"></ol-map>
  </>
};
