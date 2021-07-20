export class XTouchSwipe {

  constructor(el) {
    this.touchStaX;
    this.toucnendX; // touch position
    this.touchSta;
    this.touchEnd;  // touch time

    el = el || document.body;
    if (el.getAttribute('x-swipe') === null) {
      el.setAttribute('x-swipe', '');
      el.addEventListener('touchstart', this.setTouchSta.bind(this));
      el.addEventListener('mousedown', this.setTouchSta.bind(this));
      el.addEventListener('touchend', this.setTouchEnd.bind(this));
      el.addEventListener('mouseup', this.setTouchEnd.bind(this));
    }
  }

  handleGesture() {
    if (Math.abs(this.touchEndX - this.touchStaX) < 80) return; // min 80px distance
    if ((this.touchEnd - this.touchSta) > 500) return;          // max 500ms dragging

    const direction = this.touchEndX < this.touchStaX ? 'left' : 'right';
    const event = new CustomEvent('x-swipe', { bubbles: true, detail: direction });
    document.body.dispatchEvent(event);
  }

  setTouchSta(e) {
    this.touchStaX = e.type === 'touchstart' ? e.changedTouches[0].screenX : e.screenX;
    this.touchSta = new Date().getTime();
  }

  setTouchEnd(e) {
    this.touchEndX = e.type === 'touchend' ? e.changedTouches[0].screenX : e.screenX;
    this.touchEnd = new Date().getTime();
    this.handleGesture();
  }

}


