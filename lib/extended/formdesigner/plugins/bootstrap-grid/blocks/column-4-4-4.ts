import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {

  editor.BlockManager.add('column-4-4-4', {
    label: '3 Columns',
    category: 'Grid',
    media: "<svg viewBox=\"0 0 23 24\">\n        <path fill=\"currentColor\" d=\"M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z\"></path>\n      </svg>",
    content: {
      type: 'grid-row',
      components: [
        { type: 'grid-column', attributes: { class: 'col-md-4' } },
        { type: 'grid-column', attributes: { class: 'col-md-4' } },
        { type: 'grid-column', attributes: { class: 'col-md-4' }
      }]
    }
  });

}