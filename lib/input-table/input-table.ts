import morphdom from 'morphdom/dist/morphdom-esm';
import {loadScript, waitFor} from '../../lib';
declare const window: any;

export class InputTable extends HTMLElement {
  template;
  _jsonData: string = '[{"x": 1, "y": 2}, {"x": 3, "y": 4}, {"x": 5, "y": 6}]';

  get data() { 
    return JSON.parse(this._jsonData); 
  }

  set data(value) {
    const jsonData = JSON.stringify(value);
    if (this.validateData(value) && (jsonData !== this._jsonData)) {
      this._jsonData = jsonData;
      this.#updateDOM();
    }
  }

  async connectedCallback() {
    const template = this.querySelector('template');
    if (!template) {
      this.innerText = 'ERROR: <template> for table row is required.';
      return;
    }   
    const formControls = Array.from(template.querySelectorAll('input, select, textarea') || '');
    const validControls = formControls
      .filter(el => (el as any).getAttribute('name')?.match(/[a-z]+\[\]\[[a-z-0-9]+\]/i));
    if (formControls.length === 0) {
      this.innerText = 'ERROR: min. one input(or select) required with a valid name';
      return;
    } else if (formControls.length !== validControls.length) {
      this.innerText = 'ERROR: input(or select) must have a valid name, e.g, foo[][x]';
      return;
    } else if (template.children.length > 1) {
      this.innerText = 'ERROR: template must have only one root element';
      return;
    } 

    const groupNames = formControls.map(el => el.getAttribute('name')?.replace(/\[[^\]]+\]$/, ''));
    const keyNames = formControls.map(el => (el.getAttribute('name')||'').match(/\[([^\]]+)\]$/)?.[1]);

    if (new Set(groupNames).size !== 1) { // check if all group names are the same
      this.innerText = `ERROR: all control names must start with the same group name, '${groupNames[0]}'`;
      return;
    } else if (keyNames.length !== new Set(keyNames).size) {
      this.innerText = `ERROR: all control names must be different, e.g. foo[][x], foo[][y]`;
      return;
    }

    this.template = template.children[0].cloneNode(true);
    const templateAddBtn = template.querySelector('.add');
    const templateDelBtn = template.querySelector('.del');
    if (!templateAddBtn) {
      const addBtn = document.createElement('button');
      addBtn.innerText = '+', addBtn.classList.add('add');
      this.template.appendChild(addBtn);
    }
    if (!templateDelBtn) {
      const delBtn = document.createElement('button');
      delBtn.innerText = '-', delBtn.classList.add('del');
      this.template.appendChild(delBtn);
    }
  
    this.#updateDOM();
    this.registerEventListener();
  }

  registerEventListener() {
    this.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (target.closest('.add')) {
        console.log('target add', target);
      } else if (target.closest('.del')) {
        console.log('target del', target);
      } else if (target.closest('input,select,textarea')) {
        console.log('target', target);
      }
    });
  }

  async render() { 
    const updated = document.createElement('div');
    let html = '';
    (this.data || []).forEach((datum: any, index: number) => {
      const templateCloned = this.template.cloneNode(true);
      for(var key in datum) {
        const el = templateCloned.querySelector(`[name*="[${key}]"`)
        el.value = datum[key];
      }
      updated.appendChild(templateCloned);
    });
    return updated;
  }

  validateData(value) {
    const isArray = Array.isArray(value);
    const firstElKeys = Object.keys(value[0]||{}).join(',');
    if (isArray) {
      value.forEach(el => {
        const keys = Object.keys(el).join(',');
        if (firstElKeys !== keys) {
          this.innerText = 'ERROR, keys in array are not the same as ' + firstElKeys;
        }
      })
    } else {
      this.innerText = 'ERROR, data must be an array';
      return false;
    }
    return true;
  }

  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const newThis = await this.render();
      morphdom(this, newThis, { childrenOnly: true }); 
    }, 50);
  }
}
