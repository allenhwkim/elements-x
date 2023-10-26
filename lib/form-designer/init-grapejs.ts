import grapesjs from 'grapesjs';
import { showSidePanel } from './custom-commands';
import { componentBlocks, formBlocks, containerBlocks, formControlBlocks }  from './blocks';
import { componentTypes } from './components';
import {
  topPanel, 
  basicActionsPanel, 
  devicesPanel,
  rightSideSwitcher, 
  layersPanel,
} from './panels';

const devices = [
  { name: 'Desktop', width: ''},// default size
  { name: 'Mobile', width: '320px', /* canvas width */ widthMedia: '480px' /* used in CSS @media */ }
];

export function initGrapesJs(elId: string) {
  const editor = grapesjs.init({
    container: elId,
    // fromElement: true, // initial html is from innerHTMl
    height: '100%', // default 900px,
    plugins: [
      componentTypes,
    ],
    storageManager: false,
    deviceManager: {
      devices
    },
    layerManager: {
      appendTo: '.layers-container'
    },
    styleManager: {
      appendTo: '.styles-container'
    },
    blockManager: {
      appendTo: '.blocks-container',
      blocks: [
        ...formControlBlocks,
        ...containerBlocks,
        ...formBlocks,
        ...componentBlocks,
      ]
    },
    selectorManager: {
      appendTo: '.traits-container'
    },
    traitManager: {
      appendTo: '.traits-container',
    },
    canvas: {
      scripts: [ 
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js',
      ],
      styles: [
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
        '/custom-elements.css',
      ],
    },
    panels: {
      defaults: [
        topPanel,
        basicActionsPanel,
        devicesPanel,
        rightSideSwitcher,
        layersPanel,
      ]
    },
    commands: {
      defaults: [
        { id: 'show-layers', ...showSidePanel('.layers-container') },
        { id: 'show-styles', ...showSidePanel('.styles-container') }, 
        { id: 'show-traits', ...showSidePanel('.traits-container') },
        { id: 'show-blocks', ...showSidePanel('.blocks-container') },
        { id: 'set-device-desktop', run(editor: grapesjs.Editor) { editor.setDevice('Desktop')} },
        { id: 'set-device-mobile', run(editor: grapesjs.Editor) { editor.setDevice('Mobile')} },
      ]
    }
  });
  
  return editor;
}