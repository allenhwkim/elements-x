import { icons } from './icons';

export const layersPanel = {
  id: 'layers',
  el: '.side-bar',
  // Make the panel resizable
  resizable: {
    maxDim: 350,
    minDim: 20,
    tc: 0, // Top handler
    cl: 0, // Left handler
    cr: 1, // Right handler
    bc: 0, // Bottom handler
    // Being a flex child we need to change `flex-basis` property
    // instead of the `width` (default)
    keyWidth: 'flex-basis',
  },
};

