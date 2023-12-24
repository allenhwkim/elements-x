export const loadRangeType = (editor) => ({
  extend: 'input',
  isComponent: (el: HTMLInputElement) => el.tagName == 'INPUT' && el.type == 'range',

  model: {
    defaults: {
      copyable: false,
      attributes: { type: 'range' },
      traits: [
        'id',
        'name',
        'value',
        'min',
        'max',
        'step',
        {name: 'required', type: 'checkbox'},
        {name: 'disabled', type: 'checkbox'},
      ],
    },
  },

  view: {
    events: {
      click: (ev: Event) => {
        if (!editor.Commands.isActive('preview')) {
          ev.preventDefault();
        }
      },
    } as any,
  },
});