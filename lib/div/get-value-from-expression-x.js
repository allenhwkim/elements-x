// return object from string expression considering scope
// scope is x-div element
// expr is attribute value, e.g. x-value="todos.length"
export function getValueFromExpressionX(scope, expr) { 
  const debug = scope.debug;
  debug && console.info('getValueFromExpressionX', {scope, expr});
  if (expr === '::id') { // a unique id
    debug && console.info('getValueFromExpressionX ::id', {expr});
    return (+new Date + Math.random()).toString(36).replace('.', '');  // "iepii89m"
  } else if ((''+expr).match(/^(true|false)$/)) { // 'true', 'false'
    debug && console.info('getValueFromExpressionX boolean', {expr});
    return (''+expr) === 'true';
  } else if ((''+expr).match(/^[0-9.]+$/)) { // 0, 123, 123.45
    debug && console.info('getValueFromExpressionX number', {expr});
    return +expr;
  } else if (expr.match(/^[#.]/)) { // DOM selector, e.g. #foo.bar
    debug && console.info('getValueFromExpressionX DOM selector', {expr});
    const foundEl = scope.querySelector(expr);
    return foundEl.value || foundEl.innerText;
  } else if (expr.match(/^['"].*['"]$/) || expr.includes(' ')) { // 'string val'
    debug && console.info('getValueFromExpressionX string', {expr});
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
      debug && console.info('getValueFromExpressionX no expression', {propName, exprs});
      return scope[propName] ? scope[propName] : expr;
    } else if (endsWithPropName) { // todos.done=true.length, returns value
      debug && console.info('getValueFromExpressionX endsWithPropName', {propName, exprs});
      // returns an array filtered out with matching conditions
      let targetArr = [...scope[propName]];
      const targetProp = exprs.pop();
      exprs.forEach(expr => {
        const [key, value] = expr.split('=');
        targetArr = targetArr.filter(el =>  {
          debug && console.info('getValueFromExpressionX endsWithPropName', el, {key, value});
          if (value === 'true' || value === 'false') {
            return (!!el[key]) == (value == 'true');
          } else {
            return el[key] == value;
          }
        });
      });
      return targetArr[targetProp];
    } else if (endsWithCondition) { // todos.done=true.id=xxx, returns array
      debug && console.info('getValueFromExpressionX endsWithCondition', {propName, exprs});
      let targetArr = [...scope[propName]];
      exprs.forEach(expr => {
        const [key, value] = expr.split('=');
        targetArr = targetArr.filter(el =>  el[key] == value);
      });
      return targetArr;
    }
  }
}
