import morphdom from 'morphdom/dist/morphdom-esm';
import { hash } from "../../lib";
import { XChecks } from './x-checks';

export class XIf extends HTMLElement {
  template;

  render(this:any) {
    const ifExpr = this.getAttribute('if');
    const checkValue = !!(new Function(`return ${ifExpr}`)());
    this.innerHTML = checkValue ? this.template : '';
  }

  connectedCallback() {
    const ifExpr = this.getAttribute('if');
    if (ifExpr === null) {
      this.innerHTML = 'ERROR: if expression is required, e.g., if="true"';
    } else {
      const ifHash = XChecks.add(ifExpr);
      this.setAttribute(ifHash, '');

      this.template = this.innerHTML;
    }
  }

  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const newHTML = await this.render();
      const updated = document.createElement('div');
      updated.innerHTML += newHTML;
      morphdom(this, updated, { childrenOnly: true }); 
    }, 50);
  }

  disconnectedCallback() {
    const ifExpr = this.getAttribute('if');
    if (ifExpr) {
      const els = document.querySelectorAll(`[${hash(ifExpr)}]`);
      (els.length < 1) && (XChecks.remove(ifExpr));
    }
  }
}
