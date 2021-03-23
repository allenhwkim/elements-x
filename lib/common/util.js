export function setHTML(el, html, delay=0) {
  return new Promise( function(resolve, reject) {
    if (html) {
      setTimeout(function() {
        const slotExists = html.indexOf('</slot>');
        if (slotExists) {
          // const userNodes = Array.from(el.childNodes);
          const templateHTML = html.replace('></slot>', `>${el.innerHTML}</slot>`);
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
  // const hash = hashCode(css);
  const tagName = el.tagName.toLowerCase();
  // const scoped = scopeCss(css, hash, el.tagName.toLowerCase());
  if (!document.querySelector(`style[${tagName}]`)) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute(tagName,'');
    styleEl.appendChild(document.createTextNode(css));
    // styleEl.innerText = scoped;
    document.head.appendChild(styleEl);
  }
  // el.setAttribute(hash, '');
}

export function removeCss(el) {
  const tagName = el.tagName.toLowerCase();
  const numXElements = document.body.querySelectorAll(`${tagName}`).length;
  const styleElForXElem = document.querySelector(`style[${tagName}]`);
  if (styleElForXElem && numXElements < 1) {
    document.querySelector(`style[${tagName}]`).remove();
  }
}

export function getHtmlError(html) {
  if (html.indexOf('class="medium-article"')) return; // exceptional ones
  
  const parser = new DOMParser();
  const htmlForParser = `<xml>${html}</xml>`
    .replace(/(src|href)=".*?&.*?"/g, '$1="OMITTED"')
    .replace(/<script[\s\S]+?<\/script>/gm, '<script>OMITTED</script>')
    .replace(/<style[\s\S]+?<\/style>/gm, '<style>OMITTED</style>')
    .replace(/<pre[\s\S]+?<\/pre>/gm, '<pre>OMITTED</pre>')
    .replace(/<x-pre[\s\S]+?<\/x-pre>/gm, '<x-pre>OMITTED</x-pre>')
    .replace(/&nbsp;/g, '&#160;');

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
  if (typeof(el.value) === 'undefined') {
    el.innerText = value;
  } else {
    el.value = value;
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
        const event = new CustomEvent('x-attr-changed', {
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