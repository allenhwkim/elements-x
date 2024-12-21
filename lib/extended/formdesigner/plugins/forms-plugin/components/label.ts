import { Editor } from "grapesjs";

export default function label(editor: Editor) {
  editor.Components.addType('label', {
    extend: 'text',
    isComponent: el => el.tagName == 'LABEL',

    model: {
      defaults: {
        tagName: 'label',
        components: 'Label' as any,
        traits: [
          { name: 'for' }
        ],
      },
    },
  })
}
