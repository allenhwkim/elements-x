import * as cssParser from 'css';

export function setCustomElementHTMLCss(el, html, css, delay=0) {
  return new Promise( function(resolve, reject) {
    setTimeout(function() { // connectedCallback does not have children element immediately
      html && setHTML(el, html);
      if (css) {
        const hash = addStyle(el, css);
        el.setAttribute(hash, '');

        const org = el.disconnectedCallback;
        el.disconnectedCallback = function() {
          org && org();
          removeStyle(css);
        };
      }
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

export function addStyle(el, css) {
  const hash = hashCode(css);
  const scoped = scopeCss(css, hash, el.tagName.toLowerCase());
  if (!document.querySelector(`style[${hash}]`)) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute(hash,'');
    styleEl.appendChild(document.createTextNode(scoped));
    // styleEl.innerText = scoped;
    document.head.appendChild(styleEl);
  }
  return hash;
}

export function scopeCss(css, hash, elName) {
  const parsed = cssParser.parse(css);
  parsed.stylesheet.rules.forEach(rule => {
    rule.selectors && rule.selectors.forEach( (selector, i) => {
      rule.selectors[i] = 
        rule.selectors[i].replace(elName, `${elName}[${hash}]`);
    });
  });
  return cssParser.stringify(parsed);
}

export function removeStyle(css) {
  const hash = hashCode(css);
  const len = document.body.querySelectorAll(`[${hash}]`).length;
  if (len <= 1) {
    document.querySelector(`style[${hash}]`).remove();
  }
}

export function hashCode(string) {
  var hash = 0, i, chr;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return 'x-' + hash.toString(36);
}

export function setElementHTML(el, html) {
  while(el.firstChild) {
    el.removeChild(el.firstChild);
  }
  if (html) {
    const divEl = document.createElement('div');
    divEl.insertAdjacentHTML('beforeend', html);
    Array.from(divEl.childNodes).forEach(node => el.appendChild(node));
  }

  executeScript(el);
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