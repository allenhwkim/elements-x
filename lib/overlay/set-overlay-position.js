export function setOverlayPosition(triggerEl, overlayEl, showArrow) {
  overlayEl.querySelectorAll(`.x-arrow`).forEach(el => el.style.display = 'none');

  const elYPos = triggerEl.getBoundingClientRect().bottom;
  const triggerAtBottom = window.innerHeight < elYPos + overlayEl.offsetHeight;
  if (showArrow) {
    const upOrDown = triggerAtBottom ? 'down' : 'up';
    overlayEl.querySelector(`.x-arrow.${upOrDown}`).style.display = 'block';
  }

  const left = showArrow ?
    triggerEl.offsetLeft + (triggerEl.offsetWidth / 2) - (overlayEl.offsetWidth / 2) :
    triggerEl.offsetLeft;

  const top = triggerAtBottom ?
    triggerEl.offsetTop - overlayEl.offsetHeight:
    triggerEl.offsetTop + triggerEl.offsetHeight;
  overlayEl.style.left = `${left}px`;
  overlayEl.style.top = `${top}px`;
  overlayEl.style.minWidth = triggerEl.offsetWidth + 'px';

  // if too much to the right, adjust the position
  const overlayElEnd = overlayEl.getBoundingClientRect().right;
  if (overlayElEnd > window.innerWidth) {
    const left = window.innerWidth - overlayElEnd.offsetWidth - 24;
    overlayElEnd.style.left = `${left}px`;
  }

  if (showArrow) {
    const upOrDown = triggerAtBottom ? 'down' : 'up';
    const arrowEl = overlayEl.querySelector(`.x-arrow.${upOrDown} .x-icon`);
    arrowEl.style.left = (triggerEl.offsetLeft - overlayEl.offsetLeft) +
        (triggerEl.offsetWidth / 2) + 'px';  
  }
}