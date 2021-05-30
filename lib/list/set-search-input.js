// separated this function to make the main class neat, by separating outside-element functionality
export function setSearchInput() { // this = <x-list>
  const searchInputId = this.getAttribute('search-input');
  const overlayParent = this.closest('x-overlay');
  const firstListItem = this.firstElementChild;

  const searchInputEl = document.getElementById(searchInputId);
  const inputEl = (overlayParent || {})._triggerEl || searchInputEl;
  if (inputEl) {
    inputEl.setAttribute('autocomplete', 'off');
    inputEl.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        const highlightedEl = this.querySelector('.x-highlighted');
        this._fireSelect(highlightedEl || firstListItem);
      } else if (event.code === 'ArrowUp') {
        this._highlightEl(-1); // highlight previous
      } else if (event.code === 'ArrowDown') {
        this._highlightEl(+1); // highlight next
      }
    });

    inputEl.addEventListener('input', event => {
      const val = (inputEl.value || inputEl.innerText).toLowerCase();
      Array.from(this.children).forEach(el => {
        el.style.display = el.innerText.toLowerCase().indexOf(val) === -1 ? 'none' : '';
      });
      overlayParent && overlayParent.open();
    });

    this.addEventListener('x-select', event => {
      inputEl.value = inputEl.innerText = event.detail.innerText;
      overlayParent && overlayParent.close();
    });
  }
}
