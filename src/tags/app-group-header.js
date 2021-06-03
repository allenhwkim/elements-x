import {throttle} from '../../lib/common/util';

const componentsHeaderHTML = `
  <style>
  .header > .links > a { display: inline-block;}
  </style>
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
const toolsHeaderHTML = 'tools header';

class AppGroupHeader extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    document.addEventListener('x-route', throttle(
      event => {
        const route = event.detail.state; 
        const path = route.urlPath || '' + route.pattern;
        const groupName = path.match(/^\/[^/]*/)[0];

        if (groupName.indexOf('components')) {
          this._setComponentHeader(route);
        } else if (groupName.indexOf('tools')) {
          this._setToolsHeader(route);
        } else {
          this._setComponentHeader({name: ''});
        }
        this._prevGroupName = groupName;
        setTimeout(_ => window.scrollTo(0, 0)); // go to top;
      }, 500)
    );
  }

  _setComponentHeader(route) {
    this.innerHTML = componentsHeaderHTML;
  
    const path = route.urlPath || '' + route.pattern;
    const componentRoute = path.indexOf('/component') !== -1;

    if (componentRoute && route.urlPath) {
      const elName = route.urlPath.replace('/component/','').split('/')[0];
      // const elName = route.name.toLowerCase();
      if (elName ) {
        this.querySelector('#component-name').innerText = elName; 
        this.querySelector('#github-code').setAttribute('href', 
          `https://github.com/elements-x/elements-x/tree/master/lib/${elName}`);
        this.querySelector('#github-issue').setAttribute('href', 
          `https://github.com/elements-x/elements-x/issues?q=${elName}+in%3Atitle`);
      } else {
        this.querySelector('#component-name').innerText = 'Components'; 
        this.querySelector('#github-code').setAttribute('href', 
          'https://github.com/elements-x/elements-x');
        this.querySelector('#github-issue').setAttribute('href', 
          'https://github.com/elements-x/elements-x/issues');
      }
      this.style.display = 'block';
    } else {
      this.style.display = 'none';
    }
  }

  _setToolsHeader(route) {
    this.innerHTML = toolsHeaderHTML;
  }
}

if (!customElements.get('app-group-header')) {
  customElements.define('app-group-header', AppGroupHeader);
}

