import { loadScript, waitFor, getReactProp, addCss, removeCss } from '../../util';
import { getJsonSchemaProperties } from './get-json-schema-properties';
const css = `x-monaco { display: block;  min-height: 200px; }`;

declare const window: any;

export class Monaco extends HTMLElement {
  monacoEditor: any;
  language: string = 'javascript';
  schemas: any;
  value: string = '';
  required = false;

  async connectedCallback() {
    addCss(this.tagName, css);

    this.innerHTML = '';
    this.language = this.getAttribute('language') || this.dataset.language || 'javascript';
    this.schemas ||= getReactProp(this, 'schemas');
    this.value ||= getReactProp(this, 'value');
    this.required = this.getAttribute('required') !== null;

    await this.loadLibrary(); // enable window.monaco

    this.monacoEditor = window.monaco.editor.create(this, {
      language: this.language,
      theme: this.getAttribute('theme'),
      automaticLayout: true,
      minimap: { enabled: false },
    });
    this.monacoEditor.setValue(this.value);
    (this.language === 'json' && this.schemas) && this.setSchemas();

    this.monacoEditor.onDidBlurEditorText(this.fireEvents.bind(this));
  }

  disconnectedCallback() {
    removeCss(this.tagName);
  }

  fireEvents() {
    const uri = this.monacoEditor.getModel().uri;
    const modelMarkers = window.monaco.editor.getModelMarkers({resource:uri})
    const errors = modelMarkers.map(el => `Line ${el.endLineNumber}: ${el.message}`).join('\n');
    if (errors.length) {
      this.dispatchEvent( new CustomEvent('error', {detail: errors, bubbles: true}) );
    }

    const editorValue = this.monacoEditor.getValue();
    if (this.value !== editorValue) {
      this.value = editorValue;
      const customEvent = new CustomEvent('change', {detail: editorValue, bubbles: true});
      this.dispatchEvent( customEvent );
      if (this.required) {
        this.value ? this.classList.remove('error', 'required') : this.classList.add('error', 'required');
      }
    }
  }

  getErrors() {
    const modelMarkers = window.monaco.editor.getModelMarkers()
    const errors = modelMarkers.map(el => `Line ${el.endLineNumber}: ${el.message}`).join('\n');
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
      newEl.schema.properties = el.schema?.properties || getJsonSchemaProperties(el);
      newEl.required = el.required || [];
      newEl.additionalProperties = el.additionalProperties || false;
      return newEl;
    }); 
    const options = { validate: true, schemas };
    
    console.info('Monaco editor JSON schema', JSON.stringify(options, null, '  '));
    window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions(options);
  }

}
