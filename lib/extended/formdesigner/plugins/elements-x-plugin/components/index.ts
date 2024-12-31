import xCalendar from './x-calendar';
import xCombobox from './x-combobox';
import xDropdown from './x-dropdown';
import inputProvince from './input-province';
import htmlEdit from './html-edit';
import xMasked from './x-masked';

export default function(editor) {
  xDropdown(editor);
  xCalendar(editor);
  xCombobox(editor);
  xMasked(editor);
  inputProvince(editor); // updatable dataList
  htmlEdit(editor);
}