import { Command, Editor } from 'grapesjs';

export const jsEditorCommand : Command = {
  run(editor:Editor, _sender, _options) {
    const codeViewer = editor.CodeManager
      .createViewer({
        codeName: 'javascript',
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
        indentUnit: 2 // Set the indent unit
      });
    // const domEl = editor.getSelected()?.getEl() as any;
    const scriptStr = editor.getSelected()?.getScriptString() || 'console.log(this)';
    codeViewer.setContent(scriptStr);

    const applyBtn = document.createElement('button');
    applyBtn.innerText = 'Apply';
    applyBtn.addEventListener('click', () => {
      const jsStr = codeViewer.getContent();
      editor.getSelected()?.set('script', jsStr);
      editor.Modal.close();
    });

    const modalContent = document.createElement('div');
    modalContent.append(codeViewer.getElement(), applyBtn);

    const modal = editor.Modal.open({title: 'Edit Javascript', content: modalContent});
    modal.getModel().once('change:open', () => editor.stopCommand(this.id as string));
  },

  stop: (editor: Editor) => editor.Modal.close()
};