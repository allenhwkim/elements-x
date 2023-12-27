  export const loadComboboxType = (editor) => ({
    isComponent: (el: HTMLElement) => el.tagName === 'X-COMBOBOX', 
  
    model: {
      defaults: {
        tagName: 'x-combobox',
        droppable: false,
        highlightable: false,
        attributes: { class: 'x combobox' },
        components: [{
          type: 'ul',
          content: [
            {type: 'text', tagName: 'li', content: 'Select one' },
            {type: 'text', tagName: 'li', content: 'One', attributes: {value: '1'} },
            {type: 'text', tagName: 'li', content: 'Two', attributes: {value: '2'} },
            {type: 'text', tagName: 'li', content: 'Three', attributes: {value: '3'} },
          ]
        }],
        traits: [
          'id',
          'title',
          'name',
          {
            name: 'options',
            type: 'combobox-options' // trait type
          },
        ],
      },
    },
  
    view: {
      events: {
        mousedown: (ev: any) => {
          if (ev.target.tagName === 'INPUT') {
          } else if (editor.Commands.isActive('preview')) {
          } else {
            ev.preventDefault();
          }
        },
      } as any,
    },
  });