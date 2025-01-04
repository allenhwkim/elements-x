import { Editor } from "grapesjs";
import gridRow from "./grid-row";
import gridColumn from "./grid-column";

export default function(editor: Editor) {
  gridRow(editor);
  gridColumn(editor);
}