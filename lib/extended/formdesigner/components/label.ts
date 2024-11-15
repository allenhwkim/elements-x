import { Editor } from "grapesjs";

export default function label(editor: Editor, options = {category: 'Forms'}) {
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


  editor.BlockManager.add('label', {
    ...options,
    label: 'Label',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 11.9c0-.6-.5-.9-1.3-.9H3.4c-.8 0-1.3.3-1.3.9V17c0 .5.5.9 1.3.9h17.4c.8 0 1.3-.4 1.3-.9V12zM21 17H3v-5h18v5z"/><rect width="14" height="5" x="2" y="5" rx=".5"/><path d="M4 13h1v3H4z"/></svg>',
    content: { type: 'label' },
  });
}
