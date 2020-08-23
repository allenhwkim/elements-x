export function trapFocus(element) {
  element.setAttribute('tabindex', element.getAttribute('tabindex') || '-1');

  const focusableEls = Array.from(element.querySelectorAll(
    'a[href], button, textarea, input[type="text"],' +
    'input[type="radio"], input[type="checkbox"], select'
  )).filter( (el: any) => !el.disabled);

  const firstFocusableEl: any = focusableEls[0];
  const lastFocusableEl: any = focusableEls[focusableEls.length - 1];

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