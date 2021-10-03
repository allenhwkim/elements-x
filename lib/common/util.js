import { fromEvent, timer} from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

export function setHTML(el, html, delay=0) {
  return new Promise( function(resolve, reject) {
    if (html) {
      setTimeout(function() {
        const slotExists = html.indexOf('</slot>');
        if (slotExists) {
          const templateHTML = html.replace('<slot></slot>', el.innerHTML);
          el.innerHTML = templateHTML;
        } else {
          el.innerHTML = html;
        }

        executeScript(el);
        resolve(true);
      }, delay);
    } else {
      resolve(false);
    }
  });
}

export function addCss(el, css) {
  const tagName = el.tagName.toLowerCase();
  const type = tagName === 'x-input' && el.getAttribute('type');
  const typeSuffix = type ? `-${type}` : ''; 
  const selectorName = `${tagName}${typeSuffix}`;
  if (!document.querySelector(`style[${selectorName}]`)) {
    // console.log('[elements-x] addCss', selectorName);
    const styleEl = document.createElement('style');
    styleEl.setAttribute(selectorName,'');
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);
    styleEl.createdAt = new Date().getTime();
    return styleEl;
  } else {
    const styleEl = document.querySelector(`style[${selectorName}]`);
    styleEl.createdAt = new Date().getTime();
  }
}

// this is fired after addCss is done. Thus removeCss is removing css added by addCss
// collect list of addCss selectors for short period of time, 300ms
// check if selector is in the list, do not remove it.
export function removeCss(el) {
  const tagName = el.tagName.toLowerCase();
  const type = tagName === 'x-input' && el.getAttribute('type');
  const typeSuffix = type ? `-${type}` : ''; 
  const selectorName = `${tagName}${typeSuffix}`;
  const numXElements = document.body.querySelectorAll(`${selectorName}`).length;
  const styleElForXElem = document.querySelector(`style[${selectorName}]`);
  if (styleElForXElem && numXElements < 1) {
    // console.log('[elements-x] removeCss', selectorName);
    const styleEl = document.querySelector(`style[${selectorName}]`);
    if (new Date().getTime() > (styleEl.createdAt + 500)) { // only if 500ms passed
      styleEl.remove();
    }
  } 
}

export function getHtmlError(html, paramNoCheckTags) {
  const defaultCheckTags = 'script,style,pre,x-pre,x-ace,x-highlightjs'.split(',');
  const noCheckTags = defaultCheckTags.concat(paramNoCheckTags); 
  const parser = new DOMParser();
  // remove valid html, but non-valid xml tags with its contents, e.g., script, pre, style &nbsp;
  let htmlForParser = `<xml>${html}</xml>` // Can't user html parser, which auto-correct contents
    .replace(/(src|href)=".*?"/g, '$1="OMITTED"')
    .replace(/&nbsp;/g, '&#160;');
  
  noCheckTags.forEach(tagName => {
    const regExp = new RegExp(`<${tagName}[\\s\\S]+?<\\/${tagName}>`, 'gm');
    htmlForParser = htmlForParser.replace(regExp, `<${tagName}>OMITTED</${tagName}>`);
  });
  
  // remove empty attributes, which is invalid for XML parser
  htmlForParser = htmlForParser
    .replace(/(<[a-z-]+.*?)(\s[a-z][a-z-]+\s)(.*?\/?\s?>)/gm, '$1 $3')
    .replace(/(<[a-z-]+.*?)(\s[a-z][a-z-]+)(\/?\s?>)/gm, '$1 $3');

  const doc = parser.parseFromString(htmlForParser, 'text/xml');
  if (doc.documentElement.querySelector('parsererror')) {
    console.error(htmlForParser.split(/\n/).map( (el, ndx) => `${ndx+1}: ${el}`).join('\n'));
    return doc.documentElement.querySelector('parsererror');
  }
}

export function setElementHTML(el, html) {
  while(el.firstChild) {
    el.removeChild(el.firstChild);
  }

  if (html) {
    const htmlError = getHtmlError(
      html.replace(/<style.*?<\/style>/g, '').replace(/<script.*?<\/script>/g, '')
    );
    if (htmlError) {
      el.appendChild(htmlError);
    } else {
      const divEl = document.createElement('div');
      divEl.insertAdjacentHTML('beforeend', html);
      Array.from(divEl.childNodes).forEach(node => el.appendChild(node));
      executeScript(el);
    }
  }

}

function executeScript(el) {
  el.querySelectorAll('script')
    .forEach( old => {
      const scriptEl = document.createElement('script');
      Array.from(old.attributes)
        .forEach( attr => scriptEl.setAttribute(attr.name, attr.value) );
      scriptEl.appendChild(document.createTextNode(old.innerText));
      try {
        el.replaceChild(scriptEl, old); // don't know why this error out
      } catch(e) {
        el.appendChild(scriptEl); 
      }
    });
}

export function debounce(func, wait = 500) {
  var timeout;
  return function (...args) {
    var context = this;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, interval = 500) {
  let isRunning;
  return function(...args) {
    let context = this; 
    if(!isRunning) {
      isRunning = true;
      func.apply(context, args); 
      setTimeout( _ => isRunning = false, interval);
    }
  };
}

export function setTargetValue(el, value) {
  if (['input', 'select'].includes(el.tagName.toLowerCase())) {
    el.value = value;
  } else {
    el.innerText = value;
  }
}

export function range(from, to, step = 1) {
  const range = [];

  let i = from;
  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

export function fireAttrChanged(el, excludes = []) {
  const commonAttrs = 
    'id,class,tittle,lang,hidden,style,dir,tabindex,' +
    'accesskey,debug,contenteditable,draggable'.split(',');

  function callback(mutationList) {
    mutationList
      .filter(mutation => {
        // console.log('mutation', mutation.target, mutation.attributeName);
        return mutation.type === 'attributes' &&
          !excludes.includes(mutation.attributeName) &&
          !commonAttrs.includes(mutation.attributeName) &&
          !mutation.attributeName.match(/^on[a-z]+$/) &&
          // !mutation.attributeName.match(/^aria-/) &&
          !mutation.attributeName.match(/-/);
      }).forEach(mutation => {
        const event = new CustomEvent('x-change', {
          bubbles: true, 
          detail: mutation
        });
        el.dispatchEvent(event);
      });
  }

  const observer = new MutationObserver(callback);
  observer.observe(el, {attributes: true});
}

export function getCustomAttributes(el, excludes=[]) {
  const attrs = {};
  Array.from(el.attributes).filter(attr => {
    const commonAttrs = (
      'id,class,tittle,lang,hidden,style,dir,tabindex,' +
      'accesskey,contenteditable,draggable,' +
      'debug,trace' // x-div reserved attributes
    ).split(',');
    return !excludes.includes(attr.name) &&
      !commonAttrs.includes(attr.name) &&
      !attr.name.match(/^on[a-z]+$/) &&
      // !attr.name.match(/^aria-/) &&
      !attr.name.match(/-/);
  }).forEach(attr => {
    attrs[attr.name] = attr.value;
  });

  return attrs;
}

export function syncAttr(source, target, excepts=[], only=[] ) {
  const attrToIgnore = [
    'class', 'contenteditable', 'debug', 'draggable', 'tabindex'
  ];

  Array.from(source.attributes)
    .filter(attr => !attr.name.match(/^on[a-z]+/))
    .filter(attr => !attrToIgnore.includes(attr.name))
    .filter(attr => only?.length === 0 || only.includes(attr.name) )
    .filter(attr => excepts?.length === 0 || !excepts.includes(attr.name))
    .forEach(attr => target && target.setAttribute(attr.name, attr.value))

  // prepare for future changes using MutationObserver
  function callback(mutationList) {
    mutationList
      .filter(mutation => mutation.type === 'attributes') 
      .filter(mutation => !mutation.attributeName.match(/^on[a-z]+/))
      .filter(mutation => !attrToIgnore.includes(mutation.attributeName))
      .filter(mutation => only?.length && only.includes(mutation.attributeName))
      .filter(mutation => excepts?.length && !excepts.includes(mutation.attributeName))
      .forEach(mutation => {
        const attrName = mutation.attributeName;
        const attrValue = mutation.target.getAttribute(attrName);
        target.setAttribute(attrName, attrValue);
      });
  }
  const observer = new MutationObserver(callback);
  observer.observe(source, {attributes: true});
}

// polling
export function waitUntil(condition) {
  if (Number.isInteger(condition)) {
    return new Promise(function (resolve) {
      setTimeout(_ => resolve(), condition);
    });
  } else if (typeof condition === 'string') {
    let waited = 0;
    return new Promise(function (resolve, reject) {
      function waitForCondition(){
        if (waited > 3000) reject();
        if (window[condition]) 
          return resolve(window[condition]);
        setTimeout(waitForCondition, 100);
        waited += 100;
      }
      waitForCondition();
    });
  } else if (typeof condition === 'function') {
    let waited = 0;
    return new Promise(function (resolve, reject) {
      function waitForCondition(){
        if (waited > 3000) reject();
        if (condition()) 
          return resolve(condition());
        setTimeout(waitForCondition, 100);
        waited += 100;
      }
      waitForCondition();
    });
  }
}

export function observeDOMChange(el, options={}) {
  options = Object.assign({debounce: 100, expires: 2000}, options);

  const observer = new MutationObserver(list =>  {
    el.dispatchEvent(new CustomEvent('dom-change', {detail: list}));
  });
  observer.observe(el, {attributes: false, childList: true, subtree: true });

  let pipeFn;
  if (options.expires) {
    setTimeout(_ => observer.disconnect(), options.expires);
    pipeFn = takeUntil(timer(options.expires));
  } else {
    pipeFn = tap(_ => _); 
  }

  // to fire first event
  setTimeout(_ => el.dispatchEvent(new CustomEvent('dom-change')));
  return fromEvent(el, 'dom-change')
    .pipe(pipeFn, debounceTime(options.debounce));
}

// export function runWhenDOMChanged(el, func, options={debounce:100, expires:1000}) {
//   const observer = new MutationObserver(list =>  {
//     el.dispatchEvent(new CustomEvent('dom-change', {detail: list}));
//   });
//   observer.observe(el, {attributes: false, childList: true, subtree: true });

//   // execute the give func. 100ms debounced
//   const debouncedFunc = debounce(func, options.debounce)();
//   el.addEventListener('dom-change', debouncedFunc);

//   // fire at lease once
//   el.dispatchEvent(new CustomEvent('dom-change', {detail: undefined})); 

//   // stop watching DOM change after 1 second
//   setTimeout(function() {
//     observer.disconnect(el);
//     el.removeEventListener('dom-change', func);
//   }, options.expires);
// }

export function waitUntilIdle(el, options) {
  options = Object.assign({
    wait: 100, attributes: false, childList: true, subtree: true 
  }, options);

  return new Promise(resolve => {
    let observerRunning = false;

    const observer = new MutationObserver(list => {
      observerRunning = true;
      el.dispatchEvent(new CustomEvent('dom-changed', {detail: list, bubbles: true}));
    });
    observer.observe(el, options);

    const domChangeListener = debounce(debounceFunc, options.wait)();
    function debounceFunc() {
      resolve(el);
      observer.disconnect(el);
      el.removeEventListener('dom-change', domChangeListener);
    }
    el.addEventListener('dom-change', domChangeListener);

    // There are two cases. '
    // DOM change happening -> resoved by debounceFunc
    // if no DOM change happening -> resolved after wait time
    setTimeout(_ => { 
      !observerRunning && resolve(el);
    }, options.wait);
  });
}