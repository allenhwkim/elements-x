export function trapFocus(element) {
  if (element.getAttribute('tabindex') === null) {
    element.setAttribute('tabindex', '-1'); // to listen to keydown events, Tab, Shift+Tab, but not outlined
  }
  setTimeout(_ => element.focus());

  const focusableEls = Array.from(element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input:not([type]), ' +
    'input[type="radio"], input[type="checkbox"], select, [tabindex]'
  )).filter( el => {
    if (el.getAttribute('tabindex')) {
      const blockEl = getComputedStyle(el).display !== 'inline';
      return blockEl && el.getAttribute('tabindex') !== '-1';
    } else {
      return !el.disabled;
    }
  });

  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  const keydownListener = function(e) {
    const isTabPressed = e.keyCode === 9; // isTabPressed
    if (!isTabPressed) { return; }

    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', keydownListener);

  return keydownListener;
}
