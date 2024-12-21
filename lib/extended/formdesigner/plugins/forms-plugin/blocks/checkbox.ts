import { Editor } from "grapesjs";

export default function checkbox(editor: Editor, options = {category: 'Forms'}) {
  editor.BlockManager.add('checkbox', {
    ...options,
    label: 'Checkbox',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2z"></path></svg>',
    content: {
      type: 'label',
      tagName: 'label',
      attributes: { class: 'form-check'},
      components: [
        { 
          type: 'checkbox', 
          tagName: 'input',
          attributes: { class: 'form-check-input', type: 'checkbox'},
        }, 
        '<span class="form-check-label">Label</span>'
      ]
    },
  });

}