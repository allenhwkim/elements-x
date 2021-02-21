import { addCss } from '../common/util';
import { add, remove, goto, set, toggle, fetch } from './commands';
import { parseCommandExpr} from './parse-command-expr';
import { getValueFromExpressionX } from './get-value-from-expression-x';

/**
 * When <x-div> value is set, define a property with getter and setter if not there
 * when <x-div> property is set, 
 *   - Find element with attribute 'x-value'. Then, set the value of the element.
 *   - Find element with attribute 'x-style'. Then, set the style of the element.
 *   - Find element with attribute 'x-class'. Then, set class of the element.
 * when <x-div> starts,  listen to x-* events and handle the requested
 *   - click, input, change, x-http-success, x-http-error, x-listitem-selected
 * 
 * ExpressionX example and meaning
 *   - todos                              object
 *   - todos.length                       1
 *   - todos.done=false                   array
 *   - todos.done=false.id=123            array
 *   - todos.done=false.length            10
 *   - todos.done=false.id=123.length     3
 */
const css = 'x-div {display: block; }';

class XDiv extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    self.debug = true;
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
    const attrNameToFind =
      event.type === 'click' ? 'x-click' :
        event.type === 'input' ? 'x-input' :
          event.type === 'change' ? 'x-change' :
            event.type === 'keyup' && event.key === 'Enter' ? 'x-enter' :
              event.type.match(/^x-/) ? event.type: undefined;

    const commandExpr = event.target.getAttribute(attrNameToFind);
    if (!commandExpr) return;
    if (attrNameToFind === 'x-enter' && !event.target.value) return;

    const {command, target, options} = parseCommandExpr(event.target, commandExpr, this);
    this.debug && console.info('_xEventHandler', {commandExpr, command, target, options});

    switch(command) {
    case 'add': 
      add(this, target, options);
      typeof event.target.value === 'string' && (event.target.value = '');
      break;
    case 'remove': remove(this, target, options); break;
    case 'goto': goto(this, target, options); break;
    case 'toggle': toggle(this, target, options); break;
    case 'fetch': fetch(this, target, options); break;
    case 'set': set(this, target, options); break;
    default: console.error('Invalid command', commandExpr);
    }
  }

  setProperty(name, value) {
    console.log(']]]]]]]]]]]]]]]]]]]]]]]]', {name, value});
    if (['id', 'class', 'tittle', 'style', 'tabindex'].includes(name)) return;
    if (name.match(/^on[a-z]+/)) return;
    if (name.match(/^aria-/)) return;

    this.debug && console.info('setProperty', name, `as "${value}"`);
    this[name] = value;
    this._setChildValueProperty(name);
    this._setChildCssProperty(name, value); 
    this._setChildClassProperty(name, value); 
  }

  // Find element with attribute 'x-value' and set the value.
  // <x-list x-value="todos">
  // <div x-value="todos.length">
  // <div x-value="todos.done=false.id=123">
  // <div x-value="todos.done=false.id=123.length">
  _setChildValueProperty(name) { 
    const xValueAttrEls = this.querySelectorAll(`[x-value*="${name}"]`);
    this.debug && console.info('_setChildValueProperty', `[x-value*="${name}"]`, {name, xValueAttrEls});
    xValueAttrEls.forEach(el => {
      const expressionX = el.getAttribute('x-value');
      this.debug && console.info('_setChildValueProperty', el.outerHTML.match(/.*?>/)[0]);
      const value = getValueFromExpressionX(this, expressionX);
      const elPropName = typeof el.value === 'undefined' ? 'innerText' : 'value';
      el[elPropName] = value;
    });
  }

  // when <x-div> property is set, find element with attribute 'x-style' and set style.
  _setChildCssProperty(name) {
    this.debug && console.info('_setChildCssProperty', {name});
    const xStyleAttrEls = this.querySelectorAll(`[x-style*="${name}"]`);
    this.debug && console.info('_setChildCssProperty', {xStyleAttrEls});
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
          this.debug && console.info('_setChildCssProperty', {cssProp, cssVal});
          el.style[cssProp] = cssVal.trim();
        }
      });
    });
  }

  // when <x-div> property is set, find element with attribute 'x-class', then add/remove class.
  _setChildClassProperty(name) {
    this.debug && console.info('_setChildClassProperty', {name});
    const xClassAttrEls = this.querySelectorAll(`[x-class*="${name}"]`);
    this.debug && console.info('_setChildClassProperty', {xClassAttrEls});
    Array.from(xClassAttrEls).forEach(el => {
      let newValue = el.getAttribute('x-class');
      el.getAttribute('x-class').split(';')
        .map(el => el.split(':'))
        .forEach( ([className, condition]) => {
          const conditonMet = !!getValueFromExpressionX(this, condition);
          if (conditonMet) {
            el.classList.add(className);
          } else {
            el.classList.remove(className);
          }
        });
    });
  }
}

if (!customElements.get('x-div')) {
  customElements.define('x-div', XDiv);
}
