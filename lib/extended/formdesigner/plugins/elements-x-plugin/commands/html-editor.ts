import { Command, Editor } from 'grapesjs';

// const TYPES = ['text', 'image', 'header'];

// export default function htmlEditorPlugin(editor: Editor) {
//   editor.Commands.add('edit-html', editHtmlCommand);

//   TYPES.forEach(type => { // add toolbar for many types of components
//     const model = editor.Components.getType(type)?.model;
//     editor.Components.addType(type, {
//       model: {
//         initToolbar() {
//           model.prototype.initToolbar.apply(this);
//           const tb: Array<ToolbarButtonProps> = this.get('toolbar') as any;
//           !tb?.find(item => item.command === 'edit-html') &&
//             tb.push({ command: 'edit-html', label: '<i class="fa fa-file-code-o"></i>'})
//         }
//       }
//     });
//   })
// }

export const editHtmlCommand : Command = {
  run(editor:Editor, _sender, _options) {
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