import html from './color-picker.html';
import css from './color-picker.css';
import {setHTML, addCss, removeCss, setTargetValue, define} from '../common/util';

export class XColorPicker extends HTMLElement {
  // canvas
  // circle
  // desc
  // target
  // width, height

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    this.target = document.getElementById(this.getAttribute('target'));
    setHTML(this, html)
      .then(_ => this._init());
  }

  disconnectedCallback() {
    removeCss(this);
  }

  _init() {
    this.canvas = this.querySelector('.canvas');
    this.circle = this.querySelector('.circle');
    this.desc = this.querySelector('.desc');
    this.width = this.offsetWidth || parseInt(this.getAttribute('width') || 240);
    this.height = this.offsetHeight || parseInt(this.getAttribute('height') || 160);
    this.style.width = this.width + 'px';
    this.style.minHeight = this.height + 'px';

    this._drawColors(this.canvas);
    this.canvas.addEventListener('click', e => {
      this._pickColor(e, this.canvas, this.circle, this.desc, this.target);
    });
  }

  _drawColors(canvas) {
    [canvas.width, canvas.height] = [this.width, this.height];
    const context = canvas.getContext('2d');
    const {width, height} = canvas;
  
    //Colors - horizontal gradient
    const gradientH = context.createLinearGradient(0, 0, width, 0);
    gradientH.addColorStop(0, 'rgb(255, 0, 0)'); // red
    gradientH.addColorStop(1/6, 'rgb(255, 255, 0)'); // yellow
    gradientH.addColorStop(2/6, 'rgb(0, 255, 0)'); // green
    gradientH.addColorStop(3/6, 'rgb(0, 255, 255)');
    gradientH.addColorStop(4/6, 'rgb(0, 0, 255)'); // blue
    gradientH.addColorStop(5/6, 'rgb(255, 0, 255)');
    gradientH.addColorStop(1, 'rgb(255, 0, 0)'); // red
    context.fillStyle = gradientH;
    context.fillRect(0, 0, width, height);
    
    //Shades - vertical gradient
    const gradientV = context.createLinearGradient(0, 0, 0, height);
    gradientV.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradientV.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradientV.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradientV.addColorStop(1, 'rgba(0, 0, 0, 1)');
    context.fillStyle = gradientV;
    context.fillRect(0, 0, width, height);
  }


  _pickColor(event, canvas, circle, desc, target) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; //x position within the element.
    const y = event.clientY - rect.top;  //y position within the element.

    const context = canvas.getContext('2d');
    const imgData = context.getImageData(x, y, 1, 1);
    const [r, g, b] = imgData.data;
    const [h, s, l] = this._rgb2hsl(r, g, b);
    const txtColor = l < 0.5 ? '#FFF' : '#000';
    circle.style.top = (y - 6) + 'px';
    circle.style.left = (x - 6) + 'px';
    circle.style.borderColor = txtColor;

    desc.innerText = Object.values(this._toCss(r,g,b,h,s,l))
      .toString().replace(/\),/g, ') ');
    desc.style.backgroundColor = this._toCss(r,g,b,h,s,l).hex;
    desc.style.color = txtColor;
    const hex = `#${this._int2hex(r)}${this._int2hex(g)}${this._int2hex(b)}`;
    canvas.dispatchEvent(new CustomEvent('x-select', {
      bubbles: true,  detail: { r, g, b, h, s, l, hex }
    }));
    if (this.target) {
      setTargetValue(this.target, hex);
      this.target.closest('x-input')?.classList.remove('empty');
    }
  }
  
  _int2hex(num)  {
    return  (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);
  }

  _toCss(r, g, b, h, s, l) {
    const int2hex = num => 
      (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);

    return {
      rgb: `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`,
      hsl: `hsl(${Math.round(360 * h)},${Math.round(100 * s)}%,${Math.round(100 * l)}%)`,
      hex: `#${int2hex(r)}${int2hex(g)}${int2hex(b)}`
    };
  }

  _rgb2hsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
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
}
XColorPicker.define = define('x-color-picker', XColorPicker);
