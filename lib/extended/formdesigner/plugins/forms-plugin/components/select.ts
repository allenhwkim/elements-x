
import { Editor } from "grapesjs";

export default function(editor: Editor) {

  editor.Components.addType('select', {
    isComponent: el => el.tagName == 'SELECT',

    model: {
      defaults: {
        tagName: 'select',
        droppable: false,
        highlightable: false,
        components: [
          { type: 'option', content: 'Option 1', attributes: { value: 'opt1' } },
          { type: 'option', content: 'Option 2', attributes: { value: 'opt2' } },
        ],
        traits: [
          { name: 'name'},
          { name: 'options', type: 'select-options' },
          { name: 'required', type: 'checkbox' },
        ],
      },
    },

    view: {
      events: {
        mousedown: (ev: Event) => {
          if (!editor.Commands.isActive('preview')) {
            ev.preventDefault();
          }
        }
      } as any,
    },
  });

  editor.TraitManager.addType('select-options', {
    events:{
      keyup: 'onChange',
    },

    onValueChange() {
      const { model, target } = this;
      const optionsStr = model.get('value').trim();
      const options = optionsStr.split('\n');
      const optComps: any[] = [];

      for (let i = 0; i < options.length; i++) {
        const optionStr = options[i];
        const option = optionStr.split('::');
        optComps.push({
          type: 'option',
          components: option[1] || option[0],
          attributes: { value: option[0] },
        });
      }

      target.components().reset(optComps);
      target.view?.render();
    },

    getInputEl() {
      if (!this.$input) {
        const optionsArr: any[] = [];
        const options = this.target.components();

        for (let i = 0; i < options.length; i++) {
          const option = options.models[i];
          const optAttr = option.get('attributes');
          const optValue = optAttr?.value || '';
          const optTxtNode = option.components().models[0];
          const optLabel = optTxtNode && optTxtNode.get('content') || '';
          optionsArr.push(`${optValue}::${optLabel}`);
        }

        const el = document.createElement('textarea');
        el.value = optionsArr.join("\n");
        this.$input = el as any;
      }

      return this.$input;
  	},
  });
}