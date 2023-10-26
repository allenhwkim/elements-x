export const buttonType = {
  isComponent: el => el.tagName === 'BUTTON',

  model: {
    defaults: {
      tagName: 'button',
      attributes: { type: 'button' },
      text: 'Button',
      traits: [
        {
          name: 'text',
          changeProp: true,
        }, {
          type: 'select',
          name: 'type',
          options: [
            { value: 'button' },
            { value: 'submit' },
            { value: 'reset' },
          ]
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