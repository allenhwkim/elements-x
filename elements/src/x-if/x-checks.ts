import { hash } from "../../lib";

const XChecks = {
  __checks: {},
  checkAll: function() {
    for(var hash in XChecks.__checks) {
      const checkValue = XChecks.__checks[hash]();
      const els: any = document.querySelectorAll(`[${hash}]`);
      els.forEach(el => {
        if (el && (el.checkValue !== checkValue)) {
          el.checkValue = checkValue; // cause element to render again
          el.render();
        }
      })
    }
  },
  add(expr: string) {
    const key = hash(expr);
    XChecks.__checks[key] = new Function(`return ${expr}`);
    return key;
  },
  remove(expr: string) {
    const key = hash(expr);
    delete XChecks.__checks[key];
  }
} as any;

// aliases
XChecks.check = XChecks.checkAll;
globalThis.XChecks = globalThis.XChecks || XChecks;

export { XChecks };