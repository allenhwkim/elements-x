import grapesjs, {Editor} from 'grapesjs';
import grapesjsBlocksBasic from 'grapesjs-blocks-basic';
import grapesjsPluginHeader from 'grapesjs-plugin-header';
import grapesjsParserPostCss from 'grapesjs-parser-postcss';
import grapesjsStyleBg from 'grapesjs-style-bg';

import formsPlugin from './plugins/forms-plugin'; // <form>, <input> ... 
import styleManager from './style-manager';
import elementsXPlugin from './plugins/elements-x-plugin';

export function initGrapesJs(elId: string) : Editor{
  const editor: Editor = grapesjs.init({
    container: elId,
    plugins: [
      'grapesjs-plugin-grid',
      grapesjsParserPostCss,
      grapesjsStyleBg,
      formsPlugin, // form, input, label, textarea, checkbox, radio, select, optioon
      elementsXPlugin, // x-calendar, x-combobox, x-dropdown, x-map, x-masked
      grapesjsBlocksBasic,
      grapesjsPluginHeader,
    ],
    pluginsOpts: {
      'grapesjs-plugin-grid': {
        imgDefault:'column-empty-state.svg',
      }
    },

    storageManager: false,
    styleManager,
    canvas: {
      scripts: [ 
        'https://unpkg.com/elements-x',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
      ],
      styles: [
        'https://unpkg.com/elements-x/dist/lib/style.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        '/grapesjs-plugin-grid.css'
      ],
    }
  });
  editor.setStyle(`
    x-calendar .week-days-container { max-width: 400px; }
    x-calendar .days-container { max-width: 400px; }
  `);

  return editor;
}
