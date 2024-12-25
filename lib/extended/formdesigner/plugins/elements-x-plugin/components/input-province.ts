import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('input-province', {
    isComponent: el => el.tagName == 'DIV' && el.classList.contains('input-province'),

    // <x-combobox style="width: 800px;">
    //   <input placeholder="Select one" />
    //   <ul> 
    //     <li data-value="[[key]]-[[value]]">[[value]]</li> 
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
        properties: {
          dataList: [],
        },
        traits: [
          { type: 'button', text: 'Edit HTML', full: true, command: 'edit-html' },
          { type: 'button', text: 'Edit JSON Data', full: true, command: 'edit-json-data' },
        ],
        components: [
          { 
            type: 'input',  
            highlightable: false,
            attributes: {
              id: 'province',
              name: 'province',
              placeholder: 'Select province',
              autocomplete: 'off',
            } 
          },
          {
            tagName: 'ul',
            type: 'text',
            attributes: {
              id: 'province-dropdown',
            }, 
            components : [
              { 
                tagName: 'li',
                type: 'text',
                attributes: {
                  'data-value': '[[key]]-[[value]]',
                },
                editable: false,
                content: '[[value]]',
              }
            ]
          },  
        ],
      }
    }
  })
}