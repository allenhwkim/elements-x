export const mapType = {
  isComponent: (el) => el.classList?.contains('x') && el.classList?.contains('map'),

  model: {
    defaults: {
      copyable: false,
      traits: [
        'id',
        'name',
        'title',
        { name: 'center', type: 'text' },
        { name: 'zoom', type: 'number' },
      ],
    },
  }
};