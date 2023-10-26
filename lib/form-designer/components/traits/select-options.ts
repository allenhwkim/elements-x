import { optionType } from '../types/option';

export const selectOptionsType ={
  events:{
    keyup: 'onChange',
  },

  onValueChange(this: any) {
    const { model, target } = this;
    const optionsStr = model.get('value').trim();
    const options = optionsStr.split('\n');
    const optComps: any[] = [];

    for (let i = 0; i < options.length; i++) {
      const optionStr = options[i];
      const option = optionStr.split('::');
      optComps.push({
        type: optionType,
        components: option[1] || option[0],
        attributes: { value: option[0] },
      });
    }

    target.components().reset(optComps);
    target.view.render();
  },

  getInputEl(this: any) {
    if (!this.$input) {
      const optionsArr: string[] = [];
      const options = this.target.components();

      for (let i = 0; i < options.length; i++) {
        const option = options.models[i];
        const optAttr = option.get('attributes');
        const optValue = optAttr.value || '';
        const optTxtNode = option.components().models[0];
        const optLabel = (optTxtNode && optTxtNode.get('content')) || '';
        optionsArr.push(`${optValue}::${optLabel}`);
      }

      this.$input = document.createElement('textarea');
      this.$input.value = optionsArr.join("\n");
    }
    return this.$input;
  },
}