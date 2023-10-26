import morphdom from 'morphdom/dist/morphdom-esm';
import { hash } from "../../lib";
import { XChecks } from "./x-checks";

export class XBind extends HTMLElement {
  props = { 
    checkValue: undefined, 
    bindExpr: undefined 
  };

  constructor() {
    super();
    for (let key in this.props) {  //  getter and setters of all reactive props
      Object.defineProperty(this, key, {
        get() { return this.props[key]; },
        set(value) {
          if (this.props[key] === value) return;
          this.props[key] = value;
          this.#updateDOM(); // react to props change
        }
      });
    }
  }

  // Add bindHash to XChecks and make not visible
  connectedCallback(this: any) {
    this.bindExpr = this.innerText;
    if ((this as any).bindExpr === null) {
      this.innerHTML = 'ERROR: bind expression is required, e.g., bind="foo"';
    } 
    const bindHash = XChecks.add(this.bindExpr);
    this.setAttribute(bindHash, '');
    this.checkValue = new Function(`return ${(this as any).bindExpr}`)();
    this.style.display = 'none'; // do not display non-bound one
  }

  // Remove bindHash from XChecks if this is the last one
  disconnectedCallback() {
    const hashStr = hash((this as any).bindExpr);
    if (hashStr) {
      const els = document.querySelectorAll(`[${hashStr}]`);
      (els.length < 1) && (XChecks.remove((this as any).bindExpr));
    }
  }

  // Called by XChecks, which is added from connectedCallback()
  // bindHash is hash of bindExpr, and XChecks find this element by bindHash attributte
  render() { 
    this.#updateDOM();
  }

  #timer: any;
  #updateDOM(this: any) { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const updated = document.createElement('div');
      updated.innerHTML = this.checkValue;
      morphdom(this, updated, { childrenOnly: true }); 
      this.style.display=''; // display once bound
    }, 50);
  }
}