// import * as cssParser from 'css'; // this is big. do it with webpack rule if needed
// export function scopeCss(css, hash, elName) {
//   const parsed = cssParser.parse(css);
//   parsed.stylesheet.rules.forEach(rule => {
//     rule.selectors && rule.selectors.forEach( (selector, i) => {
//       rule.selectors[i] = 
//         rule.selectors[i].replace(elName, `${elName}[${hash}]`);
//     });
//   });
//   return cssParser.stringify(parsed);
// }

export function setCustomElementHTMLCss(el, html, delay=0) {
  return new Promise( function(resolve, reject) {
    setTimeout(function() { // connectedCallback does not have children element immediately
      html && setHTML(el, html);
      resolve(true);
    }, delay);
  });
}

export function setHTML(el, html) {
  if (!html) return;

  const slotExists = html.indexOf('</slot>');
  if (slotExists) {
    // const userNodes = Array.from(el.childNodes);
    const templateHTML = html.replace('></slot>', `>${el.innerHTML}</slot>`);
    el.innerHTML = templateHTML;
  } else {
    el.innerHTML = html;
  }

  executeScript(el);
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

// export function removeStyle(css) {
//   // const hash = hashCode(css);
//   const numXElements = document.body.querySelectorAll(`[${hash}]`).length;
//   if (numXElements <= 1) {
//     document.querySelector(`style[${hash}]`).remove();
//   }
// }

// export function hashCode(string) {
//   var hash = 0, i, chr;
//   for (i = 0; i < string.length; i++) {
//     chr   = string.charCodeAt(i);
//     hash  = ((hash << 5) - hash) + chr;
//     hash |= 0; // Convert to 32bit integer
//   }

//   return 'x-' + hash.toString(36);
// }

export function getHtmlError(html) {
  if (html.indexOf('class="medium-article"')) return; // generated html, not by me

  const parser = new DOMParser();
  const htmlForParser = `<xml>${html}</xml>`
    .replace(/(src|href)=".*?&.*?"/g, '$1="OMITTED"')
    .replace(/<script[\s\S]+?<\/script>/gm, '<script>OMITTED</script>')
    .replace(/<style[\s\S]+?<\/style>/gm, '<style>OMITTED</style>')
    .replace(/<pre[\s\S]+?<\/pre>/gm, '<pre>OMITTED</pre>')
    .replace(/<app-pre[\s\S]+?<\/app-pre>/gm, '<app-pre>OMITTED</app-pre>')
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

export function fixIndent(code) {
  code = code.replace(/^([ \t]*\n+){1,}|[\n\t ]+$/g, ''); // remove empty first/last line
  const firstIndent = (code.match(/^([ ]+)/) || [])[1];
  if (firstIndent) {
    const re = new RegExp(`^${firstIndent}`, 'gm');
    return code.replace(re, '');
  }
  return code;
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