
// 1. when input values change, set this._value and fire 'update' event
// 2. when value property is set, reset html
export class Table extends HTMLElement {
  _orgValue: any = undefined;
  _value: any = undefined;
  required = false;

  get value() { return this._value }
  set value(val) { 
    if (Array.isArray(val)) {
      this._orgValue = val;
      this._value = val;
      this.innerHTML = '';
      this.value.forEach(value => this.addNewRow(this, value));
    } else {
      console.error('Error on .x.table', 'Value must be an array of string or object');
    }
  }

  get keys() { // returns keys for each row
    const valLen = this._orgValue?.length;
    const valType = typeof (valLen ? this._orgValue[0] : 'string');
    const keys = (valType === 'object') && Object.keys(this._orgValue[0]);
    return keys;
  }

   
  static get observedAttributes() {
    return ['value', 'input-class'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'input-class') {
    } else if (name === 'value') {
      try {
        this.value = JSON.parse(newValue);
      } catch(e) {
        console.error(e);
        console.error('Invalid value');
      }
    }
  }

  connectedCallback() {
    const keys = this.keys;
    const emptyObj = keys ? keys.reduce((acc, key) => (acc[key] = '', acc), {}) : '';
    const rows = (this.value?.length ? this.value : [emptyObj]);
    this.required = this.getAttribute('required') !== null;
    (!this.value?.length) && rows.forEach(row => { this.addNewRow(this, row); });

    this.addEventListener('change', event => {
      this._value = this.getValue(); // do not set to this.value, causing reset of html
      this.dispatchEvent(new CustomEvent('update', {detail: this.value, bubbles: true}));
      this.#setRequiredError();
    });

    this.addEventListener('keydown', event => {
      const inputEl = (event.target as any);
      const rowEl = inputEl.closest('.table-row');
      const numRows = this.querySelectorAll('.table-row').length;
      const allInputEmpty = Array.from(rowEl.querySelectorAll('input')).every((el:any) => !el.value);
      if (event.code === 'Enter') {
        this.addNewRow(rowEl); // add an empty row
        event.preventDefault();
      } else if (event.code === 'Backspace' && numRows > 1 && allInputEmpty) {
        this.delRow(rowEl);
        event.preventDefault();
      }
      this.#setRequiredError();
    })
  }

  #setRequiredError() {
    if (this.required) {
      this.value?.length > 0 ? this.classList.remove('error', 'required') : this.classList.add('error', 'required');
    }
  }

  getValue() {
    const values: any[] = [];
    const rows = Array.from(this.querySelectorAll('.table-row'));
    rows.forEach(row => {
      const inputs = Array.from(row.querySelectorAll('input'));
      if (inputs.length === 1) { // string array
        const value = inputs[0].value;
        value && values.push(inputs[0].value);
      } else { // object array
        const obj = {};
        inputs.forEach(input => {
          const [key, value] = [input.dataset.key as string, input.value];
          value && (obj[key] = value);
        });
        Object.keys(obj).length && values.push(obj);
      }
    });
    return values;
  }

  addNewRow(rowEl, value?) { // HTMLElement, {foo: 1, bar: 2}
    const keys = this.keys;
    const nextRowEl = document.createElement('div');
    const inputKlass = this.getAttribute('input-class');
    nextRowEl.className='table-row';
    if (keys) {
      keys.forEach(key => {
        const inputEl = document.createElement('input');
        // inputEl.className = `${key}`;
        inputEl.setAttribute('data-key', key);
        inputEl.setAttribute('placeholder', key);
        inputKlass && inputEl.setAttribute('class', inputKlass);
        value && (inputEl.value = value[key]);
        nextRowEl.appendChild(inputEl);
      });
    } else {
      const inputEl = document.createElement('input');
      inputKlass && inputEl.setAttribute('class', inputKlass);
      value && (inputEl.value = value);
      nextRowEl.appendChild(inputEl);
    }
    rowEl.insertAdjacentElement(rowEl === this ? 'beforeend':'afterend', nextRowEl);
    nextRowEl.querySelector('input')?.focus();
  }

  delRow(rowEl) {
    const nextRow = rowEl.previousElementSibling || rowEl.nextElementSibling;
    nextRow.querySelector('input').focus();
    rowEl.remove();
  }

}
