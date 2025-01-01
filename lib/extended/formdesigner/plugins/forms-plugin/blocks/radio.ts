
import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {
  editor.BlockManager.add('radio', {
    ...props,
    label: 'Radio',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"></path></svg>',
    content: function() {
      const id1= Date.now() % 1000;
      const id2= Date.now() % 1000;
      return `
        <div class="container custom">
          <div class="form-check form-check-inline">
            <input type="radio" id="my-radio-${id1}" name="my-radio-${id1}" class="form-check-input" value="1"/>
            <label for="my-radio-${id1}" class="form-check-label">Option 1</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="radio" id="my-radio-${id2}" name="my-radio-${id2}" class="form-check-input" value="2"/>
            <label for="my-radio-${id2}" class="form-check-label">Option 2</label>
          </div>
        </div>`
    } as any
  });
}