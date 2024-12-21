import { Editor } from "grapesjs";

export default function(editor: Editor) {
  editor.Components.addType('form', {
    isComponent: el => el.tagName == 'FORM',

    model: {
      defaults: {
        tagName: 'form',
        droppable: ':not(form)',
        draggable: ':not(form)',
        attributes: { method: 'get' },
        traits: [{
          type: 'select',
          name: 'method',
          options: [
            {value: 'get', name: 'GET'},
            {value: 'post', name: 'POST'},
          ],
        }, {
          name: 'action',
        }],
      },
    },

    view: {
      events: {
        // The submit of the form might redirect the user from the editor so
        // we should always prevent the default here.
        submit: (e: Event) => e.preventDefault(),
      } as any
    },
  });

}