!function (_0x12d772, _0x29d7a3) {
  if ("object" == typeof exports && "object" == typeof module) {
    module.exports = _0x29d7a3();
  } else if ("function" == typeof define && define.amd) {
    define([], _0x29d7a3);
  } else if ("object" == typeof exports) {
    exports["grapesjs-plugin-margin-padding"] = _0x29d7a3();
  } else {
    _0x12d772["grapesjs-plugin-margin-padding"] = _0x29d7a3();
  }
}("undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : this, () => (() => {
  'use strict';

  var _0xf8e2dd = {
    'd': (_0x4883de, _0x23f120) => {
      for (var _0x1e20f3 in _0x23f120) if (Object.prototype.hasOwnProperty.call(_0x23f120, _0x1e20f3) && !Object.prototype.hasOwnProperty.call(_0x4883de, _0x1e20f3)) {
        Object.defineProperty(_0x4883de, _0x1e20f3, {
          'enumerable': true,
          'get': _0x23f120[_0x1e20f3]
        });
      }
    },
    'o': (_0x5ae954, _0x466e31) => Object.prototype.hasOwnProperty.call(_0x5ae954, _0x466e31),
    'r': _0x457317 => {
      if ("undefined" != typeof Symbol && Symbol.toStringTag) {
        Object.defineProperty(_0x457317, Symbol.toStringTag, {
          'value': "Module"
        });
      }
      Object.defineProperty(_0x457317, "__esModule", {
        'value': true
      });
    }
  };
  var _0x17c8d0 = {};
  _0xf8e2dd.r(_0x17c8d0);
  _0xf8e2dd.d(_0x17c8d0, {
    'default': () => _0x459386
  });
  function setStyle(editor) {
    editor.on("load", function () {
      if (document.body) {
        const css = 
          ".paddingMarker{background-color:#0659db;position: absolute;border-radius: 110px;pointer-events: all;opacity: 0.5;}\n" +
          ".paddingMarker:hover{opacity: 1;}\n" +
          ".paddingMarker.top{width: 25px;height: 6px;left: 50%;top: 10px;cursor: ns-resize;}\n" +
          ".paddingMarker.bottom{width: 25px;height: 6px;left: 50%;bottom: 10px;cursor: ns-resize;}\n" +
          ".paddingMarker.left{width: 6px;height: 25px;left: 10px;bottom: 45%;cursor: ew-resize;}\n" +
          ".paddingMarker.right{width: 6px;height: 25px;right: 10px;bottom: 45%;cursor: ew-resize;}\n" +
          ".marginMarker {background-color:#f01d1d;position: absolute;border-radius: 110px;pointer-events: all;opacity: 0.5;}\n" +
          ".marginMarker:hover{opacity: 1;}\n" +
          ".marginMarker.top{width: 25px;height: 6px;left: 50%;top: -10px;cursor: ns-resize;}\n" +
          ".marginMarker.bottom{width: 25px;height: 6px;left: 50%;bottom: -10px;cursor: ns-resize;}\n" +
          ".marginMarker.left{width: 6px;height: 25px;left: -10px;bottom: 45%;cursor: ew-resize;}\n" +
          ".marginMarker.right{width: 6px;height: 25px;right: -10px;bottom: 45%;cursor: ew-resize;}\n"+
          '.padding_effect {position: absolute; width: 100%; height:100%; top: 0; left: 0; border: 1px rgba(153, 165, 187, 0.44) solid;}\n' +
          '.margin_effect {position :absolute; width: 100%; height: 100%; box-sizing: content-box; border: rgba(230, 125, 73, 0.6) solid;}\n' + 
          ''
        document.body.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
      }
    });
  };

  const _0x459386 = function (editor, options) {
    setStyle(editor);
    (function (editor, options) {
      editor.on("component:selected", function (component, options) {
        // if (options.includes(component.get("type"))) {
        console.log('component type', component.get("type"));
        if (['row', 'cell', 'div', ''].includes(component.get("type"))) {
var toolEl = document.createElement("div");
          toolEl.classList.add("gjs-options");
          const gjsToolsEl = document.getElementById("gjs-tools");
          toolEl.innerHTML = "<div class=\"marginMarker top\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Margin Top\"></div> <div class=\"marginMarker bottom\" data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" title=\"Margin Bottom\"></div> <div class=\"marginMarker left\" data-bs-toggle=\"tooltip\" data-bs-placement=\"left\" title=\"Margin Left\"></div> <div class=\"marginMarker right\" data-bs-toggle=\"tooltip\" data-bs-placement=\"right\" title=\"Margin Right\"></div>";
          toolEl.innerHTML += "<div class=\"paddingMarker top\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Padding Top\"></div> <div class=\"paddingMarker bottom\" data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" title=\"Padding Bottom\"></div> <div class=\"paddingMarker left\" data-bs-toggle=\"tooltip\" data-bs-placement=\"left\" title=\"Padding Left\"></div> <div class=\"paddingMarker right\" data-bs-toggle=\"tooltip\" data-bs-placement=\"right\" title=\"Padding Right\"></div>";
          gjsToolsEl?.appendChild(toolEl);
          
          var marginTopDragger = toolEl.querySelector(".marginMarker.top");
          var marginBottomDragger = toolEl.querySelector(".marginMarker.bottom");
          var marginLeftDragger = toolEl.querySelector(".marginMarker.left");
          var marginRightDragger = toolEl.querySelector(".marginMarker.right");
          var padTopDragger = toolEl.querySelector(".paddingMarker.top");
          var padBottomDragger = toolEl.querySelector(".paddingMarker.bottom");
          var padLeftDragger = toolEl.querySelector(".paddingMarker.left");
          var padRightDragger = toolEl.querySelector(".paddingMarker.right");

          var compStyle = window.getComputedStyle(component.getEl());
          var marginTop =  Math.max(parseInt(compStyle.marginTop, 10), 0);
          var marginRight = Math.max(parseInt(compStyle.marginRight, 10), 0);
          var marginBottom = Math.max(parseInt(compStyle.marginBottom, 10), 0);
          var marginLeft = Math.max(parseInt(compStyle.marginLeft, 10), 0);
          var paddingTop = Math.max(parseInt(compStyle.paddingTop, 10), 0);
          var paddingRight = Math.max(parseInt(compStyle.paddingRight, 10), 0);
          var paddingBottom = Math.max(parseInt(compStyle.paddingBottom, 10), 0);
          var paddingLeft = Math.max(parseInt(compStyle.paddingLeft, 10), 0);

          var staClientY;
          var staClientX;
          var cssPropValue;
          var cssPropName;
          var diff;

var padEffect = document.createElement("div");
          Object.assign(padEffect.style, {
            borderWidth : paddingTop + "px " + paddingRight + "px " + paddingBottom + "px " + paddingLeft + 'px',
          });
          padEffect.classList.add('padding_effect');
          toolEl.appendChild(padEffect);

var marginEffect =document.createElement("div");
          marginEffect.classList.add('margin_effect');
          Object.assign(marginEffect.style, {
            top: '-' + marginTop + 'px', left: '-' + marginLeft + 'px',
            borderWidth: marginTop + "px " + marginRight + "px " + marginBottom + "px " + marginLeft + 'px',
          });
          toolEl.appendChild(marginEffect);
          
          padTopDragger.addEventListener("click", function (event) {
            toolEl.appendChild(padEffect);
            staClientY = event.clientY;
            cssPropName = "padding-top";
          });
          padRightDragger.addEventListener("click", function (event) {
            toolEl.appendChild(padEffect);
            staClientY = event.clientY;
            cssPropName = "padding-right";
          });
          padBottomDragger.addEventListener("click", function (event) {
            toolEl.appendChild(padEffect);
            staClientY = event.clientY;
            cssPropName = "padding-bottom";
          });
          padLeftDragger.addEventListener("click", function (event) {
            toolEl.appendChild(padEffect);
            staClientY = event.clientY;
            cssPropName = "padding-left";
          });

          marginTopDragger.addEventListener("click", function (event) {
            toolEl.appendChild(marginEffect);
            staClientY = event.clientY;
            cssPropName = "margin-top";
          });
          marginRightDragger.addEventListener("click", function (event) {
            toolEl.appendChild(marginEffect);
            staClientY = event.clientY;
            cssPropName = "margin-right";
          });
          marginBottomDragger.addEventListener("click", function (event) {
            toolEl.appendChild(marginEffect);
            staClientY = event.clientY;
            cssPropName = "margin-bottom";
          });
          marginLeftDragger.addEventListener("click", function (event) {
            toolEl.appendChild(marginEffect);
            staClientY = event.clientY;
            cssPropName = "margin-left";
          });

          marginTopDragger.addEventListener("mousedown", function (event) {
            editor.Canvas.toggleFramesEvents(0);
            staClientY = event.clientY;
            cssPropName = "margin-top";
            cssPropValue = parseInt(window.getComputedStyle(component.getEl()).marginTop, 10);
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          });
          marginBottomDragger.addEventListener("mousedown", function (event) {
            editor.Canvas.toggleFramesEvents(0);
            staClientY = event.clientY;
            cssPropName = "margin-bottom";
            cssPropValue = parseInt(window.getComputedStyle(component.getEl()).marginBottom, 10);
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          });
          marginRightDragger.addEventListener("mousedown", function (event) {
            editor.Canvas.toggleFramesEvents(0);
            staClientX = event.clientX;
            cssPropName = "margin-right";
            cssPropValue = parseInt(window.getComputedStyle(component.getEl()).marginRight, 10);
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          });
          marginLeftDragger.addEventListener("mousedown", function (event) {
            editor.Canvas.toggleFramesEvents(0);
            staClientX = event.clientX;
            cssPropName = "margin-left";
            cssPropValue = parseInt(window.getComputedStyle(component.getEl()).marginLeft, 10);
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          });

          padTopDragger.addEventListener("mousedown", function (event) {
            editor.Canvas.toggleFramesEvents(0);
            staClientY = event.clientY;
            cssPropName = "padding-top";
            cssPropValue = parseInt(window.getComputedStyle(component.getEl()).paddingTop, 10);
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          });
          padBottomDragger.addEventListener("mousedown", function (event) {
            editor.Canvas.toggleFramesEvents(0);
            staClientY = event.clientY;
            cssPropName = "padding-bottom";
            cssPropValue = parseInt(window.getComputedStyle(component.getEl()).paddingBottom, 10);
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          });
          padRightDragger.addEventListener("mousedown", function (event) {
            editor.Canvas.toggleFramesEvents(0);
            staClientX = event.clientX;
            cssPropName = "padding-right";
            cssPropValue = parseInt(window.getComputedStyle(component.getEl()).paddingRight, 10);
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          });
          padLeftDragger.addEventListener("mousedown", function (event) {
            editor.Canvas.toggleFramesEvents(0);
            staClientX = event.clientX;
            cssPropName = "padding-left";
            cssPropValue = parseInt(window.getComputedStyle(component.getEl()).paddingLeft, 10);
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          });
        }
        
        function mouseMoveHandler(event) {
          var newCssPropValue;
          editor.Canvas.toggleFramesEvents(0);
          document.querySelector(".padding_effect")?.remove();
          document.querySelector(".margin_effect")?.remove();

          event.preventDefault();
          event.stopPropagation();

          const mTop = Math.max(parseInt(compStyle.marginTop, 10), 0);
          const mRight = Math.max(parseInt(compStyle.marginRight, 10), 0);
          const mBottom = Math.max(parseInt(compStyle.marginBottom, 10), 0);
          const mLeft = Math.max(parseInt(compStyle.marginLeft, 10), 0);

          const pTop = Math.max(parseInt(compStyle.paddingTop, 10), 0);
          const pRight = Math.max(parseInt(compStyle.paddingRight, 10), 0);
          const pBottom = Math.max(parseInt(compStyle.paddingBottom, 10), 0);
          const pLeft = Math.max(parseInt(compStyle.paddingLeft, 10), 0);

          if ("margin-top" == cssPropName) {
            newCssPropValue = cssPropValue + (event.clientY - staClientY);
            marginEffect.style.top = '-' + newCssPropValue + 'px';
            marginEffect.style.left = '-' + _0x144771 + 'px';
            marginEffect.style.borderWidth = newCssPropValue + "px " + mRight + "px " + mBottom + "px " + mLeft + 'px';
          }
          if ("margin-right" == cssPropName) {
            newCssPropValue = cssPropValue + (event.clientX - staClientX);
            marginEffect.style.borderWidth = mTop + "px " + newCssPropValue + "px " + mBottom + "px " + mLeft + 'px';
          }
          if ("margin-bottom" == cssPropName) {
            newCssPropValue = cssPropValue + (event.clientY - staClientY);
            marginEffect.style.borderWidth = mTop + "px " + mRight + "px " + newCssPropValue + "px " + mLeft + 'px';
          }
          if ("margin-left" == cssPropName) {
            newCssPropValue = cssPropValue + (event.clientX - staClientX);
            marginEffect.style.top = '-' + mTop + 'px';
            marginEffect.style.left = '-' + newCssPropValue + 'px';
            marginEffect.style.borderWidth = mTop + "px " + mRight + "px " + mBottom + "px " + newCssPropValue + 'px';
          }

          if ("padding-top" == cssPropName) {
            newCssPropValue = cssPropValue + (event.clientY - staClientY);
            padEffect.style.borderWidth = newCssPropValue + "px " + pRight + "px " + pBottom + "px " + pLeft + 'px';
          }
          if ("padding-right" == cssPropName) {
            newCssPropValue = cssPropValue + Math.abs(event.clientX - staClientX);
            padEffect.style.borderWidth = pTop + "px " + newCssPropValue + "px " + pBottom + "px " + pLeft + 'px';
          }
          if ("padding-bottom" == cssPropName) {
            newCssPropValue = cssPropValue + (event.clientY - staClientY);
            padEffect.style.borderWidth = pTop + "px " + pRight + "px " + newCssPropValue + "px " + pLeft + 'px';
          }
          if ("padding-left" == cssPropName) {
            newCssPropValue = cssPropValue + (event.clientX - staClientX);
            padEffect.style.borderWidth = pTop + "px " + pRight + "px " + pBottom + "px " + newCssPropValue + 'px';
          }

          if (newCssPropValue >= 0) {
            const cssProp = {[cssPropName]: `${newCssPropValue}px !important`};
            component.addStyle(cssProp); // e.g. {'padding-bottom': '121px !important'}
            cssPropName.includes("margin") && toolEl.appendChild(marginEffect);
            cssPropName.includes("padding") && toolEl.appendChild(padEffect);
            editor.refresh();
            editor.trigger("component:toggled");
          }
        }

        function mouseUpHandler() {
          editor.Canvas.toggleFramesEvents(1);
          document.querySelector(".padding_effect")?.remove();
          document.querySelector(".margin_effect")?.remove();
          document.removeEventListener("mousemove", mouseMoveHandler);
          document.removeEventListener("mouseup", mouseUpHandler);
        }
      });
    })(editor, options);

    (function (editor) {
      //component is deselected or when the core component style clear action runs.
      editor.on("component:deselected run:core:component-style-clear", function () {
        document.querySelector(".gjs-options")?.remove();
        document.querySelector(".padding_effect")?.remove();
        document.querySelector(".margin_effect")?.remove();
        editor.Canvas.toggleFramesEvents(1);
      });
    })(editor);
  };
  return _0x17c8d0;
})());