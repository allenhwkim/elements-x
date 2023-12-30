export const loadCheckboxType = (editor) => ({
  extend: 'input',
  isComponent: (el) => el.tagName == 'INPUT' && (el as HTMLInputElement).type == 'checkbox',

  model: {
    defaults: {
      copyable: false,
      attributes: { type: 'checkbox' },
      traits: [
        'id',
        'name',
        'value',
        {name: 'checked', type: 'checkbox'},
        {name: 'required', type: 'checkbox'},
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

    init(this: any) {
      this.listenTo(this.model, 'change:attributes:checked', this.handleChecked);
    },

    handleChecked(this: any) {
      (this.el as any).checked = !!this.model.get('attributes')?.checked;
    },
  },
});