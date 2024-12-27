import { Editor } from 'grapesjs';

export default function(editor: Editor) {
  editor.Components.addType('input-province', {
    isComponent: el => el.tagName == 'DIV' && el.classList.contains('input-province'),

    model: {
      defaults: {
        tagName: 'x-combobox',
        droppable: true,
        highlightable: true,
        attributes: {
          required: false,
          selected: 'ON',
          'select-expr': '{{key}}',
          'display-expr': '{{key}}-{{value}}',
        },
        traits: [
          { 
            type: 'button', 
            name: 'edit HTML',
            text: 'Edit HTML', 
            full: true, 
            command: 'edit-html' 
          },
          { 
            type: 'button', 
            name: 'edit province data',
            text: 'Edit provinces data', 
            full: true, 
            command: (editor, trait) => {
              editor.runCommand('edit-property', {property: 'dataList'});
            }
          },
        ], 
        components: `
          <input id="province" 
            name="province" 
            value="ON"
            placeholder="Select province"
          />`
      }
    },
    view: {
      onRender({model, el}) {
        (el as any).dataList ||= {
          AB : 'Alberta',
          BC : 'British Columbia',
          MB : 'Manitoba',
          NB : 'New Brunswick',
          NL : 'Newfoundland and Labrador',
          NS : 'Nova Scotia',
          NT : 'Northwest Territories',
          NU : 'Nunavut',
          ON : 'Ontario',
          PE : 'Prince Edward Island',
          QC : 'Québec',
          SK : 'Saskatchewan',
          YT : 'Yukon'
        }
      }
    }
  })
}