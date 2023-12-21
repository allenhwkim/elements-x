export const maskedType = {
  isComponent: (el) => {
    return  el.classList?.contains('x') && el.classList?.contains('masked');
  },
  model: {
    defaults: {
      copyable: false,
      traits: [
        'id',
        'name',
        'title',
        { name: 'mask', type: 'text' },
      ],
    },
  }
};