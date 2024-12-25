import inputDate from './input-date';
import inputProvince from './input-province';
import xCalendar from './x-calendar';
import xCombobox from './x-combobox';
import xDropdown from './x-dropdown';

export default function(editor) {
  xDropdown(editor);
  xCalendar(editor);
  xCombobox(editor);
  inputDate(editor);
  inputProvince(editor);
}