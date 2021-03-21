var Color = class { // eslint-disable-line no-unused-vars
  constructor(color) {
    this.r = this.g = this.b = 0; // red, green, blue
    this.h = this.s = this.l = 0; // hue, saturation, lightness
    this.set(color || '#000');
  }

  set(color) { // 'rgb(255,255,255)', 'hsl(145, 50%, 50%)', '#FFFFFF'
    const hex = color.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
    const hsl = color.match(
      /^hsla?\((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?\)$/
    );
    const rgb = color.match(
      /^rgba?\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?\)$/
    );

    if (hsl) {
      this.h = parseInt(hsl[1]) / 360;
      this.s = hsl[2].endsWith('%') ? parseInt(hsl[2]) / 100 : hsl[2];
      this.l = hsl[3].endsWith('%') ? parseInt(hsl[3]) / 100 : hsl[3];
      [this.r, this.g, this.b] = Color.hsl2rgb(this.h, this.s, this.l);
    } else if (rgb || hex) {
      if (rgb) { // e.g. rgb(255, 255, 255, .5)
        [this.r, this.g, this.b] = [
          parseInt(rgb[1]),
          parseInt(rgb[2]),
          parseInt(rgb[3])
        ];
      } else if (hex) {  // e.g. #FFFFFF, #333
        [this.r, this.g, this.b] = Color.hex2rgb(hex[1]);
      }
      [this.h, this.s, this.l] = Color.rgb2hsl(this.r, this.g, this.b);
    } else {
      console.error(`Invalid color, ${color}`);
    }
  }

  toString() {
    return JSON.stringify(this.toCss(), null, '  ');
  }

  toCss() {
    return {
      rgb: 'rgb(' +
        `${Math.round(this.r)}, ` +
        `${Math.round(this.g)}, ` +
        `${Math.round(this.b)})`,
      hsl: 'hsl(' +
        `${Math.round(360 * this.h)}, ` +
        `${Math.round(100 * this.s)}%, ` +
        `${Math.round(100 * this.l)}%)`,
      hex: '#' +
        `${Color.int2hex(this.r)}` +
        `${Color.int2hex(this.g)}` +
        `${Color.int2hex(this.b)}`
    };
  }

  static int2hex(num) {
    return (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);
  }

  static hex2int(hex) {
    return parseInt(hex, 16);
  }

  static hex2rgb(hex) {
    let r, g, b;
    if (hex.length === 3) {
      [r, g, b] = [
        Color.hex2int(hex[0].repeat(2)),
        Color.hex2int(hex[1].repeat(2)),
        Color.hex2int(hex[2].repeat(2))
      ];
    } else if (hex.length === 6) {
      [r, g, b] = [
        Color.hex2int(hex.substr(0, 2)),
        Color.hex2int(hex.substr(2, 2)),
        Color.hex2int(hex.substr(4, 2))
      ];
    }
    return [r, g, b];
  }

  static rgb2hsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);

    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h, s, l];
  }

  static hsl2rgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      // eslint-disable-next-line no-inner-declarations
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
  }

  lighten(v) { // e.g. 25%, 125, -25%, -125
    let l;
    if ('string' == typeof v && v.endsWith('%')) { // percentage
      l = this.l + (parseInt(v) / 100);
    } else { // number, range 255
      l = this.l + (v / 255);
    }
    l = l > 1 ? 1 : (l < 0 ? 0 : l);

    const [r, g, b] = Color.hsl2rgb(this.h, this.s, l);
    return `#${Color.int2hex(r)}${Color.int2hex(g)}${Color.int2hex(b)}`;
  }

  saturate(v) { // e.g. 25%, 125, -25%, -125
    let s;
    if ('string' == typeof v && v.endsWith('%')) { // percentage
      s = this.s + (parseInt(v) / 100);
    } else { // number, range 255
      s = this.s + (v / 255);
    }
    s = s > 1 ? 1 : (s < 0 ? 0 : s);

    const [r, g, b] = Color.hsl2rgb(this.h, s, this.l);
    return `#${Color.int2hex(r)}${Color.int2hex(g)}${Color.int2hex(b)}`;
  }

  spin(v) {
    let h;
    if ('string' == typeof v && v.endsWith('%')) { // percentage
      h = this.h + (parseInt(v) / 100);
    } else {  // number, range 360
      h = this.h + (parseFloat(v / 360));
    }
    const [r, g, b] = Color.hsl2rgb(h, this.s, this.l);
    return `#${Color.int2hex(r)}${Color.int2hex(g)}${Color.int2hex(b)}`;
  }

  static getNamedColors(color) {
    color = color.toLowerCase();

    const namedColors = {
      aliceblue:'#f0f8ff',antiquewhite:'#faebd7',aqua:'#00ffff',aquamarine:'#7fffd4', azure:'#f0ffff',beige:'#f5f5dc',bisque:'#ffe4c4',black:'#000000',blanchedalmond:'#ffebcd',blue:'#0000ff',blueviolet:'#8a2be2', brown:'#a52a2a',burlywood:'#deb887',cadetblue:'#5f9ea0',chartreuse:'#7fff00',chocolate:'#d2691e',coral:'#ff7f50', cornflowerblue:'#6495ed',cornsilk:'#fff8dc',crimson:'#dc143c',cyan:'#00ffff',darkblue:'#00008b',darkcyan:'#008b8b',darkgoldenrod:'#b8860b', darkgray:'#a9a9a9',darkgrey:'#a9a9a9',darkgreen:'#006400',darkkhaki:'#bdb76b',darkmagenta:'#8b008b',darkolivegreen:'#556b2f', darkorange:'#ff8c00',darkorchid:'#9932cc',darkred:'#8b0000',darksalmon:'#e9967a',darkseagreen:'#8fbc8f',darkslateblue:'#483d8b', darkslategray:'#2f4f4f',darkslategrey:'#2f4f4f',darkturquoise:'#00ced1',darkviolet:'#9400d3',deeppink:'#ff1493',deepskyblue:'#00bfff', dimgray:'#696969',dimgrey:'#696969',dodgerblue:'#1e90ff',firebrick:'#b22222',floralwhite:'#fffaf0',forestgreen:'#228b22', fuchsia:'#ff00ff',gainsboro:'#dcdcdc',ghostwhite:'#f8f8ff',gold:'#ffd700',goldenrod:'#daa520',gray:'#808080',grey:'#808080', green:'#008000',greenyellow:'#adff2f',honeydew:'#f0fff0',hotpink:'#ff69b4',indianred:'#cd5c5c',indigo:'#4b0082',ivory:'#fffff0', khaki:'#f0e68c',lavender:'#e6e6fa',lavenderblush:'#fff0f5',lawngreen:'#7cfc00',lemonchiffon:'#fffacd',lightblue:'#add8e6', lightcoral:'#f08080',lightcyan:'#e0ffff',lightgoldenrodyellow:'#fafad2',lightgray:'#d3d3d3',lightgrey:'#d3d3d3',lightgreen:'#90ee90', lightpink:'#ffb6c1',lightsalmon:'#ffa07a',lightseagreen:'#20b2aa',lightskyblue:'#87cefa',lightslategray:'#778899', lightslategrey:'#778899',lightsteelblue:'#b0c4de',lightyellow:'#ffffe0',lime:'#00ff00',limegreen:'#32cd32',linen:'#faf0e6', magenta:'#ff00ff',maroon:'#800000',mediumaquamarine:'#66cdaa',mediumblue:'#0000cd',mediumorchid:'#ba55d3',mediumpurple:'#9370d8', mediumseagreen:'#3cb371',mediumslateblue:'#7b68ee',mediumspringgreen:'#00fa9a',mediumturquoise:'#48d1cc',mediumvioletred:'#c71585', midnightblue:'#191970',mintcream:'#f5fffa',mistyrose:'#ffe4e1',moccasin:'#ffe4b5',navajowhite:'#ffdead',navy:'#000080',oldlace:'#fdf5e6', olive:'#808000',olivedrab:'#6b8e23',orange:'#ffa500',orangered:'#ff4500',orchid:'#da70d6',palegoldenrod:'#eee8aa', palegreen:'#98fb98',paleturquoise:'#afeeee',palevioletred:'#d87093',papayawhip:'#ffefd5',peachpuff:'#ffdab9',peru:'#cd853f', pink:'#ffc0cb',plum:'#dda0dd',powderblue:'#b0e0e6',purple:'#800080',red:'#ff0000',rosybrown:'#bc8f8f',royalblue:'#4169e1', saddlebrown:'#8b4513',salmon:'#fa8072',sandybrown:'#f4a460',seagreen:'#2e8b57',seashell:'#fff5ee',sienna:'#a0522d',silver:'#c0c0c0', skyblue:'#87ceeb',slateblue:'#6a5acd',slategray:'#708090',slategrey:'#708090',snow:'#fffafa',springgreen:'#00ff7f', steelblue:'#4682b4',tan:'#d2b48c',teal:'#008080',thistle:'#d8bfd8',tomato:'#ff6347',turquoise:'#40e0d0',violet:'#ee82ee'
    }; 
    
    return Object.entries(namedColors).filter( 
      ([k,_]) => k.indexOf(color) > -1
    );
  }
};
