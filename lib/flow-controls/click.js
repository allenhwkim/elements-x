class XClick extends HTMLElement {
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
    const attrMatches = expr.match(/\[([a-z0-9-]+)\](=([^=]+))$/);
    classMatches && this._toggleClass(expr, classMatches);
    attrMatches && this._setAttribute(expr, attrMatches);
  }

  _toggleClass(expr, matches) { // /(\.[a-z0-9\-]+)$/
    const selector = expr.replace(matches[0], '');
    const [_0, className] = matches;
    const el = document.querySelector(selector);
    if (el) {
      const hasClass = el.classList.contains(className);
      hasClass && el.classList.remove(className);
      !hasClass && el.classList.add(className);
    }
  }

  _setAttribute(expr, matches) { // /\[([a-z0-9-]+)\](=([^=]+))$/
    const selector = expr.replace(matches[0], '');
    const [_0, attrName, _2, attrValue] = matches;
    const el = document.querySelector(selector);
    if (el) {
      const hasAttr = el.getAttribute(attrName) !== null;
      hasAttr && el.removeAttribute(attrName);
      !hasAttr && el.setAttribute(attrName, attrValue || '');
    }
  }
}

if (!customElements.get('x-click')) {
  customElements.define('x-click', XClick);
}

