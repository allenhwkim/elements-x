import {setHTML, addCss, syncAttr} from '../../common';
import css from './time.css';
import { showOverlay, hideOverlay} from '../../overlay'

export class XTime {
  
  static init() {
    const isTextField = this.getAttribute('text-field') !== null;
    const inputHTML = isTextField ?  '<x-input type="text"></x-input>' : '<input />';
    
    const html = `${inputHTML}<x-clock class="x-overlay"></x-clock>`;
    const timeAttrs = 'type'.split(',');
    addCss(this, css);

    this.addEventListener('x-input-init', e => {
      const inputEl = this.querySelector('input');
      const clockEl = this.querySelector('x-clock');

      syncAttr(this, inputEl, timeAttrs); // copy attributes to <input>
      syncAttr(this, clockEl, [], timeAttrs); // copy attributes to <x-clock>

      inputEl.addEventListener('focus', e => { // when <input> is focused, show clock element
        showOverlay(clockEl, this, {focusBack: false})
      });

      if (inputEl?.value.match(/[0-9]+:/)) { // set clock element's time
        const [hour, minute]  = inputEl.value.split(':');
        setTimeout(_ => {
          clockEl._time.setHours(hour);
          clockEl._time.setMinutes(minute);
          clockEl._updateHourHand(clockEl._time, true, false);
        });
      }

      clockEl.addEventListener('select', e => { // when select time, set <input> value then hide clock element
        inputEl.value = e.detail.toISOString().slice(11, 16); 
      });
    });

    // css && addCss(this, css);
    return setHTML(this, html, 100).then(_ => {
      if (!isTextField) {
        this.querySelector('input').dispatchEvent(new CustomEvent('x-input-init', { bubbles: true }));
      }
    });

  }

}
