export function formType(editor) {
  const defaultType = editor.DomComponents.getType('default');

  return {
    model: defaultType.model.extend(
      {
        tagName: `form`
      }, 
      {
        isComponent(el) {
          if(el.tagName == 'FORM') {
            return {type: 'form'}
          }
        },
      }
    ),
    view: defaultType.view.extend({
      tagName: 'div' //<-- in canvas div will be used
    })
  };
}