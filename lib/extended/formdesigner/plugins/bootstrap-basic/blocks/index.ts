import { BlockProperties as Prop, Editor } from "grapesjs";
import column444 from './column-4-4-4';
import gridColumn from './column-12';
import column66 from './column-6-6';
import text from './text';
import link from './link';
import image from './image';

export default function(editor: Editor, props: any) {
  const {col1Label, col2Label, col3Label, textLabel, linkLabel, imgLabel, category} = props;
  gridColumn(editor, {label: col1Label, category} as Prop);
  column66(editor, {label: col2Label, category} as Prop);
  column444(editor, {label: col3Label, category} as Prop);
  text(editor, {label: textLabel, category} as Prop);
  link(editor, {label: linkLabel, category} as Prop)
  image(editor, {label: imgLabel, category} as Prop)
}
