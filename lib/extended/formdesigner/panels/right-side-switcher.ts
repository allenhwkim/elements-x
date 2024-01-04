import { icons } from "./icons";

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
