import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('x-dropdown', {
    isComponent: el => el.tagName === 'X-DROPDOWN',

    model: {
      defaults: {
        tagName: 'x-dropdown',
        droppable: false,
        highlightable: false,
        attributes: {},
        traits: [],
        components: [],
      }
    }
  })
}