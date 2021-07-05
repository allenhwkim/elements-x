import { setElementHTML } from '../common/util';

export class XRoute extends HTMLElement {
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

    this._handleDOMChange();
    this._handlePopStateChange();
    this.fireRouteChangeEvent(window.location.pathname); // + window.location.search); 
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.popStateHandler);
  }

  _handleDOMChange() {
    // Listen for DOM change, and also add click listener for each element
    const observer = new MutationObserver(_ => {
      this.routes = this.getRoutes(); 
      this._loadHTML(); // some route loaded async, so that it needs reloading.
    }); 
    observer.observe(this, {childList: true, subtree: true}); // no attributes
  }
  
  _handlePopStateChange() {
    // Listen for PopStateEvent (Back or Forward buttons are clicked)
    this.popStateHandler = _ => this._loadHTML();
    window.addEventListener('popstate', this.popStateHandler.bind(this));
  }

  getRoute(urlPath) {
    const route = this.routes.find(route => urlPath.match(route.pattern));
    if (route) {
      const keys = (route.patternAttr.match(/:[a-z0-9]+/g) || [])
        .map(el => el.replace(':',''));
      const values = urlPath.match(route.pattern).splice(1);
      var result = {};
      keys.forEach((key, i) => result[key] = values[i]);
      route.params = result;
    }

    return route;
  }

  getRoutes() {
    const routeItemEls = Array.from(this.querySelectorAll('[href], [pattern]'));
    const routes = routeItemEls.map(el => {
      const name = el.innerText;
      const src = el.getAttribute('src');
      const urlPath = el.getAttribute('href');

      const patternAttr =  el.getAttribute('pattern') || el.getAttribute('href');
      const patternStr = `^${patternAttr}$`
        .replace(/\//g, '\\/')
        .replace(/\?/g, '\\?')
        .replace(/:[a-z0-9]+/ig, '(.*?)');
      const pattern = new RegExp(patternStr);

      return {pattern, patternAttr, urlPath, src, name};
    });

    return routes;
  }

  fireRouteChangeEvent(urlPath) {
    const route = this.getRoute(urlPath);
    this.debug && console.debug('<x-route> fireRouteChangeEvent', urlPath, route);
    if (route) {
      const event = new CustomEvent('x-route', { 
        bubbles: true, 
        detail: { state: route } 
      });
      this.dispatchEvent(event); 
      return  route;
    }
  }

  clickHandler(event) {
    event.preventDefault(); // so that a[href] does not work, which cause reloading
    const el = event.target.closest('[href]');
    if (el) {
      const href = el.getAttribute('href');
      this.navigate(href);
    }
  }

  navigate(href) {
    // console.log('route clickHandler', {route});
    const route = this.getRoute(href);
    this._loadHTML(route).then(targetEl => {
      this.fireRouteChangeEvent(href);
      // targetEl.scrollIntoView(true);
    });
    window.history.pushState(route, route.name, href); // state, title [, url]
  }

  _loadHTML(route, targetEl) {
    route = route || this.getRoute(window.location.pathname); //  + window.location.search); 
    targetEl = targetEl || document.getElementById(this.targetId);
    if (!route) return false;

    // update title and links
    document.title = route.name;
    const activeRouteEl = this.querySelector(`[href="${route.urlPath}"]`);
    if (activeRouteEl) {
      this.querySelectorAll('[href].active').forEach( el => el.classList.remove('active') );
      this.querySelector(`[href="${route.urlPath}"]`).classList.add('active');
    }

    route = XRoute.beforeFetchCallback ? XRoute.beforeFetchCallback(route) : route;
    return window.fetch(route.src+'?'+new Date().getTime())
      .then(resp => resp.text())
      .then(html => {
        html = XRoute.afterFetchCallback ? XRoute.afterFetchCallback(html) : html;

        targetEl.style.opacity = 0;
        targetEl.classList.remove('slide-in');
        setElementHTML(targetEl, html);
        const custEvent = new CustomEvent('x-load', {bubbles: true, detail: route}); 
        this.dispatchEvent(custEvent);
        setTimeout(_ => {
          targetEl.removeAttribute('style');
          targetEl.classList.add('slide-in');
        }, 100); // less flashing
        return targetEl;
      });
  }
}

if (!customElements.get('x-route')) {
  customElements.define('x-route', XRoute);
}

