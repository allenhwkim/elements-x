// @ts-ignore
const func = (() => (() => {
  "use strict";
  var t = {
    d: (e, n) => {
      for (var o in n) t.o(n, o) && !t.o(e, o) && Object.defineProperty(e, o, {
        enumerable: !0,
        get: n[o]
      })
    },
    o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
  };

  var e = {};
  t.d(e, { default: () => i });

  // var o = function(t, e, n) { // concatenates array (arr1, arr2, condition)
  //     if (n || 2 === arguments.length)
  //       for (var o, a = 0, r = e.length; a < r; a++) !o && a in e || (o || (o = Array.prototype.slice.call(e, 0, a)), o[a] = e[a]);
  //     return t.concat(o || Array.prototype.slice.call(e))
  //   };
  var a = function(editor) {
    var components = editor.DomComponents;
    components.addType('grid-row', {
      isComponent: function(t) {
        return t.dataset && t.dataset.gjsType === 'grid-row'
      },

      model: {
        defaults: {
          name: 'Row',
          draggable: !0,
          droppable: '[data-gjs-type="' + 'grid-column' + '"]',
          attributes: {
            class: 'container'
          }
        },
        init: function() {
          editor.on('component:add', (function(t) {
            var n = t.parent();
            n && n.components().models.length > 12 && t.remove()
          }));

          editor.on('component:create', (function(t) {
            t.setSizeClass
          }));

          // this : child, component?
          this.on('component:update:components', function(t, n, a) {
            var action = a.action; // r
            var index = a.index; // i
            console.log({t,n,a});
            console.log({action, index});

            if (['add-component', 'move-component', 'clone-component'].includes(action)) {
              !function(t, n, ndx) {
                console.log('..........1', action, {t, n, ndx});

                var a = n.models;
                // var rOrg = o(o([], a.slice(n + 1), !0), a.slice(0, n).reverse(), !0);
                var r = [...a.slice(ndx+1), ...a.slice(0,ndx).reverse()];
                var i = !0;
                var l = 0;
                // console.log(r, rOrg);

                for (; i && l < r.length;) {
                  var s = r[l],
                    c = s.getSpan();
                  if (1 !== c) {
                    var p = Math.ceil(c / 2);
                    s.setSizeClass(c - p), t.setSizeClass(p), i = !1
                  }
                  l++
                }
              }(t, n, index);
            }

            if (action === 'remove-component') {
              !function(t, n, ndx) {
                console.log('..........2 remove-component', {t, n, ndx});
                var a = n.length;
                if (a >= 12) return;
                var r = ndx === a ? ndx - 1 : ndx;
                if (ndx >= 0 && a > 0) {
                  var i = n.models[r],
                    l = i.getSpan(),
                    s = t.getSpan();
                  i.setSizeClass(s + l)
                } else {
                  t.parent().append({
                    type: 'grid-column'
                  })
                }
              }(t, n, index);
            }
          });
        }
      },
    });

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
          draggable: '[data-gjs-type="' + 'grid-row' + '"], [data-gjs-type="wrapper"]',
          droppable: !0,
          resizable: {
            onEnd: function(n) {
              var o = editor.getSelected();
              o.set('startX', void 0), o.set('prevX', void 0), o.set('prevDirection', void 0), o.set('prevDeltaX', void 0), t.Canvas.toggleFramesEvents(1)
            },
            updateTarget: function(n, o, a) {
              editor.UndoManager.stop();
              var r = a.resizer,
                i = r.currentPos,
                l = r.handlerAttr,
                s = i.x,
                c = editor.getSelected(),
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
          var n = this.index(),
            o = 'right' === t ? n + 1 : n - 1,
            a = this.parent().components().models.length;
          if (!(o < 0 || o >= a)) {
            var r = this.parent().getChildAt(o);
            if (r) {
              var i = this.getSpan(),
                l = r.getSpan();
              return !e && i > 1 || e && l > 1 ? r : e ? r.getNextColumnForChange(t, e) : void 0
            }
          }
        }
      },
    });
  };

  var i = function(t) {

    //Using the ! operator before the function causes it to be treated as an expression, so we can call it:
    !function(editor, e) {
      editor.addStyle("\n    .container {\n      width: 100%;\n      margin-left: auto;\n      margin-right: auto;\n      overflow: hidden;\n      padding: 5px !important;\n    } \n    [class^=\"col\"]{\n      float: left;\n      min-height: 0.125rem;\n    }\n    \n    .col-md-1 {\n      width: 8.33%;\n    }\n    \n    .col-md-2 {\n      width: 16.66%;\n    }\n    \n    .col-md-3 {\n      width: 24.99%;\n    }\n    \n    .col-md-4 {\n      width: 33.32%;\n    }\n    \n    .col-md-5 {\n      width: 41.65%;\n    }\n    \n    .col-md-6 {\n      width: 49.98%;\n    }\n    \n    .col-md-7 {\n      width: 58.31%;\n    }\n    \n    .col-md-8 {\n      width: 66.64%;\n    }\n    \n    .col-md-9 {\n      width: 74.97%;\n    }\n    \n    .col-md-10 {\n      width: 83.30%;\n    }\n    \n    .col-md-11 {\n      width: 91.63%;\n    }\n    \n    .col-md-12 {\n      width: 99.96%;\n    }\n\n    *[data-gjs-type='" + 'grid-row' + "']:empty {\n      min-height: 100px;\n    }\n\n    *[data-gjs-type='" + 'grid-row' + "']:empty,\n    *[data-gjs-type='" + 'grid-column' + "']:empty {\n      min-height: 100px;\n      position: relative;\n      color: inherit;\n    }\n\n    *[data-gjs-type='" + 'grid-row' + "']:empty:before,\n    *[data-gjs-type='" + 'grid-column' + "']:empty:before {\n      content: '';\n      height: calc(100% - 14px);\n      background-size: 80% clamp(20px, 50%, 50px);\n      background-repeat: no-repeat;\n      border-radius: 4px;\n      background-position: center;\n      z-index: 1;\n      background-color: #EADFFE !important;\n      border: 2px solid #C6A9FD;\n      min-height: 100px;\n      margin: 5px;\n      display: block;\n    }\n\n    *[data-gjs-type^='dm-']:empty:before,\n    *[data-gjs-type^='dm-']:empty:after {\n      color: #838caa !important;\n      /* font-family: Inter, Helvetica, Arial; */\n      display: block;\n    }\n\n    .gjs-hovered[data-gjs-type='" + 'grid-row' + "']:empty:before,\n    .gjs-hovered[data-gjs-type='" + 'grid-column' + "']:empty:before {\n      background-color: #EADFFE !important;\n    }\n\n    *[data-gjs-type='" + 'grid-row' + "']:empty {\n      min-height: 100px;\n    }\n\n    *[data-gjs-type='" + 'grid-column' + "']:empty:before {\n      background-image: url('" + 'column-empty-state.svg' + "');\n    }\n    ")
    }(t),

    function(editor) {
      editor.Blocks;

      editor.BlockManager.add('grid-column', {
        label: 'Column',
        category: 'Grid',
        media: "<svg fill=\"#000000\" viewBox=\"0 0 32 32\" id=\"icon\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><defs><style>.cls-1{fill:none;}</style></defs><title>column</title><rect x=\"24\" y=\"4\" width=\"2\" height=\"24\"></rect><path d=\"M18,6V26H14V6h4m0-2H14a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z\"></path><rect x=\"6\" y=\"4\" width=\"2\" height=\"24\"></rect><rect id=\"_Transparent_Rectangle_\" data-name=\"<Transparent Rectangle>\" class=\"cls-1\" width=\"32\" height=\"32\"></rect></g></svg>",
        content: {
          type: 'grid-column'
        }
      });

      editor.BlockManager.add('column-6-6', {
        label: '2 Columns',
        category: 'Grid',
        media: "\n        <svg viewBox=\"0 0 23 24\">\n        <path fill=\"currentColor\" d=\"M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z\"></path>\n        </svg>\n        ",
        content: {
          type: 'grid-row',
          components: [
            { type: 'grid-column', attributes: { class: 'col-md-6' } }, 
            { type: 'grid-column', attributes: { class: 'col-md-6' }
          }]
        }
      });

      editor.BlockManager.add('column-4-4-4', {
        label: '3 Columns',
        category: 'Grid',
        media: "<svg viewBox=\"0 0 23 24\">\n        <path fill=\"currentColor\" d=\"M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z\"></path>\n      </svg>",
        content: {
          type: 'grid-row',
          components: [
            { type: 'grid-column', attributes: { class: 'col-md-4' } },
            { type: 'grid-column', attributes: { class: 'col-md-4' } },
            { type: 'grid-column', attributes: { class: 'col-md-4' }
          }]
        }
      });
    }(t),
    
    a(t),
    
    function(editor) { // t
      editor.on('block:drag:stop', (function(component, block) { // t, n
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
    }(t)
  };
  return e;
})());

window["grapesjs-plugin-grid"] = func();