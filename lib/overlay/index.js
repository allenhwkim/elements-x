import html from './overlay.html';
import css from './overlay.css';
import { trapFocus } from './trap-focus';
import { setOverlayPosition } from './set-overlay-position';
import { setCustomElementHTMLCss } from '../common/util';

const randId = `x-${parseInt('' + Math.random() * 10000)}`
/**
 * 0. open overlay when trigger element focused or clicked
 * 1. close overlay when document clicked
 * 2. when esc pressed close overlay
 * 3. when open, trap focus within it.
 * 4. position overlay underneath or over the trigger element
 * 5. when closed, focus back to trigger element
 * 
 * 6. set trigger-actions, e.g. click, focus, mouseover
 * 7. set close-actions, e.g. mouseleave, blur
 * 8. set arrow display, if set it as centered 
 */
export class XOverlay extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    this.triggerId;
    this.triggerActions = 'focus';
    this.closeActions = 'blur';
    this.showArrow = false;
    this._html = html;
    this._css = css;

    this._evtWinResize = this._onWinResize.bind(this);
    this._evtDocClick = this._onDocClick.bind(this);
    this._evtDocKeydown = this._onDocKeydown.bind(this);

    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, this._html, this._css).then(_ => {
      this._setOverlay();

      window.addEventListener('resize', this._evtinResize);
      document.addEventListener('keydown', this._evtDocKeydown);
      document.addEventListener('click', this._evtDocClick);
    });
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._evtWinResize);
    document.removeEventListener('keydown', this._evtDocKeydown);
    document.removeEventListener('click', this._evtDocClick); 
  }

  _setOverlay() {
    const triggerId = this.getAttribute('trigger');
    this.showArrow = this.showArrow || this.getAttribute('show-arrow');
    this.showArrow = this.showArrow === '' ? true : Boolean(this.showArrow);
    this.triggerActions = (this.getAttribute('trigger-actions') || this.triggerActions).split(',');
    this.closeActions = (this.getAttribute('close-actions') || this.closeActions).split(',');
    this._triggerEl = document.getElementById(triggerId);

    if (triggerId && this._triggerEl) {
      this._id = this.getAttribute('id') || randId;
      this.setAttribute('id', this._id);
      this.style.display = 'none';

      this._setTriggerEventListener();
      this.addEventListener('mousedown', _ => { // mousedown happens before blur
        this._overlayClicked = true; // prevent close by blur event
        setTimeout(_ => this._overlayClicked = false, 100);
      })
      // delay little for all focusable elements rendering
      setTimeout(_ => trapFocus(this) );  // TODO if DOM changed, do it again
      this.close('trigger:init');
    } else {
      console.error('[x-trigger] invalid trigger', triggerId);
    }
  }

  _onWinResize(event) { this.close('window:resize'); }
  _onDocClick(event) {
    const closetOverlayEl = event.target.closest(this.tagName.toLowerCase());
    if (!event.target.isEqualNode(this._triggerEl) && !this.isEqualNode(closetOverlayEl)) {
      this.close('document:click');
    }
  }

  _onDocKeydown(event) {
    const visible = this.style.display === 'block';
    (event.key === 'Escape' && visible) && this.close('document:escape');
  }
    
  open(by) {
    if (this.style.display === 'block') {
      return false;
    }
    this._prevActiveElement = document.activeElement;
    this.style.display = 'block';
    setOverlayPosition(this._triggerEl, this, this.showArrow);

    const custEvent = new CustomEvent('x-overlay-open', {bubbles: true, detail: by});
    this.dispatchEvent(custEvent);
    // console.log('open', by);
  }

  close(by) {
    if (by && (this._overlayClicked || this.style.display === 'none')) {
      return false;
    }
    this.style.display = 'none';

    if (!this.triggerActions.includes('focus')) { // prevent close->open
      this._prevActiveElement && this._prevActiveElement.focus();
    }
  
    const custEvent = new CustomEvent('x-overlay-close', {ßßbubbles: true, detail: by});
    this.dispatchEvent(custEvent)
    // console.log('close', by);
  }

  _setTriggerEventListener() {
    const el = this._triggerEl;
    el.setAttribute('aria-controlls', this._id);
    el.setAttribute('aria-activedescendant', `${this._id}-selected`);
    this.triggerActions.forEach(action => { // focus, click, mouseenter
      el.addEventListener(action.trim(), _ => this.open(`trigger:${action.trim()}`));
    });
    this.closeActions.forEach(action => { // blur, mouseleave
      el.addEventListener(action.trim(), _ => {
        if (this._overlayClicked || this.style.display === 'none') {
          return false;
        }
        setTimeout(_ => this.close(`trigger:${action.trim()}`), 100)
      });
    });
  }

}

if (!customElements.get('x-overlay')) {
  customElements.define('x-overlay', XOverlay);
}