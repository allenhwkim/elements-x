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
  const _0x42da4d = function (_0x5cf397, _0x2345c7) {
    // if (location.host != "devfuture.pro") {
    //   throw Error("Something wrong!");
    // }
    _0x5cf397.on("load", function () {
      var _0x2cf404;
      var _0x3dc9ff;
      var _0xb16818;
      _0x2cf404 = document.body;
      _0x3dc9ff = {
        'innerHTML': "\n    .paddingMarker{\n        background-color: #0659db;\n        position: absolute;\n        border-radius: 110px;\n        pointer-events: all;\n        opacity: 0.5;\n    }\n\n    .paddingMarker:hover{\n        opacity: 1;\n    }\n\n    .paddingMarker.top{\n        width: 25px;\n        height: 6px;\n        left: 50%;\n        top: 10px;\n        cursor: ns-resize;\n    }\n\n    .paddingMarker.bottom{\n        width: 25px;\n        height: 6px;\n        left: 50%;\n        bottom: 10px;\n        cursor: ns-resize;\n    }\n\n    .paddingMarker.left{\n        width: 6px;\n        height: 25px;\n        left: 10px;\n        bottom: 45%;\n        cursor: ew-resize;\n    }\n\n    .paddingMarker.right{\n        width: 6px;\n        height: 25px;\n        right: 10px;\n        bottom: 45%;\n        cursor: ew-resize;\n    }\n\n    .marginMarker{\n        background-color: #f01d1d;\n        position: absolute;\n        border-radius: 110px;\n        pointer-events: all;\n        opacity: 0.5;\n    }\n\n    .marginMarker:hover{\n        opacity: 1;\n    }\n\n    .marginMarker.top{\n        width: 25px;\n        height: 6px;\n        left: 50%;\n        top: -10px;\n        cursor: ns-resize;\n    }\n\n    .marginMarker.bottom{\n        width: 25px;\n        height: 6px;\n        left: 50%;\n        bottom: -10px;\n        cursor: ns-resize;\n    }\n\n    .marginMarker.left{\n        width: 6px;\n        height: 25px;\n        left: -10px;\n        bottom: 45%;\n        cursor: ew-resize;\n    }\n\n    .marginMarker.right{\n        width: 6px;\n        height: 25px;\n        right: -10px;\n        bottom: 45%;\n        cursor: ew-resize;\n    }\n\n    \n    .InfoBlock{\n        border-radius: 50%;\n        width: 46px;\n        height: 46px;\n        background: #090909b5;\n        border: 1px solid #000;\n        color: #fff;\n        text-align: center;\n        font-size: 16px;\n        line-height: 46px;\n        z-index:1;\n    }\n    \n    .InfoBlock.top{\n        position: absolute;\n        left: 56%;\n        top: -20px;\n    }\n    \n    .InfoBlock.bottom{\n        position: absolute;\n        left: 56%;\n        bottom: -20px;\n    }\n    \n    .InfoBlock.left{\n        position: absolute;\n        left: 0px;\n        top: -20px;\n    }\n    \n    .InfoBlock.right{\n        position: absolute;\n        right: 0px;\n        bottom: -20px;\n    }\n    "
      };
      _0x31b17b(_0xb16818 = document.createElement("style"), _0x3dc9ff);
      if (_0x2cf404) {
        _0x2cf404.appendChild(_0xb16818);
      }
    });
  };
  function _0x31b17b(_0x58bea4, _0x4df2ea) {
    if (_0x4df2ea) {
      for (var _0x168671 in _0x4df2ea) if ("object" == typeof _0x4df2ea[_0x168671]) {
        _0x31b17b(_0x58bea4[_0x168671], _0x4df2ea[_0x168671]);
      } else {
        _0x58bea4[_0x168671] = _0x4df2ea[_0x168671];
      }
    }
  }
  const _0x459386 = function (_0x5080ec, _0x48d7a0) {
    if (!_0x48d7a0) {
      _0x48d7a0 = ["row", "cell", "div"];
    }
    _0x42da4d(_0x5080ec);
    (function (_0x582c20, _0x17ba9f) {
      _0x582c20.on("component:selected", function (_0x13aa28) {
        // if (_0x17ba9f.includes(_0x13aa28.get("type"))) {
        console.log('component type', _0x13aa28.get("type"));
        if (['row', 'cell', ''].includes(_0x13aa28.get("type"))) {
          var _0x1a2a38;
          var _0x5e5c84 = document.getElementById("gjs-tools");
          (_0x1a2a38 = document.createElement("div")).classList.add("gjs-options");
          _0x1a2a38.innerHTML = "<div class=\"marginMarker top\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Margin Top\"></div> <div class=\"marginMarker bottom\" data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" title=\"Margin Bottom\"></div> <div class=\"marginMarker left\" data-bs-toggle=\"tooltip\" data-bs-placement=\"left\" title=\"Margin Left\"></div> <div class=\"marginMarker right\" data-bs-toggle=\"tooltip\" data-bs-placement=\"right\" title=\"Margin Right\"></div>";
          _0x1a2a38.innerHTML += "<div class=\"paddingMarker top\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Padding Top\"></div> <div class=\"paddingMarker bottom\" data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" title=\"Padding Bottom\"></div> <div class=\"paddingMarker left\" data-bs-toggle=\"tooltip\" data-bs-placement=\"left\" title=\"Padding Left\"></div> <div class=\"paddingMarker right\" data-bs-toggle=\"tooltip\" data-bs-placement=\"right\" title=\"Padding Right\"></div>";
          if (!(null == _0x5e5c84)) {
            _0x5e5c84.appendChild(_0x1a2a38);
          }
          var _0x202d13 = _0x1a2a38.querySelector(".marginMarker.top");
          var _0x27adfe = _0x1a2a38.querySelector(".marginMarker.bottom");
          var _0x21d4fc = _0x1a2a38.querySelector(".marginMarker.left");
          var _0x34c0bf = _0x1a2a38.querySelector(".marginMarker.right");
          var _0x1065ab = _0x1a2a38.querySelector(".paddingMarker.top");
          var _0x14fa6e = _0x1a2a38.querySelector(".paddingMarker.bottom");
          var _0xa4936c = _0x1a2a38.querySelector(".paddingMarker.left");
          var _0x4fe90a = _0x1a2a38.querySelector(".paddingMarker.right");
          var _0x1d9211 = _0x13aa28.getEl();
          var _0x46fb8a = window.getComputedStyle(_0x1d9211);
          var _0xa3c63 = parseInt(_0x46fb8a.marginTop, 10);
          if (_0xa3c63 <= 0) {
            _0xa3c63 = 0;
          }
          var _0x4ee204 = parseInt(_0x46fb8a.marginRight, 10);
          if (_0x4ee204 <= 0) {
            _0x4ee204 = 0;
          }
          var _0x4705b3 = parseInt(_0x46fb8a.marginBottom, 10);
          if (_0x4705b3 <= 0) {
            _0x4705b3 = 0;
          }
          var _0x229d5c = parseInt(_0x46fb8a.marginLeft, 10);
          if (_0x229d5c <= 0) {
            _0x229d5c = 0;
          }
          var _0x3742ce = parseInt(_0x46fb8a.paddingTop, 10);
          if (_0x3742ce <= 0) {
            _0x3742ce = 0;
          }
          var _0x18163a = parseInt(_0x46fb8a.paddingRight, 10);
          if (_0x18163a <= 0) {
            _0x18163a = 0;
          }
          var _0x15efb8 = parseInt(_0x46fb8a.paddingBottom, 10);
          if (_0x15efb8 <= 0) {
            _0x15efb8 = 0;
          }
          var _0x5d5255;
          var _0x548edc;
          var _0x17d959;
          var _0x217deb;
          var _0x1e073e;
          var _0x23664c;
          var _0x2a9c5b;
          var _0x2ab0a4 = parseInt(_0x46fb8a.paddingLeft, 10);
          if (_0x2ab0a4 <= 0) {
            _0x2ab0a4 = 0;
          }
          (_0x23664c = document.createElement("div")).classList.add("padding_effect");
          _0x23664c.style.width = "100%";
          _0x23664c.style.height = "100%";
          _0x23664c.style.top = "0px";
          _0x23664c.style.left = "0px";
          _0x23664c.style.position = "absolute";
          _0x23664c.style.borderColor = "rgba(153, 165, 187, 0.44)";
          _0x23664c.style.borderStyle = "solid";
          _0x23664c.style.borderWidth = _0x3742ce + "px " + _0x18163a + "px " + _0x15efb8 + "px " + _0x2ab0a4 + 'px';
          _0x1a2a38.appendChild(_0x23664c);
          (_0x2a9c5b = document.createElement("div")).classList.add("margin_effect");
          _0x2a9c5b.style.width = "100%";
          _0x2a9c5b.style.height = "100%";
          _0x2a9c5b.style.top = '-' + _0xa3c63 + 'px';
          _0x2a9c5b.style.left = '-' + _0x229d5c + 'px';
          _0x2a9c5b.style.position = "absolute";
          _0x2a9c5b.style.borderColor = "rgba(230, 125, 73, 0.6)";
          _0x2a9c5b.style.borderStyle = "solid";
          _0x2a9c5b.style.borderWidth = _0xa3c63 + "px " + _0x4ee204 + "px " + _0x4705b3 + "px " + _0x229d5c + 'px';
          _0x2a9c5b.style.boxSizing = "content-box";
          _0x1a2a38.appendChild(_0x2a9c5b);
          if (!(null == _0x1065ab)) {
            _0x1065ab.addEventListener("click", function (_0x579436) {
              var _0x50c95a;
              var _0x42c619;
              if (!(null === (_0x50c95a = document.querySelector(".InfoBlock")) || undefined === _0x50c95a)) {
                _0x50c95a.remove();
              }
              _0x1a2a38.appendChild(_0x23664c);
              _0x5d5255 = _0x579436.clientY;
              _0x217deb = "padding-top";
              if ((_0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).paddingTop, 10)) <= 0) {
                _0x17d959 = 0;
              }
              (_0x42c619 = document.createElement("div")).classList.add("InfoBlock", "top");
              _0x42c619.innerHTML = _0x17d959;
              _0x42c619.contentEditable = "true";
              _0x42c619.style.pointerEvents = "all";
              _0x1a2a38.appendChild(_0x42c619);
              _0x42c619.addEventListener("keypress", function (_0x416af7) {
                if ("Enter" === _0x416af7.key) {
                  _0x416af7.preventDefault();
                  _0x416af7.stopPropagation();
                  if (!(null == _0x23664c)) {
                    _0x23664c.remove();
                  }
                  var _0x480be2 = parseInt(_0x42c619.innerHTML, 10);
                  if (_0x480be2 >= 0) {
                    var _0x5c2586 = parseInt(_0x46fb8a.paddingTop, 10);
                    if (_0x5c2586 <= 0) {
                      _0x5c2586 = 0;
                    }
                    var _0x14b4a6 = parseInt(_0x46fb8a.paddingRight, 10);
                    if (_0x14b4a6 <= 0) {
                      _0x14b4a6 = 0;
                    }
                    var _0xb8f5ff = parseInt(_0x46fb8a.paddingBottom, 10);
                    if (_0xb8f5ff <= 0) {
                      _0xb8f5ff = 0;
                    }
                    var _0x53c69a = parseInt(_0x46fb8a.paddingLeft, 10);
                    if (_0x53c69a <= 0) {
                      _0x53c69a = 0;
                    }
                    _0x13aa28.addStyle({
                      'padding-top': ''.concat(_0x480be2, "px !important")
                    });
                    _0x23664c.style.borderWidth = _0x480be2 + "px " + _0x14b4a6 + "px " + _0xb8f5ff + "px " + _0x53c69a + 'px';
                    _0x1a2a38.appendChild(_0x23664c);
                    _0x582c20.refresh();
                    _0x582c20.trigger("component:toggled");
                  } else {
                    var _0x1b8d2b = document.querySelector(".InfoBlock");
                    if (null !== _0x1b8d2b) {
                      _0x1b8d2b.innerHTML = '0';
                    }
                  }
                }
              });
            });
          }
          _0x14fa6e.addEventListener("click", function (_0x1d28f1) {
            var _0x54aa3d;
            var _0x652698;
            if (!(null === (_0x54aa3d = document.querySelector(".InfoBlock")) || undefined === _0x54aa3d)) {
              _0x54aa3d.remove();
            }
            _0x1a2a38.appendChild(_0x23664c);
            _0x5d5255 = _0x1d28f1.clientY;
            _0x217deb = "padding-bottom";
            if ((_0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).paddingBottom, 10)) <= 0) {
              _0x17d959 = 0;
            }
            (_0x652698 = document.createElement("div")).classList.add("InfoBlock", "bottom");
            _0x652698.innerHTML = _0x17d959;
            _0x652698.contentEditable = "true";
            _0x652698.style.pointerEvents = "all";
            _0x1a2a38.appendChild(_0x652698);
            _0x652698.addEventListener("keypress", function (_0x398a96) {
              if ("Enter" === _0x398a96.key) {
                _0x398a96.preventDefault();
                _0x398a96.stopPropagation();
                if (!(null == _0x23664c)) {
                  _0x23664c.remove();
                }
                var _0x12ffe2 = parseInt(_0x652698.innerHTML, 10);
                if (_0x12ffe2 >= 0) {
                  var _0x1d21fd = parseInt(_0x46fb8a.paddingTop, 10);
                  if (_0x1d21fd <= 0) {
                    _0x1d21fd = 0;
                  }
                  var _0x56d310 = parseInt(_0x46fb8a.paddingRight, 10);
                  if (_0x56d310 <= 0) {
                    _0x56d310 = 0;
                  }
                  var _0x1068af = parseInt(_0x46fb8a.paddingBottom, 10);
                  if (_0x1068af <= 0) {
                    _0x1068af = 0;
                  }
                  var _0x315c26 = parseInt(_0x46fb8a.paddingLeft, 10);
                  if (_0x315c26 <= 0) {
                    _0x315c26 = 0;
                  }
                  _0x13aa28.addStyle({
                    'padding-bottom': ''.concat(_0x12ffe2, "px !important")
                  });
                  _0x23664c.style.borderWidth = _0x1d21fd + "px " + _0x56d310 + "px " + _0x12ffe2 + "px " + _0x315c26 + 'px';
                  _0x1a2a38.appendChild(_0x23664c);
                  _0x582c20.refresh();
                  _0x582c20.trigger("component:toggled");
                } else {
                  var _0x1f81f1 = document.querySelector(".InfoBlock");
                  if (null !== _0x1f81f1) {
                    _0x1f81f1.innerHTML = '0';
                  }
                }
              }
            });
          });
          _0xa4936c.addEventListener("click", function (_0x4a9260) {
            var _0x17edbb;
            var _0xaf4b5;
            if (!(null === (_0x17edbb = document.querySelector(".InfoBlock")) || undefined === _0x17edbb)) {
              _0x17edbb.remove();
            }
            _0x1a2a38.appendChild(_0x23664c);
            _0x5d5255 = _0x4a9260.clientY;
            _0x217deb = "padding-left";
            if ((_0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).paddingLeft, 10)) <= 0) {
              _0x17d959 = 0;
            }
            (_0xaf4b5 = document.createElement("div")).classList.add("InfoBlock", "left");
            _0xaf4b5.innerHTML = _0x17d959;
            _0xaf4b5.contentEditable = "true";
            _0xaf4b5.style.pointerEvents = "all";
            _0x1a2a38.appendChild(_0xaf4b5);
            _0xaf4b5.addEventListener("keypress", function (_0xdebe62) {
              if ("Enter" === _0xdebe62.key) {
                _0xdebe62.preventDefault();
                _0xdebe62.stopPropagation();
                if (!(null == _0x23664c)) {
                  _0x23664c.remove();
                }
                var _0x2a8aae = parseInt(_0xaf4b5.innerHTML, 10);
                if (_0x2a8aae >= 0) {
                  var _0x2ddb8b = parseInt(_0x46fb8a.paddingTop, 10);
                  if (_0x2ddb8b <= 0) {
                    _0x2ddb8b = 0;
                  }
                  var _0x1dfa5c = parseInt(_0x46fb8a.paddingRight, 10);
                  if (_0x1dfa5c <= 0) {
                    _0x1dfa5c = 0;
                  }
                  var _0x14d627 = parseInt(_0x46fb8a.paddingBottom, 10);
                  if (_0x14d627 <= 0) {
                    _0x14d627 = 0;
                  }
                  var _0x4cf5a4 = parseInt(_0x46fb8a.paddingLeft, 10);
                  if (_0x4cf5a4 <= 0) {
                    _0x4cf5a4 = 0;
                  }
                  _0x13aa28.addStyle({
                    'padding-left': ''.concat(_0x2a8aae, "px !important")
                  });
                  _0x23664c.style.borderWidth = _0x2ddb8b + "px " + _0x1dfa5c + "px " + _0x14d627 + "px " + _0x2a8aae + 'px';
                  _0x1a2a38.appendChild(_0x23664c);
                  _0x582c20.refresh();
                  _0x582c20.trigger("component:toggled");
                } else {
                  var _0x12e328 = document.querySelector(".InfoBlock");
                  if (null !== _0x12e328) {
                    _0x12e328.innerHTML = '0';
                  }
                }
              }
            });
          });
          _0x4fe90a.addEventListener("click", function (_0xb6cc45) {
            var _0x3ba1f8;
            var _0xb1c6af;
            if (!(null === (_0x3ba1f8 = document.querySelector(".InfoBlock")) || undefined === _0x3ba1f8)) {
              _0x3ba1f8.remove();
            }
            _0x1a2a38.appendChild(_0x23664c);
            _0x5d5255 = _0xb6cc45.clientY;
            _0x217deb = "padding-right";
            if ((_0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).paddingRight, 10)) <= 0) {
              _0x17d959 = 0;
            }
            (_0xb1c6af = document.createElement("div")).classList.add("InfoBlock", "right");
            _0xb1c6af.innerHTML = _0x17d959;
            _0xb1c6af.contentEditable = "true";
            _0xb1c6af.style.pointerEvents = "all";
            _0x1a2a38.appendChild(_0xb1c6af);
            _0xb1c6af.addEventListener("keypress", function (_0x366aff) {
              if ("Enter" === _0x366aff.key) {
                _0x366aff.preventDefault();
                _0x366aff.stopPropagation();
                if (!(null == _0x23664c)) {
                  _0x23664c.remove();
                }
                var _0x2c7bcf = parseInt(_0xb1c6af.innerHTML, 10);
                if (_0x2c7bcf >= 0) {
                  var _0x20e49c = parseInt(_0x46fb8a.paddingTop, 10);
                  if (_0x20e49c <= 0) {
                    _0x20e49c = 0;
                  }
                  var _0x413f39 = parseInt(_0x46fb8a.paddingRight, 10);
                  if (_0x413f39 <= 0) {
                    _0x413f39 = 0;
                  }
                  var _0x4ad6e8 = parseInt(_0x46fb8a.paddingBottom, 10);
                  if (_0x4ad6e8 <= 0) {
                    _0x4ad6e8 = 0;
                  }
                  var _0xb504a = parseInt(_0x46fb8a.paddingLeft, 10);
                  if (_0xb504a <= 0) {
                    _0xb504a = 0;
                  }
                  _0x13aa28.addStyle({
                    'padding-right': ''.concat(_0x2c7bcf, "px !important")
                  });
                  _0x23664c.style.borderWidth = _0x20e49c + "px " + _0x2c7bcf + "px " + _0x4ad6e8 + "px " + _0xb504a + 'px';
                  _0x1a2a38.appendChild(_0x23664c);
                  _0x582c20.refresh();
                  _0x582c20.trigger("component:toggled");
                } else {
                  var _0x5d36e1 = document.querySelector(".InfoBlock");
                  if (null !== _0x5d36e1) {
                    _0x5d36e1.innerHTML = '0';
                  }
                }
              }
            });
          });
          _0x202d13.addEventListener("click", function (_0x562de8) {
            var _0x278517;
            var _0x3e8183;
            if (!(null === (_0x278517 = document.querySelector(".InfoBlock")) || undefined === _0x278517)) {
              _0x278517.remove();
            }
            _0x1a2a38.appendChild(_0x2a9c5b);
            _0x5d5255 = _0x562de8.clientY;
            _0x217deb = "margin-top";
            if ((_0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).marginTop, 10)) <= 0) {
              _0x17d959 = 0;
            }
            (_0x3e8183 = document.createElement("div")).classList.add("InfoBlock", "top");
            _0x3e8183.innerHTML = _0x17d959;
            _0x3e8183.contentEditable = "true";
            _0x3e8183.style.pointerEvents = "all";
            _0x1a2a38.appendChild(_0x3e8183);
            _0x3e8183.addEventListener("keypress", function (_0x341c81) {
              if ("Enter" === _0x341c81.key) {
                _0x341c81.preventDefault();
                _0x341c81.stopPropagation();
                if (!(null == _0x2a9c5b)) {
                  _0x2a9c5b.remove();
                }
                var _0x3dd871 = parseInt(_0x3e8183.innerHTML, 10);
                if (_0x3dd871 >= 0) {
                  var _0x442b90 = parseInt(_0x46fb8a.marginTop, 10);
                  if (_0x442b90 <= 0) {
                    _0x442b90 = 0;
                  }
                  var _0x2da8fe = parseInt(_0x46fb8a.marginRight, 10);
                  if (_0x2da8fe <= 0) {
                    _0x2da8fe = 0;
                  }
                  var _0x4d4bd3 = parseInt(_0x46fb8a.marginBottom, 10);
                  if (_0x4d4bd3 <= 0) {
                    _0x4d4bd3 = 0;
                  }
                  var _0x18b6ce = parseInt(_0x46fb8a.marginLeft, 10);
                  if (_0x18b6ce <= 0) {
                    _0x18b6ce = 0;
                  }
                  _0x13aa28.addStyle({
                    'margin-top': ''.concat(_0x3dd871, "px !important")
                  });
                  _0x2a9c5b.style.top = '-' + _0x3dd871 + 'px';
                  _0x2a9c5b.style.left = '-' + _0x18b6ce + 'px';
                  _0x2a9c5b.style.borderWidth = _0x3dd871 + "px " + _0x2da8fe + "px " + _0x4d4bd3 + "px " + _0x18b6ce + 'px';
                  _0x1a2a38.appendChild(_0x2a9c5b);
                  _0x582c20.refresh();
                  _0x582c20.trigger("component:toggled");
                } else {
                  var _0x5aa9d2 = document.querySelector(".InfoBlock");
                  if (null !== _0x5aa9d2) {
                    _0x5aa9d2.innerHTML = '0';
                  }
                }
              }
            });
          });
          _0x27adfe.addEventListener("click", function (_0x54e894) {
            var _0x375fed;
            var _0x5bb497;
            if (!(null === (_0x375fed = document.querySelector(".InfoBlock")) || undefined === _0x375fed)) {
              _0x375fed.remove();
            }
            _0x1a2a38.appendChild(_0x2a9c5b);
            _0x5d5255 = _0x54e894.clientY;
            _0x217deb = "margin-bottom";
            if ((_0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).marginBottom, 10)) <= 0) {
              _0x17d959 = 0;
            }
            (_0x5bb497 = document.createElement("div")).classList.add("InfoBlock", "bottom");
            _0x5bb497.innerHTML = _0x17d959;
            _0x5bb497.contentEditable = "true";
            _0x5bb497.style.pointerEvents = "all";
            _0x1a2a38.appendChild(_0x5bb497);
            _0x5bb497.addEventListener("keypress", function (_0x3c59e1) {
              if ("Enter" === _0x3c59e1.key) {
                _0x3c59e1.preventDefault();
                _0x3c59e1.stopPropagation();
                if (!(null == _0x2a9c5b)) {
                  _0x2a9c5b.remove();
                }
                var _0x4ceb35 = parseInt(_0x5bb497.innerHTML, 10);
                if (_0x4ceb35 >= 0) {
                  var _0xa8b566 = parseInt(_0x46fb8a.marginTop, 10);
                  if (_0xa8b566 <= 0) {
                    _0xa8b566 = 0;
                  }
                  var _0x1214da = parseInt(_0x46fb8a.marginRight, 10);
                  if (_0x1214da <= 0) {
                    _0x1214da = 0;
                  }
                  var _0x4255f5 = parseInt(_0x46fb8a.marginBottom, 10);
                  if (_0x4255f5 <= 0) {
                    _0x4255f5 = 0;
                  }
                  var _0x49c06e = parseInt(_0x46fb8a.marginLeft, 10);
                  if (_0x49c06e <= 0) {
                    _0x49c06e = 0;
                  }
                  _0x13aa28.addStyle({
                    'margin-bottom': ''.concat(_0x4ceb35, "px !important")
                  });
                  _0x2a9c5b.style.borderWidth = _0xa8b566 + "px " + _0x1214da + "px " + _0x4ceb35 + "px " + _0x49c06e + 'px';
                  _0x1a2a38.appendChild(_0x2a9c5b);
                  _0x582c20.refresh();
                  _0x582c20.trigger("component:toggled");
                } else {
                  var _0x19c831 = document.querySelector(".InfoBlock");
                  if (null !== _0x19c831) {
                    _0x19c831.innerHTML = '0';
                  }
                }
              }
            });
          });
          _0x21d4fc.addEventListener("click", function (_0x3a87c0) {
            var _0x515e5e;
            var _0x3be103;
            if (!(null === (_0x515e5e = document.querySelector(".InfoBlock")) || undefined === _0x515e5e)) {
              _0x515e5e.remove();
            }
            _0x1a2a38.appendChild(_0x2a9c5b);
            _0x5d5255 = _0x3a87c0.clientY;
            _0x217deb = "margin-left";
            if ((_0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).marginLeft, 10)) <= 0) {
              _0x17d959 = 0;
            }
            (_0x3be103 = document.createElement("div")).classList.add("InfoBlock", "left");
            _0x3be103.innerHTML = _0x17d959;
            _0x3be103.contentEditable = "true";
            _0x3be103.style.pointerEvents = "all";
            _0x1a2a38.appendChild(_0x3be103);
            _0x3be103.addEventListener("keypress", function (_0x10948b) {
              if ("Enter" === _0x10948b.key) {
                _0x10948b.preventDefault();
                _0x10948b.stopPropagation();
                if (!(null == _0x2a9c5b)) {
                  _0x2a9c5b.remove();
                }
                var _0x1fc06f = parseInt(_0x3be103.innerHTML, 10);
                if (_0x1fc06f >= 0) {
                  var _0x3d7908 = parseInt(_0x46fb8a.marginTop, 10);
                  if (_0x3d7908 <= 0) {
                    _0x3d7908 = 0;
                  }
                  var _0x7e7612 = parseInt(_0x46fb8a.marginRight, 10);
                  if (_0x7e7612 <= 0) {
                    _0x7e7612 = 0;
                  }
                  var _0x3f22da = parseInt(_0x46fb8a.marginBottom, 10);
                  if (_0x3f22da <= 0) {
                    _0x3f22da = 0;
                  }
                  var _0x1fc377 = parseInt(_0x46fb8a.marginLeft, 10);
                  if (_0x1fc377 <= 0) {
                    _0x1fc377 = 0;
                  }
                  _0x13aa28.addStyle({
                    'margin-left': ''.concat(_0x1fc06f, "px !important")
                  });
                  _0x2a9c5b.style.top = '-' + _0x3d7908 + 'px';
                  _0x2a9c5b.style.left = '-' + _0x1fc06f + 'px';
                  _0x2a9c5b.style.borderWidth = _0x3d7908 + "px " + _0x7e7612 + "px " + _0x3f22da + "px " + _0x1fc06f + 'px';
                  _0x1a2a38.appendChild(_0x2a9c5b);
                  _0x582c20.refresh();
                  _0x582c20.trigger("component:toggled");
                } else {
                  var _0x3344ce = document.querySelector(".InfoBlock");
                  if (null !== _0x3344ce) {
                    _0x3344ce.innerHTML = '0';
                  }
                }
              }
            });
          });
          _0x34c0bf.addEventListener("click", function (_0x2fc6d4) {
            var _0x433b8c;
            var _0x548838;
            if (!(null === (_0x433b8c = document.querySelector(".InfoBlock")) || undefined === _0x433b8c)) {
              _0x433b8c.remove();
            }
            _0x1a2a38.appendChild(_0x2a9c5b);
            _0x5d5255 = _0x2fc6d4.clientY;
            _0x217deb = "margin-right";
            if ((_0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).marginRight, 10)) <= 0) {
              _0x17d959 = 0;
            }
            (_0x548838 = document.createElement("div")).classList.add("InfoBlock", "right");
            _0x548838.innerHTML = _0x17d959;
            _0x548838.contentEditable = "true";
            _0x548838.style.pointerEvents = "all";
            _0x1a2a38.appendChild(_0x548838);
            _0x548838.addEventListener("keypress", function (_0x227034) {
              if ("Enter" === _0x227034.key) {
                _0x227034.preventDefault();
                _0x227034.stopPropagation();
                if (!(null == _0x2a9c5b)) {
                  _0x2a9c5b.remove();
                }
                var _0x165e50 = parseInt(_0x548838.innerHTML, 10);
                if (_0x165e50 >= 0) {
                  var _0x5e5695 = parseInt(_0x46fb8a.marginTop, 10);
                  if (_0x5e5695 <= 0) {
                    _0x5e5695 = 0;
                  }
                  var _0x5e3340 = parseInt(_0x46fb8a.marginRight, 10);
                  if (_0x5e3340 <= 0) {
                    _0x5e3340 = 0;
                  }
                  var _0x15dac9 = parseInt(_0x46fb8a.marginBottom, 10);
                  if (_0x15dac9 <= 0) {
                    _0x15dac9 = 0;
                  }
                  var _0x8c9855 = parseInt(_0x46fb8a.marginLeft, 10);
                  if (_0x8c9855 <= 0) {
                    _0x8c9855 = 0;
                  }
                  _0x13aa28.addStyle({
                    'margin-right': ''.concat(_0x165e50, "px !important")
                  });
                  _0x2a9c5b.style.borderWidth = _0x5e5695 + "px " + _0x165e50 + "px " + _0x15dac9 + "px " + _0x8c9855 + 'px';
                  _0x1a2a38.appendChild(_0x2a9c5b);
                  _0x582c20.refresh();
                  _0x582c20.trigger("component:toggled");
                } else {
                  var _0x58b5ea = document.querySelector(".InfoBlock");
                  if (null !== _0x58b5ea) {
                    _0x58b5ea.innerHTML = '0';
                  }
                }
              }
            });
          });
          _0x202d13.addEventListener("mousedown", function (_0x5907e8) {
            var _0x4bd900;
            var _0x48c0c8;
            if (!(null === (_0x4bd900 = document.querySelector(".InfoBlock")) || undefined === _0x4bd900)) {
              _0x4bd900.remove();
            }
            _0x582c20.Canvas.toggleFramesEvents(0);
            _0x5d5255 = _0x5907e8.clientY;
            _0x217deb = "margin-top";
            _0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).marginTop, 10);
            document.addEventListener("mousemove", _0x58a861);
            document.addEventListener("mouseup", _0x29a954);
            (_0x48c0c8 = document.createElement("div")).classList.add("InfoBlock", "top");
            _0x48c0c8.innerHTML = _0x17d959;
            _0x1a2a38.appendChild(_0x48c0c8);
          });
          _0x1065ab.addEventListener("mousedown", function (_0x1a33d1) {
            var _0x4d3628;
            var _0xf93e95;
            if (!(null === (_0x4d3628 = document.querySelector(".InfoBlock")) || undefined === _0x4d3628)) {
              _0x4d3628.remove();
            }
            _0x582c20.Canvas.toggleFramesEvents(0);
            _0x5d5255 = _0x1a33d1.clientY;
            _0x217deb = "padding-top";
            _0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).paddingTop, 10);
            document.addEventListener("mousemove", _0x58a861);
            document.addEventListener("mouseup", _0x29a954);
            (_0xf93e95 = document.createElement("div")).classList.add("InfoBlock", "top");
            _0xf93e95.innerHTML = _0x17d959;
            _0x1a2a38.appendChild(_0xf93e95);
          });
          _0x27adfe.addEventListener("mousedown", function (_0x95d932) {
            var _0x323991;
            var _0x45116b;
            if (!(null === (_0x323991 = document.querySelector(".InfoBlock")) || undefined === _0x323991)) {
              _0x323991.remove();
            }
            _0x582c20.Canvas.toggleFramesEvents(0);
            _0x5d5255 = _0x95d932.clientY;
            _0x217deb = "margin-bottom";
            _0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).marginBottom, 10);
            document.addEventListener("mousemove", _0x58a861);
            document.addEventListener("mouseup", _0x29a954);
            (_0x45116b = document.createElement("div")).classList.add("InfoBlock", "bottom");
            _0x45116b.innerHTML = _0x17d959;
            _0x1a2a38.appendChild(_0x45116b);
          });
          _0x14fa6e.addEventListener("mousedown", function (_0x1e73fb) {
            var _0x3af9a9;
            var _0x5cd3b3;
            if (!(null === (_0x3af9a9 = document.querySelector(".InfoBlock")) || undefined === _0x3af9a9)) {
              _0x3af9a9.remove();
            }
            _0x582c20.Canvas.toggleFramesEvents(0);
            _0x5d5255 = _0x1e73fb.clientY;
            _0x217deb = "padding-bottom";
            _0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).paddingBottom, 10);
            document.addEventListener("mousemove", _0x58a861);
            document.addEventListener("mouseup", _0x29a954);
            (_0x5cd3b3 = document.createElement("div")).classList.add("InfoBlock", "bottom");
            _0x5cd3b3.innerHTML = _0x17d959;
            _0x1a2a38.appendChild(_0x5cd3b3);
          });
          _0x34c0bf.addEventListener("mousedown", function (_0x291d24) {
            var _0x356b41;
            var _0x53b715;
            if (!(null === (_0x356b41 = document.querySelector(".InfoBlock")) || undefined === _0x356b41)) {
              _0x356b41.remove();
            }
            _0x582c20.Canvas.toggleFramesEvents(0);
            _0x548edc = _0x291d24.clientX;
            _0x217deb = "margin-right";
            _0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).marginRight, 10);
            document.addEventListener("mousemove", _0x58a861);
            document.addEventListener("mouseup", _0x29a954);
            (_0x53b715 = document.createElement("div")).classList.add("InfoBlock", "right");
            _0x53b715.innerHTML = _0x17d959;
            _0x1a2a38.appendChild(_0x53b715);
          });
          // if (location.host != "devfuture.pro") {
          //   throw Error("Something wrong!");
          // }
          _0x4fe90a.addEventListener("mousedown", function (_0x3ae875) {
            var _0x1dc251;
            var _0x203dd4;
            if (!(null === (_0x1dc251 = document.querySelector(".InfoBlock")) || undefined === _0x1dc251)) {
              _0x1dc251.remove();
            }
            _0x582c20.Canvas.toggleFramesEvents(0);
            _0x548edc = _0x3ae875.clientX;
            _0x217deb = "padding-right";
            _0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).paddingRight, 10);
            document.addEventListener("mousemove", _0x58a861);
            document.addEventListener("mouseup", _0x29a954);
            (_0x203dd4 = document.createElement("div")).classList.add("InfoBlock", "right");
            _0x203dd4.innerHTML = _0x17d959;
            _0x1a2a38.appendChild(_0x203dd4);
          });
          _0x21d4fc.addEventListener("mousedown", function (_0x5d2335) {
            var _0x2bd977;
            var _0x3b0c39;
            if (!(null === (_0x2bd977 = document.querySelector(".InfoBlock")) || undefined === _0x2bd977)) {
              _0x2bd977.remove();
            }
            _0x582c20.Canvas.toggleFramesEvents(0);
            _0x548edc = _0x5d2335.clientX;
            _0x217deb = "margin-left";
            _0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).marginLeft, 10);
            document.addEventListener("mousemove", _0x58a861);
            document.addEventListener("mouseup", _0x29a954);
            (_0x3b0c39 = document.createElement("div")).classList.add("InfoBlock", "left");
            _0x3b0c39.innerHTML = _0x17d959;
            _0x1a2a38.appendChild(_0x3b0c39);
          });
          _0xa4936c.addEventListener("mousedown", function (_0x477e67) {
            var _0x36a27c;
            var _0x3585bc;
            if (!(null === (_0x36a27c = document.querySelector(".InfoBlock")) || undefined === _0x36a27c)) {
              _0x36a27c.remove();
            }
            _0x582c20.Canvas.toggleFramesEvents(0);
            _0x548edc = _0x477e67.clientX;
            _0x217deb = "padding-left";
            _0x17d959 = parseInt(window.getComputedStyle(_0x13aa28.getEl()).paddingLeft, 10);
            document.addEventListener("mousemove", _0x58a861);
            document.addEventListener("mouseup", _0x29a954);
            (_0x3585bc = document.createElement("div")).classList.add("InfoBlock", "left");
            _0x3585bc.innerHTML = _0x17d959;
            _0x1a2a38.appendChild(_0x3585bc);
          });
        }
        function _0x58a861(_0x34ccdc) {
          var _0x2c3744;
          var _0x3055e8;
          var _0x18cd69;
          var _0x273648;
          _0x582c20.Canvas.toggleFramesEvents(0);
          if (!(null === (_0x3055e8 = document.querySelector(".padding_effect")) || undefined === _0x3055e8)) {
            _0x3055e8.remove();
          }
          if (!(null === (_0x18cd69 = document.querySelector(".margin_effect")) || undefined === _0x18cd69)) {
            _0x18cd69.remove();
          }
          _0x34ccdc.preventDefault();
          _0x34ccdc.stopPropagation();
          if ("margin-top" == _0x217deb) {
            _0x1e073e = _0x34ccdc.clientY - _0x5d5255;
            _0x273648 = _0x17d959 + _0x1e073e;
            var _0x42a958 = parseInt(_0x46fb8a.marginTop, 10);
            if (_0x42a958 <= 0) {
              _0x42a958 = 0;
            }
            var _0xd98329 = parseInt(_0x46fb8a.marginRight, 10);
            if (_0xd98329 <= 0) {
              _0xd98329 = 0;
            }
            var _0x5b8b94 = parseInt(_0x46fb8a.marginBottom, 10);
            if (_0x5b8b94 <= 0) {
              _0x5b8b94 = 0;
            }
            var _0x144771 = parseInt(_0x46fb8a.marginLeft, 10);
            if (_0x144771 <= 0) {
              _0x144771 = 0;
            }
            _0x2a9c5b.style.top = '-' + _0x273648 + 'px';
            _0x2a9c5b.style.left = '-' + _0x144771 + 'px';
            _0x2a9c5b.style.borderWidth = _0x273648 + "px " + _0xd98329 + "px " + _0x5b8b94 + "px " + _0x144771 + 'px';
          }
          if ("padding-top" == _0x217deb) {
            _0x1e073e = _0x34ccdc.clientY - _0x5d5255;
            _0x273648 = _0x17d959 + _0x1e073e;
            var _0x5a1bbc = parseInt(_0x46fb8a.paddingTop, 10);
            if (_0x5a1bbc <= 0) {
              _0x5a1bbc = 0;
            }
            var _0x3bc7f5 = parseInt(_0x46fb8a.paddingRight, 10);
            if (_0x3bc7f5 <= 0) {
              _0x3bc7f5 = 0;
            }
            var _0x5bc446 = parseInt(_0x46fb8a.paddingBottom, 10);
            if (_0x5bc446 <= 0) {
              _0x5bc446 = 0;
            }
            var _0xa7a049 = parseInt(_0x46fb8a.paddingLeft, 10);
            if (_0xa7a049 <= 0) {
              _0xa7a049 = 0;
            }
            _0x23664c.style.borderWidth = _0x273648 + "px " + _0x3bc7f5 + "px " + _0x5bc446 + "px " + _0xa7a049 + 'px';
          }
          if ("margin-bottom" == _0x217deb) {
            _0x1e073e = _0x34ccdc.clientY - _0x5d5255;
            _0x273648 = _0x17d959 + _0x1e073e;
            var _0x19952d = parseInt(_0x46fb8a.marginTop, 10);
            if (_0x19952d <= 0) {
              _0x19952d = 0;
            }
            var _0x2c9bb8 = parseInt(_0x46fb8a.marginRight, 10);
            if (_0x2c9bb8 <= 0) {
              _0x2c9bb8 = 0;
            }
            var _0x40d6cb = parseInt(_0x46fb8a.marginBottom, 10);
            if (_0x40d6cb <= 0) {
              _0x40d6cb = 0;
            }
            var _0x2e3a14 = parseInt(_0x46fb8a.marginLeft, 10);
            if (_0x2e3a14 <= 0) {
              _0x2e3a14 = 0;
            }
            _0x2a9c5b.style.borderWidth = _0x19952d + "px " + _0x2c9bb8 + "px " + _0x273648 + "px " + _0x2e3a14 + 'px';
          }
          if ("padding-bottom" == _0x217deb) {
            _0x1e073e = _0x34ccdc.clientY - _0x5d5255;
            _0x273648 = _0x17d959 + _0x1e073e;
            var _0x2bf05d = parseInt(_0x46fb8a.paddingTop, 10);
            if (_0x2bf05d <= 0) {
              _0x2bf05d = 0;
            }
            var _0x3ee83c = parseInt(_0x46fb8a.paddingRight, 10);
            if (_0x3ee83c <= 0) {
              _0x3ee83c = 0;
            }
            var _0x6e201c = parseInt(_0x46fb8a.paddingBottom, 10);
            if (_0x6e201c <= 0) {
              _0x6e201c = 0;
            }
            var _0x3fe528 = parseInt(_0x46fb8a.paddingLeft, 10);
            if (_0x3fe528 <= 0) {
              _0x3fe528 = 0;
            }
            _0x23664c.style.borderWidth = _0x2bf05d + "px " + _0x3ee83c + "px " + _0x273648 + "px " + _0x3fe528 + 'px';
          }
          if ("margin-left" == _0x217deb) {
            _0x1e073e = _0x34ccdc.clientX - _0x548edc;
            _0x273648 = _0x17d959 + _0x1e073e;
            var _0x5ba411 = parseInt(_0x46fb8a.marginTop, 10);
            if (_0x5ba411 <= 0) {
              _0x5ba411 = 0;
            }
            var _0x2612df = parseInt(_0x46fb8a.marginRight, 10);
            if (_0x2612df <= 0) {
              _0x2612df = 0;
            }
            var _0x2f37fc = parseInt(_0x46fb8a.marginBottom, 10);
            if (_0x2f37fc <= 0) {
              _0x2f37fc = 0;
            }
            var _0x4effc4 = parseInt(_0x46fb8a.marginLeft, 10);
            if (_0x4effc4 <= 0) {
              _0x4effc4 = 0;
            }
            _0x2a9c5b.style.top = '-' + _0x5ba411 + 'px';
            _0x2a9c5b.style.left = '-' + _0x273648 + 'px';
            _0x2a9c5b.style.borderWidth = _0x5ba411 + "px " + _0x2612df + "px " + _0x2f37fc + "px " + _0x273648 + 'px';
          }
          if ("padding-left" == _0x217deb) {
            _0x1e073e = _0x34ccdc.clientX - _0x548edc;
            _0x273648 = _0x17d959 + _0x1e073e;
            var _0x1922b4 = parseInt(_0x46fb8a.paddingTop, 10);
            if (_0x1922b4 <= 0) {
              _0x1922b4 = 0;
            }
            var _0x48f8df = parseInt(_0x46fb8a.paddingRight, 10);
            if (_0x48f8df <= 0) {
              _0x48f8df = 0;
            }
            var _0x51c0e9 = parseInt(_0x46fb8a.paddingBottom, 10);
            if (_0x51c0e9 <= 0) {
              _0x51c0e9 = 0;
            }
            var _0x465ab5 = parseInt(_0x46fb8a.paddingLeft, 10);
            if (_0x465ab5 <= 0) {
              _0x465ab5 = 0;
            }
            _0x23664c.style.borderWidth = _0x1922b4 + "px " + _0x48f8df + "px " + _0x51c0e9 + "px " + _0x273648 + 'px';
          }
          if ("margin-right" == _0x217deb) {
            _0x1e073e = _0x34ccdc.clientX - _0x548edc;
            _0x273648 = _0x17d959 - _0x1e073e;
            var _0x56a1c6 = parseInt(_0x46fb8a.marginTop, 10);
            if (_0x56a1c6 <= 0) {
              _0x56a1c6 = 0;
            }
            var _0xfe7f0 = parseInt(_0x46fb8a.marginRight, 10);
            if (_0xfe7f0 <= 0) {
              _0xfe7f0 = 0;
            }
            var _0x20ce9a = parseInt(_0x46fb8a.marginBottom, 10);
            if (_0x20ce9a <= 0) {
              _0x20ce9a = 0;
            }
            var _0xc13255 = parseInt(_0x46fb8a.marginLeft, 10);
            if (_0xc13255 <= 0) {
              _0xc13255 = 0;
            }
            _0x2a9c5b.style.borderWidth = _0x56a1c6 + "px " + _0x273648 + "px " + _0x20ce9a + "px " + _0xc13255 + 'px';
          }
          if ("padding-right" == _0x217deb) {
            _0x1e073e = _0x34ccdc.clientX - _0x548edc;
            _0x273648 = _0x17d959 - _0x1e073e;
            var _0x2b8f65 = parseInt(_0x46fb8a.paddingTop, 10);
            if (_0x2b8f65 <= 0) {
              _0x2b8f65 = 0;
            }
            var _0x4ad56c = parseInt(_0x46fb8a.paddingRight, 10);
            if (_0x4ad56c <= 0) {
              _0x4ad56c = 0;
            }
            var _0x43853a = parseInt(_0x46fb8a.paddingBottom, 10);
            if (_0x43853a <= 0) {
              _0x43853a = 0;
            }
            var _0x3778ea = parseInt(_0x46fb8a.paddingLeft, 10);
            if (_0x3778ea <= 0) {
              _0x3778ea = 0;
            }
            _0x23664c.style.borderWidth = _0x2b8f65 + "px " + _0x273648 + "px " + _0x43853a + "px " + _0x3778ea + 'px';
          }
          if (_0x273648 >= 0) {
            var _0x1285fc = document.querySelector(".InfoBlock");
            if (null !== _0x1285fc) {
              _0x1285fc.innerHTML = _0x273648;
            }
            (_0x2c3744 = {})[_0x217deb] = ''.concat(_0x273648, "px !important");
            _0x13aa28.addStyle(_0x2c3744);
            if (_0x217deb.includes("margin")) {
              _0x1a2a38.appendChild(_0x2a9c5b);
            }
            if (_0x217deb.includes("padding")) {
              _0x1a2a38.appendChild(_0x23664c);
            }
            _0x582c20.refresh();
            _0x582c20.trigger("component:toggled");
          }
        }
        function _0x29a954() {
          var _0x596be0;
          var _0x2ec495;
          var _0x487e43;
          if (!(null === (_0x596be0 = document.querySelector(".InfoBlock")) || undefined === _0x596be0)) {
            _0x596be0.remove();
          }
          _0x582c20.Canvas.toggleFramesEvents(1);
          if (!(null === (_0x2ec495 = document.querySelector(".padding_effect")) || undefined === _0x2ec495)) {
            _0x2ec495.remove();
          }
          if (!(null === (_0x487e43 = document.querySelector(".margin_effect")) || undefined === _0x487e43)) {
            _0x487e43.remove();
          }
          document.removeEventListener("mousemove", _0x58a861);
          document.removeEventListener("mouseup", _0x29a954);
        }
      });
    })(_0x5080ec, _0x48d7a0);
    (function (_0x1e512f, _0x364766) {
      _0x1e512f.on("component:deselected run:core:component-style-clear", function () {
        var _0x204583;
        var _0x4aada7;
        var _0x31806c;
        var _0xc4ec07 = document.querySelector(".gjs-options");
        if (!(null == _0xc4ec07)) {
          _0xc4ec07.remove();
        }
        if (!(null === (_0x204583 = document.querySelector(".InfoBlock")) || undefined === _0x204583)) {
          _0x204583.remove();
        }
        _0x1e512f.Canvas.toggleFramesEvents(1);
        if (!(null === (_0x4aada7 = document.querySelector(".padding_effect")) || undefined === _0x4aada7)) {
          _0x4aada7.remove();
        }
        if (!(null === (_0x31806c = document.querySelector(".margin_effect")) || undefined === _0x31806c)) {
          _0x31806c.remove();
        }
      });
      // if (location.host != "devfuture.pro") {
      //   throw Error("Something wrong!");
      // }
    })(_0x5080ec);
    // if (location.host != "devfuture.pro") {
    //   throw Error("Something wrong!");
    // }
  };
  return _0x17c8d0;
})());