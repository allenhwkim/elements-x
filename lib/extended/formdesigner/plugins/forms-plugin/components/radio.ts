
import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('radio', {
    extend: 'checkbox',
    isComponent: el => el.tagName == 'INPUT' && (el as HTMLInputElement).type == 'radio',

    model: {
      defaults: {
        attributes: { type: 'radio' },
      },
    },
  });
}