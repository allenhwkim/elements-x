import { Component, Components, Trait } from "grapesjs";

export const comboboxOptionsTrait = {
  events: {
    keyup: 'onChange',
  },

  onValueChange(this: any) {
    const textareaValue = (this.model as Trait).get('value').trim();
    const lines = textareaValue.split('\n');

    const liComps = lines.map(line => {
      const [value, text, disabled] = line.split('::');
      const attributes = {} as any;
      value && (attributes.value = (value === 'blank' ? '' : value) );
      disabled && (attributes.class = 'disabled');
      return {
        type: 'text',
        tagName: 'li',
        components: text,
        attributes,
      };
    });

    const ulComponent = this.target.components().models.find(el => {
      return el.attributes.tagName === 'ul'
    }) as Component;
    ulComponent.components().reset(liComps);
    this.target.view.render();
  },

  getInputEl(this: any) {
    if (!this.$input) {
      const optionsArr: string[] = [];
      const ulComponent: Component = this.target.components().models.find(el => el.attributes.tagName === 'ul');
      const options = ulComponent.components() as Components;

      for (let i = 0; i < options.length; i++) {
        const option = options.models[i];
        const disabled = option.getClasses().includes('disabled') ? '::disabled': '';
        const optTxtNode = option.components().models[0];
        const optLabel = (optTxtNode && optTxtNode.get('content')) || '';
        const attrValue = option.get('attributes')?.value;
        const optValue = attrValue || (attrValue === '' ? 'blank': '');
        optionsArr.push(`${optValue}::${optLabel}${disabled}`);
      }

      this.$input = document.createElement('textarea');
      this.$input.setAttribute('rows', options.length);
      this.$input.value = optionsArr.join("\n");
    }
    return this.$input;
  },
}