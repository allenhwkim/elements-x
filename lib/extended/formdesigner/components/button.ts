
import { Editor } from "grapesjs";

export default function(editor: Editor, options = {category: 'Forms'}) {

  editor.Components.addType('button', {
    extend: 'input',
    isComponent: el => el.tagName == 'BUTTON',

    model: {
      defaults: {
        tagName: 'button',
        attributes: { type: 'button' },
        text: 'Send',
        traits: [
          {
            name: 'text',
            changeProp: true,
          }, {
            type: 'select',
            name: 'type',
            options: [
              { value: 'button' },
              { value: 'submit' },
              { value: 'reset' },
            ]
        }]
      },

      init() {
        const comps = this.components();
        const tChild =  comps.length === 1 && comps.models[0];
        const chCnt = (tChild && tChild.is('textnode') && tChild.get('content')) || '';
        const text = chCnt || this.get('text');
        this.set('text', text);
        this.on('change:text', this.__onTextChange);
        (text !== chCnt) && this.__onTextChange();
      },

      __onTextChange() {
        this.components(this.get('text'));
      },
    },

    view: {
      events: {
        click: (ev: Event) => {
          if (!editor.Commands.isActive('preview')) {
            ev.preventDefault();
          }
        },
      } as any,
    },
  });

  editor.BlockManager.add('button', {
    ...options,
    label: 'Button',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"/></svg>',
    content: { type: 'button' },
  });
}