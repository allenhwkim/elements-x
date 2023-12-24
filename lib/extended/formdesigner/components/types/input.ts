export const inputType = {
  isComponent: el => el.tagName === 'INPUT',

  model: {
    defaults: {
      tagName: 'input',
      droppable: false,
      highlightable: false,
      attributes: { type: 'text' },
      traits: [
        'id',
        'name',
        'value',
        'placeholder',
        'autocomplete',
        {
          type: 'select',
          name: 'type',
          options: [
            { value: 'text' },
            { value: 'email' },
            { value: 'password' },
            { value: 'number' },
            { value: 'color' },
          ]
        },
        {name: 'required', type: 'checkbox'},
        {name: 'disabled', type: 'checkbox'},
        {name: 'readonly', type: 'checkbox'},
      ],
    },
  },

  extendFnView: ['updateAttributes'],
  view: {
    updateAttributes(this: any) {
      this.el.setAttribute('autocomplete', 'off');
    },
  }
};