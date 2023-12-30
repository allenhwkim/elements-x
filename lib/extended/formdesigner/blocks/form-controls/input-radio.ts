export default {
  id: 'bs5-control-radio',
  category: 'Form Controls',
  label: 'Radio Button',
  content: [
    {
      type: 'label',
      tagName: 'label',
      attributes: { class: 'form-check form-check-inline'},
      components: [
        { 
          type: 'radio', 
          tagName: 'input',
          attributes: { class: 'form-check-input', type: 'radio', value: '1', name: 'my-radio'},
        }, 
        '<span class="form-check-label">Option 1</span>'
      ]
    },
    {
      type: 'label',
      tagName: 'label',
      attributes: { class: 'form-check form-check-inline'},
      components: [
        { 
          type: 'radio', 
          tagName: 'input',
          attributes: { class: 'form-check-input', type: 'radio', value: '2', name: 'my-radio'},
        }, 
        '<span class="form-check-label">Option 2</span>'
      ]
    },
  ] as any
};