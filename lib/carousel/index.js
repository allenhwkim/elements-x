import html from './carousel.html';
import css from './carousel.css';
import {setHTML, addCss, removeCss} from '../common/util';

class XCarousel extends HTMLElement {
  // adoptedCallback() {}

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    setHTML(this, html).then(_ => {
      this._initHTMLAndEvents();
      this._show(this._selected, false); // TODO, scroll
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }

  _initHTMLAndEvents() {
    this._selected = +this.getAttribute('selected') || 0;
    this._items = Array.from(this.querySelector('.x-items').children);

    this.querySelector('.x-prev.x-button').addEventListener('click', e => this._showPrev());
    this.querySelector('.x-next.x-button').addEventListener('click', e => this._showNext());
    this._items.forEach((item, i) => {
      item.addEventListener('click', _ => this._show(i));

      const btnEl = document.createElement('button');
      btnEl.classList.add('x-button');
      (this._selected === i) && btnEl.classList.add('x-active');
      btnEl.innerText = '' + i;
      btnEl.addEventListener('click', e => {
        this._show(i);
        e.stopPropagation();
      });
      this.querySelector('.x-shortcuts').appendChild(btnEl);
    });

    this.setAttribute('tabindex', '-1');
    this.addEventListener('keyup', event => {
      (event.key === 'ArrowLeft') && this._showPrev();
      (event.key === 'ArrowRight') && this._showNext();
    });
  }

  _show(number, scroll=true) {
    this._items[this._selected].classList.remove('x-active');
    this._selected = +number;
    const target = this._items[this._selected];
    if (scroll) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else {
      setTimeout(_ => {
        // console.log('............', target.offsetLeft)
        this.querySelector('.x-items').scrollLeft = target.offsetLeft;
      }, 1000);
    }
    this._items[this._selected].classList.add('x-active');
    this.querySelector('.x-shortcuts .x-active').classList.remove('x-active');
    Array.from(this.querySelectorAll('.x-shortcuts .x-button'))[this._selected]
      .classList.add('x-active');
  }

  _showPrev() {
    const index = (this._selected + this._items.length - 1) % this._items.length;
    this._show(index);
  }

  _showNext() {
    const index = (this._selected + this._items.length + 1) % this._items.length;
    this._show(index);
  }
}

if (!customElements.get('x-carousel')) {
  customElements.define('x-carousel', XCarousel);
}