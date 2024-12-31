import xCalendar from './x-calendar';
import xCombobox from './x-combobox';
import xDropdown from './x-dropdown';
import inputCountry from './input-country';
import inputDate from './input-date';
import inputProvince from './input-province';
import inputState from './input-state';

export default function(editor) {
  xDropdown(editor);
  xCalendar(editor);
  xCombobox(editor);
  inputDate(editor);
  inputProvince(editor);
  inputCountry(editor);
  inputState(editor);
}