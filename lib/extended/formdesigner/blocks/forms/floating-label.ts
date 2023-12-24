import { BlockProperties } from "grapesjs";

export default {
  id: 'bs5-control-floating-label',
  category: 'Form Controls',
  label: 'Floating Label',
  content: {
    type: 'text',
    tagName: 'div',
    attributes: { class: 'form-floating mb-3'},
    components: [
      { 
        type: 'input', 
        tagName: 'input',
        attributes: { class: 'form-control', id: 'floating-input', placeholder: 'name@example.com'},
      }, 
      { 
        type: 'label', 
        tagName: 'label',
        attributes: { for: 'floating-input'},
        text: 'First Name'
      }, 
    ]
  }
} as BlockProperties;