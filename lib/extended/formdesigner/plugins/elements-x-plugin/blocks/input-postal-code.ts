import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {
  editor.BlockManager.add('input-postal-code', {
    ...props,
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <text x="50" y="300" fill="#FFF" font-size="10em">POSTAL</text>
        <text x="100" y="400" fill="#FFF" font-size="10em">CODE</text>
      </svg>`,
    content: `
      <div class="custom d-inline-block">
        <label for="postal" class="form-label">Postal code:</label>
        <x-masked mask="A9A 9A9" class="d-block">
          <input id="postal" name="postal" class="form-control" />
        </x-masked>
      </div>`
  });
}