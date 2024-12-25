import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('x-combobox', {
    isComponent: el => el.tagName === 'X-COMBOBOX',

    model: {
      defaults: {
        tagName: 'x-combox',
        droppable: false,
        highlightable: false,
        attributes: {},
        traits: [],
        components: [],
      }
    }
  })
}