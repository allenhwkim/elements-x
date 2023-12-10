
export function getTrapFocusKeydownListener(element: HTMLElement): (ev: KeyboardEvent) => any {
  if (element.getAttribute('tabindex') === null) {
    element.setAttribute('tabindex', '-1');
  }
  const selector = 'a[href], button, textarea, input[type="text"], input:not([type]), input[type="radio"], input[type="checkbox"], select, [tabindex]';
  const focusableEls = Array.from(element.querySelectorAll(selector)).filter((el: any) => {
    if (el.getAttribute('tabindex')) {
      const blockEl = getComputedStyle(el).display !== 'inline';
      return blockEl && el.getAttribute('tabindex') !== '-1';
    } else {
      return !el.disabled;
    }
  });
  const firstFocusableEl: any = focusableEls[0];
  const lastFocusableEl: any = focusableEls[focusableEls.length - 1];
  const keydownListener = function(e) {
    const isTabPressed = e.keyCode === 9;
    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  };
  return keydownListener;
}