// @ts-ignore
! function(t, e) {
  'object' == typeof exports && 'object' == typeof module ? module.exports = e() : 'function' == typeof define && define.amd ? define([], e) : 'object' == typeof exports ? exports["grapesjs-plugin-grid"] = e() : t["grapesjs-plugin-grid"] = e()
}('undefined' != typeof globalThis ? globalThis : 'undefined' != typeof window ? window : this, (() => (() => {
  "use strict";
  var t = {
      d: (e, n) => {
        for (var o in n) t.o(n, o) && !t.o(e, o) && Object.defineProperty(e, o, {
          enumerable: !0,
          get: n[o]
        })
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
      r: t => {
        'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
          value: 'Module'
        }), Object.defineProperty(t, '__esModule', {
          value: !0
        })
      }
    },
    e = {};
  t.r(e), t.d(e, {
    default: () => i
  });
  var n = void 0 && (void 0).__assign || function() {
      return n = Object.assign || function(t) {
        for (var e, n = 1, o = arguments.length; n < o; n++)
          for (var a in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
        return t
      }, n.apply(this, arguments)
    },
    o = void 0 && (void 0).__spreadArray || function(t, e, n) {
      if (n || 2 === arguments.length)
        for (var o, a = 0, r = e.length; a < r; a++) !o && a in e || (o || (o = Array.prototype.slice.call(e, 0, a)), o[a] = e[a]);
      return t.concat(o || Array.prototype.slice.call(e))
    };
  const a = function(t, e) {
    var a = t.DomComponents;
    a.addType(e.TYPES.row, {
      model: {
        defaults: {
          name: 'Row',
          draggable: !0,
          droppable: '[data-gjs-type="' + e.TYPES.column + '"]',
          attributes: {
            class: 'container'
          }
        },
        init: function() {
          t.on('component:add', (function(t) {
            var n = t.parent();
            n && n.components().models.length > e.MAX_COMPONENTS_LENGTH && t.remove()
          })), t.on('component:create', (function(t) {
            t.setSizeClass
          })), this.on('component:update:components', (function(t, n, a) {
            var r = a.action,
              i = a.index;
            r !== e.ACTIONS.addComponent && r !== e.ACTIONS.moveComponent && r !== e.ACTIONS.cloneComponent || function(t, e, n) {
              var a = e.models,
                r = o(o([], a.slice(n + 1), !0), a.slice(0, n).reverse(), !0),
                i = !0,
                l = 0;
              for (; i && l < r.length;) {
                var s = r[l],
                  c = s.getSpan();
                if (1 !== c) {
                  var p = Math.ceil(c / 2);
                  s.setSizeClass(c - p), t.setSizeClass(p), i = !1
                }
                l++
              }
            }(t, n, i), r === e.ACTIONS.removeComponent && function(t, n, o) {
              var a = n.length;
              if (a >= e.MAX_COMPONENTS_LENGTH) return;
              var r = o === a ? o - 1 : o;
              if (o >= 0 && a > 0) {
                var i = n.models[r],
                  l = i.getSpan(),
                  s = t.getSpan();
                i.setSizeClass(s + l)
              } else {
                t.parent().append({
                  type: e.TYPES.column
                })
              }
            }(t, n, i)
          }))
        }
      },
      isComponent: function(t) {
        return t.dataset && t.dataset.gjsType === e.TYPES.row
      }
    }), a.addType(e.TYPES.column, {
      model: {
        defaults: {
          tagName: 'div',
          name: 'Column',
          attributes: {
            'data-dm-category': 'layout'
          },
          resizable: n(n({
            onEnd: function(n) {
              var o = t.getSelected();
              o.set(e.RESIZABLE_PROPS.startX, void 0), o.set(e.RESIZABLE_PROPS.prevX, void 0), o.set(e.RESIZABLE_PROPS.prevDirection, void 0), o.set(e.RESIZABLE_PROPS.prevDeltaX, void 0), t.Canvas.toggleFramesEvents(1)
            },
            updateTarget: function(n, o, a) {
              t.UndoManager.stop();
              var r = a.resizer,
                i = r.currentPos,
                l = r.handlerAttr,
                s = i.x,
                c = t.getSelected(),
                p = Number(c.get(e.RESIZABLE_PROPS.startX));
              p || (p = s, c.set(e.RESIZABLE_PROPS.startX, p));
              var d = Number(c.get(e.RESIZABLE_PROPS.prevX));
              d || (d = s, c.set(e.RESIZABLE_PROPS.prevX, d));
              var m, g = c.get(e.RESIZABLE_PROPS.prevDirection);
              (m = s > d ? 'right' : s < d ? 'left' : g) !== g && (p = d, c.set(e.RESIZABLE_PROPS.startX, p), c.set(e.RESIZABLE_PROPS.prevDeltaX, void 0));
              var u = 'cr' === l ? 'right' : 'left',
                h = Math.abs(s - p),
                v = Number(c.get(e.RESIZABLE_PROPS.prevDeltaX) || h),
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
                if (t.UndoManager.start(), b < 12 && P || w) {
                  var T = c.getNextSpan(P);
                  c.setSizeClass(T)
                }
                if (w && 12 === b) {
                  var C = w.getNextSpan(!P);
                  w.setSizeClass(C)
                }
              }
              t.UndoManager.stop(), c.set(e.RESIZABLE_PROPS.prevX, s), c.set(e.RESIZABLE_PROPS.prevDirection, m), c.set(e.RESIZABLE_PROPS.prevDeltaX, h)
            }
          }, e.resizerNone), {
            cr: !0,
            cl: !0
          }),
          draggable: '[data-gjs-type="' + e.TYPES.row + '"], [data-gjs-type="wrapper"]',
          droppable: !0
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
          var t = new RegExp('^col-' + 'md' + '-\\d{1,2}$'),
            e = this.getClasses().filter((function(e) {
              return t.test(e)
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
      isComponent: function(t) {
        return t.dataset && t.dataset.gjsType === e.TYPES.column
      }
    })
  };
  var r = void 0 && (void 0).__assign || function() {
    return r = Object.assign || function(t) {
      for (var e, n = 1, o = arguments.length; n < o; n++)
        for (var a in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
      return t
    }, r.apply(this, arguments)
  };
  const i = function(t, e) {
    var n = r({
      TYPES: {
        column: 'grid-column',
        row: 'grid-row'
      },
      MAX_COMPONENTS_LENGTH: 12,
      ACTIONS: {
        addComponent: 'add-component',
        removeComponent: 'remove-component',
        cloneComponent: 'clone-component',
        moveComponent: 'move-component'
      },
      resizerNone: {
        tl: 0,
        tc: 0,
        tr: 0,
        cr: 0,
        br: 0,
        bc: 0,
        bl: 0,
        cl: 0
      },
      mainComponent: 'wrapper',
      RESIZABLE_PROPS: {
        startX: 'startX',
        prevX: 'prevX',
        prevDirection: 'prevDirection',
        prevDeltaX: 'prevDeltaX'
      },
      imgDefault: 'column-empty-state.svg'
    }, e);
    ! function(t, e) {
      t.addStyle("\n    .container {\n      width: 100%;\n      margin-left: auto;\n      margin-right: auto;\n      overflow: hidden;\n      padding: 5px !important;\n    } \n    [class^=\"col\"]{\n      float: left;\n      min-height: 0.125rem;\n    }\n    \n    .col-md-1 {\n      width: 8.33%;\n    }\n    \n    .col-md-2 {\n      width: 16.66%;\n    }\n    \n    .col-md-3 {\n      width: 24.99%;\n    }\n    \n    .col-md-4 {\n      width: 33.32%;\n    }\n    \n    .col-md-5 {\n      width: 41.65%;\n    }\n    \n    .col-md-6 {\n      width: 49.98%;\n    }\n    \n    .col-md-7 {\n      width: 58.31%;\n    }\n    \n    .col-md-8 {\n      width: 66.64%;\n    }\n    \n    .col-md-9 {\n      width: 74.97%;\n    }\n    \n    .col-md-10 {\n      width: 83.30%;\n    }\n    \n    .col-md-11 {\n      width: 91.63%;\n    }\n    \n    .col-md-12 {\n      width: 99.96%;\n    }\n\n    *[data-gjs-type='" + e.TYPES.row + "']:empty {\n      min-height: 100px;\n    }\n\n    *[data-gjs-type='" + e.TYPES.row + "']:empty,\n    *[data-gjs-type='" + e.TYPES.column + "']:empty {\n      min-height: 100px;\n      position: relative;\n      color: inherit;\n    }\n\n    *[data-gjs-type='" + e.TYPES.row + "']:empty:before,\n    *[data-gjs-type='" + e.TYPES.column + "']:empty:before {\n      content: '';\n      height: calc(100% - 14px);\n      background-size: 80% clamp(20px, 50%, 50px);\n      background-repeat: no-repeat;\n      border-radius: 4px;\n      background-position: center;\n      z-index: 1;\n      background-color: #EADFFE !important;\n      border: 2px solid #C6A9FD;\n      min-height: 100px;\n      margin: 5px;\n      display: block;\n    }\n\n    *[data-gjs-type^='dm-']:empty:before,\n    *[data-gjs-type^='dm-']:empty:after {\n      color: #838caa !important;\n      /* font-family: Inter, Helvetica, Arial; */\n      display: block;\n    }\n\n    .gjs-hovered[data-gjs-type='" + e.TYPES.row + "']:empty:before,\n    .gjs-hovered[data-gjs-type='" + e.TYPES.column + "']:empty:before {\n      background-color: #EADFFE !important;\n    }\n\n    *[data-gjs-type='" + e.TYPES.row + "']:empty {\n      min-height: 100px;\n    }\n\n    *[data-gjs-type='" + e.TYPES.column + "']:empty:before {\n      background-image: url('" + e.imgDefault + "');\n    }\n    ")
    }(t, n),
    function(t, e) {
      t.Blocks, t.BlockManager.add(e.TYPES.column, {
        label: 'Column',
        category: 'Grid',
        media: "<svg fill=\"#000000\" viewBox=\"0 0 32 32\" id=\"icon\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><defs><style>.cls-1{fill:none;}</style></defs><title>column</title><rect x=\"24\" y=\"4\" width=\"2\" height=\"24\"></rect><path d=\"M18,6V26H14V6h4m0-2H14a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z\"></path><rect x=\"6\" y=\"4\" width=\"2\" height=\"24\"></rect><rect id=\"_Transparent_Rectangle_\" data-name=\"<Transparent Rectangle>\" class=\"cls-1\" width=\"32\" height=\"32\"></rect></g></svg>",
        content: {
          type: e.TYPES.column
        }
      }), t.BlockManager.add('column-6-6', {
        label: '2 Columns',
        category: 'Grid',
        media: "\n        <svg viewBox=\"0 0 23 24\">\n        <path fill=\"currentColor\" d=\"M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z\"></path>\n        </svg>\n        ",
        content: {
          type: e.TYPES.row,
          components: [{
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-6'
            }
          }, {
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-6'
            }
          }]
        }
      }), t.BlockManager.add('column-4-4-4', {
        label: '3 Columns',
        category: 'Grid',
        media: "<svg viewBox=\"0 0 23 24\">\n        <path fill=\"currentColor\" d=\"M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z\"></path>\n      </svg>",
        content: {
          type: e.TYPES.row,
          components: [{
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-4'
            }
          }, {
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-4'
            }
          }, {
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-4'
            }
          }]
        }
      }), t.BlockManager.add('column-4-8', {
        label: '2 Columns 4/8',
        category: 'Grid',
        media: "\n        <svg viewBox=\"0 0 24 24\">\n        <path fill=\"currentColor\" d=\"M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z\"></path>\n        </svg>\n        ",
        content: {
          type: e.TYPES.row,
          components: [{
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-4'
            }
          }, {
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-8'
            }
          }]
        }
      }), t.BlockManager.add('column-3-3-3-3', {
        label: '4 Columns 3/3/3/3',
        category: 'Grid',
        media: "<svg fill=\"#000000\" version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 35 35\" xml:space=\"preserve\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <g> <g> <rect width=\"6.119\" height=\"35\"></rect> <rect x=\"9.615\" width=\"6.133\" height=\"35\"></rect> <rect x=\"19.245\" width=\"6.116\" height=\"35\"></rect> <rect x=\"28.873\" width=\"6.127\" height=\"35\"></rect> </g> </g> </g></svg>",
        content: {
          type: e.TYPES.row,
          components: [{
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-3'
            }
          }, {
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-3'
            }
          }, {
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-3'
            }
          }, {
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-3'
            }
          }]
        }
      }), t.BlockManager.add('column-8-4', {
        label: '2 Columns 8/4',
        category: 'Grid',
        media: "\n        <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" transform=\"matrix(-1,0,0,1,0,0)\">\n        <path fill=\"currentColor\" d=\"M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z\"></path>\n        </svg>\n        ",
        content: {
          type: e.TYPES.row,
          components: [{
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-8'
            }
          }, {
            type: e.TYPES.column,
            attributes: {
              class: 'col-md-4'
            }
          }]
        }
      })
    }(t, n), a(t, n),
      function(t, e) {
        t.on('block:drag:stop', (function(t, n) {
          if (t) {
            var o = t.parent();
            o && ((null == t ? void 0 : t.get('type')) != e.TYPES.row && (null == o ? void 0 : o.get('type')) == e.mainComponent && t.replaceWith({
              type: e.TYPES.row,
              components: [{
                type: e.TYPES.column,
                components: [t]
              }]
            }), (null == t ? void 0 : t.get('type')) == e.TYPES.column && (null == o ? void 0 : o.get('type')) == e.mainComponent && t.replaceWith({
              type: e.TYPES.row,
              components: [t]
            }))
          }
        }))
      }(t, n)
  };
  return e
})()));