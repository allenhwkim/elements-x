import grapesjs, {Editor} from 'grapesjs';
import { boostrap5Components, containers, customElements, headings }  from './blocks';
import formsPlugin from './plugins/forms'

export function initGrapesJs(elId: string) {
  const editor = grapesjs.init({
    container: elId,
    fromElement: true, // initial html is from innerHTMl
    plugins: [
      formsPlugin, // form, input, label, textarea, checkbox, radio, select, option
    ],
    // plugins: [
    //   componentTypes,
    // ],
    // storageManager: false,
    blockManager: {
      blocks: [
        ...containers,
        // ...headings,
        // ...boostrap5Components,
        // ...customElements,
      ]
    },
    canvas: {
      scripts: [ 
        'https://unpkg.com/elements-x',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
      ],
      styles: [
        'https://unpkg.com/elements-x/dist/lib/style.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css'
      ],
    }
  });

  return editor;
}