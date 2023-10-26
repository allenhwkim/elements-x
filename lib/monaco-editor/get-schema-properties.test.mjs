import assert from 'assert/strict';
import { getSchemaProperties } from './get-schema-properties.mjs';

assert.deepEqual( 
  getSchemaProperties({foo: 'string', bar: 'string'}),
  {foo: {type: 'string'}, bar: {type: 'string'}}
)
assert.deepEqual( 
  getSchemaProperties({foo: {type: 'string'}, bar: 'string'}),
  {foo: {type: 'string'}, bar: {type: 'string'}}
)
assert.deepEqual( 
  getSchemaProperties({foo: {a: 'string'}, bar: {b: 'string'}}),
  { 
     foo: {type: 'object', properties: {a: {type: 'string'}}}, 
     bar: {type: 'object', properties: {b: {type: 'string'}}}
  }
)
assert.deepEqual(
  getSchemaProperties({a: 'string', b: {foo: 'string', bar: {x: 'string', y: 'string' }}}),
  { 
    a: {type: 'string'} , 
    b: {type: 'object', properties: {
      foo: {type: 'string'}, 
      bar: {type: 'object', properties: {
        x: {type: 'string'},
        y: {type: 'string'}
      }}
    }}
  }
);