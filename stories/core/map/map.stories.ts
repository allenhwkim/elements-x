import type { Meta } from '@storybook/html';
import {Map} from '../../../lib/core/map/map';
import { debounce } from '../../../lib/util';

const elName = 'x-map';
const className = Map;

!customElements.get(elName) && customElements.define(elName, className);

let timer: any;
const meta: Meta = { 
  title: 'Core/Map',
  render: (args) => {
    clearTimeout(timer);
    const el = document.createElement(elName) as any;
    timer = setTimeout(async () => { 
      (args.center) &&  (el.setAttribute('center', args.center));
      (args.zoom) &&  (el.setAttribute('zoom', args.zoom));
    }, 500);
    return el;
  },
  args: {},
  argTypes: {
    center: {
      description: 'Center of map,  elg. \'Brampton Ontario, Canada\'',
      control: { type: 'text' },
    },
    zoom: {
      description: 'Zoom level',
      control: { type: 'range', min: 1, max: 20, step: 1 },
      table: { defaultValue: { summary: 11 } },
    }
  },
}

export default meta;

export const Primary = { 
  args: { 
    center: `Brampton Ontario, Canada`,
    zoom: 11
  }
};