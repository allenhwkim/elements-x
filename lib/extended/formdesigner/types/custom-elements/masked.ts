export const maskedType = {
  extend: 'text',
  isComponent: el => el.tagName === 'X-MASKED',
  model: {
    defaults: {
      copyable: false,
      traits: [
        'id',
        'name',
        'title',
        'mask'
      ],
    },
  }
};