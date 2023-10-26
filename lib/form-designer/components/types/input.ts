export const inputType = {
  isComponent: el => el.tagName === 'INPUT',

  model: {
    defaults: {
      tagName: 'input',
      attributes: { type: 'text', autocomplete: 'off' },
      traits: [
        'name',
        'placeholder',
        'type',
        'autocomplete',
        {name: 'required', type: 'checkbox'},
        {name: 'disabled', type: 'checkbox'},
        {name: 'readonly', type: 'checkbox'},
      ],
    },
  }
};