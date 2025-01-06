import { Block, BlockProperties, CallbackOptions, Component, Editor, Position, ResizerOptions } from 'grapesjs';

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

          onEnd: function() { // reset startX, prevX, prevDirection, prevDeltaX when resize drag ends
            var component = editor.getSelected() as Component;
            component.set('startX', undefined);
            component.set('prevX', undefined);
            component.set('prevDirection', undefined);
            component.set('prevDeltaX', undefined);
            editor.Canvas.toggleFramesEvents(true); //  enable event listeners on the canvas frames
          },

          updateTarget: function(el: HTMLElement, _rect, opts: CallbackOptions) { // el(n), rect(o), a(opts)
            editor.UndoManager.stop();
            const resizer = opts.resizer; // resizer(r)
            const curPos = resizer.currentPos as Position; // curPos(i)
            const handleAttr = resizer.handlerAttr; // attr(l)
            const posX = curPos.x; // s
            const component = editor.getSelected() as Component; // c
            
            const prevX = component.get('prevX') || posX;
            component.set('prevX', prevX);

            const prevDirection = component.get('prevDirection'); // g
            const dragDirection = posX > prevX ? 'right' :  // m
              posX < prevX ? 'left' : prevDirection;

            const startX = prevDirection !== dragDirection ? 
              prevX : (component.get('startX') || posX);
            component.set('startX', startX);

            if (prevDirection !== dragDirection) {
              component.set('prevDeltaX', undefined);
            }

            const handler = 'cr' === handleAttr ? 'right' : 'left'; // u
            const moveX = Math.abs(posX - startX); // h
            const deltaX = Number(component.get('prevDeltaX') || moveX); // v
            const parent = component.parent() as Component; // S(uppercase)

            const oneColSize = (parent.getEl() as HTMLElement).offsetWidth / 12; // f
            const deltaByWidthX = Math.trunc(deltaX / oneColSize); 
            const moveByWidthX = Math.trunc(moveX / oneColSize);
            const increasing = // increase
              (handler === 'right' && dragDirection === 'right') ||
              (handler === 'left' && dragDirection === 'left');
            const decreasing = // decreasing
              (handler === 'left' && dragDirection === 'right') ||
              (handler === 'right' && dragDirection === 'left');
            
            console.log(handler, 'handler going to', dragDirection, 
              'deltaByWidthX', deltaByWidthX, 'moveByWidthX', moveByWidthX);
            if ( (increasing || decreasing) && (deltaByWidthX !== moveByWidthX)) {
              const draggingCol: any = component;
              const matchingCol = draggingCol.getMatchingColumn(handler, increasing); // w
              console.log('increasing', increasing, matchingCol?.view.el);
              if (matchingCol) {
                editor.UndoManager.start();
                draggingCol.incColSizeBy(increasing ? 1: -1);
                matchingCol.incColSizeBy(increasing ? -1 : 1);
              }
            }
            editor.UndoManager.stop();
            component.set('prevX', posX);
            component.set('prevDirection', dragDirection);
            component.set('prevDeltaX', moveX);
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
          console.log({klasses})
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
        // when increase, matching col must be bigger than 1 so that I increase and u decrease
        const incresable = increasing && urColSize > 1; 
        // when decrease, my col must be bigger than 1 so that I decrease and u increase
        const decreasable = !increasing && myColSize > 1;
        console.log('getMatchingColumn', {myColSize, urColSize, incresable, decreasable});

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