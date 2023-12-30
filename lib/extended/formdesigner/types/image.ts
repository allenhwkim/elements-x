export const imageType = {
  isComponent: el => el.tagName == 'IMG',

  model: {
    defaults: {
      tagName: 'img',
      traits: [
        'alt',
        'width',
        'height',
        'src',
        'srcset',
      ],
    },
  },
}