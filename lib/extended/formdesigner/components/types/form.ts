import { ComponentModelDefinition } from "grapesjs";

export const formType = {
  isComponent: el => el.tagName == 'FORM',

  model: {
    defaults: {
      tagName: 'form',
      droppable: ':not(form)',
      draggable: ':not(form)',
      attributes: { method: 'get' },
      traits: [
        { name: 'method', type: 'select', options: [ 'get', 'post'], }, 
        { name: 'action', type: 'text' },
      ],
    },
  } as Partial<ComponentModelDefinition>,

  view: {
    events: {
      // The submit of the form might redirect the user from the editor so
      // we should always prevent the default here.
      submit: (e: Event) => e.preventDefault(),
    } as any
  },
};