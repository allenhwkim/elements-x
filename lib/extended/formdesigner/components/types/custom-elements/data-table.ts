export const dataTableType = {
  isComponent: el => el.tagName === 'X-TABLE',

  model: {
    defaults: {
      copyable: false,
      attributes: { class: 'x table' },
      traits: [
        'id',
        'name',
        'title',
        { name: 'value', type: 'text' },
      ],
    },
  }
};