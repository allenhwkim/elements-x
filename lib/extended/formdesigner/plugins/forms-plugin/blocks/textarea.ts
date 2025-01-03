
import { Editor } from "grapesjs";

export default function(editor: Editor, options = {category: 'Forms'}) {
  editor.BlockManager.add('textarea', {
    ...options,
    label: 'Textarea',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7.5c0-.9-.5-1.5-1.3-1.5H3.4C2.5 6 2 6.6 2 7.5v9c0 .9.5 1.5 1.3 1.5h17.4c.8 0 1.3-.6 1.3-1.5v-9zM21 17H3V7h18v10z"/><path d="M4 8h1v4H4zM19 7h1v10h-1zM20 8h1v1h-1zM20 15h1v1h-1z"/></svg>',
    content: `
      <label class="d-block">
        <span>Subject:</span>
        <textarea data-gjs-type="textarea" rows="6" class="form-control" placeholder="Enter long text here"></textarea>
      </label>
    `,
  });
}