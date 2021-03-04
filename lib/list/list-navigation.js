import {setTargetValue} from '../common/util';

export class ListNavigation {
  constructor(listEl) {
    this.el = listEl;
  }

  setKeyAndMouseListener() {
    this.el.setAttribute('tabindex', 0);
    this.el.addEventListener('keydown', this._keydownHandler.bind(this));

    this.el.addEventListener('click', event => {
      // find children of `x-list` children, not the event.target 
      let clicked = event.target;
      while (clicked.parentElement.tagName !== 'X-LIST') {
        clicked = clicked.parentElement;
      }
      this._fireSelect(clicked);
    });
  }

  setHighlightAndSelect(selected, select1st) {
    const selectedListItem = this.el.querySelector('#'+selected);
    if (selectedListItem) {
      selectedListItem.classList.add('x-highlighted');
    } else if (select1st) {
      const firstListItem = this.el.querySelector('li') || this.el.firstElementChild;
      firstListItem && firstListItem.classList.add('x-highlighted');
    }
    this._fireSelect(this.el.querySelector('.x-highlighted'));
  }

  _keydownHandler(event) {
    if (['Enter'].includes(event.code)) {
      const highlightedEl = this.el.querySelector('.x-highlighted');
      this._fireSelect(highlightedEl);
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.code)) {
      this._highlightEl(-1);
    } else if (['ArrowDown', 'ArrowRight'].includes(event.code)) {
      this._highlightEl(+1);
    }
    if (['Enter', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event.code)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  _fireSelect(el) {
    const highlightedEl = this.el.querySelector('.x-highlighted');
    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    if (el && (el.offsetParent !== null)) { // if visible
      el.classList.add('x-highlighted');
      this.el.dispatchEvent(new CustomEvent('x-listitem-selected', { bubbles: true, detail: el}));
      const target = document.getElementById(this.el.getAttribute('target'));
      target && setTargetValue(target, el.getAttribute('value') || el.innerText);
    }
  }

  _highlightEl(inc) {
    const visibles = Array.from(this.el.children).filter(el => el.offsetParent !== null);
    const highlightedEl = this.el.querySelector('.x-highlighted');
    const curIndex = visibles.indexOf(highlightedEl);
    const nxtIndex = (visibles.length + curIndex + inc) % visibles.length;

    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    visibles[nxtIndex] && visibles[nxtIndex].classList.add('x-highlighted');
  }
}