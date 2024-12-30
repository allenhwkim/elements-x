import { Command, Editor, ToolbarButtonProps } from 'grapesjs';
import pretty from 'pretty';

const TYPES = ['text', 'image', 'header'];

export default function htmlEditorPlugin(editor: Editor) {
  editor.Commands.add('html-editor', htmlEditorCommand);

  TYPES.forEach(type => { // add toolbar for many types of components
    const model = editor.Components.getType(type)?.model;
    editor.Components.addType(type, {
      model: {
        initToolbar() {
          model.prototype.initToolbar.apply(this);
          const tb: Array<ToolbarButtonProps> = this.get('toolbar') as any;
          !tb?.find(item => item.command === 'html-editor') &&
            tb.push({ command: 'html-editor', label: '<i class="fa fa-file-code-o"></i>'})
        }
      }
    });
  })
}

export const htmlEditorCommand : Command = {
  run(editor:Editor, _sender, _options) {
    const codeViewer = editor.CodeManager
      .createViewer({
        codeName: 'htmlmixed',
        readOnly: 0,
        theme: 'hopscotch',
        autoBeautify: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        styleActiveLine: true,
        smartIndent: true,
        indentWithTabs: true,
        tabSize: 2, // Set the tab size
        indentUnit: 2, // Set the indent unit
      });
    const htmlStr = editor.getSelected()?.toHTML();
    codeViewer.setContent(pretty(htmlStr));

    const applyBtn = document.createElement('button');
    applyBtn.innerText = 'Apply';
    applyBtn.addEventListener('click', () => {
      const htmlCode = codeViewer.getContent();
      editor.select(editor.getSelected()?.replaceWith(htmlCode));
      editor.Modal.close();
    });

    const modalContent = document.createElement('div');
    modalContent.append(codeViewer.getElement(), applyBtn);

    const modal = editor.Modal.open({title: 'Edit HTML', content: modalContent});
    modal.getModel().once('change:open', () => editor.stopCommand(this.id as string));
  },

  stop: (editor: Editor) => editor.Modal.close()
};