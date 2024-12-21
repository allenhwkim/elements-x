import { Editor } from "grapesjs";

export default function(editor: Editor, options = {category: 'Forms'}) {
  editor.BlockManager.add('input', {
    ...options,
    label: 'Input',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
    content: { 
      type: 'label',
      tagName: 'label',
      components: [
        `<span>Input label</span>`,
        { 
          type: 'input', 
          tagName: 'input',
          attributes: { class: 'form-control', placeholder: 'Enter text'},
        }, 
      ]
    },
  });
}