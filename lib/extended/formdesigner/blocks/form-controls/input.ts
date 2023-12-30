export default {
  id: 'bs5-control-input',
  category: 'Form Controls',
  label: 'Input',
  content: {
    type: 'label',
    tagName: 'label',
    components: [
      `<span>Input label</span`,
      { 
        type: 'input', 
        tagName: 'input',
        attributes: { class: 'form-control', placeholder: 'Enter text'},
      }, 
    ]
  }
};