import grapesjs, {Editor} from 'grapesjs';
import grapesjsBlocksBasic from 'grapesjs-blocks-basic';
import grapesjsPluginHeader from 'grapesjs-plugin-header';

import { boostrap5Components, customElements }  from './blocks';
import formsPlugin from './plugins/forms'

export function initGrapesJs(elId: string) : Editor{
  const editor: Editor = grapesjs.init({
    container: elId,
    plugins: [
      grapesjsBlocksBasic,
      formsPlugin, // form, input, label, textarea, checkbox, radio, select, option
      grapesjsPluginHeader
    ],
    storageManager: false,
    blockManager: {
      blocks: [
      ]
    },
    canvas: {
      scripts: [ 
        'https://unpkg.com/elements-x',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
      ],
      styles: [
        'https://unpkg.com/elements-x/dist/lib/style.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
      ],
    }
  });

  return editor;
}