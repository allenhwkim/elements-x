import { articles } from './articles';

class AppArticles extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    const ulEl = document.createElement('ul');
    const preview = this.getAttribute('preview') !== null;
    for (var key in articles) {
      const article = articles[key];
      if (preview) {
        ulEl.insertAdjacentHTML('beforeend', `
          <li class="article">
            <a href="/articles/${article.uniqueSlug}">
            ${article.previewHTML}
            </a>
          </li>
        `);
      } else {
        ulEl.insertAdjacentHTML('beforeend', `
          <li href="/articles/${article.uniqueSlug}" src="/articles/${article.uniqueSlug}.html">
            <i class="fas fa-book-open"></i>
            <b>${article.title}</b>
          </li>
        `);
      }
    }
    this.appendChild(ulEl);
  }

}

if (!customElements.get('app-articles')) {
  customElements.define('app-articles', AppArticles);
}

