/**
 * When x-page value is set, define a property with getter and setter if not there
 * 
 * when start, read the attribute and set the properties
 * 
 * when properties is set, find x-value/x-style attribute,
 *  then update the value or style of the element
 * 
 *     * <ANY x-value=“xxxxxx{{VALUE}}”>, set the value of the element
 *     * <ANY x-style=“KEY:{{VALUE}};”>, set the style of the element
 * 
 * when start,  listen to x-* events and handle the requested
 *     * <ANY x-click=“xxx:yyy=zzz”>
 *     * <ANY x-input=“xxx:yyy=zzz”>
 *     * <ANY x-change=“xxx:yyy=zzz”>
 *     * <x-http x-success=“xxx:yyy=zzz”>
 *     * <x-http x-errror=“xxx:yyy=zzz”>
 */
class XPage extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    this.attributes.forEach(attr => this._setProperty(attr.name, attr.value) );
    this._addEventListener();
  }

  _setProperty(name, value) {
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    if (typeof this[name] === 'undefined') {
      Object.defineProperty(this, name, {
        get() { return this[`_${name}`]; },
        set(value) {
          console.log('settting x-page ', name, 'as', value);
          this[`_${name}`] = value;
          this._setChildValueProperty(name, value);
          this._setChildCssProperty(name, value);
        },
        writeable: true, // value maybe changed with assignment operator
        enumerable: false,
        configurable: false
      });
      this[name] = value;
    } else if (!equals(this[name], value)) {
      this[name] = value;
    }
  }

  _setChildValueProperty(name, value) {
    const xValueAttrEls = this.querySelectorAll(`[x-value*=${name}]`);
    xValueAttrEls.forEach(el => {
      const newValue = el.getAttribute('x-value').replace(new RegExp(`{{${name}}}`, 'g'), value);
      if (typeof el.value === 'undefined') {
        el.innerText = newValue;
      } else {
        el.value = newValue;
      }
    });
  }

  _setChildCssProperty(name, value) {
    const xStyleAttrEls = this.querySelectorAll(`[x-style*=${name}]`);
    xStyleAttrEls.forEach(el => {
      const newValue = el.getAttribute('x-value').replace(new RegExp(`{{${name}}}`, 'g'), value);
      newValue.split(';').map(el => el.split(':')).forEach( ([cssProp, cssVal]) => {
        cssProp = cssProp.replace(/\b-([a-z])/g, (_, char) => char.toUpperCase());
        el.style[cssProp] = cssVal;
      });
    });
  }

  _addEventListener() { // catch the event which are bubbled up
    this.addEventListener('click', this._xEventHandler.bind(this));
    this.addEventListener('input', this._xEventHandler.bind(this));
    this.addEventListener('change', this._xEventHandler.bind(this));
    this.addEventListener('http-success', this._xEventHandler.bind(this));
    this.addEventListener('http-error', this._xEventHandler.bind(this));
  }

  _xEventHandler(event) {
    const xEventAttr = event.target.getAttribute('x-' + event.type);
    if (!xEventAttr) return;

    const [_, command, target, value] = xEventAttr.match(/^([a-z]+):([^=]+)=?(.*)?$/)
    if (command === 'goto') { this._goTo(target); } 
    if (command === 'submit') { this._submit(target); } 
    if (command === 'toggle') { this._toggle(target); } 
    if (command === 'set') { this._set(target, value); } 
  }

  // x-click=“goto:/show/1”>
  // x-click=“goto:/edit/1”>
  // x-http-success=“goto:/list”
  _goTo(target) { // route = {pattern, urlPath, src, name, params}
    const mainRoute = document.querySelector('x-route[main-route]');
    if (mainRoute) {
      mainRoute.fireRouteChangeEvent(target);
    } else {
      console.error('route error, could not find x-route[main-route]');
    }
  }
  
  // x-click=“submit:#create”>
  // x-click=“submit:#show?id=123&foo=bar”>
  // x-click=“submit:#update?id=123”>
  // x-click=“submit:#delete?id=123”>
  // x-click=“submit:#search?q=#selector&&limit=#selector”>
  _submit(target) {

  }

  // x-click="toggle:#selector.klass"
  // x-click="toggle:#selector[attr]"
  _toggle(target) {

  }

  // x-click="set:#selector[attr]=my value"
  // x-click="set:#selector[attr]=#selector"
  // x-input=“set:search” // set it with the current element value
  // x-change=“set:search” // set it with the current element value
  // x-http-success=“set:todos”
  // x-http-success=“set:#message=id {{id}} is deleted successfully”
  // x-http-error=“set:http-error”
  _set(target, value) {

  }

}

if (!customElements.get('x-page')) {
  customElements.define('x-page', XPage);
}


