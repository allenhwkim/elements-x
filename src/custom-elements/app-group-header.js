import  {define}  from '../../lib/common/util';

const template = `
  <style>
  .header { display: flex; align-items: center; justify-content: space-between; }
  .header > .links > a { color: inherit;}
  </style>
  <div class="header">
    <h1 class="title" id="component-name">{{TITLE}}</h1>
    <div class="links">
      <a target="_blank" id="github-code" href="https://github.com/elements-x/elements-x/tree/master/lib{{PATH}}">
        <x-button class="no-border no-shadow icon" title="code">
          <i class="fab fa-js-square"></i>
        </x-button>
      </a>
      <a target="_blank" id="github-issue" href="https://github.com/elements-x/elements-x/issues">
        <x-button class="no-border no-shadow icon" title="issues">
          <i class="fas fa-comments"></i>
        </x-button>
      </a>
    </div>
  </div>
  
  <h2>Install &amp; Import</h2>
  <x-pre>
  $ npm install elements-x --save-dev
  </x-pre>
  <x-pre class="import">
  import 'elements-x/dist{{PATH}}';
  </x-pre>
  `;

export class AppGroupHeader extends HTMLElement {
  // static get observedAttributes() { return ['title', 'path']; }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name === 'title') {
  //     html = html.replace(/{{TITLE}}/g, newValue);
  //     this.innerHTML = html;
  //   } else if (name === 'path') {
  //     html = html.replace(/{{PATH}}/g, newValue || '');
  //     this.innerHTML = html;
  //   }
  // }

  connectedCallback() {
    this.title = this.getAttribute('title');
    this.path = this.getAttribute('path') || '';
    let html = template;
    html = html.replace(/{{TITLE}}/g, this.title);
    html = html.replace(/{{PATH}}/g, this.path);
    this.innerHTML = html;
  }
}
AppGroupHeader.define = define('app-group-header', AppGroupHeader);
