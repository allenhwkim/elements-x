import grapesjs, {Editor} from 'grapesjs';
import { boostrap5Components, formControls, containers, customElements, headings }  from './blocks';
import formsPlugin from './plugins/forms'

export function initGrapesJs(elId: string) {
  const editor = grapesjs.init({
    container: elId,
    fromElement: true, // initial html is from innerHTMl
    plugins: [
      formsPlugin,
    ],
    // plugins: [
    //   componentTypes,
    // ],
    // storageManager: false,
    // blockManager: {
    //   blocks: [
    //     ...containers,
    //     ...headings,
    //     ...formControls,
    //     ...boostrap5Components,
    //     ...customElements,
    //   ]
    // },
    canvas: {
      scripts: [ 
        'https://unpkg.com/elements-x',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
      ],
      styles: [
        'https://unpkg.com/elements-x/dist/lib/style.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
      ],
    }
  });

  return editor;
}