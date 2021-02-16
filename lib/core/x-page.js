import { IndexKind, isThrowStatement } from "typescript";

/**
 * When <x-page> value is set, define a property with getter and setter if not there
 * when <x-page> property is set, 
 *   - Find element with attribute 'x-value'. Then, set the value of the element.
 *   - Find element with attribute 'x-style'. Then, set the style of the element.
 * when <x-page> starts,  listen to x-* events and handle the requested
 *   - click, input, change, x-http-success, x-http-error, x-listitem-selected
 */
class XPage extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  // when <x-page> starts, read the attribute and set the properties
  // when <x-page> starts,  listen to x-* events and handle the requested
  connectedCallback() {
    this.attributes.forEach(attr => this._setProperty(attr.name, attr.value) );
    this._addEventListener();
  }

  // When <x-page> value is set, define a property with getter and setter if not there
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

  // when <x-page> property is set, find element with attribute 'x-value' and set the value.
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

  // when <x-page> property is set, find element with attribute 'x-style' and set style.
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
    this.addEventListener('x-http-success', this._xEventHandler.bind(this));
    this.addEventListener('x-http-error', this._xEventHandler.bind(this));
    this.addEventListener('x-listitem-selected', this._xEventHandler.bind(this));
    this.addEventListener('x-menuitem-selected', this._xEventHandler.bind(this));
    this.addEventListener('x-date-selected', this._xEventHandler.bind(this));
    this.addEventListener('x-time-selected', this._xEventHandler.bind(this));
    this.addEventListener('x-color-selected', this._xEventHandler.bind(this));
    this.addEventListener('x-file-selected', this._xEventHandler.bind(this));
    this.addEventListener('x-route-change', this._xEventHandler.bind(this));
  }

  _xEventHandler(event) {
    const exprXAttrName =
      event.type === 'click' ? 'x-click' :
        event.type === 'input' ? 'x-input' :
          event.type === 'change' ? 'x-change' :
            event.type === 'keydown' && event.code === 'KeyEnter' ? 'x-enter' :
              event.type.match(/^x-/) ? event.type: undefined;

    const exprXAttr = event.target.getAttribute(exprXAttrName);
    if (!exprXAttr) return;

    const [_0, command, commas] = exprXAttr.split(/^([a-z]+)\((.*)\)$/i);
    const [target, ...rest] = commas.split(',')[0];
    const params = this._getArgs(event.target, rest);
    // commands are add, delete, goto, fetch, toggle, set
    this[`_${command}`](target, params);
  }

  // ['id=d3s3x2'], ['id=123', 'foo=bar']
  // ['name=::value', 'id=::id', 'done=false']
  // ['q=#selector', 'limit=#selector']
  // DOM selector, ['#selector'] ['.selector']
  // propName ['myValue'] 
  // string ['my value'] ["'my value'"] // has space in it or quoted
  _getArgs(target, argExpressions) {
    const arr = argExpressions = argExpressions.map(el => el.trim());
    if (arr.length === 0) {
      return undefined;
    } else if (arr[0].match(/^(.*?)=(.*)$/)) { 
      // e.g., ['id=d3s3x2'], ['name=::value', 'id=::id']
      const args = {};
      arr.forEach( str => {
        const [_, key, valueExpr] = str.match(/^(.*?)=(.*)$/);
        args[key] = this._getExprValue(target, valueExpr);
      });
      return args;
    } else { // no equal sign
      return this._getExprValue(target, arr[0]);
    }
  }

  // possible expr values are ::id, ::value, ::checked, #selector, 'string val', propName 
  _getExprValue(evtTarget, expr) { 
    if (expr === '::id') { // a unique id
      return (+new Date + Math.random()).toString(36).replace('.',''); // "kl630lz9.p4a"
    } else if (expr.match(/^::/)) { // element property
      const propName = expr.replace('::', '');
      return  evtTarget[propName];
    } else if (expr.match(/^[#.]/)) { // DOM selector
      const foundEl = this.querySelector(expr);
      return foundEl.value || foundEl.innerText;
    } else if (expr.match(/^['"].*['"]$/) || expr.contains(' ')) { // string
      return evtTarget;
    } else {
      return this[expr];
    }
  }

  // x-click="add(todos, name=::value, id=::id, done=false)"
  _add(target, params) {
    const isTargetArray = Array.isArray(this[target]); 
    if (isTargetArray) {
      this[target] = this[target].concat(params);
    } else {
      console.error('addition is only allowed to array type', {target, params});
    }
  }

  _delete(target, params) {
    if (target.match(/^[.#]/)) { // DOM element, x-click=“delete(#todos[filter])“
      document.querySelector(target).remove();
    } else if (params && Array.isArray(this[target])) { // x-click=“delete(#todos[filter])“
      const conditions = Object.entries(params);
      if (conditions.length === 1)  {
        const ndx = this[target].findIndex(el => conditions[0] === conditions[1]);
        this[target] = this[target].splice(ndx, 1);
      } else {
        console.error('delete error. only one condition is allowed');
      }
    } else if (!params) { // x-click=“delete(todos)“
      this[target] = undefined;
    } else {
      console.error('unexpected delete error', {target, params});
    }
  }

  _goto(target, params) { 
    const mainRoute = document.querySelector('x-route[main-route]');
    // route = {pattern, urlPath, src, name, params}
    if (mainRoute) { // x-click="goto(/show/1), x-http-success="goto(/list)"
      mainRoute.fireRouteChangeEvent(target);
    } else if (params) {
      console.error('route error, route params is not allowed');
    } else {
      console.error('route error, could not find x-route[main-route]');
    }
  }
  
  // x-click="fetch(#create)">
  // x-click="fetch(#show, id=123, foo=bar)">
  // x-click="fetch(#update, id=123)">
  // x-click="fetch(#delete, id=123)">
  // x-click="fetch(#search, q=#selector, limit=#selector)">
  _fetch(target, params) {
    const el = this.querySelector(target);
    if (el) {
      el.fetch(params);
    } else {
      console.error('could not find el to fetch', el);
    }
  }

  // x-click="toggle(#selector.foo.bar.visible)"
  // x-click="toggle(#selector .foo .bar[attr])"
  _toggle(target) {
    const classMatches = target.match(/(.*?)\.(.*?)$/);
    const attrMatches = target.match(/(.*?)\[(.*?)\]$/);
    if (classMatches) {
      const [_, selector, klassName] = classMatches;
      const el = this.querySelector(selector);
      if (el && el.classList.contains(klassName)) {
        el.classList.remove(klassName);
      } else if (el) {
        el.classList.add(klassName);
      } else {
        console.error('could not find element to toggle class', el);
      }
    } else if (attrMatches) {
      const [_, selector, attrName] = classMatches;
      const el = this.querySelector(selector);
      if (el && el.getAttribute(attrName) === null) {
        el.setAttribute(attrName, '');
      } else if (el) {
        el.removeAttribute(attrName);
      } else {
        console.error('could not find elementn to toggle attrubute', el);
      }
    }
  }

  _set(target, targetValue) {
    const attrMatches = target.match(/(.*?)\[(.*?)\]$/);
    // x-click="set(#selector[attr], my value)"
    // x-click="set(#selector [attr], #selector)"
    // x-click=“set(#todos[filter], done=true)“
    // x-click="set(#message, id {{id}} is deleted successfully")
    if (attrMatches) { // DOM type, set attribute value
      const [_, el, attrName] = attrMatches;
      if (el && targetValue.match(/^[.#]/)) {
        el.setAttribute(attrName, this.querySelector(targetValue).value);
      } else if (el) {
        el.setAttribute(attrName, targetValue);
      } else {
        console.error('could not find element', target);
      }
    }
    else { // variable type
      const [propName, ...expressions] = target.split('.');
      // x-http-success="set(todos, ::response)"
      // x-http-error="set(http-error, ::error)"
      // x-click="set(todos, ::checked)"
      if (!expressions) { // no expression for deep search
        this[propName] = targetValue;
        this[propName] = {...this[propName]};
      } else if (this[propName] && expressions.length > 0) { // with deep search expression
        if (expressions[0].contains('=')) {
          this._setPropFromVariableWithArrayExpressions(propName, expressions, targetValue);
        } else {
          this._setPropFromVariableWithObjectExpressions(propName, expressions, targetValue);
        }
      } else {
        console.error('No property in <x-page>', target);
      }
    }
  }

  // x-click="set(todos.foo, ::checked)"
  // x-click=“set(todos.foo.bar.baz, ::value)”
  _setPropFromVariableWithObjectExpressions(propName, expressions, targetValue) {
    if (expressions.length === 1) { // todos.foo 
      this[propName][expressions[0]] = targetValue;
      this[propName] = {...this[propName]}; // clone, so setter works
    } else if (expressions.length > 1) { // todos.foo.bar.baz
      const targetProp = expressions.pop(); 
      let target = this[propName];
      expressions.forEach(propName => target = target[propName]);
      target[targetProp] = targetValue;
      this[propName] = {...this[propName]}; // clone, so setter works
    } 
  }

  // x-click="set(todos.id=b2d2f23.done, ::checked)"
  // x-click="set(todos.id=b2d2f23.key=foo.done, ::checked)"
  _setPropFromVariableWithArrayExpressions(propName, expressions, targetValue) {
    if (expressions.length === 1) { // todos.id=b2d2f23
      const [key, value] = expressions[0].split('=');
      const index = this[propName].findIndex(el => el[key] === value);
      this[propName][index] = targetValue;
      this[propName] = [...this[propName]]; // clone, so setter works
    } else if (expressions.length > 1) { // todos.id=b2d2f23.done=false.done
      const targetProp = expressions.pop(); 
      const {_, index} = expressions.reduce( ({acc, index}, condition) => {
        const [key, value] = condition.split('=');
        index = acc.findIndex(el => el[key] == value);
        acc = [acc[index]];
        return {acc, index};
      }, {acc: this[propName], index: -1});

      if (index > -1) {
        this[propName][index][targetProp] = targetValue;
        this[propName] = [...this[propName]]; // clone, so setter works
      } else {
        console.error('invalid set expression', target, targetValue);
      }
    } 
  }
}

if (!customElements.get('x-page')) {
  customElements.define('x-page', XPage);
}

