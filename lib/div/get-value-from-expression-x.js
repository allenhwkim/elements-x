// return object from string expression considering scope
// scope is x-div element
// expr is attribute value, e.g. x-value="todos.length"
export function getValueFromExpressionX(scope, expr) { 
  const dbg = scope.debug > 1;
  dbg && console.info('  getValueFromExpressionX', {scope, expr});
  if (expr.length === 3) { // [true, 'On', 'Off']
    dbg && console.info('  getValueFromExpressionX boolean expression with values', {expr});
    return expr[0] ? expr[1] : expr[2];
  } else if (expr === '::id') { // a unique id
    dbg && console.info('  getValueFromExpressionX ::id', {expr});
    return (+new Date + Math.random()).toString(36).replace('.', '');  // "iepii89m"
  } else if ((''+expr).match(/^(true|false)$/)) { // boolean expression, e.g, 'true', 'false'
    dbg && console.info('  getValueFromExpressionX boolean expression without values', {expr});
    return (''+expr) === 'true';
  } else if ((''+expr).match(/^[0-9.]+$/)) { // number expression, e.g. 0, 123, 123.45
    dbg && console.info('  getValueFromExpressionX number', {expr});
    return +expr;
  } else if (typeof expr !== 'string') { // not string expressoin
    dbg && console.info('  getValueFromExpressionX not string expression', {expr});
    return expr;
  } else if (expr.match(/^[#.]/)) { // DOM selector, e.g. #foo.bar
    dbg && console.info('  getValueFromExpressionX DOM selector', {expr});
    const foundEl = scope.querySelector(expr);
    return foundEl.value || foundEl.innerText;
  // eslint-disable-next-line no-useless-escape
  } else if (expr.match(/^['"{]/) || expr.match(/ /) || expr.match(/[^a-z0-9.\[\]]/i)) { // 'string val'
    dbg && console.info('  getValueFromExpressionX string', {expr});
    (expr.match(/{{.+}}/g) || []).forEach(el => {
      const propName = el.replace(/[{}]/g, '');
      expr = expr.replace(el, scope[propName]);
    });
    return expr;
  } else if (expr === '') {
    dbg && console.info('  getValueFromExpressionX blank', {expr});
    return '';
  } else {
    dbg && console.info('  getValueFromExpressionX with object expression', {expr});
    const [propName, ...exprs] = expr.split('.'); // 'foo' => "foo", []
    const endsWithCondition = exprs.length && exprs.slice(-1)[0].match(/.+=.+/);
    const endsWithPropName = exprs.length && exprs.slice(-1)[0].match(/^[^=]+$/);
    if (exprs.length === 0) { // e.g., todos
      dbg && console.info('  getValueFromExpressionX no expression', {propName, exprs});
      return scope[propName] ? scope[propName] : expr;
    } else if (endsWithPropName && Array.isArray(scope[propName])) { // todos.done=true.length, returns value
      dbg && console.info('  getValueFromExpressionX endsWithPropName and array', {propName, exprs});
      // returns an array filtered out with matching conditions
      let targetArr = [...scope[propName]];
      const targetProp = exprs.pop();
      exprs.forEach(expr => {
        const [key, value] = expr.split('=');
        targetArr = targetArr.filter(el =>  {
          dbg && console.info('  getValueFromExpressionX endsWithPropName and array', el, {key, value});
          if (value === 'true' || value === 'false') {
            return (!!el[key]) == (value == 'true');
          } else {
            return el[key] == value;
          }
        });
      });
      return targetArr[targetProp];
    } else if (endsWithCondition && Array.isArray(scope[propName])) { // todos.done=true.id=xxx, returns array
      dbg && console.info('  getValueFromExpressionX endsWithCondition and array', {propName, exprs});
      let targetArr = [...scope[propName]];
      exprs.forEach(expr => {
        const [key, value] = expr.split('=');
        targetArr = targetArr.filter(el =>  el[key] == value);
      });
      return targetArr;
    } else if (endsWithPropName && !Array.isArray(scope[propName])) { // e.g., event.detail
      dbg && console.info('  getValueFromExpressionX endsWithCondition and NOT array', {propName, exprs});
      const func = new Function('scope', `return scope.${expr};`);
      return func(scope);
    } else if (expr.match(/=/)) { // resp.data.gender
      dbg && console.info('  getValueFromExpressionX has = in expression', {propName, expr});
      const [left, right] = expr.split(/=+/);
      const func = new Function('scope', `return scope.${left};`);
      const leftVal = func(scope);
      return leftVal == right;
    }
  }
}
