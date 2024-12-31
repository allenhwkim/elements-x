import { Editor } from 'grapesjs';

export default function(editor: Editor) {
  editor.Components.addType('x-combobox', {
    isComponent: el => el.tagName == 'X-COMBOBOX',

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
    }
  })

  editor.on('component:create', model => {
    if (model.get('type') === 'x-combobox') {
      model.set('script', function(this) {
        const el = this;
        // el.dataList = {foo:1, bar:2};
        // el.dataFunction = function(q) {
        //   return fetch('https://dummyjson.com/products/search?q='+q)
        //   .then(res => res.json()).then(res => res.products || [])
        // }
      });
    }
  });
}