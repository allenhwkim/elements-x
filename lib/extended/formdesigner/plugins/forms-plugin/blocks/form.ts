import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {
  editor.BlockManager.add('form', {
    ...props,
    label: 'Form',
    media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 5.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 8H3V6h18v2zM22 10.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 13H3v-2h18v2z"/><rect width="10" height="3" x="2" y="15" rx=".5"/></svg>',
    content: `
      <x-stepper class="d-block container" steps="Step1, Step2, Step3"></x-stepper>

      <form class="container py-4">

        <div class="d-grid gap-3 d-md-flex justify-content-md-start mt-4">
          <button id="buttonBack" class="btn btn-outline-primary">Back</button>
          <button id="buttonContinue" type="submit" translate="" class="btn btn-primary">Continue</button>
        </div>
      </form>
    ` 
  });
}