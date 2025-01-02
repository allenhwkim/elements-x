import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {
  editor.BlockManager.add('input-zip-code', {
    ...props,
    media: `<div class="gjs-block-label">ZIP CODE</div>`,
    content: `
      <div class="custom d-inline-block">
        <label for="zip" class="form-label">Zip code:</label>
        <x-masked mask="99999" class="d-block">
          <input id="zip" name="zip" class="form-control" />
        </x-masked>
      </div>`
  });
}