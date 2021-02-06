import { setElementHTML } from '../common/util';

class XRoute extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this.routes;
    this.targetId;
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
    window.addEventListener('popstate', event => this._loadHTML(), true);
    // initial route-change event
    this.fireRouteChangeEvent(window.location.pathname); 
  }

  getRoute(path) {
    return this.routes.find( route => path.match(route.regExp) );
  }

  getRoutes() {
    const routes = Array.from(this.querySelectorAll('[href]')).map(el => {
      const href = el.getAttribute('href');
      const regExp = href.replace(/\*/g, '.*?');
      const path = href.replace(/\*/g, '');
      const src = el.getAttribute('src');
      const name = el.innerText;
      return {regExp, href, path, src, name};
    });

    return routes;
  }

  fireRouteChangeEvent(path) {
    const state = this.getRoute(path);
    state && this.dispatchEvent(new CustomEvent('x-route-change', { bubbles: true, detail: { state } })); 
  }

  clickHandler(event) {
    event.preventDefault(); // so that a[href] does not work, which cause reloading
    const el = event.target.closest('[href]');
    const path = el.getAttribute('href');
    const route = this.getRoute(path);
    this._loadHTML(route);

    this.fireRouteChangeEvent(route.path);
    window.history.pushState(route, route.name, route.path);
  }

  _loadHTML(route, targetEl) {
    route = route || this.getRoute(window.location.pathname); 
    targetEl = targetEl || document.getElementById(this.targetId);
    if (!route) return false;

    // update title and links
    document.title = route.name;
    this.querySelectorAll('[href].active').forEach( el => el.classList.remove('active') );
    this.querySelector(`[href="${route.href}"]`).classList.add('active');

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

