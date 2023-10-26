export const labelType = {
  extend: 'text',
  isComponent: el => el.tagName === 'LABEL',

  model: {
    defaults: {
      tagName: 'label',
      components: 'Hello Label',
      traits: [
        'id',
        'title',
        { type: 'text', name: 'for' },
      ],
    },
  },
};