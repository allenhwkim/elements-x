import assert from 'assert/strict';
import { getJsonSchemaProperties } from './get-json-schema-properties.mjs';

assert.deepEqual( 
  getJsonSchemaProperties({foo: 'string', bar: 'string'}),
  {foo: {type: 'string'}, bar: {type: 'string'}}
)
assert.deepEqual( 
  getJsonSchemaProperties({foo: {type: 'string'}, bar: 'string'}),
  {foo: {type: 'string'}, bar: {type: 'string'}}
)
assert.deepEqual( 
  getJsonSchemaProperties({foo: {a: 'string'}, bar: {b: 'string'}}),
  { 
     foo: {type: 'object', properties: {a: {type: 'string'}}}, 
     bar: {type: 'object', properties: {b: {type: 'string'}}}
  }
)
assert.deepEqual(
  getJsonSchemaProperties({a: 'string', b: {foo: 'string', bar: {x: 'string', y: 'string' }}}),
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