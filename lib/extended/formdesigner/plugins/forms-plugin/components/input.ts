import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('input', {
    isComponent: el => el.tagName == 'INPUT',

    model: {
      defaults: {
        tagName: 'input',
        droppable: false,
        highlightable: false,
        attributes: { type: 'text' },
        traits: [
          { name: 'name'},
          { name: 'placeholder'},
          {
            type: 'select',
            name: 'type',
            options: [
              { value: 'text' },
              { value: 'email' },
              { value: 'password' },
              { value: 'number' },
            ]
          },
          { type: 'checkbox', name: 'required' }
        ],
      }
    }
  })
}