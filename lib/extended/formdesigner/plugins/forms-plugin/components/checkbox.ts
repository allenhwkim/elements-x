import { Editor } from "grapesjs";

export default function checkbox(editor: Editor) {
  editor.Components.addType('checkbox', {
    extend: 'input',
    isComponent: (el) => el.tagName == 'INPUT' && (el as HTMLInputElement).type == 'checkbox',

    model: {
      defaults: {
        copyable: false,
        attributes: { type: 'checkbox' },
        traits: [
          {name: 'id'},
          {name: 'name'},
          {name: 'value'},
          {type: 'checkbox', name: 'required'},
          {type: 'checkbox', name: 'checked'},
        ],
      },
    },

    view: {
      events: {
        click: (ev: Event) => {
          if (!editor.Commands.isActive('preview')) {
            ev.preventDefault();
          }
        },
      } as any,

      init() {
        this.listenTo(this.model, 'change:attributes:checked', this.handleChecked);
      },

      handleChecked() {
        (this.el as any).checked = !!this.model.get('attributes')?.checked;
      },
    },
  });
}