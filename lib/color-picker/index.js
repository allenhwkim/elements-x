import html from './color-picker.html';
import css from './color-picker.css';
import {setHTML, addCss, removeCss, define} from '../common/util';

export class XColorPicker extends HTMLElement {
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.triggerEl.style.backgroundColor = value;
  }

  connectedCallback() {
    addCss(this, css);
    setHTML(this, html).then(_ => this.init());
  }

  disconnectedCallback() {
    removeCss(this);
  }

  init() {
    this.setAttribute('tabindex', 0);
    this.triggerEl = this.querySelector('.trigger');
    this.canvasEl = this.querySelector('.canvas');

    this.canvasEl.addEventListener('click', e => {
      this.circle = this.querySelector('.circle');
      this.desc = this.querySelector('.desc');
      this.circle.style.display = 'block';
      this.pickColor(e, this.canvasEl, this.circle, this.desc);
    });

    this.addEventListener('focus', e => {
      this.dropdownEl = this.querySelector('.dropdown');
      this.drawColors(this.canvasEl);
    });

    setTimeout(_ => {
      this.value = this.getAttribute('value') || '#CCC';
    })
  }

  drawColors(canvas) {
    const [width, height] = [this.dropdownEl.clientWidth, this.dropdownEl.clientHeight];
    [canvas.width, canvas.height] = [width, height];
    const context = canvas.getContext('2d');
  
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

  pickColor(event, canvas, circle, desc) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; //x position within the element.
    const y = event.clientY - rect.top;  //y position within the element.

    const context = canvas.getContext('2d');
    const imgData = context.getImageData(x, y, 1, 1);
    const [r, g, b] = imgData.data;
    const [h, s, l] = rgb2hsl(r, g, b);
    const txtColor = l < 0.5 ? '#FFF' : '#000';
    circle.style.top = (y - 6) + 'px';
    circle.style.left = (x - 6) + 'px';
    circle.style.borderColor = txtColor;

    const hex = `#${int2hex(r)}${int2hex(g)}${int2hex(b)}`.toUpperCase();
    desc.innerText = hex;
    canvas.dispatchEvent(new CustomEvent('select', {
      bubbles: true,  detail: { r, g, b, h, s, l, hex }
    }));
    this.value = hex;
  }
  
}
XColorPicker.define = define('x-color-picker', XColorPicker);

function int2hex(num)  {
  return  (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);
}

function rgb2hsl(r, g, b) {
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