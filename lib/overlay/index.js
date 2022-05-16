import { trapFocus } from '../common';

function isInPositionedEl(el) {
  do {
      el = el.parentElement;
      if (!el) return false; // more than document.body
  } while(el && getComputedStyle(el).position === 'static')
  return true;
}

export function hideOverlay(overlayEl) {
  (typeof overlayEl === 'string') && (overlayEl = document.querySelector(overlayEl));
  overlayEl.dispatchEvent(new CustomEvent('close'));
}

export function showOverlay(overlayEl, positionEl, options = {focusBack: true}) {
  (typeof overlayEl === 'string') && (overlayEl = document.querySelector(overlayEl));
  (typeof positionEl === 'string') && (positionEl = document.querySelector(positionEl));
  if (overlayEl.style.disply === 'block') return; // to prevent multiple event register

  const elYPos = positionEl.getBoundingClientRect().bottom;
  const positionElAtBottom = window.innerHeight < elYPos + overlayEl.offsetHeight;
  if (positionElAtBottom) {
    overlayEl.style.top = `${positionEl.offsetTop - overlayEl.offsetHeight}px`;
  } else {
    overlayEl.style.top = `${positionEl.offsetTop + positionEl.offsetHeight}px`;
  }

  if (!positionEl.parentElement.isSameNode(overlayEl.parentElement)) {
    console.warn('[overlay] overlaying element and positoin element must be in the same parent element');
  }
  if (!isInPositionedEl(overlayEl)) {
    console.warn('[overlay] overlaying element must not be in positioned element');
  }

  overlayEl.style.display = 'block'; /* to overwrite a case of inline styling */
  overlayEl.style.left = `${positionEl.offsetLeft}px`;

  // if too much to the right, adjust the position
  const overlayElEnd = overlayEl.getBoundingClientRect().right;
  if (overlayElEnd > window.innerWidth) {
    const left = window.innerWidth - overlayElEnd.offsetWidth - 24;
    overlayEl.style.left = `${left}px`;
  }

  overlayEl.classList.add('x-overlay', 'x-show');
  const trapListener = trapFocus(overlayEl);

  function eventHandler(event) {
    if (event.type === 'keydown' && event.key === 'Escape') {
      overlayEl.dispatchEvent(new CustomEvent('close'));
    } else if (positionEl.contains(event.target)) {
      return;
    } else if (event.type === 'resize') {
      overlayEl.dispatchEvent(new CustomEvent('close'));
    } else if (event.type === 'click' && !overlayEl.contains(event.target)) {
      overlayEl.dispatchEvent(new CustomEvent('close'));
    }
  }

  // add event listeners to close the overlay
  window.addEventListener('resize', eventHandler);
  document.body.addEventListener('click', eventHandler);
  document.body.addEventListener('keydown', eventHandler);

  // when close, remove all listeners
  let focusedEl = document.activeElement;
  overlayEl.addEventListener('close', event => {
    overlayEl.style.display = 'none';

    // remove listeners
    overlayEl.removeEventListener('keydown', trapListener);
    window.removeEventListener('resize', eventHandler);
    document.body.removeEventListener('click', eventHandler);
    document.body.removeEventListener('keydown', eventHandler);

    // focus back to the element that was focused before
    options.focusBack && focusedEl?.focus();
    focusedEl = null; // focus back only once in case of multiple close
  });
}