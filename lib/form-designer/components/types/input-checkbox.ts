export const inputCheckboxType = {
  isComponent: (el) => el.tagName === 'INPUT' && el.type === 'checkbox',

  model: {
    defaults: {
      copyable: false,
      attributes: { type: 'checkbox' },
      traits: [
        'id',
        'name',
        'value',
        {name: 'required', type: 'checkbox'},
        {name: 'checked', type: 'checkbox'},
        {name: 'disabled', type: 'checkbox'},
        {name: 'readonly', type: 'checkbox'},
      ],
    },
  }
};