class XClick extends HTMLElement {
  // disconnectedCallback() {}
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    this.addEventListener('click', this._click.bind(this));
  }

  _click() {
    const expr = this.getAttribute('set') || '';
    const classMatches = expr.match(/\.([a-z0-9-]+)$/);
    const attrMatches = expr.match(/\[([a-z0-9-]+)\]$/);
    const attrValueMatches = expr.match(/\[([a-z0-9-]+)\]=([^=]+)$/);
    classMatches && this._toggleClass(expr, classMatches);
    attrMatches && this._toggleAttribute(expr, attrMatches);
    attrValueMatches && this._setAttribute(expr, attrValueMatches);
  }

  _toggleClass(expr, matches) { // /(\.[a-z0-9\-]+)$/
    const selector = expr.replace(matches[0], '');
    const el = document.querySelector(selector);
    if (el) {
      const className = matches[1];
      const method = el.classList.contains(className) ? 'remove' : 'add';
      el.classList[method](className);
    }
  }

  _toggleAttribute(expr, matches) { // /(\[[a-z0-9\-]+\])$/
    const selector = expr.replace(matches[0], '');
    const el = document.querySelector(selector);
    if (el) {
      const attrName = matches[1];
      const hasAttr = el.getAttribute(attrName) !== null;
      hasAttr && el.removeAttribute(attrName);
      !hasAttr && el.setAttribute(attrName, '');
    }
  }

  _setAttribute(expr, matches) { // /\[([a-z0-9\-])+\]=([^=]+)$/
    const selector = expr.replace(matches[0], '');
    const el = document.querySelector(selector);
    if (el) {
      const [attrName, value] = [matches[1], matches[2]];
      el.setAttribute(attrName, value);
    }
  }
}

if (!customElements.get('x-click')) {
  customElements.define('x-click', XClick);
}

