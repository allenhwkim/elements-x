
// todo
// 1. when change, set this._value and fire 'change' event
// 2. when value is set, reset html by value
export class InputTable extends HTMLElement {
  _value: any = undefined;
  keys;

  get value() { return this._value }
  set value(val) {
    this._value = val;
    this.innerHTML = '';
    this.value.forEach(value => this.addNewRow(this, value));
  }

  connectedCallback() {
    const values = (this.value || (this.keys ? [{}] : ['']));
    values.forEach(value => {
      this.addNewRow(this, value);
    });
    this.registerEventListener();
  }

  registerEventListener() {
    this.addEventListener('change', event => {
      // console.log('change event', {event});
      this._value;
      const detail = this.getValue();
      this.dispatchEvent(new CustomEvent('update', {detail, bubbles: true}));
      console.log({detail})
    });
    this.addEventListener('keydown', event => {
      const inputEl = (event.target as any);
      const isLastEl = inputEl.classList.contains('x-last');
      const isFirstEl = inputEl.classList.contains('x-first');
      const rowEl = inputEl.closest('.x-row');
      const numRows = this.querySelectorAll('.x-row').length;
      if (event.code === 'Enter' && isLastEl) {
        this.addNewRow(rowEl); // add an empty row
        event.preventDefault();
      } else if (event.code === 'Backspace' && isFirstEl && numRows > 1 && !inputEl.value) {
        this.delRow(rowEl);
        event.preventDefault();
      }
    })
  }

  getValue() {
    const values: any[] = [];
    const rows = Array.from(this.querySelectorAll('.x-row'));
    rows.forEach(row => {
      const inputs = Array.from(row.querySelectorAll('input'));
      if (inputs.length === 1) {
        const value = inputs[0].value;
        value && values.push(inputs[0].value);
      } else {
        const obj = {};
        inputs.forEach(input => {
          const [key, value] = [input.dataset.key as string, input.value];
          value && (obj[key] = value);
        });
        values.push(obj);
      }
    });
    return values;
  }

  addNewRow(rowEl, value?) {
    const keys = this.keys?.split(',').map(el => el.trim());
    const nextRowEl = document.createElement('div');
    nextRowEl.className='x-row';
    if (keys) {
      keys.forEach((key, ndx) => {
        const firstLast = ndx === 0 ? ' x-first' : ndx === keys.length -1 ? ' x-last': '';
        const inputEl = document.createElement('input');
        inputEl.className = `${key}${firstLast}`;
        inputEl.setAttribute('data-key', key);
        inputEl.setAttribute('placeholder', key);
        value && (inputEl.value = value);
        nextRowEl.appendChild(inputEl);
      });
    } else {
      const inputEl = document.createElement('input');
      inputEl.className = `x-first x-last`;
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
