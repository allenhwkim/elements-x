import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('x-calendar', {
    isComponent: el => el.tagName == 'X-CALENDAR',

    model: {
      defaults: {
        tagName: 'x-calendar',
        droppable: true,
        highlightable: true,
        attributes: { 
          'month-format': 'long',
          'week-format': 'short',
          'locale': 'en',
          'first-day-of-week': '0',
          'date': new Date().toLocaleDateString('fr-CA')
        },
        traits: [
          { 
            type: 'button',
            text: 'Edit HTML',
            full: true,
            command: 'edit-html'
          },
          { name: 'date'},
          { 
            name: 'month-format',
            type: 'select',
            options: [ {value: 'long'}, {value: 'short'}, {value: 'narrow'} ]
          },
          { 
            name: 'week-format',
            type: 'select',
            options: [ {value: 'long'}, {value: 'short'}, {value: 'narrow'} ]
          },
          { 
            name: 'locale',
            type: 'select',
            options: [ {value: 'en'}, {value: 'fr'}, {value: 'ko'}, {value: 'zh-CN'} ]
          },
          { type: 'checkbox', name: 'required' },
          {
            name: 'first-day-of-week',
            type: 'select',
            options: [
              { value: '0', label: 'Sunday' },
              { value: '1', label: 'Monday' },
              { value: '6', label: 'Saturday' },
            ]
          },
        ],
      }
    }
  })
}