import { Command, Component, Editor, ToolbarButtonProps } from 'grapesjs';

const TYPES = ['text', 'image', 'header'];

export default function jsonEditorPlugin(editor: Editor) {
  editor.Commands.add('edit-json-datae', editJsonDataCommand);
}

var editJsonDataCommand : Command = {
  run(editor:Editor) {
    const codeViewer = editor.CodeManager
      .createViewer({codeName: 'htmlmixed', readOnly: 0});
    const htmlStr = editor.getSelected()?.toHTML();
    codeViewer.setContent(htmlStr);

    const applyBtn = document.createElement('button');
    applyBtn.innerText = 'Apply';
    applyBtn.addEventListener('click', () => {
      const htmlCode = codeViewer.getContent();
      editor.select(editor.getSelected()?.replaceWith(htmlCode));
      editor.Modal.close();
    });

    const modalContent = document.createElement('div');
    modalContent.insertAdjacentElement('beforeend', codeViewer.getElement());
    modalContent.insertAdjacentElement('beforeend', applyBtn);

    const modal = editor.Modal.open({title: 'Edit HTML', content: modalContent});
    modal.getModel().once('change:open', () => editor.stopCommand(this.id as string));
  },

  stop: (editor: Editor) => editor.Modal.close()
};