import * as React from 'react';

import { MonacoEditor } from '../index';
import { fixIndent } from '../../lib';
import { useEffect, useRef } from 'react';

declare const window: any;

!customElements.get('monaco-editor') && customElements.define('monaco-editor', MonacoEditor);

export default { component: MonacoEditor as any };

export const JavascriptEditor = (args?: any) => {
  const monacoEditorRef: any = useRef();  

  useEffect(() => {
    if (monacoEditorRef?.current) {
      const changeListener = e => console.debug('monaco-editor change event', e);
      monacoEditorRef.current.addEventListener('monaco-change', changeListener);
    }
  }, []);

  const data = fixIndent(`
    function foo(items) {
      var x = "All this is syntax highlighted";
      return x;
    }`);
  return <>
    <monaco-editor 
      ref={monacoEditorRef}
      value={data} 
      theme="vs-dark" 
      language="javascript"
    >
    </monaco-editor>
  </>
};

// ------------------------------------------------------

export const JsonEditor = (args?: any) => {
  const monacoEditorRef: any = useRef();  
  const data = fixIndent(`{\n  "foo": 1,\n  "bar": 2\n}`);
  const schemas = {
    foo: 'string', 
    bar: 'string'
  };

  const getJsonErrors = () => {
    const errMsg = window.monaco.editor.getModelMarkers()
      .map(el => `Line ${el.endLineNumber}: ${el.message}`)
      .join('\n');
    alert(errMsg);
  };

  return <>
    <monaco-editor 
      ref={monacoEditorRef}
      value={data} 
      language="json"
      schemas={schemas}
    >
    </monaco-editor>
    <button onClick={getJsonErrors}>get JSON errors</button>
  </>
};