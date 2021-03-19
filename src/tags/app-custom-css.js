import  {setHTML, addCss, removeCss}  from '../../lib/common/util';

const css = `
  app-custom-css .custom-css { 
    display: block;
    position: relative; 
    text-align: right;
    height: 2em;
  }
  app-custom-css.visible .ace {
    display: block;
    top: 0;
    right: 0;
    width: 70%;
    min-width: 400px;
    box-shadow: 2px 2px 8px #CCC;
    z-index: 1;
  }
  app-custom-css .ace {
    display: none;
    position: absolute;
    padding: 8px;
    top: 100%;
    background: #FFF;
    text-align: left;
  }
  app-custom-css a {
    cursor: pointer;
    color: blue;
  }
  `;

const html = `
  <div class="custom-css">
    <a id="edit-css">Override Default Style</a>
    <div class="editor-container ace">
      <x-pre id="ace-editor">
        <slot></slot>
      </x-pre>
      <x-button id="apply-custom-style" class="primary">Apply Custom Style</x-button>
    </div>
  </div>
  <script>
    setTimeout(_ => {
      var editor = ace.edit("ace-editor");
      editor.$blockScrolling = Infinity;

      editor.clearSelection();
      editor.resize();
  
      editor.setOption('useWorker', false); // disable error highlighting
      editor.setOption('maxLines', 200);
      editor.setOption('mode', 'ace/mode/css');
      editor.setOption('theme', 'ace/theme/github');
      editor.setOption('fontSize', '16px');
      window.aceEditor = editor;
    }, 1000);
  </script>
`;

class AppCustomCss extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    this.docClickListener = this._docClick.bind(this);
    this.customStyleEl;
    return self;
  }

  connectedCallback()  {
    this.calledOnce = true;
    addCss(this, css);
    setHTML(this, html)
      .then(_ => {
        document.addEventListener('click', this.docClickListener);
        this._addEventListeners();
        this.style.display = 'block';
      });
  }

  disconnectedCallback() {
    removeCss(this);
    document.removeEventListener('click', this.docClickListener);
    this.customStyleEl && this.customStyleEl.remove();
  }

  _addEventListeners() {
    this.querySelector('#edit-css').addEventListener('click', 
      _ => this.classList.add('visible'));
    this.querySelector('#apply-custom-style').addEventListener('click', _ => {
      const css = window.aceEditor.getValue();
      this._applyCustomCss(css);
    });
  }

  _docClick(event) {
    const closetHostEl = event.target.closest(this.tagName);
    (closetHostEl !== this) && (this.classList.remove('visible'));
  }

  _applyCustomCss(css) {
    this.customStyleEl = document.body.querySelector('style#custom-style');
    if (!this.customStyleEl) {
      this.customStyleEl = document.createElement('style');
      this.customStyleEl.id = 'custom-style';
      document.body.appendChild(this.customStyleEl);
    }
    // this.customStyleEl.innerText = css;
    this.customStyleEl.appendChild(document.createTextNode(css));
  }

  _resetCustomStyle() {
    this.classList.remove('visible');
    this.customStyleEl && this.customStyleEl.remove();
  }
}

if (!customElements.get('app-custom-css')) {
  customElements.define('app-custom-css', AppCustomCss);
}
