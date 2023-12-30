export default {
  id: 'bs5-control-switch',
  category: 'Form Controls',
  label: 'Switch',
  content: {
    type: 'label',
    tagName: 'label',
    attributes: { class: 'form-check form-switch'},
    components: [
      { 
        type: 'checkbox', 
        tagName: 'input',
        attributes: { class: 'form-check-input', type: 'checkbox', name: 'my-switch'},
      }, 
      '<span>Switch checkbox</span>'
    ]
  }
};