import css from './list.css';
import {setCustomElementHTMLCss, setTargetValue, addCss, removeCss} from '../common/util';

export class XList extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this._isUlLiStyle; // if true, more features, e.g. collapse/expand
    this._menuStyle;   // if true, listening to mouseenter/mouseleave. set b attr, 'menu-style'
    this._selectFirst; // if true, highlight the first one, set by attr. 'select-first'
    this._selected;    // set by attribute 'selected'
    this._filterBy; // set by attribute 'filter-by' input element id that limits display of children
    this._template; // for dynamic html template updated by datalist
    this._datalist; // getter/setter variable for this.datalist
    this._overlayParent; // overlaycontainer for this
    this._css = css; // this is for child to override it
    this.rarget;
    return self;
  }

  get datalist() { return this._datalist; }
  set datalist(list) {
    this._datalist = list;
    this._renderWithTemplate(this._template, list);
  }

  connectedCallback() {
    this.target = document.getElementById(this.getAttribute('target'));
    this._menuStyle = this._menuStyle || (this.getAttribute('menu-style') !== null);
    this._selectFirst = this.getAttribute('select-first') === 'false' ? false : true;
    this._selected = this.getAttribute('selected');
    this._filterBy = this.getAttribute('filter-by');
    this._overlayParent = this.closest('x-overlay');

    addCss(this, this._css);  // this is for child to override it

    this._isUlLiStyle = this.firstElementChild && this.firstElementChild.tagName === 'UL';

    const tmplSuccess = this.querySelector('template:not(.error)');
    this._template = {
      varName: tmplSuccess && tmplSuccess.getAttribute('var-name'),
      success: (tmplSuccess || {}).innerHTML,  
      error: (this.querySelector('template.error') || {}).innerHTML
    };

    this._init();
    this._initHighlightAndSelect(this._selected, this._selectFirst);
    this._setInputElListener(this._overlayParent, this._filterBy); 
  }

  disconnectedCallback() {
    removeCss(this);
  }

  _init() {
    this.setAttribute('tabindex', 0);
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
          liEl.addEventListener('mouseenter', _ => this._toggleAriaExpanded(liEl));
        }
      });
      this.querySelectorAll('li').forEach(el => {
        el.addEventListener('click', this._liClickHandler.bind(this));
      });
    } else {
      this.addEventListener('click', event => {
        // find children of `x-list` children, not the event.target 
        let clicked = event.target;
        while (clicked.parentElement.tagName !== 'X-LIST') {
          clicked = clicked.parentElement;
        }
        this._fireSelect(clicked);
      });
    }

  }

  _initHighlightAndSelect(selected, select1st) {
    if (selected) {
      const liEl = this.querySelector('#'+selected);
      liEl.classList.add('x-highlighted');
      let expandable = liEl.parentElement.closest('li.x-has-list');
      while(expandable) {
        expandable.setAttribute('aria-expanded', '');
        expandable = expandable.parentElement.closest('li.x-has-list');
      }
    } else if (select1st) {
      const firstListItem = this.querySelector('li') || this.firstElementChild;
      firstListItem && firstListItem.classList.add('x-highlighted');
    }
    this._fireSelect(this.querySelector('.x-highlighted'));
  }

  // reset html with datalist. this is called with setter, e.g., `this.datalist = ...`;
  _renderWithTemplate(template, list = []) {
    this.innerHTML = ''; // reset HTMl

    function getElementFromHTML(template, data) {
      let htmlSuccess = template.success || 'missing template';
      htmlSuccess.match(/\${[^}]+}/g).forEach( expr => {
        htmlSuccess = htmlSuccess.replace(/\${([^}]+)}/g, (m, expr) => {
          const func = new Function(`return this.${expr};`);
          return `${func.bind(data)()}`;
        });
      });
      const container = document.createElement('div');
      container.insertAdjacentHTML('beforeend', htmlSuccess);
      const element = container.firstElementChild;
      template.varName && (element[template.varName] = data);
      return element;
    }

    if (list.length) {
      list.forEach( data => {
        const element = getElementFromHTML(template, data);
        this.insertAdjacentElement('beforeend', element);
      });
    } else {
      const tmplError = template.error || 'error with datalist';
      this.insertAdjacentHTML('beforeend', tmplError);
    }
  }

  _fireSelect(el) {
    const highlightedEl = this.querySelector('.x-highlighted');
    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    if (el && (el.offsetParent !== null)) { // if visible
      el.classList.add('x-highlighted');
      const evtName = this._menuStyle ? 'x-menuitem-selected' : 'x-listitem-selected';
      this.dispatchEvent(new CustomEvent(evtName, { bubbles: true, detail: el }));
      setTargetValue(this, el.getAttribute('value') || el.innerText);
    }
  }

  _toggleAriaExpanded(el) {
    const expanded = el.getAttribute('aria-expanded') !== null;
    if (expanded) {
      el.removeAttribute('aria-expanded');
    } else {
      if (this._menuStyle) {
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
    switch (event.code) {
    case 'Enter':
    case 'Space':
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
    if (['Enter', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event.code)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // this only works with simple list, not working with ul/li list
  _setInputElListener(overlayParent, filterBy) {
    const inputEl = (overlayParent || {})._triggerEl || document.getElementById(filterBy);
    const highlightedEl = this.querySelector('.x-highlighted');
    if (inputEl) {
      inputEl.addEventListener('keydown', event => {
        switch (event.code) {
        case 'Enter':
          this._fireSelect(highlightedEl || this.firstElementChild);
          break;
        case 'ArrowUp': // select previous
          this._highlightEl(-1);
          break;
        case 'ArrowDown': // select next
          this._highlightEl(+1);
          break;
        }
      });

      if (filterBy) {
        inputEl.addEventListener('input', event => {
          const val = (inputEl.value || inputEl.innerText).toLowerCase();
          Array.from(this.children).forEach(el => {
            el.style.display = el.innerText.toLowerCase().indexOf(val) === -1 ? 'none' : '';
          });
          overlayParent && overlayParent.open();
        });

        this.addEventListener('x-listitem-selected', event => {
          inputEl.value = inputEl.innerText = event.detail.innerText;
          overlayParent && overlayParent.close();
        });
      }
    }
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
    visibles[nxtIndex] && visibles[nxtIndex].classList.add('x-highlighted');
  }
}

if (!customElements.get('x-list')) {
  customElements.define('x-list', XList);
}