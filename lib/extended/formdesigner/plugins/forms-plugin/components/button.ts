
import { Editor } from "grapesjs";

export default function(editor: Editor) {

  editor.Components.addType('button', {
    extend: 'input',
    isComponent: el => el.tagName == 'BUTTON',

    model: {
      defaults: {
        tagName: 'button',
        attributes: {
          type: 'button',  
          class: 'btn btn-primary',
        },
        text: 'Send',
        traits: [
          'id',
          'name',
          {
            name: 'text',
            changeProp: true,
          }, 
          {
            type: 'select',
            name: 'type',
            options: [
              { value: 'button' },
              { value: 'submit' },
              { value: 'reset' },
            ]
          },
          { 
            type: 'button', 
            name: 'edit-js',
            text: 'Edit Javascript', 
            full: true, 
            command: 'js-editor'
          },
        ]
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
}