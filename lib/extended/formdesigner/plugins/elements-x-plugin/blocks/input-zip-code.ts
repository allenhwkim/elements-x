import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {
  editor.BlockManager.add('input-zip-code', {
    ...props,
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <text x="150" y="300" fill="#FFF" font-size="10em">ZIP</text>
        <text x="100" y="400" fill="#FFF" font-size="10em">CODE</text>
      </svg>`,
    content: `
      <div class="custom d-inline-block">
        <label for="zip" class="form-label">Zip code:</label>
        <x-masked mask="99999" class="d-block">
          <input id="zip" name="zip" class="form-control" />
        </x-masked>
      </div>`
  });
}