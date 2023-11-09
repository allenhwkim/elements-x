import { addCss, removeCss } from '../util';
import { TouchSwipe } from '../touch-swipe';
import * as cssM from './resize.css?inline';
const css = cssM.default;

export class Resize extends HTMLElement {
  private isHandle: boolean = false;
  private containerEl: any;
  private touchStart: any;

  connectedCallback() {
    addCss(this.tagName, css);
    this.isHandle = 
      this.getAttribute('top') !== null || 
      this.getAttribute('bottom') !== null;

    if (this.isHandle) {
      new TouchSwipe(this);
      this.containerEl = this.parentElement as HTMLElement;
      document.addEventListener('x-swipe', this.handleListener);
    } else {
      setTimeout( () => { // svelte runs too fast
        Array.from(this.children).slice(0, -1).forEach(el => {
          const resizeBarEl = document.createElement('div');
          resizeBarEl.classList.add('resize-bar');
          new TouchSwipe(resizeBarEl);
          el.insertAdjacentElement('afterend', resizeBarEl);
        })
      })
      document.addEventListener('x-swipe', this.resizeListener);
    }
  }

  disconnectedCallback() {
    if (this.isHandle) {
      document.removeEventListener('x-swipe', this.handleListener);
    } else {
      document.removeEventListener('x-swipe', this.resizeListener);
    }
    removeCss(this.tagName);
  }

  resizeListener = (event: any)  => {
    const {type, touchStaEl, x0, y0, x2, y2} = event.detail;
    const prevEl = touchStaEl.previousElementSibling;
    const nextEl = touchStaEl.nextElementSibling;
    if (touchStaEl.parentElement !== this) return;

    if (type === 'start') {
      touchStaEl.classList.add('active');
      this.touchStart = {
        prevElW: prevEl.offsetWidth, 
        prevElH: prevEl.offsetHeight,
        nextElW: nextEl.offsetWidth, 
        nextElH: nextEl.offsetHeight,
      }
      this.dispatchEvent(new CustomEvent('resize-start', {bubbles: true}));
    } else if (type === 'move') {
      if (this.getAttribute('width') !== null) {
        prevEl.style.width = Math.max(this.touchStart.prevElW + (x2 - x0), 20) + 'px';
        nextEl.style.width = Math.max(this.touchStart.nextElW - (x2 - x0), 20) + 'px';
      } else if (this.getAttribute('height') !== null) {
        prevEl.style.height = Math.max(this.touchStart.prevElH + (y2 - y0), 20) + 'px';
        nextEl.style.height = Math.max(this.touchStart.nextElH - (y2 - y0), 20) + 'px';
      }
      this.dispatchEvent(new CustomEvent('resize-move', {bubbles: true}));
    } else if (type === 'end') {
      touchStaEl.classList.remove('active');
      this.dispatchEvent(new CustomEvent('resize-end', {bubbles: true}));
    } 
  }

  handleListener =  (event: any) => {
    const {type, x0, y0, x1, y1, x2, y2, distanceX, distanceY, distance} = event.detail;
    const {duration, speed, distance0, duration0, speed0, touchStaEl, orgEvent } = event.detail;
    if (touchStaEl !== this) return;

    const dx = this.getAttribute('left') !== null ? x0 - x2 : x2 - x0;
    const dy = this.getAttribute('top') !== null ? y0 - y2 : y2 - y0;

    if (type === 'start') {
      this.classList.add('x-resizing');
      this.containerEl.style.userSelect = 'none';
      const absolutePos = window.getComputedStyle(this.containerEl).position === 'absolute';
      this.touchStart = {
        width: this.containerEl.offsetWidth,
        height: this.containerEl.offsetHeight,
        top: absolutePos ? this.containerEl.offsetTop : undefined,
        left: absolutePos ? this.containerEl.offsetLeft : undefined,
      }
    }
    if (type === 'move') {
      this.containerEl.style.width = Math.max(this.touchStart.width + dx, 64) + 'px';
      this.containerEl.style.height = Math.max(this.touchStart.height + dy, 32) + 'px';
      if (this.touchStart.top !== undefined && this.getAttribute('top') !== null) {
        this.containerEl.style.top = `${this.touchStart.top - dy}px`;
      }
      if (this.touchStart.left !== undefined && this.getAttribute('left') !== null) {
        this.containerEl.style.left = `${this.touchStart.left - dx}px`;
      }
    }
    if (type === 'end') {
      this.containerEl.style.userSelect = '';
      this.classList.remove('x-resizing');
    } 
  }
}