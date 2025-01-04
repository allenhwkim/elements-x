import { CallbackOptions, Component, Editor, Position, ResizerOptions } from 'grapesjs';

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
        attributes: {
          'data-dm-category': 'layout'
        },
        draggable: function(_this, dragTo: Component) { // draggable to
          return ['wrapper', 'grid-row'].includes(dragTo.get('type')||'');
        },
        droppable: true, // Indicates if it's possible to drop other components inside.
        resizable: {
          onEnd: function() {
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
            const selected = editor.getSelected() as Component; // c
            // let startX = Number(selected.get('startX')); // p
            // startX || (startX = posX, selected.set('startX', startX));
            let startX = Number(selected.get('startX')); // p
            if (!startX) {
              startX = posX;
              selected.set('startX', startX);
            }

            // var prevX = Number(selected.get('prevX')); // d
            // prevX || (prevX = posX, selected.set('prevX', prevX));
            let prevX = Number(selected.get('prevX')) || posX ; // d
            if (!prevX) {
              prevX = posX;
              selected.set('prevX', prevX);
            }

            // (m = s > d ?  'right' : s < d ? 'left' : prevDirection) !== prevDirection && 
            // (p = d, c.set('startX', p), c.set('prevDeltaX', void 0));
            const prevDirection = selected.get('prevDirection'); // g
            const newDirection = posX > prevX ? 'right' :  // m
              posX < prevX ? 'left' : prevDirection;

            console.log({prevDirection, newDirection});
            if (prevDirection !== newDirection) {
              startX = prevX;
              selected.set('startX', startX);
              selected.set('prevDeltaX', undefined);
            }

            const leftOrRight = 'cr' === handleAttr ? 'right' : 'left'; // u
            const moveX = Math.abs(posX - startX); // h
            const deltaX = Number(selected.get('prevDeltaX') || moveX); // v
            const parent = selected.parent() as Component; // S(uppercase)
            const offsetWidth = (parent.getEl() as HTMLElement).offsetWidth / 12; // f
            const moveByWidthX = Math.trunc(deltaX / offsetWidth); // y
            const deltaByWidthX = Math.trunc(moveX / offsetWidth); // E(uppercase)
            const sameDirection = 
              ('right' === newDirection && 'right' === leftOrRight) ||
              ('left' === newDirection && 'left' === leftOrRight); // P(uppercase)

            console.log({sameDirection, deltaByWidthX, moveByWidthX})
            if (
              (
                ('right' === newDirection && 'left' === leftOrRight) ||
                ('left' === newDirection && 'right' === leftOrRight) || 
                sameDirection
              ) && (deltaByWidthX !== moveByWidthX)
            ) {
              const nextCol = (selected as any).getNextColumnForChange(leftOrRight, sameDirection); // w
              const totalSpan = parent.components().models.reduce((function(total, e: any) { // b
                  return total += e.getSpan()
                }), 0);
              if (editor.UndoManager.start(), (totalSpan < 12 && sameDirection) || nextCol) {
                const nextSpan = (selected as any).getNextSpan(sameDirection); // T(uppercase)
                (selected as any).setSizeClass(nextSpan)
              }
              if (nextCol && 12 === totalSpan) {
                const nextSpan2 = nextCol.getNextSpan(!sameDirection); // C
                nextCol.setSizeClass(nextSpan2)
              }
            }
            editor.UndoManager.stop();
            selected.set('prevX', posX);
            selected.set('prevDirection', newDirection);
            selected.set('prevDeltaX', moveX);
          },
          tl: 0, // top-left
          tc: 0, // top-center
          tr: 0, // top-right
          cl: true, // center-left
          cr: true, // center-right
          br: 0, // bottom-right
          bc: 0, // bottom-center
          bl: 0, // bottom-left
        },
      },

      setSizeClass: function(colSize: number) { // t
        const klasses = (this as Component).getClasses(); // e
        const colMdNdx = klasses.findIndex((function(klass) { // n
            return klass.startsWith('col-md-')
          }));
        if (colSize > 0 && colSize <= 12) {
          const newColMdKlass = `col-md-${colSize}`; // o
          colMdNdx > -1 ? klasses[colMdNdx] = newColMdKlass : klasses.push(newColMdKlass); 
          this.setClass(klasses);
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

      getNextSpan: function(plus1: boolean): number{ // t
        const curSpan = this.getSpan(); // e
        const nextSpan = 
          plus1 ? curSpan + 1 : 
          curSpan > 1 ? curSpan - 1 : 
          1; // n
        const nextSpanValid = nextSpan > 0 && nextSpan <= 12;
        return nextSpanValid ? nextSpan : curSpan;
      },

      getNextColumnForChange: function(
        nextDirection: string,  // t
        sameDirection: boolean // e
      ): Component | undefined {
        const thisNdx = this.index(); // n
        const nextNdx = 'right' === nextDirection ? thisNdx + 1 : thisNdx - 1; // o
        const lenSibling = (this.parent() as any).components().models.length; // a
        const nxtNdxValid = !(nextNdx < 0 || nextNdx >= lenSibling);

        console.log('getNextColumnForChange', {nxtNdxValid, lenSibling});
        if (nxtNdxValid) {
          const nextComp: any = this.parent()?.getChildAt(nextNdx) as Component; // r
          if (nextComp) {
            const thisCol: number = this.getSpan(); // i
            const nextCol: number = (nextComp as any).getSpan(); // l
            const cond1 = !sameDirection && thisCol > 1 || sameDirection && nextCol > 1;
            console.log('getNextColumnForChange', {thisCol, nextCol, cond1});

            return cond1 ? nextComp : 
              sameDirection ? nextComp.getNextColumnForChange(nextDirection, sameDirection) : 
              undefined;
          }
        }
      }
    },
  });

  // a block is dropped into a parent. e.g. grid-column dropped to a wrapper
  editor.on('block:drag:stop', function(component) { // t, n
    const cmpType = component?.get?.('type');
    const parentType = component?.parent?.().get('type');

    // a grid-column dropped to a wrapper without grid-row, needs to wrap with a grid-row
    if ( cmpType === 'grid-column' && parentType === 'wrapper') {
      console.log('block:drag:stop', {cmpType, parentType, component});
      component.replaceWith({ type: 'grid-row', components: [component] });
    }
  });

}