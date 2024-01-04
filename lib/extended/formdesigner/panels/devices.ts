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
