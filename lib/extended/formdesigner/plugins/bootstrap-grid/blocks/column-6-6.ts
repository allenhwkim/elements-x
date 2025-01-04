import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {

  editor.BlockManager.add('column-6-6', {
    label: '2 Columns',
    category: 'Grid',
    media: "\n        <svg viewBox=\"0 0 23 24\">\n        <path fill=\"currentColor\" d=\"M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z\"></path>\n        </svg>\n        ",
    content: {
      type: 'grid-row',
      components: [
        { type: 'grid-column', attributes: { class: 'col-md-6' } }, 
        { type: 'grid-column', attributes: { class: 'col-md-6' }
      }]
    }
  });

}