
import { Editor } from "grapesjs";

export default function(editor: Editor) {

  editor.Components.addType('select', {
    isComponent: el => el.tagName == 'SELECT',

    model: {
      defaults: {
        tagName: 'select',
        droppable: false,
        highlightable: false,
        traits: [
          { name: 'name'},
          { name: 'required', type: 'checkbox' },
          { 
            type: 'button', 
            name: 'edit-html',
            text: 'Edit HTML', 
            full: true, 
            command: 'html-editor' 
          },
          { 
            type: 'button', 
            name: 'edit-js',
            text: 'Edit Javascript', 
            full: true, 
            command: 'js-editor'
          },
        ],
      },
    },

    view: {
      events: {
        mousedown: (ev: Event) => {
          if (!editor.Commands.isActive('preview')) {
            ev.preventDefault();
          }
        }
      } as any,
    },
  });
}