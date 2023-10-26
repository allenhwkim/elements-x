// {                                {
//   a: 'string',                     a: {type: 'string'} , 
//   b: {                             b: {type: 'object, properties: {
//     foo: 'string',                   foo: {type: 'string'}, 
//     bar: {                           bar: {type: 'object', properties: {
//       x: 'string'                      x: {type: 'string'},
//       y: 'string                       y: {type: 'string'}
//      }                               }}
//   }                                }}
// }                                }
export function getSchemaProperties(obj) {
  const TYPES = ['string', 'number', 'integer', 'object', 'array', 'boolean', 'null'];
  const ret = {...obj};
  for (var key in ret) {
    const val = ret[key];
    if (ret.type) {
    } else if (typeof val === 'string' && TYPES.includes(val)) {
      ret[key] = {type: val}
    } else if (typeof val === 'object') {
      if (TYPES.includes(val.type)) {
        // proper type is already defined by user
      } else {
        ret[key] = {type: 'object', properties: getSchemaProperties(val)}
      }
    } else {
      ret[key] = {type: 'invalid ' + val}
    }
  }
  return ret;
}