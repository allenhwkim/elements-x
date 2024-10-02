export const dataTableType = {
  isComponent: el => el.tagName === 'X-TABLE',

  model: {
    defaults: {
      copyable: false,
      traits: [
        'id',
        'name',
        'title',
        { name: 'value', type: 'text' },
      ],
    },
  }
};