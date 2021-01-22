import { WatchDirectoryFlags } from 'typescript';
import { articles } from '../articles';

class AppArticles extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    const divEl = document.createElement('div');
    const preview = this.getAttribute('preview') !== null;
    for (var key in articles) {
      const article = articles[key];
      if (preview) {
        divEl.classList.add('articles-container');
        // divEl.setAttribute('style', 'column-count: 2')
        divEl.insertAdjacentHTML('beforeend', `
          <div class="article">
            <a href="/article/${article.uniqueSlug}">
            ${article.previewHTML}
            </a>
          </div>
        `);
      } else {
        divEl.insertAdjacentHTML('beforeend', `
          <a class="route-item"
            href="/article/${article.uniqueSlug}"
            src="/articles/${article.uniqueSlug}.html">
            <i class="fas fa-book-open"></i>
            <b>${article.title}</b>
          </a>
        `);
      }
    }
    this.appendChild(divEl);
  }

}

if (!customElements.get('app-articles')) {
  customElements.define('app-articles', AppArticles);
}

