import { addCss, getCustomAttributes } from '../common/util';
import { add, remove, goto, set, toggle, fetch, log } from './commands';
import { parseCommandExpr} from './parse-command-expr';
import { getValueFromExpressionX } from './get-value-from-expression-x';

const css = 'x-div {display: block; }';

class XDiv extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this.debug;
    return self;
  }

  // when <x-div> starts, read the attribute and set the properties
  // when <x-div> starts,  listen to x-* events and handle the requested
  connectedCallback() {
    const debugAttr = this.getAttribute('debug');
    this.debug = debugAttr === null ? false :  (debugAttr === '' ? true : +debugAttr);
    addCss(this, css);

    const custAttrs = getCustomAttributes(this);
    for(let key in custAttrs) {
      this.setProperty(key, custAttrs[key]);
    }

    this._addEventListener();

    const mainRoute = document.querySelector('x-route[main-route], x-route');
    const route = mainRoute && mainRoute.getRoute(window.location.pathname); //  + window.location.search);
    this.debug && route && console.info('  <x-div> currentRoute', {route});
    this.setProperty('route', route);

    // disabling form submission for SPA feature. If not, it makes unnecessary redirection
    Array.from(this.querySelectorAll('form')).forEach(form => {
      form.setAttribute('x-submit-disabled', '');
      form.onsubmit = _ => false;
    });
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
    this.addEventListener('x-page-selected', this._xEventHandler.bind(this));
  }

  _xEventHandler(event) {
    const attrNameToFind =
      event.type === 'click' ? 'x-click' :
        event.type === 'input' ? 'x-input' :
          event.type === 'change' ? 'x-change' :
            event.type === 'keyup' && event.key === 'Enter' ? 'x-enter' :
              event.type.match(/^x-/) ? event.type: undefined;

    const commandExpr = event.target.getAttribute(attrNameToFind) || this.getAttribute(attrNameToFind);
    if (!commandExpr) return;
    if (attrNameToFind === 'x-enter' && !event.target.value) return;

    this.event = event;
    this.debug && console.info('\nhandling event from', event.target.outerHTML.match(/.*?>/)[0]);
    const {command, target, options} = parseCommandExpr(event.target, commandExpr, this);
    this.debug > 1 && console.info('  processing command', {commandExpr, command, target, options});

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
    case 'log': log(this, target, {event, ...options}); break;
    default: console.error('Invalid command', commandExpr);
    }
  }

  setProperty(propName, propValue) {
    if (['id', 'class', 'tittle', 'style', 'tabindex', 'debug'].includes(propName)) return;
    if (propName.match(/^on[a-z]+/)) return;
    if (propName.match(/^aria-/)) return;
    if (propName.match(/^x-/)) return;

    this.debug > 1 && console.info('  setProperty', {propName, propValue});
    this[propName] = propValue;
    this._setChildValueProperty(propName); // x-value="..."
    this._setChildCssProperty(propName); // x-style="..."
    this._setChildClassProperty(propName);  // x-class="..."
    this._setChildAttrValue(propName);  // x-attr="..."
  }

  // Find element with attribute 'x-value' and set the value.
  // <x-list x-value="todos">
  // <div x-value="todos.length">
  // <div x-value="todos.done=false.id=123">
  // <div x-value="todos.done=false.id=123.length">
  _setChildValueProperty(propName) { 
    const selector =`[x-value*="${propName}"]`;
    const xValueAttrEls = this.querySelectorAll(`[x-value*="${propName}"]`);
    xValueAttrEls.forEach(el => {
      const expressionX = el.getAttribute('x-value');
      this.debug && console.info(`value binding for ${propName}`, el.outerHTML.match(/.*?>/)[0]);
      const value = getValueFromExpressionX(this, expressionX);
      const elPropName = typeof el.value === 'undefined' ? 'innerText' : 'value';
      if (propName === 'innerText') {
        try {
          el[elPropName] = JSON.stringify(value, null, '  ');
        } catch(e) {
          el[elPropName] = value;
        }
      } else {
        el[elPropName] = value;
      }
    });
  }

  // when <x-div> property is set, find element with attribute 'x-style' and set style.
  _setChildCssProperty(propName) {
    const xStyleAttrEls = this.querySelectorAll(`[x-style*="${propName}"]`);

    Array.from(xStyleAttrEls).forEach(el => {
      let newValue = el.getAttribute('x-style');
      this.debug && console.info(`style binding for ${propName}`, el.outerHTML.match(/.*?>/)[0]);
      el.getAttribute('x-style').match(/{{.+?}}/g)
        .map(el => el.replace(/[{}]/g, ''))
        .forEach(elPropName => {
          newValue = newValue.replace(`{{${elPropName}}}`, this[elPropName]);
        });
      newValue.split(';').map(el => el.split(':')).forEach( ([cssProp, cssVal]) => {
        if (cssProp) {
          cssProp = cssProp.trim().replace(/\b-([a-z])/g, (_, char) => char.toUpperCase());
          this.debug > 1 && console.info('  _setChildCssProperty', {cssProp, cssVal});
          el.style[cssProp] = cssVal.trim();
        }
      });
    });
  }

  // when <x-div> property is set, find element with attribute 'x-class', then add/remove class.
  _setChildClassProperty(propName) {
    const xClassAttrEls = this.querySelectorAll(`[x-class*="${propName}"]`);
    Array.from(xClassAttrEls).forEach(el => {
      el.getAttribute('x-class').split(';')
        .map(el => el.split(':'))
        .forEach( ([className, condition]) => {
          this.debug && console.info(`class binding for ${propName}`, el.outerHTML.match(/.*?>/)[0]);
          const conditonMet = !!getValueFromExpressionX(this, condition);
          if (conditonMet) {
            el.classList.add(className);
          } else {
            el.classList.remove(className);
          }
        });
    });
  }

  // when <x-div> property is set, find element with attribute 'x-attr', then set the attribute value
  _setChildAttrValue(propName) {
    const xAttrEls = this.querySelectorAll(`[x-attr*="${propName}"]`);
    Array.from(xAttrEls).forEach(el => {
      el.getAttribute('x-attr').split(';')
        .map(el => el.split(':'))
        .forEach( ([attrName, exprX]) => {
          this.debug && console.info(`attribute setting for ${propName}`, el.outerHTML.match(/.*?>/)[0]);
          const attrValue = getValueFromExpressionX(this, exprX);
          if (['checked', 'selected'].includes(attrName) && attrValue === false) {
            el.removeAttribute(attrName);
          } else if (typeof attrValue === 'undefined') {
            el.removeAttribute(attrName);
          } else {
            el.setAttribute(attrName, attrValue);
          }
        });
    });
  }
}

if (!customElements.get('x-div')) {
  customElements.define('x-div', XDiv);
}