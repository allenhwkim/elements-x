export const textareaType = {
  isComponent: el => el.tagName === 'TEXTAREA',

  model: {
    defaults: {
      tagName: 'textarea',
      traits: [
        'id',
        'title',
        'name',
        'placeholder',
        {name: 'required', type: 'checkbox' }
      ]
    },
  },
}