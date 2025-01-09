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
        resizable : { tl: 0, tc: 0, tr: 0, cl: 0, cr: 0, bl: 0, br: 0, bc: 1 },
        attributes: {
          class: 'row p-1'
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
          if (
            action === 'add-component' || 
            action === 'clone-component' || 
            action === 'paste-component'
          ) { // model (comp addded/cloned/pasted)
            const nonCol1s = neighbors(components.models, index).filter(el => el.getSpan() > 1);

            const neighborComp = nonCol1s[0];
            if (neighborComp) {
              const neighborCompSize = neighborComp.getSpan(); // e.g. 5
              const urSize = Math.ceil(neighborCompSize / 2); // e.g. 3
              const mySize = neighborCompSize - urSize; // e.g. 2

              neighborComp.setColMdClass(urSize);
              model.setColMdClass(mySize);
              console.log({neighborComp, neighborCompSize}, urSize, 'reduced by with', {model, mySize});
            } else {
              console.log('adding to an empty block');
              model.setColMdClass(12);
            }
          } else if (action === 'remove-component') { // model (to be removed)
            if (components.models.length >= 12) return;

            const allComps = (components.models as any).toSpliced(index, 0, model)
            const neighborComps = neighbors(allComps, index);

            const neighborComp = neighborComps[0];
            if (neighborComp) {
              const neighborCompSize = neighborComp.getSpan(); // e.g. 3
              const mySize = model.getSpan(); // 1
              const urSize = Math.ceil(mySize + neighborCompSize); // e.g. 4

              neighborComp.setColMdClass(urSize);
              model.setColMdClass(mySize);
              console.log({neighborComp, orgSize: neighborCompSize}, urSize, 'combined with', {model, mySize});
            }
          }
        });
      }
    },
  });
}