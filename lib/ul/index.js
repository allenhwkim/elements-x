import { fromEvent, timer} from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

import css from './ul.css';
import {addCss, removeCss, define} from '../common/util';

function observeDOMChange(el, options={}) {
  options = Object.assign({debounce: 100, expires: 2000}, options);

  const observer = new MutationObserver(list =>  {
    el.dispatchEvent(new CustomEvent('dom-change', {detail: list}));
  });
  observer.observe(el, {attributes: false, childList: true, subtree: true });

  let pipeFn;
  if (options.expires) {
    setTimeout(_ => observer.disconnect(), options.expires);
    pipeFn = takeUntil(timer(options.expires));
  } else {
    pipeFn = tap(_ => _); 
  }

  // to fire first event
  setTimeout(_ => el.dispatchEvent(new CustomEvent('dom-change')));
  return fromEvent(el, 'dom-change')
    .pipe(pipeFn, debounceTime(options.debounce));
}


export class XUl extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this._selected; // set by attribute 'selected'
    this._dropdown; // set by class 'dropdown'
    return self;
  }

  connectedCallback() {
    addCss(this, css);  // this is for child to override it
    observeDOMChange(this) // debounce .1s, expires in 1s
      .subscribe(_ => {
        this._init();
        this._initHighlightAndSelect(this._selected);
      });
  }

  disconnectedCallback() {
    removeCss(this);
  }

  _init() {
    this._selected = this.getAttribute('selected');
    this._expandAll = this.getAttribute('expanded');
    this._dropdown = this.classList.contains('dropdown');
    this.setAttribute('tabindex', 0);
    const keydownHandler = this._keydownHandler.bind(this);
    this.removeEventListener('keydown', keydownHandler);
    this.addEventListener('keydown', keydownHandler);

    if (this._dropdown) {
      const mouseLeaveListener = function(e) {
        Array.from(this.querySelectorAll('[aria-expanded]')).forEach(el => {
          el.removeAttribute('aria-expanded');
        });
      };
      this.removeEventListener('mouseleave', mouseLeaveListener);
      this.addEventListener('mouseleave', mouseLeaveListener);
    }

    this.querySelectorAll('li > ul, li > * > ul').forEach(el => {
      const liEl = el.closest('li');
      liEl.classList.add('x-has-list');
      liEl.parentElement.setAttribute('aria-has-popup','');
      this._expandAll && liEl.setAttribute('aria-expanded', '');
      if (this._dropdown) {
        const mouseEnterHandler = this._toggleAriaExpanded(liEl);
        liEl.removeEventListener('mouseenter', _ => mouseEnterHandler);
        liEl.addEventListener('mouseenter', _ => mouseEnterHandler);
      }
    });
    this.querySelectorAll('li').forEach(el => {
      const clickHandler = this._liClickHandler.bind(this);
      el.removeEventListener('click', clickHandler);
      el.addEventListener('click', clickHandler);
    });
  }

  _initHighlightAndSelect(selected) {
    if (selected) {
      const liEl = this.querySelector('#'+selected);
      if (liEl) {
        liEl.classList.add('x-highlighted');
        let expandable = liEl.parentElement.closest('li.x-has-list');
        while(expandable) { 
          expandable.setAttribute('aria-expanded', '');
          expandable = expandable.parentElement.closest('li.x-has-list');
        }
      }
    }
    this._fireSelect(this.querySelector('.x-highlighted'));
  }

  _fireSelect(el) {
    const highlightedEl = this.querySelector('.x-highlighted');
    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    if (el && (el.offsetParent !== null)) { // if visible
      el.classList.add('x-highlighted');
      this.dispatchEvent(new CustomEvent('x-select', { bubbles: true, detail: el }));
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
    if (event.target.isSameNode(el)) {
      el.classList.contains('x-has-list') && this._toggleAriaExpanded(el);
    } else {
      this._fireSelect(el);
    }
    event.stopPropagation();
  }

  _keydownHandler(event) {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) 
      return;

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
XUl.define = define('x-ul', XUl);
