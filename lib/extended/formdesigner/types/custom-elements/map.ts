export const mapType = {
  extend: 'text',
  isComponent: el => el.tagName === 'X-MAP',

  model: {
    defaults: {
      attributes: { class: 'x map' },
      traits: [
        'id',
        'title',
        { name: 'center', type: 'text' },
        { name: 'zoom', type: 'number' },
      ],
    },
  }
};