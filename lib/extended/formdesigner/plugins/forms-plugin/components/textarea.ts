
import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('textarea', {
    extend: 'input',
    isComponent: el => el.tagName == 'TEXTAREA',

    model: {
      defaults: {
        tagName: 'textarea',
        attributes: {},
        traits: [
          {name: 'name'},
          {name: 'placeholder'},
          {type: 'checkbox', name: 'required'},
        ]
      },
    },
  });
}