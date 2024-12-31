import { Editor } from 'grapesjs';

export default function(editor: Editor) {
  editor.Components.addType('custom-html', {
    isComponent: el => el.tagName === 'DIV' && el.classList.contains('custom'),

    model: {
      defaults: {
        tagName: 'div',
        droppable: true,
        highlightable: true,
        traits: [
          'class',
          { 
            type: 'button', 
            name: 'edit-html',
            text: 'Edit HTML', 
            full: true, 
            command: 'html-editor' 
          }
        ],
      }
    }
  });
}
