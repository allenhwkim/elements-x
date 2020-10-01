import { setElementHTML } from "../common/util";

class XRoute extends HTMLElement {
  // disconnectedCallback() {}
  // adoptedCallback() {}
  // static get observedAttributes() { return ['c', 'l']; }
  // attributeChangedCallback(name, oldValue, newValue) {}

  constructor(...args) {
    const self = super(...args);
    this.routes;
    this.targetId;
    return self;
  }

  connectedCallback() {
    this.querySelectorAll('li:empty').forEach(el => el.style.display = 'none');
    this.targetId = this.getAttribute('target');
    this.routes = this._setRoutesAndClicks();
    this._loadHTML();

    // Listen for DOM change, and also add click listener for each element
    const observer = new MutationObserver(list => {
      this.routes = this._setRoutesAndClicks();
      this._loadHTML();
    }); 
    observer.observe(this, {childList: true, subtree: true}); // no attributes
  
    // Listen for PopStateEvent (Back or Forward buttons are clicked)
    window.addEventListener("popstate", event => this._loadHTML(), true);

    // fire the first x-route-change event
    const state = this._getRoute(window.location.pathname);
    state &&
      this.dispatchEvent(new CustomEvent('x-route-change', { bubbles: true, detail: { state } })); 
  }

  _setRoutesAndClicks() {
    const links = this.querySelectorAll('[href]');
    const routes = [];

    links.forEach(el => {
      const href = el.getAttribute('href');
      const regExp = href.replace(/\*/g, '.*?');
      const path = href.replace(/\*/g, '');
      const src = el.getAttribute('src');
      const name = el.innerText;
      routes.push({regExp, href, path, src, name});
    })

    routes.forEach(route => {
      const el = this.querySelector(`[href='${route.href}']`);
      el.addEventListener('click', e => this._routeClick(e, route) );
    });

    return routes;
  }

  _getRoute(path) {
    return this.routes.find(({regExp}) => {
      return path.match(regExp);
    });
  }

  _routeClick(event, route) {
    event.preventDefault();
    const {regExp, href, path, src, name} = route;

    //  fire route-change event
    const prevUrl = window.location.pathname;
    const custEvent = new CustomEvent('x-route-change', { 
      bubbles: true,
      detail: { prevUrl, state: route }
    }); 
    this.dispatchEvent(custEvent)

    //  change state
    window.history.pushState(route, name, path);

    this._loadHTML(route);

    const routeEls = document.querySelectorAll(`x-route > [href="${route.href}"]`);
    Array.from(routeEls).filter(el => 
      (el.offsetParent === null) &&  // not visible
      el.parentElement !== this // exclude the current one
    ).forEach(el => {
      el.parentElement._loadHTML();
    })
  }

  _loadHTML(route, targetEl) {
    route = route || this._getRoute(window.location.pathname); 
    targetEl = targetEl || document.getElementById(this.targetId);

    if (!route) return false;


    // console.log('..............._loadHTML', route, targetEl)
    // update title and links
    route.name && (document.title = route.name);
    if (route.href) {
      this.querySelectorAll('[href].active').forEach(
        el => el.classList.remove('active') 
      );
      // console.log({href: route.href});
      this.querySelector(`[href="${route.href}"]`).classList.add('active');
    }

    if (targetEl) {
      return window.fetch(route.src+'?'+new Date().getTime()).then(resp => resp.text())
        .then(html => {

          setElementHTML(targetEl, html);
          // // targetEl.innerHTML = html;
          // while(targetEl.firstChild) {
          //   targetEl.removeChild(targetEl.firstChild);
          // }
          // const divEl = document.createElement('div');
          // divEl.insertAdjacentHTML('beforeend', html);
          // Array.from(divEl.childNodes).forEach(node => {
          //   targetEl.appendChild(node)
          // });

          // targetEl.querySelectorAll("script")
          //   .forEach( old => {
          //     const scriptEl = document.createElement("script");
          //     Array.from(old.attributes)
          //       .forEach( attr => scriptEl.setAttribute(attr.name, attr.value) );
          //     scriptEl.appendChild(document.createTextNode(old.innerText));
          //     targetEl.replaceChild(scriptEl, old);
          //   });

          // fire x-load-html event
          const custEvent = new CustomEvent('x-load-html', {bubbles: true, detail: route}); 
          this.dispatchEvent(custEvent)
        })
    } else {
      Promise.resolve(false);
    }
  }
}

if (!customElements.get('x-route')) {
  customElements.define('x-route', XRoute);
}

