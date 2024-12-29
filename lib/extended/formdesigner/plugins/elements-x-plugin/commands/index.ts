import { Editor } from "grapesjs";
import { jsEditorCommand } from "./js-editor";
import { htmlEditorCommand } from "./html-editor";

export default function commands(editor: Editor) {
  editor.Commands.add('js-editor', jsEditorCommand);
  editor.Commands.add('html-editor', htmlEditorCommand); 
}
