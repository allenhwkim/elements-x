import { Editor } from "grapesjs";

export const loadDropdownType = (editor: Editor) => ({
  extend: 'text',
  isComponent: el => el.tagName === 'X-DROPDOWN',

  model: {
    defaults: {
      copyable: false,
      attributes: { class: 'x dropdown' },
      traits: [
        'id',
        'name',
        'title',
      ],
    },
  },
  view: {
    events: {
      mousedown: (ev: MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
      }
    } as any,
  },
});