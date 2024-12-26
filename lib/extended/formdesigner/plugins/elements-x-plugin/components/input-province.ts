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
        },
        traits: [
          { type: 'button', text: 'Edit HTML', full: true, command: 'edit-html' },
        { type: 'button', text: 'Edit JSON Data', full: true, command: 'edit-json-data' },
        ], 
        components: `
          <input id='province' name='province' placeholder='Select province' autocomplete='off' />
          <ul id='province-dropdown'>
            <li data-value='[[key]]'>[[value]]</li>
          </ul>`
      }
    },
    view: {
      onRender({model, el}) {
        (el as any).dataList = {
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