import { Editor } from 'grapesjs';

export default function(editor: Editor) {
  editor.Components.addType('x-masked', {
    isComponent: el => el.tagName == 'X-MASKED',

    model: {
      defaults: {
        tagName: 'x-masked',
        droppable: true,
        highlightable: true,
        traits: [
          'mask',
        ], 
      }
    }
  })
}
