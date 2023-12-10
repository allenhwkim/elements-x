import { icons } from './icons';

export const devicesPanel = {
  id: 'panel-devices',
  el: '.panel__devices',
  buttons: [{
      id: 'device-desktop',
      label: icons.desktop,
      command: 'set-device-desktop',
      active: true,
      togglable: false,
    }, {
      id: 'device-mobile',
      label: icons.mobile,
      command: 'set-device-mobile',
      togglable: false,
  }],
};

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

export const topPanel = {
  id: 'panel-top',
  el: '.panel__top',
};

export const basicActionsPanel = {
  id: 'basic-actions',
  el: '.panel__basic-actions',
  buttons: [
    {
      id: 'visibility',
      active: true, // active by default
      className: 'btn-toggle-borders',
      label: icons.outline,
      command: 'sw-visibility', // Built-in command
    }, {
      id: 'export',
      className: 'btn-open-export',
      label: icons.code,
      command: 'export-template',
      context: 'export-template', // For grouping context of buttons from the same panel
    },
    {
      id: 'preview',
      context: 'preview',
      command: (editor: any) => editor.runCommand('preview'),
      label: icons.preview
    }
  ],
};

export const rightSideSwitcher = {
  id: 'panel-switcher',
  el: '.tabs.panel__switcher',
  buttons: [
    {
      id: 'show-blocks',
      active: true,
      label: icons.block,
      command: 'show-blocks',
      togglable: false,
    },
    {
      id: 'show-traits',
      active: true,
      label: '[a]',
      command: 'show-traits',
      togglable: false,
    },
    {
      id: 'show-layers',
      active: true,
      label: icons.layer,
      command: 'show-layers',
      // Once activated disable the possibility to turn it off
      togglable: false,
    }, 
    {
      id: 'show-style',
      active: true,
      label: icons.brush,
      command: 'show-styles',
      togglable: false,
    },
  ],
};
