/**
 * fire E11-compatible CustomEvent
 */
export function fireCustomEvent(el, eventName, detail?, options?) {
  options = Object.assign({ bubbles:true, detail }, options || {});

  if (CustomEvent && CustomEvent.name === 'CustomEvent') {
    const event = new CustomEvent(eventName, options);
    el.dispatchEvent(event);
  }  else {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent(
      eventName,
      options.bubbles,
      options.cancelable,
      options.detail
    );
    el.dispatchEvent(event);
  }
}