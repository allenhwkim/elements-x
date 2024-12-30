import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('input-date', {
    isComponent: el => el.tagName == 'DIV' && el.classList.contains('input-date'),

    model: {
      defaults: {
        tagName: 'div',
        droppable: true,
        highlightable: true,
        attributes: { 
          class : 'position-relative',
        },
        traits: [
          { 
            type: 'button', 
            name: 'edit-html',
            text: 'Edit HTML', 
            full: true, 
            command: 'html-editor' 
          },
        ],
        components: [
          { type: 'input',  attributes: { placeholder: 'Select date' } },
          {
            type: 'x-dropdown',
            components : [
              { 
                type: 'x-calendar',
                attributes: {
                  attributes: { 
                    'month-format': 'long',
                    'week-format': 'short',
                    locale: 'en',
                    'first-day-of-week': '0',
                    date: new Date().toLocaleDateString('fr-CA')
                  },
                },
              }
            ]
          },  
        ],
      }
    }
  })
}