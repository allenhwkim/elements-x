import { Editor } from 'grapesjs';

export default function(editor: Editor) {
  const components = editor.DomComponents;
  components.addType('grid-column', {
    isComponent: function(t) {
      return t.dataset && t.dataset.gjsType === 'grid-column'
    },

    model: {
      defaults: {
        tagName: 'div',
        name: 'Column',
        attributes: {
          'data-dm-category': 'layout'
        },
        draggable: '[data-gjs-type="grid-row"], [data-gjs-type="wrapper"]',
        droppable: !0,
        resizable: {
          onEnd: function(n) {
            var o: any = editor.getSelected();
            o.set('startX', void 0);
            o.set('prevX', void 0);
            o.set('prevDirection', void 0);
            o.set('prevDeltaX', void 0);
            editor.Canvas.toggleFramesEvents(true);
          },
          updateTarget: function(n, o, a) {
            editor.UndoManager.stop();
            var r = a.resizer,
              i = r.currentPos,
              l = r.handlerAttr,
              s = i.x,
              c: any = editor.getSelected(),
              p = Number(c.get('startX'));
            p || (p = s, c.set('startX', p));
            var d = Number(c.get('prevX'));
            d || (d = s, c.set('prevX', d));
            var m, g = c.get('prevDirection');
            (m = s > d ? 'right' : s < d ? 'left' : g) !== g && (p = d, c.set('startX', p), c.set('prevDeltaX', void 0));
            var u = 'cr' === l ? 'right' : 'left',
              h = Math.abs(s - p),
              v = Number(c.get('prevDeltaX') || h),
              S = c.parent(),
              f = S.getEl().offsetWidth / 12,
              y = Math.trunc(v / f),
              E = Math.trunc(h / f),
              P = 'right' === m && 'right' === u || 'left' === m && 'left' === u;
            if (('right' === m && 'left' === u || 'left' === m && 'right' === u || P) && E !== y) {
              var w = c.getNextColumnForChange(u, P),
                b = S.components().models.reduce((function(t, e) {
                  return t += e.getSpan()
                }), 0);
              if (editor.UndoManager.start(), b < 12 && P || w) {
                var T = c.getNextSpan(P);
                c.setSizeClass(T)
              }
              if (w && 12 === b) {
                var C = w.getNextSpan(!P);
                w.setSizeClass(C)
              }
            }
            editor.UndoManager.stop();
            c.set('prevX', s);
            c.set('prevDirection', m);
            c.set('prevDeltaX', h);
          },
          tl: 0,
          tc: 0,
          tr: 0,
          cr: true,
          br: 0,
          bc: 0,
          bl: 0,
          cl: true 
        },
      },
      setSizeClass: function(t) {
        var e = this.getClasses(),
          n = e.findIndex((function(t) {
            return t.startsWith('col-md-')
          }));
        if (t > 0 && t <= 12) {
          var o = "col-md-".concat(t);
          n > -1 ? e[n] = o : e.push(o), this.setClass(e)
        }
      },
      getSpan: function() {
        var regExp = new RegExp('^col-' + 'md' + '-\\d{1,2}$'),
          e = this.getClasses().filter((function(e) {
            return regExp.test(e)
          }))[0];
        if (e) {
          var n = e.split('-')[2];
          return Number(n)
        }
        return 12
      },
      getNextSpan: function(t) {
        var e = this.getSpan(),
          n = t ? e + 1 : e > 1 ? e - 1 : 1;
        return n > 0 && n <= 12 ? n : e
      },
      getNextColumnForChange: function(t, e) {
        const n = this.index();
        const o = 'right' === t ? n + 1 : n - 1;
        const a = (this.parent() as any).components().models.length;
        if (!(o < 0 || o >= a)) {
          var r: any = this.parent()?.getChildAt(o);
          if (r) {
            const i = this.getSpan();
            const l = r.getSpan();
            return !e && i > 1 || e && l > 1 ? r : e ? r.getNextColumnForChange(t, e) : void 0;
          }
        }
      }
    },
  });

  editor.on('block:drag:stop', (function(component) { // t, n
    const cmpType = component?.get?.('type');
    const cmpParentType = component?.parent?.().get('type');
    if (!cmpType || cmpParentType !== 'wrapper') return;

    if (cmpType !== 'grid-row') {
      component.replaceWith({
        type: 'grid-row',
        components: [{ type: 'grid-column', components: [component] }]
      })
    } else if (cmpType === 'grid-column') {
      component.replaceWith({
        type: 'grid-row',
        components: [component]
      });
    }
  }))

}