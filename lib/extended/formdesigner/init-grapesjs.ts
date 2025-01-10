import grapesjs, {Editor, usePlugin} from 'grapesjs';
import grapesjsParserPostCss from 'grapesjs-parser-postcss';
import grapesjsStyleBg from 'grapesjs-style-bg';

import formsPlugin from './plugins/forms-plugin'; // <form>, <input> ... 
import styleManager from './style-manager';
import elementsXPlugin from './plugins/elements-x-plugin';
import bsBasicPlugin from './plugins/bootstrap-basic';
import bsPadPlugin from './plugins/bootstrap-pad';

export function initGrapesJs(elId: string) : Editor{
  const editor: Editor = grapesjs.init({
    container: elId,
    plugins: [
      // cleaner css, https://grapesjs.com/docs/guides/Custom-CSS-parser.html#plugins
      grapesjsParserPostCss,

      // Style manger - background
      grapesjsStyleBg,

      // bootstrap grid, text, link, image
      usePlugin(bsBasicPlugin, {category: 'Bootstrap5 Basic'}),

      // bootstrap padding change by click
      usePlugin(bsPadPlugin, {typesToApply: ['div', 'bs-row', 'bs-col', '']}),

      // form, input, label, textarea, checkbox, radio, select, optioon
      usePlugin(formsPlugin, {category: 'Form Control'}), 

      // Text input, date input, province input, country input,
      // date input, state input, address input, 
      // phone input, postal code input, zip code input
      usePlugin(elementsXPlugin, {
        category: 'Form Inputs',
        css: 'x-calendar .week-days-container { max-width: 400px; }'+
          'x-calendar .days-container { max-width: 400px; }'
      }),
    ],

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
      ],
    }
  });


  return editor;
}
