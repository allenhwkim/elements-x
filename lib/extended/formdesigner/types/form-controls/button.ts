export const buttonType = {
  isComponent: el => el.tagName === 'BUTTON',

  model: {
    defaults: {
      tagName: 'button',
      attributes: { 
        type: 'button' 
      },
      traits: [
        { name: 'text', changeProp: true, },
        { name: 'id', type: 'text', },
        { name: 'name', type: 'text', },
        { name: 'type', type: 'select', options: [ { value: 'button' }, { value: 'submit' }, { value: 'reset' } ]
      }]
    },

    init(this: any) {
      const comps = this.components();
      const tChild =  comps.length === 1 && comps.models[0];
      const chCnt = (tChild && tChild.is('textnode') && tChild.get('content')) || '';
      const text = chCnt || this.get('text');
      this.set('text', text);
      this.on('change:text', this.__onTextChange);
      if (text !== chCnt) {
        this.__onTextChange();
      }
    },

    __onTextChange(this: any) {
      this.components(this.get('text'));
    },
  }
}