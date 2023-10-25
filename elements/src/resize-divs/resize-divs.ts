import { TouchSwipe, addCss, removeCss } from '../../lib';

const css = /*css*/ `
  resize-divs { display: block; }
  resize-divs[width] { display: flex; }
  resize-divs > :not(.resize-bar) { overflow: hidden; }
  resize-divs:has(.resize-bar.active) { user-select: none; }
  resize-divs > .resize-bar { background: #CCC; display: block; }
  resize-divs > .resize-bar:is(.active, :hover) { background: #00F; }
  resize-divs[width] > .resize-bar { cursor: col-resize ; width: 2px;}
  resize-divs[height] > .resize-bar { cursor: row-resize; height: 2px;}
`;

export class ResizeDivs extends HTMLElement {
  private touchStart: any;

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

  connectedCallback() {
    setTimeout( () => { // svelte runs too fast
      Array.from(this.children).slice(0, -1).forEach(el => {
        const resizeBarEl = document.createElement('div');
        resizeBarEl.classList.add('resize-bar');
        new TouchSwipe(resizeBarEl);
        el.insertAdjacentElement('afterend', resizeBarEl);
      })
    })

    document.addEventListener('x-swipe', this.resizeListener);
    addCss(this.tagName, css);
  }

  disconnectedCallback() {
    document.removeEventListener('x-swipe', this.resizeListener);
    removeCss(this.tagName);
  }
}