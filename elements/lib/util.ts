export function addCss(tagName: string, css: string) {
  tagName = tagName.toLowerCase();
  if (!document.querySelector(`style[${tagName}]`)) {
    document.head.insertAdjacentHTML('beforeend', `<style ${tagName}>${css}</style>`);
  }
}

export function removeCss(tagName: string) { 
  !(document.body.querySelectorAll(tagName).length) &&
  document.head.querySelector(`style[${tagName}]`)?.remove();
}

export function loadScript(...urls) {
  Array.from(urls).forEach(url => {
    if (url.tagName === 'SCRIPT') {
      !document.querySelector(`script[src="${url.getAttribute('src')}"]`) && document.head.appendChild(url);
    } else if (url.tagName === 'LINK') {
      !document.querySelector(`link[href="${url.getAttribute('href')}"]`) && document.head.appendChild(url);
    } else if (url.endsWith('.js') && !document.querySelector(`script[src="${url}"]`)) {
      const el = document.createElement('script');
      el.setAttribute('src', url);
      document.head.appendChild(el);
    } else if (url.endsWith('.css') && !document.querySelector(`link[href="${url}"]`)) {
      const el = document.createElement('link');
      el.setAttribute('rel', 'stylesheet');
      el.setAttribute('href', url);
      document.head.appendChild(el);
    }
  })
};

export function waitFor(expr: string, timeout: number = 3000): Promise<any> {
  let waited = 0;
  return new Promise(function(resolve, reject) {
    const func = new Function(`return ${expr}`);
    function waitForCondition() {
      if (func()) {
        resolve(true);
      } else if (waited > timeout) {
        reject(`could not resolve ${expr} in ${timeout}ms.`);
      } else {
        setTimeout(waitForCondition, 300);
        waited += 300;
      }
    }
    waitForCondition();
  });
}

export function fixIndent(code: string) {
  code = code.replace(/^([ \t]*\n+){1,}|[\n\t ]+$/g, ''); // remove empty first/last line
  const firstIndent = (code.match(/^([ ]+)/) || [])[1];
  if (firstIndent) {
    const re = new RegExp(`^${firstIndent}`, 'gm');
    return code.replace(re, '');
  }
  return code;
}


export function debounce(func: Function, wait = 500) {
  let timeout: any;
  return function (this: any, ...args: any) {
    var context = this;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function getReactProp(el: HTMLElement, propName: string) {
  const reactPropKey = Object.keys(el).find( key => key.startsWith('__reactProps$')) // react 17+
  return reactPropKey ? el[reactPropKey][propName] : el[propName];
}

export function hash(str: string) {
  var hash = 0, i:number, chr: number;
  if (!str) return hash;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  hash = hash > 0 ? hash : hash *= -1
  return 'h' + hash.toString(36);
}
