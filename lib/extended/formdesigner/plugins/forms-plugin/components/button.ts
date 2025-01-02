
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
          hello: 'world',
        },
        traits: [
          'id',
          'name',
          {
            name: 'text',
            changeProp: true,
          }, 
          { 
            type: 'select',
            name: 'btn-look',
            label: 'Look',
            changeProp: true,
            default: 'btn btn-primary',
            options: [ 
              {label: 'primary', value: 'btn btn-primary'}, 
              {label: 'secondary', value: 'btn btn-secondary'}, 
              {label: 'success', value: 'btn btn-success'},
              {label: 'danger', value: 'btn btn-danger'},
              {label: 'warning', value: 'btn btn-warning'},
              {label: 'info', value: 'btn btn-info'},
              {label: 'light', value: 'btn btn-light'},
              {label: 'dark', value: 'btn btn-dark'},
              {label: 'link', value: 'btn btn-link text-decoration-none p-0 m-0 shadow-none'},
            ]
          },
          { 
            type: 'select',
            name: 'btn-size',
            label: 'Size',
            changeProp: true,
            options: [ 
              {label: 'large', value: 'btn-lg'}, 
              {label: 'normal', value: ''}, 
              {label: 'small', value: 'btn-sm'},
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
        this.set('text', text.trim());
        this.on('change:text', this.__onTextChange);
        (text !== chCnt) && this.__onTextChange();
      },

      updated(property, value, _prevValue) {
        if (property === 'traits') {
          const btnLook = value.target.changed['btn-look'];
          btnLook && this.setClass(btnLook);

          const btnSize = value.target.changed['btn-size'];
          if (typeof btnSize === 'string') {
            const klass = this.getAttributes()['class'] || '';
            const newKlass = klass.replace(/\ ?btn-lg/g, '').replace(/\ ?btn-sm/g, '') 
              + (btnSize ? ' '+btnSize : '');
            this.setClass(newKlass);
          }
        }
      },

      __onTextChange() {
        this.components(this.get('text'));
      },
      
      __handleLookChange() {
        const newClass = this.get('btn-look');
        console.log('newClass', newClass);
      }
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