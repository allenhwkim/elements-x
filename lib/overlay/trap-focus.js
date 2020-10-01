
export function trapFocus(element) {
  element.setAttribute('tabindex', element.getAttribute('tabindex') || '-1');

  const focusableEls = Array.from(element.querySelectorAll(
    'a[href], button, textarea, input[type="text"],' +
    'input[type="radio"], input[type="checkbox"], select, [tabindex]'
  )).filter( el => {
    const tabindex = el.getAttribute('tabindex') || '0';
    return !el.disabled && tabindex !== '-1';
  })
  focusableEls.forEach(el => {
    el.addEventListener('focus', _ => {
      element._overlayClicked = true;
      setTimeout(_ => element._overlayClicked = false, 100);
    });
  });

  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener('keydown', function(e) {
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
  });
}