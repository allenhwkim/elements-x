import { getValueFromExpressionX } from './get-value-from-expression-x';
import { getTargetFromExpressionX } from './get-target-from-expression-x';

// x-click="add(todos, name=::value, id=::id, done=false)"
// if target is an array, append at the end
export function add(scope, target, params) {
  const debug = scope.debug;
  debug && console.info('_add', {target, params});

  // all new requires id for tracking
  params.id = params.id || (+new Date + Math.random()).toString(36).replace('.', '');
  const isTargetArray = Array.isArray(scope[target]); 
  if (isTargetArray) {
    scope[target].push(params);
    scope.setProperty(target, scope[target]);
  } else if (typeof scope[target] === 'undefined') {
    scope[target] = [];
    scope[target].push(params);
    scope.setProperty(target, scope[target]);
  } else {
    console.error('addition is only allowed to array type', {target, params});
  }
  
  console.log('}}}}}}}}}}}}}}}}}}}}}]]', target, scope[target]);
}

// target is selector of <x-fetch> element, url is an attribute of <x-fetch> element 
// payload e.g., {a: 1, b:2}
export function fetch(scope, target, payload) { 
  const el = scope.querySelector(target);
  if (el) {
    el.fetch(payload);
  } else {
    console.error('could not find el to fetch', el);
  }
}

// goto(...) only work if <x-route> exists
export function goto(scope, target, params) { 
  const mainRoute = document.querySelector('x-route[main-route], x-route');
  // route = {pattern, urlPath, src, name, params}
  if (mainRoute) { // x-click="goto(/show/1), x-http-success="goto(/list)"
    mainRoute.fireRouteChangeEvent(target);
  } else if (params) {
    console.error('route error, route params is not allowed');
  } else {
    console.error('route error, could not find x-route[main-route]');
  }
}

// target is an attribute of DOM element to set attribute value
//   or, target is a property of <x-div> element, sometimes in deep level.
// source could be object or string
//   When string, it represents DOM element, property name(with search condition(s))
export function set(scope, target, source) {
  // {scope: x-div.todoapp, target: "todos.done=false", source: true}

  const [scopePropName, ..._] = target.split('.');
  scope.debug && console.info('set', {scope, target, source});
  const {refs, propName, attrName} = getTargetFromExpressionX(scope, target);
  scope.debug && console.info('set', {refs, propName, attrName});
  const sourceVal = getValueFromExpressionX(scope, source);
  scope.debug && console.info('set', {sourceVal});

  if (typeof sourceVal === 'undefined') {
    throw `Invalid source ${source}`;
  } 

  refs.forEach(ref => {
    if (ref instanceof HTMLElement && attrName)  {
      ref.setAttribute(attrName, sourceVal);
    } else if (Array.isArray(scope[scopePropName])) {
      scope.debug && console.info('setting array elment', {ref, propName});
      const ndx = scope[scopePropName].indexOf(ref);
      scope.debug && console.info('setting array elment', {ndx, sourceVal});
      scope[scopePropName][ndx][propName] = sourceVal;
    } else if (propName) {
      alert(1);
      ref[propName] = sourceVal;
    } else if (!propName) {
      alert(2);
      ref = sourceVal;
    }
  });

  if (scope[scopePropName]) {
    console.log(1111111111111111, {sourceVal}, scope[scopePropName]);
    scope.setProperty(scopePropName, scope[scopePropName]); // trigger updates
  }
}
  
// target is css selector ends with class or attribute
export function toggle(scope, target) {
  const classMatches = target.match(/(.*?)\.(.*?)$/);
  const attrMatches = target.match(/(.*?)\[(.*?)\]$/);
  if (classMatches) { 
    const [_, selector, klassName] = classMatches;
    const el = scope.querySelector(selector);
    if (el && el.classList.contains(klassName)) {
      el.classList.remove(klassName);
    } else if (el) {
      el.classList.add(klassName);
    } else {
      console.error('could not find element to toggle class', el);
    }
  } else if (attrMatches) {
    const [_, selector, attrName] = classMatches;
    const el = scope.querySelector(selector);
    if (el && el.getAttribute(attrName) === null) {
      el.setAttribute(attrName, '');
    } else if (el) {
      el.removeAttribute(attrName);
    } else {
      console.error('could not find elementn to toggle attrubute', el);
    }
  }
}

// if target is DOM element, remove the element
// if target is an array, find index matching conditon, then remove the array item
// if target is an object, remove the object from the scope
export function remove(scope, target, params) {
  scope.debug && console.info('remove', {scope, target, params});
  if (target.match(/^[.#]/)) { // DOM element, x-click=“delete(#todos[filter])“
    document.querySelector(target).remove();
  } else {
    const {refs, propName} = getTargetFromExpressionX(scope, target);
    const [scopePropName, ..._] = target.split('.');
    refs.forEach(ref => {
      scope.debug && console.info('remove object', {ref, propName});
      if (Array.isArray(scope[scopePropName])) {
        const ndx = scope[scopePropName].indexOf(ref);
        scope[scopePropName].splice(ndx, 1);
      } else if (propName) {
        delete scope[scopePropName][propName];
      } else if (!propName) {
        delete scope[scopePropName];
      }
      scope.setProperty(scopePropName, scope[scopePropName]);
    });
  }
}
