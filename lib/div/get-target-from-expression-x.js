
// return {refs, propName}
// .  refs : object reference
// .  propName: name of property, undefined for element reference
// .  attrName: 
// scope is x-div element
// expr is target value of set commnd, e.g. x-click="set(todos.id=123.done, false)"
export function getTargetFromExpressionX(scope, expr) { 
  const dbg = scope.debug > 1;
  dbg && console.info('  _getExprValue', {scope, expr});
  if (expr.match(/^[#.](.+)\[(.+)\]$/)) { // DOM type, set attribute value
    dbg && console.info('  getTargetFromExpressionX DOM selector Attribute', {scope, expr});
    const [_, selector, attrName] = expr.match(/^(.+)\[(.+)\]$/);
    const els = Array.from(scope.querySelectorAll(selector));
    return {refs: els, attrName};
  } if (expr.match(/^#(.+?)\.(.+)$/)) { // DOM type, set property of DOM element
    dbg && console.info('  getTargetFromExpressionX DOM selector with property', {scope, expr});
    const [_, selector, propName] = expr.match(/^(#.+?)\.(.+)$/);
    return {refs: [scope.querySelector(selector)], propName};
  } else if (expr.match(/^[#.]/)) { // DOM selector, e.g. #foo.bar
    dbg && console.info('  getTargetFromExpressionX DOM selector', {scope, expr});
    const els = Array.from(scope.querySelector(expr));
    return {refs: els, propName: 'value'};
  } else {
    const [propName, ...exprs] = expr.split('.'); // 'foo' => "foo", []
    const endsWithCondition = exprs.length && exprs.slice(-1)[0].match(/.+=.+/);
    const endsWithPropName = exprs.length && exprs.slice(-1)[0].match(/^[^=]+$/);
    if (exprs.length === 0) { // todos
      dbg && console.info('  getTargetFromExpressionX no expression', {propName, exprs});
      return {refs: [scope], propName}; 
    } 
    // todos.done=true.length, returns refs as an array
    else if (endsWithPropName) {
      dbg && console.info('  getTargetFromExpressionX endsWithPropName', {propName, exprs});
      // returns an array filtered out with matching conditions
      const targetProp =exprs.pop(); 
      let targetArr = scope[propName] || [];
      exprs.forEach(expr => {
        const [key, value] = expr.split('=');
        targetArr = targetArr.filter(el =>  {
          if (value === 'true' || value === 'false') {
            return (!!el[key]) == (value == 'true');
          } else {
            return el[key] == value;
          }
        });
      });

      return {refs: targetArr, propName: targetProp}; 
    }
    // todos.done=true.id=xxx, returns array
    else if (endsWithCondition) { 
      dbg && console.info('  getTargetFromExpressionX endsWithCondition', {propName, exprs});
      let targetArr = [...( scope[propName] || [] )];
      exprs.forEach(expr => {
        const [key, value] = expr.split('=');
        targetArr = targetArr.filter(el =>  {
          if (value === 'true' || value === 'false') {
            return (!!el[key]) == (value == 'true');
          } else {
            return el[key] == value;
          }
        });
      });
      return {refs: targetArr}; 
    }
  }
}
