import { getValueFromExpressionX } from './get-value-from-expression-x';

// parse commandExpression to {command, target, options}
//
// From the following command, expressions are shown after arrow(>)
// add(todos, id=d3s3x2, id=123, foo=bar) > [id=d3s3x2, id=123, foo=bar]
// add(todos, name=::value, id=::id, done=false) > [name=::value, id=::id, done=false]
// set(todos, q=#search, limit=#limit) > [q=#search, limit=#limit]
// set(#my-id, foo) > [foo]
// set(foo, #my-section .my-klass) > ['#my-section .my-klass']
// set(foo, my name is {{name}}) > ['my name is {{name}}']
export function parseCommandExpr(el, commandExpr, scope) {
  const dbg = scope.trace;
  dbg && console.info('  parseCommandExpr', {commandExpr});
  const [_0, command, strWithCommas] = commandExpr.split(/^([a-z]+)\((.*)\)$/i);
  const [target, ...optionExprs] = strWithCommas.split(',').map(el => el.trim());
  dbg && console.info('  parseCommandExpr', {el, optionExprs});

  // only target is defined e.g. set(foo), set foo with this value
  const firstOptionExpr = optionExprs[0];
  let options; 
  if (typeof firstOptionExpr === 'undefined') { // in command, only target is given w/o values
    if (typeof el.value !== 'undefined') {
      dbg && console.info('  getArgs case 1', optionExprs.length, el.value);
      options = el.value;
    }
  } else if (optionExprs.length) { // in command, target is given w/ one or values 
    // case 1: [a=1, b=2, c=3]
    // case 2: [::value] 
    // case 3: [true]
    // case 4: [true, 1, 2, 3]
    // case 5: ['a=1']
    if (firstOptionExpr.match(/^(.*?)=(.*)$/)) {  // case 1
      // e.g., [name=::value, id=::id]
      dbg && console.info('  parseCommandExpr with equalSigns', {optionExprs});
      options = {};
      optionExprs.forEach(str => {
        const [_, key, elPropExpr] = str.match(/^(.*?)=(.*)$/);
        if (elPropExpr.startsWith('::')) {
          const elPropName = elPropExpr.replace('::', '');
          options[key] = el[elPropName];
        } else {
          options[key] = getValueFromExpressionX(scope, elPropExpr);
        }
      });
    } else {
      dbg && console.info('  parseCommandExpr with no equalSigns', {optionExprs});
      const results = optionExprs.map(optionExpr => { 
        if (optionExpr.match(/^['"]/)) { 
          return optionExpr.replace(/['"]/g, ''); // case 5
        } else if (optionExpr.match(/^::/)) {
          const elPropName = firstOptionExpr.replace('::', '');  // case 2
          return el[elPropName];
        } else {
          return getValueFromExpressionX(scope, optionExpr);  // case 3, case 4
        }
      });
      options = results.length > 1 ? results : results[0];
    }
  }

  return {command, target, options};
}