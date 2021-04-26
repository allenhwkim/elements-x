import { setHTML, addCss, syncAttr} from '../../common';
import css from './text.css';
const html = `
  <span class="label"></span>
  <input />
  <div class="ink-bar"></div>
`;
// <i class="far icon fa-envelope" aria-hidden="true"></i>

export class Text {
  static init() {
    const switchAttrs = ['type', 'label'];
    css && addCss(this, css);

    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      const label = 
      syncAttr(this, inputEl, switchAttrs); // copy attributes to <input> and set

      this.querySelector('.label').innerText = this.getAttribute('label') || '';
      inputEl.value === '' ?
        this.classList.add('empty') : this.classList.remove('empty');
    
      // add event listeners 
      inputEl.addEventListener('focus', e => {
        this.classList.add('x-focused');
        const isEmpty = inputEl.value === '';
        isEmpty ? this.classList.add('empty') : this.classList.remove('empty');
      });
      inputEl.addEventListener('blur', e => this.classList.remove('x-focused'));
      inputEl.addEventListener('input', e => {
        const isEmpty = inputEl.value === '';
        isEmpty ? this.classList.add('empty') : this.classList.remove('empty');
      });
    });
  }
}

