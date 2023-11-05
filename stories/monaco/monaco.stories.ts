import type { Meta } from '@storybook/html';
import { MonacoEditor } from './monaco';
import { fixIndent } from '../../lib/util'

const elName = 'x-monaco';
const className = MonacoEditor;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Monaco (code editor)',
  render: (args) => {
    const wrapperEl = document.createElement('div');
    const el = document.createElement(elName) as any;
    const msgEl = document.createElement('div');
    const errEl = document.createElement('div');
    args.language && el.setAttribute('language', args.language);
    args.theme && el.setAttribute('theme', args.theme);
    args.value && (el.value = args.value);
    args.schemas && (el.schemas = args.schemas);
    wrapperEl.append(el, msgEl, errEl);
    wrapperEl.addEventListener('change', (e:any) =>  msgEl.innerHTML = `event 'change':<pre>${e.detail}</pre>`);
    wrapperEl.addEventListener('error', (e:any) =>  errEl.innerHTML = `event 'error':<pre>${e.detail}</pre>`);
    return wrapperEl as any;
  },
  args: {},
  argTypes: {
    value: { 
      description: `Code of Javascript or JSON`, 
      control: { type: 'text' },
    },
    theme: { 
      description: 'Look and feel of Monaco editor', 
      control: { type: 'radio' },
      options: ['vs', 'vs-dark', 'hc-black', 'hc-light'],
      table: { defaultValue: { summary: 'vs' } },
    },
    language: { 
      description: 'Syntax highlighting', 
      control: { type: 'radio' },
      options: ['javascript', 'json'],
      table: { defaultValue: { summary: 'javascript' } },
    },
    schemas: { 
      description: 'JSON schema, only optional when language is \'json\'', 
      control: 'object',
    },
  },
};

export default meta;

export const Primary = { 
  args: { 
    value: fixIndent(`
      function foo(items) {
        var x = "All this is syntax highlighted";
        return x;
      }`), 
    theme: 'vs-dark',
    language: 'javascript'
  }
};
export const JsonEditor = { 
  args: { 
    value: fixIndent(`
      {
        "foo": 1,
        "bar": 2
      }`), 
    schemas: {
      foo: 'string', 
      bar: 'string'
    },
    language: 'json'
  }
};
