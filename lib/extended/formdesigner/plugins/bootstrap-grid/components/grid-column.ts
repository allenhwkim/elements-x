import { Block, CallbackOptions, Component, Editor } from 'grapesjs';

export default function(editor: Editor) {
  const components = editor.DomComponents;
  components.addType('grid-column', {
    isComponent: function(el: HTMLElement) {
      return el.dataset && el.dataset.gjsType === 'grid-column'
    },

    model: {
      defaults: {
        tagName: 'div',
        name: 'Column',
        draggable: function(dragging, target: Component) { // draggable to
          const parentType = dragging?.parent?.()?.get('type');
          const targetType = target.get('type') as string;
          // when dragging from block, parent is undefined, dropping allowed to 'wrapper' or 'grid-row'
          if (parentType === undefined) { 
            return ['wrapper', 'grid-row'].includes(targetType);
          }
          // wnen dragging from 'grid-row', dropping allowed within it
          else if (parentType === 'grid-row') { 
            return targetType === 'grid-row';
          }
        },
        droppable: true, // Indicates if it's possible to drop other components inside.
        resizable: { // enable resize handle for left and right

          onStart: function(event: PointerEvent, _component) {
            var component = editor.getSelected() as Component;
            component.set('startX', event.x);
          },

          onEnd: function() { // reset startX, prevX, prevDirection, prevDeltaX when resize drag ends
            var component = editor.getSelected() as Component;
            component.set('startX', undefined);
            editor.Canvas.toggleFramesEvents(true); //  enable event listeners on the canvas frames
          },

          updateTarget: function(el: HTMLElement, _rect, opts: CallbackOptions) { // el(n), rect(o), a(opts)
            editor.UndoManager.stop();
            const component = editor.getSelected() as Component; // c
            const parent = component.parent() as Component; // S(uppercase)
            const oneColSize = (parent.getEl() as HTMLElement).offsetWidth / 12; // f

            const {currentPos, handlerAttr} = opts.resizer; // resizer(r)
            const posX = currentPos?.x as number; // s
            const startX = component.get('startX'); // startX changes when col size changes
            
            const handler = 'cr' === handlerAttr ? 'right' : 'left'; // u
            const moveDirection = posX > startX ? 'right' : 'left';
            const increasing = handler === moveDirection; // e.g, right handler goes to right
            const decreasing = handler !== moveDirection; // e.g, right handler goes to left
            
            const moveX = Math.abs(posX - startX);
            const colSizeChange = Math.trunc(moveX / oneColSize);
            // console.info(handler, 'handler going to', moveDirection);
            
            if ( (increasing || decreasing) && (colSizeChange > 0)) {
              const draggingCol: any = component;
              const matchingCol = draggingCol.getMatchingColumn(handler, increasing); // w
              if (matchingCol) {
                editor.UndoManager.start();
                draggingCol.incColSizeBy(increasing ? 1: -1);
                matchingCol.incColSizeBy(increasing ? -1 : 1);
                // change startX to the the position of increased column size
                // so that next it can increase again by 1
                const incSize = posX > startX ? oneColSize : -oneColSize;
                component.set('startX', startX + incSize);
              }
            }
            editor.UndoManager.stop();
          },
          cl: true, // center-left
          cr: true, // center-right
          tl: false, // top-left
          tc: false, // top-center
          tr: false, // top-right
          br: false, // bottom-right
          bc: false, // bottom-center
          bl: false, // bottom-left
        },
      },

      setColMdClass: function(colSize: number) { // t
        const klasses = (this as Component).getClasses(); // e
        const colMdNdx = klasses.findIndex((function(klass) { // n
            return klass.startsWith('col-md-')
          }));
        if (colSize > 0 && colSize <= 12) {
          const newColMdKlass = `col-md-${colSize}`; // o
          colMdNdx > -1 ? klasses[colMdNdx] = newColMdKlass : klasses.push(newColMdKlass); 
          this.setClass(klasses);
          this.addAttributes({ 'data-size': `x${colSize}` });
        }
      },

      getSpan: function(): number {
        const colMdKlass = this.getClasses().find(el => el.startsWith('col-md-')); // e
        if (colMdKlass) {
          var colNum = colMdKlass.split('-')[2]; // n
          return Number(colNum)
        }
        return 12;
      },

      incColSizeBy: function(delta: number = 0) {
        const colSize = this.getSpan();
        const newSize = Math.min(Math.max( colSize + delta, 1), 12);
        this.setColMdClass(newSize);
      },

      getMatchingColumn: function(handler: string, increasing: boolean): Component | undefined {
        const siblings = this.parent()?.components().models || [];
        const thisNdx = this.index(); // n
        const nextNdx = handler === 'right' ? thisNdx + 1 : thisNdx - 1; // o
        const matchingCol: any = siblings[nextNdx]; // r
        if (!matchingCol) return;

        const myColSize: number = this.getSpan(); // i
        const urColSize: number = (matchingCol as any).getSpan(); // l
        // when increase, matching col must be bigger than 1 so that u can decrease
        const incresable = increasing && urColSize > 1; 
        // when decrease, my col must be bigger than 1 so that I can decrease 
        const decreasable = !increasing && myColSize > 1;

        return (incresable || decreasable) ? matchingCol: undefined;
      }
    },
  });

  // a block is dropped into a parent. e.g. grid-column dropped to a wrapper
  editor.on('block:drag:stop', function(component, block: Block) { // t, n
    const cmpType = component?.get?.('type');
    const parentType = component?.parent?.()?.get('type');

    // a grid-column dropped to a wrapper without grid-row, needs to wrap with a grid-row
    if ( cmpType === 'grid-column' && parentType === 'wrapper') {
      console.log('block:drag:stop', {cmpType, parentType, component});
      component.replaceWith({ type: 'grid-row', components: [{
        type: 'grid-column',
        attributes: { 'data-size' : 'x12', class: 'col p-1 col-md-12'}
      }] });
    }
  });

}