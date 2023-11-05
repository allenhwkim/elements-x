import type { Meta } from '@storybook/html';
import { Highlight } from './highlight';
import themeCss from '../../lib/form-designer/theme.css';
import { fixIndent } from '../../lib/util';

const elName = 'x-highlight';
const className = Highlight;

!customElements.get(elName) && customElements.define(elName, className);

// code
// theme
const themes = [ 'a11y-dark', 'a11y-light', 'agate', 'an-old-hope', 'androidstudio', 'arduino-light', 'arta', 'ascetic', 'atom-one-dark-reasonable', 'atom-one-dark', 'atom-one-light', 'brown-paper', 'codepen-embed', 'color-brewer', 'dark', 'default', 'devibeans', 'docco', 'far', 'felipec', 'foundation', 'github-dark-dimmed', 'github-dark', 'github', 'gml', 'googlecode', 'gradient-dark', 'gradient-light', 'grayscale', 'hybrid', 'idea', 'intellij-light', 'ir-black', 'isbl-editor-dark', 'isbl-editor-light', 'kimbie-dark', 'kimbie-light', 'lightfair', 'lioshi', 'magula', 'mono-blue', 'monokai-sublime', 'monokai', 'night-owl', 'nnfx-dark', 'nnfx-light', 'nord', 'obsidian', 'panda-syntax-dark', 'panda-syntax-light', 'paraiso-dark', 'paraiso-light', 'pojoaque', 'purebasic', 'qtcreator-dark', 'qtcreator-light', 'rainbow', 'routeros', 'school-book', 'shades-of-purple', 'srcery', 'stackoverflow-dark', 'stackoverflow-light', 'sunburst', 'tokyo-night-dark', 'tokyo-night-light', 'tomorrow-night-blue', 'tomorrow-night-bright', 'vs', 'vs2015', 'xcode', 'xt256',];
// language
const languages = ['javascript', 'html', 'css', 'python', 'sql', 'typescript', 'bash', 'java', 'csharp', 'c++', 'c', 'php', 'go']

const meta: Meta = { 
  title: 'Highlight (code formatting)',
  render: (args) => {
    const el = document.createElement(elName) as any;
    args.code && ( el.code = args.code );
    args.theme && el.setAttribute('theme', args.theme);
    args.language && el.setAttribute('language', args.language);
    return el;
  },

  argTypes: {
    code: { 
      description: `Source code`, 
      control: { type: 'text' },
    },
    theme: { 
      description: `Look-and-feel of highlighted code`, 
      control: { type: 'select' },
      options: themes,
      table: { defaultValue: { summary: 'javascript' } },
    },
    language: { 
      description: `Language to detect for highlighting`, 
      control: { type: 'select' },
      options: languages,
      table: { defaultValue: { summary: 'javascript' } },
    },
  },
};


export default meta;

export const Primary = { 
  args: {
    code: fixIndent(`
      function foo(items) {
        var x = "All this is syntax highlighted";
        return x;
      }
    `),
    theme: 'github',
    language: 'javascript'
  }};
