import { Editor } from 'grapesjs';

export default function(editor: Editor) {
  editor.Components.addType('input-state', {
    isComponent: el => el.tagName === 'X-COMBOBOX' && el.classList.contains('input-state'),

    model: {
      defaults: {
        tagName: 'x-combobox',
        droppable: true,
        highlightable: true,
        traits: [
          'select-expr',
          'display-expr',
          'data-url',
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
        ] 
      }
    }
  })

  editor.on('component:create', model => {
    if (model.get('type') === 'input-state') {
      model.set('script', function(this) {
        const el = this;
      });
    }
  });
}