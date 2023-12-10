export const optionType = {
  isComponent: el => el.tagName === 'OPTION',

  model: {
    defaults: {
      tagName: 'option',
      droppable: 'select',
      draggable: 'select',
      traits: [
        'id',
        'value'
      ],
    },
  },
}