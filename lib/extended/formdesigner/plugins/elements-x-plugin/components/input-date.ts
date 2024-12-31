import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('input-date', {
    isComponent: el => el.tagName === 'DIV' && el.classList.contains('input-date'),

    model: {
      defaults: {
        tagName: 'div',
        droppable: true,
        highlightable: true,
        traits: [
          { 
            type: 'button', 
            name: 'edit-html',
            text: 'Edit HTML', 
            full: true, 
            command: 'html-editor' 
          },
        ],
      }
    }
  })
}