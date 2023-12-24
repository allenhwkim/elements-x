export const loadSelectType = (editor) => ({
  isComponent: el => el.tagName == 'SELECT',

  model: {
    defaults: {
      tagName: 'select',
      droppable: false,
      highlightable: false,
      components: [
        {type: 'option', content: 'Option 1', attributes: { value: 'opt1'}},
        {type: 'option', content: 'Option 2', attributes: { value: 'opt2'}},
      ],
      traits: [
        'id',
        'title',
        'name',
        { name: 'required', type: 'checkbox' },
        { name: 'multiple', type: 'checkbox' },
        {
          name: 'options',
          type: 'select-options'
        },
      ],
    },
  },

  view: {
    events: {
      mousedown: (ev: Event) => {
        if (!editor.Commands.isActive('preview')) {
          ev.preventDefault();
        }
      },
    } as any,
  },
});