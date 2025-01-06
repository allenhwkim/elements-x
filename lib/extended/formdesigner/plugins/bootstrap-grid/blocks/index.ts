import { BlockProperties, Editor } from "grapesjs";
import column444 from "./column-4-4-4";
import gridColumn from "./grid-column";
import column66 from "./column-6-6";

export default function(editor: Editor, props: BlockProperties) {
  gridColumn(editor, props);
  column66(editor, props);
  column444(editor, props);
}
