import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {
  editor.BlockManager.add('input-postal-code', {
    ...props,
    media: `<div class="gjs-block-label">POSTAL CODE</div>`,
    content: `
      <div class="custom d-inline-block">
        <label for="postal" class="form-label">Postal code:</label>
        <x-masked mask="A9A 9A9" class="d-block">
          <input id="postal" name="postal" class="form-control" />
        </x-masked>
      </div>`
  });
}