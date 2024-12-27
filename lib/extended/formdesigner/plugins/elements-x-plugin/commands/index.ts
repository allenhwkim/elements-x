import { Editor } from "grapesjs";
import { editPropertyCommand } from "./property-editor";
import { editHtmlCommand } from "./html-editor";

export default function commands(editor: Editor) {
  editor.Commands.add('edit-property', editPropertyCommand);
  editor.Commands.add('edit-html', editHtmlCommand); 
}
