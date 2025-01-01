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
          'id',
          'name',
          'placeholder',
          { type: 'checkbox', name: 'required' },
          {
            type: 'select',
            name: 'type',
            options: [
              { value: 'color' },
              { value: 'email' },
              { value: 'number' },
              { value: 'range' },
              { value: 'search' },
              { value: 'text' },
              { value: 'url' },
            ]
          },
        ],
      }
    }
  });
}