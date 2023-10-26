export const selectType  = {
  isComponent: el => el.tagName === 'SELECT',

  model: {
    defaults: {
      tagName: 'select',
      components: `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `,
      traits: [
        'id',
        'title',
        'name',
        { name: 'required', type: 'checkbox' },
        { name: 'multiple', type: 'checkbox' },
      ],
    },
  },
  view: {}
}