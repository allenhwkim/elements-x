import { loadScript, waitFor, getReactProp, addCss, removeCss } from '../../lib';
import { getSchemaProperties } from './get-schema-properties.mjs';

declare const window: any;

export class MonacoEditor extends HTMLElement {
  monacoEditor: any;
  language: string = 'javascript';
  schemas: any;
  value: string = '';

  async connectedCallback() {
    addCss(this.tagName, `monaco-editor { display: block;  min-height: 200px;}`)

    this.innerHTML = '';
    this.language = this.getAttribute('language') || this.dataset.language || 'javascript';
    this.schemas ||= getReactProp(this as any, 'schemas');
    this.value ||= getReactProp(this as any, 'value');

    await this.loadLibrary(); // enable window.monaco

    this.monacoEditor = window.monaco.editor.create(this, {
      language: this.language,
      theme: this.getAttribute('theme'),
      automaticLayout: true
    });
    this.monacoEditor.setValue(this.value);
    this.monacoEditor.onDidBlurEditorText(() => {
      const editorValue = this.monacoEditor.getValue();
      if (this.value !== editorValue) {
        this.value = editorValue;
        const customEvent = new CustomEvent('monaco-change', {detail: editorValue, bubbles: true});
        this.dispatchEvent( customEvent );
      }
    });

    if (this.language === 'json' && this.schemas) {
      this.setSchemas();
    }
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  getValue(data: string) {
    return this.monacoEditor?.getValue();
  }

  setValue(data: string) {
    this.monacoEditor?.setValue(data);
  }

  async loadLibrary() {
    const el = document.createElement('link');
    const cdnBase = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs';
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('data-name', 'vs/editor/editor.main');
    el.setAttribute('href', cdnBase + '/editor/editor.main.min.css');
    loadScript(el, cdnBase + '/loader.min.js');

    await waitFor('window.require');
    window.require.config({ paths: { 'vs': cdnBase} });
    await new Promise(res => window.require(['vs/editor/editor.main'], () => res(true)));
  }

  setSchemas(inSchemas?: any) {
    inSchemas && (this.schemas = inSchemas);
    if (!this.schemas) return;

    const schemasArr = Array.isArray(this.schemas) ? this.schemas : [this.schemas];

    // [ 
    //   { 
    //     fileMatch: ['*'], 
    //     schema: { 
    //        type: 'object', 
    //        properties: {foo: {type: "string"}, bar: {type: "string"}}
    //     },
    //     required: [],
    //     additionalProperties: false
    //   }
    // ]    
    const schemas = schemasArr.map( (el, index) => {
      const newEl: any = {};
      (index === 0) && (newEl.fileMatch = el.fileMatch || ['*']);
      newEl.schema = el.schema || {};
      newEl.schema.type = el.schema?.type || 'object';
      newEl.schema.properties = el.schema?.properties || getSchemaProperties(el);
      newEl.required = el.required || [];
      newEl.additionalProperties = el.additionalProperties || false;
      return newEl;
    }); 
    const options = { validate: true, schemas };
    
    console.info('Monaco editor JSON schema', JSON.stringify(options, null, '  '));
    window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions(options);
  }

}
