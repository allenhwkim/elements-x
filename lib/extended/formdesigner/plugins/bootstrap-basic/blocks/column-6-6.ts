import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {

  editor.BlockManager.add('2-columns', {
    label: props.label || '2 Columns',
    category: props.category || 'Bootstrap5 Basic',
    media: `
      <svg viewBox="0 0 23 24">
        <path fill="currentColor" d="M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z"></path>
      </svg>`,
    content: {
      type: 'bs-row',
      components: [
        { type: 'bs-col', attributes: { 'data-size': 'x6', class: 'col col-md-6 p-2' } }, 
        { type: 'bs-col', attributes: { 'data-size': 'x6', class: 'col col-md-6 p-2' }
      }]
    }
  });

}