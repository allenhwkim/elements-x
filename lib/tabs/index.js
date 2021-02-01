import css from './tabs.css';
import { setCustomElementHTMLCss } from '../common/util';

class XTabs extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    this.selected;
    this.tabEls;
    this.contentsEls;
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, null, css).then( _ => {
      this._initData();
    });
  }

  _initData() {
    this.selected = this.getAttribute('selected');
    this.tabsEls = Array.from(this.querySelectorAll('[tab-for]'));
    this.contentsEls = Array.from(this.querySelectorAll('[contents-for]'));
    this._setAttributes();
    this._addEventListeners();
    this._selectTabAndContents(this.selected, false);
  }

  _setAttributes() { // for accessibility
    this.querySelector('.tabs').setAttribute('role', 'tablist');
    this.querySelector('.tabs')
      .insertAdjacentHTML('beforeend', '<div class="underline-bar"></div>');

    this.tabsEls.forEach(el => {
      const tabId = el.getAttribute('tab-for');
      el.setAttribute('id', tabId);
      el.setAttribute('role', 'tab');
      el.setAttribute('aria-controls', `${tabId}-contents`);
      el.setAttribute('tabindex', '0');
    });

    this.contentsEls.forEach(el => {
      const contentsId = el.getAttribute('contents-for');
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('id', `${contentsId}-contents`);
      el.setAttribute('aria-labelledby', contentsId);
      el.setAttribute('tabindex', '0');
    });
  }

  _addEventListeners() {
    this.tabsEls.forEach(el => {
      el.addEventListener('click', this._clickHandler.bind(this));
      el.addEventListener('keydown', this._keydownHandler.bind(this));
    });
  }

  _selectTabAndContents(tabId, setFocus=true) {
    if (!tabId) {
      const tabEl =
        this.querySelector('[tab-for][aria-selected]') || // user-defined
        this.querySelector('[tab-for]'); // or first one
      tabId = tabEl && tabEl.getAttribute('tab-for');
    }
    this._selectTab(tabId, setFocus);
    this._selectContents(tabId);
  }

  _selectTab(tabId, setFocus) {
    const tabEl = this.querySelector(`[tab-for="${tabId}"]`);
    this.tabsEls.filter(el => !el.isEqualNode(tabEl))
      .forEach(el => {
        el.removeAttribute('aria-selected'); // new way
        el.removeAttribute('tabindex');
      });

    tabEl.setAttribute('aria-selected', 'true'); // new way
    tabEl.setAttribute('tabindex', '0');

    const inkBar = this.querySelector('.underline-bar');
    if (inkBar) {
      setTimeout(_ => { // needs little time for offsetWidth/offsetLeft
        Object.assign(inkBar.style, {
          width: tabEl.offsetWidth +'px', 
          left: tabEl.offsetLeft +'px'
        });
      });
    }
    setFocus && tabEl.focus();
  }

  _selectContents(tabId) {
    const contentsEl = this.querySelector(`[contents-for="${tabId}"]`);

    if (contentsEl) {
      this.contentsEls.filter(el => !el.isEqualNode(contentsEl))
        .forEach(el => {
          el.classList.remove('selected');   // old way
          el.removeAttribute('aria-selected'); // new way
        });

      contentsEl.classList.add('selected'); // old way
      contentsEl.setAttribute('aria-selected', 'true'); // new way
    }
  }

  _clickHandler(event) {
    const tabEl = event.target.closest('x-tabs [tab-for]');
    tabEl && this._selectTabAndContents(tabEl.getAttribute('tab-for'));
  }

  _keydownHandler(event) {
    const availTabs = 
      this.tabsEls.filter(el => el.getAttribute('disabled') === null);
    const inc = event.keyCode === 39 ? 1 : // Right
      event.keyCode === 37 ? -1 : 0; // Left
    const curSelectedTab = this.tabsEls.find(
      el => el.getAttribute('aria-selected') !== null
    );
    const curIndex = availTabs.indexOf(curSelectedTab);
    const nxtIndex = (availTabs.length + curIndex + inc) % availTabs.length;
    const tabId = availTabs[nxtIndex].getAttribute('tab-for');

    this._selectTabAndContents(tabId);
  }
}

if (!customElements.get('x-tabs')) {
  customElements.define('x-tabs', XTabs);
}
