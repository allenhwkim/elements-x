import { setHTML, addCss, syncAttr} from '../../common';
import css from './switch.css';
const html = `
  <input type="hidden" />
  <div class="x-on">
    <b class="x-text"></b>&nbsp;
    <b class="x-ball"></b>
  </div>
  <div class="x-off">
    <b class="x-ball"></b>&nbsp;
    <b class="x-text"></b>
  </div>
`;

export class Switch {
  static init() {
    const switchAttrs = ['type', 'on', 'off', 'color', 'status', 'disabled', 'role', 'tabindex'];
    css && addCss(this, css);

    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, switchAttrs); // copy attributes to <input> and set

      const on = this.getAttribute('on') || ' ';
      const off = this.getAttribute('off') || ' ';
      this.querySelector('.x-on .x-text').innerText = on;
      this.querySelector('.x-off .x-text').innerText = off;

      if (this.getAttribute('color')) {
        this.style.setProperty('--x-switch-color', this.getAttribute('color'));
      }

      // add event listeners
      this.addEventListener('click', _ => {
        const checked = this.getAttribute('aria-checked') === 'true';
        this.setAttribute('aria-checked', !checked);
        inputEl.value = checked ? on : off;
      });

      this.addEventListener('keydown', event =>  {
        (event.keyCode === 13) && this.click();
      });

      // set attributes
      const disabled = ['true', ''].includes(this.getAttribute('disabled'));
      const status = this.getAttribute('status') || 'off';
      this.setAttribute('tabindex', disabled ? -1 : 0);
      this.setAttribute('role', 'switch');
      this.setAttribute('aria-checked', status === 'on' ? true : false);
    });
  }
}

