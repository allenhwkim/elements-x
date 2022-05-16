/**
 * 
 * Returns an element ighlighted by the given opton and class
 * 
 * @param {HTMLElement} containerEl, <x-select> tag
 * @param {Object} param, option to highlight
 *   e.g. {value: 'preselect me'}, {search: 'find me'}, {prevNext: 'NEXT'}
 * @param {String} classStr, default: 'x-highlighted'
 * @returns {HTMLElement} element to be highlighted
 */
export function highlight(containerEl, param, classStr='x-highlighted') {
  if (param.search !== undefined) {
    const matches = Array.from(containerEl.children).filter(el => {
      const match = el.innerText.match(new RegExp(param.search, 'i'));
      el.classList.remove(classStr, 'hidden');
      !match && el.classList.add('hidden');
      return match;
    });
    matches[0]?.classList.add(classStr);
  } else if (param.prevNext) {
    // do nothing
  } else { // param.value called when focused, thus clearing all hidden els
    Array.from(containerEl.children).forEach(el => el.classList.remove('hidden'));
  }

  const allAvailOptions = Array.from(containerEl.children)
    .filter(optionEl => {
      const notDisabled = optionEl.getAttribute('disabled') === null;
      const notHidden = !optionEl.classList.contains('hidden');
      return notDisabled && notHidden;
    });

  const curIndex = allAvailOptions
    .findIndex(el => el.isEqualNode(getHighlighted(containerEl))) || 0;
  const total = allAvailOptions.length;

  let nextHighlight;
  if (param.prevNext === 'NEXT') {
    nextHighlight = allAvailOptions[(curIndex + total + 1) % total];
  } else if (param.prevNext === 'PREV') {
    nextHighlight = allAvailOptions[(curIndex + total - 1) % total];
  } else if (param.value) {
    nextHighlight = getElWithValue(containerEl, param.value);
  }

  if (nextHighlight) {
    getHighlighted(containerEl)?.classList.remove(classStr, 'x-selected');
    if (param.value) {
      nextHighlight.classList.add('x-selected', classStr);
    } else {
      nextHighlight.classList.add(classStr);
    }
    scrollIfNeeded(containerEl, nextHighlight);
  }

  return nextHighlight;
}

/**
 * Returns the currently highlighted element 
 * @param {HTMLElement} containerEl, <x-select> tag 
 * @returns {HTMLElement} highlighted element
 */
export function getHighlighted(containerEl) { 
  return containerEl.querySelector('.x-highlighted:not(.hidden)');
}

/**
 * Returns an element with value
 * @param {HTMLElement} containerEl, <x-select> tag
 * @returns {HTMLElement} an element with value
 */
export function getElWithValue(containerEl, value) {
  return Array.from(containerEl.children).find(optionEl => {
    return (optionEl.value === value) || (optionEl.getAttribute('value') === value.toString());
  })
}

/**
 * Scroll to the element if it is not visible
 * @param {HTMLElement} containerEl, <x-select> tag
 * @param {HTMLElement} element to be scrolled
 * @returns undefined
 */
export function scrollIfNeeded(container, element) {
  if (element.offsetTop < container.scrollTop) {
    container.scrollTop = element.offsetTop;
  } else {
    const offsetBottom = element.offsetTop + element.offsetHeight;
    const scrollBottom = container.scrollTop + container.offsetHeight;
    if (offsetBottom > scrollBottom) {
      container.scrollTop = offsetBottom - container.offsetHeight;
    }
  }
}