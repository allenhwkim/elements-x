export const labelType = {
  extend: 'text',
  isComponent: el => el.tagName == 'LABEL',

  model: {
    defaults: {
      tagName: 'label',
      components: 'Label' as any,
      traits: ['for'],
    },
  },
}