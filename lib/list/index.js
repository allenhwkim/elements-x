import css from './list.css';
import {setCustomElementHTMLCss} from '../common/util';

export class XList extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this._isUlLiStyle;
    this._menuStyle;
    this._selectFirst;
    this._selected;
    this._css = css;
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, null, this._css);
    this._isUlLiStyle = this.firstElementChild.tagName === 'UL';
    this._menuStyle = this._menuStyle || (this.getAttribute('menu-style') !== null);
    this._selectFirst = this.getAttribute('select-first') === 'false' ?
      false : true;
    this._selected = this.getAttribute('selected');
    this._init();
    this.select();
  }


  _init() {
    this.setAttribute('tabindex', -1);
    this.addEventListener('keydown', this._keydownHandler.bind(this));
    if (this._menuStyle) {
      this.addEventListener('mouseleave', e => {
        Array.from(this.querySelectorAll('[aria-expanded]')).forEach(el => {
          el.removeAttribute('aria-expanded');
        });
      });
    }

    if (this._isUlLiStyle) {
      this.querySelectorAll('li > ul').forEach(el => {
        const liEl = el.parentElement;
        liEl.classList.add('x-has-list');
        liEl.parentElement.setAttribute('aria-has-popup','');
        if (this._menuStyle) {
          liEl.addEventListener('mouseenter', _ => this._toggleAriaExpanded(liEl))
        }
      });
      this.querySelectorAll('li').forEach(el => {
        el.addEventListener('click', this._liClickHandler.bind(this));
      });
    } else {
      Array.from(this.children).forEach(el => {
        el.addEventListener('click', e => this._fireSelect(el));
      });   
    }
  }

  select() {
    if (this._selected) {
      const liEl = this.querySelector('#'+this._selected);
      liEl.classList.add('x-highlighted');
      let expandable = liEl;
      while(expandable = expandable.parentElement.closest('li.x-has-list')) {
        expandable.setAttribute('aria-expanded', '');
      }
    } else if (this._selectFirst) {
      (this.querySelector('li') || this.firstElementChild)
        .classList.add('x-highlighted');
    }
  }

  _fireSelect(el) {
    const highlightedEl = this.querySelector('.x-highlighted');
    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    el.classList.add('x-highlighted');
    el.dispatchEvent(new CustomEvent('x-list-select', {
      bubbles: true,
      detail: el
    }));
  }

  _toggleAriaExpanded(el) {
    const expanded = el.getAttribute('aria-expanded') !== null;
    if (expanded) {
      el.removeAttribute('aria-expanded');
    } else {
      if (this._menuStyle) {
        const siblingExpanded = Array.from(el.parentElement.children)
          .find(el => el.getAttribute('aria-expanded') !== null)
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
    switch (event.code) {
      case 'Enter':
      case 'Space':
        const highlightedEl = this.querySelector('.x-highlighted');
        const hasList = highlightedEl.classList.contains('x-has-list');
        highlightedEl && hasList &&
          this._toggleAriaExpanded(highlightedEl);
        (event.code === 'Enter') && this._fireSelect(highlightedEl);
        break;
      case 'ArrowUp': // select previous
      case 'ArrowLeft':
        this._highlightEl(-1);
        break;
      case 'ArrowDown': // select next
      case 'ArrowRight':
        this._highlightEl(+1);
        break;
    }
    event.stopPropagation();
    event.preventDefault();
  }

  _highlightEl(inc) {
    const allEls = this._isUlLiStyle ? 
      this.querySelectorAll('li') : this.children;
    const visibles = Array.from(allEls)
      .filter(el => el.offsetParent !== null);
    const highlightedEl = this.querySelector('.x-highlighted');
    const curIndex = visibles.indexOf(highlightedEl);
    const nxtIndex = (visibles.length + curIndex + inc) % visibles.length;

    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    visibles[nxtIndex].classList.add('x-highlighted');
  }
}

if (!customElements.get('x-list')) {
  customElements.define('x-list', XList);
}