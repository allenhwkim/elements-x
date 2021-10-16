import html from './overlay.html';
import css from './overlay.css';
import { trapFocus } from './trap-focus';
import { setOverlayPosition } from './set-overlay-position';
import { setHTML, addCss, removeCss, define } from '../common/util';

const randId = `x-${parseInt('' + Math.random() * 10000)}`;
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
    this._css = css; // this is for child to override it
    this.triggerEl;
    this.showArrow = false;

    this._evtWinResize = this._onWinResize.bind(this);
    this._evtDocClick = this._onDocClick.bind(this);
    this._evtDocKeydown = this._onDocKeydown.bind(this);
    this.debug = this.getAttribute('debug') !== null;

    return self;
  }

  connectedCallback() {
    addCss(this, this._css); // this is for child to override it
    setTimeout(_ => { // for a framework like angular. It's okay to init slowly bcoz it's hidden
      setHTML(this, html).then(_ => {
        this._setOverlay();

        window.addEventListener('resize', this._evtinResize);
        document.addEventListener('keydown', this._evtDocKeydown);
        document.addEventListener('click', this._evtDocClick);

        (this.getAttribute('opened') !== null) && this.open('attr:opened');
      });
    }, 500);
  }

  disconnectedCallback() {
    removeCss(this);
    window.removeEventListener('resize', this._evtWinResize);
    document.removeEventListener('keydown', this._evtDocKeydown);
    document.removeEventListener('click', this._evtDocClick); 
  }

  _setOverlay() {
    this.showArrow = this.showArrow || this.getAttribute('show-arrow');
    this.showArrow = this.showArrow === '' ? true : Boolean(this.showArrow);
    this._setTriggerActions(); // mousedown, focus, click, blur
    this._setXElementTarget(); // set target attribute of x-* element
  }

  _setXElementTarget() {
    const firstChild = this.querySelector('.x-overlay').firstElementChild;
    const is1stXElem = firstChild && firstChild.tagName.match(/^X-/);
    this.debug && console.log('<x-overlay>', {firstChild, is1stXElem, triggerEl: this.triggerEl});
    if (is1stXElem && !firstChild.target) {
      firstChild.target = this.triggerEl;
    }
  }

  _onWinResize(event) { this.close('window:resize'); }
  _onDocClick(event) {
    const closetOverlayEl = event.target.closest(this.tagName.toLowerCase());
    if (!this.triggerEl.contains(event.target) && !this.isEqualNode(closetOverlayEl)) {
      this.debug && console.log({'<x-overlay> event.target': event.target}, this.triggerEl);
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
    setOverlayPosition(this.triggerEl, this, this.showArrow);

    const custEvent = new CustomEvent('x-overlay-open', {bubbles: true, detail: by});
    this.dispatchEvent(custEvent);
    this.debug && console.log('<x-overlay> open', by);
  }

  close(by) {
    if (by && (this._overlayClicked || this.style.display === 'none')) {
      return false;
    }
    this.style.display = 'none';

    const triggerActions = (this.getAttribute('trigger-actions') || 'click,focus').split(',');
    if (!triggerActions.includes('focus')) { // prevent reopening close->open
      this._prevActiveElement && this._prevActiveElement.focus();
    }
  
    const custEvent = new CustomEvent('x-overlay-close', {bubbles: true, detail: by});
    this.dispatchEvent(custEvent);
    this.debug && console.log('<x-overlay> close', by);
  }

  _setTriggerActions() {
    const triggerId = this.getAttribute('trigger');
    if (triggerId) {
      this.triggerEl = document.getElementById(triggerId);
    } else if (this.previousElementSibling.tagName.toLowerCase() === 'x-input') {
      this.triggerEl = this.previousElementSibling.querySelector('input');
    } else {
      this.triggerEl = this.previousElementSibling;
    }

    if (this.triggerEl) {
      this._id = this.getAttribute('id') || randId;
      this.setAttribute('id', this._id);
      this.style.display = 'none';

      this._setTriggerEventListener();
      this.addEventListener('mousedown', _ => { // mousedown happens before blur
        this._overlayClicked = true; // prevent close by blur event
        setTimeout(_ => this._overlayClicked = false, 100);
      });
      this.addEventListener('mouseenter', _ => { // mousedown happens before blur
        this._overlayMouseEntered = true; // prevent close by mouseleave event
      });
      this.addEventListener('mouseleave', _ => { // mousedown happens before blur
        this._overlayMouseEntered = false; // prevent close by mouseleave event
        this.close('trigger:mouseleave');
      });
      // delay little for all focusable elements rendering
      setTimeout(_ => trapFocus(this) );  // TODO if DOM changed, do it again
      this.close('trigger:init');
    } else {
      console.error('[x-trigger] invalid trigger', triggerId);
    }
  }

  // e.g, eventListener click, focus, blur for INPUT element
  _setTriggerEventListener() {
    const el = this.triggerEl;
    const triggerActions = (
      this.getAttribute('trigger-actions') ||
      this.triggerActions ||
      'click,focus'
    ).split(','); 
    const closeActions = (
      this.getAttribute('close-actions') ||
      this.closeActions ||
      'blur'
    ).split(','); 

    el.setAttribute('aria-controlls', this._id);
    el.setAttribute('aria-activedescendant', `${this._id}-selected`);
    triggerActions.forEach(action => { // focus, click, mouseenter
      el.addEventListener(action.trim(), _ => this.open(`trigger:${action.trim()}`));
    });
    closeActions.forEach(action => { // blur, mouseleave
      el.addEventListener(action.trim(), _ => {
        if (action.trim() === 'blur') {
          if (this._overlayClicked || this.style.display === 'none') {
            return false;
          }
          setTimeout(_ => this.close(`trigger:${action.trim()}`), 100);
        } else {
          setTimeout(_ => {
            if (this._overlayMouseEntered || this.style.display === 'none') {
              return false;
            }
            this.close(`trigger:${action.trim()}`);
          }, 100);
        }

      });
    });
  }

}
XOverlay.define = define('x-overlay', XOverlay);