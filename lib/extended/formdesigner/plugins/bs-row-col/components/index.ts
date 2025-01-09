import { Editor } from "grapesjs";
import bsRow from "./bs-row";
import bsColumn from "./bs-col";

export default function(editor: Editor) {
  bsRow(editor);
  bsColumn(editor);
}