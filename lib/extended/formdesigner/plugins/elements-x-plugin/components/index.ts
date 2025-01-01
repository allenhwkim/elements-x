import inputText from './input-text';
import { Editor } from 'grapesjs';
import xCalendar from './x-calendar';
import xCombobox from './x-combobox';
import xDropdown from './x-dropdown';
import inputProvince from './input-province';
import htmlEdit from './html-edit';
import xMasked from './x-masked';

export default function(editor: Editor) {
  xDropdown(editor);
  xCalendar(editor);
  xCombobox(editor);
  xMasked(editor);
  inputProvince(editor); // updatable dataList
  inputText(editor);
  htmlEdit(editor);
}