export const maskedType = {
  extend: 'text',
  isComponent: el => el.tagName === 'X-MASKED',
  model: {
    defaults: {
      copyable: false,
      attributes: { class: 'x masked' },
      traits: [
        'id',
        'name',
        'title',
        'mask'
      ],
    },
  }
};