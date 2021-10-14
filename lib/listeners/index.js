import {define} from '../common/util';

export class XListeners extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this.listeners = [];
    return self;
  }

  connectedCallback() {
    this.debug = this.getAttribute('debug') !== null;
  }

  disconnectedCallback() {
    this.listeners.forEach( ([domObj, eventName, func]) => {
      domObj.removeEventListener(eventName, func);
      this.debug && console.debug('x-listeners',
        'event removed from', domObj, eventName, func
      );
    });
  }

  handleGlobalListener(domObj, eventName, func) {
    this.listeners.push([domObj, eventName, func]);
    this.debug && console.debug('x-listeners',
      'event is registered to be removed when disconnected',
      domObj, eventName, func
    );
  }
}
XListeners.define = define('x-listeners', XListeners);
