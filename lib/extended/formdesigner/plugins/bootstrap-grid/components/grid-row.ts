import { Component, Components, Editor } from 'grapesjs';

export default function(editor: Editor) {
  const components = editor.DomComponents;
  components.addType('grid-row', {
    isComponent: function(el) {
      return el.dataset && el.dataset.gjsType === 'grid-row';
    },

    model: {
      defaults: {
        name: 'Row',
        draggable: true,
        // droppable: '[data-gjs-type="grid-column"]',
        // Indicates if it's possible to drop other components inside.
        droppable: comp => comp.get('type') === 'grid-column',
        attributes: {
          class: 'container'
        }
      },
      init: function() {
        editor.on('component:add', function(model) {
          console.log('grid-row component:add', {model, el: model.view?.el});
          var parent = model.parent();
          parent && parent.components().models.length > 12 && model.remove()
        });

        editor.on('component:create', function(model) {
          console.log('grid-row component:create', {model, el: model.view?.el});
          model.setSizeClass
        });

        this.on('component:update:components', function(model, components: Components, update) { // t, n, a
          var action = update.action; // r
          var index = update.index; // i
          console.log('grid-row component:update:components', {action, index, model, components, update});

          if (['add-component', 'move-component', 'clone-component'].includes(action)) {
            var models = components.models; // a
            var arr = [ // exclude current
              ...models.slice(index+1), // following
              ...models.slice(0, index).reverse() // preceding
            ];
            var i = true;
            var l = 0;

            for (; i && l < arr.length;) {
              const modelN: any = arr[l]; // s
              const span: number = modelN.getSpan(); // c
              if (1 !== span) {
                var p = Math.ceil(span / 2);
                modelN.setSizeClass(span - p);
                model.setSizeClass(p); 
                i = false;
              }
              l++;
            }
          }

          if (action === 'remove-component') {
            const cmpLen = components.length; // a
            if (cmpLen >= 12) return;

            const r = index === cmpLen ? index - 1 : index;
            if (index >= 0 && cmpLen > 0) {
              const modelN: any = components.models[r]; // i
              const spanN = modelN.getSpan(); // l
              const spanC = model.getSpan(); // s
              modelN.setSizeClass(spanC + spanN);
            } else {
              model.parent().append({
                type: 'grid-column'
              })
            }
          }
        });
      }
    },
  });
}