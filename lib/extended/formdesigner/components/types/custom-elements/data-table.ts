export const dataTableType = {
  isComponent: (el) => el.classList?.contains('x') && el.classList?.contains('table'),

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