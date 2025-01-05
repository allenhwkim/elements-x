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
        // Indicates if it's possible to drop other components inside.
        droppable: comp => comp.get('type') === 'grid-column',
        attributes: {
          class: 'container'
        }
      },

      init: function() {
        editor.on('component:add', function(col: Component) {
          console.log('grid-row component:add', {col, el: col.view?.el});
          const totalEls = col.parent()?.components().models.length || 0;
          (totalEls > 12) &&  col.remove();
        });

        this.on('component:update:components', function(model, components: Components, update) { // t, n, a
          const {action, index} = update; // r

          function neighbors(arr: any[], ndx: number, order?) { 
            const ret: any[] =[]; 
            for(var i=1; i<arr.length; i++) { 
              if (order==='left-first') {
                ret.push(arr[ndx-i], arr[ndx+i]); 
              } else {
                ret.push(arr[ndx+i], arr[ndx-i]); 
              }
            }; 
            return ret.filter(el => el !== undefined) 
          }

          console.log('grid-row component:update:components', update, {action});
          if (action === 'add-component') { // model (comp addded)
            const nonCol1s = neighbors(components.models, index);
            const neighborComp = nonCol1s[0];
            const firstNonCol1Size = neighborComp.getSpan(); // e.g. 5
            const urSize = Math.ceil(firstNonCol1Size / 2); // e.g. 3
            const mySize = firstNonCol1Size - urSize; // e.g. 2

            neighborComp.setSizeClass(urSize);
            model.setSizeClass(mySize);
            console.log({firstNonCol1Size, neighborComp, urSize, model, mySize});
          }

          if (action === 'clone-component') { // model (comp cloned)
            const nonCol1s = neighbors(components.models, index, 'left-first');
            const mySize = model.getSpan(); // 6
            const neighborComp = nonCol1s[0];
            const myNewSize = Math.ceil(mySize / 2);
            const urSize = mySize - myNewSize;

            neighborComp.setSizeClass(urSize);
            model.setSizeClass(myNewSize);
            console.log({mySize, neighborComp, urSize, model, myNewSize});
          }

          if (action === 'move-component') { // model (comp moved)
            const nonCol1s = neighbors(components.models, index, 'left-first');
            console.log({nonCol1s, model})
          }
          // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx TODO xxxxxxxxxxxxxxxxx
          // if (['move-component', 'clone-component'].includes(action)) {
          //   var models = components.models; // a
          //   var arr = [ // exclude current
          //     ...models.slice(index+1), // following first
          //     ...models.slice(0, index).reverse() // preceding second
          //   ];
          //   var i = true;
          //   var l = 0;

          //   for (; i && l < arr.length;) {
          //     const modelN: any = arr[l]; // s
          //     const span: number = modelN.getSpan(); // c
          //     if (1 !== span) {
          //       console.log(action, modelN.view?.el, modelN.getSpan(), model.view?.el, model.getSpan());
          //       var p = Math.ceil(span / 2);
          //       modelN.setSizeClass(span - p);
          //       model.setSizeClass(p); 
          //       i = false;
          //       console.log(action, modelN.view?.el, modelN.getSpan(), model.view?.el, model.getSpan());
          //     }
          //     l++;
          //   }
          // }

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