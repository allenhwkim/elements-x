import { BlockProperties } from "grapesjs";

export default {
  id: 'bs5-control-checkbox',
  category: 'Form Controls',
  label: 'Checkbox',
  content: {
    type: 'label',
    tagName: 'label',
    attributes: { class: 'form-check'},
    components: [
      { 
        type: 'checkbox', 
        tagName: 'input',
        attributes: { class: 'form-check-input', type: 'checkbox'},
      }, 
      '<span class="form-check-label">Label</span>'
    ]
  }
} as BlockProperties;