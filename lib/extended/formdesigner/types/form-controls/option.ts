export const optionType = {
  isComponent: el => el.tagName == 'OPTION',

  model: {
    defaults: {
      tagName: 'option',
      layerable: false,
      droppable: false,
      draggable: false,
      highlightable: false,
    },
  },
}