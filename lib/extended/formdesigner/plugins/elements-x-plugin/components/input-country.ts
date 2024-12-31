import { Editor } from 'grapesjs';

export default function(editor: Editor) {
  editor.Components.addType('input-country', {
    isComponent: el => el.tagName == 'X-COMBOBOX' && el.classList.contains('input-country'),

    model: {
      defaults: {
        tagName: 'x-combobox',
        droppable: true,
        highlightable: true,
        traits: [
          'select-expr',
          'display-expr',
          'data-url',
          'data-path',
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
      }
    },
    view: { /* onRender({model, el}) { } */ }
  })

  editor.on('component:create', model => {
    if (model.get('type') === 'input-country') {
      model.set('script', function(this) {
        const el = this;
      });
    }
  });
}