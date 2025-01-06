import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {

  editor.BlockManager.add('grid-column', {
    label: 'Column',
    category: 'Grid',
    media: `
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"></path>
      </svg>`,
    content: {
      type: 'grid-column',
      attributes: {
        'class': 'col p-2'
      },
    }
  });

}