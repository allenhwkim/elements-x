
import { Editor } from "grapesjs";

export default function option(editor: Editor) {
  editor.Components.addType('option', {
    isComponent: el => el.tagName == 'OPTION',

    model: {
      defaults: {
        tagName: 'option',
        layerable: false,
        droppable: false,
        draggable: false,
        highlightable: false,
        traits: [
          'value',
          {type: 'checkbox', name: 'disabled'},
          {type: 'checkbox', name: 'selected'},
        ]
      },
    },
  });
}