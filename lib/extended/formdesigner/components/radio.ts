
import { Editor } from "grapesjs";

export default function(editor: Editor, options = {category: 'Forms'}) {
  editor.Components.addType('radio', {
    extend: 'checkbox',
    isComponent: el => el.tagName == 'INPUT' && (el as HTMLInputElement).type == 'radio',

    model: {
      defaults: {
        attributes: { type: 'radio' },
      },
    },
  });

  editor.BlockManager.add('radio', {
    ...options,
    label: 'Radio',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"></path></svg>',
    content: {
      type: 'container',
      tagName: 'div',
      components: [
        {
          type: 'label',
          tagName: 'label',
          attributes: { class: 'form-check form-check-inline'},
          components: [
            { 
              type: 'radio', 
              tagName: 'input',
              attributes: { class: 'form-check-input', type: 'radio', value: '1', name: 'my-radio'},
            }, 
            '<span class="form-check-label">Option 1</span>'
          ]
        },
        {
          type: 'label',
          tagName: 'label',
          attributes: { class: 'form-check form-check-inline'},
          components: [
            { 
              type: 'radio', 
              tagName: 'input',
              attributes: { class: 'form-check-input', type: 'radio', value: '2', name: 'my-radio'},
            }, 
            '<span class="form-check-label">Option 2</span>'
          ]
        },
      ]
    }
  });
}