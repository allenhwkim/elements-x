import { Command, Editor } from 'grapesjs';

export const editPropertyCommand : Command = {
  run(editor:Editor, _sender, options) {
    console.log('...............options', {options} );
    const codeViewer = editor.CodeManager
      .createViewer({ 
        codeName: 'json',
        theme: 'hopscotch', // You can choose any theme you like
        readOnly: false, // Set to true if you want the viewer to be read-only
        autoBeautify: false, // Automatically format the code
        // autoCloseTags: true,
        // autoCloseBrackets: true,
        // lineWrapping: true,
        // styleActiveLine: true,
        // smartIndent: true,
        // indentWithTabs: true
    });
    const domEl = editor.getSelected()?.getEl() as any;
    const prop = domEl[options.property];
    console.log('...........dataList', domEl.dataList);
    console.log('...........prop', prop);
    console.log('...........content', JSON.stringify(prop, null, '  '));
    codeViewer.setContent(JSON.stringify(prop, null, '  '));

    const applyBtn = document.createElement('button');
    applyBtn.innerText = 'Apply';
    applyBtn.addEventListener('click', () => {
      const json = codeViewer.getContent();
      domEl.dataList = JSON.parse(json);

      editor.getSelected()?.set('script', `this['${options.property}'] = ${json}`);
      editor.Modal.close();
    });

    const modalContent = document.createElement('div');
    modalContent.insertAdjacentElement('beforeend', codeViewer.getElement());
    modalContent.insertAdjacentElement('beforeend', applyBtn);

    const modal = editor.Modal.open({title: 'Edit JSON Data', content: modalContent});
    modal.getModel().once('change:open', () => editor.stopCommand(this.id as string));
  },

  stop: (editor: Editor) => editor.Modal.close()
};