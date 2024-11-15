
import { Editor } from "grapesjs";

export default function(editor: Editor, options = {category: 'Forms'}) {

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

  editor.BlockManager.add('select', {
    ...options,
    label: 'Select',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M18.5 13l1.5-2h-3zM4 11.5h11v1H4z"/></svg>',
    content: `
      <label class="d-block">
        <span>Subject:</span>
        <select data-gjs-type="select" class="form-select">
          <option selected>Select one</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </label>`,
  });
}