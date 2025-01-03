import { format } from "@storybook/blocks";

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

export function waitFor(expr: string, timeout: number = 10000): Promise<any> {
  let waited = 0;
  //@ts-ignore
  const _this = this;
  return new Promise(function(resolve, reject) {
    const func = new Function(`return ${expr}`);
    function waitForCondition() {
      if (func.bind(_this)()) {
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

export function getReactProp(el: any, propName: string) {
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

export function formatDate(date, format = 'yyyy-mm-dd') { // mm/dd/yyyy, www MMM DDD YYYY
  const day = date.getDate();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const daySuffix = 
    day > 3 && day < 21 ? 'th' :
    day % 10 === 1 ? 'st': 
    day % 10 === 2 ? 'nd': 
    day % 10 === 3 ? 'rd':  'th';
  const yyyy = date.getFullYear()
  const mmm = months[date.getMonth()];
  const mm = ('0' + (date.getMonth() + 1)).slice(-2)
  const dd = ('0' + day).slice(-2);
  const ddd = day + daySuffix;
  const www = weekdays[date.getDay()];

  return format
    .replace('www', www).replace('www', www)
    .replace('yyyy', yyyy).replace('YYYY', yyyy)
    .replace('mmm', mmm).replace('MMM', mmm)
    .replace('mm', mm).replace('MM', mm)
    .replace('ddd', ddd).replace('DDD', ddd)
    .replace('dd', dd).replace('DD', dd)
}

/**
 * returns a date without timezone consideration. Used to ignore timezone.
 * @param date Date type
 * @returns a date without timezone consideration
 */
export function localDate(date, format): Date {
  if (!date) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    date = new Date(Date.now() - tzoffset);
  } else if (typeof date === 'string') {
    date = new Date(date);
  }
  const str = date.toISOString().slice(0, -1).replace(/[^0-9]/g, '');
  const [year, month, day] = [str.substr(0,4), str.substr(4,2), str.substr(6,2)];

  const localDate = new Date(+year, +month - 1, +day, 2, 0, 0); // disable summer time
  localDate.toString = () => formatDate(localDate, format);
  return localDate;
}

export function getFunction(str) {
  const params = str.match(/function.*?\((.*?)\)/)[1].split(',').map(el => el.trim());
  const funcBody = str.match(/\{([\s\S]+)\}$/m)[1];
  return new Function(...params, funcBody);
}