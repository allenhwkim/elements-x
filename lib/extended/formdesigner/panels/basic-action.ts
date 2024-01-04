import { icons } from "./icons";

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