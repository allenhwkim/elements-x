export const inputRadioType = {
  isComponent: (el) => el.tagName === 'INPUT' && el.type === 'radio',

  model: {
    defaults: {
      copyable: false,
      attributes: { type: 'radio' },
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