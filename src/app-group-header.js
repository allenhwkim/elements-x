import  {setCustomElementHTMLCss}  from '../lib/common/util';

const componentsHeaderHTML = `
  <div class="header vcentered">
    <h2 class="name" id="component-name">Component</h2>
    <div class="links">
      <a target="_blank" id="github-code" href="https://github.com/components-x/components-x">
        <x-button class="no-border no-shadow icon" title="code">
          <i class="fab fa-js-square"></i>
        </x-button>
      </a>
      <a target="_blank" id="github-issue" href="https://github.com/components-x/components-x/issues">
        <x-button class="no-border no-shadow icon" title="issues">
          <i class="fas fa-comments"></i>
        </x-button>
      </a>
    </div>
  </div>`;
const articlesHeaderHTML = `article header`;
const toolsHeaderHTML = `tools header`;

const css = ``;

class AppGroupHeader extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    document.addEventListener('x-route-change', event => {
      const groupName = event.detail.state.href.match(/^\/[^\/]*/)[0];
      const route = event.detail.state;
      if (groupName.indexOf('components')) {
        this._setComponentHeader(route);
      } else if (groupName.indexOf('tools')) {
        this._setToolsHeader(route);
      } else if (groupName.indexOf('articles')) {
        this._setArticlesHeader(route);
      } else {
        this._setComponentHeader({name: ''});
      }
      this._prevGroupName = groupName;
    });
  }

  _setComponentHeader(route) {
    this.innerHTML = componentsHeaderHTML;

    const componentRoute = route.path.indexOf('/component') !== -1;
    if (componentRoute) {
      const elName = route.name.toLowerCase();
      if (elName ) {
        this.querySelector('#component-name').innerText = route.name; 
        this.querySelector('#github-code').setAttribute('href', 
          `https://github.com/elements-x/elements-x/tree/master/src/lib/${elName}`);
        this.querySelector('#github-issue').setAttribute('href', 
          `https://github.com/elements-x/elements-x/issues?q=${elName}+in%3Atitle`);
      } else {
        this.querySelector('#component-name').innerText = 'Components'; 
        this.querySelector('#github-code').setAttribute('href', 
          `https://github.com/elements-x/elements-x`);
        this.querySelector('#github-issue').setAttribute('href', 
          `https://github.com/elements-x/elements-x/issues`);
      }
      this.style.display = 'block';
    } else {
      this.style.display = 'none';
    }
  }

  _setArticlesHeader(route) {
    this.innerHTML = articlesHeaderHTML;
  }

  _setToolsHeader(route) {
    this.innerHTML = toolsHeaderHTML;
  }
}

if (!customElements.get('app-group-header')) {
  customElements.define('app-group-header', AppGroupHeader);
}

