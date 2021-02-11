import { setElementHTML } from '../common/util';

class XRoute extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this.routes;
    this.targetId;
    this.popStateHandler;
    return self;
  }

  connectedCallback() {
    this.querySelectorAll('li:empty').forEach(el => el.style.display = 'none');
    this.targetId = this.getAttribute('target');
    this.routes = this.getRoutes();
    this.addEventListener('click', this.clickHandler.bind(this));
    this._loadHTML(); // initial loading matching current url 

    // Listen for DOM change, and also add click listener for each element
    const observer = new MutationObserver(_ => {
      this.routes = this.getRoutes(); 
      this._loadHTML(); // some route loaded async, so that it needs reloading.
    }); 
    observer.observe(this, {childList: true, subtree: true}); // no attributes
  
    // Listen for PopStateEvent (Back or Forward buttons are clicked)
    this.popStateHandler = this._loadHTML.bind(this);
    window.addEventListener('popstate', this.popStateHandler.bind(this));
    // initial route-change event
    this.fireRouteChangeEvent(window.location.pathname + window.location.search); 
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.popStateHandler);
  }

  getRoute(location) {
    return this.routes.find( route => {
      // console.log('route getRoute', location.match(route.regExp), location, route.regExp);
      return location.match(route.regExp);
    });
  }

  getRoutes() {
    const routes = Array.from(this.querySelectorAll('[href]')).map(el => {
      const name = el.innerText;
      const src = el.getAttribute('src');
      const location = el.getAttribute('href');

      const routeExpr =  el.getAttribute('match') || el.getAttribute('href');
      const params = (routeExpr.match(/:[a-z0-9]+/g) || [])
        .map(el => el.replace(':',''));
      const regExp = routeExpr
        .replace(/\//g, '\\/')
        .replace(/\?/g, '\\?')
        .replace(/:[a-z0-9]+/ig, '(.*)');

      return {regExp, location, src, name, params};
    });

    return routes;
  }

  fireRouteChangeEvent(location) {
    const route = this.getRoute(location);
    const matches = location.match(route.regExp).splice(1);
    const params = {};
    matches.forEach( (match, ndx) => {
      const key = route.params[ndx];
      params[key] = match;
    });
    route.params = params;
    if (route) {
      const event = new CustomEvent('x-route-change', { 
        bubbles: true, 
        detail: { 
          state: route        } 
      });
      this.dispatchEvent(event); 
    }
  }

  clickHandler(event) {
    event.preventDefault(); // so that a[href] does not work, which cause reloading
    const el = event.target.closest('[href]');
    const location = el.getAttribute('href');
    const route = this.getRoute(location);
    // console.log('route clickHandler', {route});
    this._loadHTML(route);

    this.fireRouteChangeEvent(location);
    window.history.pushState(route, route.name, location);
  }

  _loadHTML(route, targetEl) {
    route = route || this.getRoute(window.location.pathname + window.location.search); 
    targetEl = targetEl || document.getElementById(this.targetId);
    if (!route) return false;

    // update title and links
    document.title = route.name;
    this.querySelectorAll('[href].active').forEach( el => el.classList.remove('active') );
    this.querySelector(`[href="${route.location}"]`).classList.add('active');

    window.fetch(route.src+'?'+new Date().getTime()).then(resp => resp.text())
      .then(html => {
        targetEl.style.opacity = 0;
        setElementHTML(targetEl, html);
        const custEvent = new CustomEvent('x-load-html', {bubbles: true, detail: route}); 
        this.dispatchEvent(custEvent);
        setTimeout(_ => targetEl.removeAttribute('style'), 100); // less flashing
      });
  }
}

if (!customElements.get('x-route')) {
  customElements.define('x-route', XRoute);
}

