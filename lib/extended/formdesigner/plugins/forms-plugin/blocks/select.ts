
import { Editor } from "grapesjs";

export default function(editor: Editor, options = {category: 'Forms'}) {
  editor.BlockManager.add('select', {
    ...options,
    label: 'Select',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M18.5 13l1.5-2h-3zM4 11.5h11v1H4z"/></svg>',
    content: `
      <div class="d-block custom">
        <label for="select">Subject:</label>
        <select id="select" data-gjs-type="select" class="form-select">
          <option selected>Select one</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>`,
  });
}