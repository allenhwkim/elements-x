import { TouchSwipe, addCss, removeCss } from '../../lib';

const css = /*css*/`
  resize-handle { position: absolute; }
  resize-handle:after { content: ' '; display: block; width: 12px; height: 12px; opacity: .5; }
  resize-handle:hover:after { width: 16px; height: 16px; opacity: 1; }

  resize-handle[top][left] { top: 1px; left: 1px; cursor: nw-resize; }
  resize-handle[top][left]:after {
    background: linear-gradient( -45deg, #0000, #0000 60%, #000 60%, #000, #0000, #0000 70%, #000 70%, #000, #0000, #0000 80%, #000 80%, #000, #0000, #0000 90%, #000 90%, #000 )
  }

  resize-handle[top][right] { top: 1px; right: 1px; cursor: ne-resize; }
  resize-handle[top][right]:after {
    background: linear-gradient( 45deg, #0000, #0000 60%, #000 60%, #000, #0000, #0000 70%, #000 70%, #000, #0000, #0000 80%, #000 80%, #000, #0000, #0000 90%, #000 90%, #000 )
  }

  resize-handle[bottom][left] { bottom: 1px; left: 1px; cursor: sw-resize; }
  resize-handle[bottom][left]:after {
    background: linear-gradient( 45deg, #000 10%, #000, #0000, #0000 20%, #000 20%, #000, #0000, #0000 30%, #000 30%, #000, #0000, #0000 40%, #000 40%, #000, #0000, #0000 50% )
  }

  resize-handle[bottom][right] { bottom: 1px; right: 1px; cursor: se-resize; }
  resize-handle[bottom][right]:after {
    background: linear-gradient( -45deg, #000 10%, #000, #0000, #0000 20%, #000 20%, #000, #0000, #0000 30%, #000 30%, #000, #0000, #0000 40%, #000 40%, #000, #0000, #0000 50% )
  }`;
// usage example: 
// <div>
//   A div contains resize-handle
//   <resize-handle bottom right></resize-handle>
// </div>

export class ResizeHandle extends HTMLElement {
  private containerEl: any;
  private touchStart: any;

  constructor(...args: any) {
    super(...(args as []));
  }

  connectedCallback() {
    new TouchSwipe(this);
    this.containerEl = this.parentElement as HTMLElement;
    document.addEventListener('x-swipe', this.touchListener);
    addCss(this.tagName, css);
  }

  disconnectedCallback() {
    document.removeEventListener('x-swipe', this.touchListener);
    removeCss(this.tagName);
  }

  touchListener =  (event: any) => {
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
      if (this.touchStart.left !== undefined && this.getAttribute('left')) {
        this.containerEl.style.left = `${this.touchStart.left - dx}px`;
      }
    }
    if (type === 'end') {
      this.containerEl.style.userSelect = '';
      this.classList.remove('x-resizing');
    } 
  }
}

