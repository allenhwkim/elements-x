import { addCss } from '../common/util';
/**
 * When <x-div> value is set, define a property with getter and setter if not there
 * when <x-div> property is set, 
 *   - Find element with attribute 'x-value'. Then, set the value of the element.
 *   - Find element with attribute 'x-style'. Then, set the style of the element.
 * when <x-div> starts,  listen to x-* events and handle the requested
 *   - click, input, change, x-http-success, x-http-error, x-listitem-selected
 */
const css = 'x-div {display: block; }';
const debug = true;

class XDiv extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  // when <x-div> starts, read the attribute and set the properties
  // when <x-div> starts,  listen to x-* events and handle the requested
  connectedCallback() {
    addCss(this, css);
    Array.from(this.attributes).forEach(attr => this.setProperty(attr.name, attr.value) );
    this._addEventListener();
  }

  _addEventListener() { // catch the event which are bubbled up
    this.addEventListener('click', this._xEventHandler.bind(this));
    this.addEventListener('input', this._xEventHandler.bind(this));
    this.addEventListener('change', this._xEventHandler.bind(this));
    this.addEventListener('keyup', this._xEventHandler.bind(this));
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
            event.type === 'keyup' && event.key === 'Enter' ? 'x-enter' :
              event.type.match(/^x-/) ? event.type: undefined;

    const exprXAttr = event.target.getAttribute(exprXAttrName);
    if (!exprXAttr) return;
    if (exprXAttrName === 'x-enter' && !event.target.value) return;

    debug && console.info('_xEventHandler', {event});
    const [_0, command, commas] = exprXAttr.split(/^([a-z]+)\((.*)\)$/i);
    const [target, ...rest] = commas.split(',');
    const args = getCommandArgs(event.target, rest); 
    // commands are add, delete, goto, fetch, toggle, set
    this[`_${command}`](target, args); // target is string
    (command === 'add') && event.target && (event.target.value = '');
  }

  setProperty(name, value) {
    if (['id', 'class', 'tittle', 'style', 'tabindex'].includes(name)) return;
    if (name.match(/^on[a-z]+/)) return;
    if (name.match(/^aria-/)) return;

    debug && console.info('setProperty', name, `as "${value}"`);
    this[name] = value;
    this._setChildValueProperty(name, value);
    this._setChildCssProperty(name, value); 
  }

  // when <x-div> property is set, find element with attribute 'x-value' and set the value.
  _setChildValueProperty(name, value) {
    const xValueAttrEls = this.querySelectorAll(`[x-value*="${name}"]`);
    debug && console.info('_setChildValueProperty', `[x-value*="${name}"]`, {name, value, xValueAttrEls});
    xValueAttrEls.forEach(el => {
      const attrValue = el.getAttribute('x-value');
      debug && console.info('_setChildValueProperty', {name, value, el, attrValue});
      const newValue = getAttrExprValue(this, attrValue);
      const elPropName = typeof el.value === 'undefined' ? 'innerText' : 'value';
      el[elPropName] = newValue;
    });
  }

  // when <x-div> property is set, find element with attribute 'x-style' and set style.
  _setChildCssProperty(name, value) {
    debug && console.info('_setChildCssProperty', {name, value});
    const xStyleAttrEls = this.querySelectorAll(`[x-style*="${name}"]`);
    debug && console.info('_setChildCssProperty', {xStyleAttrEls});
    Array.from(xStyleAttrEls).forEach(el => {
      let newValue = el.getAttribute('x-style');
      el.getAttribute('x-style').match(/{{.+}}/g)
        .map(el => el.replace(/[{}]/g, ''))
        .forEach(propName => {
          newValue = newValue.replace(`{{${propName}}}`, this[propName]);
        });
      newValue.split(';').map(el => el.split(':')).forEach( ([cssProp, cssVal]) => {
        if (cssProp) {
          cssProp = cssProp.trim().replace(/\b-([a-z])/g, (_, char) => char.toUpperCase());
          debug && console.info('_setChildCssProperty', {cssProp, cssVal});
          el.style[cssProp] = cssVal.trim();
        }
      });
    });
  }

  // x-click="add(todos, name=::value, id=::id, done=false)"
  _add(target, params) {
    console.info('_add', {target, params});

    // all new requires id for tracking
    params.id = params.id || (+new Date + Math.random()).toString(36);
    const isTargetArray = Array.isArray(this[target]); 
    if (isTargetArray) {
      this.setProperty(target, this[target].concat(params));
    } else if (!isTargetArray && typeof this[target] === 'undefined') {
      this.setProperty(target, [params]);
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
    debug && console.info('_set', {target, targetValue});
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
      debug && console.info('_set if !attrMatches', {target, targetValue});
      const [propName, ...expressions] = (targetValue||'').split('.');

      // x-http-success="set(todos, ::response)"
      // x-http-error="set(http-error, ::error)"
      // x-click="set(todos, ::checked)"
      if (expressions.length === 0) { // no expression for deep search
        this.setProperty(target, targetValue);
        debug && console.info('_set this[propName]', {propName, targetValue}, '->', this[propName]);
      } else if (this[propName] && expressions.length > 0) { // with deep search expression
        if (expressions[0].contains('=')) {
          this._setPropFromVariableWithArrayExpressions(propName, expressions, targetValue);
        } else {
          this._setPropFromVariableWithObjectExpressions(propName, expressions, targetValue);
        }
      } else {
        console.error('No property in <x-div>', target, targetValue);
      }
    }
  }

  // x-click="set(todos.foo, ::checked)"
  // x-click=“set(todos.foo.bar.baz, ::value)”
  _setPropFromVariableWithObjectExpressions(propName, expressions, targetValue) {
    if (expressions.length === 1) { // todos.foo 
      this[propName][expressions[0]] = targetValue;
      this.setProperty(propName, this[propName]);
    } else if (expressions.length > 1) { // todos.foo.bar.baz
      const targetProp = expressions.pop(); 
      let target = this[propName];
      expressions.forEach(propName => target = target[propName]);
      target[targetProp] = targetValue;
      this.setProperty(propName, this[propName]);
    } 
  }

  // x-click="set(todos.id=b2d2f23.done, ::checked)" 
  //   -> todos, [id=xxxx.done], false
  // x-click="set(todos.id=b2d2f23.key=foo.done, ::checked)" 
  //   -> todos, [id=xxx, key=foo], true
  _setPropFromVariableWithArrayExpressions(propName, expressions, targetValue) {
    if (expressions.length === 1) { // todos.id=b2d2f23
      const [key, value] = expressions[0].split('=');
      const index = this[propName].findIndex(el => el[key] === value);
      this[propName][index] = targetValue;
      this.setProperty(propName, this[propName]); // invoke setting actions
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
        this.setProperty(propName, this[propName]); // invoke setting actoins
      } else {
        console.error('invalid set expression', propName, targetValue);
      }
    } 
  }

}

if (!customElements.get('x-div')) {
  customElements.define('x-div', XDiv);
}

// return object from string expression considering scope
// scope is x-div element
// expr is attribute value, e.g. x-value="todos.length"
export function getAttrExprValue(scope, expr) { 
  debug && console.info('_getExprValue', {expr});
  if (expr === '::id') { // a unique id
    debug && console.info('getAttrExprValue ::id', {expr});
    return (+new Date + Math.random()).toString(36);  // "iepii89m"
  } else if (expr.match(/^[#.]/)) { // DOM selector, e.g. #foo.bar
    debug && console.info('getAttrExprValue DOM selector', {expr});
    const foundEl = scope.querySelector(expr);
    return foundEl.value || foundEl.innerText;
  } else if (expr.match(/^[0-9.]+$/)) { // 0, 123, 123.45
    debug && console.info('getAttrExprValue number', {expr});
    return +expr;
  } else if (expr.match(/^(true|false)$/)) { // 'true', 'false'
    debug && console.info('getAttrExprValue boolean', {expr});
    return !!(expr === 'true');
  } else if (expr.match(/^['"].*['"]$/) || expr.includes(' ')) { // 'string val'
    debug && console.info('getAttrExprValue string', {expr});
    expr.match(/{{.+}}/g).forEach(el => {
      const propName = el.replace(/[{}]/g, '');
      expr = expr.replace(el, scope[propName]);
    });
    return expr;
  } else {
    const [propName, ...exprs] = expr.split('.'); // 'foo' => "foo", []
    const endsWithCondition = exprs.length && exprs.slice(-1)[0].match(/.+=.+/);
    const endsWithPropName = exprs.length && exprs.slice(-1)[0].match(/^[^=]+$/);
    if (exprs.length === 0) { // todos
      debug && console.info('getAttrExprValue no expression', {propName, exprs});
      return scope[propName] ? scope[propName] : expr;
    } else if (endsWithPropName) { // todos.done=true.length, returns value
      debug && console.info('getAttrExprValue endsWithPropName', {propName, exprs});
      // returns an array filtered out with matching conditions
      const targetProp =exprs.pop(); 
      let targetArr = [...scope[propName]];
      exprs.forEach(expr => {
        const [key, value] = expr.split('=');
        targetArr = targetArr.filter(el =>  el[key] == value);
      });
      return targetArr[targetProp];
    } else if (endsWithCondition) { // todos.done=true.id=xxx, returns array
      debug && console.info('getAttrExprValue endsWithCondition', {propName, exprs});
      let targetArr = [...scope[propName]];
      exprs.forEach(expr => {
        const [key, value] = expr.split('=');
        targetArr = targetArr.filter(el =>  el[key] == value);
      });
      return targetArr;
    }
  }
}

// returns key/value object from command arguments
// el: DOM element, which has fired an event
// expressions: command arguments as string array except the target
//   command has target and values. e.g. set(a, b, c, d)
//   a is target, [b,c,d] is expressions(values)
//
// From the following command, expressions are shown after arrow(>)
// add(todos, id=d3s3x2, id=123, foo=bar) > [id=d3s3x2, id=123, foo=bar]
// add(todos, name=::value, id=::id, done=false) > [name=::value, id=::id, done=false]
// set(todos, q=#search, limit=#limit) > [q=#search, limit=#limit]
// set(#my-id, foo) > [foo]
// set(foo, #my-section .my-klass) > ['#my-section .my-klass']
// set(foo, my name is {{name}}) > ['my name is {{name}}']
export function getCommandArgs(el, expressions) { // target is DOM element or scoped property
  debug && console.info('getArgs', {el, expressions});
  const exprs = expressions.map(el => el.trim());
  // only target is defined e.g. set(foo), set foo with this value
  if (exprs.length === 0) {
    if (typeof el.value !== 'undefined') {
      debug && console.info('getArgs case 1', exprs.length, el.value);
      return el.value;
    } else {
      debug && console.info('getArgs case 2', exprs.length);
      return undefined;
    }
  } else if (exprs.length) { // 
    if (exprs[0].match(/^(.*?)=(.*)$/)) {  // with condition
      // e.g., ['id=d3s3x2'], ['name=::value', 'id=::id']
      const args = {};
      exprs.forEach(str => {
        const [_, key, valueExpr] = str.match(/^(.*?)=(.*)$/);
        args[key] = getExprValueFromEl(el, valueExpr);
      });
      return args;
    } else { // no condition, e.g. bar, #selector, myValue, ::value 
      return getExprValueFromEl(el, exprs[0]);
    }
  }
}

// returns object value from attribute value of x-value, 
//   e.g, x-value="xxxxx.yyy.zzzz"
// todos, todos.length, todos.done=false.length
export function getExprValueFromEl(el, expr) {
  if (el.value && typeof expr === undefined) { // if not defined, default as value
    debug && console.info('_getExprValueFromEl default as value', {el, expr});
    return el.value;
  } else if (expr.match(/^::/)) { // element property, e.g. ::value, ::checked
    debug && console.info('_getExprValueFromEl element property', {el, expr});
    const propName = expr.replace('::', '');
    return el[propName];
  } 
}

