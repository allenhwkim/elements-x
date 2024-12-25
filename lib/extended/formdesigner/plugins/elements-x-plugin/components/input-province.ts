import { Editor } from 'grapesjs';

export default function(editor: Editor) {
  editor.Components.addType('input-province', {
    isComponent: el => el.tagName == 'DIV' && el.classList.contains('input-province'),

    // <x-combobox style='width: 800px;'>
    //   <input placeholder='Select one' />
    //   <ul> 
    //     <li data-value='[[key]]-[[value]]'>[[value]]</li> 
    //   </ul>
    // </x-combobox>
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
        init() {
          this.set('dataList', {
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
          }); // Set the checked property directly
        },
        components: `
          <input id='province' name='province' placeholder='Select province' autocomplete='off' />
          <ul id='province-dropdown'>
            <li data-value='[[key-value]]'>[[value]]</li>
          </ul>`
          // [
          // { 
          //   type: 'input',  
          //   highlightable: false,
          //   attributes: {
          //     id: 'province',
          //     name: 'province',
          //     placeholder: 'Select province',
          //     autocomplete: 'off',
          //   } 
          // },
          // {
          //   tagName: 'ul',
          //   type: 'text',
          //   attributes: {
          //     id: 'province-dropdown',
          //   }, 
          //   components : [
          //     { 
          //       tagName: 'li',
          //       type: 'text',
          //       attributes: {
          //         'data-value': '[[key]]-[[value]]',
          //       },
          //       editable: false,
          //       content: '[[value]]',
          //     }
          //   ]
          // },  
          // ],
      }
    }
  })
}