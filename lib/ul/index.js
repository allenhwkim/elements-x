import css from './ul.css';
import {addCss, removeCss} from '../common/util';

export class XUl extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this._selected; // set by attribute 'selected'
    this._dropdown; // set by class 'dropdown'
    return self;
  }

  connectedCallback() {
    addCss(this, css);  // this is for child to override it

    this._init();
    this._initHighlightAndSelect(this._selected);
  }

  disconnectedCallback() {
    removeCss(this);
  }

  _init() {
    this._selected = this.getAttribute('selected');
    this._dropdown = this.classList.contains('dropdown');
    this.setAttribute('tabindex', 0);
    this.addEventListener('keydown', this._keydownHandler.bind(this));

    if (this._dropdown) {
      this.addEventListener('mouseleave', e => {
        Array.from(this.querySelectorAll('[aria-expanded]')).forEach(el => {
          el.removeAttribute('aria-expanded');
        });
      });
    }

    this.querySelectorAll('li > ul').forEach(el => {
      const liEl = el.parentElement;
      liEl.classList.add('x-has-list');
      liEl.parentElement.setAttribute('aria-has-popup','');
      if (this._dropdown) {
        liEl.addEventListener('mouseenter', _ => this._toggleAriaExpanded(liEl));
      }
    });
    this.querySelectorAll('li').forEach(el => {
      el.addEventListener('click', this._liClickHandler.bind(this));
    });

  }

  _initHighlightAndSelect(selected) {
    if (selected) {
      const liEl = this.querySelector('#'+selected);
      liEl.classList.add('x-highlighted');
      let expandable = liEl.parentElement.closest('li.x-has-list');
      while(expandable) { 
        expandable.setAttribute('aria-expanded', '');
        expandable = expandable.parentElement.closest('li.x-has-list');
      }
    }
    this._fireSelect(this.querySelector('.x-highlighted'));
  }

  _fireSelect(el) {
    const highlightedEl = this.querySelector('.x-highlighted');
    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    if (el && (el.offsetParent !== null)) { // if visible
      el.classList.add('x-highlighted');
      const evtName = 'x-selected';
      this.dispatchEvent(new CustomEvent(evtName, { bubbles: true, detail: el }));
    }
  }

  _toggleAriaExpanded(el) {
    const expanded = el.getAttribute('aria-expanded') !== null;
    if (expanded) {
      el.removeAttribute('aria-expanded');
    } else {
      if (this._dropdown) {
        const siblingExpanded = Array.from(el.parentElement.children)
          .find(el => el.getAttribute('aria-expanded') !== null);
        siblingExpanded && siblingExpanded.removeAttribute('aria-expanded');
      }
      el.setAttribute('aria-expanded', '');
    }
  }

  _liClickHandler(event) {
    const el = event.target.closest('li');
    this._fireSelect(el);
    el.classList.contains('x-has-list') && this._toggleAriaExpanded(el);
    event.stopPropagation();
  }

  _keydownHandler(event) {
    const highlightedEl = this.querySelector('.x-highlighted');
    const hasList = highlightedEl.classList.contains('x-has-list');
    if (['Enter', 'Space'].includes(event.code)) {
      highlightedEl && hasList && this._toggleAriaExpanded(highlightedEl);
      (event.code === 'Enter') && this._fireSelect(highlightedEl);
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.code)) {
      this._highlightEl(-1);
    } else if (['ArrowDown', 'ArrowRight'].includes(event.code)) {
      this._highlightEl(+1);
    }
    if (['Enter', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event.code)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  _highlightEl(inc) {
    const allEls = this.querySelectorAll('li');
    const visibles = Array.from(allEls)
      .filter(el => el.offsetParent !== null);
    const highlightedEl = this.querySelector('.x-highlighted');
    const curIndex = visibles.indexOf(highlightedEl);
    const nxtIndex = (visibles.length + curIndex + inc) % visibles.length;

    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    visibles[nxtIndex] && visibles[nxtIndex].classList.add('x-highlighted');
  }
}

if (!customElements.get('x-ul')) {
  customElements.define('x-ul', XUl);
}